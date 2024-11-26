import { Button } from 'primereact/button'

interface Props {
  handleOpenCloseDialogAddUser: () => void
}

export const HeaderTabla = ({ handleOpenCloseDialogAddUser }: Props) => {
  return (
    <div className="flex w-full justify-content-between">
      <h1>Usuarios</h1>
      <Button
        label="Nuevo Usuario"
        icon="pi pi-plus"
        className="px-4 gap-3 bg-blue-700"
        onClick={handleOpenCloseDialogAddUser}
      />
    </div>
  )
}
