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
        style={{
          ...oneLight,
          'comment': { ...oneLight['comment'], color: '#d19a66' },
        }}
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
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
          문제 상황 : 블록 비활성화가 AI 응답에 반영되지 않는 문제
        </h3>

        <div className="prose max-w-none text-gray-600">
          <p>
          블록을 비활성화하면 다음 응답부터 블록에 담긴 정보를 참조하지 않고 답변하리라 기대했지만 실제로는 AI가 블록에 있는 이름, 나이, 직업 등을 그대로 기억하고 답변했습니다.
          </p>
          <br/>
          <div>
            <p className="font-bold text-gray-900 mb-2">예시</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>블록 내용: [홍길동 · 강남 · 30세 · 백엔드 엔지니어]</li>
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
          <p>처음엔 LLM이 세션별로 정보를 기억하는 내부의 고유한 특성을 이유로 생각했지만 사실은 이와 달랐습니다.<br/>
            블록 비활성화 상태로 개발자 도구 Network의 채팅 payload를 확인해보니 systemPrompt는 제거되었지만 메시지 배열은 그대로 전송하고 있었습니다. 
            즉, LLM은 systemPrompt와 messages[]를 모두 읽기 때문에, 메시지 배열에 남아 있는 과거 정보가 그대로 참조되고 있었던 것이 원인이었습니다.<br/>
            또한 이 messages 배열은 화면 렌더링에도 동시에 사용되고 있어, 전송 데이터만 수정하면 채팅 UI도 함께 변하는 구조적 문제가 있었습니다.
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
          <li>B. 메시지 배열에서 해당 블록 관련 메시지 제거</li>
          <li className="font-bold text-gray-900">C. 메시지 배열은 유지한 채 토글 시점 기준으로 모델 전송 범위를 슬라이싱하여 전송 (채택)</li>
        </ul>
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p>
            <strong className="text-gray-900">A안</strong>은 프롬프트 지시에 대한 LLM의 응답이 비결정적이기 때문에 사용자의 조작이 실제 응답으로 확실하게 연결되지 않는 문제가 있었습니다.
          </p>
          <p>
            <strong className="text-gray-900">B안</strong>은 블록 관련 메시지들을 판단하는 기준이 모호하였고, 메시지를 배열에서 직접 삭제하는 방식으로 사용자의 채팅 내역이 사라져 대화 흐름이 깨지는 문제가 있었습니다.
          </p>
          <p>
            <strong className="text-gray-900">C안</strong>은 하나의 메시지 배열이 화면 표시와 모델 전송 두 역할을 동시에 담당하던 구조를 분리하는 방식입니다.<br/>
            배열 자체는 그대로 유지하되 토글 시점을 pivotIndex로 기록하고 전송 시점에 그 이후의 메시지만 잘라서 모델에 전달합니다. 화면에는 전체 대화가 유지되므로 사용자 경험을 해치지 않으면서 맥락을 제어할 수 있어 이 방안을 채택하였습니다.
          </p>
        </div>
        <hr/>
        

        {/* 구현 상세 */}
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">1. 타임스탬프 방식 시도 → 실패</p>
          <p>
            처음에는 블록 토글 시각(lastResetAt)을 기록하고, message.createdAt {'>'} lastResetAt인 메시지만 필터링하는 방식으로 접근했습니다.
            하지만 useChat이 반환하는 메시지에는 createdAt 필드가 보장되지 않았습니다.
            경계 판별을 라이브러리 내부 구현 세부사항에 의존하고 있었고, 이는 안정적인 상태 모델의 기준이 될 수 없었습니다.
          </p>
          <p>
            그래서 시간 대신 <strong className="text-gray-900">배열 인덱스 기반의 pivot boundary</strong>로 전환했습니다.
          </p>
          <CodeBlock language="typescript" fileName="slice-messages-by-reset.ts">
{`export function sliceMessagesByReset<T>(
  messages: T[],
  pivotIndex: number | null | undefined
): T[] {
  if (pivotIndex == null) return messages;
  return messages.slice(pivotIndex);
}`}
          </CodeBlock>

          <br/>

          <p className="font-bold text-gray-900">2. pivotIndex 저장 위치: ref vs 전역 상태</p>
          <p>
            처음에는 ref에 저장해 컴포넌트 내부에서 처리하려 했습니다.
            하지만 pivotIndex는 단순한 렌더 캐시가 아니었습니다. 이 값은:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>블록 토글 시점에 결정되고</li>
            <li>이후 네트워크 요청 시 사용되며</li>
            <li>컴포넌트 렌더링과 분리된 시점에서도 일관되게 읽혀야 했습니다</li>
          </ul>
          <p>
            즉 <strong className="text-gray-900">요청 경계를 표현하는 앱 상태</strong>였기 때문에, 렌더 단계에서 불안정하게 다뤄질 수 있는 ref보다 Zustand store가 설계적으로 적절했습니다.
          </p>
          <CodeBlock language="typescript" fileName="block-store.ts">
{`pivotIndex: null,
setPivotIndex: (index) => set({ pivotIndex: index }),`}
          </CodeBlock>

          <br/>

          <p className="font-bold text-gray-900">3. 경계 캡처 타이밍: 렌더 중이 아닌 커밋 이후</p>
          <p>
            블록 토글 직후 바로 messages.length를 읽는다고 해서 올바른 경계가 보장되지 않았습니다.
            리셋 경계는 토글이 반영된 뒤의 현재 대화 길이를 기준으로 확정되어야 했습니다.
          </p>
          <p>
            그래서 lastResetAt을 이벤트 트리거로, useEffect에서 렌더 완료 후 messages.length를 pivotIndex로 기록했습니다.
            messages를 deps에 넣지 않은 것은 의도적입니다. 목표는 매번 최신 길이를 반영하는 것이 아니라, <strong className="text-gray-900">리셋이 발생한 순간의 경계를 고정</strong>하는 것이었기 때문입니다.
          </p>
          <CodeBlock language="typescript" fileName="chat-interface.tsx">
{`const lastResetAt = useBlockStore((state) => state.lastResetAt);

useEffect(() => {
  if (lastResetAt === null) return;
  useBlockStore.getState().setPivotIndex(messages.length);
}, [lastResetAt]); // messages는 의도적으로 deps 제외`}
          </CodeBlock>

          <br/>

          <p className="font-bold text-gray-900">4. 요청 시점의 stale closure 방지</p>
          <p>
            transport를 한 번 생성하고 그 안에서 클로저로 pivotIndex나 blocks를 캡처하면, 이후 상태가 바뀌어도 오래된 값이 전송될 수 있습니다.
            그래서 body() 안에서 useBlockStore.getState()로 <strong className="text-gray-900">요청 시점의 최신 상태</strong>를 읽도록 했습니다.
          </p>
          <CodeBlock language="typescript" fileName="chat-interface.tsx">
{`const transport = useMemo(
  () =>
    new DefaultChatTransport({
      api: '/api/chat',
      body: () => {
        const { blocks, pivotIndex } = useBlockStore.getState();
        return { systemPrompt: buildSystemPrompt(blocks), pivotIndex };
      },
    }),
  []
);`}
          </CodeBlock>

          <br/>

          <p className="font-bold text-gray-900">5. API 서버 적용</p>
          <p>
            클라이언트에서 전달된 pivotIndex를 기반으로 서버에서 메시지를 슬라이싱합니다.
          </p>
          <CodeBlock language="typescript" fileName="app/api/chat/route.ts">
{`const { messages, systemPrompt, pivotIndex } = await req.json();
const slicedMessages = sliceMessagesByReset(messages, pivotIndex);`}
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

        {/* 검증 */}
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">검증</p>
          <p>
            sliceMessagesByReset 함수에 대해 15개의 단위 테스트를 작성하여 경계값, 빈 배열, 원본 불변성, 실제 토글 시나리오를 검증했습니다.
            전체 사용자 플로우는 Playwright E2E 테스트로 확인했습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900">단계</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">사용자 행동</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">AI 응답</th>
                  <th className="py-2 font-bold text-gray-900">결과</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">1</td>
                  <td className="py-2 pr-4">블록 활성 상태에서 "내 이름이 뭐야?"</td>
                  <td className="py-2 pr-4">"홍길동님입니다"</td>
                  <td className="py-2">PASS</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">2</td>
                  <td className="py-2 pr-4">블록 비활성화 후 "내 이름이 뭐야?"</td>
                  <td className="py-2 pr-4">"알 수 없습니다"</td>
                  <td className="py-2">PASS</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">3</td>
                  <td className="py-2 pr-4">블록 재활성화 후 "내 이름이 뭐야?"</td>
                  <td className="py-2 pr-4">"홍길동님입니다"</td>
                  <td className="py-2">PASS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            결과적으로 블록 토글 후에도 UI의 채팅 내역은 그대로 유지되면서, 사용자의 블록 조작이 AI 응답에 결정적으로 반영되는 구조를 확보했습니다.
          </p>
        </div>
      </section>

      <br/>

      {/* 2번째 문제 */}
      <section className="space-y-4">
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
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
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
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
