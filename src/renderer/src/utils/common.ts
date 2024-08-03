import { getIconForFile } from 'vscode-icons-js'
import { join, extname } from 'path-browserify'

interface FileIconOptions {
  isLeaf: boolean
  name?: string
}

/**
 * file icon generator
 * @param o 实现函数
 * @returns
 */
export function iconGenerator(o: FileIconOptions): string {
  let icon: string
  const ICON_PATH = '/Users/lee/Project/coco/extensions/vscode-icons/icons'
  if (o.isLeaf) {
    if (o.name === void 0) {
      throw new Error("Parameter 'name' is required when 'isLeaf' is true.")
    }
    const name = o.name
    if (!extname(name)) {
      o.name = ''
    }
    icon = getIconForFile(o.name.replace('.ntml', '.html').replace('.ntss', '.css')) as string
  } else {
    icon = 'default_folder.svg'
  }
  icon = 'file://' + join(ICON_PATH, icon)
  return icon
}
