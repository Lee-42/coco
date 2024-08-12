import type { MenuOptions } from '@imengyu/vue3-context-menu'

const menuData: MenuOptions = {
  x: 0,
  y: 0,
  items: [
    {
      label: 'File',
      children: [
        { label: 'New' },
        { label: 'Open' },
        {
          label: 'Open recent',
          children: [
            { label: 'File 1....' },
            { label: 'File 2....' },
            { label: 'File 3....' },
            { label: 'File 4....' },
            { label: 'File 5....' }
          ]
        },
        { label: 'Save', divided: true },
        { label: 'Save as...' },
        { label: 'Close' },
        { label: 'Exit' }
      ]
    },
    {
      label: 'Edit',
      children: [
        { label: 'Undo' },
        { label: 'Redo' },
        { label: 'Cut', divided: true },
        { label: 'Copy' },
        { label: 'Find', divided: true },
        { label: 'Replace' }
      ]
    },
    {
      label: 'View',
      children: [
        { label: 'Zoom in' },
        { label: 'Zoom out' },
        { label: 'Reset zoom' },
        { label: 'Full screent', divided: true },
        { label: 'Find', divided: true },
        { label: 'Replace' }
      ]
    },
    {
      label: 'Help',
      children: [{ label: 'About' }]
    }
  ],
  zIndex: 3,
  minWidth: 230
}
export default menuData
