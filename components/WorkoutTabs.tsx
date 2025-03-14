import React from "react";

interface WorkoutTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const WorkoutTabs: React.FC<WorkoutTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <TabButton
        id="25.1"
        label="현재 공개"
        isActive={activeTab === "25.1"}
        onClick={() => onTabChange("25.1")}
      />
      <TabButton
        id="25.2"
        label="현재 공개"
        isActive={activeTab === "25.2"}
        onClick={() => onTabChange("25.2")}
      />
      <TabButton
        id="25.3"
        label="현재 공개"
        isActive={activeTab === "25.3"}
        onClick={() => onTabChange("25.3")}
      />
      <TabButton
        id="🇰🇷 애슬릿 순위"
        label="🇰🇷 애슬릿 순위"
        isActive={activeTab === "kr-leaderboard"}
        onClick={() => onTabChange("kr-leaderboard")}
      />
    </div>
  );
};

interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 p-1 rounded-lg shadow-lg max-w-md transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-700"
          : "bg-gray-700 opacity-80 hover:opacity-100"
      }`}
    >
      <div
        className={`rounded-md p-4 h-full flex flex-col items-center justify-center ${
          isActive ? "bg-gray-900" : "bg-gray-800"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-1 ${
            isActive ? "text-white" : "text-gray-300"
          }`}
        >
          {id}
        </h2>
        <p
          className={`text-sm ${
            isActive ? "text-blue-300" : "text-blue-200/70"
          }`}
        >
          {label}
        </p>
      </div>
    </button>
  );
};

export default WorkoutTabs;
