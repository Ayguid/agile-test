<template>
  <div id="app">
    <!--
    <div id="nav">
      <router-link to="/">Images</router-link> |
      <router-link to="/imgDetail">ImgDetail</router-link>
    </div>
  -->
    <b-container>
      <div class="mt-4">
        <router-view />
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
  async beforeMount() {
    try {
      const tokenReq = await this.$store.dispatch("getAccessToken");
      //console.log(tokenReq);
      if (tokenReq) await this.$store.dispatch("getImages");
    } catch (ex) {
      //console.log(ex);
      await this.$store.dispatch("resetToken");
      this.$store.dispatch("getImages");
    } finally {
      console.log("Token action");
    }
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
