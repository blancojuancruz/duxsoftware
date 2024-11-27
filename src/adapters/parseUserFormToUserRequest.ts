import { EstadoEnum, EstadoUsuarioEnum } from '@/enums/Estado.enum'
import { User, UserFormValues } from '@/models/User'

export const parseUserFormToUserRequest = (newUser: UserFormValues): User => {
  const { name, state, id, sector } = newUser

  return {
    id,
    usuario: name,
    estado:
      state === EstadoEnum.ACTIVO
        ? EstadoUsuarioEnum.HABILITADO
        : EstadoUsuarioEnum.DESHABILITADO,
    sector: parseInt(sector)
  }
}

export const parseUserRequestToFormUser = (
  editingUser: User
): UserFormValues => {
  const { id, sector, usuario, estado } = editingUser

  return {
    id,
    name: usuario,
    state: estado,
    sector: sector.toString()
  }
}
