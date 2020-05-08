<template>
  <div class="logo py-4">
    4
    <v-icon class="pb-3" size="60" color="#2196f3">
      mdi-github
    </v-icon>
    4
  </div>
</template>

<script>
export default {

}
</script>

<style>
.logo {
  font-size: 65px;
  color: #2196f3;
  animation: flip-x 3s infinite;
  -webkit-animation: flip-x 3s infinite;
  line-height: 0;
}

@keyframes flip-x {
  0% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    -ms-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }

  40% {
    -webkit-transform: perspective(400px) rotateX(-20deg);
    -ms-transform: perspective(400px) rotateX(-20deg);
    transform: perspective(400px) rotateX(-20deg);
  }

  55% {
    -webkit-transform: perspective(400px) rotateX(25deg);
    -ms-transform: perspective(400px) rotateX(25deg);
    transform: perspective(400px) rotateX(25deg);
  }

  80% {
    -webkit-transform: perspective(400px) rotateX(-30deg);
    -ms-transform: perspective(400px) rotateX(-30deg);
    transform: perspective(400px) rotateX(-30deg);
    opacity: 1;
  }

  100% {
    -webkit-transform: perspective(400px) rotateX(90deg);
    -ms-transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
}
</style>
