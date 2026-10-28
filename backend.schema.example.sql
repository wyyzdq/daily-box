-- 独立新项目的结构模板；本次未在真实后端执行。
-- 只在新建的空Supabase项目中参考执行，不直接改动现有生产表。
create table if not exists public.daily_box_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.daily_box_state enable row level security;
grant select, insert, update on public.daily_box_state to authenticated;
create policy daily_box_select_own on public.daily_box_state for select
  to authenticated using ((select auth.uid()) = user_id);
create policy daily_box_insert_own on public.daily_box_state for insert
  to authenticated with check ((select auth.uid()) = user_id);
create policy daily_box_update_own on public.daily_box_state for update
  to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
