<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          src="@/assets/rickandmortyLogo.png"
          transition="scale-transition"
          elevation="2"
          width="150"
        />
      </div>

      <v-spacer></v-spacer>

      <NavBar/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: () => ({
    //
  }),
};
</script>
