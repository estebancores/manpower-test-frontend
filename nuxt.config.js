export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Prueba Esteban Córdoba',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' },
    ]
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/styles',
  ],
  plugins: [
    '@/plugins/element-ui'
  ],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    redirect: {
      login: '/auth',
      home: '/',
      logout: '/auth'
    },
    strategies: {
      local: {
        endpoints: {
          user: false,
          logout: false,
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'data.token'
          }
        }
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:9001/api'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
