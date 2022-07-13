module.exports = {
  plugins: {
    'postcss-pxtorem': {
        // 如果是vant组件 就返回37.5，否则就返回75
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),
      propList: ['*']
    }
  }
}
