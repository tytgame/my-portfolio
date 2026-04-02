
function HereDoggyPage() {
  return (
    <article className="space-y-12">
      {/* 프로젝트 헤더 */}
      <section>
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 id="heredoggy" className="text-3xl font-bold tracking-tight">여기보개 (HereDoggy)</h2>
            <a href="https://github.com/tytgame/HereDoggy" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2025.05 - 2025.07</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">팀 프로젝트 [프론트엔드 2 / 백엔드 2]</p>
        <p className="text-sm text-gray-500 mb-3">Flutter 앱 FE 담당 · Figma UI/UX 설계 / 산책 서비스 / JWT·소셜 로그인 / FCM 알림 / 커뮤니티</p>
        <p className="text-lg text-black mb-6 font-light leading-relaxed">
          위치 기반 산책 매칭 및 보호소 유기견 입양 중개 플랫폼. <br className="hidden md:block" />
          산책 경로를 실시간으로 추적하고 커뮤니티 기능을 통해 반려견 문화를 활성화합니다.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-gray-600">
          <span>Flutter</span>
          <span>React</span>
          <span>Spring Boot</span>
          <span>PostgreSQL</span>
          <span>Redis</span>
        </div>
      </section>

      {/* 스크린샷 그리드 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '홈 & 로그인', src: '/HereDoggyHome.jpg' },
          { label: '산책 추적', src: '/HereDoggyWalk.png' },
          { label: '커뮤니티', src: '/HereDoggyCommunity.jpg' },
          { label: '마이페이지', src: '/HereDoggyMyPage.jpg' },
        ].map(({ label, src }) => (
          <div
            key={label}
            className="bg-surface-light border border-border-light rounded-lg overflow-hidden flex flex-col"
          >
            <div className="aspect-[9/19] overflow-hidden">
              {src ? (
                <img src={src} alt={label} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full" />
              )}
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
          src="/HereDoggyArc.png"
          alt="여기보개 아키텍처"
          className="w-full max-w-2xl mx-auto rounded"
        />
      </section>

      {/* 기술적 의사결정 */}
      <section id="hd-1" className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
        GPS 좌표를 클라이언트에서 누적 후 산책 종료 시 일괄 전송하여 서버 요청을 최소화
        </h3>

        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            산책 중 GPS 좌표를 수집할 때, 좌표가 발생할 때마다 서버에 전송하면 30분 산책 한 건에 <strong className="text-gray-900">약 200회의 API 요청</strong>이 발생합니다. 동시 사용자 10명 기준으로는 2,000회가 30분 안에 집중되고, 매 요청마다 HTTP 핸드셰이크·인증·DB 쓰기가 반복되어 서버 리소스가 좌표 저장에 소모되는 구조였습니다.
          </p>
          <p>
            이 서비스에서 산책 경로는 <strong className="text-gray-900">산책 완료 후 기록 조회 목적</strong>으로만 사용되며, 경로의 실시간 지도 표시는 클라이언트 로컬 상태만으로 구현 가능했습니다. 서버가 산책 중 실시간으로 경로를 알아야 할 요구사항이 없었기 때문에, 실시간 전송 대신 <strong className="text-gray-900">클라이언트에서 좌표를 누적하고 산책 종료 시 단 1회 일괄 전송</strong>하는 방식을 선택했습니다.
          </p>
          <p>
            결과적으로 API 호출이 산책 1건당 시작·종료 <strong className="text-gray-900">2회로 고정</strong>되어, 사용자 수가 늘어도 서버 부하가 산책 횟수에만 비례하는 구조가 되었습니다.
          </p>
        </div>

        

        {/* 회고 */}
        {/* <h4 className="text-xl font-bold text-gray-900">회고</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">이중 필터링에 대한 반성</p>
          <p>
            현재 구현에는 Geolocator의 distanceFilter: 10(플랫폼 레벨)과 Haversine 거리 체크 {'>'}= 10.0(앱 레벨)이 동시에 적용되어 있습니다.
            둘 다 동일한 10m 기준으로 같은 역할을 하고 있어 사실상 중복입니다.
            플랫폼의 distanceFilter가 이미 10m 미만 이벤트를 차단하므로, 앱 레벨 체크는 불필요한 연산을 추가하고 있는 셈입니다.
            둘 중 하나만 남기는 것이 올바른 설계였습니다.
          </p>
          <p className="font-bold text-gray-900">종료 전 데이터 유실 위험</p>
          <p>
            일괄 전송 방식의 트레이드오프로 인지했던 데이터 유실 위험에 대해, 설계 시점에 구체적인 방어 로직을 마련하지 못했습니다.
            SharedPreferences나 로컬 DB에 주기적으로 중간 저장하고, 앱 재시작 시 복원하는 장치가 추가되어야 했습니다.
            DB 쓰기 횟수가 다소 늘어나더라도 일정 간격으로 중간 전송하는 등 데이터 유실을 방어하는 로직이 함께 설계됐어야 했으며, 개선이 필요한 지점이었단 걸 인지했습니다.
          </p>
        </div> */}
      </section>
    </article>
  );
}

export default HereDoggyPage;
