"use client";

import TextMarquee from "@/components/TextMarquee";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Aspiration } from "@/types/aspiration";
import WorkoutDetails from "@/components/WorkoutDetails";
import ComingSoon from "@/components/ComingSoon";
import AspirationsInput from "@/components/AspirationsInput";
import WorkoutTabs from "@/components/WorkoutTabs";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [activeTab, setActiveTab] = useState("25.1");

  const fetchAspirations = useCallback(async () => {
    try {
      const res = await fetch("/api/aspirations");
      if (res.ok) {
        const data = await res.json();
        setAspirations(data);
      }
    } catch (error) {
      console.error("Failed to fetch aspirations", error);
    }
  }, []);

  useEffect(() => {
    fetchAspirations();
  }, [fetchAspirations]);

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
      {/* 배경 비디오 */}
      <video
        autoPlay
        loop
        playsInline
        muted
        poster="https://www.crossfit.com/wp-content/uploads/2022/10/15123549/Man-doing-wall-walks-with-community-cheering-1.jpg"
        src="https://www.crossfit.com/wp-content/uploads/2025/01/16143019/2025-homepage-vid-Open.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      ></video>

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center pt-12 pb-24 text-white px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 text-center">
          <span className="inline-block transform hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            CROSSFIT 2025 OPEN
          </span>
        </h1>

        {/* 워크아웃 탭 네비게이션 */}
        <div className="w-full max-w-6xl mb-12">
          <WorkoutTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 탭 콘텐츠 */}
          {activeTab === "25.1" ? (
            <WorkoutDetails />
          ) : activeTab === "kr-leaderboard" ? (
            <ComingSoon workoutNumber={activeTab} isLeaderboard={true} />
          ) : (
            <ComingSoon workoutNumber={activeTab} />
          )}
        </div>

        {/* 포부 작성 영역 */}
        <AspirationsInput
          inputText={inputText}
          setInputText={setInputText}
          handleSubmit={handleSubmit}
        />

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
