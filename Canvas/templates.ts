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
  {
    id: "image-green-mountains",
    name: "Green Mountains",
    background: {
      type: "image" as const,
      imageUrl: "/background images/Green mountains.jpg",
    },
  },
  // Adding mac os images
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `image-mac-os-${i + 1}`,
    name: `Mac OS ${i + 1}`,
    background: {
      type: "image" as const,
      imageUrl: `/background images/mac os ${i + 1}.${i + 1 === 12 || i + 1 === 13 ? "png" : i + 1 === 1 || i + 1 === 2 || i + 1 === 4 ? "jpeg" : i + 1 === 3 ? "png" : "jpg"}`,
    },
  })),
  // Adding min images
  ...Array.from({ length: 27 }, (_, i) => ({
    id: `image-min-${i + 1}`,
    name: `Min ${i + 1}`,
    background: {
      type: "image" as const,
      imageUrl: `/background images/min ${i + 1}.jpg`,
    },
  })),
  // Adding 10 more solid color templates
  {
    id: "solid-red",
    name: "Solid Red",
    background: {
      type: "solid",
      color: "#FF0000",
    },
  },
  {
    id: "solid-blue",
    name: "Solid Blue",
    background: {
      type: "solid",
      color: "#0000FF",
    },
  },
  {
    id: "solid-green",
    name: "Solid Green",
    background: {
      type: "solid",
      color: "#00FF00",
    },
  },
  {
    id: "solid-yellow",
    name: "Solid Yellow",
    background: {
      type: "solid",
      color: "#FFFF00",
    },
  },
  {
    id: "solid-purple",
    name: "Solid Purple",
    background: {
      type: "solid",
      color: "#800080",
    },
  },
  {
    id: "solid-orange",
    name: "Solid Orange",
    background: {
      type: "solid",
      color: "#FFA500",
    },
  },
  {
    id: "solid-pink",
    name: "Solid Pink",
    background: {
      type: "solid",
      color: "#FFC0CB",
    },
  },
  {
    id: "solid-teal",
    name: "Solid Teal",
    background: {
      type: "solid",
      color: "#008080",
    },
  },
  {
    id: "solid-brown",
    name: "Solid Brown",
    background: {
      type: "solid",
      color: "#A52A2A",
    },
  },
  {
    id: "solid-gray",
    name: "Solid Gray",
    background: {
      type: "solid",
      color: "#808080",
    },
  },
  // Adding 10 more gradient templates
  {
    id: "gradient-sunset",
    name: "Sunset",
    background: {
      type: "gradient",
      gradient: { from: "#FF7E5F", to: "#FEB47B" },
    },
  },
  {
    id: "gradient-ocean",
    name: "Ocean",
    background: {
      type: "gradient",
      gradient: { from: "#2193B0", to: "#6DD5ED" },
    },
  },
  {
    id: "gradient-forest",
    name: "Forest",
    background: {
      type: "gradient",
      gradient: { from: "#56AB2F", to: "#A8E063" },
    },
  },
  {
    id: "gradient-fire",
    name: "Fire",
    background: {
      type: "gradient",
      gradient: { from: "#FF512F", to: "#DD2476" },
    },
  },
  {
    id: "gradient-sky",
    name: "Sky",
    background: {
      type: "gradient",
      gradient: { from: "#36D1DC", to: "#5B86E5" },
    },
  },
  {
    id: "gradient-peach",
    name: "Peach",
    background: {
      type: "gradient",
      gradient: { from: "#ED4264", to: "#FFEDBC" },
    },
  },
  {
    id: "gradient-lavender",
    name: "Lavender",
    background: {
      type: "gradient",
      gradient: { from: "#B24592", to: "#F15F79" },
    },
  },
  {
    id: "gradient-ice",
    name: "Ice",
    background: {
      type: "gradient",
      gradient: { from: "#74EBD5", to: "#ACB6E5" },
    },
  },
  {
    id: "gradient-berry",
    name: "Berry",
    background: {
      type: "gradient",
      gradient: { from: "#8E2DE2", to: "#4A00E0" },
    },
  },
  {
    id: "gradient-citrus",
    name: "Citrus",
    background: {
      type: "gradient",
      gradient: { from: "#FDC830", to: "#F37335" },
    },
  },
  // Adding 3 gradient templates with shapes
  {
    id: "gradient-circle",
    name: "Circle Gradient",
    background: {
      type: "gradient",
      gradient: { from: "#FF9A8B", to: "#FF6A88" },
    },
  },
  {
    id: "gradient-square",
    name: "Square Gradient",
    background: {
      type: "gradient",
      gradient: { from: "#00C6FF", to: "#0072FF" },
    },
  },
  {
    id: "gradient-triangle",
    name: "Triangle Gradient",
    background: {
      type: "gradient",
      gradient: { from: "#F7971E", to: "#FFD200" },
    },
  },
  // Replacing some gradients with abstract and mesh gradients
  {
    id: "gradient-abstract-sunset",
    name: "Abstract Sunset",
    background: {
      type: "gradient",
      gradient: { from: "#FF5F6D", to: "#FFC371" },
    },
  },
  {
    id: "gradient-mesh-vibrant",
    name: "Mesh Vibrant",
    background: {
      type: "gradient",
      gradient: { from: "#FF6FD8", to: "#3813C2" },
    },
  },
  {
    id: "gradient-mesh-pastel",
    name: "Mesh Pastel",
    background: {
      type: "gradient",
      gradient: { from: "#A1C4FD", to: "#C2E9FB" },
    },
  },
  {
    id: "gradient-mesh-sunset",
    name: "Mesh Sunset",
    background: {
      type: "gradient",
      gradient: { from: "#FF9A9E", to: "#FAD0C4" },
    },
  },
  {
    id: "gradient-mesh-dreamscape",
    name: "Mesh Dreamscape",
    background: {
      type: "gradient",
      gradient: { from: "#FAD0C4", to: "#FFD1FF" },
    },
  },
  {
    id: "gradient-mesh-ocean",
    name: "Mesh Ocean",
    background: {
      type: "gradient",
      gradient: { from: "#2193B0", to: "#6DD5ED" },
    },
  },
  {
    id: "gradient-mesh-peach",
    name: "Mesh Peach",
    background: {
      type: "gradient",
      gradient: { from: "#ED4264", to: "#FFEDBC" },
    },
  },
  {
    id: "gradient-mesh-forest",
    name: "Mesh Forest",
    background: {
      type: "gradient",
      gradient: { from: "#56CCF2", to: "#2F80ED" },
    },
  },
  {
    id: "gradient-mesh-abstract",
    name: "Mesh Abstract",
    background: {
      type: "gradient",
      gradient: { from: "#FF5F6D", to: "#FFC371" },
    },
  },
  {
    id: "gradient-mesh-vivid",
    name: "Mesh Vivid",
    background: {
      type: "gradient",
      gradient: { from: "#5EE7DF", to: "#B490CA" },
    },
  },
  {
    id: "gradient-mesh-flame",
    name: "Mesh Flame",
    background: {
      type: "gradient",
      gradient: { from: "#FF9A8B", to: "#FF6A88" },
    },
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
