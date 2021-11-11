<template>
  <div>
    <el-row>
      <el-col :lg="{ span : 12, offset: 6}">
        <el-card class="options-container">
          <el-row>
            <el-col :lg="{ span: 6, offset: 18}">
              <el-button style="width: 100%;" @click="$auth.logout()">
                Cerrar sesión
                <i class='bx bx-exit' ></i>
              </el-button>
            </el-col>
          </el-row>
          <div class="options">
            <ul>
              <a href.prevent="#" @click="showProductsForm">
                <li :class="{ active: showingProducts }"> <i class='bx bx-box'></i> Productos </li>
              </a>
              <a href.prevent="#"  @click="showCategoriesForm">
                <li :class="{ active: showingCategories }"> <i class='bx bxs-category'></i> Categorías </li>
              </a>
            </ul>
          </div>
        </el-card>
        <el-card class="forms-container" v-if="!(!showingProducts && !showingCategories)">
          <transition name="block" mode="out-in" >
            <categories-form key="a" v-if="showingCategories"/>
            <products-form  key="b" v-if="showingProducts"/>
          </transition>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    middleware: 'mustLogin',
    data() {
      return {
        showingProducts: false,
        showingCategories: false
      }
    },
    methods: {
      showProductsForm() {
        this.showingProducts = true
        this.showingCategories = false
      },
      showCategoriesForm() {
        this.showingProducts = false
        this.showingCategories = true
      },
    }
  }
</script>
<style>
  .block-enter {
    opacity: 0;
  }
  .block-enter-active {
    animation : slide-in .2s ease-out forwards;
    transition : opacity .2s;
  }
  .block-leave {
    opacity: 1;
  }
  .block-leave-active {
    animation : slide-out .2s ease-out forwards;
    transition : opacity .2s;
    opacity: 0;
  }
  @keyframes slide-in {
    from {
      transform: translateX(20px);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes slide-out {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-20px);
    }
  }
</style>
