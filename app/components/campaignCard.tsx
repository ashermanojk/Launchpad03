import Image from 'next/image';
import Link from 'next/link';

interface Campaign {
  id: number;
  owner: string;
  title: string;
  description: string;
  target: string; 
  deadline: number;  
  amountCollected: string;  
  imageUrl: string;
  claimed: boolean;
}

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const amountCollected = Number(campaign.amountCollected);
  const target = Number(campaign.target);
  const progress = (amountCollected / target) * 100;
  
  // Default image URL or get the first image from the array if it exists
  const imageUrl = campaign.imageUrl; // Add a default image to your public folder

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <div className="flex flex-col">
        <div>
          <Image
            src={imageUrl}
            width={500}
            height={300}
            alt="Campaign Image"
          />
        </div>
        <div className="p-4">
          <Link href={`/campaign/${campaign.id}`}>
            <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
            <p className="text-gray-600 mb-4">{campaign.description}</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-gray-600">Deadline: {new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}