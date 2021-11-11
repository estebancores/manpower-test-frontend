<template>

  <div>
    <!-- Agregar producto, Dialogo de gestion -->
    <el-row>
      <el-col :lg="{ span: 6, offset: 18 }">
        <el-button type="primary" style="width: 100%;margin-bottom: 20px;" @click="handleShowDialog">Agregar producto</el-button>
      </el-col>
    </el-row>
    <el-dialog
      title="Producto"
      :visible.sync="showDialog"
    >
      <el-row>
        <h2>Crear producto</h2>
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
          <el-form-item prop="category_id">
            <el-select style="width: 100%;" v-model="form.category_id" filterable placeholder="Seleccione categoría">
              <el-option
                v-for="item in selectAbleCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="quantity">
            <el-input
              v-model.number="form.quantity"
              placeholder="Cantidad"
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


<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="showDialog = false">Cancel</el-button>-->
<!--        <el-button type="primary" @click="showDialog = false">Confirm</el-button>-->
<!--      </div>-->
    </el-dialog>

    <!-- Lista de producto -->

    <el-row>
      <el-col>
        <el-table
          :data="productList"
          style="width: 100%">
          <el-table-column label="ID" prop="id" width="70"> </el-table-column>
          <el-table-column label="Nombre" prop="name" > </el-table-column>
          <el-table-column label="Categoría" prop="categoryName"> </el-table-column>
          <el-table-column prop="quantity" label="Cantidad"> </el-table-column>

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
    name: "productsForm",
    data() {
      return {
        showDialog: false,
        isEditing: false,
        productList: [],
        selectAbleCategories: [],

        /* Formularios */
        form: {
          id: null,
          name: '',
          category_id: null,
          quantity: null
        },
        formRules: {
          category_id: [
            {required: true, message: "Categoría requerida", trigger: "blur"}
          ],
          name: [
            {required: true, message: "Nombre requerido", trigger: "blur"},
            {
              min: 3,
              max: 50,
              message: 'Por favor complete el campo con un mínimo de 3 y un máximo de 50 caracteres',
              trigger: 'blur'
            }
          ],
          quantity: [
            {required: true, message: "Cantidad requerida", trigger: "blur"},
            { type: 'number', message: 'La cantidad debe ser en números' }
          ]
        }
      }
    },
    mounted() {
      this.getAll()
      this.getAllCategories()
    },
    methods: {
      async getAll() {
        const data = await this.$axios.get('/products')
        this.productList = data.data.data
      },
      async getAllCategories() {
        const res = await this.$axios.get('/categories')
        this.selectAbleCategories = res.data.data
      },
      handleShowDialog(){
        this.showDialog = true
        this.isEditing = false
        this.form = {
          id: null,
          name: '',
          category_id: null,
          quantity: null
        }
      },
      async create() {
        const vm = this
        const valid = await vm.$refs.form.validate();
        if (!valid) return
        const { id, ...data } = vm.form
        try {
          await vm.$axios.post('/products', data)
          vm.showDialog = false
          vm.$notify.success('Producto guardado correctamente')
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
          await vm.$axios.put(`/products/${id}`, data)
          vm.showDialog = false
          vm.$notify.success('Producto guardado correctamente')
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
          await vm.$axios.delete(`/products/${row.id}`)
          vm.$notify.success('Producto eliminado correctamente')
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
