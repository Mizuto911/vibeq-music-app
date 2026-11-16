import { useEffect } from "react";

export default function usePlayShortcut(
  callback: () => void,
  deps: Array<any>,
) {
  useEffect(() => {
    function onPlayShortcut(e: KeyboardEvent) {
      if (e.code === "Space") {
        if (e.repeat) return;
        const activeTag = document.activeElement?.tagName;
        if (
          activeTag === "INPUT" ||
          activeTag === "TEXTAREA" ||
          activeTag === "BUTTON"
        )
          return;
        e.preventDefault();
        callback();
      }
    }
    document.addEventListener("keydown", onPlayShortcut);
    return () => document.removeEventListener("keydown", onPlayShortcut);
  }, deps);
}
