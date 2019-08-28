<template>
  <v-content>
    <v-dialog
      v-model="show"
      persistent
      :max-width=" $vuetify.breakpoint.smAndUp ? '50%' : ''"
    >
      <v-card>
        <v-card-title>
          <div class="headline text-uppercase">
            {{ newHighScore ? 'New High score!' : 'GAME OVER' }}
          </div>
          <v-spacer />
          <v-icon
            @click="$emit('click:outside', false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <div class="title">
            Your current score: {{ currentScore }}
          </div>
          <v-divider />
          <div class="title">
            {{ newHighScore ? 'Your highest score!' : 'Your high scores' }}
          </div>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  High Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in userHighscores"
                  :key="index"
                  class="hs"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.score }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <div class="title">
            All time high scores
          </div>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  High Score
                </th>
                <th class="text-left">
                  Rate
                </th>
                <th class="text-left">
                  # of Moles
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in highScores" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.score }}</td>
                <td>{{ item.rate }}</td>
                <td>{{ item.numOfMoles }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
// TODO: Possibly add a 2nd highscore component that just has a slot and dialog.
// Idea is to display the info on the page, but if we display AFTER a game, use the
// dialog vs if they visit the highscore page
import { mapGetters } from 'vuex'
export default {
  model: {
    prop: 'showDialog',
    event: 'click:outside'
  },
  props: {
    showDialog: Boolean,
    currentScore: Number,
    highScores: Array,
    newHighScore: Boolean
  },
  data: () => ({
    show: false,
    userHighscores: []
  }),
  computed: {
    ...mapGetters(['name'])
  },
  watch: {
    showDialog () {
      this.show = this.showDialog
    }
  },
  methods: {
    setUserHighscore (newHighScore, userHighscore, currentScore) {
      if (newHighScore) {
        this.$confetti.start({ })
        this.userHighscores = [{ name: this.name, score: userHighscore }]
      } else {
        this.userHighscores = [
          { name: this.name, score: userHighscore },
          { name: this.name, score: currentScore }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .hs {

// }
// .hs:hover {

  // }
</style>
