import { DialogAddUser } from '@/components/ui/DialogAddUser'
import { useIndex } from '@/hooks/useIndex'
import { HeaderTabla } from '@/components/ui/HeaderTabla'
import { Layout } from '@/components/templates/Layout'
import { TablaUsuarios } from '@/components/datatable/TablaUsuarios'

const Home = () => {
  const {
    openDialogAddUser,
    setOpenDialogAddUser,
    handleOpenCloseDialogAddUser
  } = useIndex()

  return (
    <Layout>
      <HeaderTabla
        handleOpenCloseDialogAddUser={handleOpenCloseDialogAddUser}
      />
      <TablaUsuarios />
      <DialogAddUser
        openDialogAddUser={openDialogAddUser}
        setOpenDialogAddUser={setOpenDialogAddUser}
      />
    </Layout>
  )
}

export default Home
