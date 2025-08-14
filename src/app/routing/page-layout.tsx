import React from "react";
import Header from "@/app/homeComponents/layouts/Header";
import Breadcrumb from "@/app/homeComponents/layouts/Breadcrumb";
import Footer from "@/app/homeComponents/layouts/Footer";

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({children}: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header/>
            <Breadcrumb/>
            {children}
            <Footer/>
        </div>
    )
}