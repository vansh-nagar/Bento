"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const catData = [
  {
    name: "Silly Man",
    img: "https://i.pinimg.com/736x/e6/91/5f/e6915f99d22f50c1bd4e2ff8da2cc7f0.jpg",
  },
  {
    name: "Curious Man",
    img: "https://i.pinimg.com/736x/70/27/82/70278271b61d65caf231fe6be083805a.jpg",
  },
  {
    name: "Habibi come to dubai",
    img: "https://i.pinimg.com/736x/89/3e/2d/893e2de3507229bb27bfb54918155d7a.jpg",
  },
  {
    name: "Gamer man",
    img: "https://i.pinimg.com/originals/cf/22/70/cf227062b7fb0672f2c1c7e57f5a5288.png",
  },
  {
    name: "Suprised man",
    img: "https://i.pinimg.com/736x/6e/b4/92/6eb49258d170a7b39e26e5e97c736a57.jpg",
  },

  {
    name: "Angry man",
    img: "https://i.pinimg.com/1200x/7f/2a/87/7f2a87535bd4caa82c87e3f3fe17d8a4.jpg",
  },
  {
    name: "Cutie",
    img: "https://i.pinimg.com/736x/90/4c/84/904c840b4b97764e0426fcbdb8a9b805.jpg",
  },
];

const Page3 = () => {
  gsap.registerPlugin(ScrollTrigger);

  const container = useRef(null);
  const overlay = useRef(null);
  const progressBar = useRef(null);
  const [scroll, setScroll] = useState(0);

  const colorClass =
    "bg-[#282828] border border-[#454545] rounded-xl card overflow-hidden";

  useGSAP(() => {
    if (window.innerWidth < 800) return;

    const cards = gsap.utils.toArray(".card");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "5000px",
        scrub: 1,
        pin: window.innerWidth >= 768, // Only pin on screens >= 768px
        onUpdate: (self) => {
          setScroll(self.progress);
          if (self.direction === 1) {
            console.log("Scrolling Down");
          } else if (self.direction === -1) {
            overlay.current.classList.add("hidden");
            cards.forEach((card) => {
              card.classList.remove("z-50");
            });
          }
        },
      },
    });

    cards.forEach((card) => {
      tl.to(card, {
        ease: "linear",
        z: 50,
        onStart: () => {
          card.classList.add("z-50");
          overlay.current.classList.remove("hidden");
        },
      });

      tl.to(card, {
        ease: "linear",
        onComplete: () => {
          card.classList.remove("z-50");
          overlay.current.classList.add("hidden");
        },
      });
    });
  }, []);

  return (
    <div>
      <div className="h-[70vh] w-full bg-white flex justify-center items-center text-3xl">
        Xicor
      </div>

      <div
        ref={container}
        className="overflow-hidden h-[100vh] max-md:h-full flex justify-center items-center text-white max-md:p-4"
      >
        <div className="bg-[#161616] relative h-[95vh] max-md:h-full w-[80vw] max-md:w-full rounded-3xl p-4 grid-cols-3 grid max-md:grid-cols-1 border border-[#464646] gap-2">
          <div
            ref={overlay}
            className="absolute rounded-3xl bg-black/40 h-full w-full z-10 hidden backdrop-blur-[0.7px]"
          ></div>

          {/* Left panel with scrollable cat list */}
          <div
            className="grid  gap-2 overflow-hidden"
            style={{ gridTemplateRows: "calc(60% - 4px) calc(40% - 4px)" }}
          >
            <div
              className={`${colorClass} p-4 flex flex-col gap-2 overflow-auto custom-scrollbar overflow-y-auto`}
            >
              {catData.map((data, index) => (
                <div
                  key={index}
                  className="h-16 bg-[#565656] rounded-xl flex items-center p-4 gap-4 hover:scale-105 "
                >
                  <img
                    src={data.img}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>{data.name}</div>
                </div>
              ))}
            </div>
            <div
              className={`${colorClass} relative overflow-hidden flex justify-center items-center`}
            >
              <div
                ref={progressBar}
                className="absolute bottom-0 left-0 right-0 h-1 rounded-xl bg-blue-100 "
                style={{ transform: `scaleX(${scroll})` }}
              ></div>
              <div className="text-sm text-gray-300">
                {Math.round(scroll * 100) < 10 ? (
                  <span className=" text-green-300">
                    Welcome 0{Math.round(scroll * 100)}%
                  </span>
                ) : Math.round(scroll * 100) > 90 ? (
                  <span className=" text-red-500">
                    Bye {Math.round(scroll * 100)}%
                  </span>
                ) : (
                  <span>Progress {Math.round(scroll * 100)}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Cat image panel */}
          <div className="grid relative overflow-hidden h-full">
            <div className={`${colorClass} group `}>
              <img
                src="https://i.pinimg.com/originals/e8/1d/b3/e81db31055b278a4b2446c017fbd42fd.png"
                alt=""
                className=" h-full"
              />
              <img
                src="/hoverCat.png"
                alt=""
                className="absolute bottom-0 right-0 group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          {/* Right column with content blocks */}
          <div
            className="grid gap-2"
            style={{ gridTemplateRows: "calc(40% - 4px) calc(60% - 4px)" }}
          >
            <div className={colorClass}>
              <div className="w-full h-44 overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/f0/45/5a/f0455a16e8db921d07e098ae8dc7cca1.jpg"
                  alt=""
                  className="object-cover h-full w-full hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="text-lg p-2">
                Integrate seamlessly with your existing app
                <p className="text-xs text-gray-400">
                  Plug into your current workflow without changing your stack.
                </p>
              </div>
            </div>

            <div className={colorClass}>
              <div className="overflow-hidden h-72 w-full">
                <img
                  src="https://i.pinimg.com/736x/d5/a4/89/d5a489bb93b300ff135d12262a8ca45a.jpg"
                  alt=""
                  className="object-cover h-full w-full hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="p-2">
                <div className="text-lg">Moments That Bloom</div>
                <p className="text-xs text-white">
                  Playful paws, quiet skies, and flowers that whisper peace.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  In a world that moves too fast, pause — and let joy catch you
                  like petals in the breeze. Whether it’s a curious leap, a soft
                  sniff, or a gaze full of wonder, every tiny moment is a memory
                  waiting to bloom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen w-full flex justify-center items-center bg-white">
        Check out Xicor UI now!!!
      </div>
    </div>
  );
};

export default Page3;
