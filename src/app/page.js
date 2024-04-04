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
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      {/* Top Content Area - Always present */}
      <div className="w-10/12 p-4">
        <div className="flex-col items-center justify-between">
          <Link href="/charts">
          <button className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none py-2 px-4 rounded">
              Charts
            </button>
          </Link>
          <p className="mt-8 md:mt-4 md:mb-8 text-left">
            Ut sint laboris nostrud voluptate veniam dolore dolor duis magna ex.
            Reprehenderit velit minim labore cillum. Ullamco ut ipsum deserunt
            sunt. Incididunt amet nulla non elit qui mollit aliqua est Lorem
            duis. Labore elit sint ipsum magna. Quis nulla excepteur consequat
            duis cupidatat adipisicing eiusmod fugiat laborum in occaecat.
            Officia dolor reprehenderit dolore aliqua esse mollit proident irure
            laboris voluptate laboris. Laboris id amet adipisicing eu ipsum
            commodo eiusmod est veniam proident excepteur adipisicing. Aliquip
            Lorem id ullamco velit dolore nisi.
          </p>
        </div>
      </div>

      <main className="flex-1 w-10/12">
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
