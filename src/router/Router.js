import Vue from 'vue'
import Router from 'vue-router'

import TheAddNewPage from '@/pages/TheAddNewPage.vue'
import TheHomePage from '@/pages/TheHomePage.vue'
import TheSearchPage from '@/pages/TheSearchPage.vue'
import TheReviewsPage from '@/pages/TheReviewsPage.vue'
import TheWinesPage from '@/pages/TheWinesPage.vue'

import ReviewDetails from '@/components/review/ReviewDetails.vue'
import WineDetails from '@/components/wine/WineDetails.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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

    // Review details:
    {
      path: '/reviews/:reviewId',
      name: 'review',
      component: ReviewDetails,
      props: true,
    },

    // Wine details:
    {
      path: '/wines/:wineId',
      name: 'wine',
      component: WineDetails,
      props: true,
    },
  ],
})
