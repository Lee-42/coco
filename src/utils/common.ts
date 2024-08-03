import type { ITreeNodeData } from '../renderer/src/components/sidebar/explorer/types'

/**
 * Files and folder are sorted by their names. Folders are displayed before files.
 * @param {Array} items
 * @returns
 */
export function explorerSortDefault(items: ITreeNodeData[]): ITreeNodeData[] {
  const folders = items.filter((item) => !item.isLeaf)
  const files = items.filter((item) => item.isLeaf)
  folders.sort((a, b) =>
    a.key.localeCompare(b.key, undefined, { sensitivity: 'base', numeric: true })
  )
  files.sort((a, b) =>
    a.key.localeCompare(b.key, undefined, { sensitivity: 'base', numeric: true })
  )
  return [...folders, ...files]
}

/**
 * Insert the correct position into an ordered array of nodes
 * @param {Array} items
 * @returns
 */
export function explorerInsertDefault(items: ITreeNodeData[], insertNode: ITreeNodeData): number {
  let index
  const { isLeaf: newIsLeaf, key: newKey } = insertNode
  if (!newIsLeaf) {
    // 遍历目录
    index = 0
    for (let i = 0; i < items.length; i++) {
      const d = items[i]
      const { isLeaf, key } = d
      if (isLeaf) {
        break
      } else {
        if (newKey.localeCompare(key, undefined, { sensitivity: 'base', numeric: true }) === 1) {
          index = i
        } else {
          break
        }
      }
    }
  } else {
    // 遍历文件
    index = items.length - 1
    for (let i = items.length - 1; i > 0; i--) {
      const f = items[i]
      const { isLeaf, key } = f
      if (!isLeaf) {
        break
      } else {
        if (key.localeCompare(newKey, undefined, { sensitivity: 'base', numeric: true }) === 1) {
          index = i
        } else {
          break
        }
      }
    }
  }
  return index
}
