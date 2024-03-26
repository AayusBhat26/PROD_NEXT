import { useEffect, useState } from "react";

export const useOrigin = () => {
      const [origin, setOrigin] = useState(null);
      const [mounted, setMounted] = useState(false);

      useEffect(() => {
            if (!mounted) {
                  setOrigin(window.location.origin || "");
                  setMounted(true);
            }
      }, [mounted]);

      return origin;
};
