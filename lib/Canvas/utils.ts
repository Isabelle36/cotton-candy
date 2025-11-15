// canvas/utils.ts
import Konva from "konva";
import type { Template } from "@/types/canvas";

export async function applyTemplateBackground(
  stage: Konva.Stage | null,
  layer: Konva.Layer | null,
  template: Template
): Promise<void> {
  if (!stage || !layer || !template?.background) return;

  const bg = template.background;

  // Remove old background
  const oldBg = layer.findOne("#background-rect");
  if (oldBg) oldBg.destroy();

  switch (bg.type) {
    case "solid": {
      const rect = new Konva.Rect({
        id: "background-rect",
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: bg.color || "#ffffff",
      });
      layer.add(rect);
      rect.moveToBottom();
      layer.batchDraw();
      break;
    }

    case "gradient": {
      const rect = new Konva.Rect({
        id: "background-rect",
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: stage.width(), y: stage.height() },
        fillLinearGradientColorStops: [
          0,
          bg.gradient?.from || "#fff",
          1,
          bg.gradient?.to || "#eee",
        ],
      });
      layer.add(rect);
      rect.moveToBottom();
      layer.batchDraw();
      break;
    }

    case "image": {
      const img = new window.Image();
      img.src = bg.imageUrl || "";
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const konvaImg = new Konva.Image({
          id: "background-rect",
          image: img,
          x: 0,
          y: 0,
          width: stage.width(),
          height: stage.height(),
        });
        layer.add(konvaImg);
        konvaImg.moveToBottom();
        layer.batchDraw();
      };
      break;
    }

    default:
      break;
  }
}
