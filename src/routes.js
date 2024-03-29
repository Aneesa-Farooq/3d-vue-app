import { createRouter, createWebHistory } from "vue-router";
import Gown from "./Views/gown.vue"
import ShalwarKameez from "./Views/shalwarKameez.vue"
import MeshFrock from "./Views/meshFrock.vue"
import Kameez from "./Views/kameez.vue"
import ShortFrock from "./Views/shortFrock.vue"
import AR from "./Views/AR.vue"

const routes = [
  {
    path: "/gown",
    component: Gown,
    name:"Gown"
  },
  {
    path: "/",
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
    path: "/arViewer",
    component:AR ,
    name:"ar"
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
