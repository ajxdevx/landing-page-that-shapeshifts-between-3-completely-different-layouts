import { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { arrangements, itemSizes } from "../data/creativeClutter";

gsap.registerPlugin(Flip);

export function useDeskLayout(setActiveMode) {
  const deskRef = useRef(null);
  const headerRef = useRef(null);
  const itemRefs = useRef({});
  const activeModeRef = useRef("chaos");

  const setItemRef = useCallback((id) => {
    return (element) => {
      if (element) {
        itemRefs.current[id] = element;
      } else {
        delete itemRefs.current[id];
      }
    };
  }, []);

  const getFlipTargets = useCallback(() => {
    const header = headerRef.current;
    const items = Object.values(itemRefs.current);
    return header ? [header, ...items] : items;
  }, []);

  const setLayout = useCallback((mode) => {
    const desk = deskRef.current;
    const header = headerRef.current;
    if (!desk || !header) return;

    const deskWidth = desk.offsetWidth;
    const deskHeight = desk.offsetHeight;
    const layout = arrangements[mode];

    const isMobile = deskWidth < 1000;
    const offsetX = isMobile
      ? header.offsetWidth / 2
      : layout.header.center
        ? header.offsetWidth / 2
        : 0;
    const offsetY = isMobile
      ? header.offsetHeight / 2
      : layout.header.center
        ? header.offsetHeight / 2
        : 0;
    const headerX = isMobile ? 50 : layout.header.x;
    const headerY = isMobile ? 47.5 : layout.header.y;

    gsap.set(header, {
      x: (headerX / 100) * deskWidth - offsetX,
      y: (headerY / 100) * deskHeight - offsetY,
      rotation: 0,
    });

    layout.items.forEach(({ id, x, y, rotation }) => {
      const item = itemRefs.current[id];
      if (!item) return;

      gsap.set(item, {
        x: (x / 100) * deskWidth,
        y: (y / 100) * deskHeight,
        width: itemSizes[id],
        height: itemSizes[id],
        rotation,
      });
    });
  }, []);

  const switchMode = useCallback(
    (mode) => {
      if (mode === activeModeRef.current) return;

      const state = Flip.getState(getFlipTargets());
      setLayout(mode);

      Flip.from(state, {
        duration: 1.25,
        ease: "power3.inOut",
        stagger: { amount: 0.1, from: "center" },
        absolute: true,
      });

      activeModeRef.current = mode;
      setActiveMode(mode);
    },
    [getFlipTargets, setLayout, setActiveMode],
  );

  useLayoutEffect(() => {
    setLayout("chaos");

    const handleResize = () => setLayout(activeModeRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setLayout]);

  return { deskRef, headerRef, setItemRef, switchMode };
}
