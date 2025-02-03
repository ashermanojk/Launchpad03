"use client";

import { useEffect, useState } from 'react';
import { getCrowdfundingContract } from '../../utils/crowdfunding';
import { use } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import SVGImage from '../../lib/9930924_4269957.svg';


interface Campaign {
  id: number;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: Date;
  amountCollected: string;
  claimed: boolean;
}

export default function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [contributionAmount, setContributionAmount] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const cid = use(params);

  useEffect(() => {
    async function fetchCampaign() {
      if (!cid.id) return;
      
      try {
        const contract = await getCrowdfundingContract();
        const campaignData = await contract.getCampaign(Number(cid.id));
        setCampaign(campaignData);
        
        // Check if current user is the owner
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setIsOwner(address.toLowerCase() === campaignData.owner.toLowerCase());
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className='h-screen text-left'>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <p className="mb-2">Target: {campaign.target} ETH</p>
          <p className="mb-2">Collected: {campaign.amountCollected} ETH</p>
          <p className="mb-2">Deadline: {campaign.deadline.toLocaleDateString()}</p>
          <p className="mb-2">Owner: {campaign.owner}</p>
          <p className="mb-2">Status: {campaign.claimed ? 'Claimed' : 'Active'}</p>
        </div>
        
        <div className="space-y-4 flex flex-col items-center">
          <Image src={SVGImage} 
          width={300} 
          height={300} 
          alt="Ethereum Logo" />
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
              className={`w-full p-2 text-white rounded-md ${
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
    </div>
  );
}