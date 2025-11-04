import React from 'react';
import ProjectCard from '../components/ProjectCard';

const WhereGoPage = () => {
  const projectData = {
    projectNumber: 2,
    category: "Web Service",
    title: "어디고",
    description: "막막한 해외여행 일정 관리부터, 커뮤니티로 소통하는 플랫폼으로 사용자가 직접 여행지를 등록하고 리뷰를 남길 수 있는 커뮤니티 기반 웹 서비스입니다.",
    period: "2025.04 - 2025.05",
    role: "여행 일정 관리, 체크리스트 기능 구현",
    teamSize: "5명",
    techStack: ["React", "JavaScript", "Spring Boot", "MySQL"],
    githubLink: "https://github.com/tytgame/whereGo",
    
    // 상세 정보 추가
    planning: {
      title: "기획의도",
      description: "해외여행을 계획할 때 일정 관리의 어려움과 신뢰할 수 있는 여행지 정보 부족을 해결하기 위해 시작된 팀 프로젝트입니다.",
      points: [
        "사용자 친화적인 여행 일정 관리 시스템",
        "실제 여행객들의 리뷰 기반 여행지 정보 제공",
        "지도 기반 여행지 위치 확인 및 검색",
        "소셜 기능을 통한 여행 경험 공유"
      ]
    },
    
    features: [
      {
        icon: "✈️",
        title: "여행 일정 관리",
        description: "여행지 등록/수정/삭제 및 일정 리스트 관리"
      },
      {
        icon: "🗺️",
        title: "지도 기반 탐색",
        description: "Google Maps API를 활용한 여행지 위치 확인"
      },
      {
        icon: "💬",
        title: "커뮤니티 게시판",
        description: "게시글 작성/수정/삭제, 댓글, 좋아요 기능"
      },
      {
        icon: "📸",
        title: "사진 업로드",
        description: "여행 후기 사진 업로드 및 공유"
      },
      {
        icon: "📋",
        title: "체크리스트",
        description: "여행 준비물 체크리스트 관리"
      },
      {
        icon: "💰",
        title: "환율 계산",
        description: "exchangerate API를 활용한 환율 조회 및 계산"
      }
    ],
    
    screenshots: [
      {
        title: "체크리스트 작성",
        images: [
          { image: "/WhereGoChecklist.png", caption: "체크리스트 작성 화면" }
        ],
        caption: "여행 준비물 체크리스트를 작성하는 모달 화면"
      },
      {
        title: "체크리스트 목록",
        images: [
          { image: "/WhereGoChecklistList.png", caption: "체크리스트 목록 화면" }
        ],
        caption: "여행지별로 관리되는 체크리스트 목록 화면"
      },
      {
        title: "여행 설문",
        images: [
          { image: "/WhereGoSurvey.png", caption: "여행 설문 화면" }
        ],
        caption: "여행 기간, 동반자, 선호 스타일을 선택하는 설문 화면"
      },
      {
        title: "여행지 등록",
        images: [
          { image: "/WhereGoSchedule.png", caption: "여행지 일정 등록 화면" }
        ],
        caption: "Google Maps를 활용한 여행지 등록 및 일정 관리 화면"
      }
    ],
    
    architecture: {
      image: "/WhereGoArchitecture.png",
    },
    
    flowDiagram: {
      description: "사용자가 회원가입 후 여행지를 등록하고, 일정을 관리하며, 커뮤니티에서 여행 후기를 공유하는 전체 사용자 플로우를 관리합니다. 환율 및 날씨 정보를 실시간으로 조회하여 여행 계획 수립을 지원합니다."
    },
    
    
  };

  return <ProjectCard {...projectData} />;
};

export default WhereGoPage;
