"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Aspiration {
  id: number;
  text: string;
  created_at: string;
}

const Home = () => {
  // eventDate를 useMemo로 감싸기
  const eventDate = useMemo(() => new Date("2025-02-28T00:00:00"), []);

  const [isEventStarted, setIsEventStarted] = useState(false);
  const [fireworks, setFireworks] = useState<
    {
      id: number;
      top: number;
      left: number;
      size: number;
      delay: number;
      color1: string;
      color2: string;
    }[]
  >([]);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [eventDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [inputText, setInputText] = useState("");
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);

  const fetchAspirations = async () => {
    try {
      const res = await fetch("/api/aspirations");
      if (res.ok) {
        const data = await res.json();
        setAspirations(data);
      }
    } catch (error) {
      console.error("Failed to fetch aspirations", error);
    }
  };

  const createFireworks = useCallback(() => {
    const newFireworks = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      size: Math.random() * 50 + 20,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color1: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
      ][Math.floor(Math.random() * 6)],
      color2: [
        "#ff8000",
        "#80ff00",
        "#8000ff",
        "#ff0080",
        "#00ff80",
        "#0080ff",
      ][Math.floor(Math.random() * 6)],
    }));

    setFireworks((prev) => [...prev, ...newFireworks]);

    // 오래된 폭죽 제거 (메모리 관리를 위해)
    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFireworks[0].id));
    }, 3000);
  }, []);

  useEffect(() => {
    fetchAspirations();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsEventStarted(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // 이벤트 시작 후 폭죽 생성
  useEffect(() => {
    if (isEventStarted) {
      // 초기 폭죽 즉시 생성
      createFireworks();

      // 주기적으로 새 폭죽 생성
      const fireworkInterval = setInterval(createFireworks, 1500);

      return () => clearInterval(fireworkInterval);
    }
  }, [isEventStarted, createFireworks]);

  const handleSubmit = async () => {
    if (inputText.trim() === "") return;
    try {
      const res = await fetch("/api/aspirations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      if (res.ok) {
        setInputText("");
        fetchAspirations();
      }
    } catch (error) {
      console.error("Error submitting aspiration", error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 풀스크린 비디오 배경 */}
      <video
        autoPlay
        loop
        playsInline
        muted
        poster="https://www.crossfit.com/wp-content/uploads/2022/10/15123549/Man-doing-wall-walks-with-community-cheering-1.jpg"
        src="https://www.crossfit.com/wp-content/uploads/2025/01/16143019/2025-homepage-vid-Open.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
      ></video>

      {/* 오버레이 – 텍스트 가독성 향상 */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      {/* 중앙 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          CROSSFIT 2025 OPEN
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          2025년 2월 28일 시작됩니다!
        </p>

        {/* 카운트다운 타이머 또는 Let's Go 화면 */}
        {isEventStarted ? (
          <div className="relative mt-4 sm:mt-8 mb-6 sm:mb-12 p-2 sm:p-4 rounded-xl overflow-hidden fireworks-container">
            <style jsx>{`
              @keyframes explosion {
                0% {
                  transform: scale(0);
                  opacity: 0;
                }
                50% {
                  opacity: 1;
                }
                100% {
                  transform: scale(1.5);
                  opacity: 0;
                }
              }

              @keyframes particle-animation {
                0% {
                  transform: translate(0, 0);
                  opacity: 1;
                }
                100% {
                  transform: translate(var(--tx), var(--ty));
                  opacity: 0;
                }
              }

              @keyframes text-pop {
                0% {
                  transform: scale(0.8);
                  opacity: 0;
                }
                50% {
                  transform: scale(1.2);
                }
                100% {
                  transform: scale(1);
                  opacity: 1;
                }
              }

              .fireworks-container {
                position: relative;
                min-height: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
              }

              .firework {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(
                  circle,
                  var(--color1) 0%,
                  var(--color2) 100%
                );
                animation: explosion 1.5s ease-out forwards;
                z-index: 5;
              }

              .particle {
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--color);
                animation: particle-animation 1s ease-out forwards;
              }

              .lets-go-text {
                font-weight: 900;
                text-align: center;
                background: linear-gradient(
                  45deg,
                  #ff4500,
                  #ffd700,
                  #00ff00,
                  #00ffff,
                  #0000ff,
                  #ff00ff,
                  #ff0000
                );
                background-size: 200% auto;
                color: transparent;
                background-clip: text;
                -webkit-background-clip: text;
                animation: text-power 1.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)
                    infinite,
                  gradient-animation 2s ease infinite,
                  text-shake 0.15s ease-in-out infinite;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
                  0 10px 10px rgba(0, 0, 0, 0.5);
                padding: 10px;
                z-index: 10;
                letter-spacing: 1px;
                transform-origin: center bottom;
                position: relative;
              }

              .lets-go-text::before {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 6px;
                background: linear-gradient(90deg, #ff0000, #ffff00);
                border-radius: 3px;
                transform: scaleX(0.8);
                opacity: 0;
                animation: barbell-appear 0.3s forwards 0.2s,
                  barbell-pulse 0.8s infinite alternate 0.5s;
              }

              .lets-go-text::after {
                content: "💪";
                position: absolute;
                right: -15px;
                top: 0;
                font-size: 0.7em;
                animation: muscle-flex 1.2s infinite;
              }

              @keyframes text-power {
                0%,
                100% {
                  transform: scale(1) translateY(0);
                }
                10% {
                  transform: scale(1.02) translateY(0);
                }
                30% {
                  transform: scale(0.95) translateY(4px);
                }
                50% {
                  transform: scale(1.05) translateY(-2px);
                }
                70% {
                  transform: scale(0.98) translateY(2px);
                }
                90% {
                  transform: scale(1.03) translateY(0);
                }
              }

              @keyframes text-shake {
                0%,
                100% {
                  transform: translateX(0) rotate(0deg);
                }
                25% {
                  transform: translateX(-1px) rotate(-0.5deg);
                }
                75% {
                  transform: translateX(1px) rotate(0.5deg);
                }
              }

              @keyframes barbell-appear {
                0% {
                  transform: scaleX(0.5);
                  opacity: 0;
                }
                100% {
                  transform: scaleX(1);
                  opacity: 1;
                }
              }

              @keyframes barbell-pulse {
                0% {
                  transform: scaleX(0.9) scaleY(1);
                }
                100% {
                  transform: scaleX(1.1) scaleY(1.3);
                }
              }

              @keyframes muscle-flex {
                0%,
                100% {
                  transform: rotate(0deg);
                }
                25% {
                  transform: rotate(-15deg) scale(1.1);
                }
                50% {
                  transform: rotate(0deg);
                }
                75% {
                  transform: rotate(15deg) scale(1.1);
                }
              }

              @keyframes gradient-animation {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
            `}</style>

            {/* 폭죽 효과 */}
            {fireworks.map((firework) => (
              <div
                key={firework.id}
                className="firework"
                style={
                  {
                    "--color1": firework.color1,
                    "--color2": firework.color2,
                    width: `${firework.size}px`,
                    height: `${firework.size}px`,
                    top: `${firework.top}%`,
                    left: `${firework.left}%`,
                    animationDelay: `${firework.delay}s`,
                  } as React.CSSProperties
                }
              >
                {/* 각 폭죽에서 튀어나가는 입자들 */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2;
                  const distance = Math.random() * 100 + 50;
                  const tx = Math.cos(angle) * distance;
                  const ty = Math.sin(angle) * distance;

                  return (
                    <div
                      key={i}
                      className="particle"
                      style={
                        {
                          "--tx": `${tx}px`,
                          "--ty": `${ty}px`,
                          "--color": firework.color1,
                          top: "50%",
                          left: "50%",
                          animationDelay: `${firework.delay + 0.1}s`,
                        } as React.CSSProperties
                      }
                    />
                  );
                })}
              </div>
            ))}

            <h2 className="lets-go-text text-4xl sm:text-5xl md:text-6xl relative z-10">
              Let's Go!
            </h2>
          </div>
        ) : (
          <div className="relative mt-4 sm:mt-8 mb-6 sm:mb-12 p-4 sm:p-8 rounded-xl overflow-hidden countdown-container">
            <style jsx>{`
              @keyframes spotlight {
                0%,
                100% {
                  background-position: -100% 0%;
                  opacity: 0.5;
                }
                50% {
                  background-position: 200% 0%;
                  opacity: 0.9;
                }
              }

              @keyframes boxPulse {
                0%,
                100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
              }

              @media (min-width: 640px) {
                @keyframes boxPulse {
                  0%,
                  100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.1);
                  }
                }
              }

              @keyframes glow {
                0%,
                100% {
                  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
                }
                50% {
                  text-shadow: 0 0 30px rgba(255, 255, 255, 0.9),
                    0 0 40px rgba(0, 157, 255, 0.8);
                }
              }

              @keyframes borderGlow {
                0%,
                100% {
                  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
                }
                50% {
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8),
                    0 0 30px rgba(0, 157, 255, 0.6);
                }
              }

              .countdown-container {
                background: rgba(0, 0, 0, 0.2);
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }

              .countdown-container::before {
                content: "";
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(
                  circle,
                  rgba(255, 255, 255, 0.9) 0%,
                  rgba(255, 255, 255, 0) 50%
                );
                animation: spotlight 8s infinite;
                pointer-events: none;
                z-index: -1;
              }

              .countdown-box {
                backdrop-filter: blur(4px);
                background: linear-gradient(
                  145deg,
                  rgba(0, 0, 0, 0.2),
                  rgba(50, 50, 100, 0.3)
                );
                border: 1px solid rgba(255, 255, 255, 0.2);
                animation: borderGlow 4s infinite alternate,
                  boxPulse 4s infinite;
              }

              .box-days {
                animation-delay: 0s;
              }

              .box-hours {
                animation-delay: 1s;
              }

              .box-minutes {
                animation-delay: 2s;
              }

              .box-seconds {
                animation-delay: 3s;
              }

              .countdown-number {
                animation: glow 3s infinite alternate;
              }
            `}</style>

            <div className="flex space-x-2 sm:space-x-4 md:space-x-6 text-center">
              <div className="countdown-box box-days p-2 sm:p-4 rounded-lg min-w-[60px] sm:min-w-[80px]">
                <p className="countdown-number text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  {timeLeft.days}
                </p>
                <span className="uppercase text-[10px] sm:text-xs md:text-sm tracking-widest">
                  일
                </span>
              </div>
              <div className="countdown-box box-hours p-2 sm:p-4 rounded-lg min-w-[60px] sm:min-w-[80px]">
                <p className="countdown-number text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  {timeLeft.hours}
                </p>
                <span className="uppercase text-[10px] sm:text-xs md:text-sm tracking-widest">
                  시간
                </span>
              </div>
              <div className="countdown-box box-minutes p-2 sm:p-4 rounded-lg min-w-[60px] sm:min-w-[80px]">
                <p className="countdown-number text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  {timeLeft.minutes}
                </p>
                <span className="uppercase text-[10px] sm:text-xs md:text-sm tracking-widest">
                  분
                </span>
              </div>
              <div className="countdown-box box-seconds p-2 sm:p-4 rounded-lg min-w-[60px] sm:min-w-[80px]">
                <p className="countdown-number text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  {timeLeft.seconds}
                </p>
                <span className="uppercase text-[10px] sm:text-xs md:text-sm tracking-widest">
                  초
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 포부 작성 textarea 영역 */}
        <div className="mt-12 w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl">
          <label
            htmlFor="aspirations"
            className="block text-lg font-semibold mb-3 text-blue-100 tracking-wide"
          >
            Crossfit 2025 Open 각오 한마디 !
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <input
                id="aspirations"
                type="text"
                placeholder="여기에 작성..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 rounded-lg bg-white/90 text-gray-800 
                placeholder:text-gray-500 focus:outline-none focus:ring-2 
                focus:ring-blue-400 focus:bg-white transition-all duration-200
                shadow-inner"
              />
            </div>
            <button
              className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 
            transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center
            min-w-[56px] h-[56px]"
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 텍스트 흐름 애니메이션 영역 */}
        <div className="mt-8 w-full overflow-hidden bg-white/5 backdrop-blur-sm py-4 rounded-lg relative">
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(50%);
              }
              100% {
                transform: translateX(-120%);
              }
            }
            .marquee-container {
              position: relative;
              width: 100%;
              overflow: hidden;
            }
            .marquee-content {
              display: inline-block;
              white-space: nowrap;
              position: relative;
              animation: marquee 15s linear infinite;
              padding-left: 50%;
            }
          `}</style>

          {aspirations.length > 0 ? (
            <div className="marquee-container">
              <div className="marquee-content">
                {aspirations.map((aspiration) => {
                  // 날짜 형식 변환
                  const date = new Date(aspiration.created_at);
                  const formattedDate = `${date.getFullYear()}/${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}/${String(date.getDate()).padStart(
                    2,
                    "0"
                  )} ${String(date.getHours()).padStart(2, "0")}:${String(
                    date.getMinutes()
                  ).padStart(2, "0")}`;

                  return (
                    <span key={aspiration.id} className="inline-block mx-4">
                      <span className="text-white/80 italic">
                        &ldquo;{aspiration.text}&rdquo; - {formattedDate}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-white/60 italic text-center">
              아직 작성된 한마디가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
