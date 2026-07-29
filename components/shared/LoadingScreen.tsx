import Image from "next/image";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Image src="/images/logo.svg" alt="Venuze" width={140} height={25} className="h-6 w-auto" priority />
        <div className="h-1 w-32 rounded-full bg-neutral-200 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-brand animate-pulse" />
        </div>
      </div>
    </div>
  );
}
