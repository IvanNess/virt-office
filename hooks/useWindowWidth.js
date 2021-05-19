import { useState, useEffect } from "react";

const useWindowWidth = () => {

  // Store the state
  const [width, setWidth] = useState(document.documentElement.clientWidth);

  // On Scroll
  const onChange = () => {
    // console.log('width', document.documentElement.clientWidth)
    setWidth(document.documentElement.clientWidth);
  };

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("resize", onChange);
    };
  });

  if (typeof window === "undefined") return 500;

  return width;
};

export default useWindowWidth;
