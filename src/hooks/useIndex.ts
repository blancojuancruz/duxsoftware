import { useState } from 'react'

export const useIndex = () => {
  const [openDialogAddUser, setOpenDialogAddUser] = useState<boolean>(false)

  const handleOpenCloseDialogAddUser = () => {
    setOpenDialogAddUser(true)
  }

  return {
    openDialogAddUser,
    setOpenDialogAddUser,
    handleOpenCloseDialogAddUser
  }
}
