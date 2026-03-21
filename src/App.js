import './App.css';
import BlockmindPage from './pages/BlockmindPage';
import HereDoggyPage from './pages/HereDoggyPage';
import WhereGoPage from './pages/WhereGoPage';

function App() {
  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      <header className="w-full max-w-4xl mx-auto px-6 py-12 flex justify-between items-start border-b border-border-light mb-16">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-primary">유예성</h1>
          <p className="text-sm text-gray-500 mt-1">Frontend Developer</p>
        </div>
        <div className="text-right text-sm text-gray-500 flex flex-col gap-1">
          <span>yuyeseong@gmail.com</span>
          <a className="hover:text-primary transition-colors" href="https://github.com/tytgame" target="_blank" rel="noreferrer">
            github.com/tytgame
          </a>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-6 pb-32 space-y-32">
        <BlockmindPage />
        <hr className="border-border-light" />
        <HereDoggyPage />
        <hr className="border-border-light" />
        <WhereGoPage />
      </main>

      <footer className="w-full max-w-4xl mx-auto px-6 py-12 border-t border-border-light text-center text-xs text-gray-400">
        <p>© 2026 Yuyeseong. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
