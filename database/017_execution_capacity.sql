create table if not exists execution_capacity (
  work_day date primary key,
  availability text not null check (availability in ('available', 'limited', 'unavailable'))
);
