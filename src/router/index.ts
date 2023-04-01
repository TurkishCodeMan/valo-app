import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import AgentDetailVue from '@/views/AgentDetail.vue'
import Save from '@/views/Save.vue'
import NotFound from '@/views/NotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/agent/:id',
      name: 'agent-detail',
      component: AgentDetailVue
    },
    {
      path: '/save',
      name: 'save',
      component: Save,
     
    },
    { path: '/404', component: NotFound },  
   { path: "/:catchAll(.*)",
   name: "NotFound",
   component: NotFound,}
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
