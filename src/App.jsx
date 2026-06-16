import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "아파트 전체 리모델링",
    desc: "노후 아파트를 새 집처럼. 설계부터 마감까지 원스톱으로 진행합니다.",
  },
  {
    title: "주방 인테리어",
    desc: "기능성과 미감을 동시에. 최적의 동선과 수납을 설계합니다.",
  },
  {
    title: "욕실 리모델링",
    desc: "방수·타일·설비까지 완벽 시공. 10년 무상 A/S를 보장합니다.",
  },
  {
    title: "도배·마루",
    desc: "친환경 자재만 사용. 깔끔한 마감으로 공간을 새로 태어나게 합니다.",
  },
  {
    title: "전기·조명",
    desc: "안전한 전기 배선과 감각적인 조명 설계로 분위기를 완성합니다.",
  },
  {
    title: "상업 공간 인테리어",
    desc: "카페·사무실·음식점 등 상업 공간의 브랜드 아이덴티티를 구현합니다.",
  },
];

const PORTFOLIO = [
  {
    id: 1,
    title: "마포구 아파트 전체 리모델링",
    area: "84㎡",
    period: "45일",
    tag: "주거",
  },
  {
    id: 2,
    title: "강남구 카페 인테리어",
    area: "66㎡",
    period: "30일",
    tag: "상업",
  },
  {
    id: 3,
    title: "서초구 주방·욕실 개선",
    area: "32㎡",
    period: "20일",
    tag: "부분",
  },
  {
    id: 4,
    title: "용산구 오피스 리뉴얼",
    area: "120㎡",
    period: "60일",
    tag: "상업",
  },
  {
    id: 5,
    title: "은평구 구축 아파트 변신",
    area: "59㎡",
    period: "35일",
    tag: "주거",
  },
  {
    id: 6,
    title: "송파구 욕실 전체 교체",
    area: "8㎡",
    period: "7일",
    tag: "부분",
  },
];

const REVIEWS = [
  {
    name: "김○○",
    location: "마포구",
    stars: 5,
    text: "처음부터 끝까지 꼼꼼하게 챙겨주셨어요. 공사 중 생긴 작은 문제도 즉시 해결해주시고, 마감이 정말 깔끔합니다. 다음에 또 꼭 맡길게요.",
  },
  {
    name: "이○○",
    location: "강남구",
    stars: 5,
    text: "카페 공사를 맡겼는데 예산 안에서 최대한 예쁘게 뽑아주셨어요. 손님들 반응도 너무 좋고, 기대 이상이었습니다.",
  },
  {
    name: "박○○",
    location: "서초구",
    stars: 5,
    text: "견적부터 마무리까지 투명하게 진행해주셨고, 약속한 날짜에 딱 맞게 완공해주셨어요. 믿을 수 있는 업체입니다.",
  },
];

// ─── Components ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "about", label: "회사 소개" },
    { id: "services", label: "서비스" },
    { id: "portfolio", label: "포트폴리오" },
    { id: "reviews", label: "고객 후기" },
    { id: "contact", label: "문의하기" },
  ];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <button
          className="nav__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src="/Logo.png" alt="" className="nav__logo-img" /> 에코탄성
        </button>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className={active === l.id ? "active" : ""}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="nav__hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="메뉴"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src="/Logo.png" alt="에코탄성 로고" className="hero__bg-logo" />
        <div className="hero__bg-overlay" />
      </div>
      <div className="hero__content">
        <p className="hero__eyebrow">탄성코트 전문 · 5년 신뢰</p>
        <h1 className="hero__title">
          공간이 바뀌면
          <br />
          <em>삶이 달라집니다</em>
        </h1>
        <p className="hero__desc">
          설계부터 시공, 마감까지 — 에코탄성이
          <br />
          당신의 집을 새로운 이야기로 채웁니다.
        </p>
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            무료 견적 받기
          </button>
          <button
            className="btn btn--ghost"
            onClick={() =>
              document
                .getElementById("portfolio")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            시공 사례 보기
          </button>
          {/* 카카오 버튼 */}
          <button
            className="kakao-btn"
            onClick={() => window.open("https://open.kakao.com/o/s123abcd")}
            target="_blank"
            rel="noopener noreferrer"
          >
            카카오 상담
          </button>
        </div>
        <div className="hero__stats">
          {[
            ["20+", "완료 프로젝트"],
            ["5년", "업력"],
            ["90%", "고객 만족도"],
          ].map(([n, l]) => (
            <div className="hero__stat" key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__scroll-hint">
        <span>스크롤</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <FadeIn>
          <p className="section__label">ABOUT US</p>
          <h2 className="section__title">에코탄성 소개</h2>
        </FadeIn>
        <div className="about__grid">
          <FadeIn delay={100} className="about__text-col">
            <p className="about__lead">
              2020년 창업 이후, 저희는 단 한 가지 원칙을 지켜왔습니다.
              <br />
              <strong>"고객의 공간을 내 집처럼."</strong>
            </p>
            <p>
              아파트·주택·상업 공간 등 다양한 시공 경험을 바탕으로, 고객 한 분
              한 분의 라이프스타일에 맞는 공간을 제안합니다. 화려한 말보다
              정직한 시공으로 신뢰를 쌓아왔습니다.
            </p>
            <ul className="about__list">
              <li>✓ 건설업 면허 보유 / 합법적 하도급 관리</li>
              <li>✓ 직영 팀 운영으로 품질 일원화</li>
              <li>✓ 시공 후 2년 무상 A/S 보장</li>
              <li>✓ 투명한 견적, 추가 비용 없음</li>
            </ul>
          </FadeIn>
          <FadeIn delay={200} className="about__visual">
            {/*
            <div className="about__card-stack">
              <div className="about__card about__card--1">
                <span className="about__card-num">01</span>
                <p>정직한 견적</p>
              </div>
              <div className="about__card about__card--2">
                <span className="about__card-num">02</span>
                <p>꼼꼼한 시공</p>
              </div>
              <div className="about__card about__card--3">
                <span className="about__card-num">03</span>
                <p>철저한 A/S</p>
              </div>
            </div>
            */}
            <div className="about__certificates">
              <div className="about__cert-card">
                <img
                  src="/certificate1.jpg"
                  alt="환경표지 인증서 제24893호"
                  className="about__cert-img"
                />
                <p className="about__cert-label">환경표지 인증서 제24893호</p>
              </div>
              <div className="about__cert-card">
                <img
                  src="/certificate2.jpg"
                  alt="환경표지 인증서 제28125호"
                  className="about__cert-img"
                />
                <p className="about__cert-label">환경표지 인증서 제28125호</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <FadeIn>
          <p className="section__label">SERVICES</p>
          <h2 className="section__title">서비스 안내</h2>
          <p className="section__sub">공간의 모든 부분을 책임집니다</p>
        </FadeIn>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 60}>
              <div className="service-card">
                <span className="service-card__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("전체");
  const tags = ["전체", "주거", "상업", "부분"];
  const filtered =
    filter === "전체" ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === filter);
  return (
    <section className="section portfolio" id="portfolio">
      <div className="container">
        <FadeIn>
          <p className="section__label">PORTFOLIO</p>
          <h2 className="section__title">시공 포트폴리오</h2>
          <p className="section__sub">직접 시공한 프로젝트들을 소개합니다</p>
        </FadeIn>
        <div className="portfolio__filters">
          {tags.map((t) => (
            <button
              key={t}
              className={`filter-btn ${
                filter === t ? "filter-btn--active" : ""
              }`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="portfolio__grid">
          {filtered.map((p, i) => (
            <FadeIn key={p.id} delay={i * 60}>
              <div className="portfolio-card">
                <div className="portfolio-card__img">
                  <div className="portfolio-card__placeholder">
                    <span>
                      {/*p.tag === "주거" ? "🏠" : p.tag === "상업" ? "🏢" : "🔧"*/}
                    </span>
                  </div>
                  <span className="portfolio-card__tag">{p.tag}</span>
                </div>
                <div className="portfolio-card__body">
                  <h3>{p.title}</h3>
                  <div className="portfolio-card__meta">
                    <span>📐 {p.area}</span>
                    <span>📅 {p.period}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <FadeIn>
          <p className="section__label">REVIEWS</p>
          <h2 className="section__title">고객 후기</h2>
        </FadeIn>
        <div className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 80}>
              <div className="review-card">
                <p className="review-card__stars">{"★".repeat(r.stars)}</p>
                <p className="review-card__text">"{r.text}"</p>
                <div className="review-card__author">
                  <strong>{r.name}</strong>
                  <span>{r.location}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSent(true);
  };
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <FadeIn>
          <p className="section__label">CONTACT</p>
          <h2 className="section__title">문의 / 견적 요청</h2>
          <p className="section__sub">
            빠르게 연락드리겠습니다 (연중무휴 24시간 운영)
          </p>
        </FadeIn>
        <div className="contact__layout">
          <FadeIn delay={100} className="contact__info-col">
            <div className="contact__info">
              <h3>에코탄성</h3>
              {[
                ["", "대표번호", "010-1234-5678"],
                ["", "이메일", "hello@betterspace.kr"],
                ["", "주소", "서울특별시 마포구 공덕동 123"],
                ["", "운영 시간", "연중무휴 24시간 운영"],
              ].map(([icon, label, val]) => (
                <div className="contact__detail" key={label}>
                  <span className="contact__detail-icon">{icon}</span>
                  <div>
                    <small>{label}</small>
                    <p>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200} className="contact__form-col">
            {sent ? (
              <div className="contact__success">
                <span>✅</span>
                <h3>문의가 접수되었습니다!</h3>
                <p>확인 후 빠르게 연락드리겠습니다.</p>
                <button
                  className="btn btn--primary"
                  onClick={() => setSent(false)}
                >
                  다시 문의하기
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>이름 *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="홍길동"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>연락처 *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      placeholder="010-0000-0000"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>공사 종류</label>
                  <select name="type" value={form.type} onChange={handle}>
                    <option value="">선택해주세요</option>
                    <option>아파트 전체 리모델링</option>
                    <option>주방 인테리어</option>
                    <option>욕실 리모델링</option>
                    <option>도배·마루</option>
                    <option>상업 공간</option>
                    <option>기타</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>문의 내용</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    rows={4}
                    placeholder="공사 장소, 희망 일정, 예산 등 편하게 적어주세요."
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--full">
                  견적 요청하기 →
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <p className="footer__logo">
              <img src="/Logo.jpg" alt="" className="nav__logo-img" />
              에코탄성
            </p>
            <p className="footer__copy">
              © 2026 에코탄성. All rights reserved.
            </p>
          </div>
          <div className="footer__links">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">카카오톡 문의</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatKakao() {
  return (
    <a
      href="https://open.kakao.com/o/1234"
      target="_blank"
      rel="noopener noreferrer"
      className="kakao-float"
    >
      상담
    </a>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const ids = [
      "hero",
      "about",
      "services",
      "portfolio",
      "reviews",
      "contact",
    ];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <Nav active={activeSection} />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Reviews />
        <Contact />
        <Footer />
        <FloatKakao />
      </main>
    </>
  );
}
