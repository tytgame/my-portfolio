import React from 'react';
import ProjectCard from '../components/ProjectCard';

const HereDoggyPage = () => {
  const projectData = {
    projectNumber: 1,
    category: ["Mobile App", "Web Service"],
    title: "여기보개",
    description: "유기동물 산책/체험 및 입양 플랫폼으로, 보호소와 시민을 연결하여 유기동물의 산책/체험을 통해 입양을 도모하는 종합 서비스입니다.",
    period: "2025.05 - 2025.07",
    role: "사용자 앱/웹 프론트 전반 개발",
    teamSize: "4명",
    techStack: ["Flutter", "Dart", "React", "JavaScript", "Spring Boot", "PostgreSQL", "Redis"],
    githubLink: "https://github.com/tytgame/HereDoggy",
    // 상세 정보 추가
    features: [
      {
        icon: "🚶‍♀️",
        title: "산책/체험 예약",
        description: "유기동물과의 산책 체험 예약 및 실시간 경로 기록"
      },
      {
        icon: "🏠",
        title: "입양 신청",
        description: "MBTI/설문 기반 맞춤 입양 추천 및 신청 시스템"
      },
      {
        icon: "📍",
        title: "제보 시스템",
        description: "유기동물 제보 등록"
      },
      {
        icon: "💬",
        title: "커뮤니티",
        description: "자유 게시판, 산책 후기 게시판, 실종/목격 게시판"
      },
      {
        icon: "🤖",
        title: "AI 기능",
        description: "자동 품종 등록, AI 맞춤 추천, Gemini 챗봇"
      },
      {
        icon: "🔔",
        title: "실시간 알림",
        description: "FCM/SSE 기반 푸시 알림"
      }
    ],
    
    screenshots: [
      {
        title: "홈 & 로그인",
        images: [
          { image: "/HereDoggyHome.jpg", caption: "메인 홈 화면" },
          { image: "/HereDoggyLogin.jpg", caption: "로그인 화면" }
        ],
        caption: "앱의 메인 화면과 사용자 인증"
      },
      {
        title: "보호소 정보",
        images: [
          { image: "/HereDoggySearchShelter.jpg", caption: "지도 기반 보호소 검색" },
          { image: "/HereDoggyShelterDetail.jpg", caption: "보호소 정보 확인" }
        ],
        caption: "가까운 보호소를 찾고 유기견을 탐색하는 기능"
      },
      {
        title: "산책 예약 및 내역",
        images: [
          { image: "/HereDoggyWalkReservationCalendar.jpg", caption: "산책 일정 예약" },
          { image: "/HereDoggyWalkList.jpg", caption: "산책 내역 목록" }
        ],
        caption: "산책 일정 예약부터 기록 관리까지의 전체 플로우"
      },
      {
        title: "입양 플로우",
        images: [
          { image: "/HereDoggyAdoptionSurvey.jpg", caption: "MBTI 기반 입양 설문" },
          { image: "/HereDoggyAdoption.jpg", caption: "맞춤 강아지 추천" }
        ],
        caption: "설문 기반 맞춤 추천부터 입양까지의 과정"
      },
      {
        title: "커뮤니티",
        images: [
          { image: "/HereDoggyCommunity.jpg", caption: "커뮤니티 게시판" },
          { image: "/HereDoggyCommunityDetail.jpg", caption: "게시글 상세 및 댓글" }
        ],
        caption: "산책 후기, 일상 공유, 실종/목격 게시판 등 커뮤니티 기능"
      },
      {
        title: "스토어 & AI",
        images: [
          { image: "/HereDoggyStore.jpg", caption: "굿즈 스토어" },
          { image: "/HereDoggyGeminiChatbot.jpg", caption: "AI 챗봇 상담" }
        ],
        caption: "굿즈 구매, AI 입양 상담, 개인 정보 관리"
      }
    ],
    
    architecture: {
      image: "/HereDoggyArchitecture.png"
    },
    
    flowDiagram: {
      description: "사용자가 앱을 통해 유기동물 정보를 확인하고 산책 체험을 예약한 후, 체험을 통해 입양을 결정하는 전체 플로우를 관리합니다. 보호소는 실시간으로 산책 상황을 모니터링하고 관리할 수 있습니다."
    },
    
    troubleshooting: [
      {
        title: "산책 진행중 데이터 과다 저장 문제",
        background: {
          image: "/HereDoggyUserFlow.png",
          text: "여기보개의 산책 서비스는 산책 날짜를 예약하고, 해당 일자에 산책을 진행하면 실시간으로 이동 경로가 그려지며 좌표 데이터들이 서버에 저장됩니다."
        },
        problem: "산책기능 구현을 마치고 근처에서 실제로 30분간 산책 테스트를 진행한 결과, 좌표 데이터를 과도하게 저장하는 문제를 발견했습니다. 매 초마다 위치를 저장하여 30분에 1,800개의 좌표 데이터가 생성되었고, 한 번의 산책으로 저장된 데이터 크기가 157KB에 달했습니다. 테스트 단계에서는 큰 문제가 되지 않았지만, 규모가 커져 월간 이용자 1만 명이 5회씩 산책할 경우 7.66GB의 데이터가 누적되며 사용자가 증가할수록 DB 성능 저하와 저장 비용이 기하급수적으로 증가할 것으로 예상되었습니다. 또한 쉬는 상태에서도 위치가 계속 저장되어 배터리 소모량이 많은 문제가 있었습니다.",
        exploration: "문제 해결을 위해 여러 접근 방식을 고민했습니다. 목표는 '불필요한 데이터 수집을 30% 이상 줄이면서 정확한 위치를 저장하는 방식'을 찾는 것이었고, 단순히 시간 간격을 늘린 방법부터 실제 이동 거리 기반, 시간과 거리를 조합한 방식까지 다양한 대안을 고민하고 시도했습니다.",
        attempts: [
          {
            title: "시간 간격 필터링",
            description: "1초마다 위치를 저장하는 대신 5초마다 저장하도록 변경했습니다.",
            lesson: "시간과 관련된 접근은 정지 상태에서도 계속 저장되는 문제가 있어 효과적이지 않았습니다. 실제 이동 거리를 고려한 접근이 필요하다는 것을 깨달았습니다."
          },
          {
            title: "거리 기반 필터링",
            description: "Haversine 공식을 사용해 이전 위치와 10m 이상 떨어졌을 때만 저장하도록 구현했습니다.",
            lesson: "실제 이동 거리를 기준으로 한 이 방식이 가장 효과적이었습니다. GPS 정확도와 데이터 크기의 균형점을 찾는 것이 중요했습니다.",
            adopted: true
          },
          {
            title: "시간 + 거리 조합 필터링",
            description: "시간 간격(5초)과 거리(10m) 두 조건을 모두 만족할 때 저장하도록 조합한 방식입니다. 예를 들어 '5초가 지났고 동시에 10m 이상 이동했을 때만 저장'으로 설정했습니다.",
            lesson: "두 조건을 모두 만족해야 저장하는 방식은 불필요하게 복잡했습니다. 거리 필터링만으로도 정지 상태에서 데이터가 저장되지 않게 방지할 수 있었기 때문에, 시간 조건은 불필요한 요소였습니다. 거리 기반 필터링이 간단하면서도 더 효과적이었습니다."
          }
        ],
        solution: "기기 자체에서 1초마다 위치를 저장했던 방식을 10m 이동 시에만 저장하는 방식으로 변경했습니다. 또한 앱 내에서도 Haversine 공식을 활용하여 정확한 거리 계산으로 위치 정확도를 향상시켰습니다.",
        solutionSteps: [
          {
            title: "Before: 1초마다 저장",
            description: "GPS 위치가 업데이트될 때마다 무조건 저장하여 30분 산책 시 1,800개의 좌표 데이터가 생성되었습니다.",
            code: `// 초기 구현
_positionStream = Geolocator.getPositionStream(
  locationSettings: const LocationSettings(
    accuracy: LocationAccuracy.high,
  )
).listen((Position pos) {
  _actualPath.add(WalkRecordPointDTO(
    latitude: pos.latitude,
    longitude: pos.longitude,
    recordedAt: DateTime.now().toIso8601String(),
  ));
});`
          },
          {
            title: "After: 10m 이동 시에만 저장",
            description: "기기 자체에서 distanceFilter로 10m 이상 이동 시에만 GPS 위치 업데이트를 받고, 앱에서도 정확한 거리 계산 로직을 추가하여 이중으로 필터링했습니다.",
            code: `// GPS 스트림 설정
_positionStream = Geolocator.getPositionStream(
  locationSettings: const LocationSettings(
    accuracy: LocationAccuracy.high,
    distanceFilter: 10,  // 10m 이상 이동 시에만 업데이트
  )
).listen((Position pos) {
  _updatePosition(pos);
});

// 거리 필터링
void _updatePosition(Position position) {
  LatLng newLatLng = LatLng(position.latitude, position.longitude);
  
  // 10m 이상 이동 시에만 저장
  if (_myPath.isEmpty || 
      _calculateDistance(_myPath.last, newLatLng) >= 10.0) {
    _actualPath.add(WalkRecordPointDTO(
      latitude: position.latitude,
      longitude: position.longitude,
      recordedAt: DateTime.now().toIso8601String(),
    ));
  }
}

// Haversine 공식으로 거리 계산
double _calculateDistance(LatLng a, LatLng b) {
  const double earthRadius = 6371000; // meter
  double dLat = _deg2rad(b.latitude - a.latitude);
  double dLng = _deg2rad(b.longitude - a.longitude);
  double sindLat = math.sin(dLat / 2);
  double sindLng = math.sin(dLng / 2);
  double va = sindLat * sindLat + 
              math.cos(_deg2rad(a.latitude)) * 
              math.cos(_deg2rad(b.latitude)) * 
              sindLng * sindLng;
  double c = 2 * math.atan2(math.sqrt(va), math.sqrt(1 - va));
  return earthRadius * c;
}`
          },
        ],
        experience: `한 번의 산책 시 저장되는 데이터를 87% 이상 감소시키면서 경로 정확도를 10m 이내로 유지했습니다 (30분 산책, 2.3km 이동 기준. 1,800개 → 약 230개 좌표, 157KB → 16KB). 배터리 소모가 체감될 정도로 감소했고, 초기 구현 방식보다 개선된 방식에서 시각적으로 보여지는 경로가 훨씬 자연스럽게 그려졌습니다.`,
        learnings: `이번 최적화 과정을 통해 '동작하는 코드'와 '좋은 코드'의 차이를 고민하는 계기가 되었습니다. 초기 구현 방식에서도 기능은 동작했지만, 되돌아보면 결코 좋은 코드는 아니었습니다. 현재 개선된 방식도 마찬가지로 더 좋은 방식이 있을 것이라 생각되고, 끊임없이 생각하며 배우고 더 나은 방식을 찾아서 '좋은 코드'를 고민해야 한다는 것을 깨달았습니다.
또한, 문제를 숫자로 정량화하는 사고과정과 대안을 여러가지로 탐색하고, 규모가 커질 경우 예상되는 문제점을 미리 생각하는 법을 배웠습니다. '데이터가 많다'는 모호한 문제를 "30분에 1,800개, 월간 이용자 1만 명 기준 7.66GB"라는 정량적 수치로 구체화하면서 문제를 명확히 인지했습니다. 이는 해결책의 목표도 단순 개선이 아닌 수치로 설정하는 기준이 되었습니다.
마지막으로 근본 원리를 이해하는 것이 중요하다는 것을 배웠습니다. 단순히 앱 로직으로 해결하려던 초기 접근과 달리, Geolocator의 distanceFilter라는 기기 자체 기능을 활용하는 것이 배터리와 성능에 유리할 수 있음을 깨달았습니다. 기술을 선택할 때 그 기술이 내부적으로 어떻게 동작하는지 이해하는 과정의 중요성을 배우게 되었습니다.`
      },
    ]
  };

  return <ProjectCard {...projectData} />;
};

export default HereDoggyPage;
