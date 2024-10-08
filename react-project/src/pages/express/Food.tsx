import { useEffect, useState, } from 'react'
import { Sidebar } from '@/components/demo/Sidebar'
import { Navbar } from '@/components/demo/Navbar'
import { ConfirmDialog } from '@/components/demo/ConfirmDialog'
import { DataTable } from '@/components/demo/DataTable'
import { DialogModal } from '@/components/demo/DialogModal'
import { Alert } from '@/components/demo/Alert'
import { deleteFoodExpress, getFoodExpress, createFoodExpress, updateFoodExpress } from '@/services/foodService'
import { Pencil, Trash2 } from 'lucide-react'
import { SiExpress } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

interface Food {
    food_id: number;
    food_name: string;
    price: number;
    stock: number;
}

export const Food = () => {
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
    // get select data foodId
    const [selectedFoodId, setSelectedFoodId] = useState<number>(0)
    const [foodData, setFoodData] = useState<Food[]>([])
    // edit data
    const [editingFood, setEditingFood] = useState<Food | null>(null)
    const navigate = useNavigate()

    const handleNavigation = {
        dashboard: () => navigate('/dashboard'),
        customer: () => navigate('/customer'),
        foods: () => navigate('/foods'),
        transaction: () => navigate('/transaction'),
    }
    // input form data
    const fields = [
        { id: 'food_name', label: 'Food Name', type: 'text' as const },
        { id: 'price', label: 'Price', type: 'number' as const },
        { id: 'stock', label: 'Stock', type: 'number' as const },
    ]

    // coloum table
    const columns = [
        { key: 'food_name', header: 'Food Name', sortable: true },
        { key: 'price', header: 'Price', sortable: true },
        { key: 'stock', header: 'Stock', sortable: true },
    ]

    const actions = [
        {
            onClick: (row: Food) => {
                setSelectedFoodId(row.food_id)
                setIsConfirmModalOpen(true)
            },
            icon: <Trash2 className='w-5 h-5 text-white' />,
            className: 'bg-red-600 hover:bg-red-800'
        },
        {
            onClick: (row: Food) => {
                setEditingFood(row)
                setIsDialogModalOpen(true)
            },
            icon: <Pencil className='w-5 h-5' />,
        }
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

    useEffect(() => {
        fetchFood()
    }, [])

    // get data
    const fetchFood = async () => {
        try {
            setLoading(true)
            const response = await getFoodExpress()
            if (response.statusCode === 200) {
                setFoodData(response.data as Food[])
            }
        } catch (error) {
            showAlert('Failed to fetch foods', 'error')
        } finally {
            setLoading(false)
        }
    }

    // add and edit action
    const handleSubmit = async (formData: Record<string, string>) => {
        try {
            const foodData = {
                food_name: formData.food_name,
                price: Number(formData.price),
                stock: Number(formData.stock)
            }
            let response;

            if (editingFood) {
                response = await updateFoodExpress(editingFood.food_id, foodData)
            } else {
                response = await createFoodExpress(foodData)
            }

            if (response.statusCode === 200) {
                console.log("Food Update success", response.data)
                setIsDialogModalOpen(false)
                setEditingFood(null)
                showAlert('Foods update successfully', 'success')
                fetchFood()
            } else {
                console.log("Food Create success", response.data)
                setIsDialogModalOpen(false)
                setEditingFood(null)
                showAlert('Foods create successfully', 'success')
                fetchFood()
            }
        } catch (error) {
            console.error(`Error Food:`, error)
            showAlert('Failed Error. Please try again.', 'error')
        }
    }

    // delete Action
    const handleDelete = async () => {
        try {
            const response = await deleteFoodExpress(selectedFoodId)
            if (response.statusCode === 200) {
                console.log('Food deleted successfully:', response.data)
                setIsConfirmModalOpen(false)
                showAlert('Food delete successfully', 'success')
                fetchFood()
            }
        } catch (error) {
            console.error('Error deleting Food:', error)
            showAlert('Failed to delete food. Please try again.', 'error')
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
                            <div className="px-4 py-6 sm:px-0">
                                {loading ? (
                                    <div className='flex w-full p-20 items-center justify-center '>Loading...</div>
                                ) : (
                                    <DataTable
                                        tableName="Data Foods"
                                        columns={columns}
                                        data={foodData}
                                        actions={actions}
                                        onAddNew={() => {
                                            setEditingFood(null)
                                            setIsDialogModalOpen(true)
                                        }}
                                    />
                                )}
                            </div>
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
                    title={editingFood ? "Edit Food" : "Add New Food"}
                    description={editingFood ? "Edit the Food information below" : "Fill out the form below to add a new Food to the system"}
                    fields={fields}
                    onSubmit={handleSubmit}
                    submitButtonText={editingFood ? "Update Food" : "Add Food"}
                    initialData={editingFood || {}}
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