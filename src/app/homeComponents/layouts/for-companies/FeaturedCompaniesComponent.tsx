"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Handshake } from "lucide-react";

const apiBaseUrl = "http://localhost:5213";
const apiTopUrl = `${apiBaseUrl}/api/FeaturedTopCompany`;
const apiCompanyUrl = `${apiBaseUrl}/api/FeaturedCompany`;

interface FeaturedTopCompanyDto {
  id: number
  periodNameDto: string
  companyNameDto: string
  logoUrlDto?: string
  highlightReasonDto: string
  internsCountDto: number
  satisfactionPercentageDto: number
  yearsAlliedDto: number
}

interface FeaturedCompanyDto {
  id: number
  periodNameDto: string
  companyNameDto: string
  logoUrlDto?: string
}

const FeaturedCompanies: React.FC = () => {
    const [topCompany, setTopCompany] = useState<FeaturedTopCompanyDto  | null>(null);
    const [featuredCompanies, setFeaturedCompanies] = useState<FeaturedCompanyDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [topRes, companyRes] = await Promise.all([
                    fetch(apiTopUrl),
                    fetch(apiCompanyUrl),
                ]);
                const [topData, companyData] = await Promise.all([
                    topRes.json(),
                    companyRes.json(),
                ]);

                if (topData && topData.length > 0) setTopCompany(topData[0]);
                if (companyData && companyData.length > 0) setFeaturedCompanies(companyData);

                setLoading(false);
            } catch (error) {
                console.error("Error cargando datos de empresas aliadas:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getFullImageUrl = (path?: string) =>
        path && !path.startsWith("http") ? `${apiBaseUrl}${path}` : path || "";

    if (loading) {
        return (
            <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Handshake className="h-6 w-6 text-yellow-600" />
                        Empresas Aliadas Destacadas
                    </CardTitle>
                    <p className="text-gray-600">
                        Reconocimiento a nuestros socios estratégicos en formación profesional
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-500">Cargando datos...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-6 w-6 text-yellow-600" />
                    Empresas Aliadas Destacadas
                </CardTitle>
                <p className="text-gray-600">
                    Reconocimiento a nuestros socios estratégicos en formación profesional
                </p>
            </CardHeader>

            <CardContent>
                {/* Empresa top del semestre */}
                {topCompany ? (
                    <div className="mb-8">
                        <h4 className="font-semibold text-yellow-700 mb-4 text-center">
                            🏆 Empresa Aliada del Semestre – {topCompany.periodNameDto}
                        </h4>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-yellow-200">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-300 flex items-center justify-center bg-yellow-50">
                                    {topCompany.logoUrlDto ? (
                                        <img
                                            src={getFullImageUrl(topCompany.logoUrlDto)}
                                            alt={topCompany.companyNameDto}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <Building2 className="h-10 w-10 text-yellow-700" />
                                    )}
                                </div>

                                <h5 className="text-xl font-bold text-gray-800 mb-2">
                                    {topCompany.companyNameDto}
                                </h5>
                                <p className="text-gray-600 mb-4">
                                    {topCompany.highlightReasonDto || "Reconocida por su excelente desempeño y apoyo."}
                                </p>

                                <div className="flex justify-center gap-6 text-sm">
                                    <div className="text-center">
                                        <div className="font-bold text-blue-600">{topCompany.internsCountDto}</div>
                                        <div className="text-gray-500">Practicantes</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-green-600">
                                            {topCompany.satisfactionPercentageDto}%
                                        </div>
                                        <div className="text-gray-500">Satisfacción</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-purple-600">{topCompany.yearsAlliedDto}</div>
                                        <div className="text-gray-500">Años Aliados</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mb-6">
                        No hay empresa top registrada para este semestre.
                    </p>
                )}

                {/* Empresas aliadas destacadas */}
                {featuredCompanies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredCompanies.map((company) => (
                            <div
                                key={company.id}
                                className="p-3 bg-white rounded-lg text-center border hover:shadow-md transition"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
                                    {company.logoUrlDto ? (
                                        <img
                                            src={getFullImageUrl(company.logoUrlDto)}
                                            alt={company.companyNameDto}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <Building2 className="h-6 w-6 text-gray-600" />
                                    )}
                                </div>
                                <h6 className="font-semibold text-sm">{company.companyNameDto}</h6>
                                <p className="text-xs text-gray-500">Empresa Aliada</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">
                        Aún no hay empresas aliadas registradas.
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default FeaturedCompanies;
