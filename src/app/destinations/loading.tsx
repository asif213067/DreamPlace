const DestinationsLoading = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div className="h-10 w-72 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-slate-100" />
        </div>

        <div className="mb-5 h-3 w-36 animate-pulse rounded bg-slate-200" />

        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-[16/9] animate-pulse rounded-sm bg-slate-200" />
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
              <div className="flex justify-between gap-3">
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DestinationsLoading;
