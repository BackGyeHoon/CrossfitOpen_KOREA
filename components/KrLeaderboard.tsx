import React, { useState, useEffect } from "react";

// API 응답 타입 정의
interface LeaderboardEntrant {
  competitorId: string;
  competitorName: string;
  firstName: string;
  lastName: string;
  gender: string;
  countryOfOriginName: string;
  countryOfOriginCode: string;
  affiliateName: string;
  age: string;
}

interface LeaderboardScore {
  ordinal: number;
  rank: string;
  scoreDisplay: string;
  breakdown: string;
}

interface LeaderboardRow {
  overallRank: string;
  overallScore: string;
  entrant: LeaderboardEntrant;
  scores: LeaderboardScore[];
}

interface LeaderboardData {
  pagination: {
    totalPages: number;
    totalCompetitors: number;
    currentPage: number;
  };
  leaderboardRows: LeaderboardRow[];
}

const KrLeaderboard: React.FC = () => {
  const [division, setDivision] = useState<string>("2"); // 기본값 2 (여성)
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        // division 파라미터 추가
        const response = await fetch(`/api/leaderboard?division=${division}`);

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        console.log("리더보드 데이터:", data);
        setLeaderboardData(data);
        setError(null);
      } catch (err) {
        console.error("리더보드 데이터 로딩 오류:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [division]); // division이 변경될 때마다 API 다시 호출

  // 성별 변경 핸들러
  const handleDivisionChange = (newDivision: string) => {
    setDivision(newDivision);
  };

  // 데이터 로딩 중 표시
  if (loading) {
    return (
      <div className="text-center py-10">데이터를 불러오는 중입니다...</div>
    );
  }

  // 오류 발생 시 표시
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  // 데이터가 없는 경우
  if (!leaderboardData || !leaderboardData.leaderboardRows) {
    return <div className="text-center py-10">데이터가 없습니다.</div>;
  }

  // 한국 선수들만 필터링
  const koreanAthletes = leaderboardData.leaderboardRows.filter(
    (row) => row.entrant.countryOfOriginCode === "KR"
  );

  // 한국 선수가 없는 경우
  if (koreanAthletes.length === 0) {
    return (
      <div className="text-center py-10">한국 선수 데이터가 없습니다.</div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🇰🇷 CrossFit 오픈 2025 한국 선수 리더보드
      </h2>

      {/* 성별 선택 탭 */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-700 rounded-lg overflow-hidden inline-flex">
          <button
            className={`px-6 py-2 font-medium ${
              division === "1"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => handleDivisionChange("1")}
          >
            남성
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              division === "2"
                ? "bg-pink-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => handleDivisionChange("2")}
          >
            여성
          </button>
        </div>
      </div>

      {/* 데이터 확인용 간단한 출력 */}
      <div className="mb-4">
        <p className="text-blue-300">총 한국 선수: {koreanAthletes.length}명</p>
      </div>

      {/* 한국 선수 리더보드 출력 */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">순위</th>
              <th className="px-4 py-2 text-left">이름</th>
              <th className="px-4 py-2 text-left">국가</th>
              <th className="px-4 py-2 text-left">소속</th>
              <th className="px-4 py-2 text-left">25.1 점수</th>
            </tr>
          </thead>
          <tbody>
            {koreanAthletes.map((row) => (
              <tr
                key={row.entrant.competitorId}
                className="border-t border-gray-800 hover:bg-gray-800"
              >
                <td className="px-4 py-2">{row.overallRank}</td>
                <td className="px-4 py-2">{row.entrant.competitorName}</td>
                <td className="px-4 py-2">{row.entrant.countryOfOriginName}</td>
                <td className="px-4 py-2">{row.entrant.affiliateName}</td>
                <td className="px-4 py-2">{row.scores[0]?.scoreDisplay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KrLeaderboard;
