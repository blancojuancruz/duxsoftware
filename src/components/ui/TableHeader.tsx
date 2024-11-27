import { useUserContext } from '@/contexts/user.context'
import { Button } from 'primereact/button'

export const TableHeader = () => {
  const { setDialogCreateEditUser } = useUserContext()

  return (
    <div className="flex w-full justify-content-between align-items-center">
      <h1>Usuarios</h1>
      <Button
        label="Nuevo Usuario"
        icon="pi pi-plus"
        className="p-3 gap-3 bg-blue-700 m-0"
        size="small"
        onClick={() => setDialogCreateEditUser(true)}
      />
    </div>
  )
}
