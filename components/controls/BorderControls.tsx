"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdjustments } from "@/lib/adjustmentsStore";

export function BorderControls() {
  const { imageBorder, setImageBorder } = useAdjustments();

  const onChange = (updates: Partial<typeof imageBorder>) => setImageBorder(updates);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Image Border</Label>
        <Button size="sm" variant={imageBorder.enabled ? "default" : "outline"} onClick={() => onChange({ enabled: !imageBorder.enabled })}>
          {imageBorder.enabled ? "Enabled" : "Disabled"}
        </Button>
      </div>

      {imageBorder.enabled && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Label className="text-sm">Width</Label>
            <div className="flex-1">
              <Slider value={[imageBorder.width]} onValueChange={(v) => onChange({ width: v[0] })} min={0} max={40} step={1} />
            </div>
            <div className="w-12 text-sm">{imageBorder.width}px</div>
          </div>

          <div className="flex items-center gap-3">
            <Label className="text-sm">Color</Label>
            <Input type="color" value={imageBorder.color} onChange={(e) => onChange({ color: e.target.value })} />
          </div>
        </div>
      )}
    </div>
  );
}

export default BorderControls;
