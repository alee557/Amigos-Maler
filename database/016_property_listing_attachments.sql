create table if not exists property_listing_attachments (
  consultation_id text primary key references consultations(id) on delete cascade,
  media_type text not null,
  content bytea not null check (octet_length(content) between 1 and 3145728)
);
