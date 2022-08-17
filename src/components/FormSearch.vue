<template>
    <v-main class="pt-0">
        <v-container  >
            <v-form ref="form" v-model="valid">
                <v-container >
                    <h2 class="text-center"> Buscar y filtrar</h2>
                    <v-row class="mt-5">
                        <v-col class="d-flex justify-center align-center" cols="12" sm="6" md="3">
                            <v-text-field required :rules="valRules" label="Nombre" v-model="form.nombre"></v-text-field>
                        </v-col>
                        <v-col class="d-flex justify-center align-center" cols="12" sm="6" md="3">
                            <v-autocomplete
                            required
                            :rules="valRules"
                            v-model="form.estado"
                            label="Estado"
                            :items="estado"
                            filled
                            rounded
                            solo
                            ></v-autocomplete>
                        </v-col>
                        <v-col class="d-flex justify-center align-center" cols="12" sm="6" md="3">
                            <v-autocomplete
                            v-model="form.genero"
                            required
                            :rules="valRules"
                            label="Genero"
                            :items="gender"
                            filled
                            rounded
                            solo
                            ></v-autocomplete>
                        </v-col>
                        <v-col class="d-flex justify-center align-center mb-5" cols="12" sm="6" md="3">
                            <v-btn :disabled="!valid" @click="buscarRickAndMorty()" width="200" color="primary" height="50">
                                Buscar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-container>
    </v-main>
</template>

<script>
export default {
    name: 'FormSearch',
    data() {
        return {
            estado: ['alive', 'dead', 'unknown'],
            gender: ['female', 'male', 'genderless', 'unknown'],
            form: {
                nombre: '',
                estado: '',
                genero: '',
            },
            valRules: [
                v => !!v || 'Campo requerido',
            ],
            characters: [],
            dialog: false,
            valid: true,
        }
    },
    methods: {
        async buscarRickAndMorty() {
            // Get all character rick and morty api
            const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${this.form.nombre}&status=${this.form.estado}&gender=${this.form.genero}`)
            const data = await res.json()
            this.characters = data.results
            this.$emit('filtrarBusqueda', data.results)
        },
        verificadorJWT() {
            if (this.userToken == '') {
                this.dialog = true
            } else {
                console.log("test")
            }
        },
        validate () {
            this.$refs.form.validate()
        },
    },
}


</script>

<style scoped>
#dialog {
    position: relative;
    width: 100vw;
    height: 100vh;
}

#alert {
    position: absolute;
    bottom: 0px;
}
</style>