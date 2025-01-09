import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Mic, Upload, Send, X, FileText, Briefcase, FileCode, Copy, Check, Edit2, Settings } from 'lucide-react';
import Background from '../components/Background';
import Particles from './particles';

interface Project {
  Title: string;
  point_1: string;
  point_2: string;
  point_3: string;
}

interface Message {
  content: string;
  type: 'user' | 'bot';
  id?: string;
  artifacts?: {
    job_details: string;
    skills_and_projects: {
      skills: string[];
      projects: Project[];
    };
    cover_letter: string;
  };
}

interface ApiResponse {
  status: string;
  data: {
    job_details: string;
    skills_and_projects: {
      skills: string[];
      projects: Project[];
    };
    cover_letter: string;
  };
}

const STORAGE_KEYS = {
  MESSAGES: 'chat_messages',
  CURRENT_ARTIFACTS: 'current_artifacts',
  SELECTED_ARTIFACT: 'selected_artifact',
  SIDEBAR_OPEN: 'sidebar_open',
  SIDEBAR_WIDTH: 'sidebar_width',
  THEME: 'theme',
  FONT_SIZE: 'font_size'
} as const;

const HoverSettingsSidebar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.THEME) || 'dark');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || 'medium');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize);
  }, [fontSize]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 w-2 h-full bg-transparent z-50 hover:bg-blue-500/20 transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 w-64 h-full bg-gray-900/95 backdrop-blur-md border-r border-white/10 z-40"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Settings className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Settings</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white">Theme</h3>
                <select 
                  className="w-full bg-gray-800 text-white rounded-md p-2 border border-white/10"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-white">Font Size</h3>
                <select 
                  className="w-full bg-gray-800 text-white rounded-md p-2 border border-white/10"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <button
                onClick={() => {
                  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
                  window.location.reload();
                }}
                className="w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
              >
                Clear History
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState<string>('');
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_OPEN);
    return saved ? JSON.parse(saved) : false;
  });

  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_ARTIFACT);
    return saved ? JSON.parse(saved) : null;
  });

  const [currentArtifacts, setCurrentArtifacts] = useState<ApiResponse['data'] | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ARTIFACTS);
    return saved ? JSON.parse(saved) : null;
  });

  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH);
    return saved ? parseInt(saved) : 400;
  });

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<{ [key: string]: boolean }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ARTIFACTS, JSON.stringify(currentArtifacts));
  }, [currentArtifacts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_ARTIFACT, JSON.stringify(selectedArtifact));
  }, [selectedArtifact]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_OPEN, JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_WIDTH, String(sidebarWidth));
  }, [sidebarWidth]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = document.documentElement.clientWidth - e.clientX;
        setSidebarWidth(Math.max(300, Math.min(800, newWidth)));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, messageId?: string): Promise<void> => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    if (messageId) {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, content: userMessage } : msg
      ));
    } else {
      setMessages(prev => [...prev, { 
        content: userMessage, 
        type: 'user', 
        id: Date.now().toString() 
      }]);
    }

    setEditingMessageId(null);
    setIsLoading(true);

    try {
      const res = await axios.post<ApiResponse>('http://localhost:8000/chat', { 
        content: userMessage 
      });
      
      const newMessage: Message = {
        content: 'I have analyzed your request and prepared the following documents:',
        type: 'bot',
        artifacts: res.data.data
      };
      
      setMessages(prev => [...prev, newMessage]);
      setCurrentArtifacts(res.data.data);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        content: 'Sorry, there was an error processing your request.', 
        type: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (content: string, artifactId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopyStatus({ ...copyStatus, [artifactId]: true });
      setTimeout(() => {
        setCopyStatus({ ...copyStatus, [artifactId]: false });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setInput(content);
  };

  const artifactButtons = [
    { id: 'job_details', icon: Briefcase, label: 'Job Details' },
    { id: 'skills_and_projects', icon: FileCode, label: 'Skills & Projects' },
    { id: 'cover_letter', icon: FileText, label: 'Cover Letter' }
  ];

  const renderArtifactContent = () => {
    if (!currentArtifacts || !selectedArtifact) return null;

    const renderCopyButton = (content: string, artifactId: string) => (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCopy(content, artifactId)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-gray-800/50 rounded-md transition-colors"
      >
        {copyStatus[artifactId] ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </motion.button>
    );

    switch (selectedArtifact) {
      case 'job_details':
        return (
          <div className="p-4 relative">
            <h3 className="text-lg font-semibold mb-4 pr-12 text-white">Job Details</h3>
            {renderCopyButton(currentArtifacts.job_details, 'job_details')}
            <div className="whitespace-pre-wrap text-gray-200">{currentArtifacts.job_details}</div>
          </div>
        );

      case 'skills_and_projects':
        return (
          <div className="p-4 relative">
            <h3 className="text-lg font-semibold mb-4 pr-12 text-white">Skills and Projects</h3>
            {renderCopyButton(JSON.stringify(currentArtifacts.skills_and_projects, null, 2), 'skills_and_projects')}
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-white">Skills</h4>
              <ul className="list-disc pl-4 text-gray-200">
                {currentArtifacts.skills_and_projects.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white">Projects</h4>
              {currentArtifacts.skills_and_projects.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h5 className="font-semibold text-white">{project.Title}</h5>
                  <ul className="list-disc pl-4 text-gray-200">
                    <li>{project.point_1}</li>
                    <li>{project.point_2}</li>
                    <li>{project.point_3}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cover_letter':
        return (
          <div className="p-4 relative">
            <h3 className="text-lg font-semibold mb-4 pr-12 text-white">Cover Letter</h3>
            {renderCopyButton(currentArtifacts.cover_letter, 'cover_letter')}
            <div className="whitespace-pre-wrap text-gray-200">{currentArtifacts.cover_letter}</div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-gray-900/95">
      <Background opacity={0} />
      <Particles />
      <HoverSettingsSidebar />
      
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20 bg-gray-800/90 backdrop-blur-lg rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
        <h1 className="text-white font-semibold">Resume Builder</h1>
      </div>

      <div className="relative z-10 h-full pt-16 flex">
        <div className="flex-1 flex flex-col bg-black/30 backdrop-blur-lg">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 relative ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {message.content}
                  {message.artifacts && (
                    <div className="mt-4 flex gap-2">
                      {artifactButtons.map(({ id, icon: Icon, label }) => (
                        <motion.button
                          key={id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setCurrentArtifacts(message.artifacts);
                            setSelectedArtifact(id);
                            setSidebarOpen(true);
                          }}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/15 bg-gray-900/50">
            <form onSubmit={(e) => handleSubmit(e, editingMessageId || undefined)} className="w-full">
              <div className="flex items-center h-16 px-4">
                <div className="flex items-center space-x-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Voice Input"
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Upload File"
                  >
                    <Upload className="w-5 h-5" />
                  </motion.button>
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  placeholder={editingMessageId ? "Edit your message..." : "Type your message..."}
                  className="flex-1 mx-4 h-10 bg-white/5 text-white rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: sidebarWidth, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: sidebarWidth }}
                className="h-full bg-gray-800 border-l border-white/10 overflow-hidden relative"
              >
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gray-900">
                    <h2 className="text-xl font-semibold text-white">Documents</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className="flex-1 overflow-y-auto bg-gray-800 text-gray-100">
                    {renderArtifactContent()}
                  </div>
                </div>
                
                <div
                  ref={resizeRef}
                  className="absolute left-0 top-0 h-full w-1 cursor-ew-resize hover:bg-blue-500/50 transition-colors"
                  onMouseDown={() => setIsResizing(true)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;