'use client'

import { useState, } from 'react'
import { Sidebar } from '@/components/demo/Sidebar'
import { Navbar } from '@/components/demo/Navbar'
import { Overview } from '@/components/demo/Overview'
import { Charts } from '@/components/demo/Charts'
import { ConfirmDialog } from '@/components/demo/ConfirmDialog'


export const DashboardNest = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [IsConfirmModalOpen, setIsConfirmModalOpen] = useState(false)


    return (
        <>
            <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
                {/* sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name='Nest Js' />

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

                {/* Confirm Dialog */}
                <ConfirmDialog setIsConfirmModalOpen={setIsConfirmModalOpen} IsConfirmModalOpen={IsConfirmModalOpen} />


            </div>
        </>
    )
}