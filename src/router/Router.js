import Vue from 'vue'
import Router from 'vue-router'

import TheAddNewPage from '@/pages/TheAddNewPage.vue'
import TheHomePage from '@/pages/TheHomePage.vue'
import TheReviewsPage from '@/pages/TheReviewsPage.vue'
import TheSearchPage from '@/pages/TheSearchPage.vue'
import TheUserPage from '@/pages/TheUserPage.vue'
import TheWinesPage from '@/pages/TheWinesPage.vue'

import ReviewDetails from '@/components/review/ReviewDetails.vue'
import ReviewDetailsEdit from '@/components/review/ReviewDetailsEdit.vue'
import WineDetails from '@/components/wine/WineDetails.vue'
import WineDetailsEdit from '@/components/wine/WineDetailsEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // Routes in main navigation bar:
    {
      path: '/home',
      name: 'home',
      component: TheHomePage,
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: TheReviewsPage,
    },
    {
      path: '/wines',
      name: 'wines',
      component: TheWinesPage,
    },
    {
      path: '/add-new',
      name: 'add',
      component: TheAddNewPage,
    },
    {
      path: '/search',
      name: 'search',
      component: TheSearchPage,
    },
    {
      path: '/user',
      name: 'user',
      component: TheUserPage,
    },

    // Review details:
    {
      path: '/reviews/:reviewId',
      name: 'review',
      component: ReviewDetails,
      props: true,
    },
    {
      path: '/reviews/:reviewId/edit',
      name: 'edit-review',
      component: ReviewDetailsEdit,
      props: true,
    },

    // Wine details:
    {
      path: '/wines/:wineId',
      name: 'wine',
      component: WineDetails,
      props: true,
    },
    {
      path: '/wines/:wineId/edit',
      name: 'edit-wine',
      component: WineDetailsEdit,
      props: true,
    },
  ],
})
