import { getIconForFile } from 'vscode-icons-js'

interface FileIconOptions {
  isLeaf: boolean
  expand?: boolean
  name?: string
}

// 实现函数
export function fileIconGenerator(o: FileIconOptions): string {
  let icon: string
  if (o.isLeaf) {
    if (!o.name) {
      throw new Error("Parameter 'name' is required when 'isLeaf' is true.")
    }
    icon = getIconForFile(o.name.replace('.ntml', '.html').replace('.ntss', '.css')) as string
  } else {
    if (!o.expand) {
      throw new Error("Parameter 'expand' is required when 'isLeaf' is false.")
    }
    icon = o.expand ? 'default_folder_opened' : 'default_folder'
  }
  icon = icon.split('.')[0]
  return icon
}
