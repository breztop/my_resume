# Game Developer Portfolio

一个以项目案例为核心的 Vue 作品集。视觉采用“编辑式排版 + 项目概念图”，概念图用于建立项目气氛，项目文字负责说明真实的工程工作。

## 页面与代码架构

```text
src/data/projects.js
        │ 项目内容与图片路径
        ▼
src/components/ProjectCard.vue ── select(project) ──► src/App.vue
                                                        │ activeProject
                                                        ▼
                                      src/components/ProjectModal.vue
```

- `src/App.vue`：只负责页面区块和当前项目状态，不保存项目详情实现。
- `src/data/projects.js`：项目内容的唯一数据源；新增项目主要修改这里。
- `src/components/ProjectCard.vue`：项目列表中的封面、摘要和入口。
- `src/components/ProjectModal.vue`：案例详情、焦点管理、Esc 关闭和页面滚动锁定。
- `src/style.css`：全局视觉令牌、页面布局、组件样式与响应式规则。
- `public/images/projects/`：页面实际加载的 WebP 文件。
- `artwork/source/`：保留高质量 PNG 源文件，不参与站点构建。

## 新增项目

1. 将 3:2 图片放入 `public/images/projects/`，优先使用 WebP。
2. 在 `src/data/projects.js` 增加一个项目对象，并提供准确的 `coverAlt`。
3. 不需要修改卡片或弹窗组件；它们通过统一的数据结构渲染。

## 图片说明

当前三张图片是生成的基础概念视觉，不是实际游戏截图，因此界面中明确标记为 `CONCEPT VISUAL`。上线作品集时，建议在每个详情中继续补充真实截图、录屏和可验证的项目结果。

完整生成提示词见 [`docs/image-prompts.md`](docs/image-prompts.md)。
