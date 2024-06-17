import store from '@/store/index'
const { PLATFORMS } = require('@/utils/constants')
const { remote } = require('electron')
const { Menu } = remote

// 移动设备常量
export const statusbarType = {
  NORMAL: 'normal',
  NOTCH: 'notch',
  DYNAMIC_ISLAND: 'DynamicIsland'
}

export const devices = {
  value: 'device',
  label: '机型',
  submenu: [
    {
      value: 'iPhone6/7/8',
      label: 'iPhone6/7/8',
      width: 375,
      height: 667,
      win_width: 436,
      win_height: 889,
      padding: '110px 30px 0px 30px',
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      frame: require('@/assets/images/frame/iphone-se.png'),
      Dpr: 2,
      radius: '0px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone5',
      label: 'iPhone5',
      width: 320,
      height: 568,
      win_width: 380,
      win_height: 794,
      padding: '117px 29px 0px 32px',
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      frame: require('@/assets/images/frame/iphone5.png'),
      Dpr: 2,
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone 6/7/8 Plus ',
      label: 'iPhone 6/7/8 Plus ',
      width: 414,
      height: 736,
      win_width: 483,
      win_height: 897,
      padding: '124px 34px 0px 34px',
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      frame: require('@/assets/images/frame/iphone-se.png'),
      Dpr: 3,
      radius: '0px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone X ',
      label: 'iPhone X ',
      width: 375,
      height: 812,
      win_width: 431,
      win_height: 863,
      padding: '24px 28px 0px 28px',
      statusHei: 44,
      statusbarType: statusbarType.NOTCH,
      frame: require('@/assets/images/frame/iphone-x.png'),
      Dpr: 3,
      radius: '39px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone XS Max ',
      label: 'iPhone XS Max ',
      width: 414,
      height: 896,
      win_width: 414,
      win_height: 896,
      statusHei: 44,
      Dpr: 3,
      statusbarType: statusbarType.NOTCH,
      radius: '39px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone 12/13 mini ',
      label: 'iPhone 12/13 mini ',
      width: 360,
      height: 780,
      win_width: 407,
      win_height: 821,
      padding: '20px 24px 0px 24px',
      statusHei: 44,
      statusbarType: statusbarType.NOTCH,
      frame: require('@/assets/images/frame/iphone-12mini.png'),
      Dpr: 3,
      radius: '44px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone 12/13(Pro)',
      label: 'iPhone 12/13(Pro)',
      width: 390,
      height: 844,
      win_width: 438,
      win_height: 887,
      padding: '20px 24px 0px 24px',
      statusHei: 44,
      statusbarType: statusbarType.NOTCH,
      frame: require('@/assets/images/frame/iphone-13pro.png'),
      Dpr: 3,
      radius: '48px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone 12/13 Pro Max ',
      label: 'iPhone 12/13 Pro Max ',
      width: 428,
      height: 926,
      win_width: 476,
      win_height: 965,
      padding: '20px 24px 0px 24px',
      statusHei: 44,
      statusbarType: statusbarType.NOTCH,
      frame: require('@/assets/images/frame/iphone-12promax.png'),
      Dpr: 3,
      radius: '53px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone 14 Pro',
      label: 'iPhone 14 Pro',
      width: 390,
      height: 842,
      win_width: 435,
      win_height: 883,
      padding: '19px 22px 0px 22px',
      statusHei: 55,
      statusbarType: statusbarType.DYNAMIC_ISLAND,
      frame: require('@/assets/images/frame/iphone-14pro.png'),
      Dpr: 3,
      radius: '58px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPhone 14 Pro Max ',
      label: 'iPhone 14 Pro Max ',
      width: 428,
      height: 926,
      win_width: 428,
      win_height: 926,
      statusHei: 50,
      statusbarType: statusbarType.DYNAMIC_ISLAND,
      Dpr: 3,
      radius: '53px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'pixel',
      label: 'pixel',
      width: 405,
      height: 725,
      win_width: 436,
      win_height: 884,
      padding: '95px 28px 0px 25px',
      statusHei: 44,
      statusbarType: statusbarType.NORMAL,
      frame: require('../../assets/images/frame/pixel-1.png'),
      Dpr: 3,
      radius: '0px',
      platform: PLATFORMS.MOBILE.type
    },
    { type: 'separator' },
    {
      value: 'iPad',
      label: 'iPad',
      width: 768,
      height: 1024,
      win_width: 860,
      win_height: 1235,
      padding: '107px 45px 0px 45px',
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      Dpr: 2,
      radius: '0px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPad Pro 10.5-inch ',
      label: 'iPad Pro 10.5-inch ',
      width: 820,
      height: 1112,
      win_width: 820,
      win_height: 1112,
      statusHei: 20,
      Dpr: 2,
      statusbarType: statusbarType.NORMAL,
      radius: '0px',
      platform: PLATFORMS.MOBILE.type
    },
    {
      value: 'iPad Pro 12.9-inch',
      label: 'iPad Pro 12.9-inch',
      width: 102,
      height: 1366,
      win_width: 102,
      win_height: 1366,
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      Dpr: 2,
      radius: '0px',
      platform: PLATFORMS.MOBILE.type
    },
    { type: 'separator' },
    {
      value: '柜面主页布局',
      label: '柜面主页布局',
      width: 935,
      height: 680,
      win_width: 935,
      win_height: 680,
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      Dpr: 2,
      radius: '0px',
      platform: PLATFORMS.DESKTOP.type
    },
    {
      value: '柜面业务布局',
      label: '柜面业务布局',
      width: 935,
      height: 670,
      win_width: 1451,
      win_height: 847,
      statusHei: 20,
      padding: '137px 500px 0px 16px',
      statusbarType: statusbarType.NORMAL,
      frame: require('../../assets/images/frame/pc.jpg'),
      Dpr: 2,
      radius: '0px',
      platform: PLATFORMS.DESKTOP.type
    },
    {
      value: '自助',
      label: '自助',
      width: 1280,
      height: 1024,
      win_width: 1280,
      win_height: 1104,
      statusHei: 20,
      statusbarType: statusbarType.NORMAL,
      Dpr: 2,
      radius: '0px',
      platform: PLATFORMS.DESKTOP.type
    }
  ]
}

// 显示比例
export const displayScales = {
  value: 'displayScale',
  label: '显示比例',
  submenu: [
    {
      value: 1,
      label: '100%'
    },
    {
      value: 0.85,
      label: '85%'
    },
    {
      value: 0.75,
      label: '75%'
    },
    {
      value: 0.5,
      label: '50%'
    },
    {
      value: 0,
      label: '自适应'
    }
  ]
}

// 字体大小
export const fontSizes = {
  value: 'fontSize',
  label: '字体大小',
  submenu: [
    {
      value: '15px',
      label: '15'
    },
    {
      value: '16px',
      label: '16'
    },
    {
      value: '17px',
      label: '17'
    },
    {
      value: '19px',
      label: '19'
    },
    {
      value: '23px',
      label: '23'
    },
    {
      value: '26px',
      label: '26'
    }
  ]
}

// 热加载
export const hotLoadOptions = [
  {
    value: true,
    label: '热加载 开'
  },
  {
    value: false,
    label: '热加载 关'
  }
]

export const simulatorMenu = (device, displayScale, fontSize) => {
  let { platform } = store.getters
  const builddevices = (resolve) => {
    return {
      label: devices.label,
      value: devices.value,
      submenu: devices.submenu
        .filter((d) => {
          if (platform === 'unknow') {
            return d
          }
          let pf = d.platform || null
          if (!platform) {
            return true
          } else {
            return !pf || pf === platform
          }
        })
        .map((m) => {
          let menuItem
          if (m.type == 'separator') {
            menuItem = m
          } else {
            menuItem = {
              label: m.label,
              value: m.value,
              type: 'checkbox',
              checked: m.value === device.value,
              click: () => resolve({ ...m, type: devices.value })
            }
          }
          return menuItem
        })
    }
  }
  const buildDisplayScales = (resolve) => {
    return {
      label: displayScales.label,
      value: displayScales.value,
      submenu: displayScales.submenu.map((d) => {
        return {
          label: d.label,
          value: d.value,
          type: 'checkbox',
          checked: d.value === displayScale.value,
          click: () => resolve({ ...d, type: displayScales.value })
        }
      })
    }
  }
  const buildFontSizes = (resolve) => {
    return {
      label: fontSizes.label,
      value: fontSizes.value,
      submenu: fontSizes.submenu.map((f) => {
        return {
          label: f.label,
          value: f.value,
          type: 'checkbox',
          checked: f.value === fontSize.value,
          click: () => resolve({ ...f, type: fontSizes.value })
        }
      })
    }
  }
  return new Promise((resolve, reject) => {
    const menu = Menu.buildFromTemplate([
      builddevices(resolve),
      buildDisplayScales(resolve),
      buildFontSizes(resolve)
    ])
    menu.popup()
  })
}

/**
 * 热加载选择器
 * @param {Object} hotload
 * @returns
 */
export const hotloadMenu = (hotload) => {
  return new Promise((resolve, reject) => {
    const template = () => {
      return hotLoadOptions.map((h) => {
        return {
          ...h,
          type: 'checkbox',
          checked: h.value === hotload.value,
          click: () => resolve(h)
        }
      })
    }
    const menu = Menu.buildFromTemplate(template())
    menu.popup()
  })
}
