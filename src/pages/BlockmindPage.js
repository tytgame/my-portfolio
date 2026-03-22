import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ language, fileName, children }) {
  return (
    <div className="rounded border border-border-light overflow-hidden text-xs">
      {fileName && (
        <div className="bg-gray-100 px-4 py-1.5 text-xs text-gray-500 border-b border-border-light">
          {fileName}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{ margin: 0, padding: '1rem', fontSize: '0.75rem', background: '#fafafa' }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

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
          src="/BlockmindArc2.png"
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
          src="/BlockmindCause.png"
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
          <li className="font-bold text-gray-900">C. 화면 표시용과 모델 전송용 히스토리를 분리하는 상태 구조 재설계 (채택)</li>
        </ul>
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p>
            <strong className="text-gray-900">A안</strong>은 LLM이 지시를 무시할 수 있어 기억 차단이 불확실하고, 지시 내용이 프롬프트에 추가되어 토큰 비용이 부가적으로 발생할 것으로 예상되었습니다.
          </p>
          <p>
            <strong className="text-gray-900">B안</strong>은 블록 관련 메시지를 배열에서 직접 삭제하는 방식으로 사용자의 채팅 내역이 사라져 대화 흐름이 깨지는 문제가 있었습니다.
          </p>
          <p>
            <strong className="text-gray-900">C안</strong>은 하나의 메시지 배열이 화면 표시와 모델 전송 두 역할을 동시에 담당하던 구조를 분리하는 방식입니다.
            화면에는 전체 대화를 유지하면서, 모델에게는 토글 시점 이후의 메시지만 전달하여 대화 내용이 변경되지 않은채로 맥락을 제어할 수 있어 이 방식을 채택하였습니다.
          </p>
        </div>

        <br/>

        {/* 구현 상세 */}
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">1. 상태 분리 설계</p>
          <p>
            기존에는 하나의 messages 배열이 화면 렌더링과 API 전송에 동시에 사용되고 있었습니다.
            이를 두 가지 역할로 분리했습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-gray-900">display history</strong>: 전체 대화 내역 (UI 표시용, 항상 유지)</li>
            <li><strong className="text-gray-900">inference history</strong>: 토글 시점 이후 메시지만 (모델 전송용)</li>
          </ul>
          <p>
            블록 토글 시점의 메시지 위치를 pivotIndex로 기록하고, 서버에서는 messages.slice(pivotIndex)로 해당 시점 이후 메시지만 모델에 전달합니다.
          </p>
          <CodeBlock language="typescript" fileName="slice-messages-by-reset.ts">
{`export function sliceMessagesByReset(messages, pivotIndex) {
  if (pivotIndex == null) return messages;
  return messages.slice(pivotIndex);
}`}
          </CodeBlock>

          <p className="font-bold text-gray-900">2. 경계 캡처 타이밍</p>
          <p>
            블록 토글 직후 바로 messages.length를 읽는 것으로는 정확한 경계가 보장되지 않았습니다.
            그래서 lastResetAt을 이벤트 트리거로 사용하고, useEffect에서 렌더 완료 후 messages.length를 pivotIndex로 기록했습니다.
            messages를 deps에 넣지 않은 것은 의도적입니다. 매번 최신 길이를 추적하는 것이 아니라, 리셋이 발생한 순간의 경계를 고정하는 것이 목적이었기 때문입니다.
          </p>

          <p className="font-bold text-gray-900">3. 요청 시점 정합성 — stale closure 방지</p>
          <p>
            transport를 한 번 생성하고 클로저로 상태를 캡처하면, 이후 토글 상태가 바뀌어도 오래된 값이 전송될 수 있습니다.
            그래서 body() 안에서 useBlockStore.getState()로 요청 시점의 최신 상태를 읽도록 했습니다.
          </p>
          <CodeBlock language="typescript" fileName="chat-interface.tsx">
{`body: () => {
  const { blocks, pivotIndex } = useBlockStore.getState();
  return { systemPrompt: buildSystemPrompt(blocks), pivotIndex };
}`}
          </CodeBlock>
        </div>

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>

        {/* 수정 후 흐름도 */}
        <img
          src="/BlockmindResult.png"
          alt="수정 후 요청 흐름"
          className="w-full max-w-2xl mx-auto rounded"
        />

        {/* E2E 테스트 결과 */}
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p>Playwright E2E 테스트로 실제 사용자 플로우에서 동작을 검증했습니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900">단계</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">사용자 행동</th>
                  <th className="py-2 font-bold text-gray-900">AI 응답</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4">블록 활성 상태에서 "내 이름이 뭐야?"</td>
                  <td className="py-2">"홍길동님입니다"</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">2</td>
                  <td className="py-2 pr-4">블록 비활성화 후 "내 이름이 뭐야?"</td>
                  <td className="py-2">"알 수 없습니다"</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">3</td>
                  <td className="py-2 pr-4">블록 재활성화 후 "내 이름이 뭐야?"</td>
                  <td className="py-2">"홍길동님입니다"</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            결과적으로 블록 토글 후에도 UI의 채팅 내역은 그대로 유지되며, 모델에게 전달되는 맥락만 차단되었습니다.
            또한 토글 시점 이전의 불필요한 과거 대화가 전송되지 않아 토큰 비용도 절감되었습니다.
          </p>
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
