export default {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 设计稿宽度 / 10，例如设计稿宽度为 375px，则 rootValue 为 37.5
      propList: ['*'], // 需要转换的属性，* 表示所有属性
      selectorBlackList: [], // 不需要转换的选择器
      replace: true, // 是否直接替换值
      mediaQuery: false, // 是否转换媒体查询中的 px
      minPixelValue: 2, // 最小转换值，小于该值的 px 不转换
    },
  },
};
