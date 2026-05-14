// Hero variants — terminal (primary, interactive) + protein ribbon

// ============================================================
// HERO 1 — Interactive Terminal
//   Real input. Lots of commands. Type "help" to see them all.
// ============================================================
function HeroTerminal() {
  const [lines, setLines] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [cmdHist, setCmdHist] = React.useState([]);
  const [histIdx, setHistIdx] = React.useState(-1);
  const [ready, setReady] = React.useState(false);
  const bodyRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // append helper
  const push = (l) => setLines(prev => [...prev, l]);

  // ──────────────────────────────────────────────────────────
  // command implementations — each returns lines to print
  // ──────────────────────────────────────────────────────────
  const COMMANDS = React.useMemo(() => ({
    help: () => [
      { kind: 'out', html: <><span className="c">commands</span></> },
      { kind: 'out', text: '  whoami       who i am, briefly' },
      { kind: 'out', text: '  ls           list what i\'m working on' },
      { kind: 'out', text: '  ls -a        list everything (incl. hidden)' },
      { kind: 'out', text: '  cat <file>   read a file (try: about, capa, faith)' },
      { kind: 'out', text: '  open <proj>  open project in new tab (capa, skinai, gur)' },
      { kind: 'out', text: '  cd <section> jump to a section (work, about, research, contact)' },
      { kind: 'out', text: '  hire         how to hire / collab with me' },
      { kind: 'out', text: '  date         current date' },
      { kind: 'out', text: '  echo <x>     repeat back' },
      { kind: 'out', text: '  clear        clear the screen' },
      { kind: 'out', text: '  ↑/↓ arrow    cycle command history' },
    ],
    whoami: () => [
      { kind: 'out', html: <><span className="k">name</span>     <span className="v">huanxuan li</span></> },
      { kind: 'out', html: <><span className="k">alias</span>    <span className="v">shawn · sh4wn · 李欢轩</span></> },
      { kind: 'out', html: <><span className="k">origin</span>   <span className="v">新丰, china → northern virginia</span></> },
      { kind: 'out', html: <><span className="k">school</span>   <span className="v">junior @ tjhsst</span></> },
      { kind: 'out', html: <><span className="k">stack</span>    <span className="c">ai/ml · biomed engineering · serving</span></> },
    ],
    ls: () => [
      { kind: 'out', html: <><span className="d">capa/</span>          ml framework, pending patent</> },
      { kind: 'out', html: <><span className="d">skinai/</span>        cv platform, thousands of users</> },
      { kind: 'out', html: <><span className="d">gur/</span>           nonprofit · 7,000+ students</> },
      { kind: 'out', html: <><span className="d">ftc-14607/</span>     robotics, team captain</> },
      { kind: 'out', html: <><span className="d">fbla-fuse/</span>     chapter mgmt app · 2nd nova</> },
      { kind: 'out', html: <><span className="d">aym/</span>           summer camp · 50+ kids</> },
    ],
    'ls -a': () => [
      { kind: 'out', html: <><span className="d">.</span></> },
      { kind: 'out', html: <><span className="d">..</span></> },
      { kind: 'out', html: <><span className="k">.faith</span>         isaiah 40:31, always</> },
      { kind: 'out', html: <><span className="k">.cube</span>          3x3 PB 5.21s </> },
      { kind: 'out', html: <><span className="k">.lacrosse</span>      #18, midfield, two-way</> },
      { kind: 'out', html: <><span className="k">.boba</span>          shifts at tea-do</> },
      { kind: 'out', html: <><span className="d">capa/</span>          ml framework</> },
      { kind: 'out', html: <><span className="d">skinai/</span>        cv platform</> },
      { kind: 'out', html: <><span className="d">gur/</span>           501(c)(3)</> },
      { kind: 'out', html: <><span className="d">ftc-14607/</span>     robotics</> },
      { kind: 'out', html: <><span className="d">fbla-fuse/</span>     mobile app</> },
      { kind: 'out', html: <><span className="d">aym/</span>           camp</> },
    ],
    'cat about': () => [
      { kind: 'out', text: 'born in 新丰, china. came to the US in 2019 not speaking english.' },
      { kind: 'out', text: 'taught myself with youtube subtitles and a lot of lacrosse highlights.' },
      { kind: 'out', text: '' },
      { kind: 'out', text: 'at 13: cord blood transplant for beta-thalassemia at children\'s national.' },
      { kind: 'out', text: 'that\'s how transplant immunology became personal, not academic.' },
      { kind: 'out', text: '' },
      { kind: 'out', html: <><span className="c">tldr: i build things so the next kid in that room has better odds.</span></> },
    ],
    'cat capa': () => [
      { kind: 'out', html: <><span className="k">name</span>        capa</> },
      { kind: 'out', html: <><span className="k">full</span>        computational architecture for predicting alloimmunity</> },
      { kind: 'out', html: <><span className="k">stack</span>       esm-2 protein LM · cross-attention · deephit</> },
      { kind: 'out', html: <><span className="k">predicts</span>    GvHD · relapse · transplant-related mortality</> },
      { kind: 'out', html: <><span className="k">status</span>      <span className="c">pending patent · arXiv soon</span></> },
      { kind: 'out', text: '' },
      { kind: 'out', html: <>tip: try <span className="c">open capa</span></> },
    ],
    'cat faith': () => [
      { kind: 'out', text: 'But they who wait for the Lord shall renew their strength;' },
      { kind: 'out', text: 'they shall mount up with wings like eagles;' },
      { kind: 'out', text: 'they shall run and not be weary;' },
      { kind: 'out', text: 'they shall walk and not faint.' },
      { kind: 'out', html: <><span className="c">— isaiah 40:31</span></> },
    ],
    'cat .cube': () => [
      { kind: 'out', text: '3x3 · CFOP · PB 5.21s · avg5 ~ 8.89s' },
    ],
    'cat .piano': () => [
      { kind: 'out', text: 'ABRSM grade 8 practical · grade 5 theory · instructor on weekends' },
    ],
    'cat .lacrosse': () => [
      { kind: 'out', text: 'varsity · #18 · midfield · two-way' },
      { kind: 'out', text: 'run hard, breathe harder, repeat.' },
    ],
    'cat .boba': () => [
      { kind: 'out', html: <>tea-do fairfax · weekend barista. <span className="c">current go-to: passionfruit green tea, 50% sweet, less ice.</span></> },
    ],
    sudo: () => [
      { kind: 'out', html: <><span className="warn">shawn is not in the sudoers file.</span></> },
      { kind: 'out', text: 'this incident will not be reported. (mostly because i think it\'s funny.)' },
    ],
    rm: () => [{ kind: 'out', html: <><span className="warn">nice try.</span></> }],
    'rm -rf /': () => [{ kind: 'out', html: <><span className="warn">i\'ve been on the internet before. not falling for that one.</span></> }],
    'cd ~': () => [{ kind: 'out', text: 'you\'re already home. (welcome to my homepage.)' }],
    pwd: () => [{ kind: 'out', text: '/home/shawn' }],
    date: () => [{ kind: 'out', text: new Date().toString().toLowerCase() }],
    verse: () => {
      // Trigger the modal egg for the rich UI; print a short stub here.
      window.dispatchEvent(new CustomEvent('sh4wn:egg', { detail: 'verse' }));
      return [
        { kind: 'out', html: <><span className="c">verse of the day</span> — loading...</> },
      ];
    },
    hire: () => [
      { kind: 'out', text: 'collaborations · internships · research · just to chat' },
      { kind: 'out', html: <><span className="k">email</span>      shawnli1028@gmail.com</> },
      { kind: 'out', html: <><span className="k">github</span>     github.com/sh4wn27</> },
      { kind: 'out', html: <><span className="k">linkedin</span>   huanxuan li</> },
    ],
    coffee: () => [{ kind: 'out', html: <>i'm a tea guy. <span className="c">try `boba` instead.</span></> }],
    boba: () => [{ kind: 'out', html: <>brown sugar oolong, half sweet, no ice. <span className="c">tea-do fairfax</span> if you're nearby.</> }],
    tea: () => [{ kind: 'out', html: <>specifically: tea-do fairfax. weekends. ask for shawn.</> }],
    hello: () => [{ kind: 'out', html: <><span className="c">你好!</span> hi! welcome. type <span className="c">help</span> if you're lost.</> }],
    clear: () => null, //  specially
  }), []);

  // open / cd commands routed dynamically
  const PROJ_URLS = {
    capa: 'https://capa-rho.vercel.app',
    'capa-gh': 'https://github.com/sh4wn27/capa',
    skinai: 'https://skinai-silk.vercel.app/',
    'skinai-gh': 'https://github.com/sh4wn27/skinai',
    gur: 'https://growingupwithrobotics.org',
    ftc: 'https://www.robotuprising.org/',
    fuse: 'https://fblafuse.com/',
    github: 'https://github.com/sh4wn27',
    linkedin: 'https://www.linkedin.com/in/huanxuan-li-b99ba72a5/',
    instagram: 'https://www.instagram.com/sh4wn.27/',
  };

  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) {
      push({ kind: 'cmd', text: '' });
      return;
    }
    push({ kind: 'cmd', text: cmd });
    setCmdHist(h => [...h, cmd]);
    setHistIdx(-1);

    const lower = cmd.toLowerCase();

    // clear
    if (lower === 'clear' || lower === 'cls') {
      setTimeout(() => setLines([]), 50);
      return;
    }

    // exact match
    if (COMMANDS[lower]) {
      const out = COMMANDS[lower]();
      if (out) out.forEach(push);
      return;
    }

    // echo
    if (lower.startsWith('echo ')) {
      push({ kind: 'out', text: cmd.slice(5) });
      return;
    }

    // open <proj>
    if (lower.startsWith('open ')) {
      const k = lower.slice(5).trim();
      if (PROJ_URLS[k]) {
        window.open(PROJ_URLS[k], '_blank');
        push({ kind: 'out', html: <>opened <span className="c">{k}</span> in a new tab.</> });
      } else {
        push({ kind: 'out', html: <><span className="warn">no such project:</span> {k}. try: capa, skinai, gur, ftc, fuse, github, linkedin.</> });
      }
      return;
    }

    // cd <section>
    if (lower.startsWith('cd ')) {
      const sec = lower.slice(3).trim().replace('/', '').replace('~', '').replace('..', '');
      const target = document.getElementById(sec === '' ? 'top' : sec);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        push({ kind: 'out', html: <>jumping to <span className="c">/{sec}</span></> });
      } else {
        push({ kind: 'out', html: <><span className="warn">no such directory:</span> {sec}. try: work, about, research, experience, skills, contact.</> });
      }
      return;
    }

    // cat <file>
    if (lower.startsWith('cat ')) {
      push({ kind: 'out', html: <><span className="warn">cat:</span> {cmd.slice(4)}: no such file. try: about, capa, faith, .cube, .piano, .lacrosse, .boba</> });
      return;
    }

    // not found
    push({ kind: 'out', html: <><span className="warn">command not found:</span> {cmd}. type <span className="c">help</span>.</> });
  };

  // boot sequence — autoplay whoami once
  React.useEffect(() => {
    const opening = [
      { kind: 'sys', text: 'sh4wn.terminal v2.7 · welcome' },
      { kind: 'sys', text: 'type help for commands. try whoami, ls, verse.' },
      { kind: 'sys', text: '' },
      { kind: 'cmd', text: 'whoami' },
      ...COMMANDS.whoami(),
      { kind: 'sys', text: '' },
    ];
    let i = 0;
    let cancelled = false;
    let timer = null;
    const tick = () => {
      if (cancelled) return;
      if (i < opening.length) {
        const next = opening[i];
        if (next) setLines(l => [...l, next]);
        i++;
        timer = setTimeout(tick, i < 3 ? 220 : 140);
      } else {
        setReady(true);
      }
    };
    timer = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [COMMANDS]);

  // autoscroll
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  // keep input focused on click anywhere in terminal
  const focusInput = () => inputRef.current?.focus();

  // arrow key cmd history
  const onKey = (e) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHist.length === 0) return;
      const next = histIdx < 0 ? cmdHist.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(cmdHist[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHist.length === 0) return;
      const next = histIdx < 0 ? -1 : Math.min(cmdHist.length, histIdx + 1);
      setHistIdx(next === cmdHist.length ? -1 : next);
      setInput(next === cmdHist.length ? '' : cmdHist[next] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // simple completion against COMMANDS keys
      const all = Object.keys(COMMANDS).concat(['echo', 'open', 'cd', 'cat']);
      const match = all.find(k => k.startsWith(input.toLowerCase()) && k !== input.toLowerCase());
      if (match) setInput(match);
    }
  };

  return (
    <div className="term" onClick={focusInput}>
      <div className="term-bar">
        <span className="dots"><span /><span /><span /></span>
        <span className="path">shawn@sh4wn ~ /home/shawn</span>
        <span style={{marginLeft:'auto', color:'var(--accent)'}}>● live · interactive</span>
      </div>
      <div className="term-body" ref={bodyRef}>
        {lines.filter(Boolean).map((l, i) => {
          if (l.kind === 'sys') return (
            <div className="term-line" key={i}>
              <span className="term-sys">{l.text}</span>
            </div>
          );
          if (l.kind === 'cmd') return (
            <div className="term-line" key={i}>
              <span className="term-prompt">$</span>
              <span className="term-cmd">{l.text}</span>
            </div>
          );
          if (l.kind === 'out') return (
            <div className="term-line" key={i}>
              <span className="term-out">{l.html ?? l.text}</span>
            </div>
          );
          return null;
        })}
        {ready && (
          <div className="term-line term-input-row">
            <span className="term-prompt">$</span>
            <input
              ref={inputRef}
              className="term-input"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <span className="term-caret-inline" />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// HERO 2 — Protein / DNA ribbon (CAPA tie-in)
// ============================================================
function HeroProtein() {
  const W = 540, H = 480;
  const points = React.useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const x = 60 + t * (W - 120);
      const y = H/2 + Math.sin(t * 9 + 1.2) * 110 + Math.sin(t * 4 + 0.4) * 35;
      pts.push([x, y]);
    }
    return pts;
  }, []);

  const path = points.map((p, i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const residues = ['A', 'L', 'R', 'D', 'K', 'V', 'I', 'C', 'H', 'Y', 'E', 'F'];

  return (
    <div className="prot">
      <svg viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="ribbon" x1="0" x2="1">
            <stop offset="0%"   stopColor="#ff2d7e" stopOpacity="0.4" />
            <stop offset="50%"  stopColor="#ff2d7e" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <path d={path} stroke="#ff2d7e" strokeOpacity="0.18" strokeWidth="18" fill="none" filter="url(#glow)" />
        <path d={path} stroke="url(#ribbon)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d={points.map((p, i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${(p[1]+ Math.sin(i*0.6)*22).toFixed(1)}`).join(' ')}
              stroke="#9a9892" strokeOpacity="0.5" strokeWidth="1.2" fill="none" strokeDasharray="2 4" />

        {points.filter((_, i) => i % 7 === 0).map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={i === 6 ? 7 : 3.5} fill="#ffffff" stroke="#ff2d7e" strokeWidth="1.4" />
            <text x={p[0]} y={p[1] - 12} fontFamily="JetBrains Mono" fontSize="9" fill="#5a5a5a" textAnchor="middle">
              {residues[i % residues.length]}{i*7+12}
            </text>
          </g>
        ))}

        <g>
          <line x1={points[42][0]} y1={points[42][1]} x2={points[42][0] + 80} y2={points[42][1] - 80}
                stroke="#ff2d7e" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx={points[42][0]} cy={points[42][1]} r="10" fill="none" stroke="#ff2d7e" strokeWidth="1.4" />
          <text x={points[42][0] + 84} y={points[42][1] - 80} fontFamily="JetBrains Mono" fontSize="10" fill="#ff2d7e">
            HLA-DRB1 mismatch
          </text>
          <text x={points[42][0] + 84} y={points[42][1] - 68} fontFamily="JetBrains Mono" fontSize="9" fill="#9a9892">
            risk Δ +0.184
          </text>
        </g>

        <line x1="60" y1={H - 40} x2={W - 60} y2={H - 40} stroke="#e6e3dc" />
        {[0, 20, 40, 60, 80].map((n, i) => (
          <g key={i}>
            <line x1={60 + (n/80)*(W-120)} y1={H - 40} x2={60 + (n/80)*(W-120)} y2={H - 36} stroke="#e6e3dc" />
            <text x={60 + (n/80)*(W-120)} y={H - 24} fontFamily="JetBrains Mono" fontSize="9" fill="#9a9892" textAnchor="middle">
              {n * 4}
            </text>
          </g>
        ))}
        <text x={W/2} y={H - 8} fontFamily="JetBrains Mono" fontSize="9" fill="#9a9892" textAnchor="middle">
          residue position
        </text>
      </svg>

      <div className="prot-callout">
        <b>HLA-A*02:01</b><br />
        donor / recipient pair<br />
        <span style={{color:'var(--accent)'}}>ESM-2 embedding</span>
      </div>

      <div className="prot-meta">
        <div className="row"><span>model</span> <b>esm2_t33_650M</b></div>
        <div className="row"><span>survival</span> <b>DeepHit · competing risks</b></div>
        <div className="row"><span>outcome</span> <b>GvHD · relapse · TRM</b></div>
        <div className="row"><span>n</span> <b>187 pediatric HSCT</b></div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroTerminal, HeroProtein });
