import { TableHeader } from '@/components/ui/TableHeader'
import { Layout } from '@/components/templates/Layout'
import { UsersTable } from '@/components/datatable/UsersTable'

const Home = () => {
  return (
    <Layout>
      <TableHeader />

      <UsersTable />
    </Layout>
  )
}

export default Home
