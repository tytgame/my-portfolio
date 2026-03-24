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
      <section id="hd-1" className="space-y-4">
        <h3 className="text-3xl font-bold border-b border-border-light pb-2">
          기술적 의사결정 : GPS 좌표를 클라이언트에서 누적 후 산책 종료 시 일괄 전송하여 서버 요청을 최소화
        </h3>

        {/* 설계 배경 */}
        <h4 className="text-xl font-bold text-gray-900">설계 배경</h4>
        <div className="prose max-w-none text-gray-600">
          <p>
            산책 추적 기능은 사용자가 걷는 동안 GPS 좌표를 수집하고, 이동 경로를 지도에 표시하며, 산책이 끝나면 경로 데이터를 서버에 저장하는 기능입니다.
          </p>
          <p>
            설계 시 가장 먼저 결정해야 했던 것은 <strong className="text-gray-900">수집된 좌표를 언제 서버로 전송할 것인가</strong>였습니다.
          </p>
        </div>

        <br/>

        {/* 예상 문제 */}
        <h4 className="text-xl font-bold text-gray-900">예상 문제</h4>
        <div className="prose max-w-none text-gray-600">
          <p>
            가장 직관적인 구현은 좌표가 수집될 때마다 서버에 전송하는 것입니다.
            GPS 노이즈를 제거하기 위해 10m 이상 이동 시에만 좌표를 수집하더라도, 30분 산책 한 건에 <strong className="text-gray-900">약 200회의 API 요청</strong>이 발생합니다.
          </p>
          <p>
            동시에 여러 사용자가 산책하는 상황을 고려하면, 동시 사용자 10명 기준으로 <strong className="text-gray-900">약 2,000회의 요청</strong>이 30분 동안 서버에 집중됩니다.
            매 요청마다 HTTP 핸드셰이크, 인증 검증, DB 쓰기가 반복되므로 서버 리소스가 실제 비즈니스 로직이 아닌 좌표 저장에 소모되는 구조였습니다.
          </p>
        </div>

        <br/>

        {/* 전송 방식 비교 */}
        <h4 className="text-xl font-bold text-gray-900">전송 방식 비교</h4>
        <div className="prose max-w-none text-gray-600">
          <p>이 문제에 대해 두 가지 접근을 비교했습니다.</p>
        </div>
        <ul className="text-gray-600 space-y-1">
          <li>A. 좌표 수집 시마다 즉시 전송</li>
          <li className="font-bold text-gray-900">B. 클라이언트 축적 후 종료 시 일괄 전송 (채택)</li>
        </ul>
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p>
            <strong className="text-gray-900">A안 -</strong> 서버에 데이터가 실시간으로 쌓이므로 앱이 비정상 종료되더라도 그 시점까지의 경로가 보존됩니다.
            또한 서버에서 실시간 경로 모니터링이나 위치 기반 알림 같은 기능으로의 확장이 용이합니다.
            반면, 산책 한 건당 수백~수천 회의 API 호출이 발생하여 <strong className="text-gray-900">서버 부하가 사용자 수에 비례해 선형으로 증가</strong>합니다.
            모바일 환경에서 매 요청마다 네트워크 연결이 필요하므로 배터리 소모와 데이터 사용량도 커집니다.
          </p>
          <p>
            <strong className="text-gray-900">B안 -</strong> 산책 중에는 좌표를 클라이언트 메모리에만 쌓아두고, 산책 종료 시점에 전체 좌표 배열을 단 1회 전송하는 방식입니다.
            산책 한 건당 API 호출이 <strong className="text-gray-900">시작 1회 + 종료 1회 = 총 2회</strong>로 고정되어, 사용자 수가 늘어도 서버 부하가 산책 횟수에만 비례합니다.
            반면, 산책 중 앱이 비정상 종료되면 <strong className="text-gray-900">누적된 좌표가 모두 유실</strong>됩니다.
          </p>
          <p>
            <strong className="text-gray-900">선택 근거 -</strong> 이 서비스에서 산책 경로는 산책 완료 후 기록 조회 목적으로만 사용되며, 산책 중 서버가 실시간으로 경로를 알아야 하는 요구사항은 없었습니다.
            경로의 실시간 지도 표시는 클라이언트의 로컬 상태만으로 구현 가능했습니다.
            따라서 실시간성을 포기하는 대신 <strong className="text-gray-900">서버 부하를 최소화하는 B안</strong>을 채택했습니다.
          </p>
        </div>

        <br/>

        {/* 구현 */}
        <h4 className="text-xl font-bold text-gray-900">구현</h4>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="font-bold text-gray-900">좌표 수집 — 10m 거리 필터</p>
          <p>
            GPS 원시 데이터는 정지 상태에서도 수 미터의 오차가 발생합니다.
            필터링 없이 모든 좌표를 저장하면 실제로는 움직이지 않았는데 경로가 기록되고, 누적 거리가 부풀어지는 문제가 있습니다.
            이를 방지하기 위해 Geolocator의 distanceFilter: 10 설정으로, GPS 정확도의 오차 범위 이내인 노이즈를 제거했습니다.
          </p>
          <CodeBlock language="dart" fileName="walk_route_map_page.dart">
{`_positionStream = Geolocator.getPositionStream(
  locationSettings: const LocationSettings(
    accuracy: LocationAccuracy.high,
    distanceFilter: 10,  // 10m 이상 이동 시에만 위치 업데이트
  )
).listen((Position pos) {
  _updatePosition(pos);
});`}
          </CodeBlock>

          <p className="font-bold text-gray-900">좌표 누적 — 서버 호출 없이 로컬 리스트에 축적</p>
          <p>
            수신된 좌표는 서버로 전송하지 않고 _actualPath 리스트에 누적합니다.
            지도 UI에는 _myPath를 바인딩하여 실시간 경로를 표시하고, 서버 전송용 데이터는 별도로 쌓아둡니다.
          </p>
          <CodeBlock language="dart" fileName="walk_route_map_page.dart">
{`void _updatePosition(Position position) {
  LatLng newLatLng = LatLng(position.latitude, position.longitude);
  setState(() {
    _myPath.add(newLatLng);           // UI 표시용
    _actualPath.add(WalkRecordPointDTO(    // 서버 전송용 누적
      latitude: position.latitude,
      longitude: position.longitude,
      recordedAt: DateTime.now().toIso8601String(),
    ));
  });
}`}
          </CodeBlock>

          <p className="font-bold text-gray-900">일괄 전송 — 산책 종료 시 단 1회 API 호출</p>
          <p>
            산책 종료 시 누적된 전체 좌표 배열, 총 이동 거리, 소요 시간, 지도 스크린샷을 하나의 요청으로 서버에 전송합니다.
          </p>
          <CodeBlock language="dart" fileName="walk_route_map_page.dart">
{`final endRequest = WalkRecordEndRequestDTO(
  actualDistance: _myTotalDistance,
  actualDuration: _seconds,
  actualPath: _actualPath,  // 산책 중 누적된 전체 좌표
);
await _walkRecordService.endWalk(
  walkRecordId: _walkRecordId!,
  request: endRequest,
  image: imageFile,
);`}
          </CodeBlock>

          <p>
            서버는 전달받은 좌표 배열을 순회하며 WalkRecordPoint로 일괄 저장합니다.
          </p>
          <CodeBlock language="java" fileName="MemberWalkRecordService.java">
{`for (WalkRecordPointDTO point : endRequestDTO.getActualPath()) {
    recordPoints.add(WalkRecordPoint.builder()
        .latitude(point.getLatitude())
        .longitude(point.getLongitude())
        .recordAt(point.getRecordedAt())
        .walkRecord(walkRecord)
        .build());
}`}
          </CodeBlock>
        </div>

        <br/>

        {/* 결과 */}
        <h4 className="text-xl font-bold text-gray-900">결과</h4>
        <div className="prose max-w-none text-gray-600 space-y-2">
          <p className="font-bold text-gray-900">예상 트래픽 비교 (30분 산책, 동시 사용자 10명 기준)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b border-border-light text-left">
                  <th className="py-2 pr-4 font-bold text-gray-900">항목</th>
                  <th className="py-2 pr-4 font-bold text-gray-900">A. 즉시 전송</th>
                  <th className="py-2 font-bold text-gray-900">B. 일괄 전송 (채택)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">API 호출 횟수 (1명)</td>
                  <td className="py-2 pr-4">~200회</td>
                  <td className="py-2 font-bold text-gray-900">2회 (시작 + 종료)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">API 호출 횟수 (10명)</td>
                  <td className="py-2 pr-4">~2,000회</td>
                  <td className="py-2 font-bold text-gray-900">20회</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">좌표 데이터</td>
                  <td className="py-2 pr-4">~16KB</td>
                  <td className="py-2">~16KB (동일)</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4">DB 쓰기 횟수</td>
                  <td className="py-2 pr-4">~200회</td>
                  <td className="py-2 font-bold text-gray-900">1회 (일괄 저장)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            산출 근거: 평균 보행 속도 4km/h, 30분 산책 시 약 2km 이동, 10m 필터 적용 시 ~200개 좌표 수집. 좌표 1건당 ~80바이트(lat·lng·timestamp + JSON 키), HTTP 요청 1건당 ~500바이트 오버헤드 가정.
          </p>
          <p>
            좌표 페이로드는 동일하지만, 일괄 전송 방식은 <strong className="text-gray-900">HTTP 연결 수 자체를 산책 건수로 고정</strong>하여 사용자 수가 늘어도 서버 부하가 산책 횟수에만 비례하는 구조가 됩니다.
          </p>
        </div>

        <br/>

        {/* 회고 */}
        <h4 className="text-xl font-bold text-gray-900">회고</h4>
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
        </div>
      </section>
    </article>
  );
}

export default HereDoggyPage;
