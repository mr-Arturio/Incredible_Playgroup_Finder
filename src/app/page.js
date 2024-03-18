"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import MapComponent from "../components/MapComponent";
import { getSheetData } from "../actions/getSheetData";
import RenderSheetDataTable from "../components/RenderSheetDataTable";

function Home() {
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSheetData();
      setSheetData(response.props.sheetData); // Assuming the data is structured correctly
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
          <h1>Welcome to Our Application</h1>
          <MapComponent />
          <article>
            <h1>The data</h1>
            <div>
              <RenderSheetDataTable sheetData={sheetData} />
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
