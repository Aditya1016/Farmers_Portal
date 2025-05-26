import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const lineRef = useRef();
  const leftDivRef = useRef();
  const rightDivRef = useRef();
  const spinnerDivRef = useRef();

  useEffect(() => {
    const t1 = gsap.timeline();

    t1.fromTo(
      leftDivRef.current,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1.5, scale: 1.2, ease: "power2.out" }
    )
      .fromTo(
        rightDivRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, scale: 1.2, ease: "power2.out" },
        "<"
      )
      .fromTo(
        lineRef.current,
        { height: "0%" },
        { height: "100%", duration: 1.5, ease: "power2.out" }
      )
      .to(leftDivRef.current, { x: "-300%", duration: 1.5, ease: "power2.out" })
      .to(
        rightDivRef.current,
        { x: "300%", duration: 1.5, ease: "power2.out" },
        "<"
      )
      .to(lineRef.current, { opacity: 0, duration: 1, ease: "power2.out" }, "<")
      .to(
        spinnerDivRef.current,
        { opacity: 0, duration: 1, ease: "power2.out" },
        "<"
      );
  }, []);

  return (
    <div>
      <div
        ref={lineRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-white"
      ></div>

      <div className="w-screen h-screen flex items-center justify-center">
        <div className="ml-1 text-white flex gap-8 text-6xl font-robert-medium">
          <div ref={leftDivRef} className="text-green-400">
            <h1>Farm</h1>
          </div>
          <div ref={rightDivRef} className="text-green-400">
            <h1>
              ify{" "}
              <img
                className="size-16 inline"
                src="/icons/logo.png"
                alt="logo"
              />
            </h1>
          </div>
        </div>
        <div ref={spinnerDivRef} className="spinner-container">
          <div className="spinner opacity-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
