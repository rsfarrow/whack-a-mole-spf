<template>
  <v-app class="wam-app">
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-if="loggedIn"
        id="nav-icon"
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
            v-for="(item, index) in items"
            :id="'nav-item-' + index"
            :key="item.title"
            link
            @click="nav(item.title)"
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
              id="logout-btn"
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
const WAM_TITLE = 'Whack-A-Mole'
const TTT_TITLE = 'Tic-Tac-Toe'
const HIGHSCORE_TITLE = 'High Scores'
const ABOUT_TITLE = 'About'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      showNav: false,
      items: [
        { title: WAM_TITLE, icon: 'mdi-gamepad-square' },
        { title: TTT_TITLE, icon: 'mdi-gamepad-round' },
        { title: HIGHSCORE_TITLE, icon: 'mdi-counter' },
        { title: ABOUT_TITLE, icon: 'mdi-information' }
      ]
    }
  },
  computed: {
    ...mapGetters(['loggedIn', 'name', 'email', 'darkMode', 'guestUser'])
  },
  methods: {
    logout () {
      if (this.guestUser) {
        this.localLogout()
      } else {
        apiService.logoutUser().then(() => {
          this.localLogout()
        })
      }
    },
    localLogout () {
      this.$store.dispatch('logOutUser')
      this.$vuetify.theme.dark = this.darkMode
      this.$router.push('login')
    },
    nav (item) {
      if (item === WAM_TITLE) {
        this.$router.push('whack-a-mole')
      } else if (item === HIGHSCORE_TITLE) {
        this.$router.push('highscores')
      } else if (item === ABOUT_TITLE) {
        this.$router.push('about')
      } else if (item === TTT_TITLE) {
        this.$router.push('tic-tac-toe')
      }
    }
  }
}
</script>
