<!-- Navigation.vue -->
<template>
    <nav class="z-50 close">
        <div class="nav-links">
            <a href="javascript:void(0)" class="close-btn" @click="closeNav">×</a>
            <div v-for="(item, index) in navItems" :key="index">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </div>
        </div>
    </nav>
    <button class="open-btn" @click="openNav">☰ Items</button>
</template>

<script>
export default {
    name: "SideNavigation",
    data() {
        return {
            navItems: [

                { name: "ShalwarKameez", path: "/" },
                { name: "MeshFrock", path: "/meshFrock" },
                { name: "Kameez", path: "/kameez" },
                { name: "ShortFrock", path: "/shortFrock" },
                { name: "Gown", path: "/gown" },
            ],
        };
    },
    methods: {
        openNav() {
            document.querySelector("nav").classList.remove("close");
        },
        closeNav() {
            document.querySelector("nav").classList.add("close");
        },
    },
};
</script>

<style scoped>
nav {
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    padding: 3rem 2rem;
    display: flex;
    align-items: center;
    transition: all 0.5s ease-in-out;
}
.close-btn{
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 2rem !important;
    cursor: pointer;
}

.open-btn{
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.2rem !important;
    cursor: pointer;
    z-index: 49;
}

.nav-links {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: inherit;
    font-size: 1.2rem;
    letter-spacing: .5px;
}

.z-50 {
    z-index: 50;
}

.close{
    transform: translateX(100%);
}

</style>