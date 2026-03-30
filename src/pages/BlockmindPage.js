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
          'comment': { ...oneLight['comment'], color: '#b35900' },
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
      <section id="bm-1" className="space-y-4">
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
          문제 상황 : 블록 비활성화가 AI 답변에 반영되지 않는 문제
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
              <li>기대한 답변: "알 수 없습니다"</li>
              <li><strong className="text-gray-900">실제 답변: "홍길동님입니다"</strong></li>
            </ul>
          </div>
        </div>

        <br/><br/>

        {/* 원인 */}
        <h4 className="text-xl font-bold text-gray-900">원인</h4>
        <img
          src="/BlockmindCause.png"
          alt="블록 토글 시 요청 흐름"
          className="w-full max-w-2xl mx-auto rounded"
        />
        <div className="prose max-w-none text-gray-600">
          <p>처음엔 <strong className="text-gray-900">LLM이 자체적으로 내용을 기억하는 고유한 특성</strong>을 원인으로 생각했지만 사실은 이와 달랐습니다.
          <br/><br/>
            블록 비활성화 상태로 개발자 도구 Network의 채팅 payload를 확인해보니 systemPrompt는 제거되었지만 메시지 배열은 그대로 전송하고 있었습니다.
            <br/>
            즉, LLM은 systemPrompt와 messages[]를 모두 읽고 답변하기 때문에 <strong className="text-gray-900">메시지 배열에 남아 있는 과거 정보가 그대로 참조</strong>되고 있었던 것이 원인이었습니다.
            <br/><br/>
            또한 이 메시지 배열은 화면 렌더링에도 동시에 사용되고 있어 LLM에 전송하는 데이터를 수정하면 채팅 UI도 함께 변하는 <strong className="text-gray-900">구조적 문제</strong>가 있었습니다.
          </p>
        </div>

        <br/><br/>

        {/* 대안 선택 */}
        <h4 className="text-xl font-bold text-gray-900">대안 선택</h4>
        <div className="prose max-w-none text-gray-600">
          <p>이 문제를 해결하기 위해 세 가지 대안을 검토했습니다. 블록 활성화 상태에 따라 대화가 사라지는 등 사용자 경험을 방해하지 않고 맥락을 제어하는 방안이 필요했습니다.</p>
        </div>
        <ul className="text-gray-600 space-y-1">
          <li>A. 시스템 프롬프트에 직접 "Forget" 지시</li>
          <li>B. 메시지 배열에서 해당 블록 관련 메시지 제거</li>
          <li className="font-bold text-gray-900">C. 메시지 배열은 유지한 채 모델에 보내는 메시지만 정제하여 전송</li>
        </ul>
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p className="pl-12">
            <strong className="text-gray-900 -ml-11">A안 -</strong> 블록 토글은 결정론적으로 반영되어야 하는 사용자 조작이지만 프롬프트 지시에 대한 <strong className="text-gray-900">LLM의 응답은 비결정적</strong>이므로 안정성을 보장하기 어렵다고 판단했습니다.
          </p>
          <p className="pl-12">
            <strong className="text-gray-900 -ml-11">B안 -</strong> <strong className="text-gray-900">어떤 메시지가 블록과 관련된 것인지 의미적으로 판단</strong>해야 하기 때문에 삭제 기준이 일관되지 않고 메시지를 배열에서 직접 삭제하는 방식으로, 사용자의 채팅 내역이 사라져 대화의 흐름이 깨지는 문제가 예상되었습니다.
          </p>
          <p className="pl-12">
            <strong className="text-gray-900 -ml-11">C안 -</strong> 하나의 메시지 배열이 <strong className="text-gray-900">화면 표시</strong>와 <strong className="text-gray-900">모델 전송</strong> 두 역할을 동시에 담당하던 구조를 분리하는 방식입니다.
            이를 위해 모델이 참조하는 대화 범위를 별도로 관리하고 전송 시에는 <strong className="text-gray-900">그 범위에 해당하는</strong> 메시지만 전달하는 방식으로, 화면에는 전체 대화가 유지되므로 <strong className="text-gray-900">사용자 경험</strong>을 해치지 않으면서 <strong className="text-gray-900">맥락을 제어</strong>할 수 있어 이 방안을 채택하였습니다.
          </p>
        </div>
        <br/><br/>
        

        {/* 구현 과정 */}
        <h4 className="text-xl font-bold text-gray-900">구현 과정</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">상태 분리 설계</p>
          <p>
            C안의 구현을 위해 먼저 두 개의 역할을 가지고 있는 messages[]을 <strong className="text-gray-900">어떤 기준</strong>으로 분리할 것인지 결정해야 했습니다.<br/>
            처음엔 단순히 모델 전송용 메시지를 '<strong className="text-gray-900">블록 토글 시각 기준으로 분리</strong> 하면 되겠다' 라는 생각으로 진행하였습니다.<br/>
            <br/>
            따라서 블록 토글 시각인 lastResetAt 이후에 생성된 메시지만 필터링하여 전송하는 <strong className="text-gray-900">타임스탬프</strong> 방식으로 접근했습니다.<br/>
            하지만 AI SDK 라이브러리 내부 함수인 useChat이 반환하는 메시지 객체에 항상 createdAt 필드가 있다는 보장을 할 수 없었고, 형식이 변할 수 있는 라이브러리 세부 구현에 의존하는 방식이라 <strong className="text-gray-900">불안정한 방식</strong>이라고 판단하여 다른 기준을 찾아 보았습니다.<br/>
            <br/>
            제가 실제로 필요했던 것은 정확한 <strong className="text-gray-900">대화 범위의 관리</strong>였기 때문에 시간이라는 경계값보다 <strong className="text-gray-900">인덱스</strong> 경계값을 사용하는 것이 안정적인 방식이라고 판단했습니다. 그래서 <strong className="text-gray-900">pivotIndex</strong>를 경계로 모델 전송용 메시지를 분리하여 구현을 진행했습니다.<br/>
            

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
          <div className="flex justify-end mt-1">
            <a
              href="https://github.com/tytgame/BlockMind/blob/a34d1904168b409944c3f8ab593722587ee36fd1/src/lib/slice-messages-by-reset.ts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              fix: 블록 visible 상태에 따른 기억 로직 개선
            </a>
          </div>
          <br/>

          <br/>

          <p className="font-bold text-gray-900">1. 기록 시점 결정</p>
          <p>
            블록 토글 시 lastResetAt = Date.now()는 즉시 기록할 수 있었지만 이 시점에 pivotIndex = messages.length 까지 넣을 순 없었습니다.
            왜냐하면 React의 상태 업데이트는 배치 처리되기 때문에 updateBlock이 호출된 직후 messages.length의 값이 이전 렌더의 값일 수 있어 <strong className="text-gray-900">pivotIndex의 경계가 정확하지 않을 수 있었습니다. </strong>
          </p>
          <p>
            그래서 블록 토글이 반영된 뒤의 시점에서 messages.length 값을 읽도록 했습니다.<br/>
            lastResetAt이 변경되어 React가 리렌더하고 커밋된 후 useEffect에서 messages.length를 읽어 pivotIndex로 기록했습니다.<br/>
          </p>
          <CodeBlock language="typescript" fileName="chat-interface.tsx">
{`const lastResetAt = useBlockStore((state) => state.lastResetAt);

useEffect(() => {
  if (lastResetAt === null) return;
  // 토글 시점의 대화 길이를 경계로 고정
  useBlockStore.getState().setPivotIndex(messages.length);
}, [lastResetAt]);`}
          </CodeBlock>
          <div className="flex justify-end mt-1">
            <a
              href="https://github.com/tytgame/BlockMind/blob/a34d1904168b409944c3f8ab593722587ee36fd1/src/components/chat/chat-interface.tsx#L46"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              fix: 블록 visible 상태에 따른 기억 로직 개선
            </a>
          </div>

          <br/>

          <p className="font-bold text-gray-900">2. 저장 위치 결정</p>
          <p>
            기록한 pivotIndex 값을 어디에 저장해야 할지 결정해야 했습니다.
          </p>

            <p>
            값이 바뀌어도 렌더링을 일으키지 않는 ref에 저장해 컴포넌트 내부에서 처리하려 했지만 pivotIndex는 단순한 임시값이 아니라 <strong className="text-gray-900">블록 토글 시점</strong>부터 <strong className="text-gray-900">메시지 전송 시점</strong>까지 값이 일관되어야 하는 <strong className="text-gray-900">전역 수준 상태</strong>였습니다.

            ref로 처리한다면 각각 다른 컴포넌트에 값 전달을 위해 props-driling이 필요해져 구조가 필요 이상으로 복잡해질 것이라 생각했습니다.
          </p>

          <p>
            따라서 앱 전역에서 pivotIndex 값을 일관된 상태로 저장하고 읽을 수 있는 Zustand를 사용하였습니다. 또한 이후 메시지 전송 body에서 getState()로 최신 상태를 읽을 수 있기 때문에 Zustand store가 설계적으로 적절했습니다.
          </p>
          <CodeBlock language="typescript" fileName="block-store.ts">
{`pivotIndex: null,
setPivotIndex: (index) => set({ pivotIndex: index }),`}
          </CodeBlock>
          <div className="flex justify-end mt-1">
            <a
              href="https://github.com/tytgame/BlockMind/blob/a34d1904168b409944c3f8ab593722587ee36fd1/src/store/block-store.ts#L16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              fix: 블록 visible 상태에 따른 기억 로직 개선
            </a>
          </div>

          <br/>

          <p className="font-bold text-gray-900">3. 읽기 시점 결정</p>
          <p>
            또한 기록한 값을 <strong className="text-gray-900">언제, 어떤 방식으로 읽을지</strong>도 중요했습니다.
            이 값은 메시지 전송 시점에 요청 body에 포함되어야 했기 때문에 항상 <strong className="text-gray-900">최신 값</strong>을 읽어야 하는 조건이 있었습니다.<br/><br/>
            문제는 transport 객체가 useMemo(fn, [])로 한 번만 생성된다는 점이었습니다. useMemo는 컴포넌트가 처음 마운트될 때 fn을 한 번 실행한 뒤 그 결과를 재사용하므로 body() 안에서 일반 상태나 변수를 직접 참조하면 <strong className="text-gray-900">마운트 시점의 값이 클로저에 고정</strong>될 수 있었습니다.
            이렇게 되면 이후 상태가 바뀌더라도 이전 값을 읽게 되는 <strong className="text-gray-900">stale closure 문제</strong>가 발생할 수 있었습니다.
            </p>
            <p>
            그래서 body() 내부에서는 값을 미리 캡처하지 않고 메시지를 보내는 순간 useBlockStore.getState()를 호출해 Zustand store의 <strong className="text-gray-900">최신 상태를 읽도록</strong> 했습니다.
            이렇게 하면 transport 객체는 한 번만 생성하더라도 body()가 실행될 때마다 그 시점의 blocks와 pivotIndex를 읽어 요청에 반영할 수 있고 <strong className="text-gray-900">stale closure 문제를 예방</strong>할 수 있었습니다.

          </p>
          <CodeBlock language="typescript" fileName="chat-interface.tsx">
{`const transport = useMemo(
  () =>
    new DefaultChatTransport({
      api: '/api/chat',
      // 전송 시점마다 실행 — getState()로 최신 상태 읽기
      body: () => {
        const { blocks, pivotIndex } = useBlockStore.getState();
        return { systemPrompt: buildSystemPrompt(blocks), pivotIndex };
      },
    }),
  [] // 마운트 시 한 번만 생성, body()는 매 전송마다 호출
);`}
          </CodeBlock>
          <div className="flex justify-end mt-1">
            <a
              href="https://github.com/tytgame/BlockMind/blob/a34d1904168b409944c3f8ab593722587ee36fd1/src/components/chat/chat-interface.tsx#L60"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              fix: 블록 visible 상태에 따른 기억 로직 개선
            </a>
          </div>

          <br/>

          <p className="font-bold text-gray-900">4. 최종 적용</p>
          <p>
            클라이언트가 보낸 pivotIndex를 바탕으로 서버 API route에서 <strong className="text-gray-900">메시지를 정제하여 LLM에 전달</strong>했습니다.
          </p>
          
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
        <div className="prose max-w-none text-gray-600">
          <p>블록 비활성화 시점에 pivotIndex를 기록하고 이를 기준으로 messages[]를 분리해 UI와 LLM에 각각 다른 데이터를 전달하는 구조로 개선했습니다.</p>
        </div>
        <br/>
        {/* 검증 */}
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">검증</p>
          <div className="not-prose grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2 text-center">Playwright E2E 리포트</p>
              <div className="border border-gray-200 rounded overflow-hidden h-52 bg-gray-50 flex items-center justify-center">
                <img
                  src="/BlockmindResultE2Esteps.png"
                  alt="Playwright E2E 리포트"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">실제 LLM API를 호출해 블록 토글 전후 AI 응답이 반영됨을 브라우저에서 검증했습니다.</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2 text-center">Jest 단위 테스트</p>
              <div className="border border-gray-200 rounded overflow-hidden h-52 bg-gray-50 flex items-center justify-center">
                <img
                  src="/BlockmindResultJest.png"
                  alt="Jest 단위 테스트"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">updateBlock, removeBlock, sliceMessagesByReset 함수의 중복 토글, 블록 삭제, null 경로 엣지 케이스를 포함해 pivotIndex 동작을 25개 단위 테스트로 검증했습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <br/>

      {/* 2번째 문제 */}
      <section id="bm-2" className="space-y-4">
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
          문제 상황 : 채팅 페이지 리로드 시 빈 화면이 순간 노출되는 문제
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>
          채팅 페이지를 리로드하면 우측 블록 패널에 '블록이 없습니다'가 100 ~ 500ms 동안 나타났다가 실제 블록 목록이 나타나는 현상이 있었습니다.
          메인 채팅 영역도 마찬가지로 채팅 내용이 있는 상태에서 새 채팅 페이지(/chat)이 먼저 렌더링 된 뒤 이전 채팅 내용이 복원되었습니다.
          <br/><br/>
          이런 현상은 사용자 경험을 크게 저해하는 일이기에 무엇이 원인인지 정의하고 <strong className="text-gray-900">블록 패널</strong>과 <strong className="text-gray-900">채팅 영역</strong> 각 상황에 알맞게 해결해야 했습니다.
          </p>
        </div>

        <br/>

        {/* 원인 */}
        <h4 className="text-xl font-bold text-gray-900">원인</h4>
        <div className="prose max-w-none text-gray-600">
        <p className="font-bold text-gray-900">블록 패널</p>
        <br/>
          <p>
            왜 '블록이 없습니다'가 잠깐 보이는지 원인을 파악하기 위해 layout.tsx 코드의 동작 순서를 이해해야 했습니다.
            </p>
            <br/>
            <CodeBlock language="typescript" fileName="layout.tsx (수정 전)">
{`'use client';

export default function ChatLayout({ children }) {
  useBlocksInit();   // useEffect로 /api/blocks fetch
  // → 응답 전까지 blocks: [] → "블록이 없습니다" 렌더
}`}
          </CodeBlock>
          <div className="flex justify-end mt-1">
            <a
              href="https://github.com/tytgame/BlockMind/commit/e1a22bacfc528e26c16a4e7e9646c98bb5e9667f#diff-be7c518c2482ade30385949b6eb81b2ed80a8d8a1de81333c662a09f5d64865c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              refactor: 채팅 레이아웃 CSR → CSR + SSR 전환
            </a>
          </div>
          <br/>
            <p>
            layout 파일 최상단에 'use client' 가 사용되어 이 컴포넌트는 브라우저에서 JavaScript가 실행된 후에야 동작합니다. 따라서 렌더링 흐름은
          </p>
          
          <img
            src="/BlockmindCSRrender.png"
            alt="CSR 렌더링 흐름"
            className="max-w-[17rem] mx-auto rounded"
          />
          <p>
            으로 진행되어 4번과 7번 사이에 블록 컴포넌트에 초기값이 비어있었기 때문에 '블록이 없습니다'가 나타났습니다. 

          </p>

          <br/>

          <p>
            Zustand store의 초기값은 blocks: []이고 이것이 <strong className="text-gray-900">실제 데이터가 없는건지, fetch 중이라 비어있는 건지</strong> 구분할 방법이 없었습니다.
            이 것을 CSR으로 해결하려면 isLoading 같은 상태를 추가해서 스피너를 보여줄 순 있었지만 CSR 구조에서는 JavaScript가 로드되고 실행된 후에야 데이터를 요청할 수 있기 때문에 빈 배열이 먼저 렌더되는 <strong className="text-gray-900">구조적인 한계</strong>가 있었습니다.
          </p>
        </div>

        <br/>

        {/* 해결 과정 */}
        <h4 className="text-xl font-bold text-gray-900">해결 과정</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p>
            빈 화면 flash를 제거하려면 <strong className="text-gray-900">데이터 주입 시점을 서버로 올려야</strong> 했습니다. layout.tsx를 async Server Component로 전환하여, 서버에서 블록 데이터를 조회한 뒤 HTML에 포함시켜 전달하는 방식으로 변경했습니다.
          </p>

          <p className="font-bold text-gray-900">1. layout.tsx → async Server Component 전환</p>
          <p>
            서버에서 <code>auth()</code>로 세션을 확인하고 <code>getUserBlocks()</code>로 블록을 조회한 뒤, initialBlocks를 props로 클라이언트 컴포넌트에 전달합니다.
          </p>

          <p className="font-bold text-gray-900">2. Zustand에 동기 주입</p>
          <p>
            서버에서 받은 initialBlocks를 클라이언트 컴포넌트의 <strong className="text-gray-900">렌더 단계에서 동기적으로</strong> Zustand store에 주입했습니다.
            useEffect를 사용하면 렌더가 끝난 후 실행되어 첫 프레임에서 여전히 빈 배열이 렌더되므로, <strong className="text-gray-900">useRef 가드와 함께 렌더 단계에서 직접 호출</strong>하는 방식을 선택했습니다.
          </p>
          <CodeBlock language="typescript" fileName="client-chat-layout.tsx">
{`'use client';

export function ClientChatLayout({ children, initialBlocks }) {
  // 렌더 단계에서 동기적으로 store에 주입 (첫 프레임부터 데이터 존재)
  const initializedRef = React.useRef(false);
  if (!initializedRef.current && initialBlocks.length > 0) {
    useBlockStore.getState().setBlocks(initialBlocks);
    initializedRef.current = true;
  }

  // fallback: 서버 데이터가 비어있으면 클라이언트에서 재시도
  useBlocksInit(initialBlocks.length > 0);
}`}
          </CodeBlock>

          <p className="font-bold text-gray-900">3. 채팅 영역은 SSR 대상에서 제외</p>
          <p>
            블록 패널은 SSR로 전환했지만, 채팅 영역은 CSR + 스피너 방식을 유지했습니다.
            메시지가 수백 개인 세션을 SSR하면 서버 조회가 완료될 때까지 HTML 자체가 전송되지 않아 스피너보다 나쁜 UX가 되고,
            AI SDK의 <code>useChat</code> 훅이 메시지 배열을 자체 관리하며 스트리밍을 처리하기 때문에 서버 주입 데이터와의 동기화 복잡도가 높았습니다.
          </p>
        </div>

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900"></th>
                  <th className="py-2 pr-4 font-bold text-gray-900">수정 전 (CSR)</th>
                  <th className="py-2 font-bold text-gray-900">수정 후 (SSR + CSR)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">블록 패널</td>
                  <td className="py-2 pr-4">"블록이 없습니다" flash</td>
                  <td className="py-2">즉시 표시 (flash 없음)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">채팅 영역</td>
                  <td className="py-2 pr-4">빈 채팅 화면 → 복원</td>
                  <td className="py-2">스피너 → 복원</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">네트워크 요청</td>
                  <td className="py-2 pr-4">HTML + /api/blocks (2회)</td>
                  <td className="py-2">HTML에 블록 포함 (1회)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            블록 패널의 빈 화면 flash가 제거되어 첫 프레임부터 데이터가 표시되고, 블록 조회를 위한 별도 API 요청이 사라져 네트워크 요청 수도 줄었습니다.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <p className="font-bold text-gray-900 mb-2 text-center">수정 전</p>
            <video
              src="/BlockmindBefore.mp4"
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
              src="/BlockmindAfter.mp4"
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

      <section id="bm-3" className="space-y-4">
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
