import { useState } from "react";
import {
  loginWithGoogle,
  signUpWithEmail,
  loginWithEmail,
} from "@/lib/firebase";
import {
  Bot,
  Zap,
  Shield,
  Users,
  MessageCircle,
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        await signUpWithEmail(formData.email, formData.password, formData.name);
      } else {
        await loginWithEmail(formData.email, formData.password);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white overflow-hidden selection:bg-purple-500/30 font-body">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Animated Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-stretch">
        {/* Left Side: Branding & Info */}
        <div className="flex-1 p-8 lg:p-24 flex flex-col justify-between relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 group cursor-default"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">
                <Bot className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold tracking-tight text-white uppercase leading-none">
                BOSS<span className="text-purple-500">BOT</span>
              </span>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mt-1.5">
                AUTONOMOUS UNIT 2.0
              </span>
            </div>
          </motion.div>

          <div className="max-w-2xl py-20 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></span>
                </span>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">
                  NEXT-GEN AUTOMATION IS HERE
                </span>
              </div>

              <h1 className="text-7xl lg:text-[110px] font-display font-bold tracking-tight leading-[0.9] mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                MASTER THE <br />
                <span className="text-white">ECOSYSTEM</span>
              </h1>

              <p className="text-xl text-white/50 leading-relaxed mb-12 max-w-lg font-light">
                Architecting the future of WhatsApp communication with intelligent neural nodes and seamless automation.
              </p>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { icon: Zap, text: "Ultra-Low Latency", desc: "Instant execution" },
                  { icon: Shield, text: "Neural Encryption", desc: "Total security" },
                  { icon: MessageCircle, text: "Cognitive AI 2.0", desc: "Adaptive logic" },
                  { icon: Users, text: "Grid Management", desc: "Multi-node control" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4"
                  >
                    <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/90 mb-0.5 tracking-wide">{item.text}</p>
                      <p className="text-xs text-white/30 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden lg:flex items-center gap-6"
          >
            <div className="h-px w-12 bg-white/10" />
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
              EST. 2026 • BOSS UNIT PROTOCOL
            </p>
          </motion.div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="lg:w-[600px] p-4 lg:p-24 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-3xl border-l border-white/5" />
          
          <div className="w-full max-w-md space-y-12 relative z-20">
            <div className="space-y-3 text-center lg:text-left">
              <motion.h2 
                key={mode}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-display font-bold tracking-tight uppercase"
              >
                {mode === "login" ? "Authentication" : "Onboarding"}
              </motion.h2>
              <p className="text-white/40 text-lg font-light">
                {mode === "login"
                  ? "Initialize your secure session."
                  : "Register a new node in the network."}
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full group relative flex items-center justify-center gap-4 px-6 py-5 bg-white text-black font-bold rounded-2xl transition-all hover:bg-white/90 active:scale-[0.99] disabled:opacity-50 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-base tracking-tight">Continue with Google</span>
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.4em]">
                  <span className="bg-[#04040a] px-6 text-white/20">
                    Neural Link
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {mode === "signup" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="space-y-2"
                    >
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Node Identifier
                      </label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your designation"
                          className="bg-white/[0.03] border-white/10 h-14 pl-12 rounded-2xl focus:ring-purple-500/20 focus:border-purple-500/30 transition-all text-base"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                    System Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="node@network.com"
                      className="bg-white/[0.03] border-white/10 h-14 pl-12 rounded-2xl focus:ring-purple-500/20 focus:border-purple-500/30 transition-all text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                    Security Matrix
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-500 transition-colors" />
                    <Input
                      required
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Access Token"
                      className="bg-white/[0.03] border-white/10 h-14 pl-12 rounded-2xl focus:ring-purple-500/20 focus:border-purple-500/30 transition-all text-base"
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-500 font-medium text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  disabled={isLoading}
                  className="w-full group relative flex items-center justify-center gap-3 h-16 bg-purple-600 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-base tracking-tight">
                        {mode === "login" ? "INITIALIZE PROTOCOL" : "JOIN NETWORK"}
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="text-center">
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-sm font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                {mode === "login"
                  ? "Initialize New Node"
                  : "Return to Access Panel"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
