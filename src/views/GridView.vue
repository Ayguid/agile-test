<template>
  <div class="GridView">
    <h4>GRID VIEW</h4>

    <div class="mt-3">
      <b-pagination
        @page-click="changePage"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="fill"
        first-number
        last-number
      ></b-pagination>
    </div>
    <b-row>
      <b-col
        sm="12"
        md="6"
        lg="4"
        v-for="image in storeImages.pictures"
        :key="image.id"
      >
        <div class="content mb-4">
          <router-link :to="'/img/' + image.id">
            <div class="content-overlay"></div>
            <b-img
              class="content-image"
              :src="image.cropped_picture"
              fluid-grow
            ></b-img>
            <div class="content-details fadeIn-bottom">
              <h3 class="content-title">Click me</h3>
              <p class="content-text">+</p>
            </div>
          </router-link>
        </div>
      </b-col>
    </b-row>
    <div class="overlay "></div>
    <div v-if="show" class="spanner show">
      <div class="loader show"></div>
      <p>Please be patient.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "GridView",
  components: {},
  data() {
    return {
      show: false,
      //currentPage: 1,
    };
  },
  computed: {
    // could be mapped getters later...
    currentPage: {
      get() {
        return this.storeImages.page;
      },
      set(newPage) {
        return newPage;
      },
    },
    storeImages() {
      return this.$store.state?.images;
    },
    perPage() {
      return this.storeImages.pictures?.length;
    },
    rows() {
      return this.storeImages.pageCount;
    },
  },
  methods: {
    async changePage(event, page) {
      event.preventDefault();
      this.show = true;
      try {
        await this.$store.dispatch("getImages", page);
      } catch (ex) {
        alert(ex);
      } finally {
        this.show = false;
      }
    },
  },
  async mounted() {
    //await this.$store.dispatch("getImages");
  },
};
</script>
<style>
.spanner {
  position: absolute;
  top: 50%;
  left: 0;
  background: rgb(44 62 80 / 36%);
  width: 100%;
  display: block;
  text-align: center;
  height: 300px;
  color: #fff;
  transform: translateY(-50%);
  z-index: 1000;
  visibility: hidden;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

.show {
  visibility: visible;
}

.spanner,
.overlay {
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.spanner.show,
.overlay.show {
  opacity: 1;
}

.main-title {
  color: #2d2d2d;
  text-align: center;
  text-transform: capitalize;
  padding: 0.7em 0;
}

.content {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: auto;
  overflow: hidden;
}

.content .content-overlay {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  height: 99%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  -webkit-transition: all 0.4s ease-in-out 0s;
  -moz-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
}

.content:hover .content-overlay {
  opacity: 1;
}

.content-image {
  width: 100%;
}

.content-details {
  position: absolute;
  text-align: center;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  top: 50%;
  left: 50%;
  opacity: 0;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.content:hover .content-details {
  top: 50%;
  left: 50%;
  opacity: 1;
}

.content-details h3 {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.15em;
  margin-bottom: 0.5em;
  text-transform: uppercase;
}

.content-details p {
  color: #fff;
  font-size: 0.8em;
}

.fadeIn-bottom {
  top: 80%;
}

.fadeIn-top {
  top: 20%;
}

.fadeIn-left {
  left: 20%;
}

.fadeIn-right {
  left: 80%;
}
</style>
