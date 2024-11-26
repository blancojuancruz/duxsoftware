/* eslint-disable react-hooks/exhaustive-deps */
import { ProviderPropsModel } from '@/models/Global'
import { User, IUserContext } from '@/models/User'
import { deleteUser, getUsers } from '@/services/userService'
import { confirmDialog } from 'primereact/confirmdialog'
import { createContext, useContext, useMemo, useState } from 'react'

const UserContext = createContext<IUserContext | undefined>(undefined)

export const UserProvider = ({ children }: ProviderPropsModel) => {
  const [users, setUsers] = useState<User[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)

  const handleGetAllUsers = async () => {
    setLoadingUser(true)
    try {
      const { users: fetchedUsers, totalCount } = await getUsers()
      setUsers(fetchedUsers)
      setTotalCount(totalCount)
    } catch (error) {
      console.error('Erro al obtener los usuarios:', error)
    } finally {
      setLoadingUser(false)
    }
  }

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user)
  }

  const handleDeleteUser = (user: User) => {
    confirmDialog({
      message: `Seguro desea eliminar el Usuario: ${user.usuario}?`,
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await deleteUser(user.id)
          handleGetAllUsers()
        } catch (error) {
          console.error('Error eliminando el usuario:', error)
        }
      }
    })
  }

  const contextValue: IUserContext = useMemo(() => {
    return {
      users,
      totalCount,
      loadingUser,
      handleGetAllUsers,
      handleEditUser,
      handleDeleteUser
    }
  }, [
    users,
    totalCount,
    loadingUser,
    handleGetAllUsers,
    handleEditUser,
    handleDeleteUser
  ])

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(
      'useUserContext debe ser utilizado dentro de un UserProvider'
    )
  }

  return context
}
