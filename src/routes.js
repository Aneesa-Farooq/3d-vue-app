import { createRouter, createWebHistory } from "vue-router";
import Gown from "./Views/Gown.vue"
import ShalwarKameez from "./Views/shalwarKameez.vue"
import MeshFrock from "./Views/meshFrock.vue"
import Kameez from "./Views/kameez.vue"
import ShortFrock from "./Views/shortFrock.vue"
import BallGown from "./Views/ballGown.vue"

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
      path: "/ballGown",
      component:BallGown ,
      name:"BallGown"
    },
  {
    path: "/shortFrock",
    component:ShortFrock ,
    name:"ShortFrock"
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
