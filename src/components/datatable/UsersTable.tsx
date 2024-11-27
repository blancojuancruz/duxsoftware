import { Suspense } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useTableUsers } from '@/hooks/useTableUsers'
import { useUserContext } from '@/contexts/user.context'
import { AddEditUserDialog } from '../ui/AddEditUserDialog'
import { HeaderTable } from './HeaderTable'
import { ActionTemplate } from './ActionTemplate'
import { SectorTemplate } from './SectorTemplate'

export const UsersTable = () => {
  const { users, totalCount, toastContent } = useUserContext()

  const {
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
  } = useTableUsers()

  return (
    <>
      <Toast ref={toastContent} position="top-center" />
      <ConfirmDialog className="confirmDialog custom-dialog max-w-md shadow-lg rounded-lg px-4 bg-white" />
      <div className="table-container">
        <Suspense fallback={<ProgressSpinner aria-label="Loading" />}>
          <DataTable
            value={users}
            lazy
            paginator
            rows={queryParams.rows}
            totalRecords={totalCount}
            first={queryParams.first}
            onPage={handleChangePage}
            onSort={handleSortData}
            sortField={queryParams.sortField}
            sortOrder={queryParams.sortOrder}
            globalFilter={queryParams.filters.globalFilter}
            dataKey="id"
            emptyMessage="Usuarios no encontrados."
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            paginatorClassName="p-paginator-sm"
            rowsPerPageOptions={[5, 10, 25, 50]}
            className="p-datatable-sm p-datatable-gridlines"
            showGridlines
            size="small"
            header={
              <HeaderTable
                globalFilterValue={queryParams.filters.globalFilter}
                sectorFilter={queryParams.filters.sectorFilter}
                stateFilter={queryParams.filters.stateFilter}
                handleGlobalFilter={handleGlobalFilter}
                handleFilterSector={handleFilterSector}
                handleFilterState={handleFilterState}
                handleLimpiarFiltros={handleLimpiarFiltros}
              />
            }
          >
            <Column
              field="id"
              header="Id"
              sortable
              style={{ width: '8rem' }}
              className="text-sm"
            />
            <Column
              field="usuario"
              header="Usuario"
              sortable
              style={{ minWidth: '14rem' }}
              className="text-sm"
            />
            <Column
              field="estado"
              header="Estado"
              sortable
              style={{ minWidth: '12rem' }}
              className="text-sm"
            />
            <Column
              field="sector"
              header="Sector"
              sortable
              style={{ minWidth: '12rem' }}
              className="text-sm"
              body={(rowData) => <SectorTemplate rowData={rowData} />}
            />
            <Column
              body={(rowData) => (
                <ActionTemplate
                  rowData={rowData}
                  handleOpenDialogEdit={handleOpenDialogEdit}
                />
              )}
              exportable={false}
              style={{ width: '8rem' }}
              header="Acciones"
              className="text-sm"
            />
          </DataTable>
        </Suspense>
      </div>

      {/* ESTE COMPONENTE SE ENCARGA TANTO DE AÑADIR COMO DE EDITAR USUARIOS */}
      <AddEditUserDialog
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
