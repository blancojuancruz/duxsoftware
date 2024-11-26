export interface User {
  id: string
  usuario: string
  estado: string
  sector: number
}

export interface IUserContext {
  users: User[]
  totalCount: number
  loadingUser: boolean
  handleGetAllUsers: () => Promise<void>
  handleEditUser: (user: User) => void
  handleDeleteUser: (user: User) => void
}
