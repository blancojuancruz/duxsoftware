import { useDialogAddUser } from '@/hooks/useDialogAddUser'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useUserContext } from '@/contexts/user.context'
import { UserFormValues } from '@/models/User'
import { ChangeEvent } from 'react'

interface Props {
  values: UserFormValues
  errors: Partial<Record<keyof UserFormValues, string>>
  touched: Partial<Record<keyof UserFormValues, boolean>>
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleDropdownChange: (e: DropdownChangeEvent) => void
  reset: (newValues?: Partial<UserFormValues> | undefined) => void
  validateUserForm: () => boolean
}

export const AddEditUserDialog = ({
  values,
  errors,
  touched,
  handleInputChange,
  handleDropdownChange,
  reset,
  validateUserForm
}: Props) => {
  const { editingUser, dialogCreateEditUser } = useUserContext()

  const { handleCreateUpdateUser, handleCloseAddEditDialog, stateOptions } =
    useDialogAddUser({
      values,
      reset,
      validateUserForm
    })

  return (
    <Dialog
      header={`${editingUser ? 'Editar Usuario' : 'Crear Usuario'}`}
      visible={dialogCreateEditUser}
      style={{ width: '40rem', maxWidth: '80rem' }}
      modal
      onHide={handleCloseAddEditDialog}
      headerClassName="bg-blue-700 text-white m-0 p-4 text-xl font-medium"
      contentClassName="p-4"
    >
      <form
        onSubmit={(e) => handleCreateUpdateUser(e)}
        className="flex flex-column gap-4"
      >
        <div>
          <label htmlFor="id" className="block text-900 mb-2">
            ID
          </label>
          <InputText
            id="id"
            name="id"
            value={values.id}
            onChange={handleInputChange}
            placeholder="Ingrese el id del Usuario"
            className={`w-full ${errors.id && touched.id ? 'p-invalid' : ''}`}
            invalid={Boolean(errors.id)}
          />
          {errors.id && <small className="p-error">{errors.id}</small>}
        </div>

        <div>
          <label htmlFor="name" className="block text-900 mb-2">
            Nombre
          </label>
          <InputText
            id="name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre del usuario"
            className={`w-full ${errors.id && touched.id ? 'p-invalid' : ''}`}
            invalid={Boolean(errors.name)}
          />
          {errors.name && <small className="p-error">{errors.name}</small>}
        </div>

        <div>
          <label htmlFor="state" className="block text-900 mb-2">
            Estado
          </label>
          <Dropdown
            id="state"
            name="state"
            value={values.state}
            onChange={handleDropdownChange}
            options={stateOptions}
            placeholder="Seleccionar el estado"
            className={`w-full  ${errors.id && touched.id ? 'p-invalid' : ''}`}
            invalid={Boolean(errors.state)}
          />
          {errors.state && <small className="p-error">{errors.state}</small>}
        </div>

        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            outlined
            severity="secondary"
            type="reset"
            onClick={handleCloseAddEditDialog}
            className="px-4 py-2"
          />
          <Button
            label={`${editingUser ? 'Modificar Usuario' : 'Crear Usuario'}`}
            icon="pi pi-check"
            type="submit"
            className="px-4 py-2 bg-blue-700 gap-2"
          />
        </div>
      </form>
    </Dialog>
  )
}
