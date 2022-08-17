<template>
  <v-main>
    <v-container>
      <FormSearch v-on:filtrarBusqueda='busqueda'/>
      <v-row>
        <v-col elevation="10" v-for="(character, index) in characters" :key="index">
          <v-card  class="mx-auto my-12" max-width="374">

            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" :src="character.image"></v-img>

            <v-card-title>{{ character.name }}</v-card-title>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Descripcion</v-card-title>

            <v-card-text>
              <h3 class="d-inline">Genero : </h3>
              {{ character.gender }}
            </v-card-text>

            <v-card-text>
              <h3 class="d-inline">Origen : </h3>
              {{ character.origin.name }}
            </v-card-text>

            <v-card-text>
              <h3 class="d-inline">Estado : </h3>
              {{ character.status }}
            </v-card-text>

            <v-card-text>
              <h3 class="d-inline">Numero de apariciones(Episodios) : </h3>
              {{ character.episode.length }}
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn         
                color="primary"
                :loading="dialog"
                @click="verificadorJWT(character.id)"
              >
                Guardar como favorito
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
        id="dialog"
        width="500"
        v-model="dialog"
        hide-overlay
      >
        <v-alert
          id="alert"
          class="fix my-0"
          width="500"
          v-model="dialog"
          hide-overlay
          color="red"
          dismissible
          type="error"
        > Para guardar favoritos debe iniciar sesion
        </v-alert>
    </v-dialog>
              <v-dialog
        id="dialog"
        width="500"
        v-model="dialog2"
        hide-overlay
      >
        <v-alert
          id="alert"
          class="fix my-0"
          width="500"
          v-model="dialog2"
          hide-overlay
          color="green"
          dismissible
          type="success"
        > Personaje agregado a favorito
        </v-alert>
    </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import FormSearch from '@/components/FormSearch.vue'
import { mapState } from 'vuex' 
export default {
  name: 'Home-View',
  components: {
    FormSearch,
  },
  data() {
    return {
      characters: [],
      dialog: false,
      dialog2: false,
    }
  },
  methods: {
    async getAllCharacter() {
      // Get all character rick and morty api
      const res = await fetch('http://localhost:3000/allpersonajes')
      const data = await res.json()
      this.characters = data
    },
    async verificadorJWT(characterId){
      if(this.userToken == ''){
        this.dialog = true
      }else{
        this.dialog2 = true
        try {
          const res = await fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.userToken}`
            },
            body: JSON.stringify({"new_id_personaje": characterId})
          })
          return res
        } catch (error) {
          console.log(error)
        }
      }
    },
    busqueda(data){
      this.characters = data
    }
  },
  computed: {
    ...mapState(['userToken']),
  },
  watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 5000)
      },
      dialog2 (val) {
        if (!val) return
        setTimeout(() => (this.dialog2 = false), 5000)
      },
    },
  created() {
    this.getAllCharacter()
  },
}


</script>

<style>
  #dialog{
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  #alert{
    position: absolute;
    bottom: 0px;
  }
</style>