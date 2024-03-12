"use client";

// import React, { useEffect, useState } from "react";

import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import MapComponent from "@/app/components/MapComponent";
import { getSheetData } from "@/app/actions/getSheetData";  


function Home() {


  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response)
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Welcome to Our Application</h1>
          <MapComponent />
          <div>
          <button onClick={handleOnGetSheetDataClick}>Get Sheet Data</button></div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}

export default Home;