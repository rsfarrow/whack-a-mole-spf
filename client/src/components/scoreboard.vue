<template>
  <div :class="$vuetify.theme.dark ? 'background' : 'grey darken-4'">
    <v-row>
      <v-col :class="['text-center', 'red--text', 'text-uppercase', 'overline', 'ml-1', {'smaller-font': $vuetify.breakpoint.xsOnly}]">
        {{ title }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center red--text overline">
        {{ numberDisplay }}
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'scoreboard',
  props: {
    numberDisplay: [Number, String],
    title: String
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Wallpoet&display=swap');
.overline {
  font-size: 46px !important;
  &.smaller-font {
    font-size: 32px !important;
  }
  font-family: Wallpoet;
}
.background {
  // same as the dark-mode background color -- can't use 'bg-color'
  // because in light mode it will be white (and we want a scoreboard look)
  // Not sure why it's not in the color pallet though
  background-color: #303030;
  max-height: 100px;
}
</style>
