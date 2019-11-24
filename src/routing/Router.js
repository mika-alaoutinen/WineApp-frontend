import Vue from "vue";
import Router from "vue-router";
import Wine from "@/components/Wine.vue";
import WineForm from "@/components/WineForm.vue";
import WineTable from "@/components/WineTable.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/wine/:id",
            name: "Show a wine",
            component: Wine,
            props(route) {
                const props = {...route.params};
                props.id = +props.id;
                return props;
              }
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