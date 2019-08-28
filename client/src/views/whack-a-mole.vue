<template>
  <div>
    <v-container>
      <v-row
        :justify="'space-around'"
      >
        <scoreboard
          :numberDisplay="(timer.toString().padStart(2, '0'))"
          :title="'Timer'"
          class="mx-3 my-3"
        />
        <scoreboard
          :numberDisplay="(score.toString().padStart(2, '0'))"
          :title="'Score'"
          class="mx-3 my-3"
        />
      </v-row>
      <v-row
        :justify="'center'"
      >
        <v-btn
          :disabled="disableButton"
          @click="startGame()"
        >
          Start Game
        </v-btn>
      </v-row>
      <v-row
        :align-content="'center'"
        :class="{'play-area': customCursor}"
      >
        <v-col v-for="(mole, index) in moles"
               :key="index"
               :align-self="'center'"
        >
          <mole
            ref="mole"
            :key="mole"
            :rate="rate"
            :numOfMoles="moles"
            :index="index"
            :offset="offset[index]"
            @active="score++"
          />
        </v-col>
      </v-row>
      <settings
        v-model="showSettings"
        :rate="rate"
        :moles="moles"
        :customCursor="customCursor"
        :darkMode="darkMode"
        @updateSettings="updateSettings($event)"
      />
      <high-scores
        ref="highscoreDialog"
        v-model="showDialog"
        :currentScore="score"
        :highScores="highScores"
        :newHighScore="newHighScore"
      />
    </v-container>
    <v-footer class="ml-auto mt-auto"
              align-end
              :color="'transparent'"
    >
      <v-spacer />
      <v-btn
        :input-value="false"
        icon
        text
        small
        @click="disableButton ? '' : showSettings = true"
      >
        <v-icon> mdi-settings </v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>
<script>
import Mole from '../components/mole.vue'
import Scoreboard from '../components/scoreboard.vue'
import HighScores from '../components/high-score-display.vue'
import Settings from './settings.vue'
import { APIService } from '../services/api-service.js'
import { mapGetters } from 'vuex'
const apiService = new APIService()
const GAME_LENGTH = 15
export default {
  name: 'whack-a-mole',
  components: {
    Mole,
    HighScores,
    Scoreboard,
    Settings
  },
  data: () => ({
    moles: 3,
    score: 0,
    offset: [],
    timer: 0,
    length: 5,
    timeout: '',
    rate: 1,
    showDialog: false,
    showSettings: false,
    highScores: [],
    userHighscore: 0,
    newHighScore: false
  }),
  computed: {
    disableButton () {
      return this.timer > 0
    },
    ...mapGetters(['name', 'darkMode', 'customCursor'])
  },
  watch: {
    showDialog () {
      if (!this.showDialog) {
        this.$confetti.stop()
      }
    }
  },
  mounted () {
    this.setUpOffset()
  },
  methods: {
    startGame () {
      this.$refs.mole.forEach((mole) => {
        mole.startTime()
      })
      this.timer = GAME_LENGTH
      this.startTimer()
    },
    startTimer () {
      this.score = 0
      this.setUpOffset()
      this.timeout = setInterval(() => {
        this.timer--
        if (this.timer === 0) {
          clearTimeout(this.timeout)
          this.timeout = ''
          this.$refs.mole.forEach((mole) => {
            mole.stopTime()
          })
          this.setHighscore()
        }
      }, 1000)
    },
    setUpOffset () {
      this.offset = []
      for (let i = 0; i < this.moles; i++) {
        this.offset.push(Math.floor(Math.random() * 250))
      }
    },
    setHighscore () {
      let payload = {
        name: this.name,
        score: this.score,
        rate: this.rate,
        numOfMoles: this.moles
      }
      apiService.sendHighscores(payload).then((resp) => {
        this.highScores = resp.scores
        this.newHighScore = resp.user.newUserHighscore
        this.$refs.highscoreDialog.setUserHighscore(resp.user.newUserHighscore, resp.user.highScore, this.score)
        this.showDialog = true
        // this.$refs.highscoreDialog.setUserHighscore(true, 15, 15) // testing highscore
      })
    },
    updateSettings (event) {
      this.rate = event.rate
      this.moles = event.moles
      event.customCursor ? this.$store.dispatch('turnOnCustomCursor') : this.$store.dispatch('turnOffCustomCursor')
      event.darkMode ? this.$store.dispatch('turnOnDarkMode') : this.$store.dispatch('turnOffDarkMode')
      this.$vuetify.theme.dark = this.darkMode
      this.setUpOffset()
    }
  }
}
</script>
<style lang="scss" scoped>
.play-area {
  cursor: url('https://github.com/sfarrowbioiq/whack-a-mole-spf/blob/master/public/img/hammer.png?raw=true'), default;

}
</style>
