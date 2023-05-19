import { createRouter, createWebHistory } from "vue-router";
import Gown from "./Views/gown.vue"
import ShalwarKameez from "./Views/shalwarKameez.vue"
import MeshFrock from "./Views/meshFrock.vue"
import Kameez from "./Views/kameez.vue"
import ShortFrock from "./Views/shortFrock.vue"
import Augmented from "./Views/augmented.vue"

const routes = [
  {
    path: "/",
    component: Gown,
    name:"Gown"
  },
  {
    path: "/shalwarKameez",
    component:ShalwarKameez ,
    name:"ShalwarKameez"
  },
  {
    path: "/meshFrock",
    component: MeshFrock, 
    name:"MeshFrock"
  },
  {
    path: "/kameez",
    component:Kameez ,
    name:"Kameez"
  },
  {
    path: "/shortFrock",
    component:ShortFrock ,
    name:"ShortFrock"
  },
  {
    path: "/augmentedReality",
    component:Augmented ,
    name:"AugmentedReality"
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
