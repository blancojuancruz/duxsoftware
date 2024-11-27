/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ProviderPropsModel } from '@/models/Global'
import { User, IUserContext } from '@/models/User'
import { Pagination } from '@/models/Pagination'
import { userServices } from '@/services/user.services'
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

  const handleGetAllUsers = async (params: Pagination) => {
    setLoadingUser(true)
    try {
      const { users: fetchedUsers, totalCount } = await userServices.getUsers(
        params
      )
      setUsers(fetchedUsers)
      setTotalCount(totalCount)
    } catch (error) {
      console.error('Error al obtener los usuarios:', error)
      toastContent.current!.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al obtener usuarios'
      })
    } finally {
      setLoadingUser(false)
    }
  }

  const handleCreateUser = async (newUser: Omit<User, 'id'>) => {
    setLoadingUser(true)
    try {
      const createdUser = await userServices.createUser(newUser)
      setUsers((prevUsers) => [...prevUsers, createdUser])
      setTotalCount((prevCount) => prevCount + 1)
      toastContent.current!.show({
        severity: 'success',
        summary: 'Usuario Creado',
        detail: 'Usuario creado exitosamente'
      })
      return createdUser
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
      const updatedUser = await userServices.updateUser(user)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      )
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

  const handleDeleteUser = (deleteUser: User) => {
    confirmDialog({
      message: `Seguro desea eliminar el Usuario: ${deleteUser.usuario}?`,
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        setLoadingUser(true)
        try {
          await userServices.deleteUser(deleteUser.id)
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== deleteUser.id)
          )
          setTotalCount((prevCount) => prevCount - 1)
          toastContent.current!.show({
            severity: 'success',
            summary: 'Usuario Eliminado',
            detail: 'Usuario Eliminado exitosamente'
          })
        } catch (error) {
          toastContent.current!.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al eliminar usuario'
          })
        } finally {
          setLoadingUser(false)
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
