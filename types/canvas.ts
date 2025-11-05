// export interface Template {
//   id: string;
//   name: string;
//   background: {
//     type: "solid" | "gradient" | "image";
//     color?: string;
//     gradient?: {
//       type: "linear" | "radial";
//       colors: string[];
//       angle?: number;
//     };
//     imageUrl?: string;
//   };
// }

export interface Background {
  type: "solid" | "gradient" | "image";
  color?: string;
  gradient?: {
    from: string;
    to: string;
  };
  imageUrl?: string;
}

export interface Template {
  id: string;
  name: string;
  background: Background;
}