import { useUserContext } from '@/context/user.context'
import { User } from '@/models/User'
import { Button } from 'primereact/button'

interface Props {
  rowData: User
  handleOpenDialogEdit: (user: User) => void
}

export const ActionTemplate = ({ rowData, handleOpenDialogEdit }: Props) => {
  const { handleDeleteUser } = useUserContext()

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
