"use client";
import { useEffect, useState } from 'react';
import { getCrowdfundingContract } from '../utils/crowdfunding';
import CampaignCard from '../components/campaignCard';

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

export default function Discover() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const contract = await getCrowdfundingContract();
        const total = await contract.getTotalCampaigns();
        console.log('Total campaigns:', total); // Debug log
        
        if (total === 0) {
          setLoading(false);
          return;
        }

        const campaignData = [];
        for (let i = Number(total) - 1; i >= 0; i--) {
          try {
            const campaign = await contract.getCampaign(i);
            campaignData.push(campaign);
          } catch (error) {
            console.error(`Error fetching campaign ${i}:`, error);
          }
        }

        if (campaignData.length > 0) {
          setCampaigns(campaignData);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading campaigns...</div>;
  if (campaigns.length === 0) return <div>No campaigns found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}