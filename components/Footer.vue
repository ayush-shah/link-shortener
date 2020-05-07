<template>
  <h3>
    With
    <div>&#10084;</div>
    by
    <a href="https://github.com/ayush-shah">Ayush</a>
    <br />From
    <a href="https://deuexsolutions.com" rel="noopener">Deuex Solutions</a>
  </h3>
</template>
<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
h3 {
  display: block;
  margin: auto;
  text-align: center;
}
h3 div {
  display:inline-block;
  color: red;
  animation: heartSize 2s infinite linear both;
}

@keyframes heartSize {
  0% {
    font-size: 1.7em;
  }
  50% {
    font-size: 1.9em;
  }
  100% {
    font-size: 1.7em;
  }
}
</style>