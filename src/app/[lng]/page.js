"use client";

import React, { useEffect, useState } from "react";
import { getSheetData } from "../../actions/getSheetData";
import RenderSheetDataTable from "../../components/RenderSheetDataTable";
import { Header } from "../../components/Header";
import ContactForm from "../../components/ContactForm";

function Home({ lng }) {
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
      <div className="container pb-4">
        <Header />
      </div>
      <main className="container flex-1">
        <RenderSheetDataTable sheetData={sheetData} />
        <section>
          <ContactForm lng={lng} />
        </section>
      </main>
    </div>
  );
}

export default Home;
