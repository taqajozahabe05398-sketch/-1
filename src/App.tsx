import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { GenerateReport } from './pages/GenerateReport';
import { ReportLibrary } from './pages/ReportLibrary';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { SystemMonitor } from './pages/SystemMonitor';
import { AnimatePresence, motion } from 'motion/react';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'generate': return <GenerateReport />;
      case 'library': return <ReportLibrary />;
      case 'knowledge': return <KnowledgeBase />;
      case 'monitor': return <SystemMonitor />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} onNavigate={setActivePage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
