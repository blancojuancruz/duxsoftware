import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
  setOpenDialogAddUser: Dispatch<SetStateAction<boolean>>
}

export const useDialogAddUser = ({ setOpenDialogAddUser }: Props) => {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleCloseDialog = () => {
    setOpenDialogAddUser(false)
  }

  const handleSaveUser = () => {
    handleCloseDialog()
    console.log('usuario guardado correctamente')
  }

  return {
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
  }
}
