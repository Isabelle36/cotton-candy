export interface AspectRatioItem {
  id: string;
  label: string;
  width: number;
  height: number;
}

export const aspectRatios: AspectRatioItem[] = [
  { id: '16:9', label: 'Landscape Wide (16:9)', width: 1600, height: 900 },
  { id: '3:2', label: 'Landscape (3:2)', width: 1500, height: 1000 },
  { id: '5:4', label: 'Classic Landscape (5:4)', width: 1250, height: 1000 },
  { id: '4:5', label: 'Portrait (4:5)', width: 800, height: 1000 },
  { id: '3:4', label: 'Portrait (3:4)', width: 750, height: 1000 },
  { id: '9:16', label: 'Full Portrait (9:16)', width: 562, height: 1000 },
  { id: 'IG-Post', label: 'Instagram Post (1:1)', width: 1080, height: 1080 },
  { id: 'YT-Thumb', label: 'YouTube Thumbnail (16:9)', width: 1280, height: 720 },
  { id: 'FB-Post', label: 'Facebook Post (1.91:1)', width: 1200, height: 628 },
  { id: 'FB-Cover', label: 'Facebook Cover (820×312)', width: 820, height: 312 },
  { id: 'TW-Header', label: 'Twitter/X Header (3:1)', width: 1500, height: 500 },
  { id: 'OG-Image', label: 'Open Graph (1.91:1)', width: 1200, height: 628 },
  { id: 'LinkedIn-Post', label: 'LinkedIn Post (1.91:1)', width: 1200, height: 627 },
  { id: 'Pinterest', label: 'Pinterest Pin (2:3)', width: 1000, height: 1500 },
  { id: 'Dribbble', label: 'Dribbble Shot (4:3)', width: 1600, height: 1200 },
];

export default aspectRatios;
