<template>
  <div class="container">
    <form method="POST" @submit.prevent.stop="checkUrl" autocomplete="off">
      <label for="URL">URL</label>
      <input type="text" placeholder="URL eg. www.example.com" name="url" v-model="URL" />
      <label for="URL">Short Link Name</label>
      <input type="text" placeholder="Shorten it to" v-model="nameForWebsite" />
      <input type="submit" value="Submit" />
      <span class="warning">{{warning}}</span>
      <span class="success">{{success}}</span>

      <br />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return { URL: '', nameForWebsite: '', warning: '', success: '' }
  },
  methods: {
    checkUrl() {
      if (
        this.URL.match(/^w{3}.\w*.\w{1,3}/g) ||
        this.URL.match(/^\w*.\w{1,3}/g)
      ) {
        this.sendReq()
      } else {
        this.warning = 'URL Entered Incorrectly'
        this.URL = ''
      }
    },
    sendReq() {
      let nameForWebsite = this.nameForWebsite
      let URL = this.URL
      let jsonData = {}
      jsonData[nameForWebsite] = URL
      fetch('/link', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      }).then(response => console.log(response))
      this.success = window.location.href + this.nameForWebsite
      this.URL = ''
      this.nameForWebsite = ''
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.success{
  background:lightskyblue
}
form {
  width: 75%;
  display: flex;
  flex-flow: column wrap;
}

input[type='text'],
input[type='submit'] {
  border: none;
  outline: none;
  box-shadow: 0px 1px 1px #999;
  padding: 15px;
  text-indent: 10px;
  width: 100%;
  margin: 2.5% 0;
}

input[type='submit'] {
  margin-top: 5%;
}
.warning {
  background: lightcoral;
}
</style>
