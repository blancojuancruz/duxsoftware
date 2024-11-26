import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'

export const AppSidebar = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-800 flex flex-column">
      <div
        className="cursor-pointer text-white flex align-items-center justify-content-center"
        style={{ width: '3rem', height: '3rem' }}
        onClick={() => setVisible(true)}
        aria-label="Toggle Sidebar"
        role="button"
        tabIndex={0}
      >
        <i className="pi pi-bars" style={{ fontSize: '1.5rem' }}></i>
      </div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-18rem p-0 h-full"
      >
        <div className="flex flex-column h-full">
          <div className="p-3 bg-gray-800 text-white">
            <h2 className="text-xl font-bold m-0">Menu</h2>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
