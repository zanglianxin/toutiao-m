// 引入dayjs
import dayjs from 'dayjs'
// 封装 ==> new Date()
console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'))
// 配置到现在的时间插件
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文

export default dayjs
