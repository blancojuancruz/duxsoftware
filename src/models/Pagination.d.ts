import { SortOrder } from 'primereact/datatable'

export interface Pagination {
  first: number
  rows: number
  page: number
  sortField: string | undefined
  sortOrder: SortOrder
}
