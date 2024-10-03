import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Home, Users, Utensils, Captions } from 'lucide-react';

interface SidebarProps {
    sidebarOpen: boolean;
    name: string;
    setSidebarOpen: (open: boolean) => void;
    icons: React.ReactNode;
    onNavigate: {
        dashboard: () => void
        customer: () => void
        foods: () => void
        transaction: () => void
    }
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, name, icons, onNavigate }: SidebarProps) => {


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



    return (
        <div>
            {/* Sidebar drawer */}
            <div className={`bg-white dark:bg-[#171717] dark:text-white w-64 h-full flex-shrink-0 ${sidebarOpen ? '' : 'hidden'} transition-all duration-20 ease-out`}>
                <div className="p-4">
                    <div className="flex flex-row  text-start  mb-10 ">
                        <div>
                            <h2 className="flex text-2xl font-semibold">{name} </h2>
                        </div>
                        <div className='flex px-5 items-center'> {icons}</div>
                    </div>
                    <nav>
                        <Button variant="ghost" className="w-full justify-start mb-2 dark:hover:bg-white/10" onClick={onNavigate.dashboard}>
                            <Home className="mr-2 h-4 w-4" /> Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start mb-2 dark:hover:bg-white/10" onClick={onNavigate.customer}>
                            <Users className="mr-2 h-4 w-4" /> Customer
                        </Button>
                        <Button variant="ghost" className="w-full justify-start mb-2 dark:hover:bg-white/10" onClick={onNavigate.foods}>
                            <Utensils className="mr-2 h-4 w-4" /> Food
                        </Button>
                        <Button variant="ghost" className="w-full justify-start dark:hover:bg-white/10" onClick={onNavigate.transaction}>
                            <Captions className="mr-2 h-4 w-4" /> Transaction
                        </Button>
                    </nav>

                </div>
            </div>
        </div>
    );
}