"use client"

import { useState } from "react"
import { getCrowdfundingContract } from "../utils/crowdfunding";
import { useRouter } from "next/navigation";

export default function CreateCampaign() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    duration: 30
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contract = await getCrowdfundingContract();
      await contract.createCampaign(
        formData.title,
        formData.description,
        formData.target,
        formData.duration
      );
      alert('Campaign created successfully!');

      setFormData({ title: '', description: '', target: '', duration: 30 });
      router.push("/")
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return <div className="max-w-2xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-8">Create New Campaign</h1>
    
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Campaign Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
          placeholder="Enter campaign title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md h-32"
          placeholder="Describe your campaign"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Target Amount (ETH)
        </label>
        <input
          type="number"
          name="target"
          value={formData.target}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
          className="w-full p-2 border rounded-md"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Duration (Days)
        </label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          min="1"
          className="w-full p-2 border rounded-md"
          placeholder="30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 text-white rounded-md ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Creating Campaign...' : 'Create Campaign'}
      </button>
    </form>
  </div>
}
