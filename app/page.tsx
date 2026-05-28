"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileJson,
  Gauge,
  Github,
  GitBranch,
  Layers3,
  Lock,
  Network,
  PackageCheck,
  Radio,
  RefreshCw,
  Server,
  ShieldCheck,
  TimerReset,
  Workflow,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

const stack = ["Next.js", "TypeScript", "Node.js", "NestJS", "Redis", "PostgreSQL", "MongoDB", "Docker", "Tailwind CSS"];

const flow = [
  { label: "User Checkout", icon: Boxes, stat: "cart: 4 SKUs" },
  { label: "Reservation Service", icon: Server, stat: "POST /reserve" },
  { label: "Redis Locking", icon: Lock, stat: "SET NX PX" },
  { label: "Reservation Queue", icon: GitBranch, stat: "TTL jobs" },
  { label: "Payment Simulation", icon: ShieldCheck, stat: "auth window" },
  { label: "Stock Confirmation", icon: CheckCircle2, stat: "commit order" },
  { label: "Inventory Update", icon: Database, stat: "atomic write" }
];

const highlights = [
  {
    title: "Redis Distributed Locking",
    copy: "Short-lived locks isolate checkout attempts per SKU so concurrent buyers cannot claim the same inventory unit.",
    icon: Lock
  },
  {
    title: "Reservation Expiry Management",
    copy: "TTL-backed reservations release automatically when payment windows close or checkout sessions are abandoned.",
    icon: TimerReset
  },
  {
    title: "Transaction Consistency",
    copy: "Order state, reserved stock, and final inventory writes move through an explicit transactional workflow.",
    icon: ShieldCheck
  },
  {
    title: "Concurrent Checkout Processing",
    copy: "Burst traffic is absorbed through queue-first reservation handling and deterministic conflict resolution.",
    icon: Network
  },
  {
    title: "Asynchronous Queue Handling",
    copy: "Workers process confirmation, cancellation, and release events without blocking the customer-facing API.",
    icon: Workflow
  },
  {
    title: "Atomic Inventory Operations",
    copy: "Stock decrement and release operations are guarded by atomic commands and optimized database queries.",
    icon: PackageCheck
  }
];

const metrics = [
  { label: "Concurrent Users Supported", value: 50000, suffix: "+", icon: Activity },
  { label: "Reservation Throughput", value: 12800, suffix: "/min", icon: Zap },
  { label: "Average API Response Time", value: 42, suffix: "ms", icon: Gauge },
  { label: "Checkout Consistency Accuracy", value: 99.99, suffix: "%", icon: ShieldCheck },
  { label: "Inventory Sync Reliability", value: 99.995, suffix: "%", icon: RefreshCw }
];

const logs = [
  "[reserve] lock acquired sku=FIN-204 qty=1 ttl=180000ms",
  "[queue] reservation queued id=res_8c21 worker=checkout-03",
  "[payment] authorization pending id=pay_sim_624 latency=37ms",
  "[stock] atomic decrement committed sku=FIN-204 remaining=1287",
  "[release] expired reservation restored sku=FIN-118 qty=2",
  "[db] order snapshot persisted consistency=serializable"
];

const workflowCards: Array<[string, string, LucideIcon]> = [
  ["Lock SKU", "Redis creates a short-lived claim before payment authorization.", Lock],
  ["Queue Event", "Reservation workers stage confirmation and expiry jobs.", GitBranch],
  ["Confirm Payment", "Successful payment promotes reserved inventory to committed order stock.", ShieldCheck],
  ["Release Stock", "Expired or failed payments release quantity back into available inventory.", RefreshCw]
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1700, bounce: 0 });
  const display = useTransform(springValue, (latest) => {
    if (value % 1 !== 0) return latest.toFixed(value > 100 ? 1 : 3).replace(/\.?0+$/, "");
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function InventoryReservationShowcase() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <section className="relative isolate px-5 py-8 sm:px-8 lg:px-12">
        <div className="grid-fade" />
        <div className="pulse-orbit left-[8%] top-[8rem]" />
        <div className="pulse-orbit right-[9%] top-[28rem] delay-700" />

        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid min-h-[88vh] items-center gap-8 lg:grid-cols-[1fr_0.92fr]"
          >
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-mint shadow-glow backdrop-blur">
                <Radio size={16} className="animate-pulse" />
                Production-grade backend case study
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                  Inventory Reservation Engine
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  A distributed fintech-inspired inventory locking system for high-volume e-commerce checkout, built to prevent overselling while payments are still in flight.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ActionButton icon={Github} label="GitHub" />
                <ActionButton icon={ExternalLink} label="Live Demo" variant="primary" />
                <ActionButton icon={Network} label="System Architecture" />
                <ActionButton icon={BookOpen} label="API Documentation" />
              </div>

              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <DashboardPreview />
          </motion.div>

          <ArchitectureFlow />
          <SimulationGrid />
          <TechnicalHighlights />
          <PerformanceMetrics />
        </div>
      </section>
    </main>
  );
}

function ActionButton({
  icon: Icon,
  label,
  variant = "secondary"
}: {
  icon: typeof Github;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      className={`group inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition duration-300 ${
        variant === "primary"
          ? "border-mint/40 bg-mint text-slate-950 shadow-glow hover:bg-white"
          : "border-white/10 bg-white/[0.05] text-white backdrop-blur hover:border-mint/40 hover:bg-white/[0.09]"
      }`}
    >
      <Icon size={17} />
      {label}
      <ArrowRight size={15} className="transition group-hover:translate-x-1" />
    </button>
  );
}

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15, duration: 0.7 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-cobalt backdrop-blur-xl"
    >
      <div className="glow-border" />
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Reservation control plane</p>
          <h2 className="text-xl font-semibold">Live Checkout Load</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1 text-sm text-mint">
          <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_14px_#47f5c8]" />
          Synced
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Reserved", "8,421", "active locks"],
          ["Queue", "312", "payment waits"],
          ["Released", "1,088", "TTL restores"]
        ].map(([label, value, caption]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-400">{caption}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 h-52 rounded-xl border border-white/10 bg-slate-950/60 p-4">
        <div className="flex h-full items-end gap-2">
          {[42, 65, 38, 78, 58, 90, 73, 96, 68, 86, 61, 92, 76, 88].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 16 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "mirror", delay: index * 0.06 }}
              className="min-w-0 flex-1 rounded-t-md bg-gradient-to-t from-cobalt via-mint to-amberline shadow-[0_0_18px_rgba(71,245,200,0.22)]"
            />
          ))}
        </div>
      </div>

      <TerminalLogs />
    </motion.div>
  );
}

function ArchitectureFlow() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur-xl lg:p-7"
    >
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-mint">Architecture Showcase</p>
          <h2 className="mt-2 text-3xl font-semibold">Checkout reservation pipeline</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Every step is isolated, timed, and recoverable so stock is never oversold during slow or failed payment paths.
        </p>
      </div>

      <div className="relative grid gap-3 lg:grid-cols-7">
        <motion.div
          className="absolute left-8 right-8 top-1/2 hidden h-px bg-gradient-to-r from-cobalt via-mint to-amberline lg:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        {flow.map(({ label, icon: Icon, stat }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="relative rounded-xl border border-white/10 bg-slate-950/70 p-4 transition duration-300 hover:-translate-y-1 hover:border-mint/40"
          >
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-mint/25 bg-mint/10 text-mint">
              <Icon size={21} />
            </div>
            <h3 className="text-sm font-semibold text-white">{label}</h3>
            <p className="mt-2 text-xs text-slate-400">{stat}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function SimulationGrid() {
  return (
    <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-mint">Realtime Inventory Simulation</p>
        <h2 className="mt-2 text-3xl font-semibold">Stock under contention</h2>
        <div className="mt-6 space-y-4">
          {[
            ["SKU-LEDGER-01", "reserved", 86, "14 buyers waiting"],
            ["SKU-VAULT-88", "locked", 64, "8 active payments"],
            ["SKU-SIGNAL-17", "released", 42, "TTL restored"],
            ["SKU-NODE-44", "confirmed", 91, "atomic decrement"]
          ].map(([sku, state, width, note]) => (
            <div key={sku} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{sku}</p>
                  <p className="text-sm text-slate-400">{note}</p>
                </div>
                <span className="rounded-full border border-mint/20 bg-mint/10 px-3 py-1 text-xs text-mint">{state}</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-cobalt via-mint to-amberline"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-4 sm:grid-cols-2"
      >
        {workflowCards.map(([title, copy, Icon]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cobalt/50">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-cobalt/15 text-cobalt">
              <Icon size={21} />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function TechnicalHighlights() {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-mint">Technical Highlights</p>
          <h2 className="mt-2 text-3xl font-semibold">Built for backend reliability</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {highlights.map(({ title, copy, icon: Icon }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:border-mint/35 hover:bg-white/[0.065]"
          >
            <Icon className="text-mint" size={24} />
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function PerformanceMetrics() {
  return (
    <section className="pb-10">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl lg:p-7">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-mint">Performance Metrics</p>
            <h2 className="mt-2 text-3xl font-semibold">Scale profile</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-400">
            Positioned as a production-grade backend engineering project for distributed systems, transaction management, and high-performance APIs.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map(({ label, value, suffix, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-slate-950/55 p-4">
              <Icon size={20} className="text-amberline" />
              <p className="mt-5 text-3xl font-semibold text-white">
                <Counter value={value} suffix={suffix} />
              </p>
              <p className="mt-2 text-sm leading-5 text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TerminalLogs() {
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-[#05070d] p-4 font-mono text-xs text-slate-300">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        <Code2 size={14} />
        checkout-worker.log
      </div>
      <div className="h-36 overflow-hidden">
        <motion.div animate={{ y: ["0%", "-50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="space-y-2">
          {[...logs, ...logs].map((line, index) => (
            <p key={`${line}-${index}`} className="flex gap-2">
              <span className="text-mint">{">"}</span>
              <span>{line}</span>
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
