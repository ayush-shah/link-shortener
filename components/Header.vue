<template>
  <nuxt-link to="/">
    <h1>Link Shortener</h1>
  </nuxt-link>
</template>
<script>
export default {
  name: 'Header'
}
</script>

<style>
h1,
h3 {
  height: 20vh;
}
a {
  color:green;
  text-decoration: none;
}
a:hover{
  color:darkgreen
}
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 a{
  color:lightgreen
}
</style>