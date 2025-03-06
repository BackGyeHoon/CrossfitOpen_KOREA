import React from "react";
import ExerciseStandard from "./ExerciseStandard";

const WorkoutDetails25_2: React.FC = () => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-500/30">
      {/* 워크아웃 설명 섹션 */}
      <div className="mb-8">
        <div className="bg-black/50 border-2 border-yellow-400 rounded-lg p-5 mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 bg-yellow-400 text-black inline-block px-3 py-1">
            WORKOUT 25.2
          </h3>
          <div className="text-white">
            <p className="font-bold text-xl mb-3">12-minute AMRAP:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>3 bar muscle-ups
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>6 thrusters
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>30 double-unders
              </li>
            </ul>
            <p className="text-sm mb-4">
              *추가 라운드마다 bar muscle-ups과 thrusters가 3과 6씩 증가합니다
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">♀</span> 85-lb (38-kg)
                바벨
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">♂</span> 115-lb (52-kg)
                바벨
              </div>
            </div>
          </div>
        </div>

        {/* 리더보드 링크 추가 */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href="https://www.youtube.com/live/kt_XWmdtVxk?si=C8L3qK2znnOuJ6On&t=2793"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            워크아웃 25.2 라이브 영상 보기
          </a>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-center text-blue-200 border-b border-blue-500/30 pb-3">
        25.2 운동 기준 (MOVEMENT STANDARDS)
      </h3>

      {/* 운동 기준 컴포넌트들 */}
      <ExerciseStandard
        number={1}
        title="Bar Muscle-Up"
        requirements={[
          "팔을 완전히 펴고 발이 바닥에서 떨어진 상태로 각 반복을 시작합니다.",
          "딥 동작 일부를 거쳐서 바 위로 잠금 상태가 되어야 합니다.",
          "지지 자세에서 팔이 완전히 펴져 있어야 합니다.",
          "측면에서 보았을 때 어깨가 바로 위에 있거나 약간 앞에 있어야 합니다.",
        ]}
        noReps={[
          "팔을 완전히 펴지 않고 반복 시작",
          "발이 풀업 바 위로 올라가는 경우",
          "팔(손 외에) 일부가 바에 닿는 경우",
          "확장 전에 내려오는 경우",
          "지지 자세에서 몸통이 바 위에 있는 경우",
        ]}
      />

      <ExerciseStandard
        number={2}
        title="Thruster"
        requirements={[
          "하단 위치에서 고관절의 접히는 부분이 무릎 상단 아래로 명확하게 내려가야 합니다.",
          "고관절, 무릎, 팔이 완전히 펴졌을 때 반복이 인정됩니다.",
          "측면에서 보았을 때, 바가 신체 중앙 위나 뒤에 위치해야 합니다.",
        ]}
        noReps={[
          "평행 이하로 내려가지 않는 스쿼트",
          "무릎, 고관절, 팔의 완전한 확장 전에 바벨 내리기",
          "신체 앞에서 바벨 마무리",
        ]}
      />

      <ExerciseStandard
        number={3}
        title="Double-Under"
        requirements={[
          "한 번의 점프 동안 줄이 발 아래로 두 번 통과해야 합니다.",
          "줄은 앞쪽으로 회전해야 합니다.",
          "스케일 부문의 경우, 각 점프마다 줄이 발 아래로 한 번 통과합니다.",
        ]}
        noReps={[
          "성공적인 반복 대신 시도만 카운트하는 경우",
          "줄을 뒤로 회전시키는 경우",
        ]}
      />

      <ExerciseStandard
        number={4}
        title="스케일 옵션 - Jumping Pull-Up/Chest-to-Bar"
        requirements={[
          "바는 운동선수가 똑바로 섰을 때 머리 위로 최소 6인치(15cm) 위에 있어야 합니다.",
          "각 반복 시작 시 팔을 완전히 펴야 합니다.",
          "점프 풀업: 턱이 바의 수평선을 명확히 넘을 때 반복이 인정됩니다.",
          "점프 체스트투바: 가슴이 쇄골 높이 또는 그 아래에서 바에 닿을 때 반복이 인정됩니다.",
        ]}
        noReps={[
          "팔을 완전히 펴지 않고 반복 시작",
          "점프 풀업: 턱이 바의 수평선을 넘지 않음",
          "점프 체스트투바: 쇄골 아래로 바에 접촉하지 않음",
        ]}
      />
    </div>
  );
};

export default WorkoutDetails25_2;
