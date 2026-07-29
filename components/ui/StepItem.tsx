interface StepItemProps {
  number: number;
  title: string;
  description: string;
}

export function StepItem({ number, title, description }: StepItemProps) {
  return (
    <div className="flex gap-5">
      <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-l from-[#FE8B16] to-[#FF5039] flex items-center justify-center flex-shrink-0 relative z-10">
        <span
          className="font-[700] text-[20px] text-white leading-none"
          style={{ letterSpacing: "-0.03em" }}
        >
          {number}
        </span>
      </div>
      <div className="flex flex-col gap-[10px] flex-1 min-w-0 pt-[3px]">
        <h3
          className="font-[600] text-[24px] leading-[30px] text-black"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p
          className="font-[400] text-[16px] leading-[24px] text-black"
          style={{ letterSpacing: "-0.03em" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
