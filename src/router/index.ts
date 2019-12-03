import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../routes/List.vue'
import ListItem from "@/routes/ListItem.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/hero',
    name: 'hero',
    component: ListItem,
  },
  {
    path: '/new',
    name: 'new',
    component: ListItem,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router
