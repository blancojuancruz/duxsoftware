import { IQueryParams } from '@/models/Global'

export const queryParamsInit: IQueryParams = {
  first: 0,
  rows: 10,
  page: 1,
  sortField: undefined,
  sortOrder: null,
  filters: {
    globalFilter: '',
    sectorFilter: '',
    stateFilter: ''
  }
}
