"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

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
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
  const container = useRef(null);
  const overlay = useRef(null);
  const progressBar = useRef(null);
  const svg = useRef(null);
  const [scroll, setScroll] = useState(0);
  const ball = useRef(null);
  const beam = useRef(null);

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

  useGSAP(() => {
    const paths = gsap.utils.toArray(".path");

    const balls = gsap.utils.toArray(".ball");

    gsap.set(balls, { xPercent: -50, yPercent: -50 });

    balls.forEach((ball) => {
      const randomPath = paths[Math.floor(Math.random() * paths.length)];

      gsap.to(ball, {
        duration: 10,
        delay: Math.random() * 20,
        repeat: -1,
        ease: "none",
        motionPath: {
          path: randomPath,
          align: randomPath,
          autoRotate: false,
        },
        onUpdate: function () {
          const progress = this.progress(); // 'this' refers to the GSAP tween
          console.log(progress);
          if (progress > 0.5) {
            ball.style.backgroundColor = "black";
          } else {
            ball.style.backgroundColor = "white";
          }
        },
      });
    });
  });

  useGSAP(() => {
    const path = beam.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: `${length / 10}, ${length}`,
      strokeDashoffset: 0,
    });

    gsap.to(path, {
      strokeDashoffset: -length,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    <div className=" overflow-hidden">
      <div className="h-[70vh] flex justify-center items-center text-3xl ">
        <div className=" absolute">Xicor</div>

        <svg
          width="2088"
          height="593"
          viewBox="0 0 2088 593"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 500.003C100.5 510.003 217.167 442.503 263 407.503C551 207.503 583 70.8366 563 27.5033C545.5 7.50328 499 -20.4967 453 27.5033C395.5 87.5033 513 525.003 563 535.003C613 545.003 733 392.503 728 347.503C723 302.503 593 522.503 755.5 517.503C918 512.503 856.278 327.503 778 347.503C699.722 367.503 703 592.503 893 500.003C1083 407.503 958 137.503 960.5 347.503C963 557.503 976 487.503 1021 432.5C1029.46 422.157 1104.18 335.5 1114.5 335.5C1138 335.5 1129.33 380.003 1133 407.503C1133 535.003 1163 487.503 1243 407.503C1323 327.503 1255.5 235.003 1243 285.003C1230.5 335.003 1348 475.003 1305.5 487.503C1263 500.003 1143 517.503 1203 462.503C1263 407.503 1415.5 450.003 1438 347.503C1460.5 245.003 1420.5 7.5033 1393 117.503C1365.5 227.503 1405.5 582.503 1415.5 535.003C1425.5 487.503 1438 312.503 1480.5 347.503C1523 382.503 1502 432.5 1593 517.503C1835 653.5 2000.2 603.503 2087 347.503"
            stroke="black"
            stroke-width="2"
            ref={beam}
          />
        </svg>
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
              <div className=" h-full w-full  absolute    flex justify-center items-center z-20">
                <div className=" w-full   flex justify-center items-center text-3xl ">
                  <svg
                    width="1920"
                    height="918"
                    viewBox="0 0 1920 918"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-163 130.5C183.5 459.5 810.5 434.5 947.5 434.5C1084.5 434.5 1758 472 2054.5 183"
                      stroke="#C3C3C3"
                      className="path"
                    />
                    <path
                      d="M-149 787.592C197.5 458.592 824.5 483.592 961.5 483.592C1098.5 483.592 1772 446.092 2068.5 735.092"
                      stroke="#C3C3C3"
                      className="path"
                    />
                    <path
                      d="M-28.5 1C4 367 774.5 402 911.5 402C1048.5 402 1927.5 402 1947.5 1"
                      stroke="#C3C3C3"
                      className="path"
                    />
                    <path
                      d="M-14.5 917.092C18 551.092 788.5 516.092 925.5 516.092C1062.5 516.092 1941.5 516.092 1961.5 917.092"
                      stroke="#C3C3C3"
                      className="path"
                    />
                    <path
                      d="M-252.5 422C338 447 828.5 462 965.5 462C1102.5 462 1541 462 2084.5 462"
                      stroke="#C3C3C3"
                      className="path"
                    />
                  </svg>
                </div>
                <div className="h-10 w-10 z-50 absolute  bg-black rounded-full"></div>
              </div>

              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="h-2 w-2 bg-black rounded-full ball shadow-xl z-10 absolute"
                ></div>
              ))}

              <div className="text-sm text-gray-300 z-30">
                {Math.round(scroll * 100) < 10 ? (
                  <span className=" text-green-300">
                    Welcome {Math.round(scroll * 100)}%
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
            <div className={`${colorClass} flex  flex-col`}>
              <div className="w-full h-[12vw] overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/f0/45/5a/f0455a16e8db921d07e098ae8dc7cca1.jpg"
                  alt=""
                  className="object-cover h-full  w-full hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="text-lg p-2 ">
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
