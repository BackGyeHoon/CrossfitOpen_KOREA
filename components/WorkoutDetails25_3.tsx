import React, { useState } from "react";
import Image from "next/image";

const WorkoutDetails25_3 = () => {
  const [selectedVersion, setSelectedVersion] = useState<"rx" | "scaled">("rx");

  // RX 버전 컨텐츠
  const rxContent = (
    <div className="bg-black/50 border-2 border-yellow-400 rounded-lg p-5 mb-6">
      <h3 className="text-2xl font-bold text-white mb-3 bg-yellow-400 text-black inline-block px-3 py-1">
        WORKOUT 25.3
      </h3>
      <div className="text-white">
        <p className="font-bold text-xl mb-3">For time:</p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>5 월 워크
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>50 칼로리 로우
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>5 월 워크
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>25 데드리프트
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>5 월 워크
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>25 클린
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>5 월 워크
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>25 스내치
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>5 월 워크
          </li>
          <li className="flex items-start">
            <span className="text-yellow-400 mr-2">•</span>50 칼로리 로우
          </li>
        </ul>
        <p className="text-sm mb-4">Time cap: 20 minutes</p>
        <div className="grid grid-cols-1 gap-4 mt-2">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2">♀</span> 데드리프트: 70kg
            (155lb), 클린: 38kg (85lb), 스내치: 29kg (65lb)
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2">♂</span> 데드리프트: 102kg
            (225lb), 클린: 61kg (135lb), 스내치: 43kg (95lb)
          </div>
        </div>
      </div>
    </div>
  );

  // 스케일 버전 컨텐츠
  const scaledContent = (
    <div className="bg-black/50 border-2 border-green-400 rounded-lg p-5 mb-6">
      <h3 className="text-2xl font-bold text-white mb-3 bg-green-400 text-black inline-block px-3 py-1">
        WORKOUT 25.3 (SCALED)
      </h3>
      <div className="text-white">
        <p className="font-bold text-xl mb-3">For time:</p>
        <ul className="space-y-2 mb-4">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>5 월 워크 (스케일드)
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>50 칼로리 로우
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>5 월 워크 (스케일드)
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>25 데드리프트
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>5 월 워크 (스케일드)
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>25 클린
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>5 월 워크 (스케일드)
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>25 스내치
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>5 월 워크 (스케일드)
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">•</span>50 칼로리 로우
          </li>
        </ul>
        <p className="text-sm mb-4">Time cap: 20 minutes</p>
        <div className="grid grid-cols-1 gap-4 mt-2">
          <div className="flex items-center">
            <span className="text-green-400 mr-2">♀</span> 데드리프트: 38kg
            (85lb), 클린: 29kg (65lb), 스내치: 20kg (45lb)
          </div>
          <div className="flex items-center">
            <span className="text-green-400 mr-2">♂</span> 데드리프트: 61kg
            (135lb), 클린: 43kg (95lb), 스내치: 29kg (65lb)
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-blue-500/30">
      {/* 버전 선택 셀렉트박스 */}
      <div className="mb-6">
        <label
          htmlFor="version-select"
          className="block text-white mb-2 font-bold"
        >
          워크아웃 버전 선택:
        </label>
        <select
          id="version-select"
          className="w-full bg-gray-700 text-white p-3 rounded-lg border border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedVersion}
          onChange={(e) =>
            setSelectedVersion(e.target.value as "rx" | "scaled")
          }
        >
          <option value="rx">RX (정식 버전)</option>
          <option value="scaled">SCALED (스케일 버전)</option>
        </select>
      </div>

      {/* 워크아웃 설명 섹션 */}
      <div className="mb-8">
        {selectedVersion === "rx" ? rxContent : scaledContent}

        {/* 리더보드 링크 추가 */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href="https://www.youtube.com/watch?v=example"
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
            워크아웃 25.3 라이브 영상 보기
          </a>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-center text-blue-200 border-b border-blue-500/30 pb-3">
        25.3 운동 기준 (MOVEMENT STANDARDS)
      </h3>

      {/* 운동 기준 섹션 */}
      <div className="space-y-6">
        <div className="bg-gray-700/70 p-5 rounded-lg border border-blue-500/30">
          <h4 className="text-xl font-semibold mb-3 text-yellow-300">
            월 워크:
          </h4>
          <ul className="list-disc pl-6 text-white space-y-2">
            <li>
              모든 반복은 선수가 바닥에 누워 가슴, 발, 허벅지가 바닥에 닿은
              상태로 시작하고 끝납니다.
            </li>
            <li>시작과 끝에 양손은 60/55인치 테이프 라인에 닿아야 합니다.</li>
            <li>양손은 양발이 벽에 닿을 때까지 테이프 위에 있어야 합니다.</li>
            <li>
              동작 최상단에서 양손은 선수가 내려오기 전에 10인치 라인에 닿아야
              합니다.
            </li>
            <li>
              내려올 때 양발은 양손이 60/55인치 라인에 닿을 때까지 벽에 있어야
              합니다.
            </li>
          </ul>
        </div>

        <div className="bg-gray-700/70 p-5 rounded-lg border border-blue-500/30">
          <h4 className="text-xl font-semibold mb-3 text-yellow-300">로우:</h4>
          <ul className="list-disc pl-6 text-white space-y-2">
            <li>모니터는 각 로우 시작 시 0으로 설정해야 합니다.</li>
            <li>50 칼로리에 도달할 때까지 앉아 있어야 합니다.</li>
            <li>어떤 댐퍼 설정도 사용할 수 있습니다.</li>
          </ul>
        </div>

        <div className="bg-gray-700/70 p-5 rounded-lg border border-blue-500/30">
          <h4 className="text-xl font-semibold mb-3 text-yellow-300">
            데드리프트:
          </h4>
          <ul className="list-disc pl-6 text-white space-y-2">
            <li>
              바벨은 바닥에서 시작합니다(양쪽 플레이트가 바닥에 닿은 상태).
            </li>
            <li>
              손은 무릎 바깥쪽에 있어야 합니다. 스모 데드리프트는 허용되지
              않습니다.
            </li>
            <li>엉덩이와 무릎이 완전히 펴졌을 때 반복이 인정됩니다.</li>
            <li>측면에서 볼 때 머리와 어깨는 바 뒤에 있어야 합니다.</li>
          </ul>
        </div>

        <div className="bg-gray-700/70 p-5 rounded-lg border border-blue-500/30">
          <h4 className="text-xl font-semibold mb-3 text-yellow-300">클린:</h4>
          <ul className="list-disc pl-6 text-white space-y-2">
            <li>각 반복은 바가 바닥에서 시작합니다.</li>
            <li>바는 어깨까지 들어올려야 합니다.</li>
            <li>행 클린을 제외한 모든 클린 스타일이 허용됩니다.</li>
            <li>
              엉덩이와 무릎이 펴지고, 발이 일직선상에 있으며, 측면에서 볼 때
              팔꿈치가 바 앞에 있을 때 반복이 인정됩니다.
            </li>
          </ul>
        </div>

        <div className="bg-gray-700/70 p-5 rounded-lg border border-blue-500/30">
          <h4 className="text-xl font-semibold mb-3 text-yellow-300">
            스내치:
          </h4>
          <ul className="list-disc pl-6 text-white space-y-2">
            <li>각 반복은 바가 바닥에서 시작합니다.</li>
            <li>
              바벨은 한 동작으로 머리 위로 들어올려야 합니다(클린 앤 저크 금지).
            </li>
            <li>행 스내치를 제외한 모든 스내치 스타일이 허용됩니다.</li>
            <li>
              엉덩이, 무릎, 팔이 펴지고, 측면에서 볼 때 바가 신체 중앙 또는 약간
              뒤에 있으며, 발이 일직선상에 있을 때 반복이 인정됩니다.
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-700/70 p-5 rounded-lg border border-blue-500/30 mt-6">
        <h4 className="text-xl font-semibold mb-3 text-red-400">주요 규칙:</h4>
        <ul className="list-disc pl-6 text-white space-y-2">
          <li>
            체조 그립은 이 워크아웃에서{" "}
            <span className="text-red-400 font-bold">허용되지 않습니다</span>.
          </li>
          <li>
            바벨 무게 변경 시 도움을 받을 수 있으며, 여러 개의 바를 사용할 수
            있습니다.
          </li>
          <li>시간 제한에 걸린 경우, 점수는 완료한 총 반복 횟수입니다.</li>
          <li>월 워크 세트 후마다 타이브레이크 시간이 기록됩니다.</li>
          <li>로우어는 각 세트 시작 시 0으로 설정해야 합니다.</li>
          <li>모든 장비는 최소 5피트(1.5미터) 간격을 유지해야 합니다.</li>
        </ul>
      </div>

      <div className="text-center text-white text-sm mt-8 opacity-70">
        <p>
          © 2025 CrossFit, LLC. CrossFit은 등록 상표이며, 3.2.1. Go!, Fittest on
          Earth, Sport of Fitness는 CrossFit, LLC의 상표입니다. 모든 권리 보유.
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails25_3;
