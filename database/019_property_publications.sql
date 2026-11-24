create table if not exists property_publications (
  consultation_id text primary key references consultations(id) on delete cascade,
  region text not null check(region in ('ch','do')),
  offer text not null check(offer in ('sale','rent')),
  title text not null,
  location text not null,
  details text not null,
  price text not null,
  published boolean not null default false
);
