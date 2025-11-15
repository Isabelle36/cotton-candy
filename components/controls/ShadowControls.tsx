"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdjustments } from "@/lib/adjustmentsStore";

export function ShadowControls() {
  const { imageShadow, setImageShadow } = useAdjustments();

  const onChange = (updates: Partial<typeof imageShadow>) => setImageShadow(updates);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Image Shadow</Label>
        <Button size="sm" variant={imageShadow.enabled ? "default" : "outline"} onClick={() => onChange({ enabled: !imageShadow.enabled })}>
          {imageShadow.enabled ? "Enabled" : "Disabled"}
        </Button>
      </div>

      {imageShadow.enabled && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Label className="text-sm">Blur</Label>
            <div className="flex-1">
              <Slider value={[imageShadow.blur]} onValueChange={(v) => onChange({ blur: v[0] })} min={0} max={100} step={1} />
            </div>
            <div className="w-12 text-sm">{imageShadow.blur}px</div>
          </div>

          <div className="flex items-center gap-3">
            <Label className="text-sm">Offset X</Label>
            <div className="flex-1">
              <Slider value={[imageShadow.offsetX]} onValueChange={(v) => onChange({ offsetX: v[0] })} min={-50} max={50} step={1} />
            </div>
            <div className="w-12 text-sm">{imageShadow.offsetX}px</div>
          </div>

          <div className="flex items-center gap-3">
            <Label className="text-sm">Offset Y</Label>
            <div className="flex-1">
              <Slider value={[imageShadow.offsetY]} onValueChange={(v) => onChange({ offsetY: v[0] })} min={-50} max={50} step={1} />
            </div>
            <div className="w-12 text-sm">{imageShadow.offsetY}px</div>
          </div>

          <div className="flex items-center gap-3">
            <Label className="text-sm">Color</Label>
            <Input type="color" value={(() => {
              const m = imageShadow.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
              if (m) {
                const r = parseInt(m[1]).toString(16).padStart(2, '0');
                const g = parseInt(m[2]).toString(16).padStart(2, '0');
                const b = parseInt(m[3]).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
              }
              return '#000000';
            })()} onChange={(e) => {
              const hex = e.target.value;
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              // keep alpha from current color
              const alpha = (imageShadow.color.match(/rgba\([^)]+,\s*([\d.]+)\)/) || [])[1] || '0.3';
              onChange({ color: `rgba(${r}, ${g}, ${b}, ${alpha})` });
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShadowControls;
