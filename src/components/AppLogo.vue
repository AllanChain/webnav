<template>
  <div class="logo py-4">
    4
    <img src="/img/icons/android-chrome-192x192.png" width="50">
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
  color: #c8aa50;
  animation: flip-x 3s infinite;
  line-height: 0;
}

@keyframes flip-x {
  0% {
    transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotateX(-20deg);
    transform: perspective(400px) rotateX(-20deg);
  }

  55% {
    transform: perspective(400px) rotateX(25deg);
    transform: perspective(400px) rotateX(25deg);
  }

  80% {
    transform: perspective(400px) rotateX(-30deg);
    transform: perspective(400px) rotateX(-30deg);
    opacity: 1;
  }

  100% {
    transform: perspective(400px) rotateX(90deg);
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
}
</style>
