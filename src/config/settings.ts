/** 布局配置 */
interface ILayoutSettings {
  title: string,
  /** 是否显示 Settings Panel */
  showSettings: boolean
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示侧边栏 Logo */
  showSidebarLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
}

const layoutSettings: ILayoutSettings = {
  title: 'admin后台管理',
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
}

export default layoutSettings