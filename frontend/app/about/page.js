import Reveal from "@/components/Reveal";
import { company } from "@/lib/data";

export const metadata = {
  title: "About Us | Usama Asghar & Co",
};

export default function AboutPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20 text-center">
        <Reveal>
          <p className="text-accent font-semibold uppercase tracking-wider text-sm">About Us</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Decades of Trust, Built on Reliability
          </h1>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Our Story</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                <strong>{company.name}</strong> is a Sama Satta-based Distribution &amp;
                Retailing Company, operating as a Retail Company, Wholesale &amp; Supply
                Store, and Foodservice Distributor since the {company.founded}.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Founded and owned by <strong>{company.owners.join(" and ")}</strong>, the
                company has grown from a local distribution outfit into a trusted supply
                partner for some of Pakistan's most recognised FMCG brands — spanning
                beverages, cooking oils, detergents, pasta, spices and dairy essentials.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Today, {company.serviceArea}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
              <h3 className="font-display font-semibold text-navy text-lg mb-4">
                Company Snapshot
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-400">Established</span>
                  <span className="font-semibold text-navy">{company.founded}</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-400">Owners</span>
                  <span className="font-semibold text-navy">{company.owners.join(", ")}</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-400">Business Type</span>
                  <span className="font-semibold text-navy text-right">{company.type}</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-400">Location</span>
                  <span className="font-semibold text-navy">{company.address}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Coverage</span>
                  <span className="font-semibold text-navy">All of Punjab</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 h-full">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-display text-xl font-bold text-navy">Mission</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">{company.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 h-full">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-display text-xl font-bold text-navy">Vision</h3>
              <p className="text-gray-600 mt-4 leading-relaxed">{company.vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy text-center mb-12">
            What We Stand For
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {company.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="text-center bg-white border border-gray-100 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                <h4 className="font-display font-semibold text-navy">{v.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
