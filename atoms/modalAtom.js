import { atom } from 'recoil'

// in redux
// const [modalState, setModalState] = useState(false)
// in this case it's available globally

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const postIdState = atom({
  key: 'postIdState',
  default: '',
})
