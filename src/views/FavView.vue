<template>
    <v-container>
        <h2 class="text-center">Tus personajes Favoritos</h2>
        <div class="d-flex flex-column justify-center align-center mt-5" v-if="validPersonajesFav == true">
            <h3 >Aun no tienes personajes guardados como favoritos</h3>
            <img class="mt-5" width="400" src="@/assets/tenor.png" alt="">
        </div>
        <v-row v-if="validPersonajesFav == false">
            <v-col elevation="10" v-for="(character, index) in dataCharacter" :key="index">
                <v-card class="mx-auto my-12" max-width="374">

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

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'FavView',
    data() {
        return {
            idPersonajes: [],
            dataCharacter: [],
            validPersonajesFav: false,
        };
    },
    methods: {
        async getAllCharacterSave() {
            if (this.userToken == '') {
                return;
            }
            try {
                const res = await fetch('http://localhost:3000/allsaveCharacter', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.userToken}`
                    },
                })
                const data = await res.json()
                this.idPersonajes = data
                if (this.idPersonajes.length == undefined) {
                    this.validPersonajesFav = true
                    throw new Error('No hay personajes guardados')
                }
                const stringIdPersonajes = this.idPersonajes.join(',')
                const res2 = await fetch(`https://rickandmortyapi.com/api/character/${stringIdPersonajes}`)
                const data2 = await res2.json()
                this.dataCharacter = data2
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed: {
        ...mapState(['userToken']),
    },
    created() {
        this.getAllCharacterSave()
    },
};

</script>

<style>
</style>