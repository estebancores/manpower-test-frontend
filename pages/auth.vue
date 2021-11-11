<template>
  <div class="login">
    <el-row type="flex" justify="center">
      <el-col :lg="{ span: 4 }" >
        <el-card class="login-container">
          <h2>Iniciar sesión</h2>
          <el-form
            class="login-form"
            :model="form"
            :rules="formRules"
            ref="form"
            @submit.native.prevent="login"
          >
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                placeholder="Correo eletrónico"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="Contraseña"
                type="password"
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
                Ingresar
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "auth",
    middleware: 'guest',
    data() {
      return {
        form: {
          email: 'email@email.com',
          password: '12345'
        },
        formRules: {
          email: [
            { required: true, message: "Correo eletrónico requerido",trigger: "blur" }
          ],
          password: [
            { required: true, message: "Contraseña requerida", trigger: "blur" }
          ]
        }
      }
    },
    methods: {
      async login() {
        const vm = this
        const valid = await vm.$refs.form.validate();
        if (!valid) return
        try {
          await vm.$auth.loginWith('local', {
            data: vm.form
          }).then( async (res) => {
            const data = res.data.data
            vm.$auth.setUserToken(data.token, false)
          })
        } catch (e) {
          vm.$message.error(e.response.data.message)
        }
      }
    }
  }
</script>
