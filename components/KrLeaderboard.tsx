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
  const [division, setDivision] = useState<string>("1"); // 기본값 1 (남성)
  const [scaled, setScaled] = useState<string>("0"); // 기본값 0 (RX)
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // 페이지당 표시할 선수 수

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        // division과 scaled 파라미터 추가
        const response = await fetch(
          `/api/leaderboard?division=${division}&scaled=${scaled}`
        );

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
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
  }, [division, scaled]); // division이나 scaled가 변경될 때마다 API 다시 호출

  // 성별 변경 핸들러
  const handleDivisionChange = (newDivision: string) => {
    setDivision(newDivision);
  };

  // 카테고리 변경 핸들러
  const handleScaledChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScaled(event.target.value);
  };

  // 현재 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

  // 한국 선수들만 필터링
  const koreanAthletes =
    leaderboardData?.leaderboardRows?.filter(
      (row) => row.entrant.countryOfOriginCode === "KR"
    ) || [];

  // 페이지네이션 로직
  const totalPages = Math.ceil(koreanAthletes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = koreanAthletes.slice(startIndex, endIndex);

  // 데이터 표시 여부 확인
  const hasNoData = !leaderboardData || !leaderboardData.leaderboardRows;
  const hasNoKoreanAthletes = koreanAthletes.length === 0;

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
        🇰🇷 CrossFit 오픈 2025 한국 선수 리더보드
      </h2>
      <p className="text-sm font-bold mb-4 sm:mb-6 text-center">
        하단의 순위는 아시아 순위 기준 입니다.
      </p>

      {/* 성별 선택 탭과 카테고리 선택을 가로로 배치 */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        {/* 성별 선택 탭 */}
        <div className="bg-gray-700 rounded-lg overflow-hidden inline-flex">
          <button
            className={`px-4 sm:px-6 py-2 font-medium ${
              division === "1"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => handleDivisionChange("1")}
          >
            남성
          </button>
          <button
            className={`px-4 sm:px-6 py-2 font-medium ${
              division === "2"
                ? "bg-pink-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => handleDivisionChange("2")}
          >
            여성
          </button>
        </div>

        {/* 카테고리 선택 (RX/Scaled/Foundations) - 크기 줄임 */}
        <select
          value={scaled}
          onChange={handleScaledChange}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-36 text-sm"
        >
          <option value="0">RX</option>
          <option value="1">Scaled</option>
          <option value="2">Foundations</option>
        </select>
      </div>

      {/* 데이터 상태에 따른 메시지 표시 */}
      {hasNoData && <div className="text-center py-10">데이터가 없습니다.</div>}

      {!hasNoData && hasNoKoreanAthletes && (
        <div className="text-center py-10">한국 선수 데이터가 없습니다.</div>
      )}

      {/* 데이터가 있는 경우에만 표시 */}
      {!hasNoData && !hasNoKoreanAthletes && (
        <>
          {/* 데이터 확인용 간단한 출력 */}
          <div className="mb-4">
            <p className="text-blue-300">
              총 한국 선수: {koreanAthletes.length}명
            </p>
          </div>

          {/* 데스크탑 뷰 - 테이블 형태 (중간 크기 이상 화면에서만 표시) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">순위</th>
                  <th className="px-4 py-2 text-left">이름</th>
                  <th className="px-4 py-2 text-left">소속</th>
                  <th className="px-4 py-2 text-center">토탈 점수</th>
                  <th className="px-4 py-2 text-center">25.1</th>
                  {currentPageData[0]?.scores.length > 1 && (
                    <th className="px-4 py-2 text-center">25.2</th>
                  )}
                  {currentPageData[0]?.scores.length > 2 && (
                    <th className="px-4 py-2 text-center">25.3</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((row) => (
                  <tr
                    key={row.entrant.competitorId}
                    className="border-t border-gray-800 hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">{row.overallRank}</td>
                    <td className="px-4 py-2">{row.entrant.competitorName}</td>
                    <td className="px-4 py-2">{row.entrant.affiliateName}</td>
                    <td className="px-4 py-2 text-center font-bold">
                      {row.overallScore}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {row.scores[0]?.scoreDisplay || "-"}
                    </td>
                    {row.scores.length > 1 && (
                      <td className="px-4 py-2 text-center">
                        {row.scores[1]?.scoreDisplay || "-"}
                      </td>
                    )}
                    {row.scores.length > 2 && (
                      <td className="px-4 py-2 text-center">
                        {row.scores[2]?.scoreDisplay || "-"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 뷰 - 카드 형태 (중간 크기 미만 화면에서만 표시) */}
          <div className="md:hidden space-y-4">
            {currentPageData.map((row) => (
              <div
                key={row.entrant.competitorId}
                className="bg-gray-900 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">
                    {row.entrant.competitorName}
                  </span>
                  <span className="bg-gray-700 px-2 py-1 rounded-md">
                    순위: {row.overallRank}
                  </span>
                </div>
                <div className="text-gray-300">
                  소속: {row.entrant.affiliateName || "없음"}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <div className="flex justify-between font-bold">
                    <span>토탈 점수:</span>
                    <span>{row.overallScore}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>25.1:</span>
                    <span>{row.scores[0]?.scoreDisplay || "-"}</span>
                  </div>
                  {row.scores.length > 1 && (
                    <div className="flex justify-between mt-1">
                      <span>25.2:</span>
                      <span>{row.scores[1]?.scoreDisplay || "-"}</span>
                    </div>
                  )}
                  {row.scores.length > 2 && (
                    <div className="flex justify-between mt-1">
                      <span>25.3:</span>
                      <span>{row.scores[2]?.scoreDisplay || "-"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 컨트롤 */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                이전
              </button>

              <span className="px-3 py-1 bg-gray-700 rounded-md">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default KrLeaderboard;
