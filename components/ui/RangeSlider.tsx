"use client";

import { useCallback, useRef } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  formatLabel = (v) => String(v),
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const leftPercent = ((value[0] - min) / (max - min)) * 100;
  const rightPercent = ((value[1] - min) / (max - min)) * 100;

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Math.min(Number(e.target.value), value[1] - 1);
      onChange([v, value[1]]);
    },
    [value, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Math.max(Number(e.target.value), value[0] + 1);
      onChange([value[0], v]);
    },
    [value, onChange]
  );

  return (
    <div className="relative pt-6 pb-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-[400] text-neutral-text-muted">
          {formatLabel(value[0])}
        </span>
        <span className="text-[13px] font-[400] text-neutral-text-muted">
          {formatLabel(value[1])}
        </span>
      </div>

      <div ref={trackRef} className="relative h-1 bg-neutral-200 dark:bg-neutral-300 rounded-full">
        <div
          className="absolute h-full bg-brand rounded-full"
          style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={handleMinChange}
        className="absolute top-[30px] left-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white dark:[&::-webkit-slider-thumb]:bg-dark-card [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white dark:[&::-moz-range-thumb]:bg-dark-card [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        style={{ zIndex: value[0] === max ? 5 : 3 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={handleMaxChange}
        className="absolute top-[30px] left-0 w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brand [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-brand [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
        style={{ zIndex: 4 }}
      />
    </div>
  );
}
