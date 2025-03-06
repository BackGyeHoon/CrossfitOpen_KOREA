import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // URL에서 검색 파라미터 추출
    const { searchParams } = new URL(request.url);
    const division = searchParams.get("division") || "2"; // 기본값은 여성(2)
    const scaled = searchParams.get("scaled") || "0"; // 기본값은 RX(0)

    const response = await fetch(
      `https://c3po.crossfit.com/api/leaderboards/v2/competitions/open/2025/leaderboards?view=0&division=${division}&region=28&scaled=${scaled}&sort=0`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("리더보드 데이터 가져오기 오류:", error);
    return NextResponse.json(
      { error: "리더보드 데이터를 가져오는 데 실패했습니다." },
      { status: 500 }
    );
  }
}
