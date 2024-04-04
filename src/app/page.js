"use client";

import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";
import { getSheetData } from "../actions/getSheetData";
import RenderSheetDataTable from "../components/RenderSheetDataTable";
import { Header } from "../components/Header";

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
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      {/* Top Content Area - Always present */}
      <div className=" max-w-screen-2xl w-11/12 p-4">
        <Header />
      </div>

      <main className="max-w-screen-2xl flex-1  w-11/12">
        {/* RenderSheetDataTable on the left (60%) */}
        <div className="flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-3/5 p-4">
            {" "}
            <h1 className="text-lg font-semibold mb-4">The Data</h1>
            <RenderSheetDataTable sheetData={sheetData} />
          </div>

          {/* MapComponent on the right (40%) */}
          <div className="w-full md:w-2/5">
            <MapComponent sheetData={sheetData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
