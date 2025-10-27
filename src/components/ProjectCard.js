import React from 'react';

// Helper function to wrap technical terms with tooltip
const renderTextWithTooltips = (text) => {
  const tooltips = {
    'Haversine 공식': '지구의 곡률을 고려하여 위도와 경도로부터 정확한 거리를 계산하는 공식'
  };
  
  let result = [text];
  
  // Replace each term with a span element
  Object.entries(tooltips).forEach(([term, tooltip]) => {
    result = result.flatMap(part => {
      if (typeof part === 'string') {
        const parts = part.split(term);
        const newParts = [];
        for (let i = 0; i < parts.length; i++) {
          if (i > 0) {
            newParts.push(
              <span key={`${term}-${i}`} className="term-tooltip" data-tooltip={tooltip}>
                {term}
              </span>
            );
          }
          if (parts[i]) {
            newParts.push(parts[i]);
          }
        }
        return newParts;
      }
      return part;
    });
  });
  
  return result;
};

const ProjectCard = ({ 
  projectNumber,
  category, 
  title, 
  description, 
  period, 
  role, 
  teamSize, 
  techStack, 
  githubLink,
  // 상세 정보 추가
  planning,
  features,
  screenshots,
  architecture,
  flowDiagram,
  troubleshooting
}) => {
  return (
    <div className={`project-detail-container project-${projectNumber}`}>
      {/* 기본 프로젝트 정보 */}
      <section className="project-basic-info">
        <div className="project-container">
          <div className="project-content">
            <div className="project-info">
              <div className="project-header">
                <h2 className="project-section-title">프로젝트 - {title}</h2>
              </div>
              <div className="project-category">
                {Array.isArray(category) ? (
                  category.map((cat, index) => (
                    <span key={index} className="category-tag">{cat}</span>
                  ))
                ) : (
                  <span className="category-tag">{category}</span>
                )}
              </div>
              <p className="project-description">{description}</p>
              <div className="project-details">
                <div className="detail-item">
                  <span className="detail-label">기간</span>
                  <span className="detail-value">{period}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">역할</span>
                  <span className="detail-value">{role}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">팀원</span>
                  <span className="detail-value">{teamSize}</span>
                </div>
              </div>
              <div className="tech-stack">
                {techStack.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={githubLink} className="project-link">
                  <svg viewBox="0 0 24 24" fill="#000000">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="project-features-inline">
              {features && (
                <div className="features-inline-grid">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-inline-card">
                      <div className="feature-inline-icon">
                        <span>{feature.icon}</span>
                      </div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 화면 슬라이더 */}
      {screenshots && (
        <section className="project-screenshots">
          <div className="project-container">
            <div className="section-header">
              <h3>프로젝트 화면</h3>
            </div>
            <div className="screenshot-slider">
              <div className="slider-container">
                {screenshots.map((screenshot, index) => (
                  <div key={index} className="screenshot-group">
                    <h4 className="screenshot-group-title">{screenshot.title}</h4>
                    <div className="screenshot-images">
                      {screenshot.images ? (
                        screenshot.images.map((img, idx) => (
                          <img key={idx} src={img.image} alt={img.caption} className="screenshot-image-small" />
                        ))
                      ) : screenshot.image ? (
                        <img src={screenshot.image} alt={screenshot.title} className="screenshot-image-small" />
                      ) : (
                        <div className="screenshot-placeholder">
                          <span>{screenshot.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 아키텍처 섹션 */}
      {architecture && (
        <section className="project-architecture">
          <div className="project-container">
            <div className="section-header">
              <h3>시스템 아키텍처</h3>
            </div>
            <div className="architecture-content">
              <div className="architecture-description">
                <p>{architecture.description}</p>
              </div>
              <div className="architecture-diagram">
                {architecture.image ? (
                  <img src={architecture.image} alt="시스템 아키텍처" className="architecture-image" />
                ) : (
                  <div className="diagram-placeholder">
                    <span>아키텍처 다이어그램</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}


      {/* 트러블슈팅 섹션 */}
      {troubleshooting && (
        <section className="project-troubleshooting">
          <div className="project-container">
            <div className="section-header">
              <h3>문제상황 및 해결과정</h3>
            </div>
            <div className="troubleshooting-content">
              {troubleshooting.map((issue, index) => (
                <div key={index} className="troubleshooting-item">
                  <div className="issue-header">
                    <h4>{issue.title}</h4>
                    {issue.background && (
                      <div className="issue-background">
                        {issue.background.image && (
                          <img src={issue.background.image} alt="서비스 흐름도" className="background-image" />
                        )}
                        {issue.background.text && (
                          <p className="background-text">{issue.background.text}</p>
                        )}
                        {issue.background.description && (
                          <p>{issue.background.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="issue-problem">
                    <h5>문제 상황</h5>
                    <p>{issue.problem}</p>
                  </div>

                  <div className="issue-exploration">
                    <h5>해결 방안 탐색</h5>
                    <p>{issue.exploration}</p>
                    {issue.attempts && (
                      <ul className="attempts-list-simple">
                        {issue.attempts.map((attempt, idx) => (
                          <li key={idx} className={`attempt-item-simple ${attempt.adopted ? 'adopted' : ''}`}>
                            <strong className="attempt-title">{attempt.title}</strong>
                            <p className="attempt-description">{renderTextWithTooltips(attempt.description)}</p>
                            {attempt.adopted ? (
                              <p className="attempt-benefit">
                                 {attempt.lesson}
                              </p>
                            ) : attempt.lesson && (
                              <p className="attempt-limitation">
                                 {attempt.lesson}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="issue-solution">
                    <h5>해결 과정</h5>
                    <p>{renderTextWithTooltips(issue.solution)}</p>
                    {issue.solutionSteps && (
                      <div className="solution-steps">
                        {issue.solutionSteps.map((step, idx) => (
                          <div key={idx} className="solution-step">
                            <div className="step-number">{idx + 1}</div>
                            <div className="step-content">
                              <h6>{step.title}</h6>
                              <p>{step.description}</p>
                              {step.code && (
                                <pre className="code-block">
                                  <code className="language-dart">{step.code}</code>
                                </pre>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {issue.code && (
                      <pre className="code-block">
                        <code className="language-dart">{issue.code}</code>
                      </pre>
                    )}
                  </div>

                  <div className="issue-results">
                    <h5>결과</h5>
                    <p dangerouslySetInnerHTML={{ __html: issue.experience || issue.result }} />
                  </div>

                  {issue.learnings && (
                    <div className="issue-learnings">
                      <h5>배운 점</h5>
                      <p>{issue.learnings}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectCard;
