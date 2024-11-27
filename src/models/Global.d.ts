import { ReactNode } from 'react'

export interface ProviderPropsModel {
  children: ReactNode
}

export interface Filters {
  globalFilter: string
  sectorFilter: string
  stateFilter: string
}

export interface IQueryParams {
  first: number
  rows: number
  page: number
  sortField: string | undefined
  sortOrder: SortOrder
  filters: Filters
}
