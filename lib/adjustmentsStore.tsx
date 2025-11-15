"use client"

import * as React from "react";

type ImageShadow = {
  enabled: boolean;
  blur: number;
  offsetX: number;
  offsetY: number;
  spread: number;
  color: string;
};

type ImageBorder = {
  enabled: boolean;
  width: number;
  color: string;
};

interface AdjustmentsState {
  backgroundBlur: number;
  backgroundNoise: number; // 0-100
  imageShadow: ImageShadow;
  imageBorder: ImageBorder;
  setBackgroundBlur: (v: number) => void;
  setBackgroundNoise: (v: number) => void;
  setImageShadow: (s: Partial<ImageShadow>) => void;
  setImageBorder: (b: Partial<ImageBorder>) => void;
}

const defaultState: AdjustmentsState = {
  backgroundBlur: 0,
  backgroundNoise: 0,
  imageShadow: {
    enabled: false,
    blur: 10,
    offsetX: 0,
    offsetY: 6,
    spread: 0,
    color: 'rgba(0,0,0,0.3)',
  },
  imageBorder: {
    enabled: false,
    width: 2,
    color: '#ffffff',
  },
  setBackgroundBlur: () => {},
  setBackgroundNoise: () => {},
  setImageShadow: () => {},
  setImageBorder: () => {},
};

const AdjustmentsContext = React.createContext<AdjustmentsState>(defaultState);

export function AdjustmentsProvider({ children }: { children: React.ReactNode }) {
  const [backgroundBlur, setBackgroundBlur] = React.useState<number>(defaultState.backgroundBlur);
  const [backgroundNoise, setBackgroundNoise] = React.useState<number>(defaultState.backgroundNoise);
  const [imageShadow, setImageShadowState] = React.useState<ImageShadow>(defaultState.imageShadow);
  const [imageBorder, setImageBorderState] = React.useState<ImageBorder>(defaultState.imageBorder);

  const setImageShadow = (updates: Partial<ImageShadow>) => {
    setImageShadowState((s) => ({ ...s, ...updates }));
  };

  const setImageBorder = (updates: Partial<ImageBorder>) => {
    setImageBorderState((b) => ({ ...b, ...updates }));
  };

  const value: AdjustmentsState = {
    backgroundBlur,
    backgroundNoise,
    imageShadow,
    imageBorder,
    setBackgroundBlur,
    setBackgroundNoise,
    setImageShadow,
    setImageBorder,
  };

  return <AdjustmentsContext.Provider value={value}>{children}</AdjustmentsContext.Provider>;
}

export function useAdjustments() {
  return React.useContext(AdjustmentsContext);
}

export type { ImageShadow, ImageBorder };
