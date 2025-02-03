
import Link from "next/link";

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
  
  export default function CampaignCard({ campaign }: { campaign: Campaign }) {
    return (
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
        <div className="p-4">
        <Link href={`/campaign/${campaign.id}`}>
          <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <div className="space-y-2">
            <p className="text-sm">Target: {campaign.target} ETH</p>
            <p className="text-sm">Collected: {campaign.amountCollected} ETH</p>
            <p className="text-sm">Deadline: {new Date(Number(campaign.deadline)).toLocaleDateString()}</p>
          </div>
        </Link>
        </div>
      </div>
    );
  }