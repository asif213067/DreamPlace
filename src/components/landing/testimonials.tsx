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

function Stars({
  rating,
  name,
  className,
}: {
  rating: Testimonial["rating"];
  name: string;
  className?: string;
}) {
  return (
    <p
      className={cn("mt-4 flex gap-0.5", className)}
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
function Portrait({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
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
        className={cn(
          "flex size-28 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-serif text-2xl text-neutral-600 sm:h-full sm:w-28 sm:rounded-none md:w-28",
          className
        )}
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
      className={cn(
        "size-28 shrink-0 rounded-full object-cover sm:h-full sm:w-28 sm:rounded-none md:w-auto",
        className
      )}
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <h2 className="font-serif text-[28px] text-neutral-950 sm:text-4xl md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-[15px] leading-6 text-neutral-500 sm:text-sm sm:leading-5">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
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
                <article className="flex h-full flex-col bg-white p-6 sm:flex-row sm:p-0">
                  <Portrait
                    testimonial={testimonial}
                    className="order-1 self-center sm:order-2 sm:self-stretch"
                  />
                  <div className="order-2 flex min-w-0 flex-1 flex-col sm:order-1 sm:p-6">
                    <footer className="order-1 mt-4 text-center sm:order-3 sm:mt-auto sm:pt-6 sm:text-left">
                      <p className="text-[15px] text-[#0aa3bd]">
                        &mdash; {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-400">
                        {testimonial.location}
                      </p>
                    </footer>
                    <Stars
                      rating={testimonial.rating}
                      name={testimonial.name}
                      className="order-2 justify-center sm:justify-start"
                    />
                    <p className="order-3 mt-4 text-left leading-7 font-serif text-[17px] text-neutral-950 sm:order-1 sm:mt-0">
                      {testimonial.quote}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
