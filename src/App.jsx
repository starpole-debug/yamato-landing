import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Mail, Leaf, Flower2, TestTube2, ShieldCheck, Sparkles, Sprout, Droplets } from "lucide-react";

// Simple replacements for Button/Card (Tailwind only)
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring ring-emerald-500/40 disabled:opacity-60 disabled:pointer-events-none ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`px-4 pt-4 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`px-4 pb-4 ${className}`}>{children}</div>
);

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const fade = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Global background (using local asset)
function GlobalBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-50">
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-30"
        style={{ backgroundImage: `url("/assets/bg/global-bg.png")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-emerald-50/40 to-white/60" />
    </div>
  );
}

function Section({ id, className = "", children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <section id={id} ref={ref} className={`relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <motion.div variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}>
        {children}
      </motion.div>
    </section>
  );
}

function ShinyButton({ children, className = "", ...props }) {
  return (
    <div className="relative inline-block group">
      <Button className={`rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 ${className}`} {...props}>{children}</Button>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <span
          className="absolute left-[-120%] top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ animation: "sheen 2.8s linear infinite" }}
        />
      </span>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className="relative text-sm transition-colors hover:text-emerald-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-emerald-700 after:transition-transform hover:after:scale-x-100"
    >
      {children}
    </a>
  );

  return (
    <header className={`sticky top-0 z-50 w-full transition-all ${scrolled ? "bg-white/80 backdrop-blur shadow-sm" : "bg-white/60 backdrop-blur"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <a href="#top" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-emerald-600 shadow-[0_0_0_3px_rgba(16,185,129,.2)]" />
          <span className="font-semibold tracking-wide">大和株式会社</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-neutral-700">
          <NavLink href="#about">私たちについて</NavLink>
          <NavLink href="#quality">品質</NavLink>
          <NavLink href="#principle">原理</NavLink>
          <NavLink href="#process">流れ</NavLink>
          <NavLink href="#results">実感写真</NavLink>
          <NavLink href="#testimonials">お客様の声</NavLink>
          <NavLink href="#company">会社情報</NavLink>
        </nav>
        <div className="hidden md:block">
          <a href="#contact"><ShinyButton size="sm">お問い合わせ</ShinyButton></a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div id="top" className="relative isolate overflow-x-clip">
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-emerald-50 via-emerald-100/70 to-white"/>
      <div className="absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(90deg,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:24px_24px]"/>

      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] -z-10 rounded-full blur-3xl bg-emerald-300/40"/>
      <div className="pointer-events-none absolute -bottom-16 left-[-10%] h-[360px] w-[360px] -z-10 rounded-full blur-3xl bg-teal-300/40"/>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[52svh] -z-10 bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/hero/hero-bg.jpg')", y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-emerald-50/40 to-emerald-50/0"/>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ animation: "sheen 6s linear infinite" }}/>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-emerald-200/30 blur-[2px]"
            style={{
              left: `${10 + i * 10}%`,
              bottom: `${(i % 4) * 18 + 10}%`,
              width: 8 + (i % 3) * 4,
              height: 8 + (i % 3) * 4,
              animation: `float ${8 + (i % 5)}s ease-in-out ${i * 0.8}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <Section id="hero" className="pt-10 pb-14 sm:pt-16 sm:pb-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 backdrop-blur px-3 py-1 text-xs text-neutral-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5"/>
              <span>厳選された、最高品質をお届けします</span>
            </div>
            <h1 className="text-3xl/tight sm:text-4xl/tight md:text-5xl/tight font-bold tracking-tight">
              自然の力で、目元から美しさを。
            </h1>
            <p className="text-neutral-700">
              大和株式会社は、漢方薬原料・薫香原料・香辛料・食品原料・中華食材・中国茶などを輸入し、
              天然の漢方薬材を活用した目の下のたるみケアをお届けします。
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact"><ShinyButton>無料相談 <ChevronRight className="ml-1 h-4 w-4"/></ShinyButton></a>
              <a href="#principle"><Button className="rounded-2xl border bg-white hover:bg-neutral-50">漢方の原理を見る</Button></a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <img src="/assets/icons/icon1.png" alt="安全保障" className="h-6 object-contain" />
              <img src="/assets/icons/icon3.png" alt="お客様満足" className="h-6 object-contain" />
            </div>

            <div className="grid grid-cols-3 max-w-md gap-4 pt-4">
              {[
                { n: "2002", s: "創業" },
                { n: "20万+", s: "世界のお客様" },
                { n: "100%", s: "天然由来" },
              ].map((it, i) => (
                <motion.div key={i} variants={fadeUp} className="rounded-2xl bg-white/70 backdrop-blur p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-xl font-bold text-emerald-700">{it.n}</div>
                  <div className="text-xs text-neutral-600">{it.s}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* === 修改点 START === */}
          <motion.div variants={fade} initial="hidden" animate="show" className="grid grid-cols-2 gap-4">
            {/* 左侧图片栏（现在包含两张图片） */}
            <div className="col-span-1 grid gap-4">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl relative bg-white transition-transform duration-300 will-change-transform hover:-translate-y-0.5">
                <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop" alt="Herbal details" className="h-full w-full object-cover"/>
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white text-xs px-2 py-1 shadow">
                  <Leaf className="h-3.5 w-3.5"/> 天然由来
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl relative bg-white transition-transform duration-300 will-change-transform hover:-translate-y-0.5">
                <img src="assets/ing/ing5.jpg" alt="Ingredient details" className="h-full w-full object-cover"/>
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white text-xs px-2 py-1 shadow">
                  <Sparkles className="h-3.5 w-3.5"/> パーソナルカスタマイズ
                </div>
              </div>
            </div>

            {/* 右侧卡片栏（现在包含两张卡片） */}
            <div className="col-span-1 grid gap-4">
              <div className="aspect-[4/3] rounded-3xl border bg-white p-4 shadow-sm flex items-center transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="space-y-1">
                  <div className="font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-700"/> 徹底した品質管理</div>
                  <p className="text-xs text-neutral-600">原料の選定〜製造管理まで、厳格な基準を採用。</p>
                </div>
              </div>
              <div className="aspect-[4/3] rounded-3xl border bg-gradient-to-br from-emerald-50 to-teal-50 p-4 shadow-sm flex items-center transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="space-y-1">
                  <div className="font-semibold flex items-center gap-2"><Droplets className="h-4 w-4 text-emerald-700"/> 外用経皮技術</div>
                  <p className="text-xs text-neutral-600">有効成分を角層まで素早く・やさしく浸透。</p>
                </div>
              </div>
            </div>
          </motion.div>
          {/* === 修改点 END === */}
        </div>
      </Section>

      <div aria-hidden className="-mt-6 text-emerald-50">
        <svg viewBox="0 0 1440 100" className="w-full h-12"><path fill="currentColor" d="M0,64L60,69.3C120,75,240,85,360,96C480,107,600,117,720,106.7C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/></svg>
      </div>
    </div>
  );
}

function About() {
  return (
    <Section id="about" className="py-16">
      <div className="pointer-events-none absolute -top-8 right-0 h-40 w-40 rounded-full blur-2xl bg-emerald-300/30"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold">大和株式会社とは</h2>
          <p className="text-neutral-700">
            2002年の創業以来、当社は天然の漢方薬材を活用し、目の下のたるみ（眼袋）のお悩みに向き合ってきました。
            これまでに世界中で20万人以上のお客様へ一対一のケアソリューションを提供し、高いご満足をいただいています。
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {icon: <ShieldCheck className="h-4 w-4"/>, t:"品質管理の徹底"},
              {icon: <Flower2 className="h-4 w-4"/>, t:"自然の力"},
              {icon: <TestTube2 className="h-4 w-4"/>, t:"外用経皮技術"}
            ].map((item,i)=> (
              <li key={i} className="flex items-center gap-2 rounded-xl border bg-white p-3 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-emerald-700">{item.icon}</span>
                <span>{item.t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <h3 className="font-semibold mb-2">取り扱い分野</h3>
          <p className="text-sm text-neutral-700">
            漢方薬原料、薫香原料、香辛料、食品原料、中華食材、中国茶、化粧品、美容器具、健康器具、健康食品、医療品、医薬品原料の輸入・販売
          </p>
        </div>
      </div>
    </Section>
  );
}

function Quality() {
  const items = [
    { title: "品質管理と安全性", desc: "原料の選定から製造管理まで、安定した品質を確保します。", icon: <ShieldCheck className="h-4 w-4 text-emerald-700"/> },
    { title: "責任あるサポート", desc: "最後まで伴走し、美しさを取り戻すお手伝いをします。", icon: <Sprout className="h-4 w-4 text-emerald-700"/> },
    { title: "最高品質の原料", desc: "厳選した漢方原料のみを採用し、日本のお客様にも安心をお届け。", icon: <Leaf className="h-4 w-4 text-emerald-700"/> },
  ];
  return (
    <Section id="quality" className="py-16">
      <h2 className="text-2xl font-bold mb-6">品質へのこだわり</h2>

      {/* === 修改点：左侧长图 + 右侧三卡片（两栏布局） === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* 左侧长图：可替换为你的长图路径 */}
        <div className="flex justify-center">
          <img
            src="/assets/icons/icon3.png"
            alt="品質イメージ"
            className="rounded-2xl shadow-md max-h-[600px] w-auto object-contain"
          />
        </div>

        {/* 右侧三卡片（保持原有三项内容） */}
        <div className="grid grid-cols-1 gap-6">
          {items.map((it, i) => (
            <Card key={i} className="transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">{it.icon}{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-700">{it.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* === 修改点结束 === */}
    </Section>
  );
}

function IngredientsGrid() {
  const imgs = [
     "/assets/ing/ing1.jpg",
     "/assets/ing/ing2.jpg",
     "/assets/ing/ing3.jpg",
     "/assets/ing/ing4.jpg"
  ];
  return (
    <Section id="ingredients" className="pt-2 pb-14">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-3xl border bg-white shadow-sm">
            <img src={src} alt={`原料 ${i+1}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-emerald-900/0 hover:bg-emerald-900/10 transition" />
          </div>
        ))}
      </div>
    </Section>
  );
}

function Principle() {
  const cards = [
    { title: "脾虚湿滞", body: "水分代謝の障害でむくみタイプの眼袋が形成。ハトムギ・ブクリョウで利水・巡りを促進。" },
    { title: "腎気虚弱", body: "支持力の低下により脂肪が突出。高麗人参・霊芝で腎を補い活性を高めます。" },
    { title: "肝血瘀阻", body: "ストレス・夜更かしで微小循環が低下。牡丹皮・サフランで血流を促進。" },
  ];

  const tech = [
    { title: "超微粉体浸透", desc: "200メッシュまで粉砕し、有効成分の経皮吸収率を向上。" },
    { title: "低温冷却による効果増強", desc: "ボルネオールなどと冷却で血管を収縮させ、むくみを即時緩和。" },
  ];

  return (
    <Section id="principle" className="py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">漢方の原理</h2>
          <p className="text-neutral-700 mb-6">「全体的な調整」を核心とし、体質に合わせて的確にアプローチします。</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((c, i) => (
              <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="font-semibold mb-1">{c.title}</div>
                <div className="text-sm text-neutral-700">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">外用経皮技術</h3>
          <ul className="space-y-3">
            {tech.map((t, i) => (
              <li key={i} className="rounded-2xl border bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-neutral-700">{t.desc}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    { title: "お問い合わせ", desc: "まずはお気軽にご相談ください。" },
    { title: "タイプ診断・ご案内", desc: "目の下のたるみタイプを診断し、最適な商品をご提案。" },
    { title: "ご自宅へ配送", desc: "迅速・丁寧にお届けします。" },
    { title: "改善・アフターケア", desc: "使用方法のご案内と継続サポート。" },
  ];
  return (
    <Section id="process" className="py-16">
      <h2 className="text-2xl font-bold mb-8">ご利用の流れ</h2>
      <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <li key={i} className="relative rounded-2xl border bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute -top-3 left-5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white text-sm font-semibold shadow">{i+1}</span>
            </div>
            <div className="mt-2 font-semibold">{s.title}</div>
            <div className="text-sm text-neutral-700">{s.desc}</div>
          </li>
        ))}
      </ol>

      {/* === 修改点：流程图放在步骤列表下方 === */}
      <div className="mt-10 flex justify-center">
        <img
          src="/assets/icons/icon1.png"
          alt="フロー図"
          className="max-w-full md:max-w-3xl rounded-xl shadow"
        />
      </div>
      {/* === 修改点结束 === */}
    </Section>
  );
}

function Results() {
  const items = [
    { combined: "/assets/ba/combined_1.jpg", caption: "28日使用後" },
    { combined: "/assets/ba/combined_2.jpg", caption: "36日使用後" },
    { combined: "/assets/ba/combined_3.jpg", caption: "45日使用後" },
  ];
  return (
    <Section id="results" className="py-16">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-bold">Before / After</h2>
        <span className="text-sm text-neutral-500">※個人差があります。</span>
      </div>
      <div className="group relative">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar" style={{scrollbarWidth: "none"}}>
          {items.map((it, i) => (
            <Card key={i} className="min-w-[340px] max-w-sm snap-start transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-4">
                <figure className="aspect-[4/3] overflow-hidden rounded-xl bg-neutral-50">
                  <img src={it.combined} alt={`Result ${i+1}`} className="h-full w-full object-cover object-center" />
                </figure>
                <div className="mt-2 text-sm text-neutral-700">{it.caption}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  const voices = [
    { name: "佐藤 美玲", text: "半月ほどで目の下のたるみが目立たなくなり、肌が引き締まりました。" },
    { name: "田中 花子", text: "成分はすべて漢方由来。3週間でたるみと小じわが改善。" },
    { name: "鈴木 奈緒", text: "1か月でたるみがすっきり。貼るだけで心地よい使用感。" },
    { name: "井上 真央", text: "敏感肌でも刺激なく、1か月で明確に改善。" },
  ];

  return (
    <Section id="testimonials" className="py-16">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-bold">お客様の声</h2>
        <span className="text-sm text-neutral-500">※個人の感想であり、効果を保証するものではありません。</span>
      </div>
      <div className="group relative">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar" style={{scrollbarWidth: "none"}}>
          {voices.map((v, i) => (
            <Card key={i} className="min-w-[320px] max-w-sm snap-start transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{v.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-700">{v.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Company() {
  return (
    <Section id="company" className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">会社情報</h2>
          <dl className="grid grid-cols-4 gap-x-4 gap-y-3 text-sm">
            <dt className="col-span-1 text-neutral-500">社名</dt>
            <dd className="col-span-3">大和株式会社</dd>

            <dt className="col-span-1 text-neutral-500">事業内容</dt>
            <dd className="col-span-3">化粧品、美容器具、健康器具、健康食品、医療品、医薬品原料、香辛料、薫香原料の輸入及び販売</dd>

            <dt className="col-span-1 text-neutral-500">資本金</dt>
            <dd className="col-span-3">金1600万円</dd>

            <dt className="col-span-1 text-neutral-500">連絡先</dt>
            <dd className="col-span-3 flex items-center gap-2">
              <Mail className="h-4 w-4"/> <a href="mailto:ogura0916@gaogze.com" className="underline">ogura0916@gaogze.com</a>
            </dd>
          </dl>
        </div>
        <div id="contact" className="rounded-2xl border bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <h3 className="font-semibold mb-2">無料相談・お問い合わせ</h3>
          <p className="text-sm text-neutral-700 mb-4">目の下のたるみのタイプ診断や商品選びをサポートします。お気軽にご連絡ください。</p>
          <form onSubmit={(e)=>e.preventDefault()} className="grid grid-cols-1 gap-3">
            <input placeholder="お名前" className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" required />
            <input type="email" placeholder="メールアドレス" className="rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40" required />
            <textarea placeholder="ご相談内容" className="min-h-[120px] rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"/>
            <ShinyButton type="submit">送信する</ShinyButton>
          </form>
          <p className="mt-3 text-xs text-neutral-500">※入力データ送信処理はダミーです。バックエンド接続が必要です。</p>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} 大和株式会社</div>
        <div className="flex items-center gap-3">
          <a href="#about" className="hover:text-neutral-800">会社概要</a>
          <span>・</span>
          <a href="#contact" className="hover:text-neutral-800">お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative bg-emerald-50 text-neutral-900 antialiased">
      <div className="pointer-events-none absolute inset-0 -z-50 bg-[radial-gradient(800px_400px_at_90%_-10%,rgba(16,185,129,0.12),transparent_60%)]"/>

      <style>{`
        @keyframes sheen { 0% { transform: translateX(-120%); } 100% { transform: translateX(220%); } }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: .3; }
          50% { opacity: .2; }
          100% { transform: translateY(-40px) translateX(12px); opacity: .15; }
        }
          html {
            scroll-behavior: smooth;
           }
      `}</style>

      <GlobalBackground />

      <Header />
      <Hero />
      <About />
      <Quality />
      <IngredientsGrid />
      <Principle />
      <Process />
      <Results />
      <Testimonials />
      <Company />
      <Footer />
    </div>
  );
}
