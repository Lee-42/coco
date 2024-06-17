// 是否自动登录
export const IS_AUTO_LOGIN = 'is_auto_login'
// userId
export const USER_ID = 'user_id'
// account_id
export const ACCOUNT_ID = 'account_id'
// entry_pwd
export const ENTRY_PWD = 'entry_pwd'

// setting
export const SETTING = 'setting'

// MFPToken
export const MFPToken = 'MFPToken'

// app_type 应用类型
export const APP_TYPE = {
  CLOSED_BETA: '0', // 内测类型
  REAL_DEBUG: '9' // 真机调试类型
}

// pty 通信类型
export const pty_channel = {
  PTY_SPAWN: 'pty:spawn',
  PTY_ACK_DATA: 'pty:ack-data',
  PTY_EXISTS: 'pty:exists',
  PTY_WRITE: 'pty:write',
  PTY_GET_PID: 'pty:get-pid',
  PTY_RESIZE: 'pty:resize',
  PTY_KILL: 'pty:kill',
  PTY_CLEAR: 'pty:clear'
}

// emit type
export const EMIT_TYPE = {
  explorer: 'explorer',
  editor_change: 'editor_change',
  editor_unlink: 'editor_unlink',
  navigator: 'navigator',
  device_debugger: 'device_debugger',
  app_uploader: 'app_uploader',
  compile: 'compile',
  refresh: 'refresh',
  devtool: 'devtool',
  problem: 'problem',
  terminal: 'terminal',
  webview_url_changed: 'webview_url_changed',
  clean_cache: 'clean_cache',
  editor_go_match: 'editor_go_match',
  append_message: 'append_message',
  open_project_detail: 'open_project_detail',
  dock_panel_file_change: 'dock_panel_file_change'
}

// 清除缓存类型
export const CLEAN_CACHES = {
  simulator: {
    label: '清除模拟器缓存',
    type: 'simulator'
  },
  compile: {
    label: '清除编译缓存',
    type: 'compile'
  },
  file: {
    label: '清除项目文件列表缓存',
    type: 'file'
  },
  all: {
    label: '清除所有缓存',
    type: 'all'
  }
}

// 微应用状态
export const MINIPROGRAM_STATUS = {
  compiling: 'compiling', // 编译中
  compiled: 'compiled', // 编译完成
  interrupted: 'interrupted' // 中断
}

// 打开设置窗口时导航到那个tab
export const SETTING_TAB = {
  common: 'common',
  appearance: 'appearance',
  shortcut: 'shortcut'
}

// 打开登录窗口时, 关闭之后的操作
export const LOGIN_BEHAVIOR = {
  go_project: 'go_project', // 跳转项目页
  sync_info: 'sync_info' // 同步其他窗口的登录信息
}

// 打开项目页面的操作
export const PROJECT_BEHAVIOR = {
  new_project: 'new_project',
  import_project: 'import_project',
  check_project: 'check_project',
  recent_project: 'recent_project'
}

// dock 面板的类型
export const DOCK_PANEL_TYPE = {
  home: 'home',
  editor: 'editor',
  image: 'image',
  audio: 'audio',
  svn: 'svn',
  git: 'git',
  dependent: 'dependent',
  unknow: 'unknow'
}

// 暴露给webview全局调用的key
export const apiKey = 'cefQuery'

// IDE环境
export const IDE_ENV = [
  {
    id: 1,
    label: '环境1 - http://10.30.80.184:8100',
    url: 'http://10.30.80.184:8100'
  }
]

// 编译器
export const COMPILER = {
  NT_COMPILER: 'nt_compiler', // 南天微应用编译器
  WX_COMPILER: 'wx_compiler', // 微信微应用编译器
  VUE_COMPILER: 'vue_compiler', // vue编译器
  NT2WX_COMPILER: 'nt2wx_compiler', // 南天微应用转微信微应用编译器
  WX2NT_COMPILER: 'wx2nt_compiler', // 微信微应用转南天微应用编译器
  AUTO: 'auto' // 自动
}

// 启动器
export const LAUNCHER = {
  NT_LAUNCHER: 'nt_launcher', // 南天微应用启动器
  WX_LAUNCHER: 'wx_launcher', // 微信微应用启动器
  WEB_LAUNCHER: 'web_launcher', // web应用启动器
  AUTO: 'auto' // 自动识别
}

// 渠道
export const PLATFORMS = {
  MOBILE: {
    label: '移动端',
    type: 'mobile'
  },
  DESKTOP: {
    label: '柜面',
    type: 'desktop'
  },
  WEB: {
    label: 'Web',
    type: 'web'
  },
  AUTO: {
    label: '自动识别(本地磁盘、 svn、 git)',
    type: 'AUTO'
  }
}

// 所有的开发者工具
export const DEVTOOLS = {
  wechat_devtools: 'wechat_devtools',
  baidu_devtools: 'baidu_devtools',
  zhifubao_devtools: 'zhifubao_devtools',
  bytedance_devtools: 'bytedance_devtools',
  qq_devtools: 'qq_devtools',
  jd_devtools: 'jd_devtools',
  auto_devtools: 'auto_devtools',
  no_devtools: 'no_devtools'
}

// 项目类型
export const PROJECT_TEMPLATE = {
  nt_empty_mobile: {
    id: 0,
    type: 'nt_empty_mobile',
    label: '南天微应用-空白模板',
    zipPath: 'nt_empty_mobile.zip',
    needEmptyPath: true, // 是否需要空白目录
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.MOBILE.type,
    devtools: DEVTOOLS.no_devtools
  },
  nt_demo_mobile: {
    id: 1,
    type: 'nt_demo_mobile',
    label: '南天微应用-示例模板',
    zipPath: 'nt_demo_mobile.zip',
    needEmptyPath: true,
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.MOBILE.type,
    devtools: DEVTOOLS.no_devtools
  },
  wx_js_base: {
    id: 2,
    type: 'wx_js_base',
    label: '微信微应用-js基础模板',
    zipPath: 'wx_js_base.zip',
    needEmptyPath: true,
    compiler: COMPILER.WX_COMPILER,
    launcher: LAUNCHER.WX_LAUNCHER,
    platform: PLATFORMS.MOBILE.type,
    devtools: DEVTOOLS.wechat_devtools
  },
  nt_empty_desktop: {
    id: 3,
    type: 'nt_empty_desktop',
    label: '南天微应用-空白模板',
    zipPath: 'nt_empty_desktop.zip',
    needEmptyPath: true,
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.DESKTOP.type,
    devtools: DEVTOOLS.no_devtools
  },
  nt_demo_desktop: {
    id: 4,
    type: 'nt_demo_desktop',
    label: '南天微应用-示例模板',
    zipPath: 'nt_demo_desktop.zip',
    needEmptyPath: true,
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.DESKTOP.type,
    devtools: DEVTOOLS.no_devtools
  },
  nt_public_component: {
    id: 5,
    type: 'nt_public_component',
    label: '南天微应用-业务组件模板',
    zipPath: 'nt_public_component.zip',
    needEmptyPath: false,
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.DESKTOP.type,
    devtools: DEVTOOLS.no_devtools
  },
  nt_desktop_project: {
    id: 6,
    type: 'nt_desktop_project',
    label: '南天微应用-多应用模板',
    zipPath: 'nt_desktop_project.zip',
    needEmptyPath: true,
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.DESKTOP.type,
    devtools: DEVTOOLS.no_devtools
  },
  web_empty: {
    id: 7,
    type: 'web_empty',
    label: 'web应用-空白模板',
    zipPath: 'web_empty.zip',
    needEmptyPath: true, // 是否需要空白目录
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.WEB.type,
    devtools: DEVTOOLS.no_devtools
  },
  web_demo: {
    id: 8,
    type: 'web_demo',
    label: 'web应用-示例模板',
    zipPath: 'web_demo.zip',
    needEmptyPath: true,
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.WEB.type,
    devtools: DEVTOOLS.no_devtools
  },
  import: {
    id: 9,
    type: 'import',
    label: '从本地磁盘导入',
    zipPath: '',
    needEmptyPath: false,
    compiler: COMPILER.AUTO,
    launcher: LAUNCHER.AUTO,
    platform: PLATFORMS.AUTO.type,
    devtools: DEVTOOLS.auto_devtools
  },
  svn: {
    id: 10,
    type: 'svn',
    label: '从svn检出',
    zipPath: '',
    needEmptyPath: true,
    compiler: COMPILER.AUTO,
    launcher: LAUNCHER.AUTO,
    platform: PLATFORMS.AUTO.type,
    devtools: DEVTOOLS.auto_devtools
  },
  git: {
    id: 11,
    type: 'git',
    label: '从git拉取',
    zipPath: '',
    needEmptyPath: true,
    compiler: COMPILER.AUTO,
    launcher: LAUNCHER.AUTO,
    platform: PLATFORMS.AUTO.type,
    devtools: DEVTOOLS.auto_devtools
  },
  // wx: {
  //   id: 5,
  //   type: 'wx',
  //   label: '微信微应用',
  //   zipPath: 'wechat_js_base.zip',
  //   needEmptyPath: true,
  //   compiler: COMPILER.WX_COMPILER,
  //   platform: PLATFORMS.MOBILE.type,
  // },
  // wx2nt: {
  //   id: 6,
  //   type: 'wx2nt',
  //   label: '微信微应用——>南天微应用',
  //   zipPath: '',
  //   needEmptyPath: true,
  //   compiler: COMPILER.WX2NT_COMPILER,
  //   platform: PLATFORMS.MOBILE.type,
  // },
  nt2wx: {
    id: 12,
    type: 'nt2wx',
    label: '南天微应用转微信微应用',
    zipPath: 'nt2wx.zip',
    needEmptyPath: true, // 是否需要空白目录
    compiler: COMPILER.NT_COMPILER,
    launcher: LAUNCHER.NT_LAUNCHER,
    platform: PLATFORMS.MOBILE.type,
    devtools: DEVTOOLS.no_devtools
  }
  // rdp: {
  //   id: 8,
  //   type: 'rdp',
  //   label: 'rdp',
  //   zipPath: 'rdp.zip',
  //   needEmptyPath: true,
  //   compiler: COMPILER.NULL,
  //   platform: PLATFORMS.DESKTOP.type,
  // },
}

// 问题面板的消息类型
export const PROBLEM_MESSAGE_TYPE = {
  title: 'title',
  content: 'content'
}

export const UPDATE_TYPE = {
  IDE_FULL: 0,
  IDE_PART: 1,
  H5: 2,
  COMPONENT: 3
}

// monaco实例类型
export const MONACO_INSTANCE_TYPE = {
  create: 'create',
  create_diff: 'create_diff'
}

export const FILE_COMPARE_CONNECT_CAHRACTER = ' ↔ '
