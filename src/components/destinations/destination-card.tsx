import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight, Star } from "lucide-react";

export interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
}

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <div className="group overflow-hidden bg-white">
      {/* Destination Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating - only shown when available */}
        {destination.rating !== undefined && (
          <div className="absolute right-3 top-3 flex items-center gap-1 bg-white/90 px-2 py-1 text-xs font-semibold text-slate-900 shadow-sm">
            {destination.rating}
            <Star size={13} className="fill-black text-black" />
          </div>
        )}
      </div>

      {/* Destination Details */}
      <div className="space-y-2 py-3">
        {/* Country */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={13} />
          <span>{destination.country}</span>
        </div>

        {/* Name and Price */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-base font-medium text-slate-900">
            {destination.name}
          </h2>

          <p className="shrink-0 text-sm font-semibold text-slate-900">
            ${destination.price}
            <span className="text-[10px] font-normal text-slate-500">
              /Person
            </span>
          </p>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={13} />
          <span>{destination.duration}</span>
        </div>

        <Link
          href={`/destinations/${destination._id}`}
          className="group inline-flex items-center gap-1.5 rounded-lg bg-[#0aa3bd] px-4 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-[#078ba2] hover:shadow-md active:scale-95 sm:px-5"
        >
          BOOK NOW
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
