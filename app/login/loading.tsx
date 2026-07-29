export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-full bg-gray-200 mx-auto mb-4 animate-pulse" />
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
          <div className="h-5 w-60 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
        <div className="bg-white rounded-[20px] border border-border p-8 space-y-5">
          <div className="h-11 bg-gray-200 rounded-[10px] animate-pulse" />
          <div className="h-11 bg-gray-200 rounded-[10px] animate-pulse" />
          <div className="h-11 bg-gray-200 rounded-[10px] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
