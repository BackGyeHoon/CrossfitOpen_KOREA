"use client";

import TextMarquee from "@/components/TextMarquee";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Aspiration } from "@/types/aspiration";

const Home = () => {
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

  useEffect(() => {
    fetchAspirations();
  }, []);

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
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      {/* 풀스크린 비디오 배경 */}
      <video
        autoPlay
        loop
        playsInline
        muted
        poster="https://www.crossfit.com/wp-content/uploads/2022/10/15123549/Man-doing-wall-walks-with-community-cheering-1.jpg"
        src="https://www.crossfit.com/wp-content/uploads/2025/01/16143019/2025-homepage-vid-Open.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      ></video>

      {/* 중앙 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center pt-12 pb-24 text-white px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 text-center">
          <span className="inline-block transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            CROSSFIT 2025 OPEN
          </span>
        </h1>

        {/* 워크아웃 탭 네비게이션 */}
        <div className="w-full max-w-6xl mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 p-1 rounded-lg shadow-lg max-w-md">
              <div className="bg-gray-900 rounded-md p-4 h-full flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-white mb-1">25.1</h2>
                <p className="text-blue-300 text-sm">현재 공개</p>
              </div>
            </div>

            <div className="flex-1 bg-gray-700 p-1 rounded-lg shadow-lg opacity-80 max-w-md">
              <div className="bg-gray-800 rounded-md p-4 h-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-300 mb-1">25.2</h2>
                <p className="text-blue-200/70 text-sm">Coming Soon</p>
              </div>
            </div>

            <div className="flex-1 bg-gray-700 p-1 rounded-lg shadow-lg opacity-70 max-w-md">
              <div className="bg-gray-800 rounded-md p-4 h-full flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-300 mb-1">25.3</h2>
                <p className="text-blue-200/70 text-sm">Coming Soon</p>
              </div>
            </div>
          </div>

          {/* 25.1 운동 기준 테이블 */}
          <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-500/30">
            {/* 워크아웃 설명 섹션 추가 */}
            <div className="mb-8">
              <div className="bg-black/50 border-2 border-yellow-400 rounded-lg p-5 mb-6">
                <h3 className="text-2xl font-bold text-white mb-3 bg-yellow-400 text-black inline-block px-3 py-1">
                  WORKOUT 25.1
                </h3>
                <div className="text-white">
                  <p className="font-bold text-xl mb-3">15-minute AMRAP:</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>3 lateral
                      burpees over the dumbbell
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>3 dumbbell
                      hang clean-to-overheads
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      30-foot walking lunge{" "}
                      <span className="text-yellow-400">(2 x 15 feet)</span>
                    </li>
                  </ul>
                  <p className="text-sm mb-4">
                    *After completing each round, add 3 reps to the burpees and
                    hang clean-to-overheads.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">♀</span> 35-lb
                      (15-kg) dumbbell
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">♂</span> 50-lb
                      (22.5-kg) dumbbell
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-center text-blue-200 border-b border-blue-500/30 pb-3">
              25.1 운동 기준 (MOVEMENT STANDARDS)
            </h3>

            {/* 운동 1: Lateral Burpee Over the Dumbbell */}
            <div className="mb-12">
              <h4 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                <span className="inline-block w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center mr-3">
                  1
                </span>
                Lateral Burpee Over the Dumbbell
              </h4>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-green-500">
                  <h5 className="font-bold text-green-400 mb-3 uppercase text-sm tracking-wider">
                    요구사항
                  </h5>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      덤벨의 한쪽에서 시작합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      가슴과 허벅지가 각 반복에서 바닥에 닿아야 합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      손을 바닥에서 떼고 양발로 돌아옵니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      덤벨 위로 점프(양발이 지면에서 떨어져야 함)합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      양발이 덤벨의 반대쪽에 닿으면 반복이 완료됩니다.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-red-500">
                  <h5 className="font-bold text-red-400 mb-3 uppercase text-sm tracking-wider">
                    일반적인 No-Reps
                  </h5>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      가슴/허벅지가 바닥에 닿지 않음
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      덤벨을 밟으며 넘어감
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      덤벨 앞이나 뒤로 점프 (위가 아닌)
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      점프 중 덤벨에 닿음
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 운동 2: Dumbbell Hang Clean-to-Overhead */}
            <div className="mb-12">
              <h4 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                <span className="inline-block w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center mr-3">
                  2
                </span>
                Dumbbell Hang Clean-to-Overhead
              </h4>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-green-500">
                  <h5 className="font-bold text-green-400 mb-3 uppercase text-sm tracking-wider">
                    요구사항
                  </h5>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>각 반복 시작
                      시 덤벨은 팔을 뻗은 상태로 힙 아래에 있어야 합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      덤벨을 랙 포지션으로 가져와야 합니다(스내치는 허용되지
                      않음).
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>랙
                      포지션에서 오버헤드 방식은 자유롭게 선택 가능합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      무릎, 엉덩이, 작업 팔의 팔꿈치가 완전히 펴졌을 때 반복이
                      완료됩니다.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-red-500">
                  <h5 className="font-bold text-red-400 mb-3 uppercase text-sm tracking-wider">
                    일반적인 No-Reps
                  </h5>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      들어올릴 때 비작업 손/팔을 몸이나 덤벨에 접촉
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      양손으로 덤벨 들어올리기
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      팔꿈치, 무릎, 엉덩이가 완전히 펴지기 전에 덤벨 내리기
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      완료 시 덤벨이 몸 앞쪽에 위치
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 운동 3: 30-Foot Walking Lunge */}
            <div className="mb-4">
              <h4 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
                <span className="inline-block w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center mr-3">
                  3
                </span>
                30-Foot Walking Lunge (2x15 feet)
              </h4>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-green-500">
                  <h5 className="font-bold text-green-400 mb-3 uppercase text-sm tracking-wider">
                    요구사항
                  </h5>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>각 런지
                      구간은 라인 뒤에 양발이 일렬로 서서 시작합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      뒷발 무릎이 바닥에 닿아야 합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>각 반복에서
                      무릎과 엉덩이를 펴야 합니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      양쪽 발 뒤꿈치가 15피트 라인을 완전히 넘었을 때 반복이
                      완료됩니다.
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      15피트 완료 후 돌아서서 다시 시작 라인으로 런지합니다.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-red-500">
                  <h5 className="font-bold text-red-400 mb-3 uppercase text-sm tracking-wider">
                    일반적인 No-Reps
                  </h5>
                  <ul className="space-y-2 text-gray-200">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      라인에 발을 걸치고 런지 시작
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      무릎과 엉덩이를 완전히 펴지 않음
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      무릎이 바닥에 닿지 않음
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      라인에 발이 걸친 채로 끝냄
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 포부 작성 영역 */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl">
          <label
            htmlFor="aspirations"
            className="block text-lg font-semibold mb-3 text-blue-100 tracking-wide"
          >
            CrossFit 2025 Open 각오 한마디 !
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
          {aspirations.length > 0 ? (
            <TextMarquee aspirations={aspirations} />
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
