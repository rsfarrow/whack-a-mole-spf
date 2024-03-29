<template>
  <v-layout
    column
    justify-center
    :align-space-around="$vuetify.breakpoint.smAndDown"
    :align-center="$vuetify.breakpoint.mdAndUp"
    fill-height
    class="mx-3"
  >
    <v-form
      v-if="mode === LOGIN"
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        label="E-mail"
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.required]"
        :type="showPass ? 'text' : 'password'"
        label="Password"
        @click:append="showPass = !showPass"
        @keyup.enter="loginUser()"
      />
      <div class="mt-3">
        <v-btn
          id="login-btn"
          :disabled="!valid"
          color="success"
          :width="'100%'"
          @click="loginUser()"
        >
          Login
        </v-btn>
      </div>
      <div class="mt-3">
        <v-btn
          id="go-create-account-btn"
          color="secondary"
          class="mr-4"
          @click="switchMode(REGISTER)"
        >
          Create Account
        </v-btn>
        <v-btn
          id="go-create-account-btn"
          color="primary"
          @click="showGuestLogin = true"
        >
          Sign in as Guest
        </v-btn>
      </div>
    </v-form>
    <v-form
      v-else-if="mode === REGISTER"
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.validEmail]"
        label="E-mail"
        required
      />
      <v-text-field
        v-model="name"
        :rules="[rules.required]"
        label="Name"
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPass ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        @click:append="showPass = !showPass"
      />
      <v-text-field
        v-model="confPassword"
        :append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, passwordConfirmationRule]"
        :type="showConfPass ? 'text' : 'password'"
        label="Confirm Password"
        @click:append="showConfPass = !showConfPass"
        @keyup.enter="createAccount()"
      />
      <div class="mt-3">
        <v-btn
          id="go-back-btn"
          color="secondary"
          class="mr-4"
          @click="switchMode(LOGIN)"
        >
          Go Back
        </v-btn>
        <v-btn
          id="create-account-btn"
          :disabled="!valid"
          color="success"
          @click="createAccount()"
        >
          Create Account
        </v-btn>
      </div>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      bottom
      :color="error ? 'error' : 'primary'"
    >
      {{ snackMessage }}
      <v-btn
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="showGuestLogin"
              persistent
              max-width="50%"
    >
      <v-card>
        <v-card-title class="headline">
          What can we call you?
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Name"
            required
            @keyup.enter="loginAsGuest()"
          />
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn color="secondary"
                 text
                 @click="showGuestLogin = false"
          >
            Cancel
          </v-btn>
          <v-btn color="success"
                 text
                 @click="loginAsGuest()"
          >
            Continue As Guest
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-footer class="ml-auto pt-auto"
              align-end
              :color="'transparent'"
    >
      <v-spacer />
      <v-btn
        id="about-page-btn"
        :input-value="false"
        icon
        text
        small
        @click="nav()"
      >
        <v-icon> mdi-information </v-icon>
      </v-btn>
    </v-footer>
  </v-layout>
</template>
<script>
import { APIService } from '../services/api-service.js'
const apiService = new APIService()
export const REGISTER = 'REGISTER'
export const LOGIN = 'LOGIN'
export default {
  name: 'login-page',
  data: () => ({
    // TODO: Convert literals to labels - i18n
    LOGIN,
    REGISTER,
    mode: LOGIN,
    valid: false,
    showPass: false,
    showConfPass: false,
    snackbar: false,
    timeout: 15000,
    name: '',
    email: '',
    password: '',
    confPassword: '',
    snackMessage: '',
    error: false,
    showGuestLogin: false,
    rules: {
      required: value => !!value || 'Required field.',
      min: v => (v && v.length >= 8) || 'Min 8 characters',
      validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    },
    loginUser () {
      let payload = {
        email: this.email,
        password: this.password
      }
      apiService.loginUser(payload).then((resp) => {
        this.error = !resp.success
        if (resp.success) {
          this.$store.dispatch('logInUser', resp.user)
          this.$router.push('game')
        } else {
          this.snackMessage = resp.err
          this.snackbar = true
        }
      })
    },
    switchMode (goToMode) {
      this.mode = goToMode
      this.showPass = false
      this.showConfPass = false
      this.$refs.form.reset()
    },
    loginAsGuest () {
      this.showGuestLogin = false
      this.$store.dispatch('signInAsGuest', this.name)
      this.$router.push('game')
    },
    createAccount () {
      let payload = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      apiService.createUser(payload).then((resp) => {
        this.error = !resp.success
        if (resp.success) {
          this.snackMessage = 'Account created'
          this.snackbar = true
          this.switchMode(LOGIN)
        } else {
          this.snackMessage = resp.err
          this.snackbar = true
        }
      })
    },
    nav () {
      this.$router.push({ name: 'about' })
    }
  }),
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.confPassword) || 'Passwords must match'
    }
  }
}
</script>
