import { sectorsFilter, states, statesFilter } from '@/static/dropdownOptions'
import { Button } from 'primereact/button'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { ChangeEvent } from 'react'

interface Props {
  globalFilterValue: string
  handleGlobalFilter: (e: ChangeEvent<HTMLInputElement>) => void
  sectorFilter: string
  handleFilterSector: (e: DropdownChangeEvent) => void
  stateFilter: string
  handleFilterState: (e: DropdownChangeEvent) => void
  handleLimpiarFiltros: () => void
}

export const HeaderTable = ({
  globalFilterValue,
  handleGlobalFilter,
  sectorFilter,
  handleFilterSector,
  stateFilter,
  handleFilterState,
  handleLimpiarFiltros
}: Props) => {
  return (
    <div className="flex justify-content-between items-center">
      <InputText
        id="globalFilter"
        value={globalFilterValue}
        onChange={(e) => handleGlobalFilter(e)}
        placeholder="Buscar"
        className="p-inputtext-sm w-48 md:w-48 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
      />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-5">
          <Dropdown
            value={sectorFilter}
            options={sectorsFilter}
            onChange={(e) => handleFilterSector(e)}
            placeholder="Filtrar por Sector"
            className="p-inputtext-sm md:w-64 pl-2 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
          />
          <Dropdown
            value={stateFilter}
            options={[...statesFilter, ...states]}
            onChange={(e) => handleFilterState(e)}
            placeholder="Filtrar por Estado"
            className="p-inputtext-sm md:w-64 pl-2 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
          />
        </div>
        <Button
          icon="pi pi-filter-slash"
          severity="secondary"
          className="p-button-sm bg-blue-700"
          title="Limpiar Filtros"
          onClick={handleLimpiarFiltros}
        />
      </div>
    </div>
  )
}
