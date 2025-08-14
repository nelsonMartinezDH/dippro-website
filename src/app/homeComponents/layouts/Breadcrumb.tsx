import {ChevronRight, Home} from "lucide-react"

export default function Breadcrumb() {
    return (
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm">
                    <Home className="h-4 w-4 text-gray-500"/>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                        Inicio
                    </a>
                    <ChevronRight className="h-4 w-4 text-gray-400"/>
                    <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                        Unidades Administrativas
                    </a>
                    <ChevronRight className="h-4 w-4 text-gray-400"/>
                    <span className="text-gray-700 font-medium">Dirección de Prácticas Profesionales</span>
                </nav>
            </div>
        </div>
    )
}