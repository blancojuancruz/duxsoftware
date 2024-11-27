import { FormEvent } from 'react'
import { parseUserFormToUserRequest } from '@/adapters/parseUserFormToUserRequest'
import { useUserContext } from '@/contexts/user.context'
import { UserFormValues } from '@/models/User'
import { EstadoEnum } from '@/enums/Estado.enum'
import { states, statesFilter } from '@/static/dropdownOptions'

interface Props {
  values: UserFormValues
  reset: (newValues?: Partial<UserFormValues> | undefined) => void
  validateUserForm: () => boolean
}

export const useDialogAddUser = ({
  values,
  reset,
  validateUserForm
}: Props) => {
  const {
    handleCreateUser,
    editingUser,
    handleUpdateUser,
    setDialogCreateEditUser,
    setEditingUser
  } = useUserContext()

  const handleCloseAddEditDialog = () => {
    if (editingUser) setEditingUser(false)
    setDialogCreateEditUser(false)
    reset()
  }

  const handleCreateUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = validateUserForm()

    if (isValid) {
      const parse = parseUserFormToUserRequest(values)

      if (editingUser) handleUpdateUser(parse)
      else handleCreateUser(parse)

      handleCloseAddEditDialog()
    }
  }

  const handleSetStatesEditCreateUser = () => {
    // ESTA FUNCION SE ENCARGA DE SETEAR LAS OPCIONES EN EL DROPDOWN DE FILTRO POR ESTADO PARA QUE LA EDICION NO PAREZCA BUGEADA
    if (
      values.state === EstadoEnum.ACTIVO ||
      values.state === EstadoEnum.INACTIVO
    ) {
      return states
    } else return statesFilter
  }

  const stateOptions = handleSetStatesEditCreateUser()

  return {
    handleCreateUpdateUser,
    handleCloseAddEditDialog,
    stateOptions
  }
}
