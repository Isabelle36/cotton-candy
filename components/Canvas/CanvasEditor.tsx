"use client";
import React, { useEffect, useRef } from "react";
import Konva from "konva";
import { useAdjustments } from "@/lib/adjustmentsStore";
import { generateNoiseCanvas } from "@/lib/patterns";
import { Stage, Layer } from "react-konva";
import { applyTemplateBackground } from "@/lib/Canvas/utils";
import { getTemplateById } from "@/lib/Canvas/templates";

type CanvasEditorProps = {
  selectedTemplateId: string;
  aspectRatio: { width: number; height: number };
};


const CanvasEditor = React.memo(function CanvasEditor({ selectedTemplateId, aspectRatio }: CanvasEditorProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const { backgroundBlur, backgroundNoise } = useAdjustments();

  // Only handle background/template/aspect ratio changes here
  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!stage || !layer) return;

    // Resize stage if needed
    if (stage.width() !== aspectRatio.width || stage.height() !== aspectRatio.height) {
      stage.width(aspectRatio.width);
      stage.height(aspectRatio.height);
    }

    // Reapply template background only when template or aspect ratio changes
    const template = getTemplateById(selectedTemplateId);
    if (template) {
      applyTemplateBackground(stage, layer, template);
    }

    layer.batchDraw();
  }, [selectedTemplateId, aspectRatio.width, aspectRatio.height]);

  // Only handle blur/noise changes here
  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;
    if (!stage || !layer) return;

    // Find background rect
    const bgRect = layer.findOne('#background-rect') as unknown as Konva.Rect | null;
    if (bgRect) {
      bgRect.cache();
      if (backgroundBlur > 0) {
        try {
          bgRect.filters([Konva.Filters.Blur]);
          bgRect.blurRadius(backgroundBlur * 1.4);
          layer.batchDraw();
        } catch (e) {
          console.error('Error applying blur:', e);
        }
      } else {
        try {
          bgRect.filters([]);
          bgRect.blurRadius(0);
          layer.batchDraw();
        } catch (e) {
          console.error('Error removing blur:', e);
        }
      }
    }

    // Noise overlay
    const noiseNode = layer.findOne('#background-noise') as unknown as Konva.Rect | null;
    if (backgroundNoise > 0) {
      const noiseCanvas = generateNoiseCanvas(256, backgroundNoise * 3);
      if (!noiseNode) {
        const n = new Konva.Rect({
          id: 'background-noise',
          x: 0,
          y: 0,
          width: stage.width(),
          height: stage.height(),
          fillPatternImage: noiseCanvas as any,
          fillPatternRepeat: 'repeat',
          opacity: backgroundNoise / 100,
          globalCompositeOperation: 'overlay',
          listening: false,
        });
        layer.add(n);
        n.moveToTop();
      } else {
        noiseNode.width(stage.width());
        noiseNode.height(stage.height());
        noiseNode.fillPatternImage(noiseCanvas as any);
        noiseNode.opacity(backgroundNoise / 100);
      }
    } else {
      if (noiseNode) {
        noiseNode.destroy();
      }
    }

    layer.batchDraw();
  }, [backgroundBlur, backgroundNoise]);

  return (
    <Stage
      ref={stageRef}
      width={aspectRatio.width}
      height={aspectRatio.height}
      style={{ backgroundColor: "#111" }}
    >
      <Layer ref={layerRef} />
    </Stage>
  );
});

export default CanvasEditor;
