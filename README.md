# DEV / WORKS · 独立开发者作品站

一个以项目案例为核心的 Vue 作品集。首页采用暖白底、作品拼贴和彩色标签，展示游戏、网络系统与工具；15 个详情页保留各自独立的视觉表达。概念图用于建立项目气氛，项目文字负责说明工程工作。

## 项目一览

当前作品集包含以下项目与专题，内容以 `src/data/projects.js` 为准。

### 客户端与游戏端

- **元素人**（`p2p`）：可切换 2D / 3D 玩法的 P2P 双人协作游戏。
- **元素人：3D 协作系统**（`elemental-3d`）：从角色构建到多视角相机的立体协作解谜专题。
- **综合塔防游戏**（`tower`）：围绕建造、升级、敌人编队与资源循环构建的多系统策略塔防。
- **部落战：战役与战场系统**（`tribal-war`）：围绕能量核心争夺的战役地图与实时战场系统。
- **部落战：2D 横版版本**（`tribal-war-2d`）：围绕能量核心争夺的 2D 横版推进战斗与战役系统。
- **对话剧情小说游戏**（`branching-narrative`）：包含多分支叙事、存档读档与多结局回收的完整视觉小说流程。

### 服务端与网络层

- **通用多人游戏联机服务**（`p2p-server`）：面向多项目复用的房间、会话与 P2P 连接编排。
- **卡牌棋类游戏**（`cards`）：由权威服务器负责规则、回合与结果裁决的多人对战项目。
- **Miracast Connect Service**（`miracast-bridge`）：打通 Linux 与 Windows 的 P2P 投屏建链、WFD 会话与媒体流接入。
- **breconn**（`breconn`）：约 2 万行代码，基于 Asio 与统一 Channel 接口，覆盖 TCP、UDP、KCP、组播广播、解耦 mDNS 服务及可扩展协议层。

### 工具与基础能力

- **Device Manager**（`device-manager`）：媒体设备体检与开发前能力验证器。
- **Screenshot**（`screenshot`）：支持多屏、取色与异步 OCR 的快速截图工具。
- **Face Scan**（`face-scan`）：把目标照片转化为可追踪的本地人脸检索能力。
- **Lipreading Studio**（`lipreading-studio`）：纯视觉识别、分段流式推理与字幕 / TTS 统一时间轴。
- **conutline**（`conutline`）：从代码行数、文件明细到 AI Agent 提示的一站式代码库统计工具。

### 项目呈现

项目库只保留“全部 / 客户端与游戏端 / 服务端与网络层 / 工具与基础能力”一层筛选，不使用主观难度评分替代作品内容。`/projects/:id` 只承担路由分发；每个项目在 `src/project-pages/` 拥有独立 Vue 页面，可自行决定 DOM、信息顺序、排版、色彩和交互。页面注册集中在 `projectPageRegistry.js`，新增项目时必须同时注册对应页面组件。

## 页面与代码架构

```text
src/data/projects.js ──► HomeView / ProjectsView
                              │
/projects/:id ──► ProjectDetailView ──► projectPageRegistry
                                           │
                                           └─► 每个项目的独立 Vue 页面
```

- `src/App.vue`：全局导航、页脚和路由出口。
- `src/router.js`：定义主页、项目库和项目详情路由，并负责页面滚动位置。
- `src/data/projects.js`：项目内容的唯一数据源；新增项目主要修改这里。
- `src/views/HomeView.vue`：主页与精选项目。
- `src/views/ProjectsView.vue`：分类与关键词联合筛选的响应式项目库，分类保存在 sessionStorage。
- `src/views/ProjectDetailView.vue`：查找项目、分发独立页面组件，并提供统一的关联项目与前后导航。
- `src/project-pages/`：每个项目自己的页面结构、样式与响应式实现。
- `src/components/ProjectCard.vue`：首页与项目集共用的作品卡片。
- `server/index.js`：静态资源服务和 SPA 路由回退，保证详情页刷新不出现 404。
- `src/style.css`：全局视觉令牌、基础元素与共享按钮样式；页面布局使用局部样式。
- `public/images/projects/`：原始封面与生成的 640 / 1280 像素 WebP 变体，SVG 原样保留。
- `artwork/source/`：保留高质量 PNG 源文件，不参与站点构建。

## 新增项目

1. 将 3:2 图片放入 `public/images/projects/`，优先使用 WebP。
2. 在 `src/data/projects.js` 增加一个项目对象，并提供准确的 `coverAlt`；界面或架构图可设置 `mediaFit: "contain"`。
3. 用 `category` 将项目归入 `client`、`server` 或 `tooling`；主页的六个精选项目由同文件中的 `featuredProjectIds` 显式排序，旧 `featured` 字段不再控制首页。
4. 同一系统的多个实现使用相同的 `system`，并在 `relatedProjectIds` 中互相填写项目 id，即可生成关联入口。
5. 项目可选提供 `modules`、`roadmap` 和 `principles`，由该项目的独立详情组件决定具体呈现，路线图应与已有能力分开。
6. 在 `src/project-pages/` 创建该项目的独立页面，并在 `projectPageRegistry.js` 注册；不需要修改路由。

## 图片说明

现有封面包含概念视觉与界面示意，不能将它们当作实机截图或性能证明。图片描述由 `coverAlt` 提供；页面中的示意性仪表与流程不代表运行中的设备或实时测量结果。

完整生成提示词见 [`docs/image-prompts.md`](docs/image-prompts.md)。


## 本地开发与验收

```sh
npm run dev
node scripts/check-projects.mjs
npm run build
npm run preview -- --host 127.0.0.1 --port 5174
```

- `python scripts/optimize-images.py`：需要 Pillow，生成封面变体及 `src/data/projectImages.json`，保留原始资源。更新封面后重新运行。
- `node scripts/check-browser.mjs`：需要可用的 Playwright 模块和本机 Chrome；默认访问 `http://127.0.0.1:5173`。可用 `PLAYWRIGHT_MODULE_PATH` 指定已有模块路径，用 `PORTFOLIO_BASE_URL` 指定生产预览地址。
- 浏览器检查输出默认位于 `artifacts/portfolio-qa/`，可通过 `PORTFOLIO_QA_DIR` 改写。包含 18 个路由 × 3 种屏宽的截图、布局报告与 20 项交互结果。
- 检查包括图片加载、唯一主内容区域与主标题、横向溢出、搜索与分类组合、刷新和返回、关联项目、锚点、键盘、触屏与存储不可用场景。

2026-09-05 重构验收：生产构建通过，54 组页面／屏宽检查和 20 项交互检查通过。测试使用本机无头 Chrome，未进行线上发布；跨浏览器与真实手机硬件表现不属于这次验证结果。
