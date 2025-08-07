"use client";

import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      {children}
    </div>
  );
};

export default LoginLayout;