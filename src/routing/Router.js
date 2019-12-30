import Vue from "vue";
import Router from "vue-router";

import TheAddNewPage from "@/pages/TheAddNewPage.vue";
import TheHomePage from "@/pages/TheHomePage.vue";
import TheSearchPage from "@/pages/TheSearchPage.vue";
import TheWinesPage from "@/pages/TheWinesPage.vue";

import NewestReviewsTable from "@/components/review/NewestReviewsTable.vue";
import WineDetails from "@/components/wine/WineDetails.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/home",
            name: "Home",
            component: TheHomePage,
        },
        {
            path: "/new-reviews",
            name: "Reviews",
            component: NewestReviewsTable,
        },
        {
            path: "/wines",
            name: "Wines",
            component: TheWinesPage,
        },
        {
            path: "/add-new",
            name: "New",
            component: TheAddNewPage,
        },
        {
            path: "/search",
            name: "Search",
            component: TheSearchPage,
        },

        // Wine details:
        {
            path: "/wines/:wineId",
            name: "Wine",
            component: WineDetails,
            props: true,
        },
    ]
});