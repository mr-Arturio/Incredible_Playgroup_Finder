"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import MapComponent from "@/app/components/MapComponent";
import { getSheetData } from "@/app/actions/getSheetData";  

function Home() {
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSheetData();
      // Directly use the response assuming it's structured as expected
      // Adjust this line according to the actual structure of the response
      setSheetData(response.props.sheetData); // Assuming the data is structured correctly
    };
    fetchData();
  }, []);

  const renderSheetData = () => {
    if (!sheetData) return <p>No data available</p>;
    // Ensure sheetData is iterable. Adjust as needed based on the actual data structure.
    return sheetData.map((data, index) => <div key={index}>{data}</div>);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Welcome to Our Application</h1>
          <MapComponent />
          <article>
            <h1>The data</h1>
            <div>{renderSheetData()}</div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
