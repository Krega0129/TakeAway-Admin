<template>
  <div class="campus">

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

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

              <v-card-text>
                <v-container>
                    <v-text-field
                      v-model="editedItem.campusName"
                      label="校区名"
                    ></v-text-field>
                    <v-text-field
                      v-model="editedItem.campusCost"
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
                  @click="save"
                >
                  保存
                </v-btn>
              </v-card-actions>
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
    deleteCampus
  } from '../../../network/work'
  import {
    H_config
  } from '../../../network/config'
  import tip from '../../../components/tip';
  import { showTip, close } from '../../../utils'

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
          deliverFee: 0,
          shopNum: 0
        },
        show: false,
        alertText: '',
        alertType: 'success'
      }
    },
    components: {
      tip
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
          console.log(res);
          if(res.code == H_config.STATECODE_campus_SUCCESS) {
            this.campus = []
            let campusList = res.data
            for(let campus of campusList) {
              this.campus.push(campus)
            }
          }
        })
      },
      editCampus(item) {
        console.log(item);
        this.editedIndex = this.campus.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deCampus(item) {
        console.log(item);
        this.editedIndex = this.campus.indexOf(item)
        console.log(this.editedIndex);
        this.deleteCampus = true
      },
      cancelDelete() {
        this.editedIndex = -1;
        this.deleteCampus = false
      },
      confirmDelete() {
        deleteCampus({
          campusId: this.campus[this.editedIndex].campusId
        }).then(res => {
          if(res.code == H_config.STATECODE_campus_SUCCESS) {
            // this.campus.splice(this.editedIndex, 1)
            showTip.call(this, '删除成功')
          }
        })
        this.editedIndex = -1;
        this.deleteCampus = false
      },
      addCampus() {
        console.log('新增校区');
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem.campusName = ''
          this.editedItem.deliverFee = 0
          this.editedIndex = -1
        })
      },
      save () {
        Object.assign(this.campus[this.editedIndex], this.editedItem)
        if (this.editedIndex > -1) {
          updateCampusInfo(JSON.stringify(this.editedItem)).then(res => {
            if(res.code == H_config.STATECODE_campus_SUCCESS) {
              showTip.call(this, '修改成功')
            } else {
              showTip.call(this, '修改失败', 'error')
            }
          })
        } else {
          this.campus.push(this.editedItem)
        }
        this.close()
      },
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增校区' : '编辑校区'
      },
      tip() {
        return 'tip'
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