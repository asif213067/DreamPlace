"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { MoveLeft, MoveRight, Star } from "lucide-react";
import { cn } from "cn";
import {
  TESTIMONIALS,
  type Testimonial,
} from "@/lib/testimonials";

function CarouselArrow({
  direction,
  className,
}: {
  direction: "prev" | "next";
  className?: string;
}) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous testimonials" : "Next testimonials"}
      disabled={isPrev ? !canScrollPrev : !canScrollNext}
      onClick={isPrev ? scrollPrev : scrollNext}
      className={cn(
        "flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-50 md:size-11",
        className
      )}
    >
      {isPrev ? <MoveLeft className="size-4" /> : <MoveRight className="size-4" />}
    </button>
  );
}

function Stars({ rating, name }: { rating: Testimonial["rating"]; name: string }) {
  return (
    <p
      className="mt-4 flex gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars by ${name}`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          strokeWidth={1}
          className={cn(
            "size-4",
            index < rating
              ? "fill-amber-400 text-amber-400"
              : "text-neutral-300"
          )}
        />
      ))}
    </p>
  );
}

/** Portrait with graceful fallback when the photo is missing or fails to load. */
function Portrait({ testimonial }: { testimonial: Testimonial }) {
  const [failed, setFailed] = useState(false);
  const initials = testimonial.name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  if (!testimonial.photo || failed) {
    return (
      <div
        aria-hidden
        className="flex h-full w-24 shrink-0 self-stretch items-center justify-center bg-neutral-200 font-serif text-2xl text-neutral-600 sm:w-28 md:w-28"
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={testimonial.photo}
      alt={`Portrait of ${testimonial.name}`}
      width={218}
      height={264}
      onError={() => setFailed(true)}
      className="h-full w-24 shrink-0 self-stretch object-cover sm:w-28 md:w-auto"
    />
  );
}

export function Testimonials({
  testimonials = TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Carousel opts={{ align: "start", slidesToScroll: 1 }} className="w-full">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-neutral-950 sm:text-4xl md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CarouselArrow direction="prev" />
              <CarouselArrow direction="next" />
            </div>
          </div>

          <CarouselContent className="mt-8 -ml-8">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="pl-8 md:basis-1/2"
              >
                <article className="flex h-full bg-white">
                  <div className="flex min-w-0 flex-1 flex-col p-6">
                    <p className="font-serif text-[17px] leading-7 text-neutral-950">
                      {testimonial.quote}
                    </p>
                    <Stars rating={testimonial.rating} name={testimonial.name} />
                    <footer className="mt-auto pt-6">
                      <p className="text-[15px] text-[#0aa3bd]">
                        &mdash; {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        {testimonial.location}
                      </p>
                    </footer>
                  </div>
                  <Portrait testimonial={testimonial} />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
