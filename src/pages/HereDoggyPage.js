function HereDoggyPage() {
  return (
    <article className="space-y-12">
      {/* 프로젝트 헤더 */}
      <section className="border-l-2 border-primary pl-6">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
          <h2 className="text-3xl font-bold tracking-tight">여기보개</h2>
          <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0">2023.05 - 2023.07</span>
        </div>
        <p className="text-lg text-gray-700 mb-6 font-light leading-relaxed">
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
          src=""
          alt="여기보개 아키텍처"
          className="w-full rounded"
        />
      </section>

      {/* 기술적 의사결정 */}
      <section className="space-y-4">
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
          기술적 의사결정 : GPS 좌표를 10m 이상 이동 시에만 누적 후 일괄 전송하도록 설계하여 불필요한 데이터 전송을 줄임
        </h3>
      </section>
    </article>
  );
}

export default HereDoggyPage;
