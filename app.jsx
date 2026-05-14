// sh4wn — main app (white theme, hot pink accent, casual copy)

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "terminal",
  "accent": "#ff2d7e",
  "easter": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAKS_DEFAULTS);
  const [easter, setEaster] = React.useState(null);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
  }, [t.accent]);

  // Escape closes easter overlay
  React.useEffect(() => {
    if (!easter) return;
    const onEsc = (e) => { if (e.key === 'Escape') setEaster(null); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [easter]);

  // Page-wide easter eggs — typed anywhere (not in inputs/terminal)
  React.useEffect(() => {
    if (!t.easter) return;
    let buf = '';
    const triggers = [
      ['whoami',   'whoami'],
      ['sudo',     'sudo'],
      ['shawn',    'shawn'],
      ['verse',    'verse'],
      ['boba',     'boba'],
    ];
    const onKey = (e) => {
      if (e.target.matches('input, textarea')) return;
      buf = (buf + e.key.toLowerCase()).slice(-16);
      for (const [trigger, kind] of triggers) {
        if (buf.endsWith(trigger)) { setEaster(kind); buf = ''; return; }
      }
    };
    window.addEventListener('keydown', onKey);
    // Allow the terminal command "verse" to trigger the same overlay
    const onEgg = (e) => setEaster(e.detail);
    window.addEventListener('sh4wn:egg', onEgg);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('sh4wn:egg', onEgg);
    };
  }, [t.easter]);

  const Hero = t.hero === 'protein' ? window.HeroProtein : window.HeroTerminal;

  return (
    <>
      <div className="grain" />

      <nav className="nav" data-screen-label="00 Nav">
        <div className="shell nav-row">
          <a href="#top" className="nav-brand">
            <span className="dot" />
            <span>sh4wn</span>
          </a>
          <div className="nav-links">
            <a href="#work">work</a>
            <a href="#about">about</a>
            <a href="#beyond">awards</a>
            <a href="#research">research</a>
            <a href="#experience">experience</a>
            <a href="#skills">skills</a>
          </div>
          <a href="mailto:shawnli1028@gmail.com" className="nav-cta">get in touch ↗</a>
        </div>
      </nav>

      <main id="top">

        {/* ============================== HERO ============================== */}
        <section className="shell hero" data-screen-label="01 Hero">
          <div className="hero-switcher">
            {[
              { id: 'terminal', label: '_' },
              { id: 'protein',  label: '§' },
            ].map((h) => (
              <button key={h.id}
                      className={t.hero === h.id ? 'active' : ''}
                      onClick={() => setTweak('hero', h.id)}
                      title={h.id}>
                {h.label}
              </button>
            ))}
          </div>

          <div className="hero-left">
            <div className="hero-tag">
              <span className="live" />
              <span>BUILDING CAPA · PENDING PATENT · TARGETING ARXIV</span>
            </div>

            <h1 className="h-display hero-name" style={{marginTop: 28}}>
              Huanxuan Li
              <span className="alt">/ ʃɔːn / · 李欢轩 · sh4wn</span>
            </h1>

            <div className="hero-roles">
              <span>engineer</span><span>researcher</span><span>builder</span><span>leader</span>
            </div>

            <p className="hero-bio">
              Huanxuan, also known as Shawn, is a junior at Thomas Jefferson High
              School for Science & Technology. Incoming Researcher @ Children's National,
              Building at the intersection of
              <strong> AI, biomedicine, and robotics.</strong>
            </p>

            <div className="hero-links">
              <a href="https://github.com/sh4wn27" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/huanxuan-li-b99ba72a5/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://www.instagram.com/sh4wn.27/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="mailto:shawnli1028@gmail.com">Email ↗</a>
            </div>
          </div>

          <div className="hero-right">
            <Hero />
          </div>
        </section>

        {/* ============================== STATS ============================== */}
        <section className="shell" data-screen-label="02 Stats">
          <div className="stats">
            <div className="stat">
              <div className="n">7000<span className="unit"></span></div>
              <div className="lbl">Students reached</div>
              <div className="desc">Growing Up with Robotics, international</div>
            </div>
            <div className="stat">
              <div className="n">$21.5<span className="unit">k+</span></div>
              <div className="lbl">Raised for STEM</div>
              <div className="desc">Across schools, camps, and chapters</div>
            </div>
            <div className="stat">
              <div className="n">8000<span className="unit">×</span></div>
              <div className="lbl">Users reached</div>
              <div className="desc">CAPA · SKINAI</div>
            </div>
            <div className="stat">
              <div className="n">300<span className="unit">+</span></div>
              <div className="lbl">Service hours</div>
              <div className="desc">Community impact</div>
            </div>
          </div>
        </section>

        {/* ============================== WORK ============================== */}
        <section id="work" className="shell" data-screen-label="03 Work">
          <div className="sec-head">
            <span><span className="index">/ 01</span> · selected work</span>
            <span>6 projects · 2024–2026</span>
          </div>
          <h2 className="h-section" style={{marginBottom: 48, maxWidth: '16ch'}}>
            Projects & Services.
          </h2>
          <p className="dim" style={{maxWidth: '52ch', fontFamily:'var(--font-display)', fontSize: 22, lineHeight: 1.35, marginBottom: 56}}>
            Six projects and services across ML, computer vision, competitive
            robotics, and community outreach.
          </p>

          <div className="proj-grid">
            <article className="proj featured">
              <div className="proj-vis vis-capa">
                <span className="proj-num">01</span>
                <span className="proj-status"><span className="d" />ACTIVE · PENDING PATENT</span>
                <ProjectCapaVis />
                <span className="proj-vis-label">[ capa.architecture.dwg ]</span>
              </div>
              <div className="proj-body">
                <div className="proj-tags">
                  <span>Machine Learning</span><span>Transplant Immunology</span><span>Open Source</span>
                </div>
                <h3>CAPA</h3>
                <p className="sub">Computational Architecture for Predicting Alloimmunity</p>
                <p className="desc">
                  An open-source ML framework using ESM-2 protein language model
                  embeddings and deep competing-risks survival analysis (DeepHit)
                  to predict GvHD, relapse, and transplant-related mortality in
                  pediatric HSCT. Features a cross-attention interaction network
                  over donor-recipient HLA pairs.
                </p>
                <div className="stack">Python · PyTorch · FastAPI · Next.js</div>
                <div className="proj-links">
                  <a href="https://github.com/sh4wn27/capa" target="_blank" rel="noreferrer">GitHub ↗</a>
                  <a href="https://capa-rho.vercel.app/about" target="_blank" rel="noreferrer">Website ↗</a>
                </div>
              </div>
            </article>

            <article className="proj">
              <div className="proj-vis vis-skin">
                <span className="proj-num">02</span>
                <span className="proj-status"><span className="d" />ACTIVELY OPERATING</span>
                <ProjectSkinVis />
                <span className="proj-vis-label">[ skinai.cv.dwg ]</span>
              </div>
              <div className="proj-body">
                <div className="proj-tags"><span>AI/ML</span><span>Computer Vision</span><span>Startup</span></div>
                <h3>SkinAI</h3>
                <p className="sub">Computer Vision Skin Analysis Platform</p>
                <p className="desc">
                  AI-powered skin analysis platform with thousands of users and
                  a pending patent. Uses computer vision for dermatological
                  screening. Built from the ground up as a solo founder.
                </p>
                <div className="stack">Computer Vision · Python · React</div>
                <div className="proj-links">
                  <a href="https://github.com/sh4wn27/skinai" target="_blank" rel="noreferrer">GitHub ↗</a>
                  <a href="https://skinai-silk.vercel.app/" target="_blank" rel="noreferrer">Website ↗</a>
                </div>
              </div>
            </article>

            <article className="proj">
              <div className="proj-vis vis-fuse">
                <span className="proj-num">03</span>
                <span className="proj-status"><span className="d" />2ND · NOVA REGIONAL</span>
                <ProjectFuseVis />
                <span className="proj-vis-label">[ fuse.app.dwg ]</span>
              </div>
              <div className="proj-body">
                <div className="proj-tags"><span>Mobile App</span><span>Full Stack</span><span>Competition</span></div>
                <h3>FBLA Fuse</h3>
                <p className="sub">Chapter Management Mobile App</p>
                <p className="desc">
                  Chapter management mobile app built for FBLA. 2nd place NOVA
                  Regional in Mobile App Development. Full-stack with React
                  Native and AWS backend.
                </p>
                <div className="stack">React Native · AWS · TypeScript</div>
                <div className="proj-links">
                  <a href="https://fblafuse.com/" target="_blank" rel="noreferrer">Website ↗</a>
                  <a href="https://github.com/ytouri/fbla-fuse" target="_blank" rel="noreferrer">GitHub ↗</a>
                </div>
              </div>
            </article>

            <article className="proj">
              <div className="proj-vis vis-ftc">
                <span className="proj-num">04</span>
                <span className="proj-status"><span className="d" />CHESAPEAKE CHAMPIONSHIP</span>
                <ProjectFtcVis />
                <span className="proj-vis-label">[ ftc.14607.dwg ]</span>
              </div>
              <div className="proj-body">
                <div className="proj-tags"><span>Competitive Robotics</span><span>Engineering</span><span>Captain</span></div>
                <h3>FTC 14607 — Robot Uprising</h3>
                <p className="sub">Robot Uprising · Team Captain</p>
                <p className="desc">
                  Team captain for Robot Uprising. Competed at FTC Chesapeake
                  Championship. Led mechanical design and autonomous
                  programming. Drove strategy and systems integration.
                </p>
                <div className="stack">Java · CAD · FTC SDK</div>
                <div className="proj-links">
                  <a href="https://www.robotuprising.org/" target="_blank" rel="noreferrer">Website ↗</a>
                </div>
              </div>
            </article>

            <article className="proj">
              <div className="proj-vis vis-gur">
                <span className="proj-num">05</span>
                <span className="proj-status"><span className="d" />ACTIVE</span>
                <ProjectGurVis />
                <span className="proj-vis-label">[ gur.reach.map ]</span>
              </div>
              <div className="proj-body">
                <div className="proj-tags"><span>Nonprofit</span><span>STEM Education</span><span>Leadership</span></div>
                <h3>Growing Up with Robotics</h3>
                <p className="sub">International 501(c)(3) Nonprofit</p>
                <p className="desc">
                  International nonprofit I founded. Robotics and STEM
                  education for underserved communities. 7,000+ students
                  reached across multiple countries. Executive Director.
                </p>
                <div className="stack">501(c)(3) · 300+ service hours · 7,000+ students</div>
                <div className="proj-links">
                  <a href="https://growingupwithrobotics.org" target="_blank" rel="noreferrer">Website ↗</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============================== ABOUT ============================== */}
        <section id="about" className="shell" data-screen-label="04 About">
          <div className="sec-head">
            <span><span className="index">/ 02</span> · about</span>
            <span>the story behind the work</span>
          </div>

          <h2 className="h-section" style={{marginBottom: 56, maxWidth: '14ch'}}>
            The story behind the work.
          </h2>

          <div className="scrap">
            <div className="scrap-prose">
              <p>
                Hey! I'm a junior at TJHSST in Northern Virginia. I was born in
                <strong> 新丰</strong> and immigrated from China in 2019. After
                arriving in the U.S., I taught myself English, started going to
                church and found a close group of friends. At the age of 13, I
                received a cord blood transplant at Children's National Hospital
                to treat beta-thalassemia, a genetic disorder that shaped my
                life at a very young age. Since then, transplant immunology and
                GvHD research haven't just been academic interests to me.
                They've been deeply personal.
              </p>
              <p className="dim">
                I've conducted research at Stanford through iGEM, at George
                Mason University through ASSIP, and about to begin my
                senior year long research at Children's National Hospital.
                CAPA is my effort to turn that lived experience into something
                that could genuinely help the next child in that situation,
                while also contributing to the broader research that improves
                outcomes and advances the field.
              </p>

              <div className="verse">
                But they who wait for the Lord shall renew their strength;
                they shall mount up with wings like eagles; they shall run and
                not be weary; they shall walk and not faint.
                <cite>— Isaiah 40:31</cite>
              </div>
            </div>

            <div className="scrap-cards">
              <div className="card passport">
                <div className="lbl"><span>// passport</span><span>VERIFIED</span></div>
                <div className="stamp">
                  <div className="meta">
                    <b>新丰 → Northern Virginia</b><br />
                    immigrated 2019 · 6 years<br />
                    <span style={{color:'var(--accent)'}}>mandarin · english</span>
                  </div>
                </div>
              </div>

              <div className="card now">
                <div className="lbl"><span>// currently</span><span>LIVE</span></div>
                <div className="row">
                  <div className="b">▷</div>
                  <div>writing <b>CAPA</b> manuscript for arXiv</div>
                </div>
                <div className="row">
                  <div className="b">♪</div>
                  <div>practicing <b>Chopin Op. 64 No. 1</b></div>
                </div>
                <div className="row">
                  <div className="b">☕</div>
                  <div>weekend shifts at <b>Tea-Do Fairfax</b></div>
                </div>
                <div className="row">
                  <div className="b">✚</div>
                  <div>starting year-long @ <b>Children's National</b> (July)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================== AWARDS / ACTIVITIES / COURSES ============================== */}
        <section id="beyond" className="shell" data-screen-label="05 Awards">
          <div className="sec-head">
            <span><span className="index">/ 03</span> · awards · activities · coursework</span>
            <span>recognition, clubs, classes</span>
          </div>

          <h2 className="h-section" style={{marginBottom: 56, maxWidth: '18ch'}}>
            Awards, Activities & Coursework.
          </h2>

          <div className="aac">
            {/* Awards */}
            <div className="aac-block">
              <div className="aac-head">
                <span className="aac-num">01</span>
                <span className="aac-title">Awards & Honors</span>
                <span className="aac-count">9</span>
              </div>
              <ul className="aac-list">
                <li><span>President's Volunteer Service Award</span><em>Federal</em></li>
                <li><span>President's Education Award</span><em>Federal</em></li>
                <li><span>FIRST FTC Inspire II <span className="dim">×2</span></span><em>Robotics</em></li>
                <li><span>FIRST FTC Motivate</span><em>Robotics</em></li>
                <li><span>FIRST FTC Connect</span><em>Robotics</em></li>
                <li><span>FBLA NOVA Regional — 2nd Place</span><em>Business</em></li>
                <li><span>ABRSM Grade 8 Piano Practical</span><em>Music</em></li>
                <li><span>ABRSM Grade 5 Music Theory</span><em>Music</em></li>
                <li><span>NoVA Music Spring Festival — Superior Grade</span><em>Music</em></li>
              </ul>
            </div>

            {/* School Activities */}
            <div className="aac-block">
              <div className="aac-head">
                <span className="aac-num">02</span>
                <span className="aac-title">School Activities</span>
                <span className="aac-count">8</span>
              </div>
              <div className="aac-chips">
                <span className="aac-chip">National Honor Society</span>
                <span className="aac-chip">National Chinese Honor Society</span>
                <span className="aac-chip">Competitive Robotics Club</span>
                <span className="aac-chip">Computer Team</span>
                <span className="aac-chip">Varsity Policy Debate</span>
                <span className="aac-chip">Varsity Lacrosse</span>
                <span className="aac-chip">Investment Club</span>
                <span className="aac-chip">Future Business Leaders of America</span>
              </div>
            </div>

            {/* Coursework */}
            <div className="aac-block aac-courses">
              <div className="aac-head">
                <span className="aac-num">03</span>
                <span className="aac-title">Coursework</span>
                <span className="aac-count">20</span>
              </div>

              <div className="aac-subhead">
                <span>AP</span>
                <span className="dim">14 classes</span>
              </div>
              <div className="aac-chips">
                <span className="aac-chip">Chinese</span>
                <span className="aac-chip">CS A+</span>
                <span className="aac-chip">Statistics</span>
                <span className="aac-chip">US History</span>
                <span className="aac-chip">Human Geography</span>
                <span className="aac-chip">Precalculus BC</span>
                <span className="aac-chip">Physics 1</span>
                <span className="aac-chip">Microeconomics</span>
                <span className="aac-chip">Macroeconomics</span>
                <span className="aac-chip">Calculus BC</span>
                <span className="aac-chip">Physics 2</span>
                <span className="aac-chip">Physics C</span>
                <span className="aac-chip">English Lang & Comp</span>
                <span className="aac-chip">US Gov & Politics</span>
              </div>

              <div className="aac-subhead" style={{marginTop: 22}}>
                <span>AV — TJ Advanced</span>
                <span className="dim">6 classes</span>
              </div>
              <div className="aac-chips">
                <span className="aac-chip">Computer Vision</span>
                <span className="aac-chip">Artificial Intelligence</span>
                <span className="aac-chip">Mobile App Dev</span>
                <span className="aac-chip">Web App Dev</span>
                <span className="aac-chip">Statistics</span>
                <span className="aac-chip">Research</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================== RESEARCH ============================== */}
        <section id="research" className="shell" data-screen-label="06 Research">
          <div className="sec-head">
            <span><span className="index">/ 04</span> · publications & research</span>
            <span>5 manuscripts · 1 published</span>
          </div>

          <h2 className="h-section" style={{marginBottom: 56, maxWidth: '16ch'}}>
            Research & Writing.
          </h2>

          <div className="res-list">
            <ResEntry
              year="2026"
              status="solo-authored · in review"
              tags={['Survival Analysis', 'Clinical ML']}
              title="Competing-Risks Survival Analysis for Pediatric HSCT"
              desc="Applying competing-risks survival analysis and ML to predict acute GvHD in 187 pediatric bone marrow transplant patients. Severe aGvHD risk plateaus by day 100 (CIF=0.214). LASSO-selected Cox model achieved omnibus significance (p=0.002)."
              venue="2026 — in preparation"
              links={[
                ['GitHub', 'https://github.com/sh4wn27/heta'],
                ['Manuscript', 'https://drive.google.com/file/d/1fkfP2FvaFQnIBkswdhD0Kdv_UEYWoQde/view?usp=sharing'],
              ]}
            />
            <ResEntry
              year="2026"
              status="in preparation"
              tags={['Open Source', 'Protein LM', 'DeepHit']}
              title="CAPA: Computational Architecture for Predicting Alloimmunity"
              desc="Full framework paper describing the ESM-2 + cross-attention + DeepHit architecture for structure-aware HLA mismatch scoring and competing-risks survival prediction in allogeneic HSCT."
              venue="Targeting Bioinformatics / Blood Advances"
              links={[
                ['GitHub', 'https://github.com/sh4wn27/capa'],
                ['Manuscript', 'https://drive.google.com/file/d/1_K7GRsndbUGzUCgfpq1QsB9K-7nV0Ei1/view?usp=sharing'],
              ]}
            />
            <ResEntry
              year="2025"
              status="published"
              tags={['Machine Learning', 'Materials Science']}
              title="Data-Driven Prediction of Metal-Organic Dissolution and Adhesion Using Machine Learning"
              desc="Co-authored published paper applying Random Forest and SVM models trained on 71 experimentally validated interactions to predict metal ion dissolution and adhesion using molecular descriptors and environmental variables."
              venue="GMU JSSR Vol. 7"
              links={[['DOI', 'https://doi.org/10.13021/jssr2025.5366']]}
            />
            <ResEntry
              year="2025"
              status="TJ research"
              tags={['Green AI', 'Machine Learning', 'Statistics']}
              title="Predicting Energy Consumption in CPU-Based Deep Learning Training"
              desc="Log-linear multiple regression model on 96 CPU deep learning training runs from the BUTTER-E dataset. Adj. R² = 0.9989. Model size and network depth contribute no detectable effect on CPU hardware."
              venue="TJHSST Student Research Project"
              links={[
                ['GitHub', 'https://github.com/sh4wn27/energyModel'],
                ['Manuscript', 'https://drive.google.com/file/d/1MQhRy7LX42KLS2_HnTzwhiD4NC2OXHLt/view?usp=sharing'],
              ]}
            />
            <ResEntry
              year="2025"
              status="Stanford iGEM"
              tags={['Synthetic Biology', 'Bioengineering', 'Simulation']}
              title="Modeling the equity impact of partial HLA mismatch tolerance via biodegradable stealth-polymer coatings"
              desc="Bioengineering and computational simulation research on immunocloaking strategies. Contributed to experimental design and computational analysis as part of Stanford's iGEM team."
              venue="Stanford University · iGEM"
              links={[
                ['GitHub', 'https://github.com/sh4wn27/immu'],
                ['Manuscript', 'https://drive.google.com/file/d/1geVaNpjcs4MVXzopqdzW3WCpm62E17bB/view?usp=sharing'],
              ]}
            />
          </div>
        </section>

        {/* ============================== EXPERIENCE ============================== */}
        <section id="experience" className="shell" data-screen-label="07 Experience">
          <div className="sec-head">
            <span><span className="index">/ 05</span> · professional history</span>
            <span>research · startups · nonprofit · competitive</span>
          </div>
          <h2 className="h-section" style={{marginBottom: 24, maxWidth: '18ch'}}>
            Work & Experience.
          </h2>
          <p className="dim" style={{maxWidth: '54ch', fontFamily:'var(--font-display)', fontSize: 22, lineHeight: 1.35, marginBottom: 56}}>
            Research institutions, startups, nonprofits, and competitive
            engineering — building at every level.
          </p>

          <div className="exp-list">
            <Exp now type="Research" when="JUL 2026 – present" where="Washington, D.C."
                 title="Research Intern" org="Children's National Hospital · Precision Medical Lab"
                 desc="Year-long research position in AI applications for precision medicine." />
            <Exp type="Scholar" when="JUN 2026" where="Blacksburg, VA"
                 title="Engineering Pathways Scholar" org="Virginia Tech"
                 desc="Senior track of the Pathways to Future Engineer program. Selected cohort for intensive engineering coursework and research exposure." />
            <Exp type="Research" when="2025" where="Stanford, CA"
                 title="Undergraduate Research Affiliate" org="Stanford University · iGEM"
                 desc="Contributed to the immunocloaking project modeling biodegradable stealth-polymer coatings for partial HLA mismatch tolerance." />
            <Exp type="Research" when="2025" where="Fairfax, VA"
                 title="ASSIP Research Intern" org="George Mason University"
                 desc="Aspiring Scientists Summer Internship Program. Built ML models (Random Forest, SVM) for predicting metal-organic dissolution and adhesion." />
            <Exp now type="Nonprofit" when="2022 – present" where="International · 501(c)(3)"
                 title="Founder & Executive Director" org="Growing Up with Robotics"
                 desc="Founded and lead an international nonprofit delivering robotics and STEM education to underserved communities. 7,000+ students reached, $34K+ raised, 300+ service hours." />
            <Exp now type="Project" when="2025 – present" where="Remote"
                 title="Founder & Executive Developer" org="CAPA"
                 desc="Solo-built open-source ML framework for HSCT outcome prediction. Pending patent." />
            <Exp now type="Project" when="2024 – present" where="Remote"
                 title="Founder & Executive Developer" org="SkinAI"
                 desc="Solo founder of a computer-vision dermatological screening platform. Thousands of users, pending patent." />
            <Exp now type="Robotics" when="2024 – present" where="Alexandria, VA"
                 title="Team Captain" org="FTC Team 14607 Robot Uprising"
                 desc="Captain of competitive FTC team. Led mechanical design, autonomous programming, and strategy through Chesapeake Championship." />
            <Exp now type="Volunteer" when="Summer 2025 – present" where="Fairfax, VA"
                 title="Summer Camp Director & Volunteer" org="Area Youth Ministry"
                 desc="Directed a week-long robotics camp serving 50+ students in partnership with FTC 14607. Managed 20+ volunteers." />
            <Exp now type="Part-time" when="2025 – present" where="Fairfax, VA"
                 title="Barista" org="Tea-Do Fairfax"
                 desc="Handle drink production and cross-team communication in a fast-paced service environment." />
          </div>
        </section>

        {/* ============================== SKILLS ============================== */}
        <section id="skills" className="shell" data-screen-label="08 Skills">
          <div className="sec-head">
            <span><span className="index">/ 06</span> · skills & tools</span>
            <span>52 things</span>
          </div>
          <h2 className="h-section" style={{marginBottom: 56, maxWidth: '14ch'}}>
            Technical Expertise.
          </h2>

          <div className="skills">
            <SkillGroup name="AI / ML & Statistics" count={12} items={['PyTorch','TensorFlow','Scikit-learn','Deep Learning','Computer Vision','OpenCV','ONNX','Reinforcement Learning','Survival Analysis','Competing Risks','Statistical Modeling','ESM-2 · Protein LLM']} />
            <SkillGroup name="Biomedical & Research" count={7} items={['Immunology','Immunogenomics','HLA Typing','HSCT Outcome Modeling','Bioinformatics','Research Methods','Scientific Writing']} />
            <SkillGroup name="Engineering & Hardware" count={9} items={['CAD','3D Printing','Robotics','Circuits','PCB Design','Embedded Systems','Raspberry Pi','BLDC Motor Control','Linux']} />
            <SkillGroup name="Web & Software" count={7} items={['React','Next.js','TypeScript','Tailwind CSS','Framer Motion','FastAPI','Git']} />
            <SkillGroup name="Programming Languages" count={8} items={['Python','C++','C','Java','JavaScript','R','SQL','Bash']} />
            <SkillGroup name="Leadership & Music" count={9} items={['Nonprofit Mgmt','Curriculum Design','Event Ops','Public Speaking','Mentoring','ABRSM Gr. 8 Piano','ABRSM Gr. 5 Theory','Music Instruction','English · Mandarin']} />
          </div>
        </section>

        {/* ============================== CONTACT ============================== */}
        <section id="contact" className="shell contact" data-screen-label="09 Contact">
          <div>
            <div className="eyebrow" style={{marginBottom: 18}}>/ 07 · contact</div>
            <h2>
              Reach out!
            </h2>
            <p className="dim" style={{maxWidth: '40ch', marginTop: 24, fontFamily:'var(--font-display)', fontSize: 20}}>
              Research collaborations, internship inquiries, or just want to
              connect — reach out.
            </p>
          </div>
          <div className="right">
            <a href="mailto:shawnli1028@gmail.com">
              <span><span className="sub">// primary</span><br />shawnli1028@gmail.com</span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://github.com/sh4wn27" target="_blank" rel="noreferrer">
              <span><span className="sub">// code</span><br />github.com/sh4wn27</span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://www.linkedin.com/in/huanxuan-li-b99ba72a5/" target="_blank" rel="noreferrer">
              <span><span className="sub">// professional</span><br />linkedin · huanxuan li</span>
              <span className="arrow">↗</span>
            </a>
            <a href="https://www.instagram.com/sh4wn.27/" target="_blank" rel="noreferrer">
              <span><span className="sub">// personal</span><br />instagram · @sh4wn.27</span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </section>

        <footer>
          <div className="shell row">
            <div>© 2026 sh4wn.org · TJHSST · Northern Virginia</div>
            <div className="mute" style={{letterSpacing:'0.04em'}}>designed + built by shawn</div>
          </div>
        </footer>
      </main>

      {easter && <EasterEgg kind={easter} onClose={() => setEaster(null)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakSelect label="Right-side visual" value={t.hero}
                       options={[
                         {value:'terminal', label:'Interactive terminal'},
                         {value:'protein',  label:'Protein ribbon · CAPA'},
                       ]}
                       onChange={(v) => setTweak('hero', v)} />
        </TweakSection>
        <TweakSection label="Accent">
          <TweakColor label="Accent color" value={t.accent}
                      options={['#ff2d7e', '#ff5fa2', '#ff8a3d', '#7a5af7', '#111111']}
                      onChange={(v) => setTweak('accent', v)} />
        </TweakSection>
        <TweakSection label="Surprises">
          <TweakToggle label="Easter eggs" value={t.easter}
                       onChange={(v) => setTweak('easter', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ============================================================
// Reused subcomponents
// ============================================================

function ResEntry({ year, status, tags, title, desc, venue, links }) {
  return (
    <article className="res">
      <div>
        <div className="yr">{year}</div>
        <div className="mono mute" style={{fontSize: 10, marginTop: 4, letterSpacing:'0.06em'}}>{status}</div>
      </div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div className="tags">{tags.map((t, i) => <span key={i}>{t}</span>)}</div>
        <div className="venue">{venue}</div>
      </div>
      <div className="links">
        {links.map(([label, url], i) => (
          <a key={i} href={url} target="_blank" rel="noreferrer">{label} ↗</a>
        ))}
      </div>
    </article>
  );
}

function Exp({ now, type, when, where, title, org, desc }) {
  return (
    <div className={`exp ${now ? 'now' : ''}`}>
      <div className="meta">
        <b>{type.toUpperCase()}</b>
        {when}<br />
        <span style={{color:'var(--ink-mute)'}}>{where}</span>
      </div>
      <div>
        <h4>{title}</h4>
        <div className="org">{org}</div>
      </div>
      <p>{desc}</p>
    </div>
  );
}

function SkillGroup({ name, count, items }) {
  return (
    <div className="skill-grp">
      <div className="h"><span>{name}</span><span className="n">{count}</span></div>
      <div className="chips">
        {items.map((it, i) => <span key={i} className="chip">{it}</span>)}
      </div>
    </div>
  );
}

// project visualizations
function ProjectCapaVis() {
  return (
    <svg viewBox="0 0 400 220" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <g stroke="var(--accent)" fill="none" strokeOpacity="0.8" strokeWidth="1">
        <path d="M0,140 Q60,80 130,120 T260,90 T400,130" strokeWidth="1.5" />
        <path d="M0,160 Q60,100 130,140 T260,110 T400,150" strokeOpacity="0.4" strokeDasharray="2 3" />
        {[40,90,140,190,240,290,340].map((x, i) => (
          <circle key={i} cx={x} cy={120 + Math.sin(i)*30} r="3" fill="var(--accent)" />
        ))}
      </g>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-mute)">
        <text x="14" y="40">ESM-2 → cross-attn → DeepHit</text>
        <text x="14" y="56" fill="var(--ink-dim)">survival · GvHD · relapse · TRM</text>
      </g>
    </svg>
  );
}

function ProjectSkinVis() {
  return (
    <svg viewBox="0 0 400 220" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <g stroke="#ff8a3d" fill="none">
        {Array.from({length: 8}).map((_, i) => (
          <circle key={i} cx={200} cy={120} r={20 + i*12} strokeOpacity={0.5 - i*0.05} />
        ))}
        <rect x="180" y="100" width="40" height="40" stroke="#ff8a3d" strokeDasharray="2 3" />
      </g>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-dim)">
        <text x="14" y="40">cv · skin lesion classifier</text>
        <text x="14" y="56" fill="var(--ink-mute)">conf 0.87 · dermatologist referral</text>
      </g>
    </svg>
  );
}

function ProjectFuseVis() {
  return (
    <svg viewBox="0 0 400 220" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <g stroke="#3c78c8" fill="none">
        <rect x="160" y="40" width="80" height="140" rx="8" />
        <rect x="170" y="56" width="60" height="6" rx="2" fill="#3c78c8" fillOpacity="0.3" />
        <rect x="170" y="70" width="40" height="4" rx="2" fill="#3c78c8" fillOpacity="0.3" />
        <rect x="170" y="84" width="60" height="60" rx="3" strokeOpacity="0.6" />
        <rect x="170" y="152" width="60" height="6" rx="2" fill="#3c78c8" fillOpacity="0.3" />
      </g>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-dim)">
        <text x="14" y="40">react native + aws</text>
        <text x="14" y="56" fill="var(--ink-mute)">chapter mgmt mobile</text>
      </g>
    </svg>
  );
}

function ProjectFtcVis() {
  return (
    <svg viewBox="0 0 400 220" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <g stroke="var(--accent)" fill="none">
        <rect x="140" y="80" width="120" height="80" />
        <circle cx="155" cy="170" r="14" />
        <circle cx="245" cy="170" r="14" />
        <rect x="170" y="60" width="60" height="20" />
        <line x1="160" y1="100" x2="240" y2="100" strokeDasharray="2 3" />
        <line x1="200" y1="80" x2="200" y2="160" strokeDasharray="2 3" />
      </g>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-dim)">
        <text x="14" y="40">team 14607 · captain</text>
        <text x="14" y="56" fill="var(--ink-mute)">java · cad · ftc sdk</text>
      </g>
    </svg>
  );
}

function ProjectGurVis() {
  return (
    <svg viewBox="0 0 400 220" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-dim)">
        <text x="14" y="40">global reach · 501(c)(3)</text>
        <text x="14" y="56" fill="var(--ink-mute)">7,000+ students</text>
      </g>
      <g fill="#3a3a36" fillOpacity="0.7">
        {Array.from({length: 50}).map((_, i) => {
          const x = (i * 37) % 380 + 10;
          const y = ((i * 53) % 140) + 70;
          return <circle key={i} cx={x} cy={y} r={Math.random() * 2 + 0.5} />;
        })}
        <circle cx="200" cy="120" r="6" fill="var(--accent)" />
        <circle cx="200" cy="120" r="14" fill="none" stroke="var(--accent)" strokeOpacity="0.5" />
        <circle cx="200" cy="120" r="22" fill="none" stroke="var(--accent)" strokeOpacity="0.2" />
      </g>
    </svg>
  );
}

function ProjectAymVis() {
  return (
    <svg viewBox="0 0 400 220" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      <g stroke="var(--accent)" fill="none">
        {Array.from({length: 6}).map((_, i) => (
          <circle key={i} cx={80 + i*48} cy={110} r="14" />
        ))}
        <line x1="80" y1="140" x2="320" y2="140" />
      </g>
      <g fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-dim)">
        <text x="14" y="40">summer camp · 50+ kids</text>
        <text x="14" y="56" fill="var(--ink-mute)">lego spike · cad · python</text>
      </g>
    </svg>
  );
}

// ============================================================
// VerseEgg — shows Shawn's favorite (Isaiah 40:31) + today's verse
// Fetches from bible-api.com (CORS-enabled, no key)
// ============================================================
function VerseEgg() {
  const [daily, setDaily] = React.useState({ state: 'loading' });

  // Curated rotation — a verse picked deterministically by day-of-year
  // so it stays the same all day but changes daily. Backed by bible-api.com.
  const ROTATION = React.useMemo(() => ([
    'philippians 4:13',
    'jeremiah 29:11',
    'proverbs 3:5-6',
    'romans 8:28',
    'psalm 23:1-3',
    'john 3:16',
    'matthew 6:33',
    '2 timothy 1:7',
    'joshua 1:9',
    'psalm 46:10',
    'romans 12:2',
    '1 corinthians 13:4-7',
    'galatians 5:22-23',
    'ephesians 2:8-9',
    'hebrews 11:1',
    'james 1:2-4',
    '1 peter 5:7',
    'lamentations 3:22-23',
    'matthew 11:28',
    'psalm 27:1',
    'psalm 91:1-2',
    'isaiah 41:10',
    'romans 5:8',
    'philippians 4:6-7',
    '2 corinthians 5:17',
    'psalm 119:105',
    'micah 6:8',
    'john 14:6',
    'matthew 5:14-16',
    '1 john 4:19',
  ]), []);

  React.useEffect(() => {
    let alive = true;
    const dayOfYear = (() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    })();
    const ref = ROTATION[dayOfYear % ROTATION.length];
    const url = `https://bible-api.com/${encodeURIComponent(ref)}?translation=esv`;

    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => {
        if (!alive) return;
        setDaily({
          state: 'ok',
          text: (d.text || '').trim().replace(/\s+/g, ' '),
          reference: d.reference || ref,
          translation: d.translation_name || d.translation_id || 'WEB',
        });
      })
      .catch(() => {
        if (!alive) return;
        // Fallback to no-translation endpoint (defaults to WEB) if ESV is unavailable
        fetch(`https://bible-api.com/${encodeURIComponent(ref)}`)
          .then(r => r.ok ? r.json() : Promise.reject(r.status))
          .then(d => {
            if (!alive) return;
            setDaily({
              state: 'ok',
              text: (d.text || '').trim().replace(/\s+/g, ' '),
              reference: d.reference || ref,
              translation: d.translation_name || 'WEB',
            });
          })
          .catch(() => alive && setDaily({ state: 'err', reference: ref }));
      });

    return () => { alive = false; };
  }, [ROTATION]);

  return (
    <div className="verse-egg">
      {/* My favorite */}
      <div className="ve-block">
        <div className="ve-label">
          <span className="ve-tick" /> shawn's favorite
        </div>
        <p className="ve-text">
          But they who wait for the Lord shall renew their strength;
          they shall mount up with wings like eagles; they shall run
          and not be weary; they shall walk and not faint.
        </p>
        <div className="ve-ref">— Isaiah 40:31 · ESV</div>
      </div>

      <div className="ve-divider" />

      {/* Today's verse */}
      <div className="ve-block">
        <div className="ve-label">
          <span className="ve-tick" /> today's verse
          <span className="ve-date">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {daily.state === 'loading' && (
          <div className="ve-loading">
            <span className="ve-skel" style={{width:'92%'}} />
            <span className="ve-skel" style={{width:'78%'}} />
            <span className="ve-skel" style={{width:'88%'}} />
            <span className="ve-skel" style={{width:'62%'}} />
            <span className="ve-loading-text">fetching from bible-api.com...</span>
          </div>
        )}

        {daily.state === 'ok' && (
          <>
            <p className="ve-text">"{daily.text}"</p>
            <div className="ve-ref">— {daily.reference} · {daily.translation}</div>
          </>
        )}

        {daily.state === 'err' && (
          <>
            <p className="ve-text" style={{opacity: 0.7}}>
              (couldn't reach bible-api.com from here — try opening{' '}
              <a href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(daily.reference)}`}
                 target="_blank" rel="noreferrer" style={{color:'var(--accent)'}}>
                {daily.reference}
              </a>{' '}
              directly)
            </p>
          </>
        )}
      </div>

      <div className="ve-foot">
        powered by bible-api.com · rotates daily
      </div>
    </div>
  );
}

// ============================================================
// Easter eggs — expanded
// ============================================================
function EasterEgg({ kind, onClose }) {
  const content = {
    whoami: (
      <>
        <h3>~ shawn@sh4wn</h3>
        <pre>
{`uid=27(shawn) gid=2026(tjhsst) groups=builders,researchers,
   speedcubers,pianists,FTC14607,GUR-execs,AYM-volunteers

current_dir   ./projects/capa
last_commit   "ribbon updates + bugfixes"
shell         /bin/curiosity`}
        </pre>
      </>
    ),
    sudo: (
      <>
        <h3>~ permission denied</h3>
        <pre>
{`shawn is not in the sudoers file.
this incident will not be reported, because i think it's funny.
subject line that always works: `}<span className="k">"i typed sudo"</span>
        </pre>
      </>
    ),
    shawn: (
      <>
        <h3>~ ./shawn --help</h3>
        <pre>
{`USAGE: shawn [options]

OPTIONS:
  --build              ship the next thing
  --research           ask a specific question
  --teach              show up for a kid
  --pray               isaiah 40:31
  --rest               celsius will keep me going

CONTACT:
  `}<span className="k">shawnli1028@gmail.com</span>
        </pre>
      </>
    ),
    verse: (
      <>
        <h3>~ verse</h3>
        <VerseEgg />
      </>
    ),
    boba: (
      <>
        <h3>~ boba.order</h3>
        <pre>
{`current go-to: passionfruit green tea
       50% sweet
       less ice
       crystal boba

location: tea-do fairfax
schedule: thursday + sunday evenings, saturday afternoons
status:   `}<span className="a">in stock</span>
        </pre>
      </>
    ),
    cube: (
      <>
        <h3>~ ./cube --stats</h3>
        <pre>
{`event       3x3
method      CFOP
PB          5.21s
PB avg5        ~8.98s
mood        `}<span className="a">maybe</span>
        </pre>
      </>
    ),
    hire: (
      <>
        <h3>~ ./hire-me</h3>
        <pre>
{`looking for:
  - summer 2026 research / internship
  - collabs on transplant ML / GvHD
  - clinical-ML / dermatology / robotics
  - mentors and senior advisors

what i bring:
  - 2 pending patents, 1 published paper
  - production ML in two products
  - a team and a nonprofit

contact: `}<span className="k">shawnli1028@gmail.com</span>
        </pre>
      </>
    ),
  };

  return (
    <div className="easter" onClick={onClose}>
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <span className="x" onClick={onClose}>esc / close</span>
        {content[kind]}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
