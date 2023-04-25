import { reactive, onMounted, onBeforeUnmount } from 'vue'
export const useMousePosition = () => {
  //鼠标点击坐标
  let point = reactive({
    x: 0,
    y: 0
  })

  //实现鼠标点击获取坐标的方法
  function savePoint(event: any) {
    point.x = event.pageX
    point.y = event.pageY
    console.log(point)
  }

  //实现鼠标点击获取坐标的方法的生命周期钩子
  onMounted(() => {
    window.addEventListener('click', savePoint)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint)
  })

  return point
}

