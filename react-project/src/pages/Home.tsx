
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Github } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SiNestjs } from "react-icons/si";
import { SiExpress } from "react-icons/si";
export default function Home() {
    const navigate = useNavigate();

    const handleNavigateExpress = () => {
        navigate("/dashboard");
    }
    const handleNavigateNest = () => {
        navigate("/nest/dashboard");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 bg-[#171717] text-white flex flex-col items-center justify-center p-4 pt-20">
            <motion.h1
                className="text-2xl md:text-5xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Choose Your Backend Framework
            </motion.h1>

            <motion.div
                className="flex flex-col md:flex-row gap-8 mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <FrameworkCard
                    title="Express.js"
                    description="Fast, unopinionated, minimalist web framework for Node.js"
                    icon={<SiExpress className="w-12 h-12" />}
                    onClick={handleNavigateExpress}
                />
                <FrameworkCard
                    title="Nest.js"
                    description="A progressive Node.js framework for building efficient and scalable server-side applications"
                    icon={<SiNestjs className="w-12 h-12" />}

                    onClick={handleNavigateNest}
                />
            </motion.div>



            <motion.div
                className="hidden md:block md:absolute bottom-5 left-4 rounded-full bg-white/20 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <a
                    href="https://github.com/Mochrks/fullstack-food-transaction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <Github className="mr-2" />
                    View on GitHub
                </a>
            </motion.div>
        </div>
    )
}

interface FrameworkCardProps {
    title: string
    description: string
    icon: React.ReactNode
    onClick: () => void
}

function FrameworkCard({ title, description, icon, onClick }: FrameworkCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Card
                className="w-72 h-80 cursor-pointer transition-colors bg-white hover:bg-white/80"
                onClick={onClick}
            >
                <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <motion.div
                        className="mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        {icon}
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-sm">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

