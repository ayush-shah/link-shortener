<template>
  <h1>{{link}}</h1>
</template>

<script>
export default {
  name: 'name',
  data() {
    return { seconds: 1, link: 'Link will Update in few seconds' }
  },
  mounted() {
    fetch('/name', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: this.$route.params.name.toUpperCase() })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          if (data['link'] !== undefined) {
            this.link = 'Going to ' + data['link']
            location.replace('https://' + data['link'])
          } else {
            this.link = 'No allocation of any link to this name'
          }
        })
      }
    })
  }
}
</script>