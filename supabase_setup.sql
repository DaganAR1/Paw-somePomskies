-- Supabase Database Schema for Paw-some Pomskies
-- Consolidated and Secured Version

-- 1. Puppies Table
CREATE TABLE IF NOT EXISTS puppies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  age TEXT,
  status TEXT CHECK (status IN ('Available', 'Reserved', 'Adopted')),
  image TEXT,
  description TEXT,
  "coatColor" TEXT,
  "eyeColor" TEXT,
  weight TEXT,
  "additionalImages" JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Parents Table
CREATE TABLE IF NOT EXISTS parents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('Male', 'Female')),
  image TEXT,
  breed TEXT,
  weight TEXT,
  description TEXT,
  age TEXT,
  "coatColor" TEXT,
  "eyeColor" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Litter Schedule Table
CREATE TABLE IF NOT EXISTS schedule (
  id TEXT PRIMARY KEY,
  event TEXT NOT NULL,
  period TEXT,
  date TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB DEFAULT '[]'::JSONB,
  category TEXT CHECK (category IN ('Health', 'Training', 'News')),
  date TEXT,
  image TEXT,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Site Assets Table
CREATE TABLE IF NOT EXISTS site_assets (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Guardian Dogs Table
CREATE TABLE IF NOT EXISTS guardian_dogs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  age TEXT,
  image TEXT,
  description TEXT,
  breed TEXT,
  status TEXT CHECK (status IN ('Available', 'Found')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE puppies ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardian_dogs ENABLE ROW LEVEL SECURITY;

-- Policies
DO $$ 
DECLARE
    tab TEXT;
BEGIN
    FOR tab IN SELECT unnest(ARRAY['puppies', 'parents', 'schedule', 'blog_posts', 'site_assets', 'guardian_dogs']) 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Public Read Access" ON %I', tab);
        EXECUTE format('CREATE POLICY "Public Read Access" ON %I FOR SELECT USING (true)', tab);
        
        EXECUTE format('DROP POLICY IF EXISTS "Admin Full Access" ON %I', tab);
        EXECUTE format('CREATE POLICY "Admin Full Access" ON %I FOR ALL TO authenticated USING (true)', tab);
    END LOOP;
END $$;
