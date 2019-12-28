import Vue from "vue";
import Router from "vue-router";

import TheHomePage from "@/pages/TheHomePage.vue";
import TheSearchPage from "@/pages/TheSearchPage.vue";
import TheWinesPage from "@/pages/TheWinesPage.vue";

import NewestReviewsTable from "@/components/review/NewestReviewsTable.vue";

import AddWineForm from "@/components/wine/AddWineForm.vue";
import WineDetails from "@/components/wine/WineDetails.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        // Pages:
        {
            path: "/home",
            name: "Home",
            component: TheHomePage,
        },
        {
            path: "/search",
            name: "Search",
            component: TheSearchPage,
        },
        {
            path: "/wines",
            name: "Wines",
            component: TheWinesPage,
        },
        
        // Reviews:
        {
            path: "/new-reviews",
            name: "Reviews",
            component: NewestReviewsTable,
        },

        // Wines:
        {
            path: "/add-wine",
            name: "Add-wine",
            component: AddWineForm,
        },
        {
            path: "/wines/:wineId",
            name: "Wine",
            component: WineDetails,
            props: true,
        },
    ]
});