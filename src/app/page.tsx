"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { 
  House, 
  CreditCard, 
  Clock, 
  User, 
  Bell, 
  Wallet, 
  ChevronRight, 
  ChartLine, 
  Headphones, 
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  CheckCircle2,
  X,
  Plus,
  Settings,
  Shield,
  LogOut,
  Zap,
  MoreVertical,
  Download,
  RefreshCw,
  Receipt,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// --- Types & Data ---

type Tab = "home" | "pay" | "history" | "profile";
type SubPage = "none" | "notifications" | "wallet" | "usage" | "analytics" | "transaction-details" | "pay-success" | "auto-pay" | "payment-methods";

interface Transaction {
  id: string;
  type: "payment" | "refund" | "deposit";
  amount: number;
  date: string;
  provider: string;
  status: "success" | "failed" | "pending";
  token?: string;
  method?: string;
  reference?: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "TX-92831", type: "payment", amount: 125.50, date: "Dec 28", provider: "City Power & Light", status: "success", token: "8291-0023-1192-8831", method: "Visa •••• 4242", reference: "REF-VOLT-001" },
  { id: "TX-92832", type: "payment", amount: 85.00, date: "Dec 15", provider: "Metro Grid", status: "success", token: "1122-3344-5566-7788", method: "Mastercard •••• 8888", reference: "REF-VOLT-002" },
  { id: "TX-92833", type: "payment", amount: 150.25, date: "Nov 28", provider: "Water Dept", status: "failed", method: "Visa •••• 4242", reference: "REF-VOLT-003" },
];

const USAGE_DATA = [
  { month: "Jan", units: 320, spent: 110 },
  { month: "Feb", units: 280, spent: 95 },
  { month: "Mar", units: 410, spent: 140 },
  { month: "Apr", units: 350, spent: 120 },
];

// --- Animation Configs ---

const TRANSITION = { duration: 0.5, ease: [0.32, 0.72, 0, 1] };
const STAGGER = { animate: { transition: { staggerChildren: 0.05 } } };

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

// --- Shared Components ---

function BottomNav({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (tab: Tab) => void }) {
  const tabs: { id: Tab; icon: any; label: string }[] = [
    { id: "home", icon: House, label: "Home" },
    { id: "pay", icon: CreditCard, label: "Pay" },
    { id: "history", icon: Clock, label: "History" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav h-[88px] flex items-center justify-center">
      <div className="flex w-full max-w-lg items-center justify-around px-6 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group relative flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl transition-all"
            >
              <div className="flex items-center justify-center">
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "text-[#0F172A]" : "text-[#64748B] group-hover:text-[#0F172A]"
                  )}
                />
              </div>
              <span 
                className={cn(
                  "text-[11px] font-medium transition-all duration-300",
                  isActive ? "text-[#0F172A]" : "text-[#64748B] group-hover:text-[#0F172A]"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="nav-dot"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0F172A]"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={TRANSITION}
      className={cn("flex min-h-screen w-full flex-col pb-32 max-w-lg mx-auto bg-header-gradient", className)}
    >
      <div className="relative z-10 flex flex-col w-full h-full px-5">
        {children}
      </div>
    </motion.div>
  );
}

// --- Screens ---

function HomeScreen({ setTab, setSubPage, setSelectedTransaction }: { 
  setTab: (t: Tab) => void; 
  setSubPage: (s: SubPage) => void;
  setSelectedTransaction: (t: Transaction) => void;
}) {
  return (
    <PageWrapper>
      <header className="flex items-center justify-between pt-12 mb-8">
        <div>
          <p className="text-[#64748B] text-sm font-medium">Good morning</p>
          <h1 className="text-2xl font-semibold text-[#0F172A] tracking-tight">Alex</h1>
        </div>
        <button 
          onClick={() => setSubPage("notifications")}
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft hover:bg-[#F1F5F9] transition-all active:scale-95"
        >
          <Bell size={20} strokeWidth={2} className="text-[#0F172A]" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-[#0F172A] border-2 border-white box-content" />
        </button>
      </header>

      <section className="space-y-6">
        <motion.div variants={slideUp}>
          <Card className="rounded-[2rem] p-6 shadow-float border-none bg-white">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F172A]/10 to-[#F1F5F9]/10 flex items-center justify-center">
                  <Zap size={24} className="text-[#0F172A]" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#0F172A] text-base leading-6">City Power & Light</h2>
                  <p className="text-sm text-[#64748B]">****-****-4829</p>
                </div>
              </div>
              <span className="text-[12px] font-medium text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-full">
                MTR-2847561
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm text-[#64748B]">Current Balance</span>
                  <span className="text-[12px] text-[#64748B]">Due Jan 15, 2026</span>
                </div>
                <p className="text-[1.875rem] font-semibold text-[#0F172A] tracking-tight leading-none">
                  $84.32
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#64748B]">Usage this cycle</span>
                  <span className="text-sm font-medium text-[#0F172A]">68%</span>
                </div>
                <div className="relative w-full overflow-hidden rounded-full h-2 bg-[#F1F5F9]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ ...TRANSITION, delay: 0.5 }}
                    className="h-full bg-[#0F172A]"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setTab("pay")}
              className="w-full mt-6 py-7 rounded-2xl bg-primary-gradient text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#0F172A]/20 transition-all active:scale-95 border-none"
            >
              Pay Now
              <ArrowUpRight size={18} />
            </Button>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} className="grid grid-cols-2 gap-4">
          <Card 
            className="rounded-2xl p-4 shadow-soft border-none bg-white cursor-pointer hover:shadow-float transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Receipt size={20} className="text-[#22C55E]" />
            </div>
            <p className="text-xs text-[#64748B] mb-1 font-medium">Last Payment</p>
            <p className="text-lg font-semibold text-[#0F172A] tracking-tight">$127.45</p>
            <p className="text-[12px] text-[#64748B] mt-1 font-medium">Dec 28, 2025</p>
          </Card>
          <Card 
            onClick={() => setSubPage("wallet")}
            className="rounded-2xl p-4 shadow-soft border-none bg-[#FEFBF6] cursor-pointer hover:shadow-float transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Wallet size={20} className="text-[#F59E0B]" />
            </div>
            <p className="text-xs text-[#64748B] mb-1 font-medium">Wallet Balance</p>
            <p className="text-lg font-semibold text-[#0F172A] tracking-tight">$250.00</p>
            <p className="text-[12px] text-[#64748B] mt-1 font-medium">Add funds</p>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} className="space-y-4">
          <h3 className="font-semibold text-[#0F172A] text-base">Quick Actions</h3>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
            {[
              { label: "Auto-pay", icon: RefreshCw, subPage: "auto-pay" },
              { label: "Usage Graph", icon: ChartLine, subPage: "usage" },
              { label: "Support", icon: Headphones, subPage: "none" },
              { label: "Analytics", icon: Zap, subPage: "analytics" },
            ].map((action, i) => (
              <button 
                key={i}
                onClick={() => action.subPage !== "none" && setSubPage(action.subPage as SubPage)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-soft border border-border/40 text-sm font-medium text-[#0F172A] whitespace-nowrap hover:bg-[#F1F5F9] transition-all active:scale-95"
              >
                <action.icon size={16} className="text-[#64748B]" />
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={slideUp} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[#0F172A] text-base">Recent Activity</h3>
            <button 
              onClick={() => setTab("history")}
              className="text-sm font-medium text-[#0F172A] flex items-center gap-1 hover:opacity-70 transition-opacity"
            >
              View all
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {TRANSACTIONS.map((tx, i) => (
              <Card 
                key={tx.id}
                onClick={() => {
                  setSelectedTransaction(tx);
                  setSubPage("transaction-details");
                }}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border-none shadow-soft cursor-pointer hover:shadow-float transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    tx.status === "success" ? "bg-[#22C55E]/10" : "bg-[#F1F5F9]"
                  )}>
                    {tx.status === "success" ? (
                      <ArrowUpRight size={18} className="text-[#22C55E] rotate-180" />
                    ) : (
                      <Receipt size={18} className="text-[#64748B]" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm leading-tight">{tx.status === "success" ? "Payment" : "Bill Generated"}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <p className={cn(
                  "font-semibold text-sm",
                  tx.status === "success" ? "text-[#0F172A]" : "text-[#64748B]"
                )}>
                  {tx.status === "success" ? `-$${tx.amount.toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}

function PayScreen({ setSubPage }: { setSubPage: (s: SubPage) => void }) {
  const [amount, setAmount] = React.useState("50");
  const [loading, setLoading] = React.useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubPage("pay-success");
    }, 2000);
  };

  return (
    <PageWrapper className="pt-20">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <p className="text-sm font-medium text-[#64748B]">Enter Amount</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-3xl font-semibold text-[#0F172A]">$</span>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-48 bg-transparent text-center text-6xl font-semibold text-[#0F172A] outline-none caret-[#0F172A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            autoFocus
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-[#0F172A] text-base">Payment Method</h3>
        <Card 
          onClick={() => setSubPage("payment-methods")}
          className="flex items-center justify-between p-5 rounded-2xl border-none shadow-soft bg-white cursor-pointer hover:bg-[#F8FAFC] transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
              <CreditCard size={20} className="text-[#0F172A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Visa •••• 4242</p>
              <p className="text-xs text-[#64748B]">Expires 09/26</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-[#64748B]" />
        </Card>
      </div>

      <div className="mt-12">
        <Button 
          onClick={handlePay}
          disabled={Number(amount) <= 0 || loading}
          className="w-full py-7 rounded-2xl bg-primary-gradient text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#0F172A]/20 transition-all active:scale-95 disabled:opacity-50 border-none"
        >
          {loading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RefreshCw size={24} />
            </motion.div>
          ) : `Pay Now`}
        </Button>
      </div>
    </PageWrapper>
  );
}

function HistoryScreen({ setSubPage, setSelectedTransaction }: { 
  setSubPage: (s: SubPage) => void;
  setSelectedTransaction: (t: Transaction) => void;
}) {
  return (
    <PageWrapper className="pt-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-[#0F172A] tracking-tight">Records</h1>
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-soft text-[#64748B] hover:bg-[#F1F5F9] transition-all">
          <Search size={20} strokeWidth={2} />
        </button>
      </div>
      
      <div className="space-y-8">
        {["Recent", "Last Month"].map((group, idx) => (
          <motion.div 
            key={group} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...TRANSITION, delay: idx * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-[#64748B]">{group}</h3>
            <div className="space-y-3">
              {TRANSACTIONS.map((tx) => (
                <Card 
                  key={tx.id}
                  onClick={() => {
                    setSelectedTransaction(tx);
                    setSubPage("transaction-details");
                  }}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border-none shadow-soft cursor-pointer hover:shadow-float transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      tx.status === "success" ? "bg-[#22C55E]/10" : "bg-[#F1F5F9]"
                    )}>
                      {tx.status === "success" ? (
                        <ArrowUpRight size={18} className="text-[#22C55E] rotate-180" />
                      ) : (
                        <Receipt size={18} className="text-[#64748B]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#0F172A] text-sm leading-tight">{tx.provider}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0F172A]">-${tx.amount.toFixed(2)}</p>
                    <p className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider mt-0.5",
                      tx.status === "success" ? "text-[#22C55E]" : "text-red-500"
                    )}>
                      {tx.status}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}

function ProfileScreen({ setSubPage }: { setSubPage: (s: SubPage) => void }) {
  return (
    <PageWrapper className="pt-12">
      <div className="pb-8 flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <div className="h-24 w-24 rounded-[2rem] bg-white shadow-float flex items-center justify-center text-2xl font-semibold text-[#0F172A] transition-transform duration-500 group-hover:scale-105">
            AR
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white border-4 border-white shadow-soft">
            <Plus size={14} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#0F172A]">Alex Rivera</h2>
          <p className="text-xs font-medium text-[#64748B]">alex.rivera@example.com</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#64748B]">Account</h3>
          {[
            { label: "Payment Methods", icon: CreditCard, subPage: "payment-methods" },
            { label: "Security Vault", icon: Shield, subPage: "none" },
            { label: "Settings", icon: Settings, subPage: "none" },
          ].map((item, i) => (
            <button 
              key={i}
              onClick={() => item.subPage !== "none" && setSubPage(item.subPage as SubPage)}
              className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-[#0F172A] shadow-soft hover:bg-[#F1F5F9] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#64748B]">
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-[#64748B]" />
            </button>
          ))}
        </div>

        <div className="space-y-3 pb-8">
          <h3 className="text-sm font-semibold text-[#64748B]">Session</h3>
          <button className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-red-500 shadow-soft hover:bg-red-50 transition-all active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                <LogOut size={20} />
              </div>
              <span className="text-sm font-semibold">Sign Out</span>
            </div>
            <ChevronRight size={18} className="text-red-200" />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

// --- Modals & Overlay Pages ---

function FullPageOverlay({ children, onClose, title }: { 
  children: React.ReactNode; 
  onClose: () => void; 
  title: string;
}) {
  return (
    <motion.div 
      initial={{ x: "100%" }} 
      animate={{ x: 0 }} 
      exit={{ x: "100%" }} 
      transition={TRANSITION}
      className="fixed inset-0 z-[60] bg-[#F8FAFC] flex flex-col"
    >
      <header className="flex items-center justify-between px-6 pt-12 pb-6 bg-white border-b border-border/40">
        <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full bg-[#F1F5F9] text-[#0F172A] hover:bg-white hover:shadow-soft transition-all">
          <ChevronRight className="rotate-180" size={20} />
        </button>
        <h1 className="text-base font-semibold text-[#0F172A]">{title}</h1>
        <div className="w-10" />
      </header>
      <div className="flex-1 overflow-y-auto px-5 py-8 hide-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}

function BottomSheetOverlay({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm flex flex-col justify-end"
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={TRANSITION}
        className="h-[90%] w-full bg-[#F8FAFC] rounded-t-[3rem] flex flex-col shadow-2xl overflow-hidden"
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border" />
        <header className="flex items-center justify-between px-8 pt-6 pb-4">
          <button onClick={onClose} className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-soft text-[#64748B] hover:text-[#0F172A] transition-all">
            <X size={20} />
          </button>
          <h1 className="text-base font-semibold text-[#0F172A]">{title}</h1>
          <div className="w-10" />
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function NotificationPage({ onClose }: { onClose: () => void }) {
  return (
    <FullPageOverlay title="Alerts" onClose={onClose}>
      <div className="space-y-4">
        {[
          { title: "Tokens Generated", body: "Recharge for Meter 829-100-221 was successful. Token: 8291-0023-1192-8831", time: "2h ago", type: "success" },
          { title: "Low Balance Warning", body: "Current meter units: 4.8. Smart-Pay is scheduled to trigger at 5.0.", time: "1d ago", type: "warning" },
          { title: "Security Update", body: "Biometric vault has been successfully updated with new encryption.", time: "3d ago", type: "info" },
          { title: "Payment Failed", body: "Your attempt to deposit $100 via Visa •••• 4242 was declined by bank.", time: "1w ago", type: "error" },
        ].map((n, i) => (
          <Card key={i} className="border-none bg-white p-5 shadow-soft rounded-2xl hover:shadow-float transition-all group">
            <div className="flex gap-4">
              <div className={cn(
                "mt-1 h-2.5 w-2.5 rounded-full shrink-0 border-2 border-white box-content",
                n.type === "success" ? "bg-[#22C55E]" : n.type === "warning" ? "bg-[#F59E0B]" : n.type === "error" ? "bg-red-500" : "bg-blue-500"
              )} />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-[#0F172A]">{n.title}</h4>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">{n.body}</p>
                <p className="text-[10px] font-semibold text-[#64748B] pt-1">{n.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </FullPageOverlay>
  );
}

function WalletPage({ onClose }: { onClose: () => void }) {
  return (
    <FullPageOverlay title="Vault" onClose={onClose}>
      <div className="text-center py-8 space-y-2">
        <p className="text-sm font-medium text-[#64748B]">Secure Balance</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl font-semibold text-[#0F172A]">$</span>
          <NumberFlow value={250.00} format={{ minimumFractionDigits: 2 }} className="text-5xl font-semibold text-[#0F172A] tracking-tight" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-8 mb-12">
        <Button className="py-7 rounded-2xl bg-[#0F172A] text-white font-semibold text-sm shadow-lg shadow-[#0F172A]/10 hover:bg-[#1E293B] active:scale-95 transition-all border-none">
          <Plus size={18} className="mr-2" />
          Deposit
        </Button>
        <Button variant="outline" className="py-7 rounded-2xl border-border bg-white text-[#0F172A] font-semibold text-sm hover:bg-[#F1F5F9] active:scale-95 transition-all">
          Withdraw
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-[#64748B]">History</h3>
        <div className="space-y-3">
          {[
            { label: "Deposit via Visa", amount: 100.00, date: "Mar 12, 2024", type: "deposit" },
            { label: "Automatic Refund", amount: 12.50, date: "Mar 08, 2024", type: "refund" },
          ].map((item, i) => (
            <Card key={i} className="flex items-center justify-between border-none bg-white p-4 shadow-soft rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
                  <ArrowDownLeft size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">{item.label}</p>
                  <p className="text-[10px] font-medium text-[#64748B]">{item.date}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#22C55E]">+${item.amount.toFixed(2)}</p>
            </Card>
          ))}
        </div>
      </div>
    </FullPageOverlay>
  );
}

function AnalyticsPage({ onClose, title }: { onClose: () => void, title: string }) {
  return (
    <BottomSheetOverlay title={title} onClose={onClose}>
      <div className="space-y-8">
        <Card className="border-none bg-white p-6 shadow-soft rounded-[2rem]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-medium text-[#64748B]">Current Period</p>
              <p className="text-2xl font-semibold text-[#0F172A]">410 Units</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-[#64748B]">Vs Last Month</p>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                <ArrowUpRight size={14} strokeWidth={3} />
                <p className="text-[10px] font-bold">12.5%</p>
              </div>
            </div>
          </div>
          
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={USAGE_DATA}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F172A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0F172A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="units" 
                  stroke="#0F172A" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsage)" 
                />
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "none", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  itemStyle={{ color: "#0F172A", fontWeight: "bold" }}
                  cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <div className="space-y-4 pb-8">
          <h3 className="text-sm font-semibold text-[#64748B]">Insights</h3>
          <div className="space-y-3">
            {[
              { title: "Peak Demand Shift", body: "High consumption detected between 7-10 PM. Moving heavy loads to 5-8 AM could save 15%.", icon: Zap },
              { title: "Efficiency Benchmark", body: "Your household is 8% more efficient than average this month.", icon: Shield },
            ].map((insight, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white shadow-soft border border-border/40 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-[#F1F5F9] text-[#0F172A]">
                    <insight.icon size={16} />
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">{insight.title}</p>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">{insight.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BottomSheetOverlay>
  );
}

function AutoPayPage({ onClose, setSubPage }: { onClose: () => void; setSubPage: (s: SubPage) => void }) {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(5.0);
  const [amount, setAmount] = React.useState(50.0);
  const [billingCycle, setBillingCycle] = React.useState<"1st" | "4th">("1st");
  const [source, setSource] = React.useState<"card" | "wallet">("card");

  return (
    <FullPageOverlay title="Auto Pay" onClose={onClose}>
      <div className="space-y-8 pb-10">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-[#64748B]">How it works</h3>
          <Card className="border-none bg-[#0F172A] p-5 rounded-2xl shadow-soft">
            <div className="flex gap-4">
              <div className="mt-1 h-2 w-2 rounded-full bg-[#22C55E] shrink-0" />
              <p className="text-xs text-white/80 leading-relaxed">
                Smart-Pay automatically top-ups your meter whenever the balance drops below your chosen threshold or on your selected billing cycle.
              </p>
            </div>
          </Card>
        </section>

        <div className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-soft">
          <div>
            <h3 className="text-base font-semibold text-[#0F172A]">Smart-Pay</h3>
            <p className="text-xs text-[#64748B] font-medium">Automatic replenishment</p>
          </div>
          <button 
            onClick={() => setIsEnabled(!isEnabled)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative flex items-center px-1",
              isEnabled ? "bg-[#0F172A]" : "bg-[#E2E8F0]"
            )}
          >
            <motion.div 
              animate={{ x: isEnabled ? 24 : 0 }}
              className="w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#64748B]">Billing Cycle</h3>
          <div className="flex gap-3">
            {[
              { id: "1st", label: "Every 1st" },
              { id: "4th", label: "Every 4th" },
            ].map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setBillingCycle(cycle.id as "1st" | "4th")}
                className={cn(
                  "flex-1 py-4 rounded-2xl text-sm font-semibold transition-all border-2",
                  billingCycle === cycle.id 
                    ? "bg-white border-[#0F172A] text-[#0F172A] shadow-soft" 
                    : "bg-white border-transparent text-[#64748B] hover:bg-[#F1F5F9]"
                )}
              >
                {cycle.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#64748B]">Settings</h3>
          
          <Card className="border-none bg-white p-6 shadow-soft rounded-[2rem] space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#0F172A]">Low Balance Threshold</span>
                <span className="text-sm font-bold text-[#0F172A]">{threshold} Units</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="0.5" 
                value={threshold} 
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#F1F5F9] rounded-lg appearance-none cursor-pointer accent-[#0F172A]"
              />
              <p className="text-[10px] text-[#64748B] font-medium">Auto-pay will trigger when your units drop below this level.</p>
            </div>

            <div className="pt-6 border-t border-border/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#0F172A]">Top-up Amount</span>
                <span className="text-sm font-bold text-[#0F172A]">${amount}</span>
              </div>
              <div className="flex gap-2">
                {[20, 50, 100].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className={cn(
                      "flex-1 py-3 rounded-xl text-xs font-semibold transition-all",
                      amount === val ? "bg-[#0F172A] text-white" : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                    )}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#64748B]">Source</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setSource("card")}
              className={cn(
                "flex w-full items-center justify-between p-5 rounded-2xl border-2 transition-all",
                source === "card" ? "bg-white border-[#0F172A] shadow-soft" : "bg-white border-transparent"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#0F172A]">
                  <CreditCard size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#0F172A]">Visa •••• 4242</p>
                  <p className="text-xs text-[#64748B]">Expires 09/26</p>
                </div>
              </div>
              {source === "card" && <CheckCircle2 size={18} className="text-[#0F172A]" />}
            </button>

            <button 
              onClick={() => setSource("wallet")}
              className={cn(
                "flex w-full items-center justify-between p-5 rounded-2xl border-2 transition-all",
                source === "wallet" ? "bg-white border-[#0F172A] shadow-soft" : "bg-white border-transparent"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#FEFBF6] flex items-center justify-center text-[#F59E0B]">
                  <Wallet size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#0F172A]">App Wallet</p>
                  <p className="text-xs text-[#64748B]">$250.00 Available</p>
                </div>
              </div>
              {source === "wallet" && <CheckCircle2 size={18} className="text-[#0F172A]" />}
            </button>

            <button 
              onClick={() => setSubPage("payment-methods")}
              className="flex w-full items-center justify-center p-5 rounded-2xl border-2 border-dashed border-border text-[#64748B] gap-2 hover:bg-[#F1F5F9] transition-all"
            >
              <Plus size={18} />
              <span className="text-sm font-semibold">Add Payment Method</span>
            </button>
          </div>
        </div>

        <Button 
          onClick={onClose}
          className="w-full py-7 rounded-2xl bg-[#0F172A] text-white font-semibold text-base hover:shadow-lg transition-all active:scale-95 border-none mt-4"
        >
          Save Changes
        </Button>
      </div>
    </FullPageOverlay>
  );
}

function PaymentMethodsPage({ onClose }: { onClose: () => void }) {
  return (
    <FullPageOverlay title="Methods" onClose={onClose}>
      <div className="space-y-4">
        <Card className="border-2 border-[#0F172A] bg-white p-5 flex items-center justify-between rounded-2xl shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#0F172A]">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Visa •••• 4242</p>
              <p className="text-[10px] font-bold uppercase text-[#22C55E]">Primary</p>
            </div>
          </div>
          <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#0F172A] text-white">
            <CheckCircle2 size={14} strokeWidth={3} />
          </div>
        </Card>
        
        <button className="w-full py-5 rounded-2xl border-2 border-dashed border-border bg-[#F1F5F9]/30 flex items-center justify-center text-[#64748B] gap-2 hover:bg-[#F1F5F9]/50 transition-colors group">
          <Plus size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">Add New Method</span>
        </button>
      </div>
    </FullPageOverlay>
  );
}

function TransactionDetails({ tx, onClose }: { tx: Transaction, onClose: () => void }) {
  return (
    <BottomSheetOverlay title="Receipt" onClose={onClose}>
      <div className="text-center py-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[#22C55E]/10 text-[#22C55E]">
          <CheckCircle2 size={40} strokeWidth={2} />
        </div>
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-2xl font-semibold text-[#64748B]">$</span>
          <p className="text-5xl font-semibold text-[#0F172A] tracking-tight">{tx.amount.toFixed(2)}</p>
        </div>
        <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wider">{tx.provider}</p>
      </div>

      <div className="space-y-6 pt-8 border-t border-border/40 mt-6">
        {[
          { label: "Reference", value: tx.id },
          { label: "Date", value: `${tx.date}, 2025` },
          { label: "Method", value: tx.method || "System Wallet" },
          { label: "Status", value: tx.status.toUpperCase(), success: tx.status === "success" },
        ].map((row, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#64748B]">{row.label}</span>
            <span className={cn(
              "text-sm font-semibold",
              row.success ? "text-[#22C55E]" : "text-[#0F172A]"
            )}>{row.value}</span>
          </div>
        ))}
        
        {tx.token && (
          <div className="p-6 rounded-[2rem] bg-white border border-[#0F172A]/5 shadow-soft mt-8 group">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-4">Utility Token</p>
            <div className="flex items-center justify-between gap-4">
              <code className="text-xl font-mono font-bold text-[#0F172A] tracking-wider">{tx.token}</code>
              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] transition-all">
                <Download size={18} />
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-8 pb-4">
          <Button variant="outline" className="flex-1 py-7 rounded-2xl border-border bg-white text-[#64748B] font-semibold hover:bg-[#F1F5F9]">Support</Button>
          <Button variant="outline" className="h-[56px] w-[56px] rounded-2xl border-border bg-white text-[#64748B] flex items-center justify-center hover:bg-[#F1F5F9]">
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>
    </BottomSheetOverlay>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-10 text-center">
      <div className="relative mb-10">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          transition={{ ...TRANSITION, delay: 0.2 }}
          className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[2.5rem] bg-[#0F172A] text-white shadow-2xl shadow-[#0F172A]/20"
        >
          <CheckCircle2 size={56} strokeWidth={1.5} />
        </motion.div>
      </div>
      <div className="space-y-3 mb-16">
        <h2 className="text-3xl font-semibold text-[#0F172A] tracking-tight">Payment Sent</h2>
        <p className="text-[#64748B] text-sm leading-relaxed max-w-[260px] font-medium mx-auto">Your balance has been updated. New tokens are available in your dashboard.</p>
      </div>
      <Button 
        onClick={onClose} 
        className="w-full py-7 rounded-[2rem] bg-[#0F172A] font-semibold text-lg hover:bg-[#1E293B] shadow-xl shadow-[#0F172A]/10 transition-all border-none"
      >
        Done
      </Button>
    </motion.div>
  );
}

// --- Main App ---

export default function VoltFlow() {
  const [activeTab, setActiveTab] = React.useState<Tab>("home");
  const [subPage, setSubPage] = React.useState<SubPage>("none");
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);

  return (
    <main className="relative min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden font-sans selection:bg-[#0F172A]/10">
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {activeTab === "home" && <HomeScreen key="h" setTab={setActiveTab} setSubPage={setSubPage} setSelectedTransaction={setSelectedTransaction} />}
          {activeTab === "pay" && <PayScreen key="p" setSubPage={setSubPage} />}
          {activeTab === "history" && <HistoryScreen key="hs" setSubPage={setSubPage} setSelectedTransaction={setSelectedTransaction} />}
          {activeTab === "profile" && <ProfileScreen key="pr" setSubPage={setSubPage} />}
        </AnimatePresence>
      </LayoutGroup>

      <AnimatePresence>
        {subPage === "notifications" && <NotificationPage key="n" onClose={() => setSubPage("none")} />}
        {subPage === "wallet" && <WalletPage key="w" onClose={() => setSubPage("none")} />}
        {subPage === "analytics" && <AnalyticsPage key="a" title="Analytics" onClose={() => setSubPage("none")} />}
        {subPage === "usage" && <AnalyticsPage key="u" title="Usage Graph" onClose={() => setSubPage("none")} />}
        {subPage === "auto-pay" && <AutoPayPage key="ap" onClose={() => setSubPage("none")} setSubPage={setSubPage} />}
        {subPage === "payment-methods" && <PaymentMethodsPage key="pm" onClose={() => setSubPage("none")} />}
        {subPage === "transaction-details" && selectedTransaction && <TransactionDetails key="td" tx={selectedTransaction} onClose={() => setSubPage("none")} />}
        {subPage === "pay-success" && <SuccessScreen key="ps" onClose={() => { setSubPage("none"); setActiveTab("home"); }} />}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={(t) => { setActiveTab(t); setSubPage("none"); }} />
    </main>
  );
}
