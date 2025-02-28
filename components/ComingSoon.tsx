import React from "react";

interface ComingSoonProps {
  workoutNumber: string;
  isLeaderboard?: boolean;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  workoutNumber,
  isLeaderboard,
}) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-500/30 flex flex-col items-center justify-center py-20">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {isLeaderboard ? "🇰🇷 애슬릿 리더보드" : `WORKOUT ${workoutNumber}`}
        </h3>
        <div className="text-blue-300 text-xl md:text-2xl font-semibold mb-6">
          COMING SOON
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {isLeaderboard
            ? "한국 애슬릿들의 리더보드가 곧 공개됩니다. 조금만 기다려주세요!"
            : `${workoutNumber} 워크아웃은 아직 공개되지 않았습니다. 곧 업데이트될 예정입니다.`}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
