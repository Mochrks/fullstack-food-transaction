import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Home, Users, Utensils, Captions } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    sidebarOpen: boolean;
    name: string;
    setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, name }: SidebarProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [setSidebarOpen]);

    const handleHome = () => {
        navigate("/dashboard");
    }
    const handleCustomer = () => {
        navigate("/customer");
    }
    const handleFood = () => {
        navigate("/foods");
    }
    const handleTransaction = () => {
        navigate("/transaction");
    }

    return (
        <div>
            {/* Sidebar drawer */}
            <div className={`bg-white dark:bg-[#171717] dark:text-white w-64 h-full flex-shrink-0 ${sidebarOpen ? '' : 'hidden'} transition-all duration-20 ease-out`}>
                <div className="p-4">
                    <div className="flex flex-col justify-between text-start  mb-10">
                        <h2 className="text-xl font-semibold">{name}</h2>
                    </div>
                    <nav>
                        <Button variant="ghost" className="w-full justify-start mb-2 dark:hover:bg-white/10" onClick={handleHome}>
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start mb-2 dark:hover:bg-white/10" onClick={handleCustomer}>
                            <Users className="mr-2 h-4 w-4" /> Customer
                        </Button>
                        <Button variant="ghost" className="w-full justify-start mb-2 dark:hover:bg-white/10" onClick={handleFood}>
                            <Utensils className="mr-2 h-4 w-4" /> Food
                        </Button>
                        <Button variant="ghost" className="w-full justify-start dark:hover:bg-white/10" onClick={handleTransaction}>
                            <Captions className="mr-2 h-4 w-4" /> Transaction
                        </Button>
                    </nav>

                </div>
            </div>
        </div>
    );
}