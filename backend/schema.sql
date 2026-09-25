-- ShareBite Supabase Initial Database Schema & RLS Migration
-- Executable directly in Supabase Dashboard -> SQL Editor

-- ==========================================
-- 1. ENUM TYPES DEFINITION
-- ==========================================
CREATE TYPE public.user_role AS ENUM ('donor', 'ngo', 'admin');
CREATE TYPE public.user_status AS ENUM ('active', 'suspended', 'pending');
CREATE TYPE public.donation_status AS ENUM ('available', 'accepted', 'ready_for_pickup', 'completed', 'cancelled', 'expired');
CREATE TYPE public.claim_status AS ENUM ('pending', 'accepted', 'rejected', 'cancelled', 'completed');
CREATE TYPE public.step_status AS ENUM ('completed', 'current', 'upcoming');

-- ==========================================
-- 2. TABLE DEFINITIONS
-- ==========================================

-- 2.1 Profiles Table (Linked to Supabase Auth)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role public.user_role NOT NULL DEFAULT 'donor',
    full_name TEXT NOT NULL,
    phone_number TEXT,
    avatar_url TEXT,
    status public.user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 Donor Profiles Table
CREATE TABLE public.donor_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_name TEXT NOT NULL,
    address TEXT NOT NULL,
    total_donations_count INT NOT NULL DEFAULT 0,
    joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 2.3 NGO Profiles Table
CREATE TABLE public.ngo_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    ngo_name TEXT NOT NULL,
    ngo_type TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    service_area TEXT NOT NULL,
    categories_accepted TEXT[] NOT NULL DEFAULT '{}',
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    meals_claimed INT NOT NULL DEFAULT 0,
    logo_url TEXT,
    description TEXT,
    joined_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 2.4 Donations Table
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    food_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity NUMERIC NOT NULL CHECK (quantity > 0),
    quantity_unit TEXT NOT NULL,
    estimated_meals INT NOT NULL CHECK (estimated_meals >= 0),
    is_veg BOOLEAN NOT NULL DEFAULT TRUE,
    prepared_at TIMESTAMPTZ NOT NULL,
    storage_condition TEXT NOT NULL,
    pickup_address TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    pickup_start TIMESTAMPTZ NOT NULL,
    pickup_end TIMESTAMPTZ NOT NULL,
    description TEXT,
    image_url TEXT,
    special_instructions TEXT,
    status public.donation_status NOT NULL DEFAULT 'available',
    posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.5 Donation Claims Table
CREATE TABLE public.donation_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
    ngo_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status public.claim_status NOT NULL DEFAULT 'pending',
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    accepted_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 Donation Timelines Table
CREATE TABLE public.donation_timelines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID NOT NULL REFERENCES public.donations(id) ON DELETE CASCADE,
    step INT NOT NULL CHECK (step BETWEEN 1 AND 5),
    label TEXT NOT NULL,
    status public.step_status NOT NULL DEFAULT 'upcoming',
    event_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.7 Activity Logs Table
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.8 System Settings Table
CREATE TABLE public.system_settings (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    platform_name TEXT NOT NULL DEFAULT 'ShareBite Food Rescue Platform',
    support_email TEXT NOT NULL DEFAULT 'support@sharebite.org',
    food_safety_notice TEXT,
    auto_verify_ngo BOOLEAN NOT NULL DEFAULT FALSE,
    max_pickup_radius_km INT NOT NULL DEFAULT 25,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Initialize default row in system_settings
INSERT INTO public.system_settings (id, platform_name, support_email, auto_verify_ngo, max_pickup_radius_km)
VALUES (1, 'ShareBite Food Rescue Platform', 'support@sharebite.org', FALSE, 25)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 3. INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX idx_donations_status ON public.donations(status);
CREATE INDEX idx_donation_claims_donation_id ON public.donation_claims(donation_id);
CREATE INDEX idx_donation_claims_ngo_id ON public.donation_claims(ngo_id);
CREATE INDEX idx_donation_claims_status ON public.donation_claims(status);
CREATE INDEX idx_donation_claims_donation_status ON public.donation_claims(donation_id, status);
CREATE INDEX idx_donation_timelines_donation_id ON public.donation_timelines(donation_id);

-- ==========================================
-- 4. AUTOMATIC PROFILE CREATION TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'donor'),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Profiles RLS
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Donor Profiles RLS
CREATE POLICY "Donor profiles are viewable by authenticated users"
ON public.donor_profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Donors can manage their own donor profile"
ON public.donor_profiles FOR ALL TO authenticated USING (auth.uid() = id);

-- NGO Profiles RLS
CREATE POLICY "NGO profiles are viewable by authenticated users"
ON public.ngo_profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "NGOs can update their own profile info"
ON public.ngo_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Donations RLS
CREATE POLICY "Donations viewable by donors and NGOs"
ON public.donations FOR SELECT TO authenticated USING (
    donor_id = auth.uid() OR status = 'available' OR EXISTS (
        SELECT 1 FROM public.donation_claims WHERE donation_id = donations.id AND ngo_id = auth.uid()
    )
);

CREATE POLICY "Donors can create donations"
ON public.donations FOR INSERT TO authenticated WITH CHECK (donor_id = auth.uid());

CREATE POLICY "Donors can update their own donations"
ON public.donations FOR UPDATE TO authenticated USING (donor_id = auth.uid());

-- Donation Claims RLS
CREATE POLICY "Donation claims viewable by assigned NGO or donation owner"
ON public.donation_claims FOR SELECT TO authenticated USING (
    ngo_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.donations WHERE id = donation_claims.donation_id AND donor_id = auth.uid()
    )
);

CREATE POLICY "NGOs can create claims for available donations"
ON public.donation_claims FOR INSERT TO authenticated WITH CHECK (ngo_id = auth.uid());

CREATE POLICY "NGOs or Donors can update relevant claims"
ON public.donation_claims FOR UPDATE TO authenticated USING (
    ngo_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.donations WHERE id = donation_claims.donation_id AND donor_id = auth.uid()
    )
);

-- ==========================================
-- 6. AI FOOD ANALYSIS + RESCUE PRIORITY (Phase 1)
-- See migrations_ai_priority.sql -- kept in sync here for fresh installs.
-- ==========================================
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
