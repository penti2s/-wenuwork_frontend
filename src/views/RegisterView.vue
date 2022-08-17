<template>
    <v-container>
        <v-row justify="center">
            <v-col md="5">
                <h2> Registro </h2>
                <v-form ref="form" v-model="valid">
                    <v-text-field 
                        type="email" 
                        placeholder="Email" 
                        label="Email" 
                        single-line solo 
                        v-model="email"
                        required
                        :rules="emailRules"
                    >
                    </v-text-field>

                    <v-text-field 
                        type="password" 
                        placeholder="Password" 
                        label="Password" 
                        single-line solo
                        v-model="password"
                        required
                        :rules="passwordRules"
                        ></v-text-field>
                    <v-btn 
                        class="float-right" 
                        elevation="2" 
                        outlined 
                        rounded 
                        text 
                        @click="register"
                        :disabled="!valid"
                    > Registrar </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {  mapActions } from 'vuex'
export default {
    name: 'Register-View',
    data() {
        return {
            email: '',
            password: '',
            valid: true,
            emailRules: [
                v => !!v || 'Correo es requerido',
                v => /.+@.+\..+/.test(v) || 'Formato del correo invalido',
            ],
            passwordRules: [
                v => !!v || 'Contraseña es requerida',
                v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
            ],
        }
    },
    methods: {
        ...mapActions(['setToken']),
        async register() {
            this.$refs.form.validate()
            try {
                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    }),
                })
                const data = await res.json()
                if (data.token == undefined) {
                    throw new Error('Error al registrar')
                }
                localStorage.setItem( 'token', JSON.stringify(data.token) )
                this.setToken(data.token)
                this.$router.push({ name: 'home' })
            } catch (err) {
                console.log(err.message)
            }
        },
        //Registro usuario con fetch

    }
}
</script>

<style>
</style>