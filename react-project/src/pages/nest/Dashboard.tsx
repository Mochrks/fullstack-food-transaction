import { useState, } from 'react'
import { Sidebar } from '@/components/demo/Sidebar'
import { Navbar } from '@/components/demo/Navbar'
import { Overview } from '@/components/demo/Overview'
import { Charts } from '@/components/demo/Charts'
import { SiNestjs } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'


export const DashboardNest = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const navigate = useNavigate()

    const handleNavigation = {
        dashboard: () => navigate('/nest/dashboard'),
        customer: () => navigate('/nest/customer'),
        foods: () => navigate('/nest/foods'),
        transaction: () => navigate('/nest/transaction'),
    }

    return (
        <>
            <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
                {/* sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name='Nest Js' icons={<SiNestjs className='w-7 h-7' />} onNavigate={handleNavigation} />

                <div className="flex-1 overflow-auto bg-gray-100 dark:bg-[#212121]">

                    {/* navbar */}
                    <Navbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        setDarkMode={setDarkMode}
                        darkMode={darkMode}
                    />
                    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 md:pt-20">
                        <div className="px-4 py-6 sm:px-0">
                            {/* overview */}
                            <Overview />
                            {/* charts */}
                            <Charts />
                        </div>
                    </main>
                </div>

            </div>
        </>
    )
}