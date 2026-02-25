import { Link, useLocation } from "wouter";
import { LayoutDashboard, Settings, Terminal, Shield, Cpu, LogOut, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { logout } from "@/lib/firebase";

interface CyberLayoutProps {
  children: React.ReactNode;
}

export function CyberLayout({ children }: CyberLayoutProps) {
  const [location] = useLocation();
  const { user } = useFirebaseAuth();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#020205] font-body selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020205]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-purple-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-2xl">
                <Bot className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-tight text-white uppercase leading-none">
                BOSS<span className="text-purple-500">BOT</span>
              </span>
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1.5">
                SYSTEM CORE 2.0
              </span>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className={`
                  relative px-5 py-2.5 rounded-xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest transition-all
                  ${isActive ? 'text-white bg-white/5' : 'text-white/40 hover:text-white hover:bg-white/[0.02]'}
                `}>
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 blur-[2px] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            
            {user && (
              <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/5">
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-[10px] font-bold text-white tracking-tight leading-none">{user.displayName}</span>
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">Authorized Node</span>
                </div>
                <button
                  onClick={() => logout()}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/30 transition-all"
                  title="Terminate Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 border-t border-white/5 bg-[#020205]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">CORE READY</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">MEM: 128GB</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">EST. 2026 BOSS UNIT PROTOCOL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
