import React from 'react';

const GreetingPage = () => {
  return (
    <section id="greeting" className="section greeting-section full-width">
      {/* 페이지 헤더 */}
      <header className="page-header">
        <div className="header-content">
          <div className="header-left">
            {/* 왼쪽은 비워둠 */}
          </div>
          <div className="header-right">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-link">
                  yesung4133@gmail.com
                </span>
              </div>
              <div className="contact-item">
                <span className="contact-link">
                  010-3034-2217
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="greeting-content">
        <h1>안녕하세요</h1>
        <h2>프론트엔드 개발자 유예성입니다</h2>
        <p>문제를 해결하고 불편을 개선하는 과정에서 즐거움을 느끼며,</p>
        <p>서비스에 애정을 가지고 일하는 개발자입니다</p>
      </div>
    </section>
  );
};

export default GreetingPage;
