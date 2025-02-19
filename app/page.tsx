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
        <h1 className="text-8xl font-bold text-indigo-700">Launchpad</h1>
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

      <section className="flex flex-col justify-center bg-indigo-400 p-5 ">
        <div className="">
          <div className="p-5 border rounded-lg bg-gray-100">
          <h2 className="text-3xl font-semibold mb-3">Decentralized Crowdfunding for Startups</h2>
          <p className="text-gray-700 leading-relaxed">
            Launchpad is a decentralized crowdfunding platform that connects innovative startups with global investors using blockchain technology. 
            Our platform ensures transparency, security, and direct access to funding without traditional intermediaries.
          </p>
          <div>

          </div>
          </div>
          
        
          <div className="p-5 border rounded-lg bg-gray-100 mt-5"> 
          <h2 className="text-2xl font-semibold mb-3"></h2>
          <div className="space-y-4 ">
            <div className="">
            <h3 className="text-xl font-medium mb-2">For Contributors</h3>
              <ul className="list-disc pl-5  space-y-2">
                <li>Browse innovative startup campaigns</li>
                <li>Contribute ETH directly to projects you believe in</li>
                <li>Track campaign progress transparently</li>
                <li>Get refunds if campaign goals are not met</li>
                <li>
                  <Link href ="/discover" className="text-indigo-700">Discover startups now</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">For Startups</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create a campaign with your funding target and deadline</li>
                <li>Share your vision and project details</li>
                <li>Receive contributions directly through smart contracts</li>
                <li>Access funds when your campaign goal is reached</li>
                <li>
                  <Link href ="/create" className="text-indigo-700">Create a campaign now</Link>
                </li>
              </ul>
            </div>
          </div>
          </div>

          <div className="p-5 border rounded-lg bg-gray-100 mt-5">
          <h2 className="text-2xl font-semibold mb-3">Blockchain Benefits</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Smart contracts ensure secure and transparent transactions</li>
            <li>Automated fund distribution based on campaign success</li>
            <li>Immutable record of all contributions</li>
            <li>No intermediaries or hidden fees</li>
            <li>Global accessibility and instant transactions</li>
          </ul>
          </div>
          </div>
        </section>
      

    </main>
  );
}
