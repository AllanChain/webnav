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
          v-model="config.bgImg.url"
          prepend-inner-icon="image"
          label="Image URL"
          placeholder="back.jpg"
          outlined dense
        />
        <v-row no-gutters>
          <v-col cols="3" sm="2" md="1">
            <v-label>Blur</v-label>
          </v-col>
          <v-col cols="9" sm="10" md="11">
            <v-slider 
              v-model="config.bgImg.filter.blur" 
              min="0" max="20"
              thumb-label hide-details
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="3" sm="2" md="1">
            <v-label>Contrast</v-label>
          </v-col>
          <v-col cols="9" sm="10" md="11">
            <v-slider 
              v-model="config.bgImg.filter.contrast" 
              min="0" max="200"
              thumb-label hide-details
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="3" sm="2" md="1">
            <v-label>Gray</v-label>
          </v-col>
          <v-col cols="9" sm="10" md="11">
            <v-slider 
              v-model="config.bgImg.filter.grayscale" 
              min="0" max="100"
              thumb-label hide-details
            />
          </v-col>
        </v-row>
        <div 
          :style="{
            backgroundImage: `url(${config.bgImg.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '180px',
            filter: `blur(${config.bgImg.filter.blur}px)
            contrast(${config.bgImg.filter.contrast}%)
            grayscale(${config.bgImg.filter.grayscale}%)`
          }"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import validate from '@/validator'

export default {
  data() {
    return {
      config: JSON.parse(JSON.stringify(this.$store.state.config))
    }
  },
  methods: {
    done() {
      if (validate('/config', this.config)) {
        this.$store.commit('updateConfig', this.config)
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style>
.img-preview {
  max-width: 90%;
  max-height: 200px;
}
</style>
