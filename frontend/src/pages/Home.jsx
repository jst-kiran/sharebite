import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import SectionTitle from "../components/common/SectionTitle";
import Card from "../components/common/Card";
import StatCard from "../components/common/StatCard";
import HeroIllustration from "../components/common/HeroIllustration";

// 2. How It Works Steps
const STEPS = [
  {
    number: "01",
    title: "Donate Food",
    text: "Donors list excess fresh meals or surplus food with pickup details and window in under two minutes.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "NGO Accepts",
    text: "Verified non-profits and community NGOs browse open listings nearby and claim what they can distribute.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Food Reaches People",
    text: "The NGO collects the food box and distributes nutritious meals to families before food goes to waste.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 12c-2.5 4.65-9.5 9-9.5 9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// 3. Why ShareBite Benefits
const BENEFITS = [
  {
    title: "Reduce Food Waste",
    text: "Prevent high-quality surplus meals from commercial kitchens and households from going to local landfills.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Help Communities",
    text: "Direct surplus food straight to grassroots non-profits, shelters, and relief centers in your neighborhood.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Simple Donation Process",
    text: "Intuitive listing interface makes sharing surplus effortless for restaurants, caterers, and individuals.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Transparent Tracking",
    text: "Clear verification status for non-profits and pickup confirmation so donors know food reached safe hands.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// 4. Impact Statistics (Explicitly labeled as Demo Statistics)
const DEMO_STATISTICS = [
  {
    label: "Meals Donated",
    value: "0",
    description: "Awaiting database sync",
  },
  {
    label: "Food Saved",
    value: "0 kg",
    description: "Real-time tracking ready",
  },
  {
    label: "Partner NGOs",
    value: "0",
    description: "NGO registry ready",
  },
  {
    label: "Active Donors",
    value: "0",
    description: "Donor onboarding ready",
  },
];

function Home() {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="container-page grid items-center gap-14 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Reducing food waste, together</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Share Food.
            <br />
            <span className="text-forest">Share Hope.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
            ShareBite connects food donors with verified non-profits and NGOs, so surplus meals find their way to people who need them, instead of the bin.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary">
              Donate Food
            </Link>
            <Link to="/register" className="btn-secondary">
              Join as NGO
            </Link>
          </div>
        </div>

        {/* Ecosystem Hero Illustration */}
        <div className="flex justify-center items-center">
          <HeroIllustration />
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="bg-stone/50 py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="How it works"
            title="Three steps from surplus to shared"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <Card key={step.number} stepNumber={step.number} title={step.title}>
                {step.text}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY SHAREBITE */}
      <section className="container-page py-20">
        <SectionTitle
          eyebrow="Why ShareBite"
          title="Empowering food rescue with simple tools"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <Card key={b.title} icon={b.icon} title={b.title}>
              {b.text}
            </Card>
          ))}
        </div>
      </section>

      {/* 4. IMPACT SECTION */}
      <section className="bg-stone/50 py-20">
        <div className="container-page">
          <SectionTitle
            eyebrow="Impact Section"
            title="Platform Counters"
            description="Pre-database demo statistics and metrics."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_STATISTICS.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                statusTag="Demo Statistic"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="bg-forest">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="text-3xl font-semibold text-paper">
            Ready to make surplus food count?
          </h2>
          <p className="max-w-md text-sm text-paper/70">
            Create your account as a donor or an NGO and start sharing what would otherwise go to waste.
          </p>
          <Link to="/register" className="btn-primary !bg-wheat !text-forest-dark hover:!bg-wheat-light">
            Create your account
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
