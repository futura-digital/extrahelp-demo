"use client";

import React, { useState, useEffect } from "react";

// ─── Brand Tokens ──────────────────────────────────────────────────────────────
const C = {
  coral: "#e56859",
  coralDark: "#b05954",
  white: "#fcfcfc",
  charcoal: "#453c49",
  bg: "#0c0b0e",
  surface: "#13111a",
  surfaceHigh: "#1c1924",
  border: "#2a2433",
  borderHigh: "#3a3044",
  muted: "#7a6f85",
};

// ─── Reusable Primitives ───────────────────────────────────────────────────────

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-block text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full mb-5"
    style={{ color: C.coral, border: `1px solid ${C.coral}40`, background: `${C.coral}10` }}
  >
    {children}
  </span>
);

const SectionTitle = ({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="text-center mb-16">
    <Badge>{badge}</Badge>
    <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight" style={{ color: C.white }}>
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.muted }}>
        {subtitle}
      </p>
    )}
  </div>
);

const Card = ({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) => (
  <div
    className={`rounded-2xl p-6 transition-all duration-300 ${className}`}
    style={{
      background: C.surfaceHigh,
      border: `1px solid ${glow ? C.coral + "50" : C.border}`,
      boxShadow: glow ? `0 0 30px ${C.coral}18` : "none",
    }}
  >
    {children}
  </div>
);

const FlowArrow = () => (
  <div className="hidden md:flex items-center flex-shrink-0 px-1">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 5l7 7-7 7" stroke={C.coral} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const FlowStep = ({ icon, label, sub }: { icon: string; label: string; sub?: string }) => (
  <div className="flex flex-col items-center text-center gap-2 min-w-[80px] max-w-[96px]">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
      style={{
        background: `${C.coral}15`,
        border: `1px solid ${C.coral}40`,
        boxShadow: `0 0 16px ${C.coral}20`,
      }}
    >
      {icon}
    </div>
    <p className="text-xs font-semibold leading-tight" style={{ color: C.white }}>{label}</p>
    {sub && <p className="text-[10px] leading-tight" style={{ color: C.muted }}>{sub}</p>}
  </div>
);

const BeforeAfter = ({ before, after }: { before: string[]; after: string[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    <div className="rounded-2xl p-5" style={{ background: "#1a0e0e", border: "1px solid #5a1a1a" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#e57070" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        Before
      </p>
      <ul className="space-y-3">
        {before.map((item, i) => (
          <li key={i} className="text-sm flex items-start gap-2.5 leading-relaxed" style={{ color: "#c49090" }}>
            <span className="mt-0.5 text-red-500 flex-shrink-0">✕</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div
      className="rounded-2xl p-5"
      style={{
        background: `${C.coral}08`,
        border: `1px solid ${C.coral}40`,
        boxShadow: `0 0 24px ${C.coral}12`,
      }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: C.coral }}>
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: C.coral }} />
        After
      </p>
      <ul className="space-y-3">
        {after.map((item, i) => (
          <li key={i} className="text-sm flex items-start gap-2.5 leading-relaxed" style={{ color: C.white }}>
            <span className="mt-0.5 flex-shrink-0" style={{ color: C.coral }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StatPill = ({ value, label }: { value: string; label: string }) => (
  <div
    className="flex flex-col items-center rounded-2xl px-6 py-5"
    style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
  >
    <span className="text-3xl md:text-4xl font-black leading-none mb-2" style={{ color: C.coral }}>
      {value}
    </span>
    <span className="text-xs text-center leading-snug" style={{ color: C.muted }}>{label}</span>
  </div>
);

// ─── Nav ───────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Problems", href: "#problems" },
  { label: "Capabilities", href: "#powered-by" },
  { label: "Architecture", href: "#architecture" },
  { label: "AI Receptionist", href: "#ai-receptionist" },
  { label: "Smart Chat", href: "#smart-chat" },
  { label: "Forms", href: "#smart-forms" },
  { label: "Notifications", href: "#notifications" },
  { label: "Connected System", href: "#connected-system" },
  { label: "Deploy", href: "#deploy" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `${C.bg}f5` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: C.coral, color: C.white }}
          >
            F
          </div>
          <span className="font-bold text-sm hidden sm:block" style={{ color: C.white }}>
            Futura Digital
          </span>
        </div>

        <div className="hidden xl:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ color: C.muted }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.surfaceHigh;
                (e.currentTarget as HTMLElement).style.color = C.white;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = C.muted;
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#deploy"
          className="text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 flex-shrink-0"
          style={{ background: C.coral, color: C.white }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.coralDark; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.coral; }}
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

// ─── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden"
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${C.coral}12 0%, transparent 65%)` }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
      style={{ background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }}
    />

    <div className="relative z-10 max-w-4xl mx-auto">
      <div
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
        style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
      >
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.coral }} />
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.muted }}>
          Futura Digital — AI-Powered Growth Systems
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6" style={{ color: C.white }}>
        Convert More Enquiries
        <br />
        <span style={{ color: C.coral }}>Without Hiring More Staff.</span>
      </h1>

      <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: C.muted }}>
        Futura Digital builds AI-powered systems for calls, chat, forms, CRM,
        automation, and go-to-market — so every enquiry is captured, routed,
        followed up, and tracked without adding headcount.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {[
          { icon: "📞", label: "Phone Calls" },
          { icon: "💬", label: "Live Chat" },
          { icon: "📋", label: "Web Forms" },
          { icon: "📤", label: "Outreach" },
          { icon: "🗂️", label: "CRM & Reporting" },
        ].map((src) => (
          <div
            key={src.label}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
            style={{ background: C.surfaceHigh, border: `1px solid ${C.border}`, color: C.white }}
          >
            <span>{src.icon}</span>
            {src.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[
          { value: "24/7", label: "Call Coverage" },
          { value: "Instant", label: "Lead Logging" },
          { value: "Zero", label: "Manual CRM Entry" },
          { value: "More", label: "Opportunities Tracked" },
        ].map((s) => (
          <StatPill key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Where Enquiries Come From ────────────────────────────────────────────────

const WhereEnquiriesArrive = () => (
  <section id="overview" className="py-24 px-6" style={{ background: C.surface }}>
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="Enquiry Sources"
        title="Where Your Enquiries Come From"
        subtitle="Most service businesses receive demand across multiple channels simultaneously — but without the right infrastructure, opportunities are lost at every touchpoint."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            icon: "📞",
            title: "Phone Calls",
            desc: "The highest-intent channel. Prospects call because they are ready to act — but missed calls and poor follow-up routinely convert nothing.",
            stats: ["Highest intent", "Often out-of-hours", "Needs instant response"],
          },
          {
            icon: "💬",
            title: "Live Chat & Web Visitors",
            desc: "Website visitors want fast answers before committing to a call. Without a guided capture layer, most leave without a trace.",
            stats: ["High abandonment rate", "Anonymous without capture", "Converts 3× faster when answered"],
          },
          {
            icon: "📋",
            title: "Web Forms",
            desc: "Structured enquiries with rich data — service type, location, contact details. Valuable but typically left unactioned for hours.",
            stats: ["Rich structured data", "Often unattended", "No auto-routing in place"],
          },
          {
            icon: "📤",
            title: "Outreach & Follow-Up",
            desc: "LinkedIn, email campaigns, and re-engagement sequences that bring warm prospects back into the pipeline consistently.",
            stats: ["LinkedIn & email outreach", "Automated sequences", "Attributable pipeline growth"],
          },
        ].map((ch) => (
          <Card key={ch.title} glow>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
              style={{ background: `${C.coral}15`, border: `1px solid ${C.coral}30` }}
            >
              {ch.icon}
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: C.white }}>{ch.title}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>{ch.desc}</p>
            <ul className="space-y-2">
              {ch.stats.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.coral }} />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// ─── Problems ─────────────────────────────────────────────────────────────────

const Problems = () => (
  <section id="problems" className="py-24 px-6" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="The Problem"
        title="Where Revenue Leaks Without a System"
        subtitle="The majority of lost revenue in service businesses isn't a demand problem — it's an infrastructure problem. Enquiries arrive but are never captured, actioned, or tracked."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: "📧",
            title: "Leads Buried in Email",
            desc: "Enquiries land in shared inboxes and disappear. Staff triage manually — by the time anyone responds, the prospect has moved on.",
          },
          {
            icon: "📵",
            title: "Missed Calls After Hours",
            desc: "No coverage on evenings or weekends. Voicemails go unheard, callbacks never happen, and high-intent enquiries are lost for good.",
          },
          {
            icon: "⏳",
            title: "Slow Response Times",
            desc: "Prospects expect a reply within minutes. Hours-long delays signal disorganisation and push them directly to a competitor.",
          },
          {
            icon: "✍️",
            title: "Manual Admin and Duplicate Entry",
            desc: "The same data is entered across phone logs, email threads, and CRM — wasting hours every week and introducing errors at every step.",
          },
          {
            icon: "📉",
            title: "Poor Pipeline Visibility",
            desc: "Without a unified system, there is no clear view of enquiry volume, source, status, or conversion rate. Decisions are made blind.",
          },
          {
            icon: "🔁",
            title: "Low Conversion from Existing Demand",
            desc: "Most businesses are generating more demand than they convert. The gap is not more marketing — it is a faster, more structured follow-up process.",
          },
        ].map((p) => (
          <div
            key={p.title}
            className="rounded-2xl p-6 transition-all duration-300"
            style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
          >
            <div className="text-3xl mb-4">{p.icon}</div>
            <h3 className="font-bold text-base mb-2" style={{ color: C.white }}>{p.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Commercial Bridge ────────────────────────────────────────────────────────

const CommercialBridge = () => (
  <section className="py-16 px-6" style={{ background: C.surface }}>
    <div className="max-w-5xl mx-auto">
      <div
        className="rounded-2xl p-8 md:p-10 text-center"
        style={{
          background: `${C.coral}08`,
          border: `1px solid ${C.coral}30`,
          boxShadow: `0 0 40px ${C.coral}10`,
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-[0.18em] mb-4"
          style={{ color: C.coral }}
        >
          Core Promise
        </p>
        <h3
          className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight"
          style={{ color: C.white }}
        >
          Convert More Enquiries Without Hiring More Staff
        </h3>
        <p
          className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
          style={{ color: C.muted }}
        >
          Most businesses do not need more leads first. They need a better system
          to capture, qualify, route, and follow up with the demand they already have.
        </p>
      </div>
    </div>
  </section>
);

// ─── Powered By ───────────────────────────────────────────────────────────────

const PoweredBy = () => (
  <section id="powered-by" className="py-24 px-6" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="Capabilities"
        title="Powered by AI, Automation & Growth Systems"
        subtitle="Futura Digital combines multiple capability layers into one connected system — built around your business outcomes, not your tool stack."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {[
          {
            icon: "🤖",
            title: "AI Voice & Chat",
            outcome: "Never miss an enquiry",
            desc: "AI receptionist and guided chat capture that answers every inbound contact instantly — 24 hours a day, structured and ready to act on.",
          },
          {
            icon: "⚡",
            title: "Automation Workflows",
            outcome: "Zero manual admin",
            desc: "Every lead triggers an automated pipeline — CRM entry, confirmation, routing, follow-up — with no human intervention required.",
          },
          {
            icon: "🗂️",
            title: "CRM & Reporting",
            outcome: "Full pipeline visibility",
            desc: "A central system of record for every enquiry, with source tracking, status updates, and conversion reporting built in from day one.",
          },
          {
            icon: "🚀",
            title: "Go-To-Market Systems",
            outcome: "Consistent pipeline growth",
            desc: "Structured outbound systems — LinkedIn outreach, email campaigns, and lead generation sequences — that run alongside inbound capture.",
          },
          {
            icon: "📩",
            title: "Outbound Growth Systems",
            outcome: "Predictable pipeline growth",
            desc: "LinkedIn, email, and outbound lead generation systems that create conversations consistently and feed qualified opportunities directly into your pipeline.",
          },
          {
            icon: "🧠",
            title: "Content & Workflow Automation",
            outcome: "Faster execution",
            desc: "AI-assisted content creation, internal workflow support, reporting, and admin automation that reduce repetitive work across sales, service, and operations.",
          },
        ].map((cap) => (
          <Card key={cap.title} glow>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{ background: `${C.coral}15`, border: `1px solid ${C.coral}30` }}
            >
              {cap.icon}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: C.coral }}>
              {cap.outcome}
            </p>
            <h3 className="font-bold text-base mb-2" style={{ color: C.white }}>{cap.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{cap.desc}</p>
          </Card>
        ))}
      </div>

      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: `${C.coral}08`,
          border: `1px solid ${C.coral}30`,
          boxShadow: `0 0 40px ${C.coral}10`,
        }}
      >
        <p className="text-base font-semibold max-w-2xl mx-auto leading-relaxed" style={{ color: C.white }}>
          These are not separate tools bolted together. They are integrated capability layers, deployed as a single system, built around one goal —
          <span style={{ color: C.coral }}> more revenue from the demand you already have.</span>
        </p>
      </div>
    </div>
  </section>
);

// ─── System Architecture ───────────────────────────────────────────────────────

const SystemArchitecture = () => (
  <section id="architecture" className="py-24 px-6" style={{ background: C.surface }}>
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="System Architecture"
        title="How the System Works End to End"
        subtitle="Every enquiry channel feeds into a single AI and automation layer — structured, routed, and delivered to the right person with zero manual handling."
      />

      <Card>
        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-10 text-center" style={{ color: C.coral }}>
          ⚡ Universal Enquiry Flow
        </p>
        <div className="flex flex-wrap justify-center items-start gap-y-6 gap-x-1">
          <FlowStep icon="📞" label="Phone" sub="Inbound calls" />
          <FlowArrow />
          <FlowStep icon="💬" label="Chat" sub="Website visitors" />
          <FlowArrow />
          <FlowStep icon="📋" label="Forms" sub="Web enquiries" />
          <FlowArrow />
          <FlowStep icon="📤" label="Outreach" sub="LinkedIn / email" />
          <FlowArrow />
          <FlowStep icon="⚡" label="AI Layer" sub="Capture & enrich" />
          <FlowArrow />
          <FlowStep icon="🗂️" label="CRM" sub="Auto-logged" />
          <FlowArrow />
          <FlowStep icon="🔔" label="Team Alert" sub="Routed instantly" />
          <FlowArrow />
          <FlowStep icon="📊" label="Reporting" sub="Pipeline clarity" />
        </div>
        <p className="text-sm mt-10 max-w-2xl mx-auto text-center leading-relaxed" style={{ color: C.muted }}>
          The AI and automation layer sits between your enquiry channels and your team — capturing, enriching, and routing every contact before a human ever needs to touch it.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {[
          {
            label: "Capture Layer",
            desc: "AI receptionist, smart chat, and intelligent forms capture every enquiry at the source.",
            icon: "📥",
          },
          {
            label: "Automation Layer",
            desc: "Webhooks, enrichment, routing logic, and CRM entry happen automatically — no human required.",
            icon: "⚡",
          },
          {
            label: "Visibility Layer",
            desc: "Real-time dashboards, SLA tracking, and attribution reporting give leadership full clarity.",
            icon: "📊",
          },
        ].map((l) => (
          <div
            key={l.label}
            className="rounded-2xl p-5"
            style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
          >
            <div className="text-2xl mb-3">{l.icon}</div>
            <p className="font-bold text-sm mb-2" style={{ color: C.white }}>{l.label}</p>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{l.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── System Section Template ───────────────────────────────────────────────────

const SystemSection = ({
  id,
  number,
  icon,
  title,
  subtitle,
  workflow,
  before,
  after,
  detail,
  dark = false,
}: {
  id: string;
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  workflow: { icon: string; label: string; sub?: string }[];
  before: string[];
  after: string[];
  detail?: React.ReactNode;
  dark?: boolean;
}) => (
  <section id={id} className="py-24 px-6" style={{ background: dark ? C.bg : C.surface }}>
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 mt-1"
          style={{
            background: `${C.coral}15`,
            border: `1px solid ${C.coral}40`,
            boxShadow: `0 0 24px ${C.coral}20`,
          }}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] mb-1" style={{ color: C.coral }}>
            System {number}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight" style={{ color: C.white }}>
            {title}
          </h2>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-12 max-w-3xl" style={{ color: C.muted }}>
        {subtitle}
      </p>

      <Card className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-7" style={{ color: C.coral }}>
          ⚡ Automated Workflow
        </p>
        <div className="flex flex-wrap items-start gap-y-6 gap-x-1">
          {workflow.map((step, i) => (
            <React.Fragment key={i}>
              <FlowStep {...step} />
              {i < workflow.length - 1 && <FlowArrow />}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <BeforeAfter before={before} after={after} />
      {detail && <div className="mt-6">{detail}</div>}
    </div>
  </section>
);

// ─── One Connected System ──────────────────────────────────────────────────────

const ConnectedSystem = () => (
  <section id="connected-system" className="py-24 px-6" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="System 5"
        title="One Connected System"
        subtitle="A single source of truth for every enquiry — from every channel, across every team — automatically organised, attributed, and ready to action."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            icon: "📞",
            channel: "Phone Call",
            fields: ["Caller name & number", "AI call summary", "Service type discussed", "Timestamp & duration", "Territory / team routing"],
          },
          {
            icon: "💬",
            channel: "Live Chat",
            fields: ["Name & email address", "Full conversation transcript", "Service or product interest", "Location / postcode", "Lead score"],
          },
          {
            icon: "📋",
            channel: "Web Form",
            fields: ["All submitted form fields", "UTM / traffic source", "Service type required", "Territory & routing logic", "Urgency or priority level"],
          },
        ].map((c) => (
          <Card key={c.channel} glow>
            <div className="text-3xl mb-3">{c.icon}</div>
            <p className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: C.coral }}>
              {c.channel}
            </p>
            <ul className="space-y-2">
              {c.fields.map((f) => (
                <li key={f} className="text-sm flex items-center gap-2" style={{ color: C.muted }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.coral }} />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-6" style={{ color: C.coral }}>
          🗂 Auto-Generated CRM Record — Example
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Contact Name", value: "James Hartley" },
            { label: "Source", value: "📞 Phone Call" },
            { label: "Team / Region", value: "South West" },
            { label: "Status", value: "🟢 New Lead" },
            { label: "Service Interest", value: "Ongoing Support" },
            { label: "Postcode", value: "BS1 4DJ" },
            { label: "Record Created", value: "Auto — 31s ago" },
            { label: "Follow-up", value: "Scheduled ✓" },
          ].map((field) => (
            <div
              key={field.label}
              className="rounded-xl p-3"
              style={{ background: C.surface, border: `1px solid ${C.border}` }}
            >
              <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: C.muted }}>
                {field.label}
              </p>
              <p className="text-sm font-semibold" style={{ color: C.white }}>{field.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-sm max-w-3xl mx-auto text-center leading-relaxed mb-6" style={{ color: C.muted }}>
        This layer captures and organises every new enquiry. Where required, structured data synchronises with existing CRM platforms, operational tools, and reporting systems — reducing manual re-entry and keeping teams focused on conversion, not admin.
      </p>

      <BeforeAfter
        before={[
          "Enquiry data spread across email, spreadsheets, and handwritten notes",
          "No visibility of pipeline volume, source, or status",
          "Duplicate records created manually across multiple systems",
          "Follow-ups forgotten with no tracking or automated reminders",
        ]}
        after={[
          "Every enquiry auto-logged from all channels in real time",
          "Full pipeline dashboards with source attribution and status tracking",
          "Deduplication, tagging, and routing built in automatically",
          "Follow-up sequences triggered the moment a lead enters the system",
        ]}
      />
    </div>
  </section>
);

// ─── Deploy CTA ───────────────────────────────────────────────────────────────

const DeployCTA = () => (
  <section
    id="deploy"
    className="py-28 px-6 relative overflow-hidden"
    style={{ background: C.surface }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${C.coral}18 0%, transparent 70%)` }}
    />

    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <Badge>Start Small. Prove the ROI.</Badge>
      <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight" style={{ color: C.white }}>
        Deploy One Core System First.
        <br />
        <span style={{ color: C.coral }}>Expand Once Value Is Proven.</span>
      </h2>
      <p className="text-lg leading-relaxed mb-10" style={{ color: C.muted }}>
        Futura Digital recommends starting with the highest-friction point in your
        current enquiry process — whether that is missed calls, slow follow-up,
        fragmented enquiries, or poor pipeline visibility — and deploying a single
        focused system to fix it. Once results are clear, the rest follows.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: "🎯", label: "Identify the Bottleneck", sub: "Where are leads being lost?" },
          { icon: "⚡", label: "Deploy One System", sub: "Fast setup, measurable results" },
          { icon: "📈", label: "Expand With Confidence", sub: "Data-led rollout across channels" },
        ].map((f) => (
          <div
            key={f.label}
            className="rounded-2xl p-5 flex flex-col items-center gap-3"
            style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
          >
            <span className="text-3xl">{f.icon}</span>
            <p className="font-bold text-sm" style={{ color: C.white }}>{f.label}</p>
            <p className="text-xs" style={{ color: C.muted }}>{f.sub}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl p-6 mb-10 text-left"
        style={{ background: C.surfaceHigh, border: `1px solid ${C.border}` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: C.coral }}>
          📦 Typical Deployment Includes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "AI receptionist — 24/7 inbound call handling",
            "Smart chat widget with guided qualification",
            "Intelligent form with webhook-to-CRM integration",
            "Team notification system — SMS, email, mobile",
            "CRM setup, pipeline configuration, and tagging",
            "Performance reporting and attribution dashboard",
            "LinkedIn or email outreach setup (optional)",
            "60-day review with full conversion data",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.muted }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: C.coral }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-5 mb-10 text-left"
        style={{ background: `${C.coral}08`, border: `1px solid ${C.coral}30` }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: C.coral }}>
          🚀 Beyond Inbound — Growth Systems Available
        </p>
        <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
          Once inbound capture is running, Futura can layer in outbound growth — LinkedIn outreach campaigns, targeted email sequences, lead generation automation, and campaign attribution — turning your system into a full pipeline engine, not just a capture tool.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="mailto:hello@futuradigital.app"
          className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
          style={{ background: C.coral, color: C.white, boxShadow: `0 0 32px ${C.coral}40` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.coralDark; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = C.coral; }}
        >
          Book a Strategy Call →
        </a>
        <a
          href="#overview"
          className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
          style={{ background: "transparent", color: C.white, border: `1px solid ${C.border}` }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.coral + "60"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.border; }}
        >
          Review the System
        </a>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="py-10 px-6 text-center" style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
    <div className="flex items-center justify-center gap-2 mb-3">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
        style={{ background: C.coral, color: C.white }}
      >
        F
      </div>
      <span className="font-bold text-sm" style={{ color: C.white }}>Futura Digital</span>
      <span style={{ color: C.border }}>—</span>
      <span className="text-sm" style={{ color: C.muted }}>
        AI-Powered Enquiry & Growth Systems
      </span>
    </div>
    <p className="text-xs" style={{ color: C.charcoal }}>
      futuradigital.app · hello@futuradigital.app · Built for service businesses, agencies, and growing teams.
    </p>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Nav />
      <Hero />
      <WhereEnquiriesArrive />
      <Problems />
      <CommercialBridge />
      <PoweredBy />
      <SystemArchitecture />

      {/* System 1 — AI Receptionist */}
      <SystemSection
        id="ai-receptionist"
        number="1"
        icon="🤖"
        title="AI Receptionist"
        subtitle="A 24/7 voice AI that answers every inbound call, captures the caller's details and intent, and logs a structured record directly to your CRM — whether it is 9am on a Tuesday or midnight on a Sunday."
        dark
        workflow={[
          { icon: "📞", label: "Inbound Call", sub: "Any time" },
          { icon: "🤖", label: "AI Answers", sub: "Instant pickup" },
          { icon: "🗣️", label: "Collects Info", sub: "Name, need, location" },
          { icon: "📝", label: "Transcribes", sub: "AI summary" },
          { icon: "🗂️", label: "CRM Created", sub: "Auto-logged" },
          { icon: "🔔", label: "Team Alerted", sub: "SMS + email" },
        ]}
        before={[
          "Calls go to voicemail outside office hours — enquiry is lost",
          "Staff log call notes manually with inconsistent detail",
          "No visibility of call volume, source, or outcome",
          "High-intent prospects move on before a callback happens",
        ]}
        after={[
          "Every call answered instantly by AI, any time of day",
          "Caller name, contact, and intent captured automatically",
          "Structured CRM record created with full AI call summary",
          "Team notified within seconds via SMS and email",
        ]}
      />

      {/* System 2 — Smart Chat */}
      <SystemSection
        id="smart-chat"
        number="2"
        icon="💬"
        title="Smart Chat Capture"
        subtitle="A guided chat layer that works with your website visitors — and your existing team — to capture structured enquiry data, ask the right qualifying questions, and offer a clear path to a human whenever needed."
        workflow={[
          { icon: "🌐", label: "Visitor Lands", sub: "Website" },
          { icon: "💬", label: "Chat Starts", sub: "Guided prompts" },
          { icon: "📝", label: "Details Captured", sub: "Need + location" },
          { icon: "🙋", label: "Human Option", sub: "Agent available" },
          { icon: "🗂️", label: "Lead Logged", sub: "Structured record" },
          { icon: "🔔", label: "Team Notified", sub: "Routed instantly" },
        ]}
        before={[
          "Visitors leave the website without ever identifying themselves",
          "Chat goes unanswered — high-intent prospects abandon silently",
          "Key enquiry details are not captured in a consistent format",
          "Chat conversations are disconnected from CRM and follow-up",
        ]}
        after={[
          "Guided prompts collect key details before human involvement",
          "Visitors can escalate to a human agent at any point",
          "Structured enquiry data captured consistently from every session",
          "Conversation history feeds directly into CRM and pipeline tracking",
        ]}
      />

      {/* System 3 — Smart Forms */}
      <SystemSection
        id="smart-forms"
        number="3"
        icon="📋"
        title="Smart Enquiry Forms"
        subtitle="Intelligent forms that push structured data directly into your CRM the moment they are submitted — no shared inbox, no copy-pasting, no delay between enquiry and action."
        dark
        workflow={[
          { icon: "📋", label: "Form Submitted", sub: "Website" },
          { icon: "⚡", label: "Webhook Fires", sub: "Instantly" },
          { icon: "🧠", label: "AI Enriches", sub: "Location lookup" },
          { icon: "🗂️", label: "CRM Record", sub: "Auto-created" },
          { icon: "📧", label: "Confirmation", sub: "Sent to prospect" },
          { icon: "🔔", label: "Team Notified", sub: "Lead assigned" },
        ]}
        before={[
          "Form submissions land in a shared inbox and go unactioned",
          "Data manually re-entered into CRM — errors are common",
          "No confirmation sent to the prospect after submission",
          "Lead routing to the right person is done manually, if at all",
        ]}
        after={[
          "Submissions trigger an instant automated CRM workflow",
          "All form data pushed directly to CRM — zero manual entry",
          "Branded confirmation sent to the prospect in under 60 seconds",
          "Lead automatically routed to the correct team member or region",
        ]}
      />

      {/* System 4 — Notifications & Mobile Access */}
      <SystemSection
        id="notifications"
        number="4"
        icon="🔔"
        title="Notifications & Mobile Access"
        subtitle="Real-time alerts sent to the right person the moment a new enquiry arrives — with full lead context, on any device, within seconds of capture."
        workflow={[
          { icon: "📥", label: "Enquiry In", sub: "Any channel" },
          { icon: "🧠", label: "Auto-Routed", sub: "Team / region" },
          { icon: "📱", label: "SMS Sent", sub: "Mobile alert" },
          { icon: "📧", label: "Email Alert", sub: "Full details" },
          { icon: "🗂️", label: "CRM Updated", sub: "Lead visible" },
          { icon: "⏱️", label: "SLA Tracked", sub: "Response timer" },
        ]}
        before={[
          "Team notified by email only — frequently missed or delayed",
          "No urgency signalling or response time tracking per lead",
          "Hours pass before an enquiry is picked up and actioned",
          "Leadership has no visibility of response delays or dropped leads",
        ]}
        after={[
          "Instant SMS alert with full lead summary on any device",
          "SLA countdown begins from the moment the enquiry is captured",
          "Response times tracked and visible to management in real time",
          "Escalation triggered automatically if no action within threshold",
        ]}
      />

      <ConnectedSystem />
      <DeployCTA />
      <Footer />
    </main>
  );
}