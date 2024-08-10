import mousetrap from 'mousetrap'
import { mitter } from '../utils/index'

const keys = [
  {
    key: 'mod',
    run: () => {}
  },
  {
    key: 'mod+c',
    run: () => {}
  },
  {
    key: 'shift',
    run: () => {}
  }
]

keys.forEach((item) => {
  mousetrap.bind(item.key, () => {
    item.run()
    mitter.emit('keydown', item.key)
  })
  mousetrap.bind(
    item.key,
    () => {
      item.run()
      mitter.emit('keyup', item.key)
    },
    'keyup'
  )
})
