function BlockmindPage() {
  return (
    <article className="space-y-12">
      {/* 프로젝트 헤더 */}
      <section>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">BlockMind</h2>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2026.01 - 2026.03</span>
        </div>
        <p className="text-lg text-gray-700 mb-6 font-light leading-relaxed">
        사용자의 대화를 바탕으로 정보를 블록으로 추출하고, <br/>
        AI 대화에서 어떤 컨텍스트가 답변에 반영되는지 시각화하고 제어할 수 있는 서비스
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-gray-600">
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Zustand</span>
          <span>Tailwind CSS</span>
          <span>Supabase</span>
          <span>Jest</span>
          <span>Playwright</span>
        </div>
      </section>

      {/* 아키텍처 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          아키텍처
        </h3>
        <img
          src="/blockmindArc.png"
          alt="BlockMind 아키텍처"
          className="w-full rounded"
        />
      </section>

      {/* 문제 상황 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 : 블록 비활성화가 AI 응답에 반영되지 않는 문제
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>
          블록 비활성화를 누르면 해당 정보가 다음 응답부터 즉시 제외될 것으로 기대했습니다. <br/>
          하지만 실제로는 블록을 비활성화해도 AI가 블록에 있는 이름, 나이, 직업 등을 그대로 기억하고 답변했습니다. 
          </p>
          <br/>
          <div>
            <p className="font-bold text-gray-900 mb-2">예시</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>블록 내용: "홍길동, 강남, 30세, 백엔드 엔지니어"</li>
              <li>블록 비활성화 후 질문: "내 이름이 뭐야?"</li>
              <li>기대: "알 수 없습니다"</li>
              <li>실제: "홍길동님입니다"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 원인 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          원인
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
        <img
          src=""
          alt="블록 토글 시 요청 흐름"
          className="w-full rounded"
        />
        <div className="prose max-w-none text-gray-600">
          <p>원인 설명</p>
        </div>
      </section>

      {/* 해결 과정 */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">해결 과정</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <h4 className="font-bold text-gray-900 mb-2">1. 버퍼 기반 스트림 파서 구현</h4>
            <p className="text-sm text-gray-600">
              수신된 청크를 즉시 파싱하지 않고 내부 버퍼에 누적한 뒤,
              완전한 SSE 라인(<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">data: ...</code>) 단위로만 파싱하도록 로직을 변경했습니다.
            </p>
          </div>
          <div className="md:col-span-8 bg-surface-light p-4 rounded border border-border-light font-mono text-xs overflow-x-auto custom-scrollbar">
            <pre className="text-gray-800">{`// 버퍼 기반 SSE 파서 (Pseudo-code)
let buffer = '';
reader.on('chunk', (chunk) => {
  buffer += chunk;
  const lines = buffer.split('\\n');
  buffer = lines.pop(); // 미완성 라인은 버퍼에 유지
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const json = JSON.parse(line.slice(6));
      appendToken(json.choices[0].delta.content);
    }
  }
});`}</pre>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-gray-900 mb-2">2. 렌더링 최적화</h4>
            <p className="text-sm text-gray-600">
              스트리밍 중인 블록만 격리된 상태로 관리하고,
              <code className="text-xs bg-gray-100 px-1 py-0.5 rounded mx-1">React.memo</code>로
              완성된 블록의 리렌더링을 차단했습니다.
              스트리밍 완료 시에만 전역 상태에 커밋하는 방식으로 불필요한 업데이트를 제거했습니다.
            </p>
          </div>
          <div className="md:col-span-8 border border-dashed border-border-light p-4 rounded flex items-center justify-center text-sm text-gray-400">
            <span className="material-icons mr-2">schema</span>
            스트리밍 블록 격리 → 완료 후 전역 커밋
          </div>
        </div>
      </section>

      {/* 결과 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          결과
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>결과 내용</p>
        </div>
      </section>

      {/* ───────────── 2번째 문제 ───────────── */}

      {/* 문제 상황 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 :
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* 원인 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          원인
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* 해결 과정 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          해결 과정
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* 결과 2 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          결과
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* ───────────── 3번째 문제 ───────────── */}

      {/* 문제 상황 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 :
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* 원인 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          원인
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* 해결 과정 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          해결 과정
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>

      {/* 결과 3 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          결과
        </h3>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>
    </article>
  );
}

export default BlockmindPage;
