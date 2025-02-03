"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Header() {
    const [account, setAccount] = useState('');

    useEffect(() => {
        // Check if already connected
        checkConnection();
        
        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const checkConnection = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_accounts' 
                });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            } catch (error) {
                console.error('Error checking connection:', error);
            }
        }
    };

    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
        } else {
            setAccount('');
        }
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                setAccount(accounts[0]);
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <div className="flex justify-between items-center p-2">
            <div className="m-3 flex flex-row">
                <Link href="/" className="text-bold text-black p-2">Launchpad
                </Link>
                <Link href="/about" className=" text-gray-500 p-2">About
                </Link>
                <Link href="/discover" className=" text-gray-500 p-2">Discover
                </Link>
                <Link href="/create" className=" text-gray-500 p-2">Create
                </Link>
            </div>
            <button 
                onClick={connectWallet}
                className="px-4 py-2 bg-violet-700 text-white rounded"
            >
                {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : 'Connect Wallet'}
            </button>
        </div>
    );
}