import Footer from "@/components/footer"
import Header from "@/components/header"

const MainLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen flex-col container mx-auto p-4 lg:p-8 flex ">
            {/* header */}
            <Header/>
            <main className="flex-grow w-full h-full">
                {children}
            </main>
            <Footer/>
            {/* footer */}
        </div>
    )
}

export default MainLayout