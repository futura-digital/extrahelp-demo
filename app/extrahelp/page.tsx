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
    style={{
      color: C.coral,
      border: `1px solid ${C.coral}40`,
      background: `${C.coral}10`,
    }}
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
    <h2
      className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight"
      style={{ color: C.white }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className="text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ color: C.muted }}
      >
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

const Divider = () => (
  <div
    className="w-full h-px my-2"
    style={{ background: `linear-gradient(to right, transparent, ${C.border}, transparent)` }}
  />
);

const FlowArrow = () => (
  <div className="hidden md:flex items-center flex-shrink-0 px-1">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 5l7 7-7 7"
        stroke={C.coral}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const FlowStep = ({
  icon,
  label,
  sub,
}: {
  icon: string;
  label: string;
  sub?: string;
}) => (
  <div className="flex flex-col items-center text-center gap-2 min-w-[80px] max-w-[96px]">
    <div
className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 animate-pulse"      style={{
        background: `${C.coral}15`,
        border: `1px solid ${C.coral}40`,
        boxShadow: `0 0 16px ${C.coral}20`,
      }}
    >
      {icon}
    </div>
    <p className="text-xs font-semibold leading-tight" style={{ color: C.white }}>
      {label}
    </p>
    {sub && (
      <p className="text-[10px] leading-tight" style={{ color: C.muted }}>
        {sub}
      </p>
    )}
  </div>
);

const BeforeAfter = ({
  before,
  after,
}: {
  before: string[];
  after: string[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    <div
      className="rounded-2xl p-5"
      style={{
        background: "#1a0e0e",
        border: "1px solid #5a1a1a",
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
        style={{ color: "#e57070" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        Before
      </p>
      <ul className="space-y-3">
        {before.map((item, i) => (
          <li
            key={i}
            className="text-sm flex items-start gap-2.5 leading-relaxed"
            style={{ color: "#c49090" }}
          >
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
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
        style={{ color: C.coral }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: C.coral }}
        />
        After
      </p>
      <ul className="space-y-3">
        {after.map((item, i) => (
          <li
            key={i}
            className="text-sm flex items-start gap-2.5 leading-relaxed"
            style={{ color: C.white }}
          >
            <span className="mt-0.5 flex-shrink-0" style={{ color: C.coral }}>
              ✓
            </span>
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
    style={{
      background: C.surfaceHigh,
      border: `1px solid ${C.border}`,
    }}
  >
    <span
      className="text-3xl md:text-4xl font-black leading-none mb-2"
      style={{ color: C.coral }}
    >
      {value}
    </span>
    <span className="text-xs text-center leading-snug" style={{ color: C.muted }}>
      {label}
    </span>
  </div>
);

// ─── Nav ───────────────────────────────────────────────────────────────────────

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Problems", href: "#problems" },
  { label: "AI Receptionist", href: "#ai-receptionist" },
  { label: "Smart Chat", href: "#smart-chat" },
  { label: "Forms", href: "#smart-forms" },
  { label: "Notifications", href: "#notifications" },
  { label: "Unified CRM", href: "#unified-crm" },
  { label: "Pilot", href: "#pilot" },
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
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: C.coral, color: C.white }}
          >
            F
          </div>
          <span
            className="font-bold text-sm hidden sm:block"
            style={{ color: C.white }}
          >
            Futura Digital
          </span>
          <span style={{ color: C.border }}>×</span>
          <span className="text-sm font-semibold hidden sm:block" style={{ color: C.muted }}>
            Extra Help UK
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 hover:text-white"
              style={{ color: C.muted }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = C.surfaceHigh;
                (e.target as HTMLElement).style.color = C.white;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.color = C.muted;
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#pilot"
          className="text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 flex-shrink-0"
          style={{
            background: C.coral,
            color: C.white,
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = C.coralDark;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = C.coral;
          }}
        >
          Start Pilot
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
    {/* Background effects */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${C.coral}12 0%, transparent 65%)`,
      }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
      style={{
        background: `linear-gradient(to right, transparent, ${C.border}, transparent)`,
      }}
    />

    <div className="relative z-10 max-w-4xl mx-auto">
      {/* Eyebrow */}
      <div
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
        style={{
          background: C.surfaceHigh,
          border: `1px solid ${C.border}`,
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: C.coral }}
        />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: C.muted }}
        >
          Futura Digital — Extra Help UK
        </span>
      </div>

      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6"
        style={{ color: C.white }}
      >
        Capture Every
        <br />
        <span style={{ color: C.coral }}>Care Enquiry.</span>
      </h1>

      <p
        className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
        style={{ color: C.muted }}
      >
        AI-powered capture across every channel — phone, chat, and forms —
        automatically logged, routed to the right branch, and ready to convert.
      </p>

      {/* Channel badges */}
      <div className="flex flex-wrap justify-center gap-3 mb-14">
        {[
          { icon: "📞", label: "Phone Calls" },
          { icon: "💬", label: "Live Chat" },
          { icon: "📋", label: "Web Forms" },
        ].map((src) => (
          <div
            key={src.label}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold"
            style={{
              background: C.surfaceHigh,
              border: `1px solid ${C.border}`,
              color: C.white,
            }}
          >
            <span>{src.icon}</span>
            {src.label}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[
          { value: "24/7", label: "Call Coverage" },
          { value: "Instant", label: "Lead Logging" },
          { value: "Zero", label: "Manual CRM Entry" },
          { value: "Reduced", label: "Manual Admin" },
        ].map((s) => (
          <StatPill key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </div>
  </section>
);

// ─── How Enquiries Arrive ──────────────────────────────────────────────────────

const HowEnquiriesArrive = () => (
  <section
    id="overview"
    className="py-24 px-6"
    style={{ background: C.surface }}
  >
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="Enquiry Sources"
        title="How Clients Reach Extra Help Today"
        subtitle="Every day, prospective clients reach out across three channels — each one requiring a reliable, fast response."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: "📞",
            title: "Phone Calls",
            desc: "The most common channel. Families call to discuss care needs for elderly relatives — often urgent, always personal.",
            stats: ["Highest intent channel", "Often out-of-hours", "Needs immediate response"],
          },
          {
            icon: "💬",
            title: "Live Chat",
            desc: "Website visitors often want reassurance before committing to a call. An intelligent chat layer can work alongside Melu’s live agents — asking guided questions, capturing key details, and always giving visitors the option to speak to a human when needed.",
            stats: ["Works alongside live agents", "Captures structured enquiry data", "Human handoff always available"],
          },
          {
            icon: "📋",
            title: "Web Forms",
            desc: "Structured enquiries submitted via the Extra Help website — service type, location, and contact details.",
            stats: ["Rich data included", "Often unattended for hours", "No auto-routing in place"],
          },
        ].map((ch) => (
          <Card key={ch.title} glow>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
              style={{ background: `${C.coral}15`, border: `1px solid ${C.coral}30` }}
            >
              {ch.icon}
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: C.white }}>
              {ch.title}
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.muted }}>
              {ch.desc}
            </p>
            <ul className="space-y-2">
              {ch.stats.map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: C.coral }}
                  />
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
        title="Where Enquiries Fall Through the Cracks"
        subtitle="Without automation, the current process loses leads at every stage — costing Extra Help branches real revenue."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            icon: "📧",
            title: "Enquiries Buried in Email",
            desc: "Form submissions land in a shared inbox. Staff triage manually — leads go cold before anyone responds.",
          },
          {
            icon: "✍️",
            title: "Manual CRM Data Entry",
            desc: "Every enquiry requires staff to copy and paste contact details into a CRM or spreadsheet — slow, error-prone, and demotivating.",
          },
          {
            icon: "⏳",
            title: "Slow Response Times",
            desc: "Families expect a reply within minutes. Hours-long delays mean prospects contact a competitor instead.",
          },
          {
            icon: "📵",
            title: "Missed Calls After Hours",
            desc: "No cover on evenings or weekends. Voicemails go unheard, callbacks never happen, and enquiries are lost permanently.",
          },
          {
            icon: "🗺️",
            title: "No Branch-Level Routing",
            desc: "Head office receives all enquiries. Matching them to the right franchise branch is a manual, error-prone process.",
          },
          {
            icon: "🔁",
            title: "Duplicated Admin Work",
            desc: "The same enquiry details are entered across phone logs, emails, and the CRM — wasting hours every week across the network.",
          },
        ].map((p) => (
          <div
            key={p.title}
            className="rounded-2xl p-6 transition-all duration-300"
            style={{
              background: C.surfaceHigh,
              border: `1px solid ${C.border}`,
            }}
          >
            <div className="text-3xl mb-4">{p.icon}</div>
            <h3 className="font-bold text-base mb-2" style={{ color: C.white }}>
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              {p.desc}
            </p>
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
  <section
    id={id}
    className="py-24 px-6"
    style={{ background: dark ? C.bg : C.surface }}
  >
    <div className="max-w-6xl mx-auto">
      {/* Header */}
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
          <p
            className="text-xs font-bold uppercase tracking-[0.15em] mb-1"
            style={{ color: C.coral }}
          >
            System {number}
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold leading-tight"
            style={{ color: C.white }}
          >
            {title}
          </h2>
        </div>
      </div>
      <p
        className="text-lg leading-relaxed mb-12 max-w-3xl"
        style={{ color: C.muted }}
      >
        {subtitle}
      </p>

      {/* Workflow */}
      <Card className="mb-5">
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-7"
          style={{ color: C.coral }}
        >
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

      {/* Before / After */}
      <BeforeAfter before={before} after={after} />

      {/* Optional detail */}
      {detail && <div className="mt-6">{detail}</div>}
    </div>
  </section>
);

// ─── System Architecture ─────────────────────────────
const SystemArchitecture = () => (
  <section className="py-24 px-6" style={{ background: C.surface }}>
    <div className="max-w-6xl mx-auto text-center">

      <SectionTitle
        badge="System Overview"
        title="How The Enquiry System Works"
        subtitle="A simple architecture that captures enquiries from every channel and routes them to the correct Extra Help branch."
      />

      <div className="flex flex-wrap justify-center items-center gap-4">

        <FlowStep icon="📞" label="Phone" sub="Inbound calls" />
        <FlowArrow />

        <FlowStep icon="💬" label="Chat" sub="Website visitors" />
        <FlowArrow />

        <FlowStep icon="📋" label="Forms" sub="Web enquiries" />
        <FlowArrow />

        <FlowStep icon="⚡" label="Capture" sub="Automation layer" />
        <FlowArrow />

        <FlowStep icon="🧠" label="System" sub="Lead management" />
        <FlowArrow />

        <FlowStep icon="🏡" label="Branch" sub="Franchise owner" />
        <FlowArrow />

        <FlowStep icon="🗂️" label="Birdie" sub="Care operations" />

      </div>

      <p
        className="text-sm mt-10 max-w-3xl mx-auto text-center"
        style={{ color: C.muted }}
      >
        This layer focuses on capturing and organising new enquiries before they reach operational systems such as Birdie.
      </p>

    </div>
  </section>
);


// ─── Unified CRM ──────────────────────────────────────────────────────────────

const UnifiedCRM = () => (
  <section id="unified-crm" className="py-24 px-6" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        badge="System 5"
        title="One Unified System"
        subtitle="A single source of truth for every enquiry — from every channel, across every branch — automatically organised and ready to action. Designed to reduce manual retyping between enquiry capture and Birdie-based operational workflows."
      />

      {/* Channel → CRM cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            icon: "📞",
            channel: "Phone Call",
            fields: ["Caller name & number", "AI call summary", "Service type discussed", "Timestamp & duration", "Branch (by area code)"],
          },
          {
            icon: "💬",
            channel: "Live Chat",
            fields: ["Name & email address", "Full chat transcript", "Service interest", "Location / postcode", "Lead score"],
          },
          {
            icon: "📋",
            channel: "Web Form",
            fields: ["All form fields", "UTM / traffic source", "Service type required", "Postcode & territory", "Urgency level"],
          },
        ].map((c) => (
          <Card key={c.channel} glow>
            <div className="text-3xl mb-3">{c.icon}</div>
            <p
              className="font-bold text-sm uppercase tracking-wide mb-4"
              style={{ color: C.coral }}
            >
              {c.channel}
            </p>
            <ul className="space-y-2">
              {c.fields.map((f) => (
                <li
                  key={f}
                  className="text-sm flex items-center gap-2"
                  style={{ color: C.muted }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: C.coral }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

<p
  className="text-sm mb-8 max-w-3xl mx-auto text-center leading-relaxed"
  style={{ color: C.muted }}
>
  This layer focuses on capturing and organising new enquiries. Where required, structured data can be synchronised with operational systems such as Birdie CRM to reduce manual entry and keep care teams focused on clients rather than admin.
</p>
      <Card>
        <p
          className="text-xs font-bold uppercase tracking-[0.12em] mb-6"
          style={{ color: C.coral }}
        >
          🗂 Auto-Generated CRM Record — Example
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Contact Name", value: "Margaret Wilson" },
            { label: "Source", value: "📞 Phone Call" },
            { label: "Branch", value: "Bristol North" },
            { label: "Status", value: "🟢 New Lead" },
            { label: "Service Needed", value: "Elderly Home Help" },
            { label: "Postcode", value: "BS9 1AA" },
            { label: "Record Created", value: "Auto — 47s ago" },
            { label: "Follow-up", value: "Scheduled ✓" },
          ].map((field) => (
            <div
              key={field.label}
              className="rounded-xl p-3"
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              <p className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: C.muted }}>
                {field.label}
              </p>
              <p className="text-sm font-semibold" style={{ color: C.white }}>
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <BeforeAfter
        before={[
          "Enquiry data spread across email, spreadsheets, and handwritten notes",
          "No visibility of enquiry volume or status per branch",
          "Duplicate records entered manually by multiple staff",
          "Follow-ups forgotten with no tracking or reminders",
        ]}
        after={[
          "Every enquiry auto-logged from all channels in real time",
          "Branch-level dashboards visible to head office at all times",
          "Deduplication and source tagging built in automatically",
          "Follow-up sequences triggered the moment a lead arrives",
        ]}
      />
    </div>
  </section>
);

// ─── Pilot CTA ────────────────────────────────────────────────────────────────

const PilotCTA = () => (
  <section
    id="pilot"
    className="py-28 px-6 relative overflow-hidden"
    style={{ background: C.surface }}
  >
    {/* Glow */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${C.coral}18 0%, transparent 70%)`,
      }}
    />

    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <Badge>One Branch Pilot</Badge>
      <h2
        className="text-3xl md:text-5xl font-black mb-6 leading-tight"
        style={{ color: C.white }}
      >
        Start With One Branch.
        <br />
        <span style={{ color: C.coral }}>Prove the Results.</span>
      </h2>
      <p className="text-lg leading-relaxed mb-10" style={{ color: C.muted }}>
        We propose deploying the full system into a single Extra Help franchise
        branch as a 60-day pilot — measuring enquiry capture rate, response
        time, and admin hours saved. No risk, full visibility.
      </p>

      {/* Pilot features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {[
          { icon: "🤖", label: "AI Receptionist", sub: "Live on day one" },
          { icon: "💬", label: "Smart Chat", sub: "Installed same week" },
          { icon: "🗂️", label: "CRM Integration", sub: "Full pipeline visibility" },
        ].map((f) => (
          <div
            key={f.label}
            className="rounded-2xl p-5 flex flex-col items-center gap-3"
            style={{
              background: C.surfaceHigh,
              border: `1px solid ${C.border}`,
            }}
          >
            <span className="text-3xl">{f.icon}</span>
            <p className="font-bold text-sm" style={{ color: C.white }}>
              {f.label}
            </p>
            <p className="text-xs" style={{ color: C.muted }}>
              {f.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Deliverables */}
      <div
        className="rounded-2xl p-6 mb-10 text-left"
        style={{
          background: C.surfaceHigh,
          border: `1px solid ${C.border}`,
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-5"
          style={{ color: C.coral }}
        >
          📦 Pilot Includes
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "AI receptionist — 24/7 call handling",
            "Live chat widget with AI qualification",
            "Smart form with webhook-to-CRM integration",
            "Branch notification system (SMS + email)",
            "Central CRM setup and configuration",
            "60-day performance report with full data",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.muted }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: C.coral }}>
                ✓
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="mailto:hello@futuradigital.app"
          className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: C.coral,
            color: C.white,
            boxShadow: `0 0 32px ${C.coral}40`,
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = C.coralDark;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = C.coral;
          }}
        >
          Book a Demo Call →
        </a>
        <a
          href="#overview"
          className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-200"
          style={{
            background: "transparent",
            color: C.white,
            border: `1px solid ${C.border}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = C.coral + "60";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = C.border;
          }}
        >
          Review the System
        </a>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer
    className="py-10 px-6 text-center"
    style={{
      background: C.bg,
      borderTop: `1px solid ${C.border}`,
    }}
  >
    <div className="flex items-center justify-center gap-2 mb-3">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
        style={{ background: C.coral, color: C.white }}
      >
        F
      </div>
      <span className="font-bold text-sm" style={{ color: C.white }}>
        Futura Digital
      </span>
      <span style={{ color: C.border }}>—</span>
      <span className="text-sm" style={{ color: C.muted }}>
        Extra Help UK
      </span>
    </div>
    <p className="text-xs" style={{ color: C.charcoal }}>
      This is a system demonstration deck. All workflows use live AI and
      automation integrations.
    </p>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main style={{ background: C.bg, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <Nav />
      <Hero />
      <HowEnquiriesArrive />
      <Problems />
      <SystemArchitecture />

      {/* System 1 — AI Receptionist */}
      <SystemSection
        id="ai-receptionist"
        number="1"
        icon="🤖"
        title="AI Receptionist"
        subtitle="A 24/7 voice AI that answers every inbound call, captures the caller's details and intent, and logs a structured record to the CRM — even at 2am on a Sunday."
        dark
        workflow={[
          { icon: "📞", label: "Inbound Call", sub: "Any time" },
          { icon: "🤖", label: "AI Answers", sub: "Instant pickup" },
          { icon: "🗣️", label: "Collects Info", sub: "Name, need, area" },
          { icon: "📝", label: "Transcribes", sub: "AI summary" },
          { icon: "🗂️", label: "CRM Created", sub: "Auto-logged" },
          { icon: "🔔", label: "Branch Alerted", sub: "SMS + email" },
        ]}
        before={[
          "Calls go to voicemail out of office hours",
          "Callers rarely leave messages — enquiry is lost",
          "Staff manually log call notes with inconsistent detail",
          "No visibility of call volume or outcome by branch",
        ]}
        after={[
          "Every call answered instantly by AI, any time of day",
          "Caller name, number, and care need captured automatically",
          "Structured CRM record created with full AI transcript",
          "Branch notified within seconds via SMS and email",
        ]}
      />

      {/* System 2 — Smart Chat */}
      <SystemSection
        id="smart-chat"
        number="2"
        icon="💬"
        title="Smart Chat Capture"
        subtitle="A guided chat layer that works alongside Extra Help’s existing live chat support — capturing structured enquiry data, asking the right initial questions, and offering a clear handoff to a human agent whenever needed."
        workflow={[
          { icon: "🌐", label: "Visitor Lands", sub: "Website" },
  { icon: "💬", label: "Chat Starts", sub: "Guided prompts" },
  { icon: "📝", label: "Details Captured", sub: "Need + location" },
  { icon: "🙋", label: "Human Option", sub: "Agent available" },
  { icon: "📍", label: "Branch Matched", sub: "By postcode" },
  { icon: "🗂️", label: "Lead Logged", sub: "Structured record" },
        ]}
        before={[
          "Visitors sometimes leave the website before an agent replies",
  "Key enquiry details are not always captured in a structured way",
  "Handover between chat and branch follow-up can be manual",
  "Chat conversations are not consistently linked to lead tracking",
        ]}
        after={[
          "Guided prompts collect key details before follow-up",
  "Visitors can request human support at any time",
  "Structured enquiry data is captured consistently",
  "Conversation history can feed directly into lead tracking",
        ]}
      />

      {/* System 3 — Smart Forms */}
      <SystemSection
        id="smart-forms"
        number="3"
        icon="📋"
        title="Smart Enquiry Forms"
        subtitle="Intelligent web forms that push structured data directly into the CRM the moment they are submitted — no email, no copy-pasting, no delay."
        dark
        workflow={[
          { icon: "📋", label: "Form Submitted", sub: "Website" },
          { icon: "⚡", label: "Webhook Fires", sub: "Instantly" },
          { icon: "🧠", label: "AI Enriches", sub: "Postcode lookup" },
          { icon: "🗂️", label: "CRM Record", sub: "Auto-created" },
          { icon: "📧", label: "Confirmation", sub: "Sent to client" },
          { icon: "🔔", label: "Branch Notified", sub: "Lead assigned" },
        ]}
        before={[
          "Form submissions sent to a shared email inbox — often missed",
          "Data manually copied into CRM — errors are common",
          "No instant confirmation sent to the prospective client",
          "Branch assignment completed manually by head office staff",
        ]}
        after={[
          "Submissions trigger an instant automated CRM workflow",
          "All form data pushed directly to CRM — zero manual entry",
          "Branded confirmation email sent to the client in under 60 seconds",
          "Lead auto-assigned to the nearest branch by postcode",
        ]}
      />

      {/* System 4 — Branch Notifications */}
      <SystemSection
        id="notifications"
        number="4"
        icon="🔔"
        title="Branch Notifications & Mobile Access"
        subtitle="Real-time alerts sent to the right franchise owner the moment a new enquiry arrives — with full lead context, on any device, within seconds."
        workflow={[
          { icon: "📥", label: "Enquiry In", sub: "Any channel" },
          { icon: "🧠", label: "Branch Matched", sub: "Auto-routed" },
          { icon: "📱", label: "SMS Sent", sub: "Owner's phone" },
          { icon: "📧", label: "Email Alert", sub: "Full details" },
          { icon: "🗂️", label: "CRM Updated", sub: "Lead visible" },
          { icon: "⏱️", label: "SLA Tracked", sub: "Response timer" },
        ]}
        before={[
          "Branch owners notified by email — frequently missed or delayed",
          "No urgency signalling or SLA tracking per enquiry",
          "Hours pass before a lead is picked up and actioned",
          "Head office has no visibility of response delays",
        ]}
        after={[
          "Instant SMS to branch owner with full lead summary",
          "SLA countdown begins from the moment the enquiry arrives",
          "Response times tracked and visible to head office in real time",
          "Escalation triggered automatically if no response within threshold",
        ]}
      />

      <UnifiedCRM />
      <PilotCTA />
      <Footer />
    </main>
  );
}
