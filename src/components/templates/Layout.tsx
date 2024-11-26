import Head from 'next/head'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import { PrimeReactProvider } from 'primereact/api'
import { UserProvider } from '@/context/user.context'
import { AppSidebar } from '../ui/Sidebar'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <UserProvider>
      <PrimeReactProvider>
        <Head>
          <title>Dux Software Challenge</title>
          <meta name="description" content="Dux Software Challenge" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/primeflex@latest/primeflex.css"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-column flex-grow-1 min-h-screen">
          <header>
            <nav className="flex align-items-center justify-content-between px-6 py-2 bg-blue-700 text-white">
              <Image
                src={logo}
                alt="Logo Empresarial"
                width={50}
                height={50}
                className="object-contain"
              />
              <i className="pi pi-cog mr-2" style={{ fontSize: '1.5rem' }}></i>
            </nav>
          </header>
          <div className="flex flex-grow-1">
            <AppSidebar />
            <main className="flex-grow-1 py-4 px-6">{children}</main>
          </div>
        </div>
      </PrimeReactProvider>
    </UserProvider>
  )
}
