import { atom } from 'recoil'
const LOCALES = {
  ENGLISH: 'en',
  ITALIANO: 'it'
}

export const asideShow = atom({
  key: 'asideShow',
  default: true
})

export const darkMode = atom({
  key: 'darkMode',
  default: false
})

export const sidebarShow = atom({
  key: 'sidebarShow',
  default: true
})

// export const isAuthorized = atom({
//   key: 'isAuthorized',
//   default: !!localStorage.getItem('token')
// })

export const isLoading = atom({
  key: 'isLoading',
  default: true
})

export const user = atom({
  key: 'user',
  default: null
})

export const notifications = atom({
  key: 'notifications',
  default: []
})

export const connectesUsers = atom({
  key: 'connectesUsers',
  default: []
})

export const locale = atom({
  key: 'locale',
  default: LOCALES.ENGLISH
})
