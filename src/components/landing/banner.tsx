import Image from "next/image";
import { MoveRight } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

const SEARCH_FIELDS = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime /3 Days" },
  { label: "Budget", value: "$0 -$3000" },
  { label: "People", value: "5 -10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-165 flex-col">
      <Image
        src="/images/Banner.png"
        alt="Bay of a tropical destination"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="-z-10 absolute inset-0 bg-black/30" />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <h1 className="font-serif text-4xl leading-[1.15] text-white sm:text-5xl md:text-[64px]">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/85">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
          <Button className="h-12 rounded-none bg-[#0aa3bd] px-7 text-[13px] font-semibold tracking-widest text-white uppercase shadow-none hover:bg-[#0994ac] hover:text-white">
            Explore Now
            <MoveRight data-icon="inline-end" className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-none border-white/40 bg-white/20 px-7 text-[13px] font-semibold tracking-widest text-white uppercase backdrop-blur-sm hover:bg-white/30 hover:text-white"
          >
            View Destination
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-stretch bg-black/40 backdrop-blur-sm md:flex-row">
        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {SEARCH_FIELDS.map((field, index) => (
            <div
              key={field.label}
              className={cn(
                "min-w-0 border-white/25 px-6 py-4",
                index > 0 && "border-t",
                (index === 1 || index === 3) && "sm:border-l",
                "md:border-t-0",
                index > 0 && "md:border-l"
              )}
            >
              <p className="text-base font-bold text-white">{field.label}</p>
              <p className="mt-0.5 text-[13px] text-white/60">{field.value}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full shrink-0 cursor-pointer bg-[#0aa3bd] px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#0994ac] md:w-56 md:py-0"
        >
          Search
        </button>
      </div>
    </section>
  );
}
