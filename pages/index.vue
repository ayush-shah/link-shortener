<template>
  <div class="container">
    <form method="POST" @submit.prevent.stop="checkUrl" autocomplete="off" class="linkForm">
      <label for="URL">URL</label>
      <input
        type="text"
        placeholder="URL eg. www.example.com"
        name="url"
        v-model="URL"
        required
        autofocus
      />
      <label for="URL">Short Link Name</label>
      <input type="text" placeholder="Shorten it to" v-model="nameForWebsite" required />
      <input type="submit" value="Submit" />
    </form>
    <span
      v-if="this.danger!==''"
      :class="[this.danger!==''?'breakopaque danger':'danger']"
    >{{danger}}</span>
    <span
      v-if="this.warning!==''"
      :class="[this.warning!==''?'breakopaque warning':'warning']"
    >{{warning}}</span>
    <span
      v-if="this.success!==''"
      :class="[this.success!==''?'breakopaque success':'success']"
    >{{success}}</span>
    <div class="jsonList-container">
      <div class="jsonList">URL</div>
      <div class="jsonList">ShortLink</div>
      <div class="jsonList">
        <span v-for="value in values" :key="value">{{value}}</span>
      </div>
      <div class="jsonList">
        <span v-for="key in keys" :key="key">
          <nuxt-link :to="'/'+key">{{key}}</nuxt-link>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      URL: '',
      nameForWebsite: '',
      warning: '',
      success: '',
      keys: '',
      values: '',
      danger: ''
    }
  },
  methods: {
    checkUrl() {
      if (
        this.URL.match(/^w{3}.\w*\.\w{1,3}/g) ||
        this.URL.match(/^\w*(\.\w{1,3})$/g)
      ) {
        if (
          this.values.includes(this.URL.toUpperCase()) ||
          this.keys.includes(this.nameForWebsite.toUpperCase())
        ) {
          this.warning = this.URL + ' or ' + this.nameForWebsite + ' exists'
          setTimeout(() => {
            this.warning = ''
          }, 4000)
        } else {
          this.sendReq()
        }
      } else {
        this.danger = 'URL Entered Incorrectly'
        setTimeout(() => {
          this.danger = ''
        }, 4000)
        this.URL = ''
      }
    },
    sendReq() {
      let nameForWebsite = this.nameForWebsite.toUpperCase()
      let URL = this.URL.toUpperCase()
      let jsonData = {}
      jsonData[nameForWebsite] = URL
      fetch('/link', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then(res => res.json())
        .then(data => {
          this.keys = Object.keys(data)
          this.values = Object.values(data)
        })
      this.success = window.location.href + this.nameForWebsite
      setTimeout(() => {
        this.success = ''
      }, 4000)
      this.URL = ''
      this.nameForWebsite = ''
    }
  },
  mounted() {
    fetch('/get', {
      method: 'POST'
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.keys = Object.keys(data)
        this.values = Object.values(data)
      })
  }
}
</script>

<style scoped>
.jsonList {
  display: flex;
  flex-flow: column;
}
.breakopaque {
  opacity: 1;
  animation: fadein 4s 1 linear;
}
@keyframes fadein {
  0%,
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@media only screen and (max-width: 758px) {
  span.success,
  span.warning,
  span.danger {
    position: relative;
    width: 100%;
    margin: 0 auto;
    opacity: 1;
    height: auto;
    top: 0;
    right: 0;
  }
  form.linkForm {
    width: 100%;
    padding: 0;
  }
  div.jsonList-container {
    width: 100%;
  }
  label {
  color: #42030c;
  font-weight: 600;
}
}
.jsonList-container {
  width: 45%;
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  margin: 0 auto;
}

.jsonList {
  display: flex;
  flex-flow: column-reverse;
  flex: 1 0 50%;
  box-shadow: 0px 0px 1px #000;
  overflow: auto;
  margin: 0;
}
.container {
  margin: 0 auto;
  height: 60vh;
  width: 95%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.success {
  background: lightgreen;
}
.danger {
  background: lightpink;
}
.success,
.warning,
.danger {
  opacity: 0;
  position: absolute;
  top: 2.5%;
  padding: 10px;
  border-radius: 5px;
  right: 2.5%;
  height: 20%;
  width: 20%;
  word-break: break-word;
  color: white;
}
form {
  width: 75%;
  display: flex;
  flex-flow: column wrap;
  padding: 0 15%;
}

input[type='text'],
input[type='submit'] {
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 1px 1px #999;
  padding: 15px;
  text-indent: 10px;
  width: 100%;
  margin: 2.5% auto;
}

input[type='submit'] {
  margin-top: 5%;
}
.warning {
  background: orange;
}
</style>
