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
        사용자의 대화를 바탕으로 정보를 블록으로 생성하고, <br/>
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
          src="/blockmindArc2.png"
          alt="BlockMind 아키텍처"
          className="w-full rounded"
        />
      </section>

      {/* 1번째 문제 */}
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

        <br/>

        {/* 원인 */}
        <h4 className="text-xl font-bold text-gray-900">원인</h4>
        <img
          src="/BlockmindReason1.png"
          alt="블록 토글 시 요청 흐름"
          className="w-full max-w-2xl mx-auto rounded"
        />
        <div className="prose max-w-none text-gray-600">
          <p>처음에는 세션에서 LLM이 정보를 기억하는 내부의 고유한 특성 문제라고 생각했지만,
          개발자 도구 Network의 채팅 payload를 뜯어본 결과 systemPrompt는 제거됐지만 해당 정보를 담고있는 message 배열은 그대로 전송하고 있다는게 원인으로 밝혀졌습니다.<br/>
          문제의 본질은 LLM 기억이 아니라 UI 상태와 inference payload가 서로 다른 소스 오브 트루스를 가지고 있었던 것이었습니다.
          </p>
        </div>

        <br/>

        {/* 해결 과정 */}
        <h4 className="text-xl font-bold text-gray-900">해결 과정</h4>
        <div className="prose max-w-none text-gray-600">
          <p>이 문제를 해결하기 위해 세 가지 대안을 검토했습니다. 블록 활성화 상태에 따라 대화가 사라지는 등 사용자 경험을 방해하지 않고 맥락을 제어하는 방안이 필요했습니다.</p>
        </div>
        <ul className="text-gray-600 space-y-1">
          <li>A. 시스템 프롬프트에 직접 "Forget" 지시</li>
          <li>B. messages[]에서 해당 블록 관련 메시지 제거</li>
          <li className="font-bold text-gray-900">C. pivotIndex로 메시지 경계를 분리하여 슬라이싱 (채택)</li>
        </ul>
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p>
            A안은 LLM이 지시를 무시할 수 있어 기억 차단이 불확실하고 토큰이 낭비될 것으로 예상되었습니다.<br/>
            B안은 채팅 내역이 화면에서 완전히 사라져 UX를 크게 저하하고 대화 흐름이 깨지는 문제가 있었습니다.
          </p>
          <p>
            C안은 UI 변경 없이 LLM에게 전달되는 맥락만 제어하는 방식으로,
            과거 대화가 LLM에게 전달되지 않아 기억 차단이 확실한 방안으로 채택하었습니다.
            이 방식은 사용자의 조작이 곧바로 모델 입력 경계에 반영되도록 상태 구조를 재설계해야 했습니다.
          </p>
        </div>

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="prose max-w-none text-gray-600">
          <p>결과 내용</p>
        </div>
      </section>

      <br/>

      {/* 2번째 문제 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 : 페이지 리로드 시 빈 화면이 순간 노출되는 문제
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>
          기존 세션이 있는 상태에서 페이지를 리로드하면 채팅 목록, 채팅 화면, 블록 패널이 모두 빈 상태로 먼저 렌더링된 뒤 데이터가 뒤늦게 표시되었습니다.
          </p>
        </div>

        <br/>

        {/* 원인 */}
        <h4 className="text-xl font-bold text-gray-900">원인</h4>
        <div className="prose max-w-none text-gray-600">
        </div>

        <br/>

        {/* 해결 과정 */}
        <h4 className="text-xl font-bold text-gray-900">해결 과정</h4>
        <div className="prose max-w-none text-gray-600">
        </div>

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <p className="font-bold text-gray-900 mb-2 text-center">수정 전</p>
            <video
              src="/BlockmindBeforeShort.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded border border-border-light"
            />
          </div>
          <div>
            <p className="font-bold text-gray-900 mb-2 text-center">수정 후</p>
            <video
              src="/BlockmindAfterShort.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded border border-border-light"
            />
          </div>
        </div>
      </section>

      <br/>

      {/* ───────────── 3번째: 개선 사항 ───────────── */}

      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          개선 사항 : LLM API 호출 2회→1회로 통합하여 비용 N% 절감
        </h3>

        {/* 현재 구조 */}
        <h4 className="text-xl font-bold text-gray-900">현재 구조</h4>
        <div className="prose max-w-none text-gray-600">
          <p>
            현재 사용자가 메시지를 보낼 때마다 채팅 응답(1회)과 블록 자동 추출(1회)로 LLM API가 2회 호출되고 있습니다.
            대화가 늘어날수록 비용이 이중으로 누적되는 구조입니다.
          </p>
        </div>

        <br/>

        {/* 문제 인식 */}
        <h4 className="text-xl font-bold text-gray-900">문제 인식</h4>
        <div className="prose max-w-none text-gray-600">
        </div>

        <br/>

        {/* 개선 방향 */}
        <h4 className="text-xl font-bold text-gray-900">개선 방향</h4>
        <div className="prose max-w-none text-gray-600">
        </div>

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="prose max-w-none text-gray-600">
        </div>
      </section>
    </article>
  );
}

export default BlockmindPage;
