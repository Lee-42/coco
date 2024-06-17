import Dexie, { Table } from 'dexie'

interface Environment {
  name: string
  url: string
}

enum DevtoolTheme {
  'dark',
  'light'
}

interface Setting {
  defaultProjectSavePath: string
  autoLogin: boolean
  theme: string
  autoSave: boolean
  devtoolTheme: DevtoolTheme
  showToolbar: boolean
  showToolbarTitle: boolean
  baseEnvironment?: Environment | null
  environments?: Environment[] | []
}
class MyDatabase extends Dexie {
  settings!: Table<Setting> // 定义 settings 表的类型

  constructor() {
    super('coco')
    this.version(1).stores({
      settings: '' // 使用空字符串表示主键自动递增
    })
  }
}

const db = new MyDatabase()

// 添加数据
db.settings.add({
  defaultProjectSavePath: '',
  autoLogin: false,
  theme: 'dark',
  autoSave: false,
  devtoolTheme: DevtoolTheme.dark,
  showToolbar: true,
  showToolbarTitle: true,
  baseEnvironment: null,
  environments: []
})

export default db
