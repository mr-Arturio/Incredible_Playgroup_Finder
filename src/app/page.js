"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <main className="flex flex-1">
        <div className="flex w-full">
          {/* RenderSheetDataTable on the left (60%) */}
          <div className="w-3/5 p-4">
            <div className="flex items-center justify-between">
            <Link href="/charts">Charts</Link>
            </div>
            <h1 className="text-lg font-semibold mb-4">The Data</h1>
            <RenderSheetDataTable sheetData={sheetData} />
          </div>

          {/* MapComponent on the right (40%) */}
          <div className="w-2/5">
            <MapComponent sheetData={sheetData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
