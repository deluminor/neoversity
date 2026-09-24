import Image from "next/image";
import type { CSSProperties } from "react";

import { CAR_IMAGE_PLACEHOLDER } from "@/constants/assets";

import styles from "./CarImage.module.css";

interface CarImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  ratio?: number;
}

export function CarImage({ src, alt, sizes, priority = false, ratio }: CarImageProps) {
  return (
    <div
      className={styles.wrapper}
      style={ratio ? ({ "--car-image-ratio": ratio } as CSSProperties) : undefined}
    >
      <Image
        src={src || CAR_IMAGE_PLACEHOLDER}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.image}
      />
    </div>
  );
}
