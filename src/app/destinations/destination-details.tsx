import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Pencil,
} from "lucide-react";
import { Destination } from "@/components/destinations/destination-card";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";


interface DestinationDetailsProps {
  destination: Destination;
}

const DestinationDetails = ({ destination }: DestinationDetailsProps) => {
  const formattedDate = destination.departureDate
    ? destination.departureDate.split("-").reverse().join("/")
    : "Date not specified";

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-[#0aa3bd]"
          >
            <ArrowLeft size={16} />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <EditDestinationDialog destination={destination} />
            <DeleteDestinationDialog destinationId={destination._id} />          
          </div>
        </div>

        {/* Destination Image */}
        <div className="relative h-[260px] overflow-hidden rounded-sm sm:h-[380px] lg:h-[460px]">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            priority
            unoptimized
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        {/* Destination Content */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Left Content */}
          <div>
            {/* Location */}
            <div className="mb-3 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} />
              {destination.country}
            </div>

            {/* Title */}
            <div className="mb-7">
              <h1 className="text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl">
                {destination.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-[#0aa3bd]">
                  {destination.category}
                </span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />
                  {destination.duration}
                </span>
              </div>
            </div>

            {/* Overview */}
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-medium text-slate-900">
                Overview
              </h2>

              <p className="text-sm leading-7 text-slate-500">
                {destination.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="mb-3 text-xl font-medium text-slate-900">
                Destination Highlights
              </h2>

              <p className="mb-5 text-sm leading-7 text-slate-500">
                Explore {destination.name}, located in {destination.country}.
                Discover the destination and plan your next travel experience
                with DreamPlace.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="shrink-0 text-green-500" />
                  Destination: {destination.name}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="shrink-0 text-green-500" />
                  Country: {destination.country}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="shrink-0 text-green-500" />
                  Category: {destination.category}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Check size={16} className="shrink-0 text-green-500" />
                  Duration: {destination.duration}
                </div>
              </div>
            </section>
          </div>

          {/* Right Booking Card */}
          <aside className="h-fit border border-slate-100 bg-white p-6 shadow-md lg:sticky lg:top-8">
            <p className="text-xs text-slate-500">Starting from</p>

            <h2 className="mt-1 text-3xl font-semibold text-[#0aa3bd]">
              ${destination.price}
            </h2>

            <p className="mb-6 text-xs text-slate-500">per person</p>

            <div className="mb-5 space-y-3 border-y border-slate-100 py-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CalendarDays size={16} className="text-[#0aa3bd]" />
                <span>Departure Date</span>
              </div>

              <p className="bg-slate-50 px-3 py-3 text-sm text-slate-700">
                {formattedDate}
              </p>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock size={16} className="text-[#0aa3bd]" />
                <span>{destination.duration}</span>
              </div>
            </div>

            {/* Booking Button */}
            <Link
              href={`/booking?destination=${destination._id}`}
              className="flex w-full items-center justify-center gap-2 bg-[#0aa3bd] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-cyan-700"
            >
              Book Now
              <ArrowRight size={17} />
            </Link>

            {/* Booking Information */}
            <div className="mt-6 space-y-3">
              {[
                "Destination details available",
                "Travel duration provided",
                "Departure date provided",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-slate-500"
                >
                  <Check size={15} className="shrink-0 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetails;
