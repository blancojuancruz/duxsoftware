/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from '@/context/user.context'
import { Pagination } from '@/models/Pagination'
import { User } from '@/models/User'
import { FilterMatchMode } from 'primereact/api'
import { DataTableStateEvent } from 'primereact/datatable'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFormCustom } from './useCustomForm'
import { addUserInitForm } from '@/static/form/addUserInitForm'
import { userValidators } from '@/validators/userValidator'
import { parseUserRequestToFormUser } from '@/adapters/parseUserFormToUserRequest'
import { DropdownChangeEvent } from 'primereact/dropdown'

export const useTableUsers = () => {
  const { handleGetAllUsers, setDialogCreateEditUser, setEditingUser } =
    useUserContext()

  const {
    values,
    errors,
    touched,
    handleInputChange,
    handleDropdownChange,
    reset,
    validateUserForm,
    setValues
  } = useFormCustom(addUserInitForm, userValidators)

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
    estado: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sector: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('')
  const [sectorFilter, setSectorFilter] = useState<string>('')

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

  const handleGlobalFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const handleFilterSector = (e: DropdownChangeEvent) => {
    const value = e.value
    const _filters = { ...filters }

    _filters['sector'].value = value

    setFilters(_filters)
    setSectorFilter(value)
  }

  const handleOpenDialogEdit = (user: User) => {
    setEditingUser(true)
    const parseUser = parseUserRequestToFormUser(user)
    setDialogCreateEditUser(true)
    setValues(parseUser)
  }

  useEffect(() => {
    handleGetAllUsers()
  }, [])

  return {
    values,
    errors,
    touched,
    lazyParams,
    filters,
    globalFilterValue,
    sectorFilter,
    handleChangePage,
    handleSortData,
    handleGlobalFilter,
    handleFilterSector,
    handleOpenDialogEdit,
    handleInputChange,
    handleDropdownChange,
    reset,
    validateUserForm
  }
}
