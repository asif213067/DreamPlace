import { Navbar } from "@/components/landing/navbar";
import { Banner } from "@/components/landing/banner";
import { WhyChoose } from "@/components/landing/why-choose";
import { Testimonials } from "@/components/landing/testimonials";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <WhyChoose />
      <Testimonials />
      <Cta />
      <Footer />
    </>
  );
}
