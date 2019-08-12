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
      />
      <div class="mt-3">
        <v-btn
          color="secondary"
          class="mr-4"
          @click="switchMode(REGISTER)"
        >
          Create Account
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="loginUser()"
        >
          Login
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
        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.required, rules.min]"
        :type="showPass ? 'text' : 'password'"
        label="Password"
        hint="At least 8 characters"
        @click:append="showPass = !showPass"
      />
      <v-text-field
        v-model="confPassword"
        :append-icon="showConfPass ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.required, passwordConfirmationRule]"
        :type="showConfPass ? 'text' : 'password'"
        label="Confirm Password"
        @click:append="showConfPass = !showConfPass"
      />
      <div class="mt-3">
        <v-btn
          color="secondary"
          class="mr-4"
          @click="switchMode(LOGIN)"
        >
          Go Back
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          @click="createAccount()"
        >
          Create Account
        </v-btn>
      </div>
    </v-form>
  </v-layout>
</template>
<script>
export const REGISTER = 'REGISTER'
export const LOGIN = 'LOGIN'
export default {
  data: () => ({
    // TODO: Convert literals to labels - i18n
    LOGIN,
    REGISTER,
    mode: LOGIN,
    valid: false,
    showPass: false,
    showConfPass: false,
    name: '',
    email: '',
    password: '',
    confPassword: '',
    rules: {
      required: value => !!value || 'Required field.',
      min: v => (v && v.length >= 8) || 'Min 8 characters',
      validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    },
    loginUser () {
      // TODO: Log user in, then push to the game
      this.$router.push('GAME')
      console.log('login! ')
    },
    switchMode (goToMode) {
      this.mode = goToMode
      this.showPass = false
      this.showConfPass = false
      this.$refs.form.reset()
    },
    createAccount () {
      // TODO: API to create an account, then go back to the login screen.
      console.log('Create Account')
    }
  }),
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.confPassword) || 'Passwords must match'
    }
  }
}
</script>
