
import Link from "next/link";
import Image from 'next/image';

interface Campaign {
    id: number;
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: Date;
    amountCollected: string;
    claimed: boolean;
    imageUrl: string;
  }

  
  export default function CampaignCard({ campaign }: { campaign: Campaign }) {

  const amountCollected = Number(campaign.amountCollected);
  const target = Number(campaign.target);
  const progress = (amountCollected / target) * 100;


    return (
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">

        <div className = "flex flex-col">

        <div>
        <Image
          src = {campaign.imageUrl}
          width= {500}
          height= {300}
          alt="Campaign Image"
          />
        </div>

        <div className="p-4">

        <Link href={`/campaign/${campaign.id}`}>
          <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
          <p className="text-gray-600 mb-4">{campaign.description}</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
             <div className ="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 width: 45%"
              style = {{ width : `${progress}%` }}></div>
             </div>
          <div className="space-y-2">
            <p className="text-sm">Target: {campaign.target} ETH</p>
            <p className="text-sm">Collected: {campaign.amountCollected} ETH</p>
            <p className="text-sm">Deadline: {new Date(Number(campaign.deadline)).toLocaleDateString()}</p>
          </div>
        </Link>
        
        </div>
        </div>
      </div>
    );
  }