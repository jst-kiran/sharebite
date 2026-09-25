import { Link } from "react-router-dom";
import SectionTitle from "../components/common/SectionTitle";
import Card from "../components/common/Card";

const OBJECTIVES = [
  {
    title: "Zero Edible Waste",
    text: "Ensure no edible surplus food ends up in landfills by offering rapid listing and claim workflows.",
  },
  {
    title: "Grassroots Trust",
    text: "Partner exclusively with vetted non-profits to build mutual trust and transparent food distribution.",
  },
  {
    title: "Scalable Foundation",
    text: "Engineered with modular React components ready for future dashboard and backend expansion.",
  },
];

function About() {
  return (
    <div>
      {/* 1. Mission & Header */}
      <section className="container-page py-16 md:py-20">
        <p className="eyebrow">About ShareBite</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Good food shouldn't end up in a landfill when it could end up on a plate.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70">
          ShareBite is built around a simple idea: a lot of food waste isn't because food is bad, it's because it's in the wrong place at the wrong time. We built a lightweight platform where donors can list what they have to spare, and NGOs can find and claim it before it spoils.
        </p>
      </section>

      {/* 2. Vision & Problem Statement */}
      <section className="bg-stone/50 py-16">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Why we're building this</p>
            <h2 className="mt-3 text-3xl font-semibold text-forest-dark">The mismatch problem</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Restaurants, caterers, and stores often end a day with food they can't sell but is perfectly fine to eat. At the same time, NGOs spend real effort just finding out who has surplus and when. ShareBite closes that gap with a shared listing board so food and people can actually meet.
            </p>
          </div>

          <div className="card !bg-white">
            <p className="eyebrow">Our Vision</p>
            <h3 className="mt-3 text-xl font-semibold text-forest-dark">Zero Waste Communities</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              A world where local non-profits have real-time visibility into available food surplus, ensuring zero edible food goes to waste.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Workflow Illustration */}
      <section className="container-page py-16">
        <SectionTitle
          eyebrow="Workflow Diagram"
          title="Simple Workflow Architecture"
          description="How ShareBite seamlessly bridges food donors and non-profit organizations."
        />

        <div className="mt-10 card !bg-white p-8">
          <svg viewBox="0 0 400 160" className="w-full h-auto" fill="none">
            {/* Step 1 */}
            <rect x="20" y="35" width="90" height="75" rx="12" fill="#FBF9F4" stroke="#1B4332" strokeWidth="2" />
            <text x="65" y="68" textAnchor="middle" fill="#122E22" fontSize="12" fontWeight="bold">Donor</text>
            <text x="65" y="86" textAnchor="middle" fill="#40704A" fontSize="9">Lists Surplus</text>

            {/* Arrow 1 */}
            <path d="M120 72.5h40" stroke="#40704A" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="168,72.5 160,68 160,77" fill="#40704A" />

            {/* Step 2 */}
            <rect x="170" y="35" width="100" height="75" rx="12" fill="#1B4332" />
            <text x="220" y="68" textAnchor="middle" fill="#FBF9F4" fontSize="12" fontWeight="bold">ShareBite Board</text>
            <text x="220" y="86" textAnchor="middle" fill="#D4A72C" fontSize="9">Instant Matching</text>

            {/* Arrow 2 */}
            <path d="M280 72.5h40" stroke="#40704A" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="328,72.5 320,68 320,77" fill="#40704A" />

            {/* Step 3 */}
            <rect x="330" y="35" width="90" height="75" rx="12" fill="#FBF9F4" stroke="#1B4332" strokeWidth="2" />
            <text x="375" y="68" textAnchor="middle" fill="#122E22" fontSize="12" fontWeight="bold">NGO</text>
            <text x="375" y="86" textAnchor="middle" fill="#40704A" fontSize="9">Claims & Delivers</text>
          </svg>
        </div>
      </section>

      {/* 4. Objectives */}
      <section className="bg-stone/50 py-16">
        <div className="container-page">
          <SectionTitle
            eyebrow="Objectives"
            title="The principles behind ShareBite"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OBJECTIVES.map((v) => (
              <Card key={v.title} title={v.title}>
                {v.text}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-forest">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="text-3xl font-semibold text-paper">Want to be part of it?</h2>
          <p className="max-w-md text-sm text-paper/70">
            Sign up as a donor to start listing surplus food, or register your NGO to start claiming donations nearby.
          </p>
          <Link to="/register" className="btn-primary !bg-wheat !text-forest-dark hover:!bg-wheat-light">
            Join ShareBite
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
