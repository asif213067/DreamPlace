import { notFound } from "next/navigation";
import { Destination } from "@/components/destinations/destination-card";
import DestinationDetails from "../destination-details";

interface DestinationDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const DestinationDetailsPage = async ({
  params,
}: DestinationDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`, {
    cache: "no-store",
  });

  // Handle destination not found
  if (res.status === 404) {
    notFound();
  }

  // Handle other API errors
  if (!res.ok) {
    throw new Error("Failed to fetch destination");
  }

  const destination: Destination = await res.json();

  if (!destination?._id) {
    notFound();
  }

  // Render JSX outside try/catch
  return <DestinationDetails destination={destination} />;
};

export default DestinationDetailsPage;
