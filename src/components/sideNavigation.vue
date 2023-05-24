<!-- Navigation.vue -->
<template>
    <nav class="z-50">
        <ul class="nav-links">
            <li v-for="(item, index) in navItems" :key="index">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
        </ul>
    </nav>
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
</style>