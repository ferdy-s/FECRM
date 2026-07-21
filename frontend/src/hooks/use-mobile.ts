import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useMobile() {

  const [isMobile, setIsMobile] =
    React.useState(() =>
      typeof window !== "undefined"
        ? window.innerWidth <
            MOBILE_BREAKPOINT
        : false
    );

  React.useEffect(() => {

    const mql =
      window.matchMedia(
        `(max-width: ${
          MOBILE_BREAKPOINT - 1
        }px)`
      );

    const onChange = (
      event: MediaQueryListEvent
    ) => {
      setIsMobile(event.matches);
    };

    mql.addEventListener(
      "change",
      onChange
    );

    return () =>
      mql.removeEventListener(
        "change",
        onChange
      );

  }, []);

  return isMobile;
}

/**
 * Backward compatibility
 * Used by shadcn sidebar
 */
export const useIsMobile =
  useMobile;