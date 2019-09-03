<template>
  <v-content>
    <v-dialog
      v-model="show"
      persistent
    >
      <v-card>
        <v-card-title>
          <div class="headline text-uppercase">
            Settings
          </div>
        </v-card-title>
        <v-card-text>
          <div class="mt-3">
            Change Mole Speed:
          </div>
          <v-layout align-center
                    justify-center
                    row
          >
            <v-btn
              text
              :x-small="$vuetify.breakpoint.xsOnly"
              @click="rateIndex = prev(rateIndex, rateArray)"
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
                  :x-small="$vuetify.breakpoint.xsOnly"
                  icon
                  @click="toggle"
                >
                  {{ n }}
                </v-btn>
              </v-item>
            </v-item-group>
            <v-btn
              text
              :x-small="$vuetify.breakpoint.xsOnly"
              @click="rateIndex = next(rateIndex, rateArray)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-layout>
          <div class="mt-3">
            Change Number of Moles:
          </div>
          <v-layout align-center
                    justify-center
                    row
          >
            <v-btn
              text
              :x-small="$vuetify.breakpoint.xsOnly"
              @click="moleIndex = prev(moleIndex, moleArray)"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group
              v-model="moleIndex"
              class="text-center"
              dense
              mandatory
            >
              <v-item
                v-for="m in moleArray"
                :key="`btn-${m}`"
                v-slot:default="{ active, toggle }"
              >
                <v-btn
                  :input-value="active"
                  :x-small="$vuetify.breakpoint.xsOnly"
                  icon
                  @click="toggle"
                >
                  {{ m }}
                </v-btn>
              </v-item>
            </v-item-group>
            <v-btn
              text
              :x-small="$vuetify.breakpoint.xsOnly"
              @click="moleIndex = next(moleIndex, moleArray)"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-layout>
          <div class="mt-3">
            Custom Cursor:
          </div>
          <v-switch v-model="internalCustomCursor" />
          <div class="mt-3">
            Dark Mode:
          </div>
          <v-switch v-model="internalDarkMode" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="secondary"
            @click="$emit('click:outside', false)"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="updateSettings()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>
<script>
// TODO: Possibly add a 2nd highscore component that just has a slot and dialog.
// Idea is to display the info on the page, but if we display AFTER a game, use the
// dialog vs if they visit the highscore page
export default {
  name: 'settings',
  model: {
    prop: 'showDialog',
    event: 'click:outside'
  },
  props: {
    showDialog: Boolean,
    rate: Number,
    moles: Number,
    customCursor: Boolean,
    darkMode: Boolean
  },
  data: () => ({
    show: false,
    rateIndex: 0,
    rateArray: [1, 2, 3, 5, 7],
    moleIndex: 0,
    moleArray: [3, 5, 7],
    internalCustomCursor: false,
    internalDarkMode: false
  }),
  watch: {
    showDialog () {
      this.show = this.showDialog
    },
    customCursor () {
      this.internalCustomCursor = this.customCursor
    },
    darkMode () {
      this.internalDarkMode = this.darkMode
    }
  },
  mounted () {
    this.rateIndex = this.rateArray.findIndex((el) => { return el === this.rate })
    this.moleIndex = this.moleArray.findIndex((el) => { return el === this.moles })
    this.internalCustomCursor = this.customCursor
    this.internalDarkMode = this.darkMode
  },
  methods: {
    next (index, array) {
      let newIndex = index + 1 === array.length
        ? 0
        : index + 1
      return newIndex
    },
    prev (index, array) {
      return index - 1 < 0
        ? array.length - 1
        : index - 1
    },
    updateSettings () {
      this.$emit('updateSettings', {
        rate: this.rateArray[this.rateIndex],
        moles: this.moleArray[this.moleIndex],
        customCursor: this.internalCustomCursor,
        darkMode: this.internalDarkMode })
      this.$emit('click:outside', false)
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
