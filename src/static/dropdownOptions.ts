import { EstadoEnum } from '@/enums/Estado.enum'

export const states = [
  { label: EstadoEnum.ACTIVO, value: EstadoEnum.ACTIVO },
  { label: EstadoEnum.INACTIVO, value: EstadoEnum.INACTIVO }
]

export const sectors = [
  { label: 'Marketing', value: '1111' },
  { label: 'Ventas', value: '2222' },
  { label: 'Comercial', value: '3333' },
  { label: 'RRHH', value: '4444' },
  { label: 'Developers', value: '5555' }
]

export const sectorMapping: Record<string, string> = {
  '1111': 'Marketing',
  '2222': 'Ventas',
  '3333': 'Comercial',
  '4444': 'RRHH',
  '5555': 'Developers'
}
