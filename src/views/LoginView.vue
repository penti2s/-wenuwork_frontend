<template>
    <v-container>
        <v-row justify="center">
            <v-col md="5">
                <h2> Login </h2>
                <v-form ref="form" v-model="valid">
                    <v-text-field type="email" placeholder="Email" label="Email" single-line solo v-model="email"
                        required :rules="emailRules">
                    </v-text-field>

                    <v-text-field type="password" placeholder="Password" label="Password" single-line solo
                        v-model="password" required :rules="passwordRules"></v-text-field>
                    <v-btn class="float-right" elevation="2" outlined rounded text @click="login" :disabled="!valid">
                        Ingresar </v-btn>
                </v-form>
            </v-col>
        </v-row>
        <v-dialog id="dialog" width="500" v-model="dialog" hide-overlay>
            <v-alert id="alert" class="fix my-0" width="500" v-model="dialog" hide-overlay color="red" dismissible
                type="error"> Correo o contraseña incorrectos
            </v-alert>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'Login-View',
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
            dialog: false,
        }
    },
    methods: {
        ...mapActions(['setToken']),
        async login() {
            this.$refs.form.validate()
            try {
                const res = await fetch(`${process.env.VUE_APP_URL_BACKEND}/login`, {
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
                    this.dialog = true
                    throw new Error('Correo o contraseña incorrectos')
                }
                localStorage.setItem('token', JSON.stringify(data.token))
                this.setToken(data.token)
                this.$router.push({ name: 'home' })
            } catch (err) {
                console.log(err.message)
            }
        },
    },
    watch: {
        dialog(val) {
            if (!val) return
            setTimeout(() => (this.dialog = false), 5000)
        },
    }
}
</script>

<style>
</style>