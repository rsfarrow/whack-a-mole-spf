<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-if="loggedIn"
        @click="showNav = !showNav"
      />
      <v-toolbar-title class="headline text-uppercase">
        <span>WHACK</span>
        <span class="font-weight-light">-a-Mole</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <!-- Navigation Drawer
           TODO: Make a component -->
      <v-navigation-drawer
        v-if="loggedIn"
        v-model="showNav"
        app
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Whack-A-Mole
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ `${name} / ${email}` }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn
              block
              @click="logout()"
            >
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { APIService } from '../services/api-service.js'
const apiService = new APIService()

export default {
  components: {
  },
  data () {
    return {
      showNav: false,
      items: [
        { title: 'Whack-A-Mole', icon: 'mdi-gamepad-square' },
        { title: 'High Scores', icon: 'mdi-counter' },
        { title: 'About', icon: 'mdi-information' }
      ]
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'name', 'email'])
  },
  methods: {
    logout () {
      apiService.logoutUser().then(() => {
        console.log('logout')
        this.$store.dispatch('logOutUser')
        console.log('dispatched')
        this.$router.push('login')
        console.log('login')
      })
    }
  }
}
</script>
