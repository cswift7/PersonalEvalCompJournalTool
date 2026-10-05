import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Target, 
  Award, 
  FileText, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ChevronRight, 
  Plus, 
  Download, 
  RefreshCw, 
  Lightbulb, 
  BarChart2, 
  Clock, 
  Zap, 
  Compass, 
  Sliders,
  Filter,
  Check,
  Building,
  User,
  MessageSquare
} from 'lucide-react';

const FLVS_RUBRIC_DOMAINS = [
  {
    id: 'domain_1',
    name: 'Domain 1: Instructional Design & Online Pedagogy',
    feap: 'FEAP 1 & 3: Instructional Design, Planning & Delivery',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    competencies: [
      '1.1 Aligns digital curriculum to state standards and rigor',
      '1.2 Designs interactive & accessible virtual learning pathways',
      '1.3 Differentiates instruction for diverse online student needs'
    ]
  },
  {
    id: 'domain_2',
    name: 'Domain 2: Student Progress & Data-Driven Instruction',
    feap: 'FEAP 4: Assessment & Intervention',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-500',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    competencies: [
      '2.1 Analyzes LMS engagement & assessment data for early intervention',
      '2.2 Provides timely, actionable, and qualitative feedback',
      '2.3 Tracks mastery growth and implements targeted academic support'
    ]
  },
  {
    id: 'domain_3',
    name: 'Domain 3: Virtual Learning Environment & Student Support',
    feap: 'FEAP 2: Learning Environment',
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    lightBg: 'bg-purple-50 dark:bg-purple-950/30',
    textColor: 'text-purple-600 dark:text-purple-400',
    competencies: [
      '3.1 Establishes active, safe, and collaborative online culture',
      '3.2 Maintains consistent, empathetic student and parent communication',
      '3.3 Promotes student agency and digital citizenship'
    ]
  },
  {
    id: 'domain_4',
    name: 'Domain 4: Continuous Improvement & Professional Leadership',
    feap: 'FEAP 5 & 6: Professional Learning & Responsibility',
    color: 'bg-amber-500',
    borderColor: 'border-amber-500',
    lightBg: 'bg-amber-50 dark:bg-amber-950/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    competencies: [
      '4.1 Integrates emerging ed-tech (e.g. AI tools) to optimize workflows',
      '4.2 Participates actively in non-routine PD and peer mentoring',
      '4.3 Contributes to departmental innovations and cross-functional projects'
    ]
  }
];

const INITIAL_DISCOVERED_ITEMS = [
  {
    id: 'asset_1',
    type: 'digital_asset',
    title: 'FLVS Q3 AI Integration Framework.pptx',
    source: 'OneDrive / Presentations',
    date: '2026-09-28',
    status: 'unreflected',
    prompt: 'I see you created a presentation on "AI Integration Framework". Tell me about the impact of giving this presentation to your team or department.',
    suggestedDomain: 'domain_4',
    competency: '4.1 Integrates emerging ed-tech (e.g. AI tools) to optimize workflows'
  },
  {
    id: 'event_1',
    type: 'calendar_event',
    title: 'Special PD: Advanced Canvas Accessibility & Mastery',
    source: 'Outlook Calendar',
    date: '2026-10-02',
    status: 'unreflected',
    prompt: 'I see you attended a non-routine PD meeting "Advanced Canvas Accessibility". What key strategies did you learn and how will you apply them?',
    suggestedDomain: 'domain_1',
    competency: '1.2 Designs interactive & accessible virtual learning pathways'
  },
  {
    id: 'event_2',
    type: 'calendar_event',
    title: 'Lessons Learned Retrospective: Student Engagement Sprint',
    source: 'Outlook Calendar',
    date: '2026-09-15',
    status: 'completed',
    userReflection: 'Participated in cross-grade review. Identified 3 communication bottlenecks in welcome calls. Created automated SMS reminder template for new enrollments.',
    impactMetric: 'Boosted 14-day student orientation completion by 12%',
    domain: 'domain_3',
    competency: '3.2 Maintains consistent, empathetic student and parent communication'
  }
];

const INITIAL_USER_GOALS = [
  {
    id: 'goal_1',
    title: 'Leverage AI tools for personalized student feedback and lesson enrichment',
    targetDomain: 'domain_4',
    status: 'In Progress',
    evidencedScore: 85,
    gapDescription: 'Great progress in tool creation! Need to document student feedback impact metrics.'
  },
  {
    id: 'goal_2',
    title: 'Increase Q1-Q2 course completion rates by 8% using early intervention data',
    targetDomain: 'domain_2',
    status: 'On Track',
    evidencedScore: 90,
    gapDescription: 'Strong data log presence. Ready for EoY evaluation packet.'
  },
  {
    id: 'goal_3',
    title: 'Lead 2 peer-learning webinars on Universal Design for Learning (UDL)',
    targetDomain: 'domain_1',
    status: 'Needs Evidence',
    evidencedScore: 30,
    gapDescription: 'No presentations or PD lead notes logged for UDL peer webinars yet.'
  }
];

const UPCOMING_LD_OFFERINGS = [
  {
    id: 'ld_1',
    title: 'FLVS L&D Workshop: AI Prompt Engineering for Course Designers',
    date: 'Oct 18, 2026',
    domain: 'domain_4',
    reason: 'Matches Goal: AI Tools Integration & Gap in domain 4 artifact evidence.'
  },
  {
    id: 'ld_2',
    title: 'UDL in Virtual Classrooms: Practical Facilitation Strategies',
    date: 'Nov 04, 2026',
    domain: 'domain_1',
    reason: 'Directly fulfills your unevidenced goal on UDL peer mentorship.'
  },
  {
    id: 'ld_3',
    title: 'Canvas Analytics Deep Dive: Predictive Early Warning Indicators',
    date: 'Nov 12, 2026',
    domain: 'domain_2',
    reason: 'Enhances student progress monitoring evidence portfolio.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('journal'); // journal | calendar | rubric | goals | summary
  const [apiKey, setApiKey] = useState('');
  const [userRole, setUserRole] = useState('Instructional Designer / Virtual Educator');
  
  // Artifacts / Notes / Portfolio Items
  const [artifacts, setArtifacts] = useState([
    {
      id: 'art_1',
      title: 'Interactive Math Sandbox Module',
      date: '2026-09-20',
      domainId: 'domain_1',
      competency: '1.2 Designs interactive & accessible virtual learning pathways',
      summary: 'Developed self-paced GeoGebra widgets embedded in Canvas to allow students to visualize quadratic equations.',
      impact: 'Decreased drop-off on Module 3 quiz by 18%. Positive feedback from 45 students.',
      type: 'Module / Design'
    },
    {
      id: 'art_2',
      title: 'Q1 At-Risk Student Data Dashboard',
      date: '2026-09-25',
      domainId: 'domain_2',
      competency: '2.1 Analyzes LMS engagement & assessment data for early intervention',
      summary: 'Created weekly automated report identifying students with zero logins for 5+ days.',
      impact: 'Facilitated immediate parent calls resulting in 32 students re-engaging within 48 hours.',
      type: 'Data Asset'
    }
  ]);

  // Discovered items from Calendar & Storage
  const [discoveredItems, setDiscoveredItems] = useState(INITIAL_DISCOVERED_ITEMS);
  const [selectedDiscovered, setSelectedDiscovered] = useState(null);
  const [reflectionText, setReflectionText] = useState('');
  const [impactText, setImpactText] = useState('');

  // Goals & L&D
  const [goals, setGoals] = useState(INITIAL_USER_GOALS);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [selectedGoalDomain, setSelectedGoalDomain] = useState('domain_1');

  // Conversational Journal State
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello! I am your **FLVS Personal Performance Guide & Evaluation Assistant**. 

I am here to help you record day-to-day achievements, align them with the **FLVS Educator Evaluation Rubric**, and build your End-of-Year evidence portfolio effortlessly.

How can I help you today? You can:
1. Speak or type a journal entry about a recent lesson, meeting, or wins.
2. Upload a draft/note.
3. Review auto-detected items from your calendar and document drives!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const callGeminiAPI = async (userPrompt, systemInstruction) => {
    // Uses gemini-3-flash-preview endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
    
    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return textResponse || null;
    } catch (err) {
      console.warn('Gemini API call warning/fallback:', err);
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setInputMessage('');
    
    const userMsgObj = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsgObj]);
    setIsProcessing(true);

    const systemPrompt = `You are an expert FLVS (Florida Virtual School) Educator Evaluation & Performance Coach.
    Your goal is to converse with the user, extract key achievements from their journal entry, and help them articulate measurable impact.
    
    Return a structured answer that includes:
    1. A warm, encouraging conversational response.
    2. Alignment with FLVS Rubric Domain (Domain 1, 2, 3, or 4) and FEAPs.
    3. Suggested impact statement for their End-of-Year portfolio.
    4. A follow-up question to probe for measurable outcomes (e.g. student completion %, engagement, peer feedback).`;

    const apiResult = await callGeminiAPI(userText, systemPrompt);

    let assistantText = apiResult;

    // Intelligent Fallback Logic if API Key is not set or network fails
    if (!assistantText) {
      // Heuristic parsing for fallback
      const lower = userText.toLowerCase();
      let matchedDomain = FLVS_RUBRIC_DOMAINS[3]; // Default to Domain 4
      if (lower.includes('data') || lower.includes('grade') || lower.includes('quiz') || lower.includes('student') || lower.includes('completion')) {
        matchedDomain = FLVS_RUBRIC_DOMAINS[1];
      } else if (lower.includes('canvas') || lower.includes('lesson') || lower.includes('curriculum') || lower.includes('design') || lower.includes('module')) {
        matchedDomain = FLVS_RUBRIC_DOMAINS[0];
      } else if (lower.includes('parent') || lower.includes('call') || lower.includes('engagement') || lower.includes('culture')) {
        matchedDomain = FLVS_RUBRIC_DOMAINS[2];
      }

      assistantText = `Great work logging this! I have analyzed your entry against the **FLVS Evaluation Rubric**.

📌 **Alignment Detected:**
- **Domain:** ${matchedDomain.name}
- **FEAP Alignment:** ${matchedDomain.feap}

💡 **Draft Portfolio Artifact:**
> "${userText}"

🎯 **Coach Probing Question for High-Impact Evidence:**
*What specific metric or feedback demonstrates the success of this initiative? (e.g. student pass rate increase, time saved, positive student/parent testimonials?)*`;

      // Auto-add artifact candidate
      const newArtifact = {
        id: `art_${Date.now()}`,
        title: userText.slice(0, 35) + '...',
        date: new Date().toISOString().split('T')[0],
        domainId: matchedDomain.id,
        competency: matchedDomain.competencies[0],
        summary: userText,
        impact: 'Pending user metric refinement',
        type: 'Journal Entry / Reflection'
      };
      setArtifacts(prev => [newArtifact, ...prev]);
    } else {
      // If API succeeded, create artifact too
      const newArtifact = {
        id: `art_${Date.now()}`,
        title: userText.slice(0, 35) + '...',
        date: new Date().toISOString().split('T')[0],
        domainId: 'domain_4',
        competency: '4.3 Contributes to departmental innovations and cross-functional projects',
        summary: userText,
        impact: 'Extracted via AI Journaling Coach',
        type: 'AI Journal Entry'
      };
      setArtifacts(prev => [newArtifact, ...prev]);
    }

    const assistantMsgObj = {
      id: `a_${Date.now()}`,
      sender: 'assistant',
      text: assistantText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, assistantMsgObj]);
    setIsProcessing(false);
  };

  const handleSaveReflection = (item) => {
    if (!reflectionText.trim()) return;

    // Update discovered items
    setDiscoveredItems(prev => prev.map(i => i.id === item.id ? {
      ...i,
      status: 'completed',
      userReflection: reflectionText,
      impactMetric: impactText || 'Qualitative positive impact logged'
    } : i));

    // Convert into permanent portfolio artifact
    const newArt = {
      id: `art_discovered_${Date.now()}`,
      title: item.title,
      date: item.date,
      domainId: item.suggestedDomain || 'domain_4',
      competency: item.competency || 'FLVS Professional Competency',
      summary: reflectionText,
      impact: impactText || 'Identified via Automated Calendar/Asset Discovery',
      type: item.type === 'digital_asset' ? 'Digital Asset / Presentation' : 'PD & Meeting Reflection'
    };

    setArtifacts(prev => [newArt, ...prev]);
    setSelectedDiscovered(null);
    setReflectionText('');
    setImpactText('');

    // Switch tab or notify
    alert('Reflection successfully converted into a high-impact FLVS Portfolio Artifact!');
  };

  const handleAddGoal = () => {
    if (!newGoalInput.trim()) return;
    const newG = {
      id: `goal_${Date.now()}`,
      title: newGoalInput,
      targetDomain: selectedGoalDomain,
      status: 'In Progress',
      evidencedScore: 40,
      gapDescription: 'Recently added goal. Needs supporting digital assets and journal reflections.'
    };
    setGoals(prev => [...prev, newG]);
    setNewGoalInput('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  FLVS Pulse AI
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  Performance Guide
                </span>
              </div>
              <p className="text-xs text-slate-400">Personal Evaluation & Competency Journal</p>
            </div>
          </div>

          {/* User Profile & Key Input */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden md:flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none w-52 text-xs"
                placeholder="Your Position / Role..."
              />
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none w-28 text-xs placeholder-slate-500"
                placeholder="Gemini API Key"
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-800/60">
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'journal' 
                ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Assistant & Journal</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap relative ${
              activeTab === 'calendar' 
                ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Asset & Calendar Discovery</span>
            {discoveredItems.filter(i => i.status === 'unreflected').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('rubric')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'rubric' 
                ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>FLVS Rubric Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'goals' 
                ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Goal Gap & L&D Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'summary' 
                ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>EoY Evaluation Brief</span>
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        
        {}
        {activeTab === 'journal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            {/* Left/Main Chat Column */}
            <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col h-[700px] overflow-hidden shadow-xl">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm text-slate-200">Interactive Reflection & Note Coach</h2>
                    <p className="text-xs text-slate-400">Auto-aligns entries with FLVS Educator Domains</p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                  Model: Gemini 3 Flash
                </div>
              </div>

              {/* Chat Scroll Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m) => (
                  <div 
                    key={m.id} 
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        m.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/10' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.text}</div>
                      <div className={`text-[10px] mt-2 text-right ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 rounded-bl-none text-slate-400 text-xs flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                      <span>Analyzing reflection against FLVS Rubric & drafting portfolio proof...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 border-t border-slate-800 bg-slate-900/40">
                <div className="flex items-center space-x-2">
                  <button 
                    title="Simulate Note Upload"
                    onClick={() => setInputMessage("Uploaded draft note: Completed Q1 Student Retrospective meeting. Implemented new Canvas module navigation based on student feedback.")}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Journal a victory, meeting takeaway, or project win..."
                    className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isProcessing}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium transition shadow-lg shadow-blue-600/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Tip: Mention measurable outcomes like completion rates, time saved, or student scores!</span>
                  <span>FLVS Evaluation Aligned</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Proactive Prompt & Recent Portfolio Additions */}
            <div className="space-y-6">
              {/* Proactive Discovery Highlight Card */}
              {discoveredItems.filter(i => i.status === 'unreflected').length > 0 && (
                <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs mb-2 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>Calendar & Asset Discovery Alert</span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-100 mb-1">
                    {discoveredItems.find(i => i.status === 'unreflected').title}
                  </h3>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    "{discoveredItems.find(i => i.status === 'unreflected').prompt}"
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedDiscovered(discoveredItems.find(i => i.status === 'unreflected'));
                      setActiveTab('calendar');
                    }}
                    className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-medium rounded-xl transition flex items-center justify-center space-x-2"
                  >
                    <span>Reflect & Convert to Artifact</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Portfolio Evidence Mini Summary */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm text-slate-200 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Recent Portfolio Assets</span>
                  </h3>
                  <span className="text-xs text-slate-400">{artifacts.length} total</span>
                </div>

                <div className="space-y-3">
                  {artifacts.slice(0, 3).map((art) => {
                    const dom = FLVS_RUBRIC_DOMAINS.find(d => d.id === art.domainId);
                    return (
                      <div key={art.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{art.title}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${dom?.lightBg || 'bg-slate-800'} ${dom?.textColor || 'text-slate-300'}`}>
                            {art.domainId.replace('domain_', 'Domain ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">{art.summary}</p>
                        <div className="text-[10px] text-emerald-400 font-medium flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="line-clamp-1">Impact: {art.impact}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setActiveTab('summary')}
                  className="w-full mt-4 text-center text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center space-x-1"
                >
                  <span>View Full Portfolio Briefing</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-blue-400 font-medium text-xs mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Proactive Artifact Discovery Engine</span>
                </div>
                <h2 className="text-xl font-bold text-slate-100">Scanned Digital Assets & Calendar Events</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Our system continuously analyzes your drive creations and calendar to find uncaptured professional contributions.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-right">
                <span className="text-2xl font-bold text-amber-400">
                  {discoveredItems.filter(i => i.status === 'unreflected').length}
                </span>
                <p className="text-xs text-slate-400">Pending Reflections</p>
              </div>
            </div>

            {/* Reflection Modal / Detail Box if selected */}
            {selectedDiscovered && (
              <div className="bg-slate-950 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">AI Proactive Prompt</span>
                      <h3 className="text-base font-bold text-slate-100">{selectedDiscovered.title}</h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDiscovered(null)}
                    className="text-slate-400 hover:text-slate-200 text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
                  >
                    Close
                  </button>
                </div>

                <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 mb-5 text-sm text-amber-200 leading-relaxed">
                  "{selectedDiscovered.prompt}"
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      1. Tell us what you did or learned:
                    </label>
                    <textarea 
                      rows={3}
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="e.g. Presented the 5 key pillars of AI course design to 20 instructional staff. Addressed accessibility and integrity concerns..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      2. What was the measurable impact or takeaway? (Optional but recommended):
                    </label>
                    <input 
                      type="text"
                      value={impactText}
                      onChange={(e) => setImpactText(e.target.value)}
                      placeholder="e.g. 15 teachers adopted the framework; course satisfaction increased by 10%"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-2">
                    <button 
                      onClick={() => setSelectedDiscovered(null)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-medium hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => handleSaveReflection(selectedDiscovered)}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Align & Save to Portfolio</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* List of Scanned Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discoveredItems.map((item) => {
                const isPending = item.status === 'unreflected';
                return (
                  <div 
                    key={item.id}
                    className={`bg-slate-950 border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition ${
                      isPending ? 'border-amber-500/30 bg-gradient-to-b from-slate-950 to-amber-950/10' : 'border-slate-800 opacity-90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                          {item.type === 'digital_asset' ? '📄 File Asset Created' : '📅 Calendar Meeting'}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.date}</span>
                        </span>
                      </div>

                      <h3 className="font-semibold text-sm text-slate-100 mb-1">{item.title}</h3>
                      <p className="text-xs text-slate-400 mb-3">Source: {item.source}</p>

                      {isPending ? (
                        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 text-xs text-amber-300/90 mb-4 leading-relaxed">
                          "{item.prompt}"
                        </div>
                      ) : (
                        <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 space-y-1 mb-4">
                          <div className="text-slate-400 font-medium">Logged Reflection:</div>
                          <p>{item.userReflection}</p>
                          <div className="text-emerald-400 font-medium pt-1">
                            Impact: {item.impactMetric}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {isPending ? (
                        <button 
                          onClick={() => {
                            setSelectedDiscovered(item);
                            setReflectionText('');
                            setImpactText('');
                          }}
                          className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-xl transition flex items-center justify-center space-x-2"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Respond & Map to Rubric</span>
                        </button>
                      ) : (
                        <div className="flex items-center text-xs text-emerald-400 space-x-1 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mapped to FLVS Competency & Saved</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {}
        {activeTab === 'rubric' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-slate-100">FLVS Educator Evaluation Rubric Alignment</h2>
              <p className="text-sm text-slate-400 mt-1">
                Explore competencies and view all your recorded artifacts mapped across Florida Virtual School domains.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FLVS_RUBRIC_DOMAINS.map((domain) => {
                const domainArtifacts = artifacts.filter(a => a.domainId === domain.id);
                return (
                  <div key={domain.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${domain.lightBg} ${domain.textColor}`}>
                          {domain.name}
                        </span>
                        <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                          {domainArtifacts.length} Evidence Items
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-4">{domain.feap}</p>

                      <div className="space-y-2 mb-5">
                        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Key Competencies:</h4>
                        <ul className="space-y-1.5">
                          {domain.competencies.map((c, i) => (
                            <li key={i} className="text-xs text-slate-400 flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Evidence List */}
                      <div className="border-t border-slate-800/80 pt-4">
                        <h4 className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
                          <span>Logged Artifacts:</span>
                          <span className="text-[10px] text-emerald-400 font-normal">
                            {domainArtifacts.length > 0 ? 'Evidence Present' : 'Gap Detected'}
                          </span>
                        </h4>

                        {domainArtifacts.length === 0 ? (
                          <div className="p-3 rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                            No artifacts logged for this domain yet. Journal a win or review calendar items!
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {domainArtifacts.map(art => (
                              <div key={art.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs">
                                <div className="font-medium text-slate-200">{art.title}</div>
                                <div className="text-slate-400 text-[11px] mt-0.5 line-clamp-1">{art.summary}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-indigo-400 font-medium text-xs mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Hyperpersonalized Performance Planning</span>
                </div>
                <h2 className="text-xl font-bold text-slate-100">Goal Gap Analysis & Recommended L&D</h2>
                <p className="text-sm text-slate-400 mt-1">
                  We compare your annual performance goals against logged portfolio proof to detect missing evidence and suggest next month's FLVS offerings.
                </p>
              </div>
            </div>

            {/* Goals List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Goals Column */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
                  <h3 className="font-bold text-sm text-slate-200 mb-4 flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>Active Professional Goals & Evidence Status</span>
                  </h3>

                  <div className="space-y-4">
                    {goals.map((g) => {
                      const dom = FLVS_RUBRIC_DOMAINS.find(d => d.id === g.targetDomain);
                      return (
                        <div key={g.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${dom?.lightBg} ${dom?.textColor}`}>
                                {dom?.name}
                              </span>
                              <h4 className="font-semibold text-sm text-slate-100 mt-1">{g.title}</h4>
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              g.evidencedScore >= 80 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}>
                              {g.evidencedScore}% Evidenced
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-3">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                g.evidencedScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                              }`} 
                              style={{ width: `${g.evidencedScore}%` }}
                            ></div>
                          </div>

                          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                            <span><strong>Gap Analysis:</strong> {g.gapDescription}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add New Goal input */}
                  <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                    <input 
                      type="text" 
                      value={newGoalInput}
                      onChange={(e) => setNewGoalInput(e.target.value)}
                      placeholder="Add a new FLVS performance goal..."
                      className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={selectedGoalDomain}
                      onChange={(e) => setSelectedGoalDomain(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    >
                      {FLVS_RUBRIC_DOMAINS.map(d => (
                        <option key={d.id} value={d.id}>{d.name.split(':')[0]}</option>
                      ))}
                    </select>
                    <button 
                      onClick={handleAddGoal}
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition shrink-0 flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Goal</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* L&D Recommendations Column */}
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs mb-3">
                    <Lightbulb className="w-4 h-4" />
                    <span>Recommended FLVS L&D Offerings</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Tailored workshops next month based on your goal gaps:
                  </p>

                  <div className="space-y-3">
                    {UPCOMING_LD_OFFERINGS.map((ld) => {
                      const dom = FLVS_RUBRIC_DOMAINS.find(d => d.id === ld.domain);
                      return (
                        <div key={ld.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span className="font-semibold text-blue-400">{ld.date}</span>
                            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{dom?.name.split(':')[0]}</span>
                          </div>
                          <h4 className="font-semibold text-xs text-slate-100">{ld.title}</h4>
                          <p className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                            <strong>Why:</strong> {ld.reason}
                          </p>
                          <button 
                            onClick={() => alert(`Registered for "${ld.title}"! Added to your Outlook calendar.`)}
                            className="w-full py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition"
                          >
                            1-Click Add to Outlook Calendar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'summary' && (
          <div className="space-y-6 max-w-4xl mx-auto w-full">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Ready for Admin Review</span>
                <h2 className="text-xl font-bold text-slate-100 mt-1">End-of-Year Evaluation Briefing Document</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Generated portfolio summary mapping your year-long impact against FLVS competencies.
                </p>
              </div>
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Briefing PDF</span>
              </button>
            </div>

            {/* Structured Printable Report Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-8 text-slate-200">
              {/* Header Info */}
              <div className="border-b border-slate-800 pb-6 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-white">FLVS Educator End-of-Year Evaluation Summary</h1>
                  <p className="text-sm text-slate-400 mt-1">Role: {userRole}</p>
                  <p className="text-xs text-slate-500">Evaluation Cycle: 2026 Academic Year</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Overall Self-Rating: Highly Effective
                  </span>
                </div>
              </div>

              {/* Portfolio Evidence by Domain */}
              {FLVS_RUBRIC_DOMAINS.map((dom) => {
                const domArts = artifacts.filter(a => a.domainId === dom.id);
                return (
                  <div key={dom.id} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h3 className="font-bold text-sm text-slate-100">{dom.name}</h3>
                      <span className="text-xs text-slate-400">{dom.feap}</span>
                    </div>

                    {domArts.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No artifacts logged in this domain.</p>
                    ) : (
                      <div className="space-y-3">
                        {domArts.map((art) => (
                          <div key={art.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-200">{art.title}</span>
                              <span className="text-slate-500 text-[10px]">{art.date}</span>
                            </div>
                            <p className="text-slate-300">{art.summary}</p>
                            <div className="text-emerald-400 font-medium pt-1">
                              <strong>Key Impact Metric:</strong> {art.impact}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Goals Summary */}
              <div className="border-t border-slate-800 pt-6">
                <h3 className="font-bold text-sm text-slate-100 mb-3">Annual Goals & Outcomes</h3>
                <div className="space-y-2">
                  {goals.map((g) => (
                    <div key={g.id} className="flex items-center justify-between bg-slate-900 p-3 rounded-lg text-xs">
                      <span className="text-slate-200">{g.title}</span>
                      <span className="text-emerald-400 font-medium">{g.evidencedScore}% Evidenced</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signatures Block */}
              <div className="border-t border-slate-800 pt-8 grid grid-cols-2 gap-8 text-xs text-slate-500">
                <div>
                  <div className="border-b border-slate-700 h-8 mb-1"></div>
                  <p>Educator Digital Signature & Date</p>
                </div>
                <div>
                  <div className="border-b border-slate-700 h-8 mb-1"></div>
                  <p>Evaluator / Lead Administrator Signature & Date</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}