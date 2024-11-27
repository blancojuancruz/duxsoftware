import { EstadoEnum, EstadoUsuarioEnum } from '@/enums/Estado.enum'
import { User, UserFormValues } from '@/models/User'

export const parseUserFormToUserRequest = (
  newUser: UserFormValues
): Omit<User, 'sector'> => {
  // PARSE QUE ADAPTA LO QUE SE ENVIA AL BACKEND AL CREAR O MODIFICAR USUARIOS

  const { name, state, id } = newUser

  return {
    id,
    usuario: name,
    estado: parseEstado(state)
  }
}

export const parseUserRequestToFormUser = (
  editingUser: User
): UserFormValues => {
  // PARSE QUE ADAPTA LA INFORMACION QUE SE RECIBE DEL BACKEND PARA RELLENAR FORMULARIOS

  const { id, sector, usuario, estado } = editingUser

  return {
    id,
    name: usuario,
    state: estado,
    sector: sector.toString()
  }
}

export const parseEstado = (estado: string): string => {
  if (estado === EstadoEnum.ACTIVO || estado === EstadoUsuarioEnum.HABILITADO) {
    return EstadoUsuarioEnum.HABILITADO
  } else if (
    estado === EstadoEnum.INACTIVO ||
    estado === EstadoUsuarioEnum.DESHABILITADO
  ) {
    return EstadoUsuarioEnum.DESHABILITADO
  } else return ''
}
