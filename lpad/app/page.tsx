import Link from "next/link"
import Image from 'next/image';
import pngImage from './lib/20286066_6207965.svg';  // Import the image

export default function Home() {
  return (
    <main>
      <section className="h-screen">
      <Image 
      src={pngImage} 
      alt="Launchpad" 
      width={500}
      height={500}
      className="object-cover -z-10 absolute top-20 right-10" 
      priority
      />
      <div className="flex flex-col">
      <div className="flex flex-col items-left justify-center m-10 p-5">
        <h1 className="text-8xl font-bold text-indigo-700/90">Launchpad</h1>
        <p className="text-3xl p-5 text-left">Create or Discover <br/> international startups changing the world.</p>
      </div>
      
      <div className="flex flex-row items-left justify-center m-10">
        <Link href="/create" 
        className="bg-indigo-900 text-white w-1/4 text-center rounded-md p-2 m-3">CREATE</Link>
        <Link href="/discover" 
        className="bg-indigo-900 text-white w-1/4 text-center rounded-md p-2 m-3" >DISCOVER</Link>
      </div>
      </div>
      </section>
      <section className="h-screen bg-indigo-700/70">

      </section>
    </main>
  );
}
