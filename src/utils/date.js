
// 专门处理时间的功能模块
import dayjs from 'dayjs'// 导入专门处理时间的功能模块
import rTime from 'dayjs/plugin/relativeTime'// 引入获取相对当前时间的插件
import 'dayjs/locale/zh-cn'// 引入语言包

// 注册 修改时间格式包的插件 能得到相对当前时间的时间表示
dayjs.extend(rTime)
dayjs.locale('zh-cn') // 配置中文语言包
// 导出一个 方法relativeTime 是处理当前时间 获取到当前时间相对表达方式
// dayjs()from()是一个方法 获取当前相对时间
// dateTime 是传入的当前时间
export const relativeTime = dateTime => {
  return dayjs().from(dayjs(dateTime))
}
