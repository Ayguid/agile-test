<template>
  <div class="ImgDetail">
    <h4>Photo view</h4>
    <router-link to="/">Back to Gallery</router-link>

    <div>
      <b-row class="mb-2">
        <b-col sm="12" md="6" lg="4">
          <div class="contain">
            <b-img
              class="m-0 image"
              v-bind="mainProps"
              v-if="img.cropped_picture"
              :src="img.cropped_picture"
            >
            </b-img>
            <div class="middle" key="lorem">
              <b-button
                class="text"
                @click="coppyToClipboard(img.cropped_picture)"
                ><b-icon icon="link45deg" aria-hidden="true"></b-icon
                >SHARE</b-button
              >
            </div>
          </div>
        </b-col>
        <b-col>
          <b-card class="mb-3">
            <b-card-text>
              <b-list-group>
                <b-list-group-item href="#"
                  ><h5>Author:</h5>
                  {{ img.author }}</b-list-group-item
                >
                <b-list-group-item href="#">
                  <h5>Camera:</h5>
                  {{ img.camera }}</b-list-group-item
                >
                <b-list-group-item href="#">
                  <h5>Tags:</h5>
                  {{ img.tags }}</b-list-group-item
                >
                <b-list-group-item href="#">
                  <b-button variant="outline-primary" @click="expandImg"
                    >HD Version +</b-button
                  >
                </b-list-group-item>
              </b-list-group>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-button variant="outline-primary" @click="scrollImg(-1)">Prev</b-button>
      <b-button variant="outline-primary" @click="scrollImg(+1)">Next</b-button>
    </div>

    <b-modal id="modal-1" title="HD Img" centered hide-footer size="xl">
      <div class="text-center">
        <h5>Zoom me, pan me</h5>
        <panZoom>
          <b-img :src="img.full_picture" fluid alt="Responsive image"></b-img>
        </panZoom>
      </div>
    </b-modal>
  </div>
</template>
<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "ImgDetail",
  props: ["id"],
  components: {},
  data() {
    return {
      img_id: this.id,
      img: "",
      mainProps: {
        center: true,
        fluidGrow: true,
        width: 600,
        height: 400,
        class: "",
      },
    };
  },
  computed: {},
  methods: {
    expandImg() {
      this.$bvModal.show("modal-1");
    },
    async scrollImg(step) {
      let index = this.$store.state.images.pictures
        .map(function(x) {
          return x.id;
        })
        .indexOf(this.img_id);
      if (step < 0) {
        index -= 1;
      } else {
        index += 1;
      }
      const nextPrevPic = this.$store.state.images.pictures[index];
      if (nextPrevPic) {
        this.img_id = nextPrevPic.id;
        this.img = await this.$store.dispatch("getImage", this.img_id);
      }
    },
    coppyToClipboard(url) {
      alert("Copied to clipboard");
      try {
        const el = document.createElement("textarea");
        el.value = url;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
    },
  },
  async mounted() {
    const response = await this.$store.dispatch("getImage", this.img_id);
    this.img = response;
    //console.log(response);
  },
};
</script>
<style>
.contain {
  position: relative;
  width: 100%;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.contain:hover .image {
  opacity: 0.3;
}

.contain:hover .middle {
  opacity: 1;
}

.text {
  background-color: #0d6efd;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}
</style>
