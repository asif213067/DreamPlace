import { Banner } from "@/components/landing/banner";
import { WhyChoose } from "@/components/landing/why-choose";
import { Testimonials } from "@/components/landing/testimonials";
import { Cta } from "@/components/landing/cta";


export default function Home() {
  return (
    <>
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
}
