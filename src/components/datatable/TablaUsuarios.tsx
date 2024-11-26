import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { User } from '@/models/User'
import { useTableUsers } from '@/hooks/useTableUsers'
import { InputText } from 'primereact/inputtext'
import { useUserContext } from '@/context/user.context'
import '@/styles/table.module.css'

export const TablaUsuarios = () => {
  const { users, loadingUser, totalCount, handleEditUser, handleDeleteUser } =
    useUserContext()

  const {
    lazyParams,
    filters,
    globalFilterValue,
    handleChangePage,
    handleSortData,
    handleFilter
  } = useTableUsers()

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between items-center mb-4 mt-2">
        <div>
          <InputText
            value={globalFilterValue}
            onChange={(e) => handleFilter(e)}
            placeholder="Buscar usuario"
            className="p-inputtext-sm w-full md:w-64 pl-8 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
          />
        </div>
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
          onClick={() => handleEditUser(rowData)}
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
      <ConfirmDialog className="p-50" />
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
        loading={loadingUser}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        paginatorClassName="p-paginator-sm"
        rowsPerPageOptions={[10, 25, 50]}
        className="p-datatable-sm p-datatable-gridlines"
        showGridlines
        size="small"
        stripedRows
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
          body={actionTemplate}
          exportable={false}
          style={{ width: '8rem' }}
          header="Acciones"
          className="text-sm"
        />
      </DataTable>
    </>
  )
}
