-- ShareBite Phase 1: AI Food Analysis + Food Rescue Priority
-- Adds nullable AI/priority columns to the existing donations table.
-- Safe to run on a live database: purely additive, no existing rows
-- or columns are modified, and IF NOT EXISTS makes it idempotent.
--
-- Run this in the Supabase Dashboard -> SQL Editor.

ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS ai_food_category TEXT,
  ADD COLUMN IF NOT EXISTS ai_food_type TEXT,
  ADD COLUMN IF NOT EXISTS ai_perishability TEXT,
  ADD COLUMN IF NOT EXISTS ai_storage_recommendation TEXT,
  ADD COLUMN IF NOT EXISTS ai_handling_suggestion TEXT,
  ADD COLUMN IF NOT EXISTS ai_priority_score INT,
  ADD COLUMN IF NOT EXISTS ai_priority_level TEXT,
  ADD COLUMN IF NOT EXISTS ai_priority_reason TEXT,
  ADD COLUMN IF NOT EXISTS ai_analyzed_at TIMESTAMPTZ;
