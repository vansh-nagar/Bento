import React from "react";

const Gsap_prac = () => {
  // Repeat the text 6 times for the background effect
  const repeatedText = Array(6).fill("HEY I'M VANSH");
  return (
    <div className="min-h-screen flex items-center justify-center lg:bg-[#e2e3d9] md:bg-red-400 sm:bg-green-400 bg-black">
      <div className="relative w-[90vw] bottom-0 h-[90vh] bg-[#f3f5f7] rounded-t-[80px] shadow-inner flex flex-col p-0 overflow-hidden">
        {/* Top bar with circles and slot */}
        <div className="flex items-center justify-between px-16 pt-10 pb-2">
          <div className="flex gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-[70px] h-[70px] rounded-full bg-[#e2e3d9] shadow-[0_4px_0_0_#bfc1b3]"
                style={{ marginTop: i === 3 ? "0px" : "0px" }}
              />
            ))}
          </div>
          <div className="w-[320px] h-[70px] rounded-[40px] bg-[#e2e3d9] shadow-[0_4px_0_0_#bfc1b3]" />
        </div>
        {/* Repeated text */}
        <div className="absolute left-0 top-[120px] w-full h-[calc(100%-120px)] flex flex-col justify-start">
          {repeatedText.map((text, idx) => (
            <div
              key={idx}
              className="text-[190px] text-justify leading-[1] font-sans font-medium text-[#d7d8d9] tracking-tight select-none opacity-80 px-16 "
              style={{ letterSpacing: "-0.04em" }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gsap_prac;
