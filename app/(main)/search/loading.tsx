export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-[88px] bg-white border-b border-neutral-200 animate-pulse flex items-center px-8">
        <div className="w-[120px] h-8 bg-neutral-200 rounded-full" />
      </div>

      <div className="h-[80px] border-b border-neutral-350 animate-pulse flex items-center px-12 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 bg-neutral-200 rounded" />
            <div className="w-16 h-3 bg-neutral-200 rounded" />
          </div>
        ))}
      </div>

      <div className="h-[50px] border-b border-neutral-350 animate-pulse flex items-center px-8">
        <div className="w-full max-w-[300px] h-4 bg-neutral-200 rounded" />
      </div>

      <div className="h-[44px] border-b border-neutral-200 animate-pulse flex items-center px-8">
        <div className="w-40 h-4 bg-neutral-200 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-8 py-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[6/5] bg-neutral-200 rounded-t-[20px] animate-pulse" />
            <div className="bg-white border border-neutral-border rounded-b-[20px] p-5 space-y-3">
              <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-neutral-200 rounded animate-pulse w-1/2" />
              <div className="flex gap-2">
                <div className="h-6 bg-neutral-200 rounded-full animate-pulse w-16" />
                <div className="h-6 bg-neutral-200 rounded-full animate-pulse w-20" />
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between">
                <div className="h-4 bg-neutral-200 rounded animate-pulse w-20" />
                <div className="h-8 bg-neutral-200 rounded-[10px] animate-pulse w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
