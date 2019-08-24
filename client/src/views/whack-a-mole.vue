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
        @updateSettings="rate=$event.rate; moles=$event.moles;customCursor = $event.customCursor;setUpOffset()"
      />
      <high-scores
        v-model="showDialog"
        :currentScore="score"
        :highScores="highScores"
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
    customCursor: true,
    highScores: [{ name: 'Sam', score: '12', rate: '2', moles: '3' }, { name: 'Sam', score: '10', rate: '2', moles: '3' }, { name: 'Sam', score: '8', rate: '2', moles: '3' }, { name: 'Sam', score: '6', rate: '2', moles: '3' }, { name: 'Sam', score: '4', rate: '2', moles: '3' }]
  }),
  computed: {
    disableButton () {
      return this.timer > 0
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
          this.showDialog = true
          clearTimeout(this.timeout)
          this.timeout = ''
          this.$refs.mole.forEach((mole) => {
            mole.stopTime()
          })
        }
      }, 1000)
    },
    setUpOffset () {
      this.offset = []
      for (let i = 0; i < this.moles; i++) {
        this.offset.push(Math.floor(Math.random() * 250))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.play-area {
  cursor: url('https://github.com/sfarrowbioiq/whack-a-mole-spf/blob/master/public/img/hammer.png?raw=true'), default;

}
</style>
