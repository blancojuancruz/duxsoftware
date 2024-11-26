/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from '@/context/user.context'
import { Pagination } from '@/models/Pagination'
import { FilterMatchMode } from 'primereact/api'
import { DataTableStateEvent } from 'primereact/datatable'
import { ChangeEvent, useEffect, useState } from 'react'

export const useTableUsers = () => {
  const { handleGetAllUsers } = useUserContext()

  const [lazyParams, setLazyParams] = useState<Pagination>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: undefined,
    sortOrder: null
  })
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    usuario: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { value: null, matchMode: FilterMatchMode.CONTAINS }
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('')

  const handleChangePage = (event: DataTableStateEvent) => {
    setLazyParams((prevParams) => ({
      ...prevParams,
      first: event.first,
      rows: event.rows,
      page: (event.page ?? 0) + 1
    }))
  }

  const handleSortData = (event: DataTableStateEvent) => {
    setLazyParams((prevParams) => ({
      ...prevParams,
      sortField: event.sortField,
      sortOrder: event.sortOrder
    }))
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  useEffect(() => {
    handleGetAllUsers()
  }, [])

  return {
    lazyParams,
    filters,
    globalFilterValue,
    setFilters,
    handleChangePage,
    handleSortData,
    handleFilter
  }
}
