
import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/demo/Sidebar'
import { Navbar } from '@/components/demo/Navbar'
import { ConfirmDialog } from '@/components/demo/ConfirmDialog'
import { DataTable } from '@/components/demo/DataTable'
import { DialogModal } from '@/components/demo/DialogModal'
import { Alert } from '@/components/demo/Alert'
import { deleteTransactionExpress, getTransactionExpress, createTransactionExpress, updateTransactionExpress } from '@/services/transactionService'
import { Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { SiExpress } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { getCustomersExpress } from '@/services/customerService'
import { getFoodExpress } from '@/services/foodService'
interface Transaction {
    transaction_id: number
    customer_id: number
    food_id: number
    qty: number
    total_price: number
    transaction_date: string
    customer: {
        customer_id: number
        name: string
        phone: string
        address: string
    }
    foods: {
        food_id: number
        food_name: string
        price: number
        stock: number
    }
}

export const Transaction = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [IsConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [IsDialogModalOpen, setIsDialogModalOpen] = useState(false)

    const [loading, setLoading] = useState(true)

    const [alertMessage, setAlertMessage] = useState<{ message: string, type: string } | null>(null)

    const showAlert = (message: string, type: 'success' | 'error') => {
        setAlertMessage({ message, type })
        setTimeout(() => {
            setAlertMessage(null)
        }, 2000)
    }

    const [customers, setCustomers] = useState<{ customer_id: number; name: string }[]>([])
    const [foods, setFoods] = useState<{ food_id: number; food_name: string }[]>([])
    // get select data transactionId
    const [selectedTransactionId, setSelectedTransactionId] = useState<number>(0)

    const [transactionData, setTransactionData] = useState<Transaction[]>([])
    // edit data
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)


    const navigate = useNavigate()

    const handleNavigation = {
        dashboard: () => navigate('/dashboard'),
        customer: () => navigate('/customer'),
        foods: () => navigate('/foods'),
        transaction: () => navigate('/transaction'),
    }
    // input form data
    const fields = [
        {
            id: 'customer_id',
            label: 'Customer',
            type: 'select' as const,
            options: customers.map(c => ({ value: c.customer_id.toString(), label: c.name }))
        },
        {
            id: 'food_id',
            label: 'Food',
            type: 'select' as const,
            options: foods.map(f => ({ value: f.food_id.toString(), label: f.food_name }))
        },
        { id: 'qty', label: 'Qty', type: 'number' as const },
        { id: 'date', label: 'Date', type: 'date' as const },
    ]

    // coloum table
    const columns = [
        {
            key: 'customer_id',
            header: 'Customer Name',
            sortable: true,
            render: (value: number, row: Transaction) => row.customer.name
        },
        {
            key: 'food_id',
            header: 'Food Name',
            sortable: true,
            render: (value: number, row: Transaction) => row.foods.food_name
        },
        { key: 'qty', header: 'Qty', sortable: true },
        { key: 'total_price', header: 'Total Price', sortable: true },
        {
            key: 'transaction_date',
            header: 'Date',
            sortable: true,
            render: (value: string) => format(new Date(value), 'dd/MM/yyyy')
        },
    ]
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode) {
            setDarkMode(JSON.parse(storedDarkMode));
        }
    }, []);

    const handleSetDarkMode = (mode: boolean) => {
        setDarkMode(mode);
        localStorage.setItem('darkMode', JSON.stringify(mode));
    };

    const actions = [
        {
            onClick: (row: Transaction) => {
                setSelectedTransactionId(row.transaction_id)
                setIsConfirmModalOpen(true)
            },
            icon: <Trash2 className='w-5 h-5 text-white' />,
            className: 'bg-red-600 hover:bg-red-800'
        },
        {
            onClick: (row: Transaction) => {
                setEditingTransaction(row)
                setIsDialogModalOpen(true)
            },
            icon: <Pencil className='w-5 h-5' />,
        }
    ]


    useEffect(() => {
        fetchTransaction()
        fetchCustomers()
        fetchFoods()
    }, [])

    const fetchCustomers = async () => {
        try {
            const response = await getCustomersExpress()
            if (response.statusCode === 200) {
                setCustomers(response.data)
            }
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    }

    const fetchFoods = async () => {
        try {
            const response = await getFoodExpress()
            if (response.statusCode === 200) {
                setFoods(response.data)
            }
        } catch (error) {
            console.error('Error fetching foods:', error)
        }
    }

    // get data
    const fetchTransaction = async () => {
        try {
            setLoading(true)
            const response = await getTransactionExpress()
            if (response.statusCode === 200) {
                setTransactionData(response.data as Transaction[])
            }
        } catch (error) {
            showAlert('Failed to fetch transaction', 'error')
        } finally {
            setLoading(false)
        }
    }

    // add and edit action
    const handleSubmit = async (formData: Record<string, string>) => {
        try {
            const transactionData = {
                customer_id: Number(formData.customer_id),
                food_id: Number(formData.food_id),
                qty: Number(formData.qty)
            }
            let response;

            if (editingTransaction) {
                response = await updateTransactionExpress(editingTransaction.transaction_id, transactionData)
            } else {
                response = await createTransactionExpress(transactionData)
            }

            if (response.statusCode === 200) {
                console.log("Transaction Update success", response.data)
                setIsDialogModalOpen(false)
                setEditingTransaction(null)
                showAlert('Transaction update successfully', 'success')
                fetchTransaction()
            } else {
                console.log("Transaction Create success", response.data)
                setIsDialogModalOpen(false)
                setEditingTransaction(null)
                showAlert('Transaction Create successfully', 'success')
                fetchTransaction()
            }
        } catch (error) {
            console.error(`Error Transaction:`, error)
            showAlert('Failed Error. Please try again.', 'error')
        }
    }

    // delete Action
    const handleDelete = async () => {
        try {
            const response = await deleteTransactionExpress(selectedTransactionId)
            if (response.statusCode === 200) {
                console.log('Transaction deleted successfully:', response.data)
                setIsConfirmModalOpen(false)
                showAlert('Transaction delete successfully', 'success')
                fetchTransaction()
            }
        } catch (error) {
            console.error('Error deleting Transaction:', error)
            showAlert('Failed to delete transactions. Please try again.', 'error')
        }
    }

    return (
        <>
            <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
                {/* sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name='Express Js' icons={<SiExpress className='w-7 h-7' />} onNavigate={handleNavigation} />

                <div className="flex-1 overflow-auto bg-gray-100 dark:bg-[#212121]">

                    {/* navbar */}
                    <Navbar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        setDarkMode={handleSetDarkMode}
                        darkMode={darkMode}
                    />
                    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 md:pt-20">
                        <div className="px-4 py-6 sm:px-0">


                            {loading ? (
                                <div className='flex w-full p-20 items-center justify-center '>Loading...</div>
                            ) : (
                                <DataTable
                                    tableName="Data Transactions"
                                    columns={columns}
                                    data={transactionData}
                                    actions={actions}
                                    onAddNew={() => {
                                        setEditingTransaction(null)
                                        setIsDialogModalOpen(true)
                                    }}
                                />
                            )}
                        </div>
                    </main>
                </div>

                {/* Confirm Dialog */}
                <ConfirmDialog
                    setIsConfirmModalOpen={setIsConfirmModalOpen}
                    IsConfirmModalOpen={IsConfirmModalOpen}
                    handleActionDelete={handleDelete}
                />

                <DialogModal
                    isOpen={IsDialogModalOpen}
                    onOpenChange={setIsDialogModalOpen}
                    title={editingTransaction ? "Edit Transaction" : "Add New Transaction"}
                    description={editingTransaction ? "Edit the Transaction information below" : "Fill out the form below to add a new Transaction to the system"}
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText={editingTransaction ? "Update Transaction" : "Add Transaction"}
                    initialData={editingTransaction ? {
                        customer_id: editingTransaction.customer_id.toString(),
                        food_id: editingTransaction.food_id.toString(),
                        qty: editingTransaction.qty.toString(),
                        date: editingTransaction.transaction_date
                    } : {}}
                />

                {alertMessage && (
                    <Alert
                        message={alertMessage.message}
                        type={alertMessage.type}
                        onClose={() => setAlertMessage(null)}
                    />
                )}
            </div>
        </>
    )
}


