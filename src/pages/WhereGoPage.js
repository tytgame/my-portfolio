function WhereGoPage() {
  return (
    <article className="space-y-12">
      {/* 프로젝트 헤더 */}
      <section>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 id="wherego" className="text-3xl font-bold tracking-tight">어디고 (WhereGo)</h2>
            <a href="https://github.com/tytgame/whereGo" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2025.04 - 2025.05</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">팀 프로젝트 [프론트엔드 3 / 백엔드 2]</p>
        <p className="text-sm text-gray-500 mb-3">Figma UI/UX 설계 / 일정리스트 / 체크리스트</p>
        <p className="text-lg text-black mb-6 font-light leading-relaxed">
          체크리스트 기반 여행 일정 관리 및 공유 서비스. <br className="hidden md:block" />
          드래그 앤 드롭으로 일정을 직관적으로 편집하고, 친구들과 실시간으로 여행 계획을 공유합니다.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-gray-600">
          <span>React</span>
          <span>JavaScript</span>
          <span>Spring Boot</span>
        </div>
      </section>

      {/* 스크린샷 그리드 */}
      <section className="grid grid-cols-2 gap-4">
        {[
          { label: '체크리스트 목록', src: '/WhereGoChecklistList.png' },
          { label: '체크리스트 작성', src: '/WhereGoChecklist.png' },
          { label: '일정 추가', src: '/WhereGoSurvey.png' },
          { label: '장소 추가 및 편집', src: '/WhereGoSchedule.png' },
        ].map(({ label, src }) => (
          <div
            key={label}
            className="bg-surface-light border border-border-light rounded-lg overflow-hidden flex flex-col h-full"
          >
            <div className="flex-1 overflow-hidden bg-white">
              <img src={src} alt={label} className="w-full h-full object-contain object-top block" />
            </div>
            <span className="text-xs font-mono px-2 py-2 text-center border-t border-border-light">{label}</span>
          </div>
        ))}
      </section>

      {/* 아키텍처 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          아키텍처
        </h3>
        <img
          src=""
          alt="어디고 아키텍처"
          className="w-full max-w-2xl mx-auto rounded"
        />
      </section>

      {/* 기술적 의사결정 */}
      <section id="wg-1" className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
        단일 일정만 생성 가능했던 구조를 다중 일정 관리가 가능하도록 재설계
        </h3>

        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            초기 구조에서는 사용자 계정당 여행 플랜을 <strong className="text-gray-900">1개만 생성</strong>할 수 있었습니다. DB 스키마가 User와 Trip을 1:1로 연결하고 있었고, 프론트엔드도 단일 플랜 상태만 관리하도록 설계되어 있어 여러 여행을 계획하려는 사용자에게는 근본적인 제약이었습니다.
          </p>
          <p>
            재설계는 DB 스키마를 User : Trip = <strong className="text-gray-900">1:N 관계</strong>로 변경하는 것에서 시작했습니다. API도 단일 플랜 조회·수정에서 플랜 목록 조회, 생성, 삭제를 모두 지원하도록 확장했고, 프론트엔드에서는 플랜 목록 페이지와 개별 플랜 상세 페이지를 분리하여 여러 플랜을 전환하며 편집할 수 있는 구조로 변경했습니다.
          </p>
          <p>
            결과적으로 사용자가 여러 여행 플랜을 독립적으로 생성·관리할 수 있게 되었고, 서비스의 핵심 사용 시나리오인 <strong className="text-gray-900">"여행마다 새 플랜을 만들고 공유"</strong>가 가능한 구조가 되었습니다.
          </p>
        </div>
      </section>
    </article>
  );
}

export default WhereGoPage;
