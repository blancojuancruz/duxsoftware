import { User } from '@/models/User'
import { sectorMappingColumn } from '@/static/dropdownOptions'

interface Props {
  rowData: User
}

export const SectorTemplate = ({ rowData }: Props) => {
  return sectorMappingColumn[rowData.sector] || 'Desconocido'
}
