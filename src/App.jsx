import { useEffect } from 'react'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>
  </svg>
)

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })

    document.querySelectorAll('.reveal, .tl-item').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useCounter() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        const target = parseInt(el.dataset.count, 10)
        const start = performance.now()
        const step = (t) => {
          const p = Math.min(1, (t - start) / 1600)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.floor(eased * target)
          if (p < 1) requestAnimationFrame(step)
          else el.textContent = target
        }
        requestAnimationFrame(step)
        io.unobserve(el)
      })
    }, { threshold: 0.5 })

    document.querySelectorAll('.counter .num[data-count]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useProcessFlow() {
  useEffect(() => {
    const flow = document.getElementById('processFlow')
    if (!flow) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) flow.classList.add('revealed')
      })
    }, { threshold: 0.3 })
    io.observe(flow)
    return () => io.disconnect()
  }, [])
}

function useScrollEffects() {
  useEffect(() => {
    const nav = document.getElementById('nav')
    const leaves = Array.from(document.querySelectorAll('.leaf-float'))
    const badge = document.querySelector('.year-badge')
    const onScroll = () => {
      const y = window.scrollY
      nav?.classList.toggle('scrolled', y > 40)
      if (y < window.innerHeight * 1.5) {
        leaves.forEach((l, i) => { l.style.translate = `0 ${y * (0.05 + i * 0.03)}px` })
        if (badge) badge.style.translate = `0 ${y * 0.08}px`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function Nav() {
  return (
    <nav className="top" id="nav">
      <a href="#top" className="logo">
        <img src="/logo.png" alt="Akçal Zeytinyağı Fabrikası" className="logo-img" />
      </a>
      <div className="nav-links">
        <a href="#hikaye">Hikâyemiz</a>
        <a href="#aile">Aile Mirası</a>
        <a href="#uretim">Üretim</a>
        <a href="#urunler">Ürünler</a>
        <a href="#kalite">Kalite</a>
        <a href="#cografya">Silifke</a>
        <a href="#iletisim" className="nav-cta">İletişim</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-eyebrow">Silifke · Mersin · EST. 1962</div>
            <h1>
              <span className="block"><span className="word">Toprağın</span></span>
              <span className="block"><span className="word italic">sabrı,</span></span>
              <span className="block"><span className="word">ailenin</span></span>
              <span className="block"><span className="word italic">mirası.</span></span>
            </h1>
            <p className="hero-sub">
              1962'den bu yana Keben'in taşlı topraklarından. Aynı eller, değişen teknoloji, değişmeyen özen.
            </p>
            <div className="hero-meta">
              <div className="item">
                <div className="k">Kuruluş</div>
                <div className="v">1962</div>
              </div>
              <div className="item">
                <div className="k">Nesil</div>
                <div className="v">İkinci</div>
              </div>
              <div className="item">
                <div className="k">Uzman kadro</div>
                <div className="v">10 kişi</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <img src="/product-bottle.png" alt="Akçal Naturel Sızma Zeytinyağı 5L Teneke" className="hero-product-img" />
            <svg className="leaf-float a" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30 Q30 5, 60 15 Q85 25, 90 40 Q70 50, 45 45 Q20 40, 10 30 Z" fill="currentColor"/>
              <path d="M10 30 Q50 32, 90 40" stroke="#4E5A28" strokeWidth="0.5" fill="none"/>
            </svg>
            <svg className="leaf-float b" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30 Q30 5, 60 15 Q85 25, 90 40 Q70 50, 45 45 Q20 40, 10 30 Z" fill="currentColor"/>
            </svg>
            <svg className="leaf-float c" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 30 Q30 5, 60 15 Q85 25, 90 40 Q70 50, 45 45 Q20 40, 10 30 Z" fill="currentColor"/>
              <path d="M10 30 Q50 32, 90 40" stroke="#4E5A28" strokeWidth="0.5" fill="none"/>
            </svg>
            <div className="year-badge"><div className="inner">1962</div></div>
          </div>
        </div>
      </div>
      <div className="scroll-hint">Kaydır<div className="line"></div></div>
    </section>
  )
}

function Marquee() {
  const items = ['Naturel Sızma', 'Soğuk Sıkım', 'Kontinü Sistem', 'HT-DB Sertifikalı', 'Aile Şirketi', 'Silifke · Keben']
  const doubled = [...items, ...items]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => <span key={i}>{item}</span>)}
      </div>
    </div>
  )
}

function Hikaye() {
  const tlItems = [
    { year: '1962', title: 'Keben Köyü\'nde ilk sıkım', text: 'Süleyman Akçal, Mersin Silifke\'nin Keben Köyü\'nde at ve insan gücüyle çalışan burgulu sıkıştırma mengenesini kurar. Zeytinler torbalar içinde el emeğiyle sıkılır, ilk damlalar bir aile geleneğine dönüşür.' },
    { year: '70\'ler', title: 'Dizel motor dönemi', text: 'At gücü, dizel motorla birleşir. Zeytin kırma verimi artar; ancak torbalarda sıkıştırma yöntemi — köklü usulü — aynen korunur. Deneyim makineye aktarılır, ama öğretmez değiştirmez.' },
    { year: '80-90', title: 'Elektrik & pomparyalar', text: 'Elektrikli pomparyalar devreye girer. Soğuk pres yöntemiyle sıkılan zeytin, seperatörden süzülerek sofralık yağ olarak çıkar. Temiz, berrak, doğru.' },
    { year: '2006', title: 'HT-DB işaretleme yetkisi', text: '30 Ekim 2006\'da HT-DB işaretleme yetkisi alınır. Akçal, sektörün izlenebilirlik ve kalite standartlarını karşılayan öncü firmalarından biri olarak tescillenir.' },
    { year: '2007', title: 'Aile şirketi kurulur', text: 'Süleyman Akçal\'ın çocukları Sadık ve Ali Akçal, aile işletmesini AKÇAL GIDA TARIM HAYVANCILIK İNŞAAT TURİZM SANAYİ ve TİCARET LTD. ŞTİ. çatısı altında şirketleştirir.' },
    { year: 'Bugün', title: 'Kontinü sistem fabrikası', text: 'Dünyada zeytinyağı üretiminde kullanılan en son sistem — kontinü — Silifke\'deki modern tesise kurulur. 10 kişilik uzman kadro, her şişede aynı hassasiyeti sürdürür.' },
  ]

  return (
    <section className="hikaye" id="hikaye">
      <div className="container">
        <div className="hikaye-head">
          <div>
            <div className="section-label reveal"><span className="num">01</span> / Hikâyemiz</div>
            <h2 className="section-title reveal delay-1">
              At gücünden <em>kontinüye,</em><br/>altmış yıllık bir <em>hasat.</em>
            </h2>
          </div>
          <p className="section-intro reveal delay-2">
            Burgulu mengene'den kontinü sisteme — üç nesil, üç teknoloji, tek ilke: zeytinin tadına dokunmamak.
          </p>
        </div>

        <div className="counter-row">
          <div className="counter reveal">
            <div className="num" data-count="64">0</div>
            <div className="label">Yıllık zeytin tecrübesi</div>
          </div>
          <div className="counter reveal delay-1">
            <div className="num" data-count="10">0</div>
            <div className="label">Kişilik uzman kadro</div>
          </div>
          <div className="counter reveal delay-2">
            <div className="num">3<span className="unit">nesil</span></div>
            <div className="label">Aile mirası</div>
          </div>
          <div className="counter reveal delay-3">
            <div className="num">1<span className="unit">.lider</span></div>
            <div className="label">Sektörün öncülerinden</div>
          </div>
        </div>

        <div className="timeline">
          {tlItems.map((item) => (
            <div className="tl-item" key={item.year}>
              <div className="tl-year">{item.year}</div>
              <div className="tl-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Aile() {
  return (
    <section className="aile" id="aile">
      <div className="container">
        <div className="section-label reveal"><span className="num">02</span> / Aile Mirası</div>
        <h2 className="section-title reveal delay-1">
          Üç nesil, <em>aynı toprak,</em><br/><em>aynı söz.</em>
        </h2>

        <div className="aile-quote-full reveal delay-2">
          <span className="aq-mark">"</span>
          <p>Bir şişe yağ, bir ailenin sözüdür.<br/>Toprağa verdiğin emeğin, şişede halka geri dönmesidir.</p>
          <span className="aq-mark close">"</span>
        </div>

        <div className="aile-two-col reveal delay-3">
          <div className="aile-col">
            <p>Rahmetli Süleyman Akçal, 1962'de Keben Köyü'nde ilk sıkımı yaptığında yanında yalnızca atının sabrı, torbanın sessizliği ve ellerinin hafızası vardı. Öğrendiği şeyi oğullarına, onlar da kardeşlerine aktardı.</p>
          </div>
          <div className="aile-col">
            <p>2007'de Sadık ve Ali Akçal, babalarının bıraktığı mengeneyi ve sözü bir şirkete, bir fabrikaya, bir aile mirasına taşıdı. Bugün aynı toprağın zeytini, artık modern bir tesiste, aynı titizlikle şişelenir.</p>
          </div>
        </div>

        <div className="succession reveal">
          {[
            { role: 'Kurucu · 1962', name: 'Süleyman Akçal', note: 'Keben Köyü\'nde at gücüyle ilk sıkımı gerçekleştiren usta.' },
            { role: 'İkinci Nesil · 2007', name: 'Sadık Akçal', note: 'Aile işletmesini şirkete dönüştüren, modern tesisi kuran nesil.' },
            { role: 'İkinci Nesil · 2007', name: 'Ali Akçal', note: 'Teknoloji yatırımları ve kalite yönetiminde liderlik eden ortak.' },
          ].map((p) => (
            <div className="person" key={p.name}>
              <div className="role">{p.role}</div>
              <div className="name">{p.name}</div>
              <p className="person-note">{p.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Uretim() {
  const steps = [
    { num: '01', title: 'Hasat', desc: 'Silifke\'nin taşlı tepelerinden elle toplama' },
    { num: '02', title: 'Yıkama', desc: 'Yaprak ve toprak ayrımı, temiz zeytin' },
    { num: '03', title: 'Kırma', desc: 'Kontinü sistemde çekirdekle birlikte pasta' },
    { num: '04', title: 'Yoğurma', desc: '27°C altı — soğuk sıkım hassasiyeti' },
    { num: '05', title: 'Süzme', desc: 'Santrifüj ve seperatör ile berrak yağ' },
  ]

  return (
    <section className="uretim" id="uretim">
      <div className="container">
        <div className="uretim-head">
          <div className="section-label reveal"><span className="num">03</span> / Üretim Süreci</div>
          <h2 className="section-title reveal delay-1">Beş aşamada <em>kontinü sistem.</em></h2>
          <p className="section-intro reveal delay-2">
            Zeytinden şişeye beş adım. Her biri bir öncekinin tazeliğini, bir sonrakinin berraklığını korur.
          </p>
        </div>

        <div className="process-flow" id="processFlow">
          <div className="flow-progress"></div>
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className="dot">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="uretim-photo reveal">
          <img src="/akan-yag_orig.jpeg" alt="Akçal Fabrikası — kontinü sistemden akan taze zeytinyağı" />
          <div className="uretim-photo-caption">Separatörden süzülen taze yağ · Keben Fabrikası</div>
        </div>

        <div className="uretim-details">
          <div className="ud-statement reveal">
            <p className="ud-main">Zeytin hasat<br/>günü sıkılır.</p>
            <p className="ud-sub">Kapalı hat, kesintisiz akış, sıfır bekleme. Beş aşama boyunca hava teması engellenir — yağ, meyvenin özünü olduğu gibi taşır.</p>
          </div>
          <div className="ud-stats reveal delay-1">
            {[
              { num: '27°', label: 'Soğuk sıkım sınırı' },
              { num: '<0.8', label: '% max. asit oranı' },
              { num: '0', label: 'Saat bekleme' },
              { num: '5', label: 'Aşamalı kapalı hat' },
            ].map((s) => (
              <div className="ud-stat" key={s.label}>
                <div className="ud-num">{s.num}</div>
                <div className="ud-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Urunler() {
  return (
    <section className="urunler" id="urunler">
      <div className="container">
        <div className="urunler-head">
          <div>
            <div className="section-label reveal"><span className="num">04</span> / Ürünlerimiz</div>
            <h2 className="section-title reveal delay-1">Sofranıza <em>üç şişe.</em></h2>
          </div>
          <p className="section-intro reveal delay-2">
            Aynı toprak, aynı el — üç farklı biçim. Her sofra için bir Akçal.
          </p>
        </div>

        <div className="products">
          <div className="product reveal">
            <div className="tag">01 · Günlük</div>
            <div className="product-visual">
              <svg viewBox="0 0 120 280" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#6B7A3A" stopOpacity="0.6"/>
                    <stop offset="0.5" stopColor="#8A9147" stopOpacity="0.9"/>
                    <stop offset="1" stopColor="#4E5A28" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <rect x="44" y="0" width="32" height="16" fill="#2A2520"/>
                <path d="M50 14 L50 40 Q50 50 44 60 L38 80 Q32 92 32 110 L32 260 Q32 275 50 278 L70 278 Q88 275 88 260 L88 110 Q88 92 82 80 L76 60 Q70 50 70 40 L70 14 Z" fill="url(#g1)" stroke="#2A2520" strokeWidth="0.8"/>
                <rect x="40" y="140" width="40" height="80" fill="#F6F1E4" stroke="#2A2520" strokeWidth="0.3"/>
                <text x="60" y="162" textAnchor="middle" fontFamily="Fraunces" fontSize="10" fill="#2A2520">Akçal</text>
                <text x="60" y="178" textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="6" fill="#6B7A3A">Naturel</text>
                <line x1="46" y1="186" x2="74" y2="186" stroke="#B67A3E" strokeWidth="0.3"/>
                <text x="60" y="208" textAnchor="middle" fontFamily="Inter" fontSize="4" letterSpacing="1" fill="#5E554B">1000 ML</text>
              </svg>
            </div>
            <h3>Naturel <em>Sızma</em></h3>
            <p className="desc">Soğuk sıkım. Günlük kullanım için sade, dürüst bir yağ.</p>
            <div className="specs">
              <div><span>Hacim</span> <span className="spec-v">1 L</span></div>
              <div><span>Asit</span> <span className="spec-v">&lt; 0.8%</span></div>
              <div><span>Hasat</span> <span className="spec-v">2025</span></div>
            </div>
          </div>

          <div className="product reveal delay-1">
            <div className="tag">02 · Erken hasat</div>
            <div className="product-visual">
              <svg viewBox="0 0 120 280" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#4E5A28" stopOpacity="0.85"/>
                    <stop offset="0.5" stopColor="#3A4A1E" stopOpacity="0.95"/>
                    <stop offset="1" stopColor="#2A3810" stopOpacity="0.9"/>
                  </linearGradient>
                </defs>
                <rect x="44" y="0" width="32" height="14" fill="#B67A3E"/>
                <rect x="44" y="12" width="32" height="4" fill="#2A2520"/>
                <path d="M50 14 L50 50 Q50 58 46 66 L38 100 Q32 115 32 135 L32 255 Q32 275 50 278 L70 278 Q88 275 88 255 L88 135 Q88 115 82 100 L74 66 Q70 58 70 50 L70 14 Z" fill="url(#g2)" stroke="#2A2520" strokeWidth="0.8"/>
                <rect x="40" y="145" width="40" height="85" fill="#2A2520"/>
                <text x="60" y="168" textAnchor="middle" fontFamily="Fraunces" fontSize="10" fill="#F6F1E4">Akçal</text>
                <text x="60" y="184" textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="6" fill="#D9A873">Erken Hasat</text>
                <line x1="46" y1="192" x2="74" y2="192" stroke="#D9A873" strokeWidth="0.3"/>
                <text x="60" y="210" textAnchor="middle" fontFamily="Inter" fontSize="4" letterSpacing="1" fill="#D9A873">500 ML</text>
              </svg>
            </div>
            <h3>Erken <em>Hasat</em></h3>
            <p className="desc">Ekim başında yeşil zeytinden. Yoğun, keskin, belirgin bir aroma.</p>
            <div className="specs">
              <div><span>Hacim</span> <span className="spec-v">500 ML</span></div>
              <div><span>Asit</span> <span className="spec-v">&lt; 0.3%</span></div>
              <div><span>Hasat</span> <span className="spec-v">Ekim 2025</span></div>
            </div>
          </div>

          <div className="product reveal delay-2">
            <div className="tag">03 · Endüstri</div>
            <div className="product-visual">
              <svg viewBox="0 0 140 280" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#B67A3E" stopOpacity="0.7"/>
                    <stop offset="0.5" stopColor="#D9A873" stopOpacity="0.95"/>
                    <stop offset="1" stopColor="#8A5A2A" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <rect x="30" y="0" width="80" height="18" fill="#2A2520"/>
                <rect x="22" y="16" width="96" height="24" fill="url(#g3)" stroke="#2A2520" strokeWidth="0.8"/>
                <path d="M22 38 L22 268 Q22 278 40 278 L100 278 Q118 278 118 268 L118 38 Z" fill="url(#g3)" stroke="#2A2520" strokeWidth="0.8"/>
                <rect x="32" y="120" width="76" height="110" fill="#F6F1E4" stroke="#2A2520" strokeWidth="0.3"/>
                <text x="70" y="148" textAnchor="middle" fontFamily="Fraunces" fontSize="14" fill="#2A2520">Akçal</text>
                <text x="70" y="166" textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize="8" fill="#6B7A3A">Riviera</text>
                <line x1="42" y1="174" x2="98" y2="174" stroke="#B67A3E" strokeWidth="0.3"/>
                <text x="70" y="196" textAnchor="middle" fontFamily="Inter" fontSize="5" letterSpacing="1" fill="#5E554B">5 LİTRE · TENEKE</text>
              </svg>
            </div>
            <h3>Riviera <em>Teneke</em></h3>
            <p className="desc">Toplu kullanım ve mutfak için. Dengeli asit, temiz lezzet.</p>
            <div className="specs">
              <div><span>Hacim</span> <span className="spec-v">5 L</span></div>
              <div><span>Asit</span> <span className="spec-v">&lt; 1%</span></div>
              <div><span>Kullanım</span> <span className="spec-v">Mutfak</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Kalite() {
  const badges = [
    { code: 'HT-DB · 30.10.2006', title: 'İşaretleme Yetkisi', meta: 'Türkiye Cumhuriyeti tarım izlenebilirlik tescili' },
    { code: 'FDR-TR · Gıda', title: 'Gıda Üretim İzni', meta: 'Tarım ve Orman Bakanlığı' },
    { code: 'ISO · Devam', title: 'Kalite Yönetim', meta: 'Modern tesis standartları' },
    { code: 'NAT · Sızma', title: 'Naturel Vasfı', meta: 'Soğuk sıkım, < 0.8% asit' },
  ]

  return (
    <section className="kalite" id="kalite">
      <div className="container">
        <div className="section-label reveal"><span className="num">05</span> / Kalite & Sertifika</div>
        <h2 className="section-title reveal delay-1">Bir <em>mühür,</em> binlerce <em>söz.</em></h2>

        <div className="kalite-grid">
          <div className="kalite-body reveal">
            <p>
              30 Ekim 2006'da aldığımız <strong className="kalite-strong">HT-DB işaretleme yetkisi</strong>, üreticiden sofraya uzanan zincirin her halkasını tescillemektedir. Her parti, hangi tarladan, hangi günde, hangi hatta işlendiğini belgeler.
            </p>
            <p>
              Teknik teklif süreçlerimizde müşteri maliyetini merkeze alırız. Kalite ile rekabetçi fiyatın çelişmediğini her siparişte kanıtlarız.
            </p>
            <div className="kalite-badges">
              {badges.map((b) => (
                <div className="badge-card" key={b.code}>
                  <div className="code">{b.code}</div>
                  <div className="title">{b.title}</div>
                  <div className="meta">{b.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal delay-1">
            <div className="stamp">
              <div className="stamp-ring"></div>
              <div className="stamp-ring inner"></div>
              <div className="stamp-center">
                <div className="ht">HT-DB</div>
                <div className="db">İŞARETLEME · YETKİ</div>
                <div className="date">30 · 10 · 2006 · MERSİN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cografya() {
  return (
    <section className="cografya" id="cografya">
      <div className="container">
        <div className="section-label reveal"><span className="num">06</span> / Coğrafya</div>
        <h2 className="section-title reveal delay-1">Silifke'nin <em>taşlı tepeleri.</em></h2>

        <div className="cografya-grid">
          <div className="cografya-body reveal">
            <h3>Keben, Silifke / Mersin</h3>
            <p>Toros eteklerinde, Akdeniz'e bakan kireçli toprak. Uzun güneş, serin gece — iyi zeytin için mükemmel ritim.</p>
            <p>Fabrika 1962'den bu yana aynı yerde. Zeytinliklerin bir kısmı da hâlâ kapı komşusu.</p>
            <div className="coord-row">
              <div><div className="k">Konum</div><div className="v">36.38°N</div></div>
              <div><div className="k">Boylam</div><div className="v">33.93°E</div></div>
              <div><div className="k">Rakım</div><div className="v">~340m</div></div>
            </div>
          </div>

          <div className="reveal delay-1">
            <div className="olive-photo-frame">
              <img src="/zeytin-fotor_orig.jpg" alt="Keben Silifke zeytin ağaçları" />
              <div className="olive-photo-caption">Silifke · Keben Köyü zeytinlikleri</div>
            </div>
          </div>
        </div>

        <div className="map-embed-section reveal">
          <div className="map-embed-label">
            <div>
              <div className="k">Fabrika Konumu</div>
              <div className="v">Keben Mahallesi No: 125, Silifke / Mersin</div>
            </div>
          </div>
          <div className="map-embed-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.875842076185!2d33.745560999999995!3d36.4363848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d921d672380847%3A0x83d3783b853860dc!2sAk%C3%A7al%20Zeytinyagi%20Fabrikasi!5e0!3m2!1str!2str!4v1767463433252!5m2!1str!2str"
              width="100%" height="100%"
              style={{border: 0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akçal Zeytinyağı Fabrikası Konumu"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Iletisim() {
  const contacts = [
    { role: 'Yönetici', name: 'Sadık Akçal', tel: '+905325522801', display: '0 532 552 28 01' },
    { role: 'Yönetici', name: 'Ali Akçal', tel: '+905325279407', display: '0 532 527 94 07' },
    { role: 'Satış', name: 'Ali Şen', tel: '+905334873651', display: '0 533 487 36 51' },
    { role: 'E-posta', name: 'info@akcalzeytin.com', tel: 'mailto:info@akcalzeytin.com', display: 'Ticari & numune talepleri', isEmail: true },
  ]

  return (
    <section className="iletisim" id="iletisim">
      <div className="container">
        <div className="section-label reveal"><span className="num">07</span> / İletişim</div>
        <h2 className="section-title reveal delay-1">Bir <em>şişe</em> uzağınızdayız.</h2>

        <div className="iletisim-grid">
          <div className="iletisim-body reveal">
            <p>Toptan sipariş, numune talebi ya da fabrika ziyareti için doğrudan ulaşın.</p>
            <div className="address">
              <div className="k">Adres</div>
              <div className="v">Keben Mahallesi No: 125<br/>Silifke / Mersin</div>
            </div>
            <div className="factory-phone">
              <div className="k">Fabrika</div>
              <a href="tel:+903247346472">+90 324 734 64 72</a>
            </div>
          </div>

          <div className="contacts reveal delay-1">
            {contacts.map((c) => (
              <div className="contact-card" key={c.name}>
                <div className="role">{c.role}</div>
                <div className="name">{c.name}</div>
                <a href={c.isEmail ? c.tel : `tel:${c.tel}`} className="phone">
                  <PhoneIcon />
                  {c.display}
                </a>
              </div>
            ))}
          </div>
        </div>

        <footer>
          <div className="left">
            <span>© 2026 · Akçal Gıda</span>
            <span>Ltd. Şti.</span>
          </div>
          <div>1962 — Silifke / Mersin</div>
        </footer>
      </div>
    </section>
  )
}

export default function App() {
  useReveal()
  useCounter()
  useProcessFlow()
  useScrollEffects()

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Hikaye />
      <Aile />
      <Uretim />
      <Urunler />
      <Kalite />
      <Cografya />
      <Iletisim />
    </>
  )
}
