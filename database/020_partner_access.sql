create table if not exists partner_access (
  application_id text primary key references consultations(id) on delete cascade,
  token_hash text,
  expires_at timestamptz,
  account_id text references customers(id) on delete cascade
);
create table if not exists partner_assignments (
  application_id text not null references partner_access(application_id) on delete cascade,
  project_id text not null references projects(id) on delete cascade,
  partner_brief text not null,
  primary key(application_id,project_id)
);
