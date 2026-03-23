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
          { label: '산책 추적', src: '' },
          { label: '커뮤니티', src: '' },
          { label: '마이페이지', src: '' },
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

      {/* 문제 상황 */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">
          문제 상황 정의: 산책 좌표 과다 저장 및 거리 오차
        </h3>
        <div className="prose max-w-none text-gray-600">
          <p>
            산책 기능 구현 중 <strong>GPS 데이터의 방대한 양</strong>과{' '}
            <strong>위치 튀는 현상</strong>이라는 두 가지 치명적인 문제가 발생했습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-gray-900">데이터 폭증:</strong>{' '}
              초기 구현에서는 <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">Geolocator</code>의
              위치 변경 스트림을 그대로 받아 DB에 저장했습니다. 30분 산책 시 약 1,800개의 좌표가 전송되었고,
              이는 서버 스토리지 부하 및 클라이언트 렌더링 성능 저하를 야기했습니다.
            </li>
            <li>
              <strong className="text-gray-900">위치 오차:</strong>
              GPS 신호가 약한 건물 사이나 실내에서 좌표가 수 킬로미터 밖으로 튀는 현상이 발생했습니다.
              이로 인해 실제 이동하지 않았음에도 이동 거리가 비정상적으로 누적되었습니다.
            </li>
          </ul>
        </div>
      </section>

      {/* 해결 과정 */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold border-b border-border-light pb-2">해결 과정</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <h4 className="font-bold text-gray-900 mb-2">1. 필터링 알고리즘 도입</h4>
            <p className="text-sm text-gray-600">
              무조건적인 저장을 멈추고, <br />
              1) 시간 간격(5초)<br />
              2) 최소 거리(10m)<br />
              두 조건을 만족할 때만 유효한 이동으로 간주했습니다.
            </p>
          </div>
          <div className="md:col-span-8 bg-surface-light p-4 rounded border border-border-light font-mono text-xs overflow-x-auto custom-scrollbar">
            <pre className="text-gray-800">{`// 개선된 위치 업데이트 로직 (Pseudo-code)
if (currentTime - lastTime > 5000ms) {
  double distance = calculateDistance(lastPos, currentPos);
  // Haversine 공식을 이용한 거리 계산 및 10m 이상 이동 확인
  if (distance > 10.0) {
    saveCoordinate(currentPos);
    updateUI(currentPos);
    lastPos = currentPos;
    lastTime = currentTime;
  }
}`}</pre>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-gray-900 mb-2">2. Douglas-Peucker 알고리즘 검토</h4>
            <p className="text-sm text-gray-600">
              선형 단순화 알고리즘인 Douglas-Peucker 적용을 고려했으나, 실시간성이 중요한 서비스
              특성상 사후 처리보다는 <strong>실시간 필터링</strong>이 더 적합하다고 판단하여 기각했습니다.
            </p>
          </div>
          <div className="md:col-span-8 border border-dashed border-border-light p-4 rounded flex items-center justify-center text-sm text-gray-400">
            <span className="material-icons mr-2">schema</span>
            실시간 데이터 처리에 최적화된 로직 우선 선택
          </div>
        </div>
      </section>

      {/* 최종 성과 */}
      <section className="bg-surface-light p-6 rounded-lg border border-border-light">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <span className="material-icons text-primary mr-2">check_circle</span>
          최종 성과
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">97%</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">데이터 감소</div>
            <p className="text-xs text-gray-400 mt-2">1800개 → 50개 내외</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">Zero</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">위치 튐 현상</div>
            <p className="text-xs text-gray-400 mt-2">비정상 거리 누적 해결</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">2x</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">렌더링 성능</div>
            <p className="text-xs text-gray-400 mt-2">지도 끊김 현상 제거</p>
          </div>
        </div>
      </section>

      {/* 회고 */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Retrospective</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          단순히 라이브러리를 사용하는 것을 넘어, 해당 기술이 생성하는 데이터의 특성을 이해하는 것이
          중요함을 배웠습니다. 특히 모바일 환경에서의 GPS 센서는 배터리 소모와 정확도 사이의
          트레이드오프가 존재하므로, 서비스의 목적(정밀한 네비게이션 vs 대략적인 산책 경로)에
          맞는 적절한 타협점을 찾는 과정이 엔지니어링의 핵심이었습니다. 추후에는 사용자의 이동
          속도(걷기 vs 차량 이동)를 감지하여 비정상적으로 빠른 이동을 필터링하는 로직을 추가하고
          싶습니다.
        </p>
      </section>
    </article>
  );
}

export default HereDoggyPage;
