import { SortOrder } from 'primereact/datatable'

export interface Filters {
  globalFilter: string
  sectorFilter: string
  stateFilter: string
}

export interface Pagination {
  first: number
  rows: number
  page: number
  sortField: string | undefined
  sortOrder: SortOrder
  filters: Filters
}
