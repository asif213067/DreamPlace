import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex min-h-100 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center sm:py-16">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a tropical bay with a seaplane"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />

      <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl md:text-[56px] md:leading-tight">
        Ready To Start Your Journey?
      </h2>
      <p className="mt-4 text-[15px] text-white/90">
        Join thousands of travelers who have discovered the world with us
      </p>

      <Link
        href="/destinations"
        className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-6 text-xs font-semibold tracking-widest text-neutral-950 uppercase transition-colors hover:bg-white/85 sm:px-8 sm:text-[13px]"
      >
        Book Your Trip Today
        <MoveRight className="size-5" />
      </Link>
    </section>
  );
}
