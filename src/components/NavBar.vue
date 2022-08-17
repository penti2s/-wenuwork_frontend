<template>
    <div class="menu-box d-flex justify-center align-center">
        <router-link class="menu-link"  to="/">
            Home 
        </router-link>
        <router-link v-if="!userToken" class="menu-link"  to="/login">
            Login
        </router-link>
        <router-link v-if="!userToken" class="menu-link"  to="/register">
            Registro
        </router-link>
        <router-link v-if="userToken" class="menu-link"  to="/favorites">
            Favoritos
        </router-link>
        <router-link  v-if="userToken" class="menu-link "  to="/">
            <v-btn color="red" class="exit" @click="logout">
                Logout
            </v-btn>
        </router-link>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'NavBar',
    computed: {
        ...mapState(['userToken'])
    },
    methods: {
        ...mapActions(['deleteToken']),
        logout() {
            this.deleteToken()
        }
    }
};

</script>

<style scoped>
.menu-link {
    padding: 5px;
    text-decoration: none;
    color: #fff;
    margin: 0 10px
}
a:hover {
    background-color: rgba(63, 81, 181, 0.3);
    border-radius: 5px;
    color: #42b983;
}
.exit{
    padding: 5px;
}

</style>