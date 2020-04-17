<template>
  <v-dialog value="true" fullscreen @input="$emit('input', false)">
    <v-card>
      <v-card-title class="pa-0">
        <v-toolbar color="indigo" dark dense>
          <v-toolbar-title>Config WebNav</v-toolbar-title>
          <v-spacer />
          <v-btn icon large @click="done">
            <v-icon color="green lighten-2">
              check
            </v-icon>
          </v-btn>
          <v-btn icon large @click="$emit('input', false)">
            <v-icon color="yellow lighten-2">
              cancel
            </v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-title>
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
              min="0" max="10"
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
        <v-switch
          v-model="config.blackText"
          class="mt-0"
          :label="config.blackText ? 'Black text' : 'White text'"
        />
        <v-color-picker
          v-show="config.bgImg.filter.blur"
          v-model="config.bgImg.filter.blurColor"
          canvas-height="100"
          hide-inputs flat
        />
        <div
          style="width: 100%; height: 180px; position: relative; 
              overflow: hidden"
        >
          <div
            class="bg-image bg-preview"
            :style="{
              borderColor: config.bgImg.filter.blurColor,
              backgroundImage: `url(${config.bgImg.url})`,
              filter: `blur(${config.bgImg.filter.blur}px)
            contrast(${config.bgImg.filter.contrast}%)
            grayscale(${config.bgImg.filter.grayscale}%)`
            }"
          />
          <div
            class="pa-3"
            :style="{
              position: 'absolute',
              color: config.blackText ? '#000' : '#eee',
              textShadow: `1px 1px 3px
            ${config.blackText ? '#eee' : '#000'}`
            }"
          >
            {{ 'Example Text '.repeat(20) }}
          </div>
        </div>
        <v-divider class="my-3" />
        <v-text-field
          v-model="config.cors"
          prepend-inner-icon="flight_takeoff"
          label="CORS Proxy"
          placeholder="https://netnr-proxy.cloudno.de/"
          outlined dense
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
.bg-preview {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-width: 10px;
  border-style: solid;
}
</style>
