<template>
  <v-dialog value="true" @input="$emit('input', false)">
    <v-card>
      <v-toolbar color="indigo" dark dense>
        <v-toolbar-title>Config WebNav</v-toolbar-title>
        <v-spacer />
        <v-btn icon large @click="done">
          <v-icon color="green lighten-2">
            check
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="mt-4">
        <v-text-field
          v-model="config.bgImg"
          prepend-inner-icon="image"
          label="Image URL"
          placeholder="back.jpg"
          outlined dense
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      config: JSON.parse(JSON.stringify(this.$store.state.config))
    }
  },
  methods: {
    done() {
      this.$store.commit('updateConfig', this.config)
      this.$emit('input', false)
    }
  }
}
</script>

<style>

</style>
