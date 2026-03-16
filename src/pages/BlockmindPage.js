function BlockmindPage() {
  return (
    <article className="space-y-12">
      {/* 프로젝트 헤더 */}
      <section className="border-l-2 border-primary pl-6">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">BlockMind</h2>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2026.01 - 2026.03</span>
        </div>
        <p className="text-lg text-gray-700 mb-6 font-light leading-relaxed">
          AI 기반 블록 단위 지식 관리 서비스. <br className="hidden md:block" />
          메모와 아이디어를 블록으로 분리·연결하여 개인 지식 그래프를 형성하고,
          프로젝트별 맥락을 체계적으로 관리합니다.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-gray-600">
          <span>React</span>
          <span>TypeScript</span>
          <span>Node.js</span>
          <span>PostgreSQL</span>
          <span>OpenAI API</span>
        </div>
      </section>

      {/* 문제 상황 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 정의: AI 응답 스트리밍 처리 중 UI 불일치
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>
            OpenAI API의 스트리밍 응답을 React 상태에 실시간으로 반영하는 과정에서
            <strong> 청크 단위 파싱 오류</strong>와 <strong>컴포넌트 불필요 리렌더링</strong>이라는 두 가지 문제가 발생했습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">청크 파싱 오류:</strong>{' '}
              SSE(Server-Sent Events) 스트림에서 수신되는 데이터가 네트워크 상태에 따라
              여러 청크로 분리되거나 합쳐져 수신되었습니다. 단순 문자열 분할 방식으로는
              JSON 파싱 오류가 간헐적으로 발생했고, 응답 텍스트가 도중에 잘리는 현상이 나타났습니다.
            </li>
            <li>
              <strong className="text-gray-900">과도한 리렌더링:</strong>
              스트리밍 중 매 청크마다 상태를 갱신하면서 블록 목록 전체가 리렌더링되어
              타이핑 효과가 끊기고 입력 커서가 초기화되는 UX 문제가 발생했습니다.
            </li>
          </ul>
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

      {/* 최종 성과 */}
      <section className="bg-surface-light p-6 rounded-lg border border-border-light">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <span className="material-icons text-primary mr-2">check_circle</span>
          최종 성과
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">Zero</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">파싱 오류</div>
            <p className="text-xs text-gray-400 mt-2">간헐적 JSON 오류 완전 제거</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">70%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">체감 응답속도 향상</div>
            <p className="text-xs text-gray-400 mt-2">끊김 없는 타이핑 효과 구현</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">90%↓</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">불필요 리렌더링</div>
            <p className="text-xs text-gray-400 mt-2">블록 단위 메모이제이션 적용</p>
          </div>
        </div>
      </section>

      {/* 회고 */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Retrospective</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          스트리밍 API를 처음 다루며 네트워크 레이어의 불확실성을 UI 레이어에서 어떻게 흡수해야 하는지 배웠습니다.
          특히 외부 API의 응답 형식을 그대로 신뢰하지 않고, 항상 방어적으로 파싱하는 습관의 중요성을 체감했습니다.
          추후에는 스트리밍 상태를 전역 스토어와 연동하여 네트워크 단절 시 재연결 및 이어받기 기능을 구현하고 싶습니다.
        </p>
      </section>
    </article>
  );
}

export default BlockmindPage;
