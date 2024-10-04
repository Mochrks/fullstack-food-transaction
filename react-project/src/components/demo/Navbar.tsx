import { Button } from '../ui/button'
import { AlignJustify, LogOut, Moon, Sun } from 'lucide-react'
import { Switch } from '../ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useNavigate } from 'react-router-dom'

interface NavbarProps {
    sidebarOpen: boolean;
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
    setSidebarOpen: (open: boolean) => void;
}

export const Navbar = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }: NavbarProps) => {
    const navigate = useNavigate();
    // logout
    const handleLogout = () => {
        navigate("/")
    }
    return (
        <div>
            <header className="  dark:bg-[#171717] shadow-sm ">
                <nav className='flex flex-row '>
                    <div className='flex  text-center items-center px-2  space-x-2'>
                        <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)} className='rounded-full dark:hover:bg-gray-700'>
                            <AlignJustify className='w-6 h-6 dark:text-white ' />
                        </Button>

                    </div>
                    <div className="flex w-full py-4 px-4 sm:px-6 lg:px-8 justify-end items-end ">
                        <div className="flex items-center">
                            <Switch
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                                className="mr-4"
                            />
                            {darkMode ? <Moon className="h-5 w-5 text-gray-400" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="ml-4 cursor-pointer">
                                        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1253/1253756.png" alt="customer" />
                                        <AvatarFallback>Mr</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className='cursor-pointer'>
                                    <DropdownMenuItem onSelect={handleLogout} className='cursor-pointer'>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
