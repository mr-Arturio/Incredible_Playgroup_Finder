"use client";

import React, { useEffect, useState } from "react";
import { getSheetData } from "../actions/getSheetData";
import RenderSheetDataTable from "../components/RenderSheetDataTable";
import { Header } from "../components/Header";
import ContactForm from "../components/ContactForm";

function Home() {
  const [sheetData, setSheetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSheetData();
      setSheetData(response.props.sheetData);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen px-4">
      {/* Top Content Area - Always present */}
      <div className="container pb-4">
        <Header />
      </div>

      <main className="container  flex-1 sticky top-12 ">
        {" "}
        <RenderSheetDataTable sheetData={sheetData} />
        {/* Bottom Content Area - Always present */}
        <section>
          <h2 className="text-2xl font-bold mt-4">Need Help?</h2>
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export default Home;
