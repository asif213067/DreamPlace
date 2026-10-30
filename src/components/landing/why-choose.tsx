import Image from "next/image";

const FEATURES = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    body: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    body: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    body: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#eafaff] px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-3xl text-neutral-950 sm:text-4xl md:text-[44px]">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-sm text-neutral-500">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-7 sm:grid-cols-2 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="bg-white p-6 sm:p-7">
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                aria-hidden
              />
              <h3 className="mt-5 font-serif text-2xl text-neutral-950">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-72 text-[13px] leading-6 text-neutral-500">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
