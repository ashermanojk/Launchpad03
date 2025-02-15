import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 margin-top-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Launchpad</h2>
            <p>&copy; {new Date().getFullYear()} Launchpad. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/"
              className="hover:underline">Home
            </Link>
            <Link href="/campaigns"
              className="hover:underline">Campaigns
            </Link>
            <Link href="/about"
              className="hover:underline">About Us
            </Link>
            <Link href="/contact"
              className="hover:underline">Contact
            </Link>
          </div>
          <div className="flex flex-row justify-between space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaFacebook size={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>Contact us: <Link href="/" className="hover:underline">support@crowdfunding.com</Link></p>
        </div>
      </div>
    </footer>
  );
}