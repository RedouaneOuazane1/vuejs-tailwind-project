import { createRouter, createWebHistory } from 'vue-router'
import AjoutLivre from '../views/ajoutLivre.vue'
import AfficheLivre from '../views/afficheLivre.vue'
import LivreDetails from '../views/livreDetails.vue'


const routes = [
  {
    path: '/',
    name: 'AfficheLivre',
    component: AfficheLivre
  },
  {
    path: "/edit/:id",
    name: 'ajoutLivre',
    component: AjoutLivre

  },
  {
    path: '/livre/:id',
    name: 'livreDetails',
    component: LivreDetails,
    props: true
  },
  {
    path: '/ajout',
    name: 'AjoutLivre',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ajoutLivre.vue')
  },

  //redirect
  {
    path:'/all-book',
    redirect:'/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
