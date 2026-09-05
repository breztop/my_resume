import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ProjectDetailView from "./views/ProjectDetailView.vue";
import ProjectsView from "./views/ProjectsView.vue";
import { getProjectById } from './data/projects.js';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/projects", name: "projects", component: ProjectsView },
    { path: "/projects/:id", name: "project-detail", component: ProjectDetailView },
    { path: "/:pathMatch(.*)*", redirect: "/projects" },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' };
    return { top: 0 };
  },
});

router.afterEach(to => {
  const project = to.name === 'project-detail' ? getProjectById(to.params.id) : null;
  const title = project ? (project.displayTitle || project.title) : to.name === 'projects' ? '作品抽屉' : to.name === 'project-detail' ? '未找到项目' : '独立开发者的创作空间';
  document.title = `${title} · DEV / WORKS`;
});
