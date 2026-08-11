import { useEffect, useMemo, useState } from 'react';
import './App.css';

type PageId = 'home' | 'journey' | 'missions' | 'archive' | 'outcomes';

type Mission = {
  eyebrow: string;
  title: string;
  summary: string;
  focus: string[];
  output: string;
  scene: string;
};

type JourneyStep = {
  place: string;
  title: string;
  text: string;
};

const navItems: { id: PageId; label: string }[] = [
  { id: 'home', label: '首页' },
  { id: 'journey', label: '西行叙事' },
  { id: 'missions', label: '三项任务' },
  { id: 'archive', label: '史料归档' },
  { id: 'outcomes', label: '成果呈现' }
];

const missions: Mission[] = [
  {
    eyebrow: '核心任务 01',
    title: '校史源头档案溯源',
    summary:
      '前往西北工业大学友谊校区档案馆，查阅1952年西北工学院矿冶系原始档案，重点梳理矿冶系冶金组成建制划转北京钢铁工业学院的完整史实，获取当年学生名单等一手校史材料。',
    focus: ['1952院系调整史实', '西北工学院矿冶系档案', '划转师生历史线索'],
    output: '带回1952年矿冶系学生名单档案复印件，移交北科大校史馆保存。',
    scene: '坐在档案馆的桌前，亲手翻阅七十余年前的原始纸质档案，触摸校史最真实的记录。'
  },
  {
    eyebrow: '核心任务 02',
    title: '建校亲历者口述访谈',
    summary:
      '对方祖烈、李怀宇、袁怀雨三位建校亲历老教授开展口述访谈，收集当事人的回忆与线索，为档案文字补充鲜活的个人记忆，与馆藏文献形成互证；并使用自研采录系统完成访谈素材标准化处理。',
    focus: ['亲历者个人回忆', '早期办学细节', '院系调整时代记忆'],
    output: '形成系列访谈整理文稿与标准化口述故事卡，作为校史研究的补充参考资料。',
    scene: '倾听老教授讲述过往，把即将消散的个人记忆留存为可查阅的校史资源。'
  },
  {
    eyebrow: '核心任务 03',
    title: '校史史料整理与数字化工具建设',
    summary:
      '整理西安之行获取的档案复印件、现场记录、访谈材料；自主搭建老地图、口述采录舱、影像资料馆三套网页工具，实现校史素材录入、检索、归档、展示全流程。',
    focus: ['档案材料整理', '跨校校史线索梳理', '数字校史工具开发'],
    output: '汇总本次溯源全部调研材料，移交北科大校史馆，交付一整套浏览器即可使用的校史工具箱。',
    scene: '让散落在异地的校史碎片回到北科大，用网页技术把校史装进浏览器。'
  }
];

const journeySteps: JourneyStep[] = [
  {
    place: '北京科技大学 · 满井',
    title: '从满井出发',
    text: '“满井溯源·秦京铸魂”实践团踏上西安溯源之旅，重回1952年西北工学院矿冶系冶金组启程的地方，追寻北科大校史的源头。'
  },
  {
    place: '西工大 · 友谊校区档案馆',
    title: '寻回1952年的原始名单',
    text: '在西工大档案馆查阅1952年西北工学院矿冶系学生名单原件，这份档案完整记录当年随系调入北京钢铁工业学院的全体学生，队员现场拍照、复印，将档案复印件带回北科大校史馆留存。'
  },
  {
    place: '西工大 · 长安校区航空博物馆',
    title: '读懂学科流转的历史脉络',
    text: '参观航空博物馆，了解西北工学院从矿冶学科起步，几经合并转向航空航天的演变历程，串联起两校之间深厚的历史渊源。'
  },
  {
    place: '史料互证 · 数字工具赋能归档',
    title: '口述记忆与原始档案彼此印证',
    text: '前期对方祖烈、李怀宇、袁怀雨三位老教授开展口述访谈，访谈提及的人物线索，在西安馆藏档案中得到实物印证。同时依托实践队自研数字校史工具链，完成素材标准化录入、归档与管理。'
  }
];

type ArchiveItem = {
  num: string;
  title: string;
  desc: string;
};

const archiveItems: ArchiveItem[] = [
  {
    num: "01",
    title: "1952年矿冶系学生名单档案复印件",
    desc: '西工大档案馆馆藏原件复印，记录1952年随西北工学院矿冶系冶金组 调入北京钢铁工业学院的全部学生姓名，是本次溯源最重要一手档案。'
  },
  {
    num: "02",
    title: "院系调整相关馆藏记录",
    desc: '在档案馆查阅到的与矿冶系拆分、人员划转相关的配套档案材料，佐证院系调整时期学科迁移史实。'
  },
  {
    num: "03",
    title: "西工大校史参观调研记录",
    desc: '走访友谊校区、长安校区航空博物馆，记录西北工学院由矿冶走向三航的 学科演变线索，梳理两校历史渊源。'
  },
  {
    num: "04",
    title: "老教授口述访谈整理文稿",
    desc: '对方祖烈、李怀宇、袁怀雨三位老教授访谈转录整理文本，提供当事人视角的办学回忆，可与纸质档案相互对照。'
  },
  {
    num: "05",
    title: "访谈原始音视频素材",
    desc: '对方祖烈、李怀宇、袁怀雨实地访谈留存的音视频原始素材，保存亲历者口述的原声记忆，区分公开展示、内部存档、待确认授权不同权限。'
  },
  {
    num: "06",
  title: "项目相关海报制作",
  desc: "围绕校史溯源主题设计系列宣传海报，可视化呈现1952年学科迁移脉络、寻访历程与调研成果，用于线上传播与线下展示。"

  },
  {
    num: "07",
    title: "口述校史标准化故事卡",
    desc: '通过自研采录舱网页工具生成，统一整理受访人信息、访谈摘要、口述原话与青年寄语，支持检索、JSON导出备份。'
  },
  {
    num: "08",
    title: "线上影像馆藏资源",
    desc: '收纳老教授捐赠历史影像，系统化留存建校初期老照片与纪实影像，服务校史宣传、研究与教育展示。'
  }
];

type OutputItem = {
  title: string;
  text: string;
};

const outputItems: OutputItem[] = [
  {
    title: '1952年院系调整档案复印件',
    text: '西北工学院矿冶系学生名单及配套馆藏档案复印件，移交北科大校史馆保存，为校史考证提供一手实物依据。'
  },
  {
    title: '建校亲历者口述访谈系列成果',
    text: '完成方祖烈、李怀宇、袁怀雨三位老教授口述采集，包含访谈音视频、转录文稿、标准化口述校史故事卡，记录老教授亲历回忆，与纸质档案形成互证。'
  },
  {
    title: "数字校史工具链（三套网页应用）",
    text: "①老地图：建校初期校园交互地图；②采录舱：离线口述校史采录网页；③影像资料馆：线上校史影像归档平台。无需下载，浏览器直接打开使用，构成一套随身校史工具箱。"
  },
  {
    title: '西安溯源专题调研文档',
    text: '完整记录西工大档案馆查阅、博物馆走访全过程，梳理西北工学院矿冶系到北京钢铁工业学院的学科流转脉络。'
  }
];

const getPageFromHash = (): PageId => {
  const hash = window.location.hash.replace('#/', '') as PageId;
  return navItems.some((item) => item.id === hash) ? hash : 'home';
};

function App() {
  const [page, setPage] = useState<PageId>(getPageFromHash);
  const [activeMission, setActiveMission] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeMissionData = useMemo(() => missions[activeMission], [activeMission]);

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.16 }
    );

    const animationFrame = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
      updateProgress();
    });

    window.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrame);
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, [page, activeMission]);

  const navigateTo = (nextPage: PageId) => {
    if (nextPage === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = `/${nextPage}`;
  };

 return (
    <main className="page-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav className="site-nav">
        <div className="nav-inner">
          <button onClick={() => navigateTo('home')} className="brand" aria-label="回到首页">
            <img
              src="/logo-transparent.png"
              alt="满井溯源logo"
              className="brand-mark"
              loading="eager"
            />
            <span>
              <span className="brand-title">秦京铸魂</span>
              <span className="brand-subtitle">北京科技大学满井溯源实践团</span>
            </span>
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={page === item.id ? 'nav-link active' : 'nav-link'}
                aria-current={page === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button onClick={() => navigateTo('missions')} className="nav-cta">
            查看任务
          </button>
        </div>
      </nav>

      <div key={page} className="page-stage">
        {page === 'home' && <HomePage onNavigate={navigateTo} />}
        {page === 'journey' && <JourneyPage />}
        {page === 'missions' && (
          <MissionsPage activeMission={activeMission} activeMissionData={activeMissionData} onSelectMission={setActiveMission} />
        )}
        {page === 'archive' && <ArchivePage />}
        {page === 'outcomes' && <OutcomesPage onNavigate={navigateTo} />}
      </div>
    </main>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section className="hero-section section-pad">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-grid container">
        <div className="hero-copy reveal">
          <div className="pill">
            <span />
            北京科技大学暑期社会实践 · 赴西北工业大学
          </div>
          <h1 className="hero-title">
            <span className="title-line">以青春之行</span>
            <span className="title-line"><em>溯校史根脉</em></span>
          </h1>
          <p>
            秦京铸魂实践团前往西北工业大学，围绕建校源头、初创亲历者与珍贵史料开展系统调研，记录创业故事，留存校史记忆，书写跨越山河的青春答卷。
          </p>
          <div className="hero-actions">
            <button onClick={() => onNavigate('journey')} className="primary-button">
              开启西行叙事
            </button>
            <button onClick={() => onNavigate('archive')} className="secondary-button">
              查看资料库构想
            </button>
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="route-card">
            <div className="route-tag">北京 → 西安</div>
            <div className="route-canvas">
              <div className="route-panel">
                <div className="ring ring-one" />
                <div className="ring ring-two" />
                <div className="route-line">
                  <span className="route-dot start" />
                  <span className="route-dot end" />
                </div>
                <div className="route-note">
                   <img
                  src="/photo.png"
                  alt="校史根脉模块"
                  className="route-note-img"
                  loading="eager"
                   />
                <div className="route-note-bar" />
                   </div>
                <div className="keyword-row">
                  {['溯源', '访谈', '归档'].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-preview container reveal">
        {navItems.slice(1).map((item) => (
          <button key={item.id} onClick={() => onNavigate(item.id)} className="preview-card">
            <span>{item.label}</span>
            <strong>{getPreviewTitle(item.id)}</strong>
            <p>{getPreviewText(item.id)}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function JourneyPage() {
  return (
    <section className="journey-section section-pad content-page">
      <div className="journey-grid container">
        <div className="section-heading sticky-heading reveal">
          <span>Scroll Story</span>
          <h2>满井到长安的校史追寻</h2><br /><br />
          <p>页面以滚动推进叙事：出发、抵达、查证、归档，每一步都对应实践团的调研行动与成果沉淀。</p>
        </div>

        <div className="story-list">
          {journeySteps.map((step, index) => (
            <article key={step.title} className="narrative-card reveal">
              <div className="step-number">{index + 1}</div>
              <div>
                <span>{step.place}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionsPage({
  activeMission,
  activeMissionData,
  onSelectMission
}: {
  activeMission: number;
  activeMissionData: Mission;
  onSelectMission: (index: number) => void;
}) {
  return (
    <section className="missions-section section-pad content-page">
      <div className="container">
        <div className="section-heading centered reveal">
          <span>Three Missions</span>
          <h2>三项核心任务</h2>
          <p>点击任务卡片切换详情，了解实践团如何从源头、人物与实物三条线索共同构建校史记忆。</p>
        </div>

        <div className="mission-tabs">
          {missions.map((mission, index) => (
            <button
              key={mission.title}
              onClick={() => onSelectMission(index)}
              className={activeMission === index ? 'mission-tab active reveal' : 'mission-tab reveal'}
            >
              <span>{mission.eyebrow}</span>
              <strong>{mission.title}</strong>
              <p>{mission.summary}</p>
            </button>
          ))}
        </div>

        <div className="mission-detail reveal" key={activeMissionData.title}>
          <div className="mission-visual">
            <span>{activeMissionData.eyebrow}</span>
            <h3>{activeMissionData.title}</h3>
            <p>{activeMissionData.scene}</p>
          </div>
          <div className="mission-content">
            <span>Research Focus</span>
            <div className="focus-grid">
              {activeMissionData.focus.map((item) => (
                <div key={item} className="focus-card">
                  <i />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="output-card">
              <span>成果产出</span>
              <strong>{activeMissionData.output}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchivePage() {
  return (
    <section className="archive-section section-pad content-page">
      <div className="container">
        <div className="archive-heading reveal">
          <div className="section-heading">
            <span>Digital Archive</span>
            <h2>抢救性采集<br />建立数字化校史资料库</h2>
          </div>
          <p>
            “满井溯源·秦京铸魂”实践团在西安完成异地档案查阅与口述史料采集。同时自主开发三套浏览器端数字校史工具，实现校史素材录入、管理、归档与线上展示。
            <br /><small>网页仅展示史料分类概览；原始档案复印件、访谈音视频原件统一移交北科大校史馆，数字工具可在浏览器直接访问使用。</small>
          </p>
        </div>

        <div className="archive-grid">
          {archiveItems.map((item) => (
            <div key={item.num} className="archive-tile reveal">
              <span>{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesPage({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <section className="final-section content-page">
      <div className="final-card container reveal">
        <div>
          <span>Final Output</span>
          <h2>让校史从档案中走出来，也走进青年心里。</h2>
          <p>
            实践成果分为实体史料与数字工具两部分：纸质档案、访谈原始素材移交北科大校史馆存档；三套自研网页工具面向校史工作提供数字化支撑，真正把校史装进浏览器。
          </p>
        </div>
        <div className="final-panel">
          <button onClick={() => onNavigate('home')}>回到首页</button>
        </div>
      </div>

      <div className="output-grid container">
        {outputItems.map((item) => (
          <article key={item.title} className="output-summary reveal">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function getPreviewTitle(page: PageId) {
  const titles: Record<PageId, string> = {
    home: '首页总览',
    journey: '滚动叙事',
    missions: '任务详情',
    archive: '史料采集',
    outcomes: '成果呈现'
  };
  return titles[page];
}

function getPreviewText(page: PageId) {
  const texts: Record<PageId, string> = {
    home: '回到实践团的整体介绍。',
    journey: '沿着北京到西安的路线展开实践过程。',
    missions: '查看三项核心任务与可切换的详细说明。',
    archive: '浏览本次实践采集到的各类校史史料分类。',
    outcomes: '集中呈现报告、口述史与数字工具三类成果。'
  };
  return texts[page];
}

export default App;