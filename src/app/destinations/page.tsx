import DestinationCard, {
  Destination,
} from "@/components/destinations/destination-card";

const DestinationsPage = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch("http://localhost:5000/destinations", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    destinations = await res.json();
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">
            Explore All Destinations
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Find your perfect travel experience from our curated collection
          </p>
        </div>

        {/* Destination Count */}
        <p className="mb-5 text-xs text-slate-500">
          Showing {destinations.length} destinations
        </p>

        {/* Destination Grid */}
        {destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <h2 className="text-lg font-medium text-slate-800">
              No destinations found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Please check back later for available destinations.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default DestinationsPage;
