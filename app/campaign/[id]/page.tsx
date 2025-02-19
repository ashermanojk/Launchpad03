"use client";

import { useEffect, useState } from 'react';
import { getCrowdfundingContract } from '../../utils/crowdfunding';
import { use } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
//import SVGImage from '../../lib/9930924_4269957.svg';


interface Campaign {
  id: number;
  owner: string;
  title: string;
  description: string;
  target: string | number;
  deadline: Date;
  amountCollected: string | number;
  claimed: boolean;
  imageUrl: string;
}

async function getCampaign(id: number): Promise<Campaign> {
  const contract = await getCrowdfundingContract();
  const campaign = await contract.getCampaign(id);


  const safeFormatEther = (value: any): string => {
    try {
      // Check if value is already a string with decimal point
      if (typeof value === 'string' && value.includes('.')) {
        return value;
      }
      return ethers.formatEther(value);
    } catch (error) {
      console.error('Error formatting value:', error);
      return '0';
    }
  };

  return {
    id: Number(id),
    title: campaign.title,
    description: campaign.description,
    target: Number(campaign.target),
    amountCollected: Number(campaign.amountCollected),
    deadline: new Date(Number(campaign.deadline) * 1000), // Convert to milliseconds
    owner: campaign.owner,
    imageUrl: campaign.imageUrl,
    claimed: campaign.claimed
  };
}


export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [contributionAmount, setContributionAmount] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [contributors, setContributors] = useState<string[]>([]);
  const cid = use(params);

  useEffect(() => {
    async function fetchCampaign() {
      if (!cid.id) return;
      
      try {
        const contract = await getCrowdfundingContract();
        const campaignData = await getCampaign(Number(cid.id));
        setCampaign(campaignData);

        const contributorsData = await contract.getContributors(Number(cid.id));
        setContributors(contributorsData);
        
        // Check if current user is the owner
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setIsOwner(address.toLowerCase() === campaignData.owner.toLowerCase());
        } else {
          console.error('MetaMask is not installed!');
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [cid.id]);

 
  const handleContribute = async () => {
    if (!campaign || !contributionAmount) return;
    
    try {
      const contract = await getCrowdfundingContract();
      await contract.contribute(Number(cid.id), contributionAmount);
      alert('Contribution successful!');
      window.location.reload();
    } catch (error) {
      console.error('Error contributing:', error);
      alert('Failed to contribute. See console for details.');
    }
  };

  const handleWithdraw = async () => {
    if (!campaign) return;
    
    try {
      const contract = await getCrowdfundingContract();
      await contract.claimFunds(Number(cid.id));
      alert('Funds withdrawn successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error withdrawing:', error);
      alert('Failed to withdraw. See console for details.');
    }
  };

  const canWithdraw = campaign && 
    isOwner && 
    !campaign.claimed && 
    new Date() >= campaign.deadline && 
    Number(campaign.amountCollected) >= Number(campaign.target);

  if (loading) return <div>Loading campaign...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="max-w-4xl mx-auto mb-5 p-6 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">{campaign.title}</h1>

      <div className="relative">
        <div className="flex justify-center items-center">
          <Image
            src={campaign.imageUrl}
            width={800}
            height={600}
            alt={`Campaign Image`}
            className="rounded-lg object-cover"
            style={{ maxHeight: '600px', maxWidth: '800px' }}
          />
        </div>

      </div>

      <div className="flex flex-col justify-center items-left">
        <div className='text-center'>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <p className="mb-2">Target: {campaign.target} ETH</p>
          <p className="mb-2">Collected: {campaign.amountCollected} ETH</p>
          <p className="mb-2">Deadline: {campaign.deadline.toLocaleDateString()}</p>
          <p className="mb-2">Owner: {campaign.owner}</p>
          <p className="mb-2">Status: {campaign.claimed ? 'Claimed' : 'Active'}</p>
        </div>
        
        <div className="space-y-4 flex flex-col items-center">
          <div>
            <input
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
              placeholder="Amount in ETH"
              className="w-full p-2 border rounded-md"
              step="0.01"
              min="0"
            />
            <button
              onClick={handleContribute}
              className="w-full mt-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Contribute
            </button>
          </div>

          {isOwner && (
            <button
              onClick={handleWithdraw}
              disabled={!canWithdraw}
              className={`w-1/2 p-2 text-white rounded-md ${
                canWithdraw 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Withdraw Funds
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Contributors</h2>
        <ul className="list-disc pl-5">
          {contributors.map((contributor, index) => (
            <li key={index} className="text-gray-600">{contributor}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}