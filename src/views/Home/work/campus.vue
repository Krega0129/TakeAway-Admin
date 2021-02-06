<template>
  <div class="campus">

    <toast ref="toast"></toast>

    <v-data-table
      :headers="headers"
      :items="campus"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="campusName"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      :loading="loading"
      loading-text="加载中...请稍后"
      v-if="this.$route.meta.title === '设置校区'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索"
            class="mt-6"
          ></v-text-field>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                dark
                class="ma-2"
                v-bind="attrs"
                v-on="on"
              >
                新增校区
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-form
                v-model="valid"
              >
                <v-card-text>
                  <v-container>
                      <v-text-field
                        v-model="editedItem.campusName"
                        label="校区名"
                        :rules="campusNameRule"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.campusCost"
                        :rules="rules"
                        label="配送费"
                      ></v-text-field>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    :disabled="!valid"
                    @click="save"
                  >
                    保存
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deleteCampus" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定删除该校区?删除后校区里面的商家也会退出!</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelDelete">取消</v-btn>
                <v-btn color="red" text @click="confirmDelete">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn 
          small
          dark
          class="mx-2"
          @click="editCampus(item)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
          编辑校区名
        </v-btn>
        <v-btn 
          small
          color="error"
          class="mx-2"
          @click="deCampus(item)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-delete
        </v-icon>
          删除校区
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import {
    getAllCampus,
    updateCampusInfo,
    deleteCampus,
    addCampus
  } from '../../../network/work'
  import {
    H_config
  } from '../../../network/config'
  import toast from '../../../components/toast';

  export default {
    name: 'campus',
    data() {
      return {
        headers: [
          {
            text: '校区',
            align: 'start',
            sortable: false,
            value: 'campusName'
          },
          {
            text: '配送费',
            align: 'start',
            sortable: true,
            value: 'campusCost'
          },
          {
            text: '商家数量',
            align: 'start',
            sortable: true,
            value: 'shopNum'
          },
          {
            text: '详情',
            align: 'center',
            sortable: false,
            value: 'actions',
            width: 400
          }
        ],
        rules: [
          v => v != null || '配送费不能为空',
          v => /^[0-9]+([.]\d{1,2})?$/.test(v) || '必须为数字且最多包含两位小数'
        ],
        campusNameRule: [
          v => !!v || '校区名不能为空'
        ],
        valid: true,
        campus: [],
        selected: [],
        singleSelect: false,
        deleteCampus: false,
        search: '',
        multiSelect: false,
        dialog: false,
        editedIndex: -1,
        editedItem: {
          campusName: '',
          campusCost: 0,
          campusStatus: 1
        },
        loading: true
      }
    },
    components: {
      toast
    },
    mounted() {
      this._getAllCampus()
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1;
      },
      _getAllCampus() {
        getAllCampus().then(res => {
          if(res.code == H_config.STATECODE_campus_SUCCESS) {
            this.campus = []
            let campusList = res.data
            for(let campus of campusList) {
              this.campus.push(campus)
            }
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
          this.loading = false
        })
      },
      editCampus(item) {
        this.editedIndex = this.campus.indexOf(item),
        this.editedItem.campusCost = Number(item.campusCost).toFixed(2)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deCampus(item) {
        this.editedIndex = this.campus.indexOf(item)
        this.deleteCampus = true
      },
      cancelDelete() {
        this.editedIndex = -1;
        this.deleteCampus = false
      },
      async confirmDelete() {
        await deleteCampus({
          campusId: this.campus[this.editedIndex].campusId
        }).then(res => {
          if(res.code == H_config.STATECODE_campus_SUCCESS) {
            this.campus.splice(this.editedIndex, 1)
            this.$refs.toast.setAlert('删除成功')
          } else {
            this.$refs.toast.setAlert('删除失败', 'error')
          }
        })
        this.editedIndex = -1;
        this.deleteCampus = false
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem.campusName = ''
          this.editedItem.campusCost = 0
          this.editedIndex = -1
        })
      },
      async save () {
        if (this.editedIndex > -1) {
          await updateCampusInfo(JSON.stringify(this.editedItem)).then(res => {
            if(res.code == H_config.STATECODE_campus_SUCCESS) {
              Object.assign(this.campus[this.editedIndex], this.editedItem)
              this.$refs.toast.setAlert('修改成功')
            } else {
              this.$refs.toast.setAlert('修改失败', 'error')
            }
          })
        } else {
          await addCampus(JSON.stringify(this.editedItem)).then(res => {
            if(res.code == H_config.STATECODE_campus_SUCCESS) {
              this.campus.push(this.editedItem)
              this.$refs.toast.setAlert('新增成功')
              // 需要重新获取 得到 campusId 才能进行删除操作
              this._getAllCampus()
            } else {
              this.$refs.toast.setAlert('新增失败', 'error')
            }
          })
        }
        this.close()
      },
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增校区' : '编辑校区'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
  }
</script>

<style lang="scss" scoped>
  
</style>