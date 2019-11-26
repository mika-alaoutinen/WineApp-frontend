import Vue from "vue";
import Router from "vue-router";
import TheHomePage from "@/components/common/TheHomePage.vue";
import WineComponent from "@/components/wine/WineComponent.vue";
import WineForm from "@/components/wine/WineForm.vue";
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
            path: "/wine/:wineId",
            name: "Show a wine",
            component: WineComponent,
            props: true
        },
        
        {
            path: "/wines",
            name: "Show wines",
            component: WineTable
        },

        {
            path: "/add-wine",
            name: "Add wine",
            component: WineForm
        },
    ]
});