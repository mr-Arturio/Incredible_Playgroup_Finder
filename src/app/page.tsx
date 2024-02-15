import type { NextPage } from 'next';
import MapComponent from '../components/MapComponent'; // Adjust the path as necessary



const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Welcome to Our Application</h1>
        <MapComponent />
      </div>
    </main>
  );
};

export default Home;