

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className=" bg-violet-700/90">
      <h1 className="text-4xl font-bold mb-6 text-white">About Launchpad</h1>
      </div>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Decentralized Crowdfunding for Startups</h2>
          <p className="text-gray-700 leading-relaxed">
            Launchpad is a decentralized crowdfunding platform that connects innovative startups with global investors using blockchain technology. 
            Our platform ensures transparency, security, and direct access to funding without traditional intermediaries.
          </p>
        </section>

        <section className="">
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <div className="space-y-4 ">
            <div className="bg-indigo-700/70 text-white">
              <h3 className="text-xl font-medium mb-2">For Startups</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create a campaign with your funding target and deadline</li>
                <li>Share your vision and project details</li>
                <li>Receive contributions directly through smart contracts</li>
                <li>Access funds when your campaign goal is reached</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-2">For Contributors</h3>
              <ul className="list-disc pl-5  space-y-2">
                <li>Browse innovative startup campaigns</li>
                <li>Contribute ETH directly to projects you believe in</li>
                <li>Track campaign progress transparently</li>
                <li>Get refunds if campaign goals are not met</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-indigo-700/70 text-white">
          <h2 className="text-2xl font-semibold mb-3">Blockchain Benefits</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Smart contracts ensure secure and transparent transactions</li>
            <li>Automated fund distribution based on campaign success</li>
            <li>Immutable record of all contributions</li>
            <li>No intermediaries or hidden fees</li>
            <li>Global accessibility and instant transactions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We believe in democratizing access to funding for innovative startups worldwide. 
            By leveraging blockchain technology, we are creating a transparent, efficient, and 
            trustless platform that connects visionary entrepreneurs with forward-thinking contributors.
          </p>
        </section>
      </div>
    </div>
  );
}
