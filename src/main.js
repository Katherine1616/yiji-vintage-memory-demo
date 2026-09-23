import {
  Archive, ArrowLeft, ArrowRight, BookOpen, Camera, Check, CircleCheck, Copy, Heart,
  Info, Lock, LogIn, LogOut, PackageCheck, RefreshCw, ScanLine, ShieldCheck,
  Shirt, Sparkles, Store, Repeat2, Upload, UserRound, X, createIcons,
} from 'lucide';
import './styles.css';

const app = document.querySelector('#app');

const garments = [
  {
    id: 'field-jacket', archive: '#YJ-094', issue: 'ISSUE 01 / ARCHIVE TAILORING',
    name: '1997 Waisted Suit', zh: '九十年代收腰套装', price: '¥ 2,680',
    meta: '羊毛混纺 · 成色 A- · 已鉴别',
    image: '/assets/yiji/editorial-suit-v2.jpg',
    position: 'center 20%', lives: '2 位主人 · 4 段故事',
    owner: '@Mira Archive', place: '上海', savedCount: 128,
    story: '最初来自伦敦的一场旧秀衣清仓，后来陪上一位主人完成第一次独自旅行。',
  },
  {
    id: 'denim', archive: '#YJ-071', issue: 'ISSUE 02 / TARTAN AFTERNOON',
    name: 'Tartan City Suit', zh: '英伦格纹不对称套装', price: '¥ 3,240',
    meta: '羊毛格纹 · 成色 A · 已鉴别',
    image: '/assets/yiji/tartan-street-v2.jpg',
    position: 'center 18%', lives: '1 位主人 · 2 段故事',
    owner: '@Violet Room', place: '杭州', savedCount: 86,
    story: '一套在古典剪裁里藏着不对称结构的格纹套装，曾被穿去巴黎看展。',
  },
  {
    id: 'trench', archive: '#YJ-052', issue: 'ISSUE 03 / RAIN MEMORY',
    name: 'Classic Trench', zh: '英式长款风衣', price: '¥ 1,260',
    meta: '混纺面料 · 成色 B · 已修补',
    image: '/assets/yiji/trench-archive-v2.jpg',
    position: 'center 12%', lives: '3 位主人 · 5 段故事',
    owner: '@Sunday Wardrobe', place: '北京', savedCount: 64,
    story: '一件在三个城市之间流转的雨衣，每次转手都留下了一张雨天照片。',
  },
];

function savedCountMarkup(piece) {
  const on = state.favorited.has(piece.id);
  return `<span class='save-count ${on ? 'on' : ''}'><b>${piece.savedCount}</b><em>人收藏</em>${on ? '<i>· 已收藏</i>' : ''}</span>`;
}

const memoryPhotos = [
  { id: 1, url: '/assets/yiji/editorial-suit-v2.jpg', scene: '旧店初遇', reason: '完整保留套装的收腰轮廓' },
  { id: 2, url: '/assets/yiji/tartan-street-v2.jpg', scene: '伦敦雨天', reason: '环境与衣物气质形成反差' },
  { id: 3, url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=84', scene: '旧店初遇', reason: '保留衣物第一次出现的细节' },
  { id: 4, url: '/assets/yiji/trench-archive-v2.jpg', scene: '旧店初遇', reason: '作为衣物来源与材质的记录' },
  { id: 5, url: '/assets/yiji/editorial-suit-v2.jpg', scene: '伦敦雨天', reason: '轮廓清晰，适合作为笔记封面' },
  { id: 6, url: '/assets/yiji/tartan-street-v2.jpg', scene: '周末散步', reason: '闪光灯质感符合整组语气' },
  { id: 7, url: '/assets/yiji/trench-archive-v2.jpg', scene: '旧店初遇', reason: '陈列细节补充衣物背景' },
  { id: 8, url: '/assets/yiji/tartan-street-v2.jpg', scene: '伦敦雨天', reason: '人物和城市关系完整' },
  { id: 9, url: '/assets/yiji/editorial-suit-v2.jpg', scene: '周末散步', reason: '作为档案结尾画面保留' },
];

const pages = [
  { id: 'window', label: '社区', number: '01', icon: 'store' },
  { id: 'passport', label: '衣历', number: '02', icon: 'book-open' },
  { id: 'tryon', label: '试穿', number: '03', icon: 'shirt' },
  { id: 'memory', label: '衣橱', number: '04', icon: 'archive' },
  { id: 'release', label: '流转', number: '05', icon: 'repeat-2' },
];

const state = {
  page: 'window', selectedId: 'field-jacket', timelineIndex: 2,
  tryonStatus: 'idle', tryonProgress: 0, uploadedPhoto: '',
  keptPhotos: new Set(memoryPhotos.map((photo) => photo.id)), memoryScene: '全部',
  noteReady: false, noteStyle: 'personal', publicStory: true,
  cleaning: true, released: false, toast: '', authOpen: false, loggedIn: false,
  navCollapsed: true, journeyMode: 'buy',
  favorited: new Set(), pendingFavoriteId: '',
  passportSaved: false,
  passportDraft: {
    year: '1997',
    material: '羊毛混纺',
    condition: 'B+',
    origin: '2023 年购于伦敦 Notting Hill 的秀场旧衣寄售店。',
    story: '它陪我完成了第一次一个人的远行。',
    service: '2026 年完成专业清洁与内衬轻微修补。',
  },
};

const noteStyles = {
  personal: {
    label: '像我平时', meta: '保留口头语与真实细节', eyebrow: 'PRIVATE DIARY / 9 PHOTOS',
    cover: '一件旧套装，\n陪我走过第一次远行', title: '我终于把这件衣服的故事整理出来了',
    body: ['它不是我衣柜里最实穿的一件，却是最像我的一件。第一次穿它时，我还不太知道自己想成为怎样的大人。', '后来它陪我去了伦敦。那些一直没整理的照片里，原来它反复出现，像一条我当时没有发现的线。'],
    tags: '#中古穿搭 #衣物记忆 #VintageArchive',
  },
  restrained: {
    label: '更克制', meta: '四张图，一句正文', eyebrow: 'QUIET NOTE / 4 PHOTOS',
    cover: '1997 — 2026', title: '旧衣服替我们记住了时间。',
    body: ['有些东西离开以后，不必连记忆一起清空。'],
    tags: '#旧衣新生 #衣迹',
  },
  editorial: {
    label: '更像画报', meta: '杂志标题与档案信息', eyebrow: 'WARDROBE ARCHIVE / ISSUE 01',
    cover: 'THE BROWN SUIT\nA PERSONAL ARCHIVE', title: 'The Brown Suit：关于轮廓、雨天与告别',
    body: ['ARCHIVE #YJ-094｜1990s wool-blend waisted suit.', '它的肩线很冷静，腰线却近乎任性。我们选出九张照片，把三年的穿着痕迹编成一页私人画报。'],
    tags: '#WardrobeArchive #VintageEditorial #衣迹',
  },
};

const timeline = [
  { year: '1997', label: '洗标留下的年代', source: 'AI 推测', tone: 'ai', detail: '排版、纽扣与收腰版型都指向 1995—1999。像一句尚未说完的话，还差机构点头才算落定。' },
  { year: '2023', label: '在伦敦被带回家', source: '主人记录', tone: 'owner', detail: '上一位主人在 Notting Hill 的秀场旧衣店遇见它。凭证早已不见，地点仍被记得很清楚。' },
  { year: '2025', label: '雨季里反复出现', source: '记忆存档', tone: 'memory', detail: '从 126 张照片里，它走出 3 段经历；其中 9 张，被留下来成为私人的雨季档案。' },
  { year: '2026', label: '被好好照料过', source: '服务记录', tone: 'verified', detail: '专业清洁，内衬轻微修补。前后照片与服务记录一起收进衣历，像给下一次相遇写介绍信。' },
  { year: 'NOW', label: '在等下一程', source: '平台状态', tone: 'platform', detail: '原主人封存了完整记忆，只公开一句话。衣服仍在这里，故事不必从零开始。' },
];

function currentGarment() {
  return garments.find((garment) => garment.id === state.selectedId) || garments[0];
}

function icon(name) {
  return `<i data-lucide='${name}' aria-hidden='true'></i>`;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function navMarkup() {
  return `
    <aside class='side-rail ${state.navCollapsed ? 'collapsed' : 'expanded'}'>
      <button class='wordmark' data-page='window' aria-label='返回衣迹首页'><strong>衣<br>迹</strong><span>YĪ JÌ<br>ARCHIVE</span></button>
      <nav aria-label='体验路径'>
        ${pages.map((page) => `
          <button class='${state.page === page.id ? 'active' : ''}' data-page='${page.id}' aria-label='${page.label}' aria-current='${state.page === page.id ? 'page' : 'false'}'>
            ${icon(page.icon)}<span>${page.label}</span>
          </button>`).join('')}
      </nav>
      <button class='profile-entry ${state.loggedIn ? 'signed-in' : ''}' data-action='open-auth' aria-label='${state.loggedIn ? '打开 Rui 的私人档案' : '登录或打开我的衣迹'}'>
        <span>${state.loggedIn ? 'R' : icon('user-round')}</span>
        <small>${state.loggedIn ? 'RUI · 私人档案' : '登录 / 我的衣迹'}</small>
      </button>
      <button class='rail-toggle' data-action='toggle-nav' aria-label='${state.navCollapsed ? '展开导航' : '收起导航'}' aria-expanded='${!state.navCollapsed}'>
        ${icon(state.navCollapsed ? 'arrow-right' : 'arrow-left')}
      </button>
    </aside>
    <div class='mobile-mast'><button class='mobile-wordmark' data-page='window'>衣迹 <span>YĪ JÌ ARCHIVE</span></button><button data-action='open-auth' aria-label='${state.loggedIn ? '打开 Rui 的私人档案' : '登录或打开我的衣迹'}'>${state.loggedIn ? 'RUI' : icon('user-round')}</button></div>`;
}

function journeyGuideMarkup() {
  if (state.released) return '';
  const routeIds = state.journeyMode === 'buy'
    ? ['window', 'passport', 'tryon']
    : ['memory', 'passport', 'release'];
  const journeyPages = routeIds.map((id) => pages.find((page) => page.id === id));
  const index = journeyPages.findIndex((page) => page.id === state.page);
  if (index < 0) return '';
  const next = index < journeyPages.length - 1 ? journeyPages[index + 1] : null;
  const cues = state.journeyMode === 'buy' ? {
    window: '从一件打动你的旧衣开始，先读它留下的来处与故事。',
    passport: '如果它的故事也打动你，再看看它是否适合今天的自己。',
    tryon: '喜欢的不只是轮廓，也可以把它收进自己的收藏。',
  } : {
    memory: '先选定一件衣服，再从照片与经历中找回它的故事。',
    passport: state.passportSaved
      ? '这一页已经收好。接下来，决定哪些记忆随它继续走。'
      : '把记得的来处与愿意公开的话写下来，保存后再送它去流转。',
    release: '留下属于你的部分，把愿意公开的那一句交给下一位主人。',
  };
  const pageHasForwardAction = ['window', 'memory', 'release'].includes(state.page)
    || (state.journeyMode === 'buy' && ['passport', 'tryon'].includes(state.page));
  const canContinueSelling = state.journeyMode === 'sell' && state.page === 'passport' && state.passportSaved;
  return `<aside class='journey-guide' aria-label='路径提示'>
    <div class='journey-current'>
      <span>${state.journeyMode === 'buy' ? '淘衣路径' : '流转路径'} · ${String(index + 1).padStart(2, '0')} / 0${journeyPages.length}</span>
      <strong>${cues[state.page]}</strong>
    </div>
    ${canContinueSelling && next
      ? `<button class='journey-next' data-page='${next.id}'><span>下一步 · ${next.label}</span>${icon('arrow-right')}</button>`
      : !pageHasForwardAction && next && state.page !== 'passport'
        ? `<button class='journey-next' data-page='${next.id}'><span>下一步 · ${next.label}</span>${icon('arrow-right')}</button>`
        : ''}
  </aside>`;
}

function authModalMarkup() {
  if (!state.authOpen) return '';
  const favorites = garments.filter((garment) => state.favorited.has(garment.id));
  return `<div class='auth-backdrop' role='presentation'>
    <section class='auth-card' role='dialog' aria-modal='true' aria-label='个人档案登录演示'>
      <button class='auth-close' data-action='close-auth' aria-label='关闭'>${icon('x')}</button>
      ${state.loggedIn ? `
        <p class='kicker'>MY PRIVATE ARCHIVE</p><div class='profile-monogram'>R</div>
        <h2>晚上好，Rui。</h2><p>你的衣物、收藏、照片与未发布笔记都保存在个人档案中。</p>
        <div class='profile-stats'><span><b>12</b>件衣物</span><span><b>${favorites.length}</b>件收藏</span><span><b>${state.keptPhotos.size}</b>张精选</span><span><b>${state.noteReady ? 1 : 0}</b>篇草稿</span></div>
        <div class='profile-favorites'>
          <div class='profile-section-title'><p class='kicker'>MY FAVORITES</p><small>演示登录状态</small></div>
          ${favorites.length ? `<ul>${favorites.map((garment) => `<li>
            <img src='${garment.image}' style='object-position:${garment.position}' alt=''>
            <div><strong>${garment.zh}</strong><small>${garment.archive} · ${garment.savedCount} 人收藏</small></div>
            <button data-action='toggle-favorite' data-fav-id='${garment.id}' aria-label='取消收藏 ${garment.zh}'>${icon('x')}</button>
          </li>`).join('')}</ul>` : `<p class='favorites-empty'>还没有收藏。回到社区，遇见喜欢的旧衣时点一下心形即可。</p>`}
        </div>
        <button class='main-cta wide' data-page='memory'>进入我的衣橱</button>
        <button class='text-action' data-action='logout'>${icon('log-out')} 退出演示账号</button>
      ` : `
        <p class='kicker'>PRIVATE WARDROBE</p><h2>先把你的衣迹，<br>留在自己的档案里。</h2>
        <p>${state.pendingFavoriteId ? '登录后，这件古着会自动进入你的收藏。' : '登录后可体验收藏、衣历编辑、相册精选与未发布笔记。这个 Demo 不会收集真实账号信息。'}</p>
        <label class='demo-field'><span>演示邮箱</span><input value='rui@example.com' readonly></label>
        <button class='main-cta wide' data-action='login'>${icon('log-in')} 登录演示账号</button>
        <div class='privacy-line'>${icon('lock')} 完整照片与私人文字默认仅自己可见</div>
      `}
    </section>
  </div>`;
}

function pageTitle(kicker, title, intro, index) {
  return `
    <div class='page-intro'>
      <span class='folio'>${index} / 05</span>
      <div><p class='kicker'>${kicker}</p><h1>${title}</h1><p>${intro}</p></div>
    </div>`;
}

function renderWindow() {
  const garment = currentGarment();
  return `
    <section class='community-rail' aria-label='社区最新流转'>
      <header class='community-rail-head'>
        <div><p class='kicker'>LATEST CIRCULATION</p><h2>社区最新流转</h2></div>
        <div class='community-rail-actions'>
          <button data-action='previous-piece' aria-label='上一件古着'>${icon('arrow-left')}</button>
          <button data-action='next-piece' aria-label='下一件古着'>${icon('arrow-right')}</button>
          <button class='wardrobe-entry' data-action='open-auth'>我的收藏${state.favorited.size ? ` · ${state.favorited.size}` : ''}</button>
          <button class='wardrobe-entry' data-page='memory'>我的衣橱</button>
        </div>
      </header>
      <div class='community-carousel'>
        ${garments.map((piece) => {
          const on = state.favorited.has(piece.id);
          return `<article class='community-card ${piece.id === garment.id ? 'selected' : ''}'>
            <button class='card-hit' data-piece='${piece.id}' aria-label='查看 ${piece.zh}'>
              <img src='${piece.image}' style='object-position:${piece.position}' alt=''>
              <span><small>${piece.owner} · ${piece.place}</small><strong>${piece.zh}</strong><em>${piece.price}</em>${savedCountMarkup(piece)}</span>
            </button>
            <button class='card-favorite ${on ? 'on' : ''}' data-action='toggle-favorite' data-fav-id='${piece.id}' aria-pressed='${on}' aria-label='${on ? '取消收藏' : '收藏'} ${piece.zh}'>${icon('heart')}</button>
          </article>`;
        }).join('')}
      </div>
    </section>
    <section class='window-stage' aria-label='衣迹古着社区精选'>
      <div class='storefront-frame'>
        <img class='window-decor' src='/assets/yiji/window-decor-v1.png' alt='' aria-hidden='true'>
        <div class='storefront-glass' aria-hidden='true'></div>
        <div class='model-illustration'>
          <img src='/assets/yiji/window-model-illustration-v1.png' alt='身穿九十年代棕色收腰套装的复古时装插画模特'>
          <button class='model-tag' data-piece='${garment.id}' aria-label='查看当前衣物'>${garment.archive}</button>
        </div>
        <aside class='window-editorial'>
          <div class='community-label'><span>YĪ JÌ COMMUNITY</span><span>今日上新 18</span></div>
          <p class='kicker'>COMMUNITY EDIT · A STORY IN MOTION</p>
          <h1>一件旧衣，<br>正在等下一段生活。</h1>
          <p class='lead'>它从谁的衣柜来，又会去往谁的日常？先读衣历，再决定要不要把它带走。</p>
          <article class='archive-card'>
            <div class='archive-number'>ARCHIVE<br><b>${garment.archive}</b></div>
            <div><strong>${garment.zh}</strong><span>${garment.meta}</span><small>${garment.lives}</small></div>
            <div class='community-owner'><span>${garment.owner} · ${garment.place}</span>${savedCountMarkup(garment)}</div>
            <span class='verified'>${icon('shield-check')} 档案已核验</span>
          </article>
          <div class='primary-actions'>
            <button class='main-cta' data-page='passport'>查看完整衣历 ${icon('arrow-right')}</button>
            <button class='quiet-cta' data-page='tryon'>${icon('camera')} 真人照片试穿</button>
          </div>
        </aside>
        <p class='window-folio'>YĪ JÌ ARCHIVE · 1998—2026</p>
      </div>
    </section>`;
}

function renderPassport() {
  const garment = currentGarment();
  const isSelling = state.journeyMode === 'sell';
  if (isSelling) return renderPassportEditor(garment);
  const active = timeline[state.timelineIndex];
  return `
    ${pageTitle('GARMENT CHRONICLE', '它走过的路，仍藏在褶皱里', '洗标给出年份，磨损留下语气；那些已经确认的、还在猜想的，以及主人愿意讲的，都在这一页相遇。', '02')}
    <section class='passport-hero'>
      <div class='passport-photo'><img src='${garment.image}' style='object-position:${garment.position}' alt='${garment.zh}'><span class='photo-stamp'>CIRCULATED · ${garment.archive}</span></div>
      <div class='passport-copy'>
        <div class='passport-heading'><p>${garment.archive} · DIGITAL GARMENT PASSPORT</p><h2>${garment.name}</h2><span>${garment.zh}</span></div>
        <dl class='passport-facts'>
          <div><dt>大约来自</dt><dd>1995—1999 <small>AI 线索</small></dd></div>
          <div><dt>面料手感</dt><dd>羊毛混纺 <small>洗标细读</small></dd></div>
          <div><dt>此刻成色</dt><dd>B+ <small>人工看过</small></dd></div>
          <div><dt>转过几手</dt><dd>02 <small>平台记着</small></dd></div>
        </dl>
        <blockquote>“${garment.story}”<cite>— 上一位主人愿意公开的那句话</cite></blockquote>
        <div class='source-legend'><span class='verified-source'>${icon('shield-check')} 已核实</span><span class='ai-source'>${icon('sparkles')} 仍是推测</span><span class='owner-source'>${icon('heart')} 主人所写</span></div>
        <div class='passport-favorite'>
          <button class='quiet-cta ${state.favorited.has(garment.id) ? 'is-favorite' : ''}' data-action='toggle-favorite' data-fav-id='${garment.id}'>${icon('heart')} ${state.favorited.has(garment.id) ? '已收藏' : '收藏这件古着'}</button>
          ${savedCountMarkup(garment)}
        </div>
      </div>
    </section>
    <section class='timeline-section'>
      <div class='section-heading'><p class='kicker'>TIME MACHINE</p><h2>时间没有离开，<br>只是藏进了衣服里。</h2></div>
      <div class='timeline'>
        ${timeline.map((item, index) => `
          <button class='timeline-stop ${index === state.timelineIndex ? 'active' : ''}' data-timeline='${index}'>
            <b>${item.year}</b><span>${item.label}</span><small>${item.source}</small>
          </button>`).join('')}
      </div>
      <article class='timeline-detail ${active.tone}'>
        <div class='timeline-detail-meta'><span>${active.source}</span><b>${active.year}</b></div>
        <div class='timeline-detail-copy'><h3>${active.label}</h3><p>${active.detail}</p></div>
      </article>
      <div class='passport-actions'><button class='quiet-cta' data-page='window'>${icon('arrow-left')} 回到社区</button><button class='main-cta' data-page='tryon'>看看我穿起来怎么样 ${icon('arrow-right')}</button></div>
    </section>`;
}

function renderPassportEditor(garment) {
  const draft = state.passportDraft;
  return `
    ${pageTitle('PRIVATE GARMENT LETTER', '把记得的来处，写成它的下一页', '不用替一件旧衣写一份冷冰冰的档案。写下你记得的，也允许有些线索暂时沉默；它们会陪它走向下一位主人。', '02')}
    <div class='editor-return-bar'>
      <button type='button' data-action='exit-passport-editor'>${icon('arrow-left')} 返回我的衣橱</button>
      <span>${icon('lock')} 私人衣历编辑</span>
    </div>
    <section class='passport-editor-layout'>
      <aside class='editor-preview'>
        <div class='editor-photo'><img src='${garment.image}' style='object-position:${garment.position}' alt='${garment.zh}'><span class='photo-stamp'>PRIVATE DRAFT · ${garment.archive}</span></div>
        <div class='editor-piece-meta'>
          <p>${garment.name}</p><h2>${garment.zh}</h2>
          <dl class='editor-live-facts'>
            <div><dt>大约来自</dt><dd>${escapeAttr(draft.year) || '待你写下'}</dd></div>
            <div><dt>面料线索</dt><dd>${escapeAttr(draft.material) || '待你写下'}</dd></div>
            <div><dt>此刻成色</dt><dd>${escapeAttr(draft.condition) || '待你写下'}</dd></div>
          </dl>
          <span>${icon('lock')} ${state.passportSaved ? '已保存，仍是私人草稿' : '私人草稿 · 尚未进入社区'}</span>
        </div>
      </aside>
      <form class='passport-editor' data-passport-form>
        <div class='editor-heading'>
          <div><p class='kicker'>GARMENT NOTES</p><h2>我记得的，和衣服留下的。</h2></div>
          <span class='save-state ${state.passportSaved ? 'saved' : ''}'>${state.passportSaved ? `${icon('circle-check')} 已保存` : '有改动，尚未保存'}</span>
        </div>
        <section class='editor-block'>
          <header><b>01</b><div><h3>衣物线索</h3><p>年代、面料与成色，能写多少写多少。</p></div></header>
          <div class='editor-grid compact-fields'>
            <label><span>大约来自哪一年</span><input data-passport-field='year' value='${escapeAttr(draft.year)}' placeholder='例如：1997'></label>
            <label><span>面料线索</span><input data-passport-field='material' value='${escapeAttr(draft.material)}' placeholder='例如：羊毛混纺'></label>
            <label><span>现在的成色</span><select data-passport-field='condition'>${['A', 'A-', 'B+', 'B', 'C'].map((value) => `<option ${draft.condition === value ? 'selected' : ''}>${value}</option>`).join('')}</select></label>
          </div>
        </section>
        <section class='editor-block'>
          <header><b>02</b><div><h3>故事与照料</h3><p>来处会成为主人记录；一句话由你决定是否公开。</p></div></header>
          <div class='editor-grid story-fields'>
            <label><span>你们在哪里相遇</span><textarea data-passport-field='origin' rows='3' placeholder='购入地点、旧店或上一位主人…'>${escapeAttr(draft.origin)}</textarea><small>这段会作为“主人记录”出现。</small></label>
            <label><span>想留给下一位主人的一句话</span><textarea data-passport-field='story' rows='4' placeholder='一段你愿意公开的记忆…'>${escapeAttr(draft.story)}</textarea><small>其余照片和私人记忆仍只属于你。</small></label>
            <label><span>清洁与修补</span><textarea data-passport-field='service' rows='3' placeholder='写下清洁、消毒或修补记录…'>${escapeAttr(draft.service)}</textarea><small>服务凭证可在正式版本中由平台确认。</small></label>
          </div>
        </section>
        <div class='editor-notes'>
          <span>${icon('sparkles')} 年代与材质可以由 AI 帮你找线索，但不会替你把猜测写成事实。</span>
          <button type='button' class='main-cta' data-action='save-passport'>${icon('check')} 保存这页衣历</button>
        </div>
      </form>
    </section>`;
}

function tryonPreviewImage() {
  return state.uploadedPhoto || '/assets/yiji/tryon/avatar-master.png';
}

function renderTryon() {
  const garment = currentGarment();
  const processing = state.tryonStatus === 'processing';
  const done = state.tryonStatus === 'done';
  return `
    ${pageTitle('THE MIRROR BEFORE THE JOURNEY', '先让它在身上，回答一次', '把自己放进一件旧衣的轮廓里，看看它与你相遇时，会留下怎样的回声。这里仅作风格预览，不代表真实尺码或合身度。', '03')}
    <div class='tryon-return-bar'>
      <button type='button' data-page='window'>${icon('arrow-left')} 返回社区</button>
      <span>${icon('camera')} 私人试穿预览</span>
    </div>
    <section class='tryon-studio'>
      <div class='tryon-board'>
        <article class='photo-slot person-slot'>
          <div class='slot-heading'><span>01 / 你的照片</span><small>${state.uploadedPhoto ? '已载入本地预览' : '使用演示照片'}</small></div>
          <img src='${tryonPreviewImage()}' alt='用户试穿参考照片'>
          <label class='upload-control'>${icon('upload')} 上传真人照片<input id='photo-upload' type='file' accept='image/*'></label>
        </article>
        <div class='tryon-plus'>×</div>
        <article class='photo-slot garment-slot'>
          <div class='slot-heading'><span>02 / 选择的古着</span><small>${garment.archive}</small></div>
          <img src='${garment.image}' style='object-position:${garment.position}' alt='${garment.zh}'><strong>${garment.zh}</strong>
        </article>
        <div class='tryon-equals'>→</div>
        <article class='photo-slot result-slot ${done ? 'ready' : ''}'>
          <div class='slot-heading'><span>03 / 灵感预览</span><small>${done ? '模拟结果' : processing ? '生成中' : '等待生成'}</small></div>
          ${done
            ? `<img src='/assets/yiji/tryon/brown-waisted-suit.png' alt='棕色收腰套装试穿概念结果'><span class='demo-ribbon'>CONCEPT RESULT</span>`
            : `<div class='result-placeholder'>
                ${processing ? icon('scan-line') : icon('shirt')}
                <strong>${processing ? '正在保留你的脸部与姿态…' : '试穿结果将在这里出现'}</strong>
                <p>${processing ? `模拟进度 ${state.tryonProgress}%` : '上传照片后即可开始'}</p>
                ${processing ? `<div class='progress'><i style='width:${state.tryonProgress}%'></i></div>` : ''}
              </div>`}
        </article>
      </div>
      <div class='tryon-controls'>
        <div class='concept-note'>${icon('info')} 试穿只用于判断风格与搭配灵感，不代表真实尺码和合身度。</div>
        <button class='main-cta' data-action='generate-tryon' ${processing ? 'disabled' : ''}>${processing ? icon('refresh-cw') : icon('sparkles')} ${done ? '重新生成一次' : processing ? '生成概念效果中' : '生成试穿灵感'}</button>
        ${done ? `<button class='quiet-cta ${state.favorited.has(garment.id) ? 'is-favorite' : ''}' data-action='toggle-favorite' data-fav-id='${garment.id}'>${icon('heart')} ${state.favorited.has(garment.id) ? '已收藏' : '收藏这件古着'}</button>` : ''}
      </div>
    </section>`;
}

function filteredPhotos() {
  return state.memoryScene === '全部' ? memoryPhotos : memoryPhotos.filter((photo) => photo.scene === state.memoryScene);
}

function renderNote() {
  const note = noteStyles[state.noteStyle];
  return `
    <article class='note-preview ${state.noteStyle}'>
      <div class='note-topline'><span>${note.eyebrow}</span><button data-action='copy-note'>${icon('copy')} 复制这一版</button></div>
      <div class='note-cover'><img src='${memoryPhotos[7].url}' alt='笔记封面'><span>${note.cover.replace('\n', '<br>')}</span></div>
      <div class='style-tabs'>${Object.entries(noteStyles).map(([id, style]) => `<button class='${state.noteStyle === id ? 'active' : ''}' data-style='${id}'><strong>${style.label}</strong><small>${style.meta}</small></button>`).join('')}</div>
      <div class='style-explainer'><span>当前版本</span><strong>${note.label}</strong><p>${note.meta}。切换后标题、正文长度、封面排版都会一起变化。</p></div>
      <h3>${note.title}</h3>
      ${note.body.map((paragraph) => `<p>${paragraph}</p>`).join('')}
      <p class='hashtags'>${note.tags}</p>
    </article>`;
}

function renderMemory() {
  const garment = currentGarment();
  const scenes = ['全部', '旧店初遇', '伦敦雨天', '周末散步'];
  const visible = filteredPhotos();
  const journeyCount = 3;
  const selectedCount = state.keptPhotos.size;
  const draftCount = state.noteReady ? 1 : 0;
  return `
    ${pageTitle('PRIVATE WARDROBE · THE KEPT THINGS', '舍不得删掉的，替你收进时间里。', '照片会越积越多，衣服也会慢慢有了自己的故事。这里把它们安静收好，再决定哪一段记忆可以继续向前。', '04')}
    <section class='memory-dashboard'>
      <div class='wardrobe-overview'>
        <div><p class='kicker'>RUI'S WARDROBE · 12 PIECES</p><h2>我的衣橱</h2><p>正在整理 1 件衣物，另有 4 篇记忆草稿。</p></div>
        <article class='wardrobe-piece'>
          <img src='${garment.image}' style='object-position:${garment.position}' alt='${garment.zh}'>
          <div><span>正在整理 · ${garment.archive}</span><strong>${garment.zh}</strong><small>私人记录 · 尚未发布到社区</small></div>
          <button class='quiet-cta' data-action='edit-passport'>补充衣历 ${icon('arrow-right')}</button>
        </article>
      </div>
      <div class='memory-summary' aria-live='polite'>
        <div class='memory-metric'><div class='metric-value'><b>126</b><em>张</em></div><span>原始照片</span></div><i>→</i>
        <div class='memory-metric'><div class='metric-value'><b>${journeyCount}</b><em>段</em></div><span>经历</span></div><i>→</i>
        <div class='memory-metric'><div class='metric-value'><b>${selectedCount}</b><em>张</em></div><span>精选</span></div><i>→</i>
        <div class='memory-metric'><div class='metric-value'><b>${draftCount}</b><em>篇</em></div><span>待发笔记</span></div>
      </div>
      <div class='memory-workspace'>
        <div class='contact-sheet'>
          <div class='sheet-toolbar'>
            <div class='scene-tabs'>${scenes.map((scene) => `<button class='${state.memoryScene === scene ? 'active' : ''}' data-scene='${scene}'>${scene}</button>`).join('')}</div>
            <span>${icon('sparkles')} AI 已折叠 32 张重复或模糊照片 · 当前精选 ${selectedCount} 张</span>
          </div>
          <div class='photo-grid'>
            ${visible.map((photo, index) => `
              <button class='memory-photo ${state.keptPhotos.has(photo.id) ? 'kept' : 'removed'}' data-photo='${photo.id}' aria-pressed='${state.keptPhotos.has(photo.id)}' aria-label='${state.keptPhotos.has(photo.id) ? '移出精选' : '恢复到精选'}：${photo.scene}照片 ${index + 1}'>
                <img src='${photo.url}' alt='${photo.scene}照片 ${index + 1}'><span class='photo-index'>${String(photo.id).padStart(2, '0')}</span>
                <span class='photo-state'>${state.keptPhotos.has(photo.id) ? `${icon('check')} 已精选` : `${icon('x')} 已移出`}</span>
                <span class='photo-action'>${state.keptPhotos.has(photo.id) ? `${icon('x')} 移出精选` : `${icon('refresh-cw')} 恢复精选`}</span>
                <small>${photo.reason}</small>
              </button>`).join('')}
          </div>
          <div class='selection-hint'>点击照片上的“移出精选”或“恢复精选”。这里只调整精选结果，原图仍会保留。</div>
        </div>
        <aside class='memory-sidebar'>
          ${state.noteReady ? renderNote() : `
            <div class='memory-story'>
              <p class='kicker'>AI STORYLINE</p><h2>它陪你经历了<br>三个章节。</h2>
              <ol>
                <li><b>01</b><div><strong>旧店初遇</strong><span>2023 · 伦敦 Notting Hill</span></div></li>
                <li><b>02</b><div><strong>伦敦雨天</strong><span>2025 · 旅行与第一次发布</span></div></li>
                <li><b>03</b><div><strong>周末散步</strong><span>2026 · 最后一次穿着记录</span></div></li>
              </ol>
              <div class='question-card'><span>只需要你补充一件事</span><strong>这套衣服最让你舍不得的是什么？</strong><textarea aria-label='补充真实感受'>它陪我完成了第一次一个人的远行。</textarea></div>
              <button class='main-cta wide' data-action='generate-note'>${icon('sparkles')} 生成记忆与小红书草稿</button>
            </div>`}
        </aside>
      </div>
      ${state.noteReady ? `<div class='memory-footer'><span>${icon('lock')} 完整记忆默认仅自己可见</span><button class='main-cta' data-page='release'>封存这段记忆 ${icon('arrow-right')}</button></div>` : ''}
    </section>`;
}

function renderRelease() {
  const garment = currentGarment();
  if (state.released) {
    return `
      <section class='release-success'>
        <div class='success-seal'>${icon('circle-check')}</div><p class='kicker'>MEMORY SEALED · GARMENT RELISTED</p>
        <h1>记忆留下了，<br>衣服继续旅行。</h1>
        <p>你的完整照片和私人文字已进入“我的衣迹”。新的商品页只公开你选择的一句话，并继承可信的衣物履历。</p>
        <article class='next-owner-card'>
          <img src='${garment.image}' style='object-position:${garment.position}' alt='${garment.zh}'>
          <div><span>${garment.archive} · 第 3 次流转</span><strong>${garment.zh}</strong><p>“它陪我度过了第一次一个人生活的冬天，希望你也能穿着它去很远的地方。”</p></div>
        </article>
        <div class='success-actions'><button class='quiet-cta' data-page='memory'>回到我的衣橱</button><button class='main-cta' data-page='window'>去社区看看</button></div>
      </section>`;
  }
  return `
    ${pageTitle('THE NEXT CHAPTER', '把记忆留下，让衣服继续远行', '完整的记忆留在你的档案里；只挑一句愿意交出去的话，陪它去见下一位主人。', '05')}
    <section class='release-layout'>
      <div class='sealed-memory'>
        <div class='sealed-cover'>
          <img src='${memoryPhotos[0].url}' alt='私人衣物记忆封面'><span class='private-badge'>${icon('lock')} PRIVATE ARCHIVE</span>
          <div><small>2023—2026</small><h2>关于这套旧衣的<br>三段生活</h2></div>
        </div>
        <div class='sealed-meta'><span>9张精选照片</span><span>3段经历</span><span>1篇私人记忆</span><p>无论衣服去往哪里，这份完整记录都会留在你的“我的衣迹”中。</p></div>
      </div>
      <div class='release-form'>
        <section>
          <div class='form-heading'><span>01</span><div><h3>选择公开边界</h3><p>私人记忆不会随商品转让。</p></div></div>
          <label class='choice-row locked'><span>${icon('lock')}</span><div><strong>完整照片与私人文字</strong><small>仅自己可见，永久保存在个人档案</small></div><b>始终私人</b></label>
          <button class='choice-row ${state.publicStory ? 'selected' : ''}' data-action='toggle-story'><span>${icon('heart')}</span><div><strong>留给下一位主人的一句话</strong><small>“它陪我度过了第一次一个人生活的冬天……”</small></div><b>${state.publicStory ? '公开' : '不公开'}</b></button>
        </section>
        <section>
          <div class='form-heading'><span>02</span><div><h3>更新衣物状态</h3><p>以下为概念演示，不会提交真实服务。</p></div></div>
          <div class='service-grid'>
            <article><span>${icon('shield-check')}</span><div><strong>数字履历</strong><small>历史信息自动继承</small></div><b>已完成</b></article>
            <article><span>${icon('check')}</span><div><strong>最新成色</strong><small>A- · 内衬轻微修补</small></div><b>已确认</b></article>
            <button class='${state.cleaning ? 'selected' : ''}' data-action='toggle-cleaning'><span>${icon('package-check')}</span><div><strong>清洁与消毒</strong><small>模拟交由合作服务处理</small></div><b>${state.cleaning ? '已选择' : '未选择'}</b></button>
          </div>
        </section>
        <section class='listing-preview'>
          <div class='form-heading'><span>03</span><div><h3>新的商品页已经准备好</h3><p>继承履历，不必从头填写。</p></div></div>
          <div class='mini-listing'><img src='${garment.image}' style='object-position:${garment.position}' alt='${garment.zh}'><div><span>${garment.archive} · 第 3 次流转</span><strong>${garment.zh}</strong><small>成色 B+ · ${state.cleaning ? '清洁服务待处理' : '未选择清洁服务'}</small></div><b>${garment.price}</b></div>
        </section>
        <button class='seal-button' data-action='release'>封存记忆，让衣服继续旅行 ${icon('arrow-right')}</button>
      </div>
    </section>`;
}

function renderPage() {
  return { window: renderWindow, passport: renderPassport, tryon: renderTryon, memory: renderMemory, release: renderRelease }[state.page]();
}

function render() {
  app.innerHTML = `<main class='site-shell ${state.navCollapsed ? 'nav-collapsed' : 'nav-expanded'}'>${navMarkup()}<div class='page-surface'>${renderPage()}${journeyGuideMarkup()}</div></main>${authModalMarkup()}${state.toast ? `<div class='toast'>${icon('check')} ${state.toast}</div>` : ''}`;
  createIcons({ icons: { Archive, ArrowLeft, ArrowRight, BookOpen, Camera, Check, CircleCheck, Copy, Heart, Info, Lock, LogIn, LogOut, PackageCheck, RefreshCw, Repeat2, ScanLine, ShieldCheck, Shirt, Sparkles, Store, Upload, UserRound, X } });
}

function navigate(page) {
  if ((page === 'memory' || page === 'release') && !state.loggedIn) {
    state.authOpen = true; state.toast = ''; render(); return;
  }
  const from = state.page;
  if (page === 'window' || page === 'tryon') state.journeyMode = 'buy';
  if (page === 'memory' || page === 'release') state.journeyMode = 'sell';
  if (page === 'passport') {
    if (from === 'memory' || from === 'release') state.journeyMode = 'sell';
    if (from === 'window' || from === 'tryon') state.journeyMode = 'buy';
  }
  state.page = page; state.toast = ''; state.authOpen = false; render(); window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  state.toast = message; render(); window.setTimeout(() => { state.toast = ''; render(); }, 1800);
}

function simulateTryon() {
  state.tryonStatus = 'processing'; state.tryonProgress = 18; render();
  [39, 67, 88, 100].forEach((value, index) => {
    window.setTimeout(() => { state.tryonProgress = value; if (value === 100) state.tryonStatus = 'done'; render(); }, 420 * (index + 1));
  });
}

function cycleGarment(offset) {
  const currentIndex = garments.findIndex((garment) => garment.id === state.selectedId);
  const nextIndex = (currentIndex + offset + garments.length) % garments.length;
  state.selectedId = garments[nextIndex].id; render();
}

function toggleFavorite(id) {
  const garment = garments.find((piece) => piece.id === id) || currentGarment();
  if (!state.loggedIn) {
    state.pendingFavoriteId = garment.id;
    state.authOpen = true;
    render();
    return;
  }
  if (state.favorited.has(garment.id)) {
    state.favorited.delete(garment.id);
    showToast(`已从收藏移出「${garment.zh}」`);
  } else {
    state.favorited.add(garment.id);
    showToast(`已收藏「${garment.zh}」`);
  }
}

app.addEventListener('click', (event) => {
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) return navigate(pageButton.dataset.page);
  const pieceButton = event.target.closest('[data-piece]');
  if (pieceButton) { state.selectedId = pieceButton.dataset.piece; render(); return; }
  const timelineButton = event.target.closest('[data-timeline]');
  if (timelineButton) { state.timelineIndex = Number(timelineButton.dataset.timeline); render(); return; }
  const photoButton = event.target.closest('[data-photo]');
  if (photoButton) {
    const id = Number(photoButton.dataset.photo);
    const wasKept = state.keptPhotos.has(id);
    if (wasKept) state.keptPhotos.delete(id); else state.keptPhotos.add(id);
    showToast(wasKept ? '已移出精选，原图仍然保留' : '已恢复到精选'); return;
  }
  const sceneButton = event.target.closest('[data-scene]');
  if (sceneButton) { state.memoryScene = sceneButton.dataset.scene; render(); return; }
  const styleButton = event.target.closest('[data-style]');
  if (styleButton) { state.noteStyle = styleButton.dataset.style; render(); return; }
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'previous-piece') cycleGarment(-1);
  if (action === 'next-piece') cycleGarment(1);
  if (action === 'generate-tryon') simulateTryon();
  if (action === 'generate-note') { state.noteReady = true; render(); }
  if (action === 'copy-note') {
    const note = noteStyles[state.noteStyle];
    navigator.clipboard?.writeText([note.title, ...note.body, note.tags].join('\n\n'));
    showToast(`“${note.label}”版本已复制`);
  }
  if (action === 'open-auth') { state.authOpen = true; render(); }
  if (action === 'edit-passport') { state.journeyMode = 'sell'; navigate('passport'); }
  if (action === 'toggle-favorite' || action === 'save-favorite') {
    const id = event.target.closest('[data-fav-id]')?.dataset.favId || state.selectedId;
    toggleFavorite(id);
  }
  if (action === 'toggle-nav') { state.navCollapsed = !state.navCollapsed; render(); }
  if (action === 'close-auth') { state.authOpen = false; if (!state.loggedIn) state.pendingFavoriteId = ''; render(); }
  if (action === 'exit-passport-editor') navigate('memory');
  if (action === 'login') {
    state.loggedIn = true;
    if (state.pendingFavoriteId) state.favorited.add(state.pendingFavoriteId);
    state.pendingFavoriteId = '';
    state.authOpen = true;
    render();
    showToast('已进入演示个人档案');
  }
  if (action === 'logout') { state.loggedIn = false; state.authOpen = false; state.pendingFavoriteId = ''; render(); showToast('已退出演示账号'); }
  if (action === 'toggle-story') { state.publicStory = !state.publicStory; render(); }
  if (action === 'toggle-cleaning') { state.cleaning = !state.cleaning; render(); }
  if (action === 'save-passport') {
    state.passportSaved = true;
    state.journeyMode = 'sell';
    showToast('衣历已保存，仍是私人草稿');
  }
  if (action === 'release') { state.released = true; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
});

app.addEventListener('submit', (event) => {
  if (event.target.matches('[data-passport-form]')) event.preventDefault();
});

app.addEventListener('input', (event) => {
  const field = event.target.dataset.passportField;
  if (!field) return;
  state.passportDraft[field] = event.target.value;
  state.passportSaved = false;
  const saveState = app.querySelector('.save-state');
  if (saveState) {
    saveState.classList.remove('saved');
    saveState.textContent = '有改动尚未保存';
  }
});

app.addEventListener('change', (event) => {
  const field = event.target.dataset.passportField;
  if (field) {
    state.passportDraft[field] = event.target.value;
    state.passportSaved = false;
    render();
    return;
  }
  if (event.target.id !== 'photo-upload' || !event.target.files?.[0]) return;
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    state.uploadedPhoto = reader.result; state.tryonStatus = 'idle'; render(); showToast('照片已载入，仅用于当前页面预览');
  });
  reader.readAsDataURL(event.target.files[0]);
});

render();
