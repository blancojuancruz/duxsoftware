import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { User } from '@/models/User'
import { useTableUsers } from '@/hooks/useTableUsers'
import { InputText } from 'primereact/inputtext'
import { useUserContext } from '@/context/user.context'
import { AddUserDialog } from '../ui/AddUserDialog'
import { Dropdown } from 'primereact/dropdown'
import { sectorMapping, sectors } from '@/static/dropdownOptions'
import { Toast } from 'primereact/toast'
import { Suspense } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

export const UsersTable = () => {
  const { users, totalCount, toastContent, loadingUser, handleDeleteUser } =
    useUserContext()

  const {
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
    handleOpenDialogEdit,
    handleInputChange,
    handleDropdownChange,
    handleFilterSector,
    reset,
    validateUserForm
  } = useTableUsers()

  const sectorTemplate = (rowData: User) => {
    return sectorMapping[rowData.sector] || 'Desconocido'
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between items-center gap-5">
        <InputText
          id="globalFilter"
          value={globalFilterValue}
          onChange={(e) => handleGlobalFilter(e)}
          placeholder="Buscar"
          className="p-inputtext-sm w-48 md:w-48 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
        />
        <Dropdown
          value={sectorFilter}
          options={sectors}
          onChange={(e) => handleFilterSector(e)}
          placeholder="Filtrar por Sector"
          className="p-inputtext-sm md:w-64 pl-2 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
        />
      </div>
    )
  }

  const actionTemplate = (rowData: User) => {
    return (
      <div className="flex gap-2 justify-content-center align-items-center">
        <Button
          icon="pi pi-pencil"
          severity="secondary"
          text
          rounded
          className="p-button-sm"
          onClick={() => handleOpenDialogEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          text
          rounded
          className="p-button-sm"
          onClick={() => handleDeleteUser(rowData)}
        />
      </div>
    )
  }

  const header = renderHeader()

  return (
    <>
      {loadingUser && (
        <div className="flex justify-content-center items-center">
          <ProgressSpinner aria-label="Loading" className="flex" />
        </div>
      )}
      <Toast ref={toastContent} position="top-center" />
      <ConfirmDialog className="confirmDialog custom-dialog max-w-md shadow-lg rounded-lg px-4 bg-white" />
      <div className="table-container">
        <Suspense fallback={<ProgressSpinner aria-label="Loading" />}>
          <DataTable
            value={users}
            paginator
            rows={lazyParams.rows}
            filters={filters}
            dataKey="id"
            emptyMessage="Usuarios no encontrados."
            first={lazyParams.first}
            totalRecords={totalCount}
            onPage={handleChangePage}
            onSort={handleSortData}
            sortField={lazyParams.sortField}
            sortOrder={lazyParams.sortOrder}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            paginatorClassName="p-paginator-sm"
            rowsPerPageOptions={[10, 25, 50]}
            className="p-datatable-sm p-datatable-gridlines"
            showGridlines
            size="small"
            header={header}
          >
            <Column
              field="id"
              header="Id"
              sortable
              filter
              filterPlaceholder="Buscar por ID"
              style={{ width: '8rem' }}
              className="text-sm"
            />
            <Column
              field="usuario"
              header="Usuario"
              sortable
              filter
              filterPlaceholder="Buscar por usuario"
              style={{ minWidth: '14rem' }}
              className="text-sm"
            />
            <Column
              field="estado"
              header="Estado"
              sortable
              filter
              filterPlaceholder="Buscar por estado"
              style={{ minWidth: '12rem' }}
              className="text-sm"
            />
            <Column
              field="sector"
              header="Sector"
              sortable
              filter
              style={{ minWidth: '12rem' }}
              className="text-sm"
              body={sectorTemplate}
            />
            <Column
              body={actionTemplate}
              exportable={false}
              style={{ width: '8rem' }}
              header="Acciones"
              className="text-sm"
            />
          </DataTable>
        </Suspense>
      </div>
      <AddUserDialog
        values={values}
        errors={errors}
        touched={touched}
        handleInputChange={handleInputChange}
        handleDropdownChange={handleDropdownChange}
        reset={reset}
        validateUserForm={validateUserForm}
      />
    </>
  )
}
