"use client";
import React, { useState, useEffect, useRef } from "react";
import CanvasEditor from "./CanvasEditor/CanvasEditor";
import { templates } from "@/Canvas/templates";
import HeroDock from "@/components/dock";

export const MainEditor = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("default-dark");
  const [panel, setPanel] = React.useState<string>("Background");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [scale, setScale] = useState(1);
  const [activeTab, setActiveTab] = useState("Solid");
  const [visibleCount, setVisibleCount] = useState(8);
  useEffect(() => {
  setVisibleCount(8);
}, [activeTab]);

  const [isAspectRatioDropdownOpen, setIsAspectRatioDropdownOpen] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  const solidTemplates = templates.filter((t) => t.background.type === "solid");
  const gradientTemplates = templates.filter(
    (t) => t.background.type === "gradient"
  );
  const imageTemplates = templates.filter((t) => t.background.type === "image");

  const aspectRatios = [
    // --- Generic / Default ---

    // --- Landscape ---
    { id: "16:9", label: "Landscape Wide (16:9)", width: 1600, height: 900 },
    { id: "3:2", label: "Landscape (3:2)", width: 1500, height: 1000 },
    { id: "5:4", label: "Classic Landscape (5:4)", width: 1250, height: 1000 },

    // --- Portrait ---
    { id: "4:5", label: "Portrait (4:5)", width: 800, height: 1000 },
    { id: "3:4", label: "Portrait (3:4)", width: 750, height: 1000 },
    { id: "9:16", label: "Full Portrait (9:16)", width: 562, height: 1000 },

    // --- Social Media & Platform-Specific ---
    { id: "IG-Post", label: "Instagram Post (1:1)", width: 1080, height: 1080 },

    {
      id: "YT-Thumb",
      label: "YouTube Thumbnail (16:9)",
      width: 1280,
      height: 720,
    },

    {
      id: "FB-Post",
      label: "Facebook Post (1.91:1)",
      width: 1200,
      height: 628,
    },
    {
      id: "FB-Cover",
      label: "Facebook Cover (820×312)",
      width: 820,
      height: 312,
    },

    {
      id: "TW-Header",
      label: "Twitter/X Header (3:1)",
      width: 1500,
      height: 500,
    },

    { id: "OG-Image", label: "Open Graph (1.91:1)", width: 1200, height: 628 },
    {
      id: "LinkedIn-Post",
      label: "LinkedIn Post (1.91:1)",
      width: 1200,
      height: 627,
    },
    {
      id: "Pinterest",
      label: "Pinterest Pin (2:3)",
      width: 1000,
      height: 1500,
    },
    { id: "Dribbble", label: "Dribbble Shot (4:3)", width: 1600, height: 1200 },
  ];

  const selectedRatio = aspectRatios.find((r) => r.id === aspectRatio)!;

  useEffect(() => {
    const updateScale = () => {
      const canvasContainer = document.querySelector(
        ".canvas-container"
      ) as HTMLElement;
      if (canvasContainer) {
        const { innerWidth, innerHeight } = window;
        const widthScale = innerWidth / selectedRatio.width;
        const heightScale = innerHeight / selectedRatio.height;
        const baseScale = Math.min(widthScale, heightScale);
        setScale(baseScale * 0.8); // Apply a scaling factor to make the canvas smaller

        // Adjust container size to fit viewport
        canvasContainer.style.width = `${innerWidth}px`;
        canvasContainer.style.height = `${innerHeight}px`;
        canvasContainer.style.overflow = "hidden"; // Prevent scrolling
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [selectedRatio]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsAspectRatioDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen w-full bg-neutral-900 font-sans text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[354px] bg-neutral-950 border-r border-neutral-800 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 shrink-0">
          <h2 className="text-base font-semibold text-neutral-200">{panel}</h2>
        </div>

        {/* Sidebar scrollable area */}
        <div className="flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Put all your existing sidebar content here (aspect ratio, tabs, templates, etc.) */}
          <div className="p-4 space-y-6">
            {/* Aspect Ratio Dropdown */}
            <div
              className="p-4 border-b  border-neutral-800 relative"
              ref={dropdownRef}
            >
              <h3 className="text-sm font-medium text-neutral-400 mb-3">
                Aspect Ratio
              </h3>
              <button
                onClick={() =>
                  setIsAspectRatioDropdownOpen(!isAspectRatioDropdownOpen)
                }
                className="w-full cursor-pointer bg-neutral-900 border border-neutral-700 rounded-md text-sm text-neutral-300 px-2 py-2 flex items-center justify-between focus:ring-1 focus:ring-purple-500 focus:outline-none"
              >
                <span>
                  {aspectRatios.find((r) => r.id === aspectRatio)?.label}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isAspectRatioDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isAspectRatioDropdownOpen && (
                <div className="absolute  top-full left-0 w-[340px] max-h-[400px] overflow-y-auto  bg-neutral-950 border border-neutral-800 rounded-xl mt-2 p-4 grid grid-cols-3 gap-3 z-20 shadow-lg animate-fadeSlideIn [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {aspectRatios.map((ratio) => {
                    const isActive = aspectRatio === ratio.id;

                    let ratioBox = 1;
                    if (ratio.id.includes(":")) {
                      const [w, h] = ratio.id.split(":").map(Number);
                      if (w && h) ratioBox = w / h;
                    } else {
                      ratioBox = ratio.width / ratio.height;
                    }

                    const maxPreviewSize = 36;
                    const previewWidth =
                      ratioBox >= 1 ? maxPreviewSize : maxPreviewSize * ratioBox;
                    const previewHeight =
                      ratioBox <= 1 ? maxPreviewSize : maxPreviewSize / ratioBox;

                    return (
                      <button
                        key={ratio.id}
                        onClick={() => {
                          setAspectRatio(ratio.id);
                          setIsAspectRatioDropdownOpen(false);
                        }}
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border transition-all duration-150 py-3 px-2 ${
                          isActive
                            ? "border-purple-500 bg-purple-500/10 text-purple-400"
                            : "border-neutral-700 bg-neutral-900 hover:border-purple-400 hover:text-neutral-100"
                        }`}
                      >
                        {/* Ratio Preview */}
                        <div
                          className={`flex items-center justify-center border-2 rounded-sm mb-2 ${
                            isActive ? "border-purple-500" : "border-neutral-600"
                          }`}
                          style={{
                            width: `${previewWidth}px`,
                            height: `${previewHeight}px`,
                          }}
                        />
                        <span className="text-xs font-medium truncate w-full text-center">
                          {ratio.id}
                        </span>
                        <span className="text-[10px] text-neutral-500 text-center leading-tight truncate">
                          {ratio.label.replace(/\(.*?\)/, "").trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex justify-center p-1 space-x-3">
              {["Solid", "Gradient", "Image"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-[7px] cursor-pointer rounded-[10px] text-[15px] font-medium text-black/80 
                 bg-[#B363FE] shadow-[inset_0_2px_4px_#D0A5F8] 
                 transition-all duration-200 hover:bg-[#B363FE]/90"
                  style={{
                    boxShadow: "inset 0 2px 4px #D0A5F8",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
          {/* Scrollable content */}
              {/* Scrollable sidebar section */}
              <div className="flex-1 overflow-y-auto p-4 space-y-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {activeTab === "Image" && (
                  <section>
                    <h2 className="text-white/80 mb-[7px] text-[15px] font-medium">
                      Background Type
                    </h2>
                    <h3 className="text-sm font-normal text-neutral-400 mb-3">
                      Images
                    </h3>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {imageTemplates.slice(0, visibleCount).map((tpl) => {
                        const isActive = selectedTemplateId === tpl.id;
                        return (
                          <button
                            key={tpl.id}
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`h-20 rounded-lg overflow-hidden relative border transition-all cursor-pointer ${
                              isActive
                                ? "border-purple-500 brightness-65 scale-[1.02]"
                                : ""
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

                    {/* Show More button */}
                    {visibleCount < imageTemplates.length && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 8)}
                          className="w-full py-2 bg-[#1f1f1f]/80 hover:bg-[#1f1f1f] cursor-pointer text-white/70 rounded-[10px] font-medium text-sm transition-all hover:text-white"
                        >
                          Show More
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* Same “Show More” logic for Solid */}
                {activeTab === "Solid" && (
                  <section>
                    <h2 className="text-white/80 mb-[7px] text-[15px] font-medium">
                      Background Type
                    </h2>
                    <h3 className="text-sm font-normal text-neutral-400 mb-3">
                      Solid Colors
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {solidTemplates.slice(0, visibleCount).map((tpl) => {
                        const isActive = selectedTemplateId === tpl.id;
                        return (
                          <button
                            key={tpl.id}
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`h-16 rounded-lg transition-all border cursor-pointer ${
                              isActive
                                ? "border-purple-500 brightness-65 scale-[1.02]"
                                : ""
                            }`}
                            style={{ backgroundColor: tpl.background.color }}
                            title={tpl.name}
                          />
                        );
                      })}
                    </div>

                    {visibleCount < solidTemplates.length && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 8)}
                          className="w-full py-2 bg-[#1f1f1f]/80 hover:bg-[#1f1f1f] cursor-pointer text-white/70 rounded-[10px] font-medium text-sm transition-all hover:text-white"
                        >
                          Show More
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* Gradient Section */}
                {activeTab === "Gradient" && (
                  <section>
                    <h2 className="text-white/80 mb-[7px] text-[15px] font-medium">
                      Background Type
                    </h2>
                    <h3 className="text-sm font-normal text-neutral-400 mb-3">
                      Gradients
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {gradientTemplates.slice(0, visibleCount).map((tpl) => {
                        const isActive = selectedTemplateId === tpl.id;
                        const from = tpl.background.gradient?.from || "#000";
                        const to = tpl.background.gradient?.to || "#111";
                        return (
                          <button
                            key={tpl.id}
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`h-16 rounded-lg cursor-pointer transition-all border ${
                              isActive
                                ? "border-purple-500 brightness-65 scale-[1.02]"
                                : ""
                            }`}
                            style={{
                              background: `linear-gradient(135deg, ${from}, ${to})`,
                            }}
                            title={tpl.name}
                          />
                        );
                      })}
                    </div>

                    {visibleCount < gradientTemplates.length && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 8)}
                          className="w-full py-2 bg-[#1f1f1f]/80 hover:bg-[#1f1f1f] cursor-pointer text-white/70 rounded-[10px] font-medium text-sm transition-all hover:text-white"
                        >
                          Show More 
                        </button>
                      </div>
                    )}
                  </section>
                )}
              </div>
              </div>
        

        {/* Footer (fixed at bottom) */}
        <div className="p-4 border-t border-neutral-800 text-center text-xs text-neutral-500 flex-shrink-0">
          Cotton cloud ✨
        </div>
        </div>
      </aside>

      {/* Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center canvas-container">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "center",
            width: selectedRatio.width,
            height: selectedRatio.height,
          }}
          className="relative bg-neutral-800"
        >
          <CanvasEditor
            selectedTemplateId={selectedTemplateId}
            aspectRatio={selectedRatio}
          />
        </div>
        <HeroDock onSelect={(label: string) => setPanel(label)} />
      </div>
    </div>
  );
};
