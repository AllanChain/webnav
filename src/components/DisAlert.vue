<template>
  <v-alert
    v-model="show"
    density="compact"
    closable
    border="start"
    transition="slide-x-transition"
    :type="message.type"
    :style="style"
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
  data () {
    return {
      show: true,
      style: this.message.break
        ? { wordBreak: 'break-all' }
        : { hypens: 'auto' }
    }
  },
  created () {
    setTimeout(this.close.bind(this),
      this.message.delay || 4000)
  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>
