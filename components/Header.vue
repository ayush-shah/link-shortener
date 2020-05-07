<template>
  <h1>
    <nuxt-link to="/">Link Shortener</nuxt-link>
  </h1>
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
  color: #fff;
  text-decoration: none;
}
a:hover {
  color: #ff003d;
}
h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 a:hover {
  color: #fbddb0;
}
h3 a,span a ,label{
  color :#00716d
}
</style>