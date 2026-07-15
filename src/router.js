import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import ProjectDetailView from "./views/ProjectDetailView.vue";
import ProjectsView from "./views/ProjectsView.vue";

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
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});
