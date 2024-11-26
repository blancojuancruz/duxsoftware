/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ProviderPropsModel } from '@/models/Global'
import { User, IUserContext } from '@/models/User'
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from '@/services/user.services'
import { confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { createContext, useContext, useMemo, useRef, useState } from 'react'

const UserContext = createContext<IUserContext | undefined>(undefined)

export const UserProvider = ({ children }: ProviderPropsModel) => {
  const [users, setUsers] = useState<User[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [dialogCreateEditUser, setDialogCreateEditUser] =
    useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<boolean>(false)
  const toastContent = useRef<Toast | null>(null)

  const handleGetAllUsers = async () => {
    setLoadingUser(true)
    try {
      const { users: fetchedUsers, totalCount } = await getUsers()
      setUsers(fetchedUsers)
      setTotalCount(totalCount)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
    } finally {
      setLoadingUser(false)
    }
  }

  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    setLoadingUser(true)
    try {
      const response = await createUser(newUser)
      toastContent.current!.show({
        severity: 'success',
        summary: 'Usuario Creado',
        detail: 'Usuario creado exitosamente'
      })

      handleGetAllUsers()

      return response
    } catch (error) {
      toastContent.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al crear usuario'
      })
    } finally {
      setLoadingUser(false)
    }
  }

  const handleUpdateUser = async (user: User) => {
    setLoadingUser(true)
    try {
      const updatedUser = await updateUser(user)

      setUsers((prevUsers) => {
        const index = prevUsers.findIndex((u) => u.id === updatedUser.id)

        if (index !== -1) {
          const updatedUsers = [...prevUsers]
          updatedUsers[index] = updatedUser
          return updatedUsers
        }

        return prevUsers
      })

      toastContent.current!.show({
        severity: 'success',
        summary: 'Usuario Modificado',
        detail: 'Usuario Modificado exitosamente'
      })

      return updatedUser
    } catch (error) {
      toastContent.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al modificar usuario'
      })
    } finally {
      setLoadingUser(false)
    }
  }

  const handleDeleteUser = (user: User) => {
    confirmDialog({
      message: `Seguro desea eliminar el Usuario: ${user.usuario}?`,
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await deleteUser(user.id)

          toastContent.current!.show({
            severity: 'success',
            summary: 'Usuario Eliminado',
            detail: 'Usuario Eliminado exitosamente'
          })

          handleGetAllUsers()
        } catch (error) {
          toastContent.current!.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al eliminar usuario'
          })
        }
      }
    })
  }

  const contextValue: IUserContext = useMemo(() => {
    return {
      users,
      totalCount,
      loadingUser,
      dialogCreateEditUser,
      editingUser,
      toastContent,
      setEditingUser,
      setDialogCreateEditUser,
      handleGetAllUsers,
      handleUpdateUser,
      handleDeleteUser,
      handleCreateUser
    }
  }, [
    users,
    totalCount,
    loadingUser,
    dialogCreateEditUser,
    editingUser,
    toastContent,
    setEditingUser,
    setDialogCreateEditUser,
    handleGetAllUsers,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateUser
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
