alter table property_publications add column if not exists extra jsonb not null default '{}'::jsonb;
