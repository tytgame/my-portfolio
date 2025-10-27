import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [activeSection, setActiveSection] = useState('greeting');
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 각 섹션의 위치에 따라 활성 섹션 결정
      if (scrollPosition < windowHeight * 0.5) {
        setActiveSection('greeting');
      } else if (scrollPosition < windowHeight * 1.5) {
        setActiveSection('career');
      } else if (scrollPosition < windowHeight * 2.5) {
        setActiveSection('project');
      } else {
        setActiveSection('education');
      }

      // Intersection Observer를 사용하여 섹션 가시성 확인
      const sections = document.querySelectorAll('.section-content');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible) {
          setVisibleSections(prev => new Set([...prev, index]));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { activeSection, visibleSections };
};
