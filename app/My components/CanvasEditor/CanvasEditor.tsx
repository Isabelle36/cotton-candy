"use client";
import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { applyTemplateBackground } from "@/Canvas/utils";
import { getTemplateById } from "@/Canvas/templates";

const CanvasEditor = React.memo(function CanvasEditor({
  selectedTemplateId,
  aspectRatio,
}: {
  selectedTemplateId: string;
  aspectRatio: { width: number; height: number };
}) {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const prevSize = useRef({ width: 0, height: 0 });
  const prevTemplate = useRef<string | null>(null);

useEffect(() => {
  const stage = stageRef.current;
  const layer = layerRef.current;
  if (!stage || !layer) return;

  // Always resize stage when aspect ratio changes
  if (stage.width() !== aspectRatio.width || stage.height() !== aspectRatio.height) {
    stage.width(aspectRatio.width);
    stage.height(aspectRatio.height);
  }

  // Always reapply the template background on resize to prevent black fill
  const template = getTemplateById(selectedTemplateId);
  if (template) {
    applyTemplateBackground(stage, layer, template);
  }

  layer.batchDraw();
}, [selectedTemplateId, aspectRatio.width, aspectRatio.height]);


  return (
    <Stage
      ref={stageRef}
      width={aspectRatio.width}
      height={aspectRatio.height}
       style={{ backgroundColor: "#111" }}
      // style={{
      //   backgroundColor: "transparent",
      //   transition: "background-color 0.15s ease-out",
      // }}
    >
      <Layer ref={layerRef} />
    </Stage>
  );
});

export default CanvasEditor;
