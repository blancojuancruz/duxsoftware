import { useDialogAddUser } from '@/hooks/useDialogAddUser'
import { sectors, states } from '@/static/dropdownOptions'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Dispatch, SetStateAction } from 'react'
import '@/styles/dialog.module.css'

interface Props {
  openDialogAddUser: boolean
  setOpenDialogAddUser: Dispatch<SetStateAction<boolean>>
}

export const DialogAddUser = ({
  openDialogAddUser,
  setOpenDialogAddUser
}: Props) => {
  const {
    id,
    setId,
    name,
    setName,
    selectedState,
    setSelectedState,
    selectedSector,
    setSelectedSector,
    handleSaveUser,
    handleCloseDialog
  } = useDialogAddUser({ setOpenDialogAddUser })

  return (
    <Dialog
      header="Usuario"
      visible={openDialogAddUser}
      style={{ width: '80rem', maxWidth: '80rem' }}
      modal
      onHide={() => setOpenDialogAddUser(false)}
      className="p-0"
      headerClassName="bg-blue-700 text-white m-0 p-4 text-xl font-medium"
      contentClassName="p-4"
    >
      <div className="flex flex-column gap-4">
        <div className="field">
          <label htmlFor="id" className="block text-900 mb-2">
            ID
          </label>
          <InputText
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Ingrese el id del Usuario"
            className="w-full p-3"
          />
        </div>
        <div className="field">
          <label htmlFor="name" className="block text-900 mb-2">
            Nombre
          </label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre del usuario"
            className="w-full p-3"
          />
        </div>
        <div className="field">
          <label htmlFor="estado" className="block text-900 mb-2">
            Estado
          </label>
          <Dropdown
            id="estado"
            value={selectedState}
            onChange={(e) => setSelectedState(e.value)}
            options={states}
            placeholder="Seleccionar el estado"
            className="w-full p-3"
          />
        </div>
        <div className="field">
          <label htmlFor="sector" className="block text-900 mb-2">
            Sector
          </label>
          <Dropdown
            id="sector"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.value)}
            options={sectors}
            placeholder="Seleccionar el Sector"
            className="w-full p-3"
          />
        </div>
      </div>
      <div className="flex justify-content-end gap-2 mt-4">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          severity="secondary"
          onClick={handleCloseDialog}
          className="px-4 py-2"
        />
        <Button
          label="Confirmar"
          icon="pi pi-check"
          className="px-4 py-2 bg-blue-700"
          onClick={handleSaveUser}
        />
      </div>
    </Dialog>
  )
}
