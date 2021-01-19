<template>
  <div class="poster">
    <v-toolbar
      dense
      flat
    >
      <div></div>
      <v-spacer></v-spacer>
      <v-dialog
        max-width="1000px"
        v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            v-bind="attrs"
            color="success"
            v-on="on"
          >
            编辑海报
          </v-btn>
        </template>
        <v-card
          class="mx-auto pa-3"
        >
          <v-container class="pa-1">
            <v-item-group
              v-model="selected"
              multiple
            >
              <v-row>
                <v-col
                  v-for="item in imgUrl"
                  :key="item.id"
                  cols="12"
                  md="4"
                >
                  <v-item v-slot="{ active, toggle }">
                    <v-img
                      :src="item.url"
                      height="150"
                      class="text-right pa-2"
                      @click="toggle"
                    >
                      <v-btn
                        icon
                        dark
                      >
                        <v-icon>
                          {{ active ? 'mdi-check-circle-outline' : 'mdi-circle-outline' }}
                        </v-icon>
                      </v-btn>
                    </v-img>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-container>
          
          <v-toolbar
            flat
          >
            <v-spacer></v-spacer>
            <v-dialog
              max-width="500px"
              v-model="newDialog"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-2"
                  v-bind="attrs"
                  color="success"
                  v-on="on"
                >
                  新增
                </v-btn>
              </template>
              <v-card
                class="mx-auto pa-3 text-right"
              >
                <v-file-input
                  accept="image/*"
                  label="上传图片"
                  v-model="img"
                ></v-file-input>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  class="mx-2"
                  @click="cancelUpload"
                >
                  取消
                </v-btn>
                <v-btn
                  color="success"
                  class="mx-2"
                  @click="uploadImg"
                >
                  确定
                </v-btn>
              </v-card>
            </v-dialog>
            
            <v-btn 
              class="mx-2" 
              color="error"
              :disabled="!selected[0]"
            >删除</v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
      </v-dialog>
    </v-toolbar>
    

    <v-carousel
      class="mx-auto mt-3"
      cycle
      style="width: 70vw"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="item in imgUrl"
        :key="item.id"
      >
        <v-img
          :aspect-ratio="16/9"
          style="height: 100%"
          :src="item.url"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
  </div>  
</template>

<script>
  export default {
    name: 'poster',
    data () {
      return {
        imgUrl: [
          {
            url: 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
            id: 1
          },
          {
            url: 'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
            id: 2
          },
          {
            url: 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
            id: 3
          }
        ],
        // imgUrl: [
        //   'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
        //   'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
        // ],
        selected: [],
        dialog: false,
        newDialog: false,
        img: ''
      }
    },
    methods: {
      uploadImg() {
        console.log(this.img);
        this.cancelUpload()
      },
      cancelUpload() {
        this.img = ''
        this.newDialog = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep{
    @media screen and (max-width: 1280px) {
      .v-window.v-item-group.v-carousel {
        height: 70vh !important
      }
      .v-responsive__content {
        height: 70vh
      }
    }
  }
</style>