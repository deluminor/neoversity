import { useEffect, type RefObject } from "react";

export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  isEnabled: boolean,
): void {
  useEffect(() => {
    if (!isEnabled) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (target instanceof Node && !ref.current?.contains(target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [ref, handler, isEnabled]);
}
