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
          <div className="flex items-center gap-3">
            <h2 id="blockmind" className="text-3xl font-bold tracking-tight">BlockMind</h2>
            <a href="https://www.blockmind.kr/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Live site">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
            <a href="https://github.com/tytgame/BlockMind" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2026.01 - 2026.03</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">개인 프로젝트</p>
        <p className="text-lg text-black mb-6 font-light leading-relaxed">
        사용자의 대화를 바탕으로 정보를 블록으로 만들고<br/>
        AI의 기억을 시각화하여 제어할 수 있는 채팅 서비스
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
            블록 비활성화 상태로 브라우저 개발자 도구 Network의 채팅 payload를 확인해보니 systemPrompt는 제거되었지만 메시지 배열은 그대로 전송하고 있었습니다.
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
          <div className="not-prose border border-gray-200 rounded overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900 py-2 text-center border-b border-gray-200">Playwright E2E 리포트</p>
                <img
                  src="/BlockmindResultE2Esteps.png"
                  alt="Playwright E2E 리포트"
                  className="w-full block"
                />
                <div className="flex-1" />
                <p className="text-sm text-gray-600 px-4 py-3 border-t border-gray-200">실제 LLM API를 호출해 블록 토글 전후 AI 응답이 반영됨을 브라우저에서 검증했습니다.</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900 py-2 text-center border-b border-gray-200">Jest 단위 테스트</p>
                <img
                  src="/BlockmindResultJest.png"
                  alt="Jest 단위 테스트"
                  className="w-full block"
                />
                <div className="flex-1" />
                <p className="text-sm text-gray-600 px-4 py-3 border-t border-gray-200">updateBlock, removeBlock, sliceMessagesByReset 함수의 중복 토글, 블록 삭제, null 경로 엣지 케이스를 포함해 pivotIndex 동작을 25개 단위 테스트로 검증했습니다.</p>
              </div>
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
          채팅 페이지를 리로드하면 우측 블록 패널에 '블록이 없습니다'가 100 ~ 500ms 동안 나타났다가 <strong className="text-gray-900">실제 블록 데이터가 늦게 나타나는 현상</strong>이 있었습니다.
          메인 채팅 영역도 마찬가지로 채팅 내용이 있는 상태에서 새 채팅 페이지가 먼저 렌더링 된 뒤 이전 채팅 세션이 복원되었습니다.
          <br/><br/>
          짧은 순간이지만 채팅 페이지에 진입할 때마다 깜빡임이 보여 <strong className="text-gray-900">사용자 경험과 서비스 완성도</strong>를 낮추는 문제였습니다. 따라서 무엇이 원인인지 정의하고 <strong className="text-gray-900">블록 패널</strong>과 <strong className="text-gray-900">채팅 영역</strong> 각 상황에 맞게 해결해야 했습니다.
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
            으로 진행되어 4번과 7번 사이 블록 컴포넌트에 초기값이 비어있었기 때문에 '블록이 없습니다'가 나타났습니다. 

          </p>

          <br/>

          <p>
            Zustand store의 초기값은 blocks: []이고 이것이 <strong className="text-gray-900">실제 데이터가 없는 것인지, fetch 중이라 비어있는 것인지</strong> 구분할 방법이 없었습니다.
            이것을 CSR로 해결하려면 isLoading과 같은 상태를 추가해서 스피너를 보여줄 수도 있었지만 CSR 구조에서는 여전히 JavaScript가 로드되고 실행된 후에야 데이터를 요청할 수 있기 때문에 <strong className="text-gray-900">빈 배열이 먼저 렌더되는 구조</strong>는 바꿀 수 없었습니다.
          </p>
          <br/>
          

        </div>

        <br/>

        {/* 해결 과정 */}
        <h4 className="text-xl font-bold text-gray-900">해결 과정</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p>
            데이터가 없는 HTML이 먼저 렌더링 되는 구조를 보완하기 위해선 <strong className="text-gray-900">데이터 전달 시점을 클라이언트가 아닌 서버로 올려야</strong> 했습니다.
            따라서 layout을 Server Component로 전환하여 서버에서 블록 데이터를 HTML에 포함시켜 전달하는 방식으로 변경했습니다.
          </p>
          <br/>
          <p className="font-bold text-gray-900">1. layout.tsx를 Server Component로 전환</p>

          <img
            src="/BlockmindSSRflow.png"
            alt="layout SSR 렌더링 흐름"
            className="max-w-[14rem] mx-auto rounded"
          />
          <p>기존 layout 구조는 Client Component로 마운트 후 useEffect로 블록을 불러왔지만, 변경한 Server Component layout에서는 <strong className="text-gray-900">auth로 사용자를 확인한 뒤 getUserBlocks()로 블록을 조회하고 그 데이터를 initialBlocks라는 props로 클라이언트 컴포넌트에 전달하는 구조</strong>로 개선하였습니다.</p>

          <p>이로써 브라우저가 받는 HTML에는 이미 블록 데이터가 포함되어 있으므로 클라이언트가 마운트되는 시점에 별도 fetch 없이 데이터를 바로 사용할 수 있게 되었습니다.</p>
          <br/>
          <p className="font-bold text-gray-900">2. 서버에서 받은 데이터를 렌더 단계에서 store에 반영</p>
          
          <p>
            하지만 UI 상태 관리와 인터렉션, React Hooks는 클라이언트에서만 동작하기 때문에 서버에서 전달받은 데이터를 클라이언트 컴포넌트의 렌더 단계에서 store에 직접 반영했습니다.
          </p>
          
          <p>
            useEffect는 렌더가 끝난 후 실행되기 때문에 첫 프레임에서 여전히 빈 배열이 렌더됩니다. 이를 막기 위해 서버에서 전달받은 initialBlocks를 <strong className="text-gray-900">렌더 단계에서 useRef를 통해 동기적으로 store에 반영</strong>해 첫 렌더부터 블록 데이터가 존재하도록 했습니다.
            </p>

            <p>
            또한 서버 데이터가 정상적으로 전달된 경우 클라이언트 fetch를 건너뛰고, 미인증 혹은 네트워크 오류로 서버 데이터 전달에 실패하거나 사용자 블록이 없는 경우에만 기존 CSR방식으로 fallback 하도록 useBlocksInit에 skip 파라미터를 추가했습니다.
            </p>
          <br/>

          <p className="font-bold text-gray-900">3. 채팅 영역은 SSR 대상에서 제외</p>
          <p>
            블록 패널은 SSR을 통해 첫 렌더부터 데이터가 존재하도록 전환했지만, 채팅 영역은 기존의 빈 채팅 화면 대신 fetch 완료 전까지 스피너를 표시하는 방식으로 <strong className="text-gray-900">CSR 방식 내에서 UX를 보완</strong>했습니다.
            </p>

            <p>
              채팅 메시지는 세션마다 수십~수백 개로 크기가 유동적인 데이터라 SSR로 전환하면 서버가 DB를 모두 조회할 때까지 HTML 자체가 브라우저에 전달되지 않아 오히려 <strong className="text-gray-900">빈 화면이 더 길어지는 역효과</strong>가 예상되었습니다.
            </p>
            <p>
            그리고 <strong className="text-gray-900">채팅 세션과 무관하게 공통으로 쓰이는 블록 패널</strong>과 달리 메시지는 SSR의 이점이 크지 않다고 판단하여 CSR + 스피너 방식으로 로딩 UX를 개선하였습니다.
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
                  <td className="py-2 pr-4">"블록이 없습니다" → 복원</td>
                  <td className="py-2">즉시 표시</td>
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
            블록 패널의 빈 화면이 제거되어 첫 렌더부터 데이터가 표시되고, 블록 조회를 위한 별도 API 요청이 사라져 네트워크 요청 수도 줄었습니다.
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
          개선 사항 : LLM API 호출 2회→1회로 통합하여 토큰 38% 절감
        </h3>

        {/* 현재 구조 */}
        <h4 className="text-xl font-bold text-gray-900">현재 구조</h4>
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            사용자가 메시지를 보낼 때마다 채팅 응답과 블록 자동 추출을 위해 LLM API가 <strong className="text-gray-900">2회 호출</strong>되고 있었습니다.
            1차 호출(<code>/api/chat</code>)에서 스트리밍 응답을 받은 뒤, 응답이 완료되면 항상 2차 호출(<code>/api/blocks/extract</code>)이 실행되었고,
            이 2차 호출은 1차에서 이미 전송한 user 메시지와 assistant 메시지를 <strong className="text-gray-900">Gemini에 다시 전송</strong>하는 구조였습니다.
          </p>
        </div>
        <img
          src="/BlockmindLLMbefore.png"
          alt="현재 구조 시퀀스 다이어그램"
          className="w-full max-w-2xl mx-auto rounded"
        />
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            서버 로그에서 토큰 사용량을 측정한 결과, 문제가 수치로 확인되었습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900"></th>
                  <th className="py-2 pr-4 font-bold text-gray-900">/api/chat (1차)</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">/api/blocks/extract (2차)</th>
                  <th className="py-2 font-bold text-gray-900">합계</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">input tokens</td>
                  <td className="py-2 pr-4">448</td>
                  <td className="py-2 pr-4">1,307</td>
                  <td className="py-2">1,755</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">output tokens</td>
                  <td className="py-2 pr-4">1,088</td>
                  <td className="py-2 pr-4">391</td>
                  <td className="py-2">1,479</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">total</td>
                  <td className="py-2 pr-4 font-bold text-gray-900">1,536</td>
                  <td className="py-2 pr-4 font-bold text-gray-900">1,698</td>
                  <td className="py-2 font-bold text-gray-900">3,234</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            2차 호출의 input(1,307 tokens)이 1차보다 크고, 대화가 누적될수록 더 커지는 구조였습니다. 원인은 두 가지였습니다.
          </p>
          <p>
            <strong className="text-gray-900">① 입력 토큰 중복</strong> — EXTRACT 호출이 1차에서 이미 전송한 대화 내용(systemPrompt + messages)을 그대로 재전송하고 있었습니다.
          </p>
          <p>
            <strong className="text-gray-900">② 무조건 2회 호출</strong> — 블록을 생성하지 않아도 되는 일반 대화에서도 EXTRACT API를 항상 호출했습니다.
          </p>
        </div>

        <br/>

        {/* 개선 방향 */}
        <h4 className="text-xl font-bold text-gray-900">개선 방향</h4>
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            Vercel AI SDK의 <code>tool()</code> + <code>streamText(&#123; tools &#125;)</code>를 활용하여 두 호출을 하나로 통합했습니다.
            <code>saveMemoryBlock</code> tool을 <code>/api/chat</code>의 <code>streamText</code>에 정의하면, Gemini가 응답을 생성하는 중 블록 저장이 필요하다고 판단할 때만 <strong className="text-gray-900">선택적으로 tool을 호출</strong>합니다.
            블록 추출을 위한 별도 API 호출이 사라지고, 중복 전송되던 대화 내용도 제거됩니다.
          </p>
        </div>
        <img
          src="/BlockmindLLMafter.png"
          alt="개선 후 시퀀스 다이어그램"
          className="w-full max-w-2xl mx-auto rounded"
        />

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900"></th>
                  <th className="py-2 pr-4 font-bold text-gray-900">리팩토링 전 (2회 호출)</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">리팩토링 후 (1회 호출)</th>
                  <th className="py-2 font-bold text-gray-900">변화</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">API 호출 횟수</td>
                  <td className="py-2 pr-4">2회</td>
                  <td className="py-2 pr-4">1회</td>
                  <td className="py-2">-1회</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">input tokens</td>
                  <td className="py-2 pr-4">1,755</td>
                  <td className="py-2 pr-4">546</td>
                  <td className="py-2 font-bold text-gray-900">-1,209 (-68.9%)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">output tokens</td>
                  <td className="py-2 pr-4">1,479</td>
                  <td className="py-2 pr-4">1,432</td>
                  <td className="py-2">-47</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">total tokens</td>
                  <td className="py-2 pr-4 font-bold text-gray-900">3,234</td>
                  <td className="py-2 pr-4 font-bold text-gray-900">1,978</td>
                  <td className="py-2 font-bold text-gray-900">-1,256 (-38.8%)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            입력 토큰의 68.9% 절감이 전체 비용 절감의 핵심입니다. EXTRACT 호출에서 대화 내용을 재전송하던 1,307 input tokens가 완전히 제거되었기 때문입니다.
            또한 블록 추출이 불필요한 일반 대화에서는 tool이 호출되지 않으므로 절감 효과는 실제로 더 큽니다.
          </p>
        </div>
      </section>
    </article>
  );
}

export default BlockmindPage;
