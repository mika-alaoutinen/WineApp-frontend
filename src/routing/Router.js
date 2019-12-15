import Vue from "vue";
import Router from "vue-router";
import TheHomePage from "@/components/common/TheHomePage.vue";
import WineDetails from "@/components/wine/WineDetails.vue";
import WineForm from "@/components/wine/WineForm.vue";
import WineSearch from "@/components/wine/WineSearch.vue";
import WineTable from "@/components/wine/WineTable.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        // Common:
        {
            path: "/home",
            name: "Home page",
            component: TheHomePage,
        },
        
        // Reviews:

        // Wines:
        {
            path: "/wines",
            name: "Show wines",
            component: WineTable,
        },
        {
            path: "/wines/:wineId",
            name: "Show a wine",
            component: WineDetails,
            props: true
        },
        {
            path: "/add-wine",
            name: "Add wine",
            component: WineForm,
        },
        {
            path: "/search-wines",
            name: "Search for wines",
            component: WineSearch,
        },
    ]
});