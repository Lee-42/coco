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
