import { useMemo, useState } from "react";

const lawyers = [
  {
    name: "이경호",
    role: "대표변호사",
    field: "조세",
    desc: "세무조사 대응, 조세 소송, 조세 형사 사건 등 조세 분쟁 전반을 중심으로 전략적 대응을 수행합니다.",
    focus: ["세무조사 대응", "조세 소송", "조세 형사 사건"],
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "김정삼",
    role: "대표변호사",
    field: "형사 · 민사",
    desc: "형사 사건과 민사 분쟁을 중심으로 사실관계와 절차적 리스크를 정리하고 실질적인 해결 전략을 설계합니다.",
    focus: ["형사 사건 대응", "경제범죄", "민사 분쟁"],
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  },
];

const practices = [
  {
    title: "조세",
    lawyer: "이경호 대표변호사",
    body: "세무조사 대응부터 조세 불복, 조세 소송, 조세 형사 사건까지 조세 분쟁 전반에 대한 정교한 대응을 제공합니다.",
    items: ["세무조사 대응", "조세 불복", "조세 소송", "조세 형사 사건"],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "형사",
    lawyer: "김정삼 대표변호사",
    body: "수사 초기 대응, 고소·고발, 경제범죄, 기업 형사 사건 등 형사 절차 전반에 대한 전략적 대응을 수행합니다.",
    items: ["수사 대응", "고소·고발", "경제범죄", "기업 형사 사건"],
    image:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "민사",
    lawyer: "김정삼 대표변호사",
    body: "계약 분쟁, 손해배상, 부동산 분쟁, 기업 분쟁 등 주요 민사 사건에서 실질적인 해결 방향을 제시합니다.",
    items: ["손해배상", "계약 분쟁", "부동산 분쟁", "기업 분쟁"],
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  },
];

const cases = [
  {
    title: "세무조사 대응 및 조세 불복 사건",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "기업 관련 형사 사건 대응",
    image:
      "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "계약 분쟁 및 손해배상 사건",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "부동산 관련 민사 분쟁",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
];

const premium = {
  page: "bg-[#f7f5f0] text-[#18263f]",
  header: "border-[#d9d1c4] bg-[#f7f5f0]/92",
  nav: "text-[#5d6778] hover:text-[#18263f]",
  brandSub: "text-[#687387]",
  gold: "text-[#b08a4a]",
  title: "text-[#18263f]",
  body: "text-[#5f6979]",
  bodyStrong: "text-[#435065]",
  sectionAlt: "bg-[#f1ede6]",
  sectionBase: "bg-[#f7f5f0]",
  card: "bg-white border-[#ddd6cb]",
  cardAlt: "bg-[#f9f7f2] border-[#ddd6cb]",
  chip: "text-[#314057] border-[#d8d0c2] bg-[#f7f3eb]",
  buttonPrimary: "bg-[#1c2b45] text-white hover:bg-[#223454]",
  buttonSecondary: "border border-[#cbb68a] text-[#1c2b45] hover:bg-[#f2ece0]",
  input: "border-[#d7d0c5] bg-white text-[#18263f] placeholder:text-[#9aa1ad]",
  imageOverlay: "bg-gradient-to-t from-[#18263f]/45 via-[#18263f]/10 to-transparent",
  divider: "border-[#ddd6cb]",
};

const strategicTheme = {
  page: "bg-[#0a0d12] text-[#f4efe6]",
  header: "border-[#b89a63]/15 bg-[#0a0d12]/90",
  nav: "text-[#b7aea0] hover:text-[#f4efe6]",
  brandSub: "text-[#cfc5b5]",
  gold: "text-[#b89a63]",
  title: "text-[#f4efe6]",
  body: "text-[#bfb5a7]",
  bodyStrong: "text-[#d8cebf]",
  sectionAlt: "bg-[#0d1117]",
  sectionBase: "bg-[#0a0d12]",
  card: "bg-[#0f141c] border-[#b89a63]/12",
  cardAlt: "bg-[#111825] border-[#b89a63]/12",
  chip: "text-[#d9cfbf] border-[#b89a63]/18 bg-transparent",
  buttonPrimary: "bg-[#b89a63] text-[#0a0d12] hover:brightness-105",
  buttonSecondary: "border border-[#b89a63]/25 text-[#f4efe6] hover:bg-white/5",
  input: "border-[#b89a63]/18 bg-transparent text-[#f4efe6] placeholder:text-[#746d62]",
  imageOverlay: "bg-gradient-to-t from-[#0a0d12] via-[#0a0d12]/45 to-transparent",
  divider: "border-[#b89a63]/12",
};

function SectionTitle({ eyebrow, title, body, className = "", theme }) {
  const lines = String(title).split("\n");
  return (
    <div className={className}>
      <div className={`text-xs tracking-[0.28em] ${theme.gold}`}>{eyebrow}</div>
      <h2 className={`mt-5 text-[34px] font-semibold leading-[1.18] tracking-[-0.035em] sm:text-[42px] ${theme.title}`}>
        {lines.map((line, idx) => (
          <span key={`${line}-${idx}`} className="block">
            {line}
          </span>
        ))}
      </h2>
      {body ? <p className={`mt-5 max-w-2xl text-base leading-8 ${theme.body}`}>{body}</p> : null}
    </div>
  );
}

function ImageCard({ src, alt, className = "", overlay = true, children, overlayClass }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      {overlay ? <div className={`absolute inset-0 ${overlayClass}`} /> : null}
      {children ? <div className="relative z-10 h-full">{children}</div> : null}
    </div>
  );
}

function Header({ strategic }) {
  const theme = strategic ? strategicTheme : premium;
  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur ${theme.header}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <div>
          <div className={`text-xs tracking-[0.35em] ${theme.gold}`}>REMNANT</div>
          <div className={`mt-1 text-sm ${theme.brandSub}`}>법무법인 레미넌트</div>
        </div>
        <nav className="hidden items-center gap-10 text-sm lg:flex">
          <a href="#about" className={`transition ${theme.nav}`}>로펌소개</a>
          <a href="#lawyers" className={`transition ${theme.nav}`}>구성원</a>
          <a href="#practice" className={`transition ${theme.nav}`}>업무분야</a>
          <a href="#cases" className={`transition ${theme.nav}`}>주요사례</a>
          <a href="#consult" className={`transition ${theme.nav}`}>상담문의</a>
        </nav>
        <a
          href="#consult"
          className={`rounded-full px-5 py-2.5 text-sm transition ${
            strategic
              ? "border border-[#b89a63]/35 text-[#e4d4b2] hover:bg-[#b89a63]/10"
              : "border border-[#cbb68a] text-[#1c2b45] hover:bg-[#f2ece0]"
          }`}
        >
          상담 예약
        </a>
      </div>
    </header>
  );
}

function ThemeToggle({ mode, setMode }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full border border-[#cbb68a]/40 bg-white/95 p-1 shadow-2xl shadow-black/10 backdrop-blur">
      <div className="flex items-center gap-1">
        {[
          ["A", "Premium"],
          ["B", "Strategic"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              mode === key ? "bg-[#1c2b45] text-white" : "text-[#516070] hover:bg-[#f3eee5]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroA() {
  return (
    <section className="border-b border-[#ddd6cb] bg-[#f7f5f0]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <div className="text-xs tracking-[0.35em] text-[#b08a4a]">TAX · CRIMINAL · CIVIL</div>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#18263f] sm:text-6xl lg:text-8xl">
            <span className="block whitespace-nowrap">분쟁 해결의</span>
            <span className="block whitespace-nowrap">기준이 되는 로펌</span>
          </h1>
          <div className="mt-10 max-w-3xl space-y-4 text-[#5f6979]">
            <p className="text-[15px] font-medium leading-7 tracking-[-0.01em] text-[#314057] sm:text-[17px] sm:leading-8">
              조세·형사·민사 분야의 경험을 바탕으로
              <br className="hidden sm:block" />
              사건의 구조를 먼저 정리합니다.
            </p>
            <p className="max-w-2xl text-[15px] leading-7 tracking-[-0.01em] text-[#667180] sm:text-[17px] sm:leading-8">
              의뢰인의 상황에 맞는 전략을 설계하고,
              <br className="hidden sm:block" />
              실제 해결로 이어지는 대응 방향을 제시합니다.
            </p>
          </div>
          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <a href="#consult" className="rounded-full bg-[#1c2b45] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-[#223454]">
              상담 문의하기
            </a>
            <a href="#lawyers" className="rounded-full border border-[#cbb68a] px-7 py-3.5 text-center text-sm font-medium text-[#1c2b45] transition hover:bg-[#f2ece0]">
              대표변호사 보기
            </a>
          </div>
        </div>

        <ImageCard
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=80"
          alt="Premium law office"
          className="min-h-[420px] rounded-[36px] border border-[#ddd6cb] shadow-[0_30px_80px_rgba(24,38,63,0.08)]"
          overlayClass="bg-gradient-to-t from-[#18263f]/45 via-[#18263f]/10 to-transparent"
        >
          <div className="flex h-full items-end p-8 sm:p-10">
            <div>
              <div className="text-sm text-[#d8c19a]">PREMIUM COUNSEL</div>
              <div className="mt-3 max-w-md text-[28px] font-semibold leading-[1.2] tracking-[-0.03em] text-white">
                <span className="block">절제된 전략과 명확한 판단으로</span>
                <span className="block">사건의 방향을 설계합니다</span>
              </div>
            </div>
          </div>
        </ImageCard>
      </div>
    </section>
  );
}

function HeroB() {
  return (
    <section className="relative overflow-hidden border-b border-[#c8a96b]/12 bg-[#090d14]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,169,107,0.18),transparent_32%),radial-gradient(circle_at_left,rgba(24,40,64,0.42),transparent_28%)]" />
      <div className="relative mx-auto grid min-h-[82vh] max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center rounded-full border border-[#c8a96b]/15 bg-[#111825] px-4 py-2 text-xs tracking-[0.25em] text-[#a89f90]">
            TAX · CRIMINAL · CIVIL LITIGATION
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-[#f5f1e8] sm:text-6xl lg:text-7xl">
            <span className="block whitespace-nowrap">분쟁 해결의</span>
            <span className="block whitespace-nowrap">기준이 되는 로펌</span>
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 text-[#c5bfb4]">
            <p className="text-[15px] font-medium leading-7 tracking-[-0.01em] text-[#f1eadf] sm:text-[17px] sm:leading-8">
              조세·형사·민사 분야의 경험을 바탕으로
              <br className="hidden sm:block" />
              사건의 구조를 먼저 읽어냅니다.
            </p>
            <p className="text-[15px] leading-7 tracking-[-0.01em] text-[#c5bfb4] sm:text-[17px] sm:leading-8">
              의뢰인의 상황에 맞는 전략을 설계하고,
              <br className="hidden sm:block" />
              실제 해결로 이어지는 대응 방향을 제시합니다.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#consult" className="rounded-2xl bg-[#c8a96b] px-6 py-4 text-center text-sm font-semibold text-[#090d14] transition hover:brightness-105">
              상담 문의하기
            </a>
            <a href="#lawyers" className="rounded-2xl border border-[#c8a96b]/20 bg-[#111825] px-6 py-4 text-center text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#162033]">
              대표변호사 보기
            </a>
          </div>
        </div>

        <div className="grid gap-4 lg:pl-10">
          {lawyers.map((lawyer) => (
            <div key={lawyer.name} className="overflow-hidden rounded-[28px] border border-[#c8a96b]/12 bg-[#111825]/95 shadow-2xl shadow-black/30">
              <div className="grid min-h-[240px] grid-cols-[0.95fr_1.05fr]">
                <ImageCard src={lawyer.image} alt={lawyer.name} className="h-full" overlay overlayClass="bg-gradient-to-t from-[#0a0d12] via-[#0a0d12]/45 to-transparent" />
                <div className="p-6">
                  <div className="text-sm text-[#c8a96b]">{lawyer.role}</div>
                  <div className="mt-1 text-2xl font-semibold text-[#f5f1e8]">{lawyer.name}</div>
                  <div className="mt-2 text-sm text-[#a89f90]">전문 분야 · {lawyer.field}</div>
                  <p className="mt-4 text-sm leading-7 text-[#c5bfb4]">{lawyer.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lawyer.focus.map((item) => (
                      <span key={item} className="rounded-full border border-[#c8a96b]/12 bg-[#0c121d] px-3 py-1.5 text-xs text-[#d8d0c2]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ strategic = false }) {
  const theme = strategic ? strategicTheme : premium;
  return (
    <section id="about" className={`border-b ${theme.divider} ${strategic ? "bg-[#0d131f]" : "bg-[#f1ede6]"}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <SectionTitle
            theme={theme}
            eyebrow="ABOUT REMNANT"
            title={
              strategic
                ? `사건 구조를 먼저 읽고\n대응 전략을 설계합니다`
                : `절제된 전략과 명확한 판단으로\n사건의 방향을 설계합니다`
            }
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <ImageCard
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=80"
            alt="Meeting"
            className={`min-h-[300px] rounded-[28px] border ${theme.divider} ${!strategic ? "shadow-[0_20px_60px_rgba(24,38,63,0.06)]" : ""}`}
            overlayClass={theme.imageOverlay}
          />
          <div className={`flex flex-col justify-center rounded-[28px] border p-7 ${theme.cardAlt}`}>
            <p className={`text-[16px] font-medium leading-8 tracking-[-0.015em] ${theme.bodyStrong}`}>
              대표변호사 중심의 사건 운영을 원칙으로 합니다.
              <br className="hidden sm:block" />
              초기 단계에서 핵심 쟁점과 우선순위를 먼저 정리합니다.
            </p>
            <p className={`mt-6 text-[15px] leading-7 tracking-[-0.01em] ${theme.body}`}>
              조세 · 형사 · 민사 이슈를 통합적으로 검토해
              <br className="hidden sm:block" />
              필요한 대응의 순서를 명확히 설정합니다.
            </p>
            <p className={`mt-6 text-[15px] leading-7 tracking-[-0.01em] ${theme.body}`}>
              복잡한 분쟁일수록 많은 설명보다 정확한 구조화가 중요합니다.
              <br className="hidden sm:block" />
              의뢰인이 현재 위치와 다음 대응을 분명히 이해할 수 있도록 사건을 정리하고 전략을 제시합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LawyersSection({ strategic = false }) {
  const theme = strategic ? strategicTheme : premium;
  return (
    <section id="lawyers" className={`border-b ${theme.divider} ${strategic ? "bg-[#090d14]" : "bg-[#f7f5f0]"}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle theme={theme} eyebrow="REPRESENTATIVE LAWYERS" title="대표변호사" />
          <p className={`max-w-2xl text-base leading-8 ${theme.body}`}>
            레미넌트는 대표변호사 2인이 사건의 핵심 전략을 직접 설계하고, 분쟁의 구조를 끝까지 점검합니다.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.name}
              className={
                strategic
                  ? "overflow-hidden rounded-[32px] border border-[#b89a63]/12 bg-[#0f1724]"
                  : "overflow-hidden rounded-[32px] border border-[#ddd6cb] bg-white shadow-[0_25px_70px_rgba(24,38,63,0.08)]"
              }
            >
              <div className={strategic ? "grid min-h-[520px] grid-rows-[280px_1fr]" : "grid gap-8 p-8 sm:grid-cols-[180px_1fr] sm:items-start sm:p-10 lg:p-12"}>
                {strategic ? (
                  <ImageCard src={lawyer.image} alt={lawyer.name} className="h-full" overlay overlayClass={theme.imageOverlay} />
                ) : (
                  <ImageCard src={lawyer.image} alt={lawyer.name} className="aspect-[4/5] rounded-[28px] border border-[#ddd6cb]" overlay overlayClass="bg-gradient-to-t from-[#18263f]/18 via-transparent to-transparent" />
                )}
                <div className={strategic ? "p-8" : ""}>
                  <div className={`text-sm ${theme.gold}`}>{lawyer.role}</div>
                  <h3 className={`mt-3 text-3xl font-semibold tracking-[-0.03em] ${theme.title}`}>{lawyer.name}</h3>
                  <div className={`mt-3 text-sm ${strategic ? "text-[#9f9688]" : "text-[#6f7988]"}`}>전문 분야 · {lawyer.field}</div>
                  <p className={`mt-7 text-sm leading-8 ${theme.body}`}>{lawyer.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {lawyer.focus.map((item) => (
                      <span key={item} className={`rounded-full px-3 py-1.5 text-xs ${strategic ? "border border-[#b89a63]/18 text-[#d9cfbf]" : "border border-[#d8d0c2] bg-[#f7f3eb] text-[#314057]"}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StrengthSection({ strategic = false }) {
  const theme = strategic ? strategicTheme : premium;
  const strengths = [
    {
      no: "01",
      title: "대표변호사 직접 설계",
      body: "사건의 방향은 초기 전략에서 결정됩니다. 레미넌트는 대표변호사가 사건의 핵심 구조를 직접 검토하고 대응 방향을 설계합니다.",
    },
    {
      no: "02",
      title: strategic ? "조세·형사·민사 복합 대응" : "조세 · 형사 · 민사 통합 검토",
      body: "복합 분쟁은 단일 분야만으로 설명되지 않습니다. 레미넌트는 조세, 형사, 민사 이슈를 유기적으로 연결해 사건 전체를 분석합니다.",
    },
    {
      no: "03",
      title: strategic ? "전략 중심 사건 관리" : "절제된 전략, 명확한 대응",
      body: "과도한 수사보다 쟁점 정리와 실행 가능한 전략을 우선합니다. 필요한 대응을 정확하게 제시하는 것이 레미넌트의 방식입니다.",
    },
  ];

  return (
    <section className={`border-b ${theme.divider} ${strategic ? "bg-[#0c111a]" : "bg-[#f1ede6]"}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionTitle theme={theme} eyebrow="WHY REMNANT" title={strategic ? "레미넌트의 분쟁 대응 방식" : "레미넌트의 기준"} />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {strengths.map((item) => (
            <div key={item.title} className={`${strategic ? "rounded-[28px] border border-[#b89a63]/12 bg-[#111825] p-8" : "rounded-[28px] border border-[#ddd6cb] bg-white p-8 shadow-[0_20px_60px_rgba(24,38,63,0.06)] lg:p-10"}`}>
              <div className={`text-sm ${theme.gold}`}>{item.no}</div>
              <h3 className={`mt-6 text-2xl font-semibold leading-tight tracking-[-0.03em] ${theme.title}`}>{item.title}</h3>
              <p className={`mt-6 text-sm leading-8 ${theme.body}`}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PracticeSection({ strategic = false }) {
  const theme = strategic ? strategicTheme : premium;
  return (
    <section id="practice" className={`border-b ${theme.divider} ${strategic ? "bg-[#0a0f18]" : "bg-[#f7f5f0]"}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle theme={theme} eyebrow="PRACTICE AREAS" title="업무분야" />
          <p className={`max-w-2xl text-base leading-8 ${theme.body}`}>
            조세, 형사, 민사 분야를 중심으로 사건의 성격과 절차적 리스크를 고려한 대응 전략을 제공합니다.
          </p>
        </div>

        <div className={strategic ? "mt-14 grid gap-6 lg:grid-cols-3" : "mt-14 space-y-6"}>
          {practices.map((item) => (
            <div key={item.title} className={strategic ? "overflow-hidden rounded-[32px] border border-[#b89a63]/12 bg-[#0f1724]" : "grid gap-8 rounded-[32px] border border-[#ddd6cb] bg-white p-8 shadow-[0_25px_70px_rgba(24,38,63,0.06)] lg:grid-cols-[220px_1fr_1.1fr] lg:items-start lg:p-10"}>
              {strategic ? (
                <>
                  <ImageCard src={item.image} alt={item.title} className="h-56" overlay overlayClass={theme.imageOverlay} />
                  <div className="p-8">
                    <div className="text-sm text-[#b89a63]">{item.lawyer}</div>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-5 text-sm leading-8 text-[#bfb5a7]">{item.body}</p>
                    <div className="mt-6 space-y-3">
                      {item.items.map((point) => (
                        <div key={point} className="flex items-center justify-between rounded-2xl border border-[#b89a63]/12 bg-[#121a28] px-4 py-3 text-sm text-[#ddd3c4]">
                          <span>{point}</span>
                          <span className="text-[#8f8578]">→</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="text-sm text-[#b08a4a]">{item.lawyer}</div>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#18263f]">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-8 text-[#5f6979]">{item.body}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {item.items.map((point) => (
                      <div key={point} className="border-b border-[#ddd6cb] pb-3 text-sm text-[#314057]">
                        {point}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseSection({ strategic = false }) {
  const theme = strategic ? strategicTheme : premium;
  return (
    <section id="cases" className={`border-b ${theme.divider} ${strategic ? "bg-[#090d14]" : "bg-[#f1ede6]"}`}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle theme={theme} eyebrow="CASE EXPERIENCE" title="주요 수행 영역" />
          <p className={`max-w-2xl text-base leading-8 ${theme.body}`}>
            실제 사건은 비밀유지 원칙에 따라 공개 가능한 범위에서만 소개됩니다.
          </p>
        </div>

        <div className={strategic ? "mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" : "mt-14 divide-y divide-[#ddd6cb] rounded-[24px] border-y border-[#ddd6cb] bg-white px-6 shadow-[0_20px_60px_rgba(24,38,63,0.05)]"}>
          {cases.map((item, idx) =>
            strategic ? (
              <div key={item.title} className="overflow-hidden rounded-[28px] border border-[#b89a63]/12 bg-[#111825]">
                <ImageCard src={item.image} alt={item.title} className="h-52" overlay overlayClass={theme.imageOverlay} />
                <div className="p-6">
                  <div className="text-sm text-[#b89a63]">CASE {idx + 1}</div>
                  <div className="mt-3 text-lg leading-8 text-[#f4efe6]">{item.title}</div>
                </div>
              </div>
            ) : (
              <div key={item.title} className="grid gap-4 py-6 lg:grid-cols-[120px_1fr_220px] lg:items-center">
                <div className="text-sm text-[#b08a4a]">CASE {idx + 1}</div>
                <div className="text-lg text-[#18263f]">{item.title}</div>
                <ImageCard src={item.image} alt={item.title} className="h-24 rounded-2xl border border-[#ddd6cb]" overlay={false} />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function inputClass(strategic) {
  return strategic
    ? "rounded-2xl border border-[#c8a96b]/12 bg-[#0b111b] px-4 py-3 text-[#f4efe6] outline-none placeholder:text-[#746d62]"
    : "rounded-2xl border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none placeholder:text-[#9aa1ad]";
}

function textareaClass(strategic) {
  return strategic
    ? "rounded-[24px] border border-[#c8a96b]/12 bg-[#0b111b] px-4 py-3 text-[#f4efe6] outline-none placeholder:text-[#746d62]"
    : "rounded-[24px] border border-[#d7d0c5] bg-white px-4 py-3 text-[#18263f] outline-none placeholder:text-[#9aa1ad]";
}

function ConsultSection({ strategic = false }) {
  const theme = strategic ? strategicTheme : premium;
  return (
    <section id="consult" className={strategic ? "bg-[#0b1018]" : "bg-[#f7f5f0]"}>
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionTitle
            theme={theme}
            eyebrow="CONSULTATION"
            title={strategic ? "법률 문제는 대응 시점이 결과를 바꿉니다" : "사건의 방향을 먼저 정리하고 전화 상담으로 이어집니다"}
            body="온라인으로 기본 내용을 남겨주시면 검토 후 전화로 연락드립니다. 사건 분야와 현재 상황을 간단히 남겨주시면, 상담 이전에 핵심 쟁점을 빠르게 확인할 수 있습니다."
          />
          <div className={`mt-8 space-y-3 text-sm ${strategic ? "text-[#d8cebf]" : "text-[#435065]"}`}>
            <div>• 온라인 상담 접수 후 검토</div>
            <div>• 담당 변호사 또는 실무진 전화 회신</div>
            <div>• 조세 / 형사 / 민사 사건 우선 분류</div>
          </div>
        </div>

        <div className={`rounded-[32px] border p-8 sm:p-10 ${strategic ? "border-[#b89a63]/12 bg-[#111825]/96 shadow-2xl shadow-black/30" : "border-[#ddd6cb] bg-white shadow-[0_25px_70px_rgba(24,38,63,0.08)]"}`}>
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={`grid gap-2 text-sm ${strategic ? "text-[#bfb5a7]" : "text-[#5f6979]"}`}>
                이름
                <input className={inputClass(strategic)} placeholder="성함을 입력해 주세요" />
              </label>
              <label className={`grid gap-2 text-sm ${strategic ? "text-[#bfb5a7]" : "text-[#5f6979]"}`}>
                연락처
                <input className={inputClass(strategic)} placeholder="연락 가능한 번호" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={`grid gap-2 text-sm ${strategic ? "text-[#bfb5a7]" : "text-[#5f6979]"}`}>
                이메일
                <input className={inputClass(strategic)} placeholder="선택 입력" />
              </label>
              <label className={`grid gap-2 text-sm ${strategic ? "text-[#bfb5a7]" : "text-[#5f6979]"}`}>
                사건 분야
                <select className={inputClass(strategic)}>
                  <option className={strategic ? "bg-[#0f141c]" : "bg-white"}>조세</option>
                  <option className={strategic ? "bg-[#0f141c]" : "bg-white"}>형사</option>
                  <option className={strategic ? "bg-[#0f141c]" : "bg-white"}>민사</option>
                  <option className={strategic ? "bg-[#0f141c]" : "bg-white"}>기타</option>
                </select>
              </label>
            </div>

            <label className={`grid gap-2 pt-2 text-sm ${strategic ? "text-[#bfb5a7]" : "text-[#5f6979]"}`}>
              사건 개요
              <textarea rows={6} className={textareaClass(strategic)} placeholder="사건 개요와 현재 상황을 간단히 작성해 주세요" />
            </label>

            <label className={`mt-2 flex items-start gap-3 text-sm ${strategic ? "rounded-2xl border border-[#c8a96b]/12 bg-[#0b111b] p-4 text-[#bfb5a7]" : "rounded-2xl border border-[#e3ddd3] bg-[#faf7f2] p-4 text-[#5f6979]"}`}>
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[#b89a63]/30 bg-transparent" />
              <span>개인정보 수집 및 이용에 동의합니다. 상담 검토 및 회신 목적으로만 사용됩니다.</span>
            </label>

            <button className={`mt-4 px-7 py-3.5 text-sm font-medium transition ${strategic ? "rounded-2xl bg-[#b89a63] text-[#0a0d12] hover:brightness-105" : "rounded-full bg-[#1c2b45] text-white hover:bg-[#223454]"}`}>
              상담 요청 보내기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ strategic }) {
  return (
    <footer className={`border-t ${strategic ? "border-[#b89a63]/12 bg-[#0a0d12] text-[#9d9486]" : "border-[#ddd6cb] bg-[#f1ede6] text-[#667180]"}`}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 text-sm lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <div className={`text-xs tracking-[0.35em] ${strategic ? "text-[#b89a63]" : "text-[#b08a4a]"}`}>REMNANT</div>
          <div className={`mt-2 text-lg ${strategic ? "text-[#f4efe6]" : "text-[#18263f]"}`}>법무법인 레미넌트</div>
          <p className="mt-4 max-w-md leading-7">조세 · 형사 · 민사 분야에서 전략적 대응을 제공하는 분쟁 중심 로펌.</p>
        </div>
        <div>
          <div className={strategic ? "text-[#f4efe6]" : "text-[#18263f]"}>대표변호사</div>
          <div className="mt-4 space-y-2">
            <div>이경호 (조세)</div>
            <div>김정삼 (형사 · 민사)</div>
          </div>
        </div>
        <div>
          <div className={strategic ? "text-[#f4efe6]" : "text-[#18263f]"}>Contact</div>
          <div className="mt-4 space-y-2">
            <div>서울시 강남구 테헤란로 000 (예시)</div>
            <div>대표전화 02-0000-0000</div>
            <div>remnant@lawfirm.co.kr</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RemnantLawfirmABShowcase() {
  const [mode, setMode] = useState("A");
  const strategic = useMemo(() => mode === "B", [mode]);
  const theme = strategic ? strategicTheme : premium;

  return (
    <div className={`min-h-screen ${theme.page}`}>
      <Header strategic={strategic} />
      <ThemeToggle mode={mode} setMode={setMode} />
      <main>
        {strategic ? <HeroB /> : <HeroA />}
        <AboutSection strategic={strategic} />
        <LawyersSection strategic={strategic} />
        <StrengthSection strategic={strategic} />
        <PracticeSection strategic={strategic} />
        <CaseSection strategic={strategic} />
        <ConsultSection strategic={strategic} />
      </main>
      <Footer strategic={strategic} />
    </div>
  );
}
