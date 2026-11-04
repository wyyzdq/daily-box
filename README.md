# 日常小盒 / Daily Box

个人开发的生活记录网页：快速记录心情、学习、运动、外出及女性健康，创建自定义模块，用日历回看每天的记录。使用 ChatGPT 辅助编程，通过原始需求、功能迭代和纠错记录展示开发过程。

- 在线体验：https://daily-box.pages.dev/
- 代码仓库：https://github.com/wyyzdq/daily-box （Public）
- 当前发布方式：GitHub main → Cloudflare Pages。

## 十分钟运行指南

前提：已安装 Python 3 和现代浏览器；克隆仓库时还需 Git。网页不需要安装 npm 依赖。

1. 克隆仓库，或进入作品包中的 `01_网页源码`。

       git clone https://github.com/wyyzdq/daily-box.git
       cd daily-box

2. 在源码目录启动本地服务：

       python -m http.server 8000 --bind 127.0.0.1

   Windows 也可用 `py -3 -m http.server 8000 --bind 127.0.0.1`。

3. 浏览器打开 http://127.0.0.1:8000/ 。
4. 在今日页新增学习记录，保存、刷新，再到日历回看。
5. 在模块页创建一个数字字段的自定义模块，回到今日页填写并保存。
6. 新增待办，在首页完成，刷新核对完成状态。
7. 在“我的”导出 JSON，在新的测试浏览器中导入并回看记录。导入确认框会提示覆盖本机记录。

前端业务采用 HTML、CSS、JavaScript 和 localStorage。所有基础记录都能在未登录状态使用；账号与同步使用 Supabase，浏览器需能访问对应服务。

## 依赖与配置

| 项目 | 用途 |
| --- | --- |
| 现代 Chrome / Edge 等浏览器 | 运行页面和本地存储 |
| Python 3 | 提供本地静态 HTTP 服务 |
| Supabase JS 2.118.0 | 随源码提供于 vendor，首页显示后加载，用于认证和云同步 |
| Supabase 服务 | 可选的账号与云数据库 |
| Node.js | 运行 Cloudflare 发布脚本；本地预览无需 Node.js |
| Git | 克隆仓库和查看版本历史 |

`.env.example` 列出配置字段。静态网页不自动读取 .env，使用独立后端时，按以下对应关系修改 `app.js`：

| 模板字段 | 源码位置 |
| --- | --- |
| SUPABASE_URL | DEFAULT_CLOUD_CONFIG.url |
| SUPABASE_PUBLISHABLE_KEY | DEFAULT_CLOUD_CONFIG.anonKey |
| PUBLIC_APP_URL | PUBLIC_APP_URL |

客户端只使用公开 publishable key。表 `daily_box_state` 的字段为 `user_id`、`payload`、`updated_at`；独立空项目可参考 `backend.schema.example.sql` 建表及设置用户级读写策略。Supabase Auth 的 Site URL 与 Redirect URLs 应包含实际部署地址。现用入口为 https://daily-box.pages.dev/ 。

## 架构与数据流

界面通过模板函数渲染；`data-action` 分派点击与表单提交。业务状态按日期组织在 entries 中，周期起止在 cycles 中，待办独立保存。`saveState` 写入本地存储；登录后通过 Supabase 按用户同步 JSON 状态。`sync-data.js` 根据上次同步基线逐项合并两端修改，不按整份数据的更新时间决定覆盖。

### 同步与恢复保护

- 不同日期、字段和带 ID 的待办、多条记录分别合并；已知基线中的删除会正常同步。同一字段两端都修改时暂停同步，在“我的”选择冲突项目保留本机或云端，其余记录继续合并。
- 现有云端行采用 `user_id + updated_at` 条件更新；并发变化会重新读取、合并并重试，首次插入冲突也不会改用无条件 upsert。读取失败、格式错误或备份保存失败时停止替换与上传。
- 替换前的本机或云端内容保存在当前浏览器的独立备份区，最多最近 5 份，可在“我的 → 备份与恢复 → 覆盖前备份”下载为可导入的 JSON。它们不是服务器历史备份，清除网站存储或删除设备中的网页应用仍可能失去这些本地备份。
- 从云端恢复前显示记录数量并确认，空云端不清空本机。导入和清空本机前也先备份；清空本机不删除云端记录。
- 修改密码不触发生活记录上传。账号切换时，已归属另一个账号的本机记录不自动上传到新账号。
- `npm test` 使用 Node 内置测试运行器检查合并、冲突、并发写入、存储失败和密码更新等场景；不需要额外测试依赖。
- 已缓存旧网页的设备可打开 `https://daily-box.pages.dev/update`。该入口先更新并确认新版 Service Worker 接管，再进入首页；过程中不加载账号组件或执行数据同步。本次修复前的代码另保存为 Git 标记 `before-safe-sync-2026-11-04`。

多条记录通过 `normalizeMultiRecord` 兼容旧结构；计时使用开始时间戳；七天小结和周期预测使用本地规则。

## Cloudflare Pages 发布

- 仓库：wyyzdq/daily-box；生产分支：main。
- Framework preset：None。
- Build command：`npm run build:pages`。
- Build output directory：`dist-pages`。
- Root directory：仓库根目录。

2026-08-03 从 Netlify 迁移到 Cloudflare Pages。旧 Netlify 地址只用于历史记录。

### 首页加载与版本恢复

首页先读取本地记录并显示界面，再加载随站点提供的 Supabase JS 2.118.0。组件文件和 MIT 许可证在 `vendor/`；运行时无需访问 jsDelivr。首次成功缓存后，页面及静态资源优先从缓存打开，账号与云端数据请求仍走网络。发布更新时须同步修改 `sw.js` 的缓存名称、预缓存资源版本以及 `index.html` 的资源版本。

本次加载优化前的版本保存为 Git 标记 `before-startup-2026-11-04`（`7e4a73e`）。需要恢复时，撤销本次优化提交并推送 main，Cloudflare Pages 会重新部署；下次打开页面后浏览器会更新缓存。本地记录和登录使用的存储键保持原值。

## 开发过程与复现材料

作品包另附三条核心 Prompt 链：多条记录与计时、今日待办纠错、经期范围与每日症状；每条保留用户提问、AI回复、反馈和代码修改记录。需求起点和UI风格约束为补充案例。Git可查看已提交的代码演进。

早期需求与首版构建记录始于2026年7月；原仓库有34次开发提交，后续整理提交继续保留。作品包中的Git bundle可恢复归档版本，具体命令见包内 `03_复现与验证/README.md`。

## 验证与原创说明

已保存31项本地检查，覆盖记录保存、自定义模块、待办、日历、主题、七天小结、多条记录、周期编辑与每日症状。提交核对另检查备份导入、运行指南、AI纠错演示与线上资源版本，结果随作品包提供。

项目由本人独立构思和推进，此前未发表或获奖；未基于其他人的完整开源应用进行包装。使用ChatGPT辅助生成和修改代码，使用浏览器标准能力及Supabase通用服务。
