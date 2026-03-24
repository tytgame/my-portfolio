function WhereGoPage() {
  return (
    <article className="space-y-12">
      {/* 프로젝트 헤더 */}
      <section className="border-l-2 border-primary pl-6">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">어디고 (Eodigo)</h2>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2023.04 - 2023.05</span>
        </div>
        <p className="text-lg text-gray-700 mb-6 font-light leading-relaxed">
          체크리스트 기반 여행 일정 관리 및 공유 서비스. <br className="hidden md:block" />
          드래그 앤 드롭으로 일정을 직관적으로 편집하고, 친구들과 실시간으로 여행 계획을 공유합니다.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-gray-600">
          <span>React</span>
          <span>JavaScript</span>
          <span>Spring Boot</span>
          <span>MySQL</span>
          <span>AWS EC2</span>
        </div>
      </section>

      {/* 아키텍처 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          아키텍처
        </h3>
        <img
          src=""
          alt="어디고 아키텍처"
          className="w-full rounded"
        />
      </section>

      {/* 문제 상황 */}
      <section id="wg-1" className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 정의: 비효율적인 일정 수정 UX
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>
            기존의 일정 수정 방식은 각 항목의 '수정' 버튼을 누르고, 날짜와 시간을 텍스트로 입력하는
            Form 형식이었습니다. 여행 일정 특성상 <strong>순서 변경</strong>이 빈번하게 발생하는데,
            이 방식은 사용자가 전체 흐름을 보지 못하고 개별 항목만 수정하게 하여 UX 만족도가
            현저히 낮았습니다.
          </p>
        </div>
      </section>

      {/* 해결 과정 */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">해결 과정</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Drag &amp; Drop 인터페이스 구현</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">react-beautiful-dnd</code> 라이브러리를
              도입하여 직관적인 UI를 구성했습니다. 단순히 순서만 바꾸는 것이 아니라, 날짜(Day) 간
              이동이 가능하도록 Droppable 영역을 일자별로 구분했습니다.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
              <li>
                <strong>Optimistic UI 적용:</strong> 서버 응답을 기다리지 않고 UI를 먼저 업데이트하여
                딜레이 없는 경험 제공
              </li>
              <li>
                <strong>배열 인덱스 재정렬 로직 최적화:</strong> 이동 전/후의 인덱스를 계산하여
                최소한의 API 요청만 전송
              </li>
            </ul>
          </div>
          <div className="bg-surface-light p-4 rounded border border-border-light flex flex-col justify-center gap-3">
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono mb-2">
              <span>Day 1</span>
              <span>Day 2</span>
            </div>
            <div className="flex gap-4 h-32">
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded p-2 space-y-2 bg-white">
                <div className="bg-gray-100 p-2 rounded shadow-sm text-xs border-l-4 border-gray-400">
                  경복궁 관람
                </div>
                <div className="bg-gray-100 p-2 rounded shadow-sm text-xs border-l-4 border-gray-400 opacity-50 transform translate-x-12 rotate-3 transition-transform">
                  북촌 한옥마을
                </div>
              </div>
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded p-2 bg-white">
                <div className="bg-gray-100 p-2 rounded shadow-sm text-xs border-l-4 border-gray-400">
                  명동 쇼핑
                </div>
              </div>
            </div>
            <div className="text-center text-[10px] text-gray-400 mt-2">
              사용자 경험을 위한 시각적 피드백 (Placeholder)
            </div>
          </div>
        </div>
      </section>

      {/* 최종 성과 */}
      <section className="bg-surface-light p-6 rounded-lg border border-border-light">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <span className="material-icons text-primary mr-2">check_circle</span>
          최종 성과
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 flex-1">
            여행 일정 수정 시간이 평균 <strong className="text-primary">3분에서 30초로 단축</strong>되었습니다.
            베타 테스터 설문조사 결과 "직관적인 조작감" 항목에서 5점 만점에 4.8점을 기록했습니다.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-mono">React DND</span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-mono">UX/UI</span>
          </div>
        </div>
      </section>

      {/* 회고 */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Retrospective</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          UI 라이브러리를 도입할 때 발생할 수 있는 '무거움'을 경계해야 한다는 점을 배웠습니다.
          초기에는 드래그 시 약간의 버벅임이 있었으나,{' '}
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">React.memo</code>를 활용하여
          리렌더링을 방지하고 드래그 중인 아이템의 스타일 계산을 최소화하여 60fps를 유지할 수
          있었습니다. 프론트엔드 개발자가 UX에 얼마나 큰 영향을 미칠 수 있는지 깨달은 프로젝트였습니다.
        </p>
      </section>
    </article>
  );
}

export default WhereGoPage;
