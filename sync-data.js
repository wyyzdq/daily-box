/* Pure data comparison and three-way merge; no network or storage access. */
(() => {
  const missing = Symbol("missing");
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  function canonical(value) {
    if (value === missing) return "<missing>";
    if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
    if (object(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(",")}}`;
    return JSON.stringify(value);
  }
  const equal = (a, b) => canonical(a) === canonical(b);
  function hasContent(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return Boolean(value.trim());
    if (Array.isArray(value)) return value.some(hasContent);
    if (object(value)) return Object.values(value).some(hasContent);
    return true;
  }
  function entryHasContent(entry) {
    return object(entry) && Object.entries(entry).some(([key, value]) => !["date", "createdAt", "updatedAt"].includes(key) && hasContent(value));
  }
  function comparable(value) {
    const result = JSON.parse(JSON.stringify(value));
    result.entries = Object.fromEntries(Object.entries(result.entries || {}).filter(([, entry]) => entryHasContent(entry)));
    for (const [date, entry] of Object.entries(result.entries)) {
      for (const type of ["mood", "fitness", "study", "outing"]) {
        const record = entry[type];
        if (object(record) && !Array.isArray(record.items)) {
          entry[type] = { items: [{ ...record, id: record.id || `legacy:${date}:${type}` }], note: record.note || "" };
        }
      }
    }
    return result;
  }
  function validate(value) {
    if (!object(value)) throw new Error("记录格式无法读取，已停止同步。");
    for (const key of ["entries", "settings", "timers"]) {
      if (value[key] !== undefined && !object(value[key])) throw new Error("记录格式无法读取，已停止同步。");
    }
    for (const key of ["cycles", "todos", "customModules"]) {
      if (value[key] !== undefined && !Array.isArray(value[key])) throw new Error("记录格式无法读取，已停止同步。");
    }
    for (const entry of Object.values(value.entries || {})) {
      if (!object(entry)) throw new Error("记录格式无法读取，已停止同步。");
    }
    return value;
  }
  function merge(baseState, localState, cloudState, preference = null) {
    const conflicts = [];
    function visit(base, local, cloud, path) {
      if (equal(local, cloud)) return local;
      if (equal(local, base)) return cloud;
      if (equal(cloud, base)) return local;
      if (path.at(-1) === "tarot" || path.length === 2 && path[0] === "timers") {
        conflicts.push(path.join("."));
        return preference === "cloud" ? cloud : local;
      }
      if (object(local) && object(cloud) && (object(base) || base === missing)) {
        if (path.length === 2 && path[0] === "cycles") {
          const range = (value) => ({ startDate: value?.startDate || "", endDate: value?.endDate || "" });
          const before = range(base), here = range(local), there = range(cloud);
          if (!equal(here, there) && !equal(before, here) && !equal(before, there)) {
            conflicts.push(`${path.join(".")}.range`);
            const chosen = preference === "cloud" ? there : here;
            local = { ...local, ...chosen };
            cloud = { ...cloud, ...chosen };
          }
        }
        const result = {};
        for (const key of new Set([...Object.keys(local), ...Object.keys(cloud), ...Object.keys(base === missing ? {} : base)])) {
          const value = visit(base !== missing && Object.hasOwn(base, key) ? base[key] : missing, Object.hasOwn(local, key) ? local[key] : missing, Object.hasOwn(cloud, key) ? cloud[key] : missing, [...path, key]);
          if (value !== missing) result[key] = value;
        }
        return result;
      }
      const keyedPath = path.length === 1 && ["todos", "cycles", "customModules"].includes(path[0]) || path.at(-1) === "items";
      const arrays = [base === missing ? [] : base, local, cloud];
      if (keyedPath && arrays.every(Array.isArray) && arrays.every((items) => items.every((item) => object(item) && typeof item.id === "string") && new Set(items.map((item) => item.id)).size === items.length)) {
        const maps = arrays.map((items) => new Map(items.map((item) => [item.id, item])));
        return [...new Set([...maps[1].keys(), ...maps[2].keys(), ...maps[0].keys()])].flatMap((id) => {
          const value = visit(...maps.map((map) => map.has(id) ? map.get(id) : missing), [...path, id]);
          return value === missing ? [] : [value];
        });
      }
      // Generated timestamps do not turn independent edits into content conflicts.
      if (["createdAt", "updatedAt"].includes(path.at(-1)) && typeof local === "string" && typeof cloud === "string") {
        return path.at(-1) === "createdAt" ? [local, cloud].sort()[0] : [local, cloud].sort().at(-1);
      }
      conflicts.push(path.join("."));
      return preference === "cloud" ? cloud : local;
    }
    return { value: visit(comparable(baseState), comparable(localState), comparable(cloudState), []), conflicts };
  }
  globalThis.DailyBoxSync = { equal, comparable, merge, validate, entryHasContent };
})();
