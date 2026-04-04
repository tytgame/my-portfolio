
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

        {/* 설계 배경 */}
        <h4 className="text-xl font-bold text-gray-900">설계 배경</h4>
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            산책 추적 기능은 사용자가 걷는 동안 GPS 좌표를 수집하고, 이동 경로를 지도에 표시하며, 산책이 끝나면 경로 데이터를 서버에 저장하는 기능입니다.
            설계 시 가장 먼저 결정해야 했던 것은 <strong className="text-gray-900">수집된 좌표를 언제 서버로 전송할 것인가</strong>였습니다.
          </p>
        </div>

        {/* 예상 문제 */}
        <h4 className="text-xl font-bold text-gray-900">예상 문제</h4>
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            가장 직관적인 구현은 좌표가 수집될 때마다 서버에 전송하는 것입니다. GPS는 이동 거리 10m마다 좌표를 생성하도록 설정했을 때 30분 산책 한 건에 <strong className="text-gray-900">약 1,800회의 API 요청</strong>이 발생합니다.
            동시에 여러 사용자가 산책하는 상황을 고려하면 동시 사용자 10명 기준으로 <strong className="text-gray-900">18,000회의 요청</strong>이 30분 동안 서버에 집중됩니다.
            매 요청마다 HTTP 핸드셰이크, 인증 검증, DB 쓰기가 반복되므로 서버 리소스가 실제 비즈니스 로직이 아닌 좌표 저장에 소모되는 구조였습니다.
          </p>
        </div>

        {/* 전송 방식 비교 */}
        <h4 className="text-xl font-bold text-gray-900">전송 방식 비교</h4>
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            <strong className="text-gray-900">A. 좌표 수집 시마다 즉시 전송</strong> — 서버에 데이터가 실시간으로 쌓이므로 앱이 비정상 종료되더라도 그 시점까지의 경로가 보존됩니다. 위치 기반 알림 같은 기능으로의 확장도 용이합니다.
            반면, 산책 한 건당 수천 회의 API 호출이 발생하여 <strong className="text-gray-900">서버 부하가 사용자 수에 비례해 선형으로 증가</strong>하고, 매 요청마다 네트워크 연결이 필요해 배터리 소모와 데이터 사용량도 커집니다.
          </p>
          <p>
            <strong className="text-gray-900">B. 클라이언트 누적 후 종료 시 일괄 전송 (채택)</strong> — 산책 중에는 좌표를 클라이언트 메모리에만 쌓아두고, 종료 시점에 전체 좌표 배열을 단 1회 전송합니다. API 호출이 <strong className="text-gray-900">시작 1회 + 종료 1회 = 총 2회</strong>로 고정되어, 사용자 수가 늘어도 서버 부하가 산책 횟수에만 비례합니다.
            반면, 산책 중 앱이 비정상 종료되면 누적된 좌표가 모두 유실됩니다.
          </p>
          <p>
            이 서비스에서 산책 경로는 <strong className="text-gray-900">산책 완료 후 기록 조회 목적</strong>으로만 사용되며, 경로의 실시간 지도 표시는 클라이언트 로컬 상태만으로 구현 가능했습니다. 서버가 산책 중 실시간으로 경로를 알아야 할 요구사항이 없었기 때문에 실시간성을 포기하는 대신 서버 부하를 최소화하는 <strong className="text-gray-900">B안을 채택</strong>했습니다.
          </p>
        </div>

        <img
          src="/WheregoFlow.png"
          alt="산책 데이터 전송 흐름 다이어그램"
          className="w-full max-w-xl mx-auto rounded"
        />

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="text-xs text-gray-400">
            ※ 예상 트래픽 산출 근거: 평균 보행 속도 4km/h, 30분 산책 시 약 2km 이동, 10m 필터 적용 시 약 200개 좌표 수집 가정.
            좌표 1건당 약 80바이트(lat·lng·timestamp + JSON 키), HTTP 요청 1건당 약 500바이트 오버헤드 가정.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900">항목 (30분 산책 기준)</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">A. 즉시 전송</th>
                  <th className="py-2 font-bold text-gray-900">B. 일괄 전송 (채택)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">API 호출 횟수 (1명)</td>
                  <td className="py-2 pr-4">~1,800회</td>
                  <td className="py-2 font-bold text-gray-900">2회 (고정)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">API 호출 횟수 (10명)</td>
                  <td className="py-2 pr-4">~18,000회</td>
                  <td className="py-2 font-bold text-gray-900">20회 (고정)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-bold text-gray-900">총 전송량 (1명)</td>
                  <td className="py-2 pr-4">~1,044KB</td>
                  <td className="py-2 font-bold text-gray-900">~17KB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            B안은 API 호출 횟수가 사용자 수와 무관하게 <strong className="text-gray-900">산책 1건당 2회로 고정</strong>됩니다.
            사용자가 늘어날수록 A안 대비 서버 부하 차이가 커지는 구조이며, 위 수치는 일반적인 산책 시나리오를 가정한 예상값입니다.
          </p>
        </div>

        {/* 회고 */}
        <h4 className="text-xl font-bold text-gray-900">회고</h4>
        <div className="prose max-w-none text-gray-600 space-y-3">
          <p>
            <strong className="text-gray-900">이중 필터링에 대한 반성</strong> — 현재 구현에는 Geolocator의 <code>distanceFilter: 10</code>(플랫폼 레벨)과 Haversine 거리 체크 <code>{'>'}= 10.0</code>(앱 레벨)이 동시에 적용되어 있습니다. 둘 다 동일한 10m 기준으로 같은 역할을 하고 있어 사실상 중복입니다. 플랫폼의 <code>distanceFilter</code>가 이미 10m 미만 이벤트를 차단하므로 앱 레벨 체크는 불필요한 연산을 추가하고 있는 셈이며, 둘 중 하나만 남기는 것이 올바른 설계였습니다.
          </p>
          <p>
            <strong className="text-gray-900">종료 전 데이터 유실 위험</strong> — 일괄 전송 방식의 트레이드오프로 인지했던 데이터 유실 위험에 대해, 설계 시점에 구체적인 방어 로직을 마련하지 못했습니다. <code>SharedPreferences</code>나 로컬 DB에 주기적으로 중간 저장하고 앱 재시작 시 복원하는 장치가 추가되어야 했으며, 서버 부하를 줄이면서도 데이터 안정성을 확보하려면 이 보완이 필요한 지점이었단 걸 인지했습니다.
          </p>
        </div>
      </section>
    </article>
  );
}

export default HereDoggyPage;
