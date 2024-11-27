export interface User {
  id: string
  usuario: string
  estado: string
  sector: number
}

export interface UserFormValues {
  id: string
  name: string
  sector: string
  state: string
}

export interface IUserContext {
  users: User[]
  totalCount: number
  loadingUser: boolean
  dialogCreateEditUser: boolean
  setDialogCreateEditUser: Dispatch<SetStateAction<boolean>>
  editingUser: boolean
  setEditingUser: Dispatch<SetStateAction<boolean>>
  toastContent: MutableRefObject<Toast | null>
  handleGetAllUsers: (params: Pagination) => Promise<void>
  handleUpdateUser: (user: User) => void
  handleDeleteUser: (user: User) => void
  handleCreateUser: (newUser: User) => Promise<User | undefined>
}
