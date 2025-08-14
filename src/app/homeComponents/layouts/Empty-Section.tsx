import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Construction} from "lucide-react";

interface EmptySectionProps {
    title: string
    description: string
}

export default function EmptySection({title, description}: EmptySectionProps) {
    return (
        <Card className="text-center py-12">
            <CardHeader>
                <div className="mx-auto w-16 h-15 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Construction className="h-8 w-8 flex text-gray-400"/>
                </div>
                <CardTitle className="text-xl text-gray-600">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-500">{description}</p>
            </CardContent>
        </Card>
    )
}