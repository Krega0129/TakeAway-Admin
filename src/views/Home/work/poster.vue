<template>
  <div class="poster">

    <toast ref="toast"></toast>

    <v-toolbar
      dense
      flat
    >
      <div></div>
      <v-spacer></v-spacer>
      <v-select
        v-if="topManager"
        dense
        class="mt-6 mx-5"
        :items="campus"
        style="width: 10px"
        label="请选择校区"
        v-model="campusSelectVal"
        solo
      ></v-select>
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
                  v-for="item in posterURL"
                  :key="item.photoId"
                  cols="12"
                  md="4"
                >
                  <v-item v-slot="{ active, toggle }">
                    <v-img
                      :src="BASE_URL + '/' + item.photo"
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
              :disabled="selected[0] == null"
              @click="deletePhotos"
            >删除</v-btn>
            <v-dialog v-model="deletePoster" max-width="500px">
              <v-card>
                <v-card-title class="headline">确定删除该海报？</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancelDelete">取消</v-btn>
                  <v-btn color="red" text @click="confirmDelete">确定</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
      </v-dialog>
    </v-toolbar>
    
    <div v-if="loading" class="grey--text text-center mt-16">加载中...请稍等</div>

    <div
      class="mx-auto mt-3 swiper pa-2"
      v-else-if="posterURL[0]"
      style="width: 70vw;"
    >
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="item in posterURL"
          :key="item.photoId"
        >
          <v-img
            :aspect-ratio="16/9"
            style="height: 100%"
            :src="BASE_URL + '/' + item.photo"
          ></v-img>
        </v-carousel-item>
      </v-carousel>
    </div>

    <div v-else class="text-center red--text mt-16">该校区还没设置海报</div>
  </div>  
</template>

<script>
  import toast from '../../../components/toast';
  import {
    updatePhoto,
    getAllCampus,
    selectPhotos,
    deletePhoto
  } from '../../../network/work'
  import { BASE_URL, H_config } from '../../../network/config'

  export default {
    name: 'poster',
    data () {
      return {
        topManager: localStorage.getItem('campusAddress') === '管理员',
        posterURL: [],
        selected: [],
        dialog: false,
        newDialog: false,
        img: null,
        BASE_URL: BASE_URL,
        campus: [],
        campusList: [],
        campusSelectVal: '请选择校区',
        campusSelectIndex: 0,
        deletePoster: false,
        loading: true
      }
    },
    components: {
      toast
    },
    async mounted() {
      if(this.topManager) {
        await getAllCampus().then(res => {
          if(res.code == H_config.STATECODE_campus_SUCCESS) {
            this.campusList = res.data
            this.campusSelectVal = this.campusList[0].campusName || ''
            this.campus = []
            for(let school of this.campusList) {
              this.campus.push(school.campusName)
            }
            this.campusSelectVal = this.campus[0]
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
        })
      }
      this._getAllPosters()
    },
    watch: {
      campusSelectVal(val) {
        this.campusSelectIndex = this.campus.indexOf(val)
        this.loading = true
        this._getAllPosters()
      },
      selected(val) {
        console.log(val);
      }
    },
    methods: {
      _getAllPosters() {
        selectPhotos({
          // campusId: this.campusList[this.campusSelectIndex].campusId
          campus: this.topManager ? this.campusSelectVal : localStorage.getItem('campusAddress')
        }).then(res => {
          if(res.code == H_config.STATECODE_get_SUCCESS) {
            this.posterURL = res.data
          } else if(res.code == H_config.STATECODE_getNull_FAILED) {
            this.posterURL = []
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
          this.loading = false
        })
      },
      uploadImg() {
        let formData = new FormData()
        formData.append('file', this.img)
        formData.append('campusId', this.campusList[this.campusSelectIndex].campusId)
        updatePhoto(formData).then(res => {
          if(res.code === H_config.STATECODE_updatePhoto_SUCCESS) {
            this.cancelUpload()
            this._getAllPosters()
            this.$refs.toast.setAlert('上传成功')
          } else {
            this.$refs.toast.setAlert('上传失败', 'error')
          }
        })
      },
      cancelUpload() {
        this.img = null
        this.newDialog = false
      },
      deletePhotos() {
        this.deletePoster = true
      },
      async confirmDelete() {
        for(let i = 0; i < this.selected.length; i++) {
          await deletePhoto({
            photoId: this.posterURL[this.selected[i]].photoId
          }).then(res => {
            if(res.code === H_config.STATECODE_deletePhoto_SUCCESS) {
              this.$refs.toast.setAlert('删除成功')
            } else {
              this.$refs.toast.setAlert('删除失败', 'error')
            }
          })
        }
        this._getAllPosters()
        this.cancelDelete()
      },
      cancelDelete() {
        this.selected = []
        this.deletePoster = false
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

  .swiper {
    box-shadow: 3px 3px 10px rgba(100,100,100,.5), -3px -3px 10px #fff;
  }
</style>