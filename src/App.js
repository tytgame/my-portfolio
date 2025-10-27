import './App.css';
import { useScroll } from './hooks/useScroll';
import GreetingPage from './pages/GreetingPage';
import HereDoggyPage from './pages/HereDoggyPage';
import WhereGoPage from './pages/WhereGoPage';


function App() {
  useScroll(); // 스크롤 이벤트 리스너 등록을 위해 호출

  return (
    <div className="App">
      {/* 메인 콘텐츠 영역 */}
      <main className="main-content">
        <GreetingPage />
        <HereDoggyPage />
        <WhereGoPage />
      </main>
    </div>
  );
}

export default App;
