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

  const parseEstado = () => {
    if (estado === EstadoUsuarioEnum.HABILITADO) return EstadoEnum.ACTIVO
    if (estado === EstadoUsuarioEnum.DESHABILITADO) return EstadoEnum.INACTIVO
    else return estado
  }

  return {
    id,
    name: usuario,
    state: parseEstado(),
    sector: sector.toString()
  }
}
