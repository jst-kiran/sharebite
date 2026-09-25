-- ShareBite Supabase Seed Data for Development / Testing

-- Note: In real Supabase, users register through Supabase Auth (auth.users).
-- This seed script inserts demo profiles directly matching mock user IDs when testing.

-- Insert System Settings default
INSERT INTO public.system_settings (id, platform_name, support_email, auto_verify_ngo, max_pickup_radius_km)
VALUES (1, 'ShareBite Food Rescue Platform', 'support@sharebite.org', FALSE, 25)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- Demo activity logs
INSERT INTO public.activity_logs (id, type, title, message, created_at)
VALUES 
    (gen_random_uuid(), 'donation_posted', 'Donation Posted', 'Green Gourmet Catering posted 35 Vegetable Meal Boxes', NOW() - INTERVAL '10 minutes'),
    (gen_random_uuid(), 'ngo_verified', 'NGO Verified', 'Helping Hands Foundation was verified by System Admin', NOW() - INTERVAL '25 minutes'),
    (gen_random_uuid(), 'donation_accepted', 'Donation Accepted', 'Helping Hands Foundation claimed 40 Curry & Rice Bowls', NOW() - INTERVAL '1 hour'),
    (gen_random_uuid(), 'donation_completed', 'Donation Completed', 'City Food Bank completed pickup of 60 Dal & Rice meals', NOW() - INTERVAL '3 hours');
