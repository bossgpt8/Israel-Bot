import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import { Wifi, WifiOff, RefreshCw, Smartphone, Hash, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StatusCardProps {
  status: "online" | "offline" | "starting" | "error";
  qr: string | null;
  pairingCode: string | null;
  uptime: number;
  linkedNumber?: string | null;
}

export function StatusCard({ status, qr, pairingCode, uptime, linkedNumber }: StatusCardProps) {
  const isOnline = status === "online";
  const isStarting = status === "starting";
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Pairing code copied to clipboard.",
      className: "bg-black border-accent text-accent font-mono",
    });
  };

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="relative p-10 bg-white/[0.01] overflow-hidden group">
      {/* Dynamic Glow Background */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 blur-[120px] rounded-full transition-colors duration-1000 ${
        isOnline ? 'bg-green-500/10' : status === 'error' ? 'bg-red-500/10' : 'bg-purple-500/10'
      }`} />

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border ${
                isOnline ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                status === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                'bg-purple-500/10 text-purple-400 border-purple-500/20'
              }`}>
                {status} protocol active
              </span>
            </div>
            <h2 className="text-5xl font-display font-bold tracking-tight text-white uppercase leading-none mb-4">
              CORE <span className="text-white/40">STATUS</span>
            </h2>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">
              Real-time monitoring of the WhatsApp automation node. Ensuring high-availability and secure data transmission.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-2">
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Session Uptime</p>
              <p className="text-3xl font-display font-bold text-white">{isOnline ? formatUptime(uptime) : "00:00"}</p>
            </div>
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-2">
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Network Integrity</p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500/30'}`} />
                <p className="text-xl font-display font-bold text-white uppercase tracking-tight">{isOnline ? 'Verified' : 'Unlinked'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[320px] flex-shrink-0">
          <div className="aspect-square w-full rounded-[2.5rem] bg-black/40 border border-white/10 relative flex items-center justify-center shadow-2xl overflow-hidden group/box">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
            
            <AnimatePresence mode="wait">
              {isOnline ? (
                <motion.div 
                  key="online"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-purple-500/20 blur-2xl rounded-full animate-pulse" />
                    <Smartphone className="w-24 h-24 text-white relative z-10" />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-black animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-display font-bold text-xs tracking-[0.2em] uppercase">Node Link Established</p>
                    {linkedNumber && <p className="text-white/40 font-mono text-xs tracking-widest">+{linkedNumber}</p>}
                  </div>
                </motion.div>
              ) : pairingCode ? (
                <motion.div
                  key="pairing"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-center w-full px-8 space-y-6"
                >
                  <div className="space-y-1">
                    <p className="text-white/30 font-bold text-[9px] uppercase tracking-[0.4em]">Secure Link Code</p>
                    <div 
                      onClick={() => copyToClipboard(pairingCode)}
                      className="group/code relative cursor-pointer"
                    >
                      <div className="absolute -inset-4 bg-purple-600/10 blur-xl opacity-0 group-hover/code:opacity-100 transition-opacity" />
                      <div className="relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-all">
                        <span className="text-4xl font-display font-bold text-white tracking-[0.2em] ml-3">{pairingCode}</span>
                        <Copy className="w-4 h-4 text-white/20 group-hover/code:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/20 font-medium leading-relaxed">Click to clone code to neural clipboard</p>
                </motion.div>
              ) : qr ? (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-4 rounded-3xl shadow-2xl"
                >
                  <QRCode value={qr} size={200} level="L" />
                </motion.div>
              ) : (
                <motion.div 
                  key="waiting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <div className="relative">
                    {isStarting ? (
                      <RefreshCw className="w-16 h-16 text-purple-500 animate-spin" />
                    ) : (
                      <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-white/10" />
                      </div>
                    )}
                  </div>
                  <p className="text-white/20 font-bold text-[9px] uppercase tracking-[0.4em]">
                    {isStarting ? "Initializing Kernel" : "Node Standby"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add CSS keyframes for scan effect if not already present
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scan {
      0% { top: 0%; }
      50% { top: 100%; }
      100% { top: 0%; }
    }
  `;
  document.head.appendChild(style);
}

