"use client";
import React, { useState } from "react";
import CanvasEditor from "./CanvasEditor/CanvasEditor";
import { templates } from "@/Canvas/templates";
import HeroDock from "@/components/dock";

export const MainEditor = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("default-dark");
  const [panel, setPanel] = React.useState<string>("Background");
  const [aspectRatio, setAspectRatio] = useState("16:9");

  const solidTemplates = templates.filter((t) => t.background.type === "solid");
  const gradientTemplates = templates.filter((t) => t.background.type === "gradient");
  const imageTemplates = templates.filter((t) => t.background.type === "image");

  const aspectRatios = [
    { id: "16:9", label: "Landscape (16:9)", width: 1000, height: 562 },
    { id: "9:16", label: "Portrait (9:16)", width: 562, height: 1000 },
    { id: "1:1", label: "Square (1:1)", width: 800, height: 800 },
  ];

  const selectedRatio = aspectRatios.find((r) => r.id === aspectRatio)!;

  return (
    <div className="flex min-h-screen w-full bg-neutral-900 font-sans text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-neutral-950 border-r border-neutral-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800">
          <h2 className="text-base font-semibold text-neutral-200">🎨 Background</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Choose a preset or gradient
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {/* Aspect Ratio */}
          <section>
            <h3 className="text-sm font-medium text-neutral-400 mb-3">Aspect Ratio</h3>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-md text-sm text-neutral-300 px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              {aspectRatios.map((ratio) => (
                <option key={ratio.id} value={ratio.id}>
                  {ratio.label}
                </option>
              ))}
            </select>
          </section>

          {/* Solid Colors */}
          <section>
            <h3 className="text-sm font-medium text-neutral-400 mb-3">
              Solid Colors
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {solidTemplates.map((tpl) => {
                const isActive = selectedTemplateId === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`h-16 rounded-lg transition-all border ${
                      isActive
                        ? "border-blue-500 ring-1 ring-blue-500/40 scale-105"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                    style={{ backgroundColor: tpl.background.color }}
                    title={tpl.name}
                  />
                );
              })}
            </div>
          </section>

          {/* Gradients */}
          <section>
            <h3 className="text-sm font-medium text-neutral-400 mb-3">
              Gradients
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {gradientTemplates.map((tpl) => {
                const isActive = selectedTemplateId === tpl.id;
                const from = tpl.background.gradient?.from || "#000";
                const to = tpl.background.gradient?.to || "#111";
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`h-16 rounded-lg transition-all border ${
                      isActive
                        ? "border-blue-500 ring-1 ring-blue-500/40 scale-[1.03]"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${from}, ${to})`,
                    }}
                    title={tpl.name}
                  />
                );
              })}
            </div>
          </section>

          {/* Images */}
          <section>
            <h3 className="text-sm font-medium text-neutral-400 mb-3">
              Images
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {imageTemplates.map((tpl) => {
                const isActive = selectedTemplateId === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`h-20 rounded-lg overflow-hidden relative border transition-all ${
                      isActive
                        ? "border-blue-500 ring-1 ring-blue-500/40 scale-[1.02]"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    <img
                      src={tpl.background.imageUrl}
                      alt={tpl.name}
                      className="object-cover w-full h-full"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 text-center text-xs text-neutral-500">
          Cotton Candy ✨
        </div>
      </aside>

      {/* Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <CanvasEditor
          selectedTemplateId={selectedTemplateId}
          aspectRatio={selectedRatio}
        />
        <HeroDock onSelect={(label: string) => setPanel(label)} />
      </div>
    </div>
  );
};
