-- Streamline Digital Solutions — Supabase Schema
-- Run this in your Supabase SQL Editor

-- 1. Leads Table (Contact Form)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  store_url TEXT,
  company TEXT,
  services TEXT[] DEFAULT '{}',
  budget TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts only via Service Role (Next.js server actions)
CREATE POLICY "Allow service role inserts for leads"
  ON public.leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 2. Subscribers Table (Footer Newsletter)
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow inserts only via Service Role
CREATE POLICY "Allow service role inserts for subscribers"
  ON public.subscribers
  FOR INSERT
  TO service_role
  WITH CHECK (true);
