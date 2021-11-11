<template>

  <div>
    <!-- Agregar producto, Dialogo de gestion -->
    <el-row>
      <el-col :lg="{ span: 6, offset: 18 }">
        <el-button type="primary" style="width: 100%;margin-bottom: 20px;" @click="handleShowDialog">Agregar categoría</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="Categoría"
      :visible.sync="showDialog"
    >
      <el-row>
        <h2>Crear categoría</h2>
        <el-form
          class="login-form"
          :model="form"
          :rules="formRules"
          ref="form"
          @submit.native.prevent="save"
        >
          <el-form-item prop="name">
            <el-input
              v-model="form.name"
              placeholder="Nombre"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              native-type="submit"
              block
            >
              Guardar
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>

    <!-- Lista de producto -->

    <el-row>
      <el-col>
        <el-table
          :data="categoriesList"
          style="width: 100%">
          <el-table-column label="ID" prop="id" width="70"> </el-table-column>
          <el-table-column label="Nombre" prop="name" > </el-table-column>
          <el-table-column label="Opciones" >
            <template slot-scope="scope">
              <el-tooltip  class="item" effect="dark" content="Editar" placement="left">
                <el-button type="info" size="mini" @click="edit(scope.row)">
                  <i class='bx bxs-edit' ></i>
                </el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="Eliminar" placement="right">
                <el-button type="danger" size="mini" @click="deleteRow(scope.row)">
                  <i class='bx bxs-trash' ></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  export default {
    name: "categoriesForm",
    data() {
      return {
        showDialog: false,
        isEditing: false,
        categoriesList: [],

        /* Formularios */
        form: {
          id: null,
          name: '',
        },
        formRules: {
          name: [
            { required: true, message: "Nombre requerido", trigger: "blur" }
          ]
        }
      }
    },
    mounted() {
      this.getAll()
    },
    methods: {
      async getAll() {
        const data = await this.$axios.get('/categories')
        this.categoriesList = data.data.data
      },
      handleShowDialog(){
        this.showDialog = true
        this.isEditing = false
        this.form = {
          id: null,
          name: '',
        }
      },
      async create() {
        const vm = this
        const valid = await vm.$refs.form.validate();
        if (!valid) return
        const { id, ...data } = vm.form
        try {
          await vm.$axios.post('/categories', data)
          vm.showDialog = false
          vm.$notify.success('Categoría guardado correctamente')
          vm.getAll()
        } catch (e) {
          vm.$notify.error(e.response.data.message)
        }
      },
      async update() {
        const vm = this
        const valid = await vm.$refs.form.validate();
        if (!valid) return
        const { id, ...data } = vm.form
        try {
          await vm.$axios.put(`/categories/${id}`, data)
          vm.showDialog = false
          vm.$notify.success('Categoría guardado correctamente')
          vm.getAll()
        } catch (e) {
          vm.$notify.error(e.response.data.message)
        }
      },
      async save() {
        if (this.isEditing) {
          this.update()
        } else {
          this.create()
        }
      },
      async deleteRow(row) {
        const vm = this
        try {
          await vm.$axios.delete(`/categories/${row.id}`)
          vm.$notify.success('Categoría eliminado correctamente')
          vm.getAll()
        } catch (e) {
          vm.$notify.error(e.response.data.message)
        }
      },
      edit(row) {
        const vm = this
        vm.showDialog = true
        vm.isEditing = true
        vm.form = row
      }
    }
  }
</script>

<style scoped>

</style>
