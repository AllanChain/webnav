<template>
  <v-alert
    v-model="show"
    dense
    dismissible
    border="left"
    :type="message.type"
    style="word-break: break-all;"
  >
    {{ message.text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  created() {
    setTimeout(this.close.bind(this), 6000)
  },
  methods: {
    close() {
      this.show = false
    }
  }
}
</script>

<style>

</style>
