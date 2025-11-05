// canvas/templates.ts
import { Template,Background } from "@/types/canvas";

export const templates: Template[] = [
  {
    id: "default-dark",
    name: "Default Dark",
    background: {
      type: "solid",
      color: "#121212",
    },
  },
  {
    id: "solid-white",
    name: "White",
    background: {
      type: "solid",
      color: "#ffffff",
    },
  },
  {
    id: "gradient-candy",
    name: "Cotton Candy",
    background: {
      type: "gradient",
      gradient: { from: "#ff9a9e", to: "#fad0c4" },
    },
  },
  {
    id: "gradient-mint",
    name: "Mint Breeze",
    background: {
      type: "gradient",
      gradient: { from: "#a1c4fd", to: "#c2e9fb" },
    },
  },
  {
    id: "image-forest",
    name: "Forest",
    background: {
      type: "image",
      imageUrl: "/background images/Grasses.jpg",
    },
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
