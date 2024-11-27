/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from '@/context/user.context'
import { Pagination } from '@/models/Pagination'
import { User } from '@/models/User'
import { DataTableStateEvent } from 'primereact/datatable'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFormCustom } from './useCustomForm'
import { addUserInitForm } from '@/static/form/addUserInitForm'
import { userValidators } from '@/validators/userValidator'
import { parseUserRequestToFormUser } from '@/adapters/parseUserFormToUserRequest'
import { DropdownChangeEvent } from 'primereact/dropdown'
import { queryParamsInit } from '@/static/paginationInit'

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

  const [queryParams, setQueryParams] = useState<Pagination>(queryParamsInit)

  const handleChangePage = (event: DataTableStateEvent) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      first: event.first,
      rows: event.rows,
      page: Math.floor(event.first / event.rows) + 1
    }))
  }

  const handleSortData = (event: DataTableStateEvent) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      sortField: event.sortField,
      sortOrder: event.sortOrder
    }))
  }

  const handleGlobalFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setQueryParams((prevParams) => ({
      ...prevParams,
      first: 0,
      page: 1,
      filters: {
        ...prevParams.filters,
        globalFilter: value
      }
    }))
  }

  const handleFilterSector = (e: DropdownChangeEvent) => {
    const value = e.value

    setQueryParams((prevParams) => ({
      ...prevParams,
      first: 0,
      page: 1,
      filters: {
        ...prevParams.filters,
        sectorFilter: value
      }
    }))
  }

  const handleFilterState = (e: DropdownChangeEvent) => {
    const value = e.value

    setQueryParams((prevParams) => ({
      ...prevParams,
      first: 0,
      page: 1,
      filters: {
        ...prevParams.filters,
        stateFilter: value
      }
    }))
  }

  const handleOpenDialogEdit = (user: User) => {
    setEditingUser(true)
    const parseUser = parseUserRequestToFormUser(user)
    setDialogCreateEditUser(true)
    setValues(parseUser)
  }

  const handleLimpiarFiltros = () => {
    setQueryParams(queryParamsInit)
  }

  useEffect(() => {
    handleGetAllUsers(queryParams)
  }, [queryParams])

  return {
    values,
    errors,
    touched,
    queryParams,
    handleChangePage,
    handleSortData,
    handleGlobalFilter,
    handleFilterSector,
    handleOpenDialogEdit,
    handleInputChange,
    handleDropdownChange,
    reset,
    validateUserForm,
    handleFilterState,
    handleLimpiarFiltros
  }
}
