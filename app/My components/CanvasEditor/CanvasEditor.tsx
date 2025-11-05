"use client";
import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { applyTemplateBackground } from "@/Canvas/utils";
import { getTemplateById } from "@/Canvas/templates";

export default function CanvasEditor({
  selectedTemplateId,
  aspectRatio,
}: {
  selectedTemplateId: string;
  aspectRatio: { width: number; height: number };
}) {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!stage || !layer) return;

    const template = getTemplateById(selectedTemplateId);
    if (template) {
      applyTemplateBackground(stage, layer, template);
    }

    stage.width(aspectRatio.width);
    stage.height(aspectRatio.height);
    layer.draw();
  }, [selectedTemplateId, aspectRatio]);

  return (
    <Stage
      ref={stageRef}
      width={aspectRatio.width}
      height={aspectRatio.height}
      className="rounded-lg shadow-xl border border-neutral-800 bg-black"
    >
      <Layer ref={layerRef} />
    </Stage>
  );
}
