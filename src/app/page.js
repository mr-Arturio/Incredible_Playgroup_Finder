"use client";

import React, { useEffect, useState } from "react";
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
        {" "}
        <h1 className="text-lg font-semibold mb-4">The Data</h1>
        <RenderSheetDataTable sheetData={sheetData} />
      </main>
    </div>
  );
}

export default Home;
