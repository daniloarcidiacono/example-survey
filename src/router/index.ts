import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Surveys from '../views/Surveys.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Settings from '@/views/Settings.vue';
import Takes from '@/views/Takes.vue';
import TakeStep from '@/views/TakeStep.vue';
import TakeResult from '@/views/TakeResult.vue';
import Tips from '@/views/Tips.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Surveys',
    component: Surveys,
  },
  {
    path: '/survey/:surveyId/takes',
    name: 'Takes',
    component: Takes,
  },
  {
    path: '/take/:takeId/step/:step',
    name: 'TakeStep',
    component: TakeStep,
  },
  {
    path: '/take/:takeId/result',
    name: 'TakeResult',
    component: TakeResult,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/tips',
    name: 'Tips',
    component: Tips,
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
