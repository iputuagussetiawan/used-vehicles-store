import Footer from '@/components/footer'
import Header from '@/components/header'
import AuthHandler from '@/handlers/auth-handler'
import React from 'react'

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex-col container mx-auto p-4 lg:p-8 flex '>
        {/* header */}
        <AuthHandler/>
        <Header/>
          <main className="flex-grow flex-col flex py-12">
              {children}
          </main>
        <Footer/>
        {/* footer */}
    </div>
  )
}

export default DashboardLayout