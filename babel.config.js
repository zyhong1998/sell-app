module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'

  ], "plugins": [//vant ui 按需加载
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
