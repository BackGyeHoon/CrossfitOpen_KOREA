import React from "react";
import ExerciseStandard from "./ExerciseStandard";

const WorkoutDetails: React.FC = () => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-500/30">
      {/* 워크아웃 설명 섹션 */}
      <div className="mb-8">
        <div className="bg-black/50 border-2 border-yellow-400 rounded-lg p-5 mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 bg-yellow-400 text-black inline-block px-3 py-1">
            WORKOUT 25.1
          </h3>
          <div className="text-white">
            <p className="font-bold text-xl mb-3">15-minute AMRAP:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>3 lateral burpees
                over the dumbbell
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>3 dumbbell hang
                clean-to-overheads
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                30-foot walking lunge{" "}
                <span className="text-yellow-400">(2 x 15 feet)</span>
              </li>
            </ul>
            <p className="text-sm mb-4">
              *After completing each round, add 3 reps to the burpees and hang
              clean-to-overheads.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">♀</span> 35-lb (15-kg)
                dumbbell
              </div>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2">♂</span> 50-lb (22.5-kg)
                dumbbell
              </div>
            </div>
          </div>
        </div>

        {/* YouTube 링크 */}
        <a
          href="https://www.youtube.com/live/6DHhQzpbYq4?si=bo1DREhJGVKKDKBm&t=3249"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 w-full md:w-auto mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          워크아웃 25.1 라이브 영상 보기
        </a>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-center text-blue-200 border-b border-blue-500/30 pb-3">
        25.1 운동 기준 (MOVEMENT STANDARDS)
      </h3>

      {/* 운동 기준 컴포넌트들 */}
      <ExerciseStandard
        number={1}
        title="Lateral Burpee Over the Dumbbell"
        requirements={[
          "덤벨의 한쪽에서 시작합니다.",
          "가슴과 허벅지가 각 반복에서 바닥에 닿아야 합니다.",
          "손을 바닥에서 떼고 양발로 돌아옵니다.",
          "덤벨 위로 점프(양발이 지면에서 떨어져야 함)합니다.",
          "양발이 덤벨의 반대쪽에 닿으면 반복이 완료됩니다.",
        ]}
        noReps={[
          "가슴/허벅지가 바닥에 닿지 않음",
          "덤벨을 밟으며 넘어감",
          "덤벨 앞이나 뒤로 점프 (위가 아닌)",
          "점프 중 덤벨에 닿음",
        ]}
      />

      <ExerciseStandard
        number={2}
        title="Dumbbell Hang Clean-to-Overhead"
        requirements={[
          "각 반복 시작 시 덤벨은 팔을 뻗은 상태로 힙 아래에 있어야 합니다.",
          "덤벨을 랙 포지션으로 가져와야 합니다(스내치는 허용되지 않음).",
          "랙 포지션에서 오버헤드 방식은 자유롭게 선택 가능합니다.",
          "무릎, 엉덩이, 작업 팔의 팔꿈치가 완전히 펴졌을 때 반복이 완료됩니다.",
        ]}
        noReps={[
          "들어올릴 때 비작업 손/팔을 몸이나 덤벨에 접촉",
          "양손으로 덤벨 들어올리기",
          "팔꿈치, 무릎, 엉덩이가 완전히 펴지기 전에 덤벨 내리기",
          "완료 시 덤벨이 몸 앞쪽에 위치",
        ]}
      />

      <ExerciseStandard
        number={3}
        title="30-Foot Walking Lunge (2x15 feet)"
        requirements={[
          "각 런지 구간은 라인 뒤에 양발이 일렬로 서서 시작합니다.",
          "뒷발 무릎이 바닥에 닿아야 합니다.",
          "각 반복에서 무릎과 엉덩이를 펴야 합니다.",
          "양쪽 발 뒤꿈치가 15피트 라인을 완전히 넘었을 때 반복이 완료됩니다.",
          "15피트 완료 후 돌아서서 다시 시작 라인으로 런지합니다.",
        ]}
        noReps={[
          "라인에 발을 걸치고 런지 시작",
          "무릎과 엉덩이를 완전히 펴지 않음",
          "무릎이 바닥에 닿지 않음",
          "라인에 발이 걸친 채로 끝냄",
        ]}
      />
    </div>
  );
};

export default WorkoutDetails;
