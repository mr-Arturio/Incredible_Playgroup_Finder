import React from "react";
import MapComponent from "../components/MapComponent";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Welcome to Our Application</h1>
          <MapComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
