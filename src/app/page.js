"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import MapComponent from "@/app/components/MapComponent";
import { getSheetData } from "@/app/actions/getSheetData";  


function Home() {

  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSheetData(); // Ensure this function is correctly fetching the data
      setDate(response.props.date);
    };
    fetchData();
  }, []);


  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Welcome to Our Application</h1>
          <MapComponent />
          <article>
        <h1>the data</h1>
        <div>{date}</div>
    </article>
        </div>
        
      </main>
      <Footer />
    </div>
  );
}

export default Home;