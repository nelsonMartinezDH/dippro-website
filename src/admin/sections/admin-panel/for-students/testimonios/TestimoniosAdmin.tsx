"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import TestimoniesManager from "@/admin/sections/for-students/testimonios/TestimoniesManager";
import { MessageSquareQuote } from "lucide-react";

const TestimoniosAdmin: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg">
        <CardHeader className="relative z-10 py-6 flex flex-row items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <MessageSquareQuote className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">Testimonios de Estudiantes</CardTitle>
            <p className="text-yellow-100 text-sm">
              Administra los testimonios y experiencias compartidas por los estudiantes.
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 shadow-inner">
        <TestimoniesManager />
      </div>
    </motion.div>
  );
};

export default TestimoniosAdmin;