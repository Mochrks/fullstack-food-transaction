import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/demo/Sidebar'
import { Navbar } from '@/components/demo/Navbar'
import { ConfirmDialog } from '@/components/demo/ConfirmDialog'
import { DataTable } from '@/components/demo/DataTable'
import { DialogModal } from '@/components/demo/DialogModal'
import { Alert } from '@/components/demo/Alert'
import { deleteCustomersNest, getCustomersNest, createCustomersNest, updateCustomersNest } from '@/services/customerService'
import { Pencil, Trash2 } from 'lucide-react'
import { SiNestjs } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
interface Customer {
    customer_id: number;
    name: string;
    phone: string;
    address: string;
}

export const CustomerNest = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDialogModalOpen, setIsDialogModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [alertMessage, setAlertMessage] = useState<string | null>(null)

    // get select data customerId
    const [selectedCustomerId, setSelectedCustomerId] = useState<number>(0)

    const [customerData, setCustomerData] = useState<Customer[]>([])
    // edit data
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

    const navigate = useNavigate()

    const handleNavigation = {
        dashboard: () => navigate('/nest/dashboard'),
        customer: () => navigate('/nest/customer'),
        foods: () => navigate('/nest/foods'),
        transaction: () => navigate('/nest/transaction'),
    }

    // input form data
    const fields = [
        { id: 'name', label: 'Name', type: 'text' as const },
        { id: 'address', label: 'Address', type: 'text' as const },
        { id: 'phone', label: 'Phone', type: 'number' as const },
    ]

    // coloum table
    const columns = [
        { key: 'name', header: 'Name', sortable: true },
        { key: 'address', header: 'Address', sortable: true },
        { key: 'phone', header: 'Phone', sortable: true },
    ]

    const actions = [
        {
            onClick: (row: Customer) => {
                setSelectedCustomerId(row.customer_id)
                setIsConfirmModalOpen(true)
            },
            icon: <Trash2 className='w-5 h-5 text-white' />,
            className: 'bg-red-600 hover:bg-red-800'
        },
        {
            onClick: (row: Customer) => {
                setEditingCustomer(row)
                setIsDialogModalOpen(true)
            },
            icon: <Pencil className='w-5 h-5' />,
        }
    ]

    useEffect(() => {
        fetchCustomers()
    }, [])

    // get data
    const fetchCustomers = async () => {
        try {
            setLoading(true)
            const response = await getCustomersNest()
            if (response.statusCode === 200) {
                setCustomerData(response.data as Customer[])
            }
        } catch (error) {
            setAlertMessage('Failed to fetch customers')
        } finally {
            setLoading(false)
        }
    }

    // add and edit action
    const handleSubmit = async (formData: Record<string, string>) => {
        try {
            const customerData = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address
            }
            let response;

            if (editingCustomer) {
                response = await updateCustomersNest(editingCustomer.customer_id, customerData)
            } else {
                response = await createCustomersNest(customerData)
            }
            if (response.statusCode === 200) {
                console.log("Customer Update success", response.data)
                setIsDialogModalOpen(false)
                setEditingCustomer(null)
                fetchCustomers()
            } else {
                console.log("Customer Create success", response.data)
                setIsDialogModalOpen(false)
                setEditingCustomer(null)
                fetchCustomers()
            }
        } catch (error) {
            console.error(`Error customer:`, error)
            setAlertMessage(`Failed Error. Please try again.`)
        }
    }

    // delete Action
    const handleDelete = async () => {
        try {
            const response = await deleteCustomersNest(selectedCustomerId)
            if (response.statusCode === 200) {
                console.log('Customer deleted successfully:', response.data)
                setIsConfirmModalOpen(false)
                fetchCustomers()
            }
        } catch (error) {
            console.error('Error deleting customer:', error)
            setAlertMessage('Failed to delete customer. Please try again.')
        }
    }

    return (
        <>
            <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name='Nest Js' icons={<SiNestjs className='w-7 h-7' />} onNavigate={handleNavigation} />

                <div className="flex-1 overflow-auto bg-gray-100 dark:bg-[#212121]">
                    <Navbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        setDarkMode={setDarkMode}
                        darkMode={darkMode}
                    />
                    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 md:pt-20">
                        <div className="px-4 py-6 sm:px-0">
                            {loading ? (
                                <div className='flex w-full p-20 items-center justify-center '>Loading...</div>
                            ) : (
                                <DataTable
                                    tableName="Data Customer"
                                    columns={columns}
                                    data={customerData}
                                    actions={actions}
                                    onAddNew={() => {
                                        setEditingCustomer(null)
                                        setIsDialogModalOpen(true)
                                    }}
                                />
                            )}
                        </div>
                    </main>
                </div>

                <ConfirmDialog
                    setIsConfirmModalOpen={setIsConfirmModalOpen}
                    IsConfirmModalOpen={isConfirmModalOpen}
                    handleActionDelete={handleDelete}
                />

                <DialogModal
                    isOpen={isDialogModalOpen}
                    onOpenChange={setIsDialogModalOpen}
                    title={editingCustomer ? "Edit Customer" : "Add New Customer"}
                    description={editingCustomer ? "Edit the customer information below" : "Fill out the form below to add a new customer to the system"}
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText={editingCustomer ? "Update Customer" : "Add Customer"}
                    initialData={editingCustomer || {}}
                />

                {alertMessage && (
                    <Alert
                        message={alertMessage}
                        onClose={() => setAlertMessage(null)}
                    />
                )}
            </div>
        </>
    )
}