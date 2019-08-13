<template>
  <v-layout
    column
    justify-center
    align-center
    fill-height
    class="mx-3 "
  >
    <h1>Score: {{ score }}</h1>
    <h1>Timer: {{ timer }}</h1>
    <v-btn
      :disabled="disableButton"
      @click="startGame()"
    >
      Start Game
    </v-btn>
    <mole
      v-for="(mole, index) in moles"
      ref="mole"
      :key="mole"
      :rate="rateArray[rateIndex]"
      :numOfMoles="moles"
      :index="index"
      :offset="offset[index]"
      @active="score++"
    />
    <!-- Rate Change -->
    <div class="mt-3">
      Change Mole Speed:
    </div>
    <v-layout align-center
              justify-center
              row
    >
      <v-btn
        :disabled="disableButton"
        text
        @click="prev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group
        v-model="rateIndex"
        class="text-center"
        dense
        mandatory
      >
        <v-item
          v-for="n in rateArray"
          :key="`btn-${n}`"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            :disabled="disableButton"
            icon
            @click="toggle"
          >
            {{ n }}
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        :disabled="disableButton"
        text
        @click="next"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-layout>

    <high-scores
      v-model="showDialog"
      :currentScore="score"
    />
  </v-layout>
</template>
<script>
import Mole from '../components/mole.vue'
import HighScores from '../components/high-scores.vue'
const GAME_LENGTH = 30
export default {
  name: 'whack-a-mole',
  components: {
    Mole,
    HighScores
  },
  data: () => ({
    moles: 3,
    score: 0,
    offset: [],
    timer: 0,
    length: 5,
    rateIndex: 0,
    rateArray: [1, 2, 3, 5, 7],
    timeout: '',
    showDialog: false
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
    },
    next () {
      this.rateIndex = this.rateIndex + 1 === this.rateArray.length
        ? 0
        : this.rateIndex + 1
    },
    prev () {
      this.rateIndex = this.rateIndex - 1 < 0
        ? this.rateArray.length - 1
        : this.rateIndex - 1
    }
  }
}
</script>
