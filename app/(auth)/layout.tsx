import Header from "@/components/header"
import Footer from "@/components/footer"
const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
      
        <div className="min-h-screen flex-col container mx-auto p-4 lg:p-8 flex ">
            {/* header */}
            <Header/>
            <main className="flex-grow flex items-center justify-center">
                {children}
            </main>
            {/* footer */}
            <Footer/>
        </div>
    )
}

export default AuthLayout