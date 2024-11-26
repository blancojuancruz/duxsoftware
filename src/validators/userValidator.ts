import { EstadoEnum, EstadoUsuarioEnum } from '@/enums/Estado.enum'
import { UserFormValues } from '@/models/User'

const ALLOWED_STATES = [
  EstadoUsuarioEnum.HABILITADO,
  EstadoUsuarioEnum.DESHABILITADO,
  EstadoEnum.ACTIVO,
  EstadoEnum.INACTIVO
]

const validateId = (value: string): string | undefined => {
  if (!value) return 'El ID es requerido'
  return undefined
}

const validateName = (value: string): string | undefined => {
  if (!value) return 'El nombre es requerido'
  if (value.length < 2) return 'EL nombre debe tener al menos 2 caracteres'
  if (value.length > 50) return 'EL nombre no puede superar los 50 caracteres'
  return undefined
}

const validateState = (value: string): string | undefined => {
  if (!value) return 'Seleccione al menos un estado'
  if (!ALLOWED_STATES.includes(value)) return 'Estado no permitido'
  return undefined
}

export const userValidators: Record<
  keyof Omit<UserFormValues, 'sector'>,
  (value: string) => string | undefined
> = {
  id: validateId,
  name: validateName,
  state: validateState
}
