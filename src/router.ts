/**
 * Router Configuration
 */

import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import LandingView from "@/views/LandingView.vue";
import RoleSelectView from "@/views/RoleSelectView.vue";
import JourneyView from "@/views/JourneyView.vue";
import ReportView from "@/views/ReportView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: LandingView,
    meta: { title: "光影识人 - Mirror Me" },
  },
  {
    path: "/role",
    component: RoleSelectView,
    meta: { title: "选择你的镜子" },
  },
  {
    path: "/journey",
    component: JourneyView,
    meta: { title: "你的对话之旅" },
  },
  {
    path: "/report",
    component: ReportView,
    meta: { title: "Mirror Report" },
  },
  {
    path: "/report-test",
    component: ReportView,
    meta: { title: "Mirror Report - Test Mode", isTestMode: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || "光影识人";
  next();
});

export default router;
