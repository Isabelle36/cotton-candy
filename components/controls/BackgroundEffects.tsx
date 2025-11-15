"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useAdjustments } from "@/lib/adjustmentsStore";

export function BackgroundEffects() {
  const { backgroundBlur, backgroundNoise, setBackgroundBlur, setBackgroundNoise } = useAdjustments();

  return (
    <div className="space-y-6">
      <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wide">Background Effects</h4>

      <div className="space-y-3 bg-neutral-900/30 p-3 rounded-md border border-neutral-800">
        <div className="flex justify-between items-center mb-1">
          <Label className="text-sm font-medium text-neutral-200">Blur</Label>
          <span className="text-sm text-neutral-400 font-medium">{backgroundBlur}%</span>
        </div>
        <Slider showTooltip value={[backgroundBlur]} tooltipContent={(v) => `${v}%`} onValueChange={(v) => setBackgroundBlur(v[0])} min={1} max={100} step={1} className="w-full" />
      </div>

      <div className="space-y-3 bg-neutral-900/30 p-3 rounded-md border border-neutral-800">
        <div className="flex justify-between items-center mb-1">
          <Label className="text-sm font-medium text-neutral-200">Noise</Label>
          <span className="text-sm text-neutral-400 font-medium">{backgroundNoise}%</span>
        </div>
        <Slider showTooltip value={[backgroundNoise]} tooltipContent={(v) => `${v}%`} onValueChange={(v) => setBackgroundNoise(v[0])} min={1} max={100} step={1} className="w-full" />
      </div>
    </div>
  );
}

export default BackgroundEffects;
