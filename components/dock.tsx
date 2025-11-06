import React from "react";
import { Type, Scan, CloudUpload, Image as WallpaperIcon, SlidersVertical, Laptop, Save, ArrowDownToLine } from "lucide-react";


export default function HeroDock({ onSelect }: { onSelect?: (panel: string) => void }) {
  const accent =
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue("--hero-accent").trim()
      : "";

  const accentStyle: React.CSSProperties = accent
    ? ({ "--accent": accent } as React.CSSProperties)
    : ({} as React.CSSProperties);

  return (
    <div style={accentStyle}>

      {/* fixed bottom-center wrapper: pointer-events-none to allow clicks through outer area, pointer-events-auto on inner box */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-40">
        <div className="pointer-events-auto w-full max-w-[720px] px-4">
          <div className="flex ml-[38%] items-center justify-center">
            <Dock onSelect={onSelect} />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        :root { --accent: hsl(0 0% 100% / 0.9); }
        .dark :root, .dark { --accent: hsl(0 0% 100% / 0.9); }
        .light :root, .light { --accent: hsl(0 0% 0% / 0.9); }

        @keyframes marqueeLeft { 0% { transform: translateX(-60%); } 100% { transform: translateX(0%); } }
        @keyframes marqueeRight { 0% { transform: translateX(60%); } 100% { transform: translateX(0%); } }
        .animate-marquee-left { animation: marqueeLeft 8s linear infinite alternate; }
        .animate-marquee-right { animation: marqueeRight 8s linear infinite alternate; }

        .hover-halo{position:relative}
        .hover-halo::after{content:"";position:absolute;inset:-1px;border-radius:inherit;opacity:0;transition:opacity .25s, transform .25s;box-shadow:0 0 0 0 rgba(255,255,255,.12),0 10px 24px -8px rgba(0,0,0,.6)}
        .hover-halo:hover::after{opacity:1;}
        .tooltip{opacity:0;transform:translateY(6px);transition:opacity .2s, transform .2s}
        .group:hover .tooltip{opacity:1;transform:translateY(0)}
      `}</style>
    </div>
  );
}

function Dock({ onSelect }: { onSelect?: (panel: string) => void }) {
  return (
    <div className="relative flex items-center gap-1 sm:gap-2 scale-75 sm:scale-90">
      <div className="flex items-center gap-2 rounded-2xl bg-neutral-900/80 px-2 py-1.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg sm:gap-3 sm:rounded-3xl sm:px-3 sm:py-2">
        <DockIcon icon={Type} label="Text" onSelect={onSelect} />
        {/* <DockIcon icon={Scan} label="Aspect Ratio" onSelect={onSelect} /> */}
        <DockIcon icon={CloudUpload} label="Image Upload" onSelect={onSelect} />
        <DockIcon icon={WallpaperIcon} label="Background" onSelect={onSelect} />
        {/* <DockIcon icon={SlidersVertical} label="Adjust" /> */}
        <DockIcon icon={Laptop} label="Mac Frame" onSelect={onSelect} />
        <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" aria-hidden="true" />
        <DockIcon icon={Save} label="Save Design" />
        <DockIcon icon={ArrowDownToLine} label="Download"  />
      </div>
    </div>
  );
}

function DockIcon({ icon: Icon, label, badge, onSelect }: { icon: any; label: string; badge?: string; onSelect?: (panel: string) => void }) {
  return (
    <button
      className="hover-halo group cursor-pointer relative grid h-10 w-10 place-items-center rounded-lg ring-1 ring-white/10 bg-gradient-to-b from-neutral-800/60 to-neutral-900/70 backdrop-blur-xl shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03] sm:h-12 sm:w-12"
      aria-label={label}
      onClick={() => onSelect?.(label)}
    >
      <Icon className="h-4 w-4 text-white/85 transition-transform duration-200 group-hover:scale-105" strokeWidth={2.1} />
      {badge ? (
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-white text-[9px] font-semibold text-neutral-900 ring-1 ring-white/80 sm:h-4 sm:w-4 sm:text-[9px]">
          {badge}
        </span>
      ) : null}
        <span className="tooltip pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-5 translate-y-1/2 whitespace-nowrap px-2 text-[8px] tracking-wide text-white/70 sm:text-[9px]">
        {label}
      </span>
    </button>
  );
}
