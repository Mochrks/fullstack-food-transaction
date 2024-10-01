'use client'

import { useState, } from 'react'
import { Sidebar } from '@/components/demo/Sidebar'
import { Navbar } from '@/components/demo/Navbar'
import { ConfirmDialog } from '@/components/demo/ConfirmDialog'
import { DataTable } from '@/components/demo/DataTable'
import { DialogModal } from '@/components/demo/DialogModal'


export const Customer = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [IsConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [IsDialogModalOpen, setIsDialogModalOpen] = useState(false)

    return (
        <>
            <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
                {/* sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name='Express Js' />

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
                            {/* Data Table */}
                            <DataTable setIsConfirmModalOpen={setIsConfirmModalOpen} setIsDialogModalOpen={setIsDialogModalOpen} tableName='Data Customer' />
                        </div>
                    </main>
                </div>

                {/* Confirm Dialog */}
                <ConfirmDialog
                    setIsConfirmModalOpen={setIsConfirmModalOpen}
                    IsConfirmModalOpen={IsConfirmModalOpen}
                />

                <DialogModal
                    setIsDialogModalOpen={setIsDialogModalOpen}
                    IsDialogModalOpen={IsDialogModalOpen}
                    nameAction='Add New Data'
                />
            </div>
        </>
    )
}