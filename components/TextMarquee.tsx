"use client";

import { useEffect, useRef, useState } from "react";
import { Aspiration } from "@/types/aspiration";

interface TextMarqueeProps {
  aspirations: Aspiration[];
}

const TextMarquee = ({ aspirations }: TextMarqueeProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollSpeed = 1; // 스크롤 속도 (픽셀/프레임)

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    // 컨테이너 너비를 초기에 창 너비로 설정
    setScrollPosition(containerRef.current.clientWidth);

    let frameId = requestAnimationFrame(animate);

    function animate() {
      if (!scrollRef.current || !containerRef.current) return;

      // 스크롤 위치 업데이트
      setScrollPosition((prev) => {
        // 스크롤이 완전히 나가면 다시 오른쪽에서 시작
        if (prev <= -scrollRef.current!.scrollWidth) {
          return containerRef.current!.clientWidth;
        }
        return prev - scrollSpeed;
      });

      frameId = requestAnimationFrame(animate);
    }

    // 컴포넌트 언마운트 시 애니메이션 취소
    return () => cancelAnimationFrame(frameId);
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="inline-block whitespace-nowrap"
        style={{ transform: `translateX(${scrollPosition}px)` }}
      >
        {aspirations.map((aspiration) => (
          <span key={aspiration.id} className="inline-block mx-4">
            <span className="text-white/80 italic">
              &ldquo;{aspiration.text}&rdquo; -{" "}
              {formatDate(aspiration.created_at)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextMarquee;
