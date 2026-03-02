import React, { useState } from 'react';
import { AuroraCard, AuroraButton } from '../components/AuroraUI';
import { KB_DATA } from '../data/mockData';
import { 
  Database, 
  UploadCloud, 
  Search, 
  CheckCircle2, 
  Loader2, 
  FileText,
  Plus,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const KnowledgeBase = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [docs, setDocs] = useState<string[]>(['Q3_Financial_Report.pdf', 'Industry_Analysis_2024.pdf', 'Tech_Whitepaper_v2.pdf']);
  
  const [searchQuery, setSearchQuery] = useState('宇树科技 市场份额');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setDocs(prevDocs => [...prevDocs, 'New_Uploaded_Doc.pdf']);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchResults(null);
    
    setTimeout(() => {
      setIsSearching(false);
      setSearchResults(KB_DATA.searchResults);
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Left Column: Data Sources */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white">数据源接入状态</h2>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {KB_DATA.sources.map((source) => (
            <AuroraCard key={source.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Database className={`w-5 h-5 ${source.status === 'online' ? 'text-aria-green' : 'text-aria-text-sub'}`} />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{source.name}</div>
                    <div className="text-xs text-aria-text-sub">{source.desc}</div>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  source.status === 'online' ? 'bg-aria-green animate-pulse-glow' : 
                  source.status === 'syncing' ? 'bg-aria-cyan animate-pulse' : 'bg-aria-text-sub'
                }`} />
              </div>
              
              <div className="flex justify-between text-xs text-aria-text-sub mb-2 mt-4">
                <span>{source.count} Records</span>
                <span>{source.time}</span>
              </div>
              
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${source.status === 'syncing' ? 'bg-aria-cyan' : 'bg-aria-green'}`}
                  style={{ width: `${source.progress}%` }}
                />
              </div>
            </AuroraCard>
          ))}
        </div>

        <AuroraButton className="w-full !py-3 border-dashed border-2 border-white/20 bg-transparent hover:bg-white/5">
          <Plus className="w-5 h-5" /> 新增数据源
        </AuroraButton>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        {/* Upload Section */}
        <section>
          <h2 className="text-xl font-display font-bold text-white mb-4">文档上传入库</h2>
          <div 
            onClick={!isUploading ? handleUpload : undefined}
            className={`
              border-2 border-dashed border-white/10 rounded-xl p-8 text-center transition-all duration-300
              ${isUploading ? 'bg-white/5 cursor-wait' : 'hover:border-aria-cyan hover:bg-aria-cyan/5 cursor-pointer group'}
            `}
          >
            {isUploading ? (
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-aria-cyan">Processing...</span>
                  <span className="font-mono text-white">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-aria-cyan to-aria-purple"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-aria-text-sub mt-2">
                  <span>Parsing PDF</span>
                  <span>Embedding</span>
                  <span>Indexing</span>
                </div>
              </div>
            ) : (
              <div className="group-hover:scale-105 transition-transform duration-300">
                <UploadCloud className="w-12 h-12 text-aria-text-sub mx-auto mb-4 group-hover:text-aria-cyan" />
                <p className="text-white font-medium mb-1">Click or Drag files here to upload</p>
                <p className="text-sm text-aria-text-sub">Support PDF, DOCX, TXT (Max 50MB)</p>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            {docs.map((doc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
              >
                <FileText className="w-4 h-4 text-aria-text-sub" />
                <span className="text-sm text-white flex-1">{doc}</span>
                <CheckCircle2 className="w-4 h-4 text-aria-green" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Search Test Section */}
        <section className="flex-1 flex flex-col">
          <h2 className="text-xl font-display font-bold text-white mb-4">语义检索测试</h2>
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-aria-text-sub" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A1023] border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white focus:border-aria-cyan outline-none transition-colors"
            />
            <AuroraButton 
              type="submit" 
              disabled={isSearching}
              className="absolute right-2 top-2 bottom-2 !py-0 !px-6"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
            </AuroraButton>
          </form>

          <AnimatePresence>
            {searchResults && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-xs font-mono text-aria-text-sub flex items-center gap-2">
                  <span className="text-aria-green">Found 23 results</span>
                  <span>•</span>
                  <span>Hybrid Search</span>
                  <span>•</span>
                  <span>0.042s</span>
                </div>

                {searchResults.map((res, i) => (
                  <AuroraCard key={i} className="p-4 hover:border-aria-cyan/30 transition-colors cursor-default">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-xs text-aria-text-sub">{res.source}</span>
                      <span className="font-mono text-xs text-aria-cyan">Sim: {res.similarity}</span>
                    </div>
                    <p className="text-sm text-aria-text-main leading-relaxed">
                      {res.text}
                    </p>
                  </AuroraCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};
