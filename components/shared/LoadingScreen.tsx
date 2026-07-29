export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-brand flex items-center justify-center">
          <span className="text-white font-[700] text-[18px]">V</span>
        </div>
        <div className="h-1 w-32 rounded-full bg-neutral-200 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-brand animate-pulse" />
        </div>
      </div>
    </div>
  );
}
