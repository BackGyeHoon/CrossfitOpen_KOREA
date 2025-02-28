import React from "react";

interface ComingSoonProps {
  workoutNumber: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ workoutNumber }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md p-10 rounded-xl shadow-xl border border-blue-500/30 text-center">
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-gray-400 mb-6 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-4xl font-bold text-blue-200 mb-4">Coming Soon</h3>
        <p className="text-gray-300 max-w-md">
          워크아웃 {workoutNumber}는 아직 공개되지 않았습니다. 곧 공개될
          예정이니 조금만 기다려주세요!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
