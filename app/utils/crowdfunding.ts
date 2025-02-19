  //npx hardhat ignition deploy ./ignition/modules/Crowdfunding.ts --network localhost

import { ethers } from 'ethers';
import { abi as contractABI } from "../../hardhat/artifacts/contracts/Crowdfunding.sol/Crowdfunding.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

class CrowdfundingContract{

  private contract!: ethers.Contract;
  private signer!: ethers.JsonRpcSigner;

  async initialize(provider: ethers.BrowserProvider) {
    this.signer = await provider.getSigner();      1
    this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);
  }

  async createCampaign(
    title: string, 
    description: string, 
    target: string, 
    durationInDays: number, 
    imageUrl: string  ) {
    const deadline = Math.floor(Date.now() / 1000) + durationInDays * 24 * 60 * 60;
    const targetWei = ethers.parseEther(target);
    
    const tx = await this.contract.createCampaign(
      title,
      description,
      targetWei,
      deadline,
      imageUrl
    );
    return tx.wait();
  }

  async contribute(campaignId: number, amount: string) {
    const tx = await this.contract.contribute(campaignId, {
      value: ethers.parseEther(amount)
    });
    return tx.wait();
  }

  async claimFunds(campaignId: number) {
    const tx = await this.contract.claimFunds(campaignId);
    return tx.wait();
  }

  async getRefund(campaignId: number) {
    const tx = await this.contract.getRefund(campaignId);
    return tx.wait();
  }

  async getCampaign(campaignId: number) {
    try {
      const [owner, title, description, target, deadline, amountCollected, claimed, imageUrl] = 
        await this.contract.getCampaign(campaignId);
      
      return {
        id: campaignId,
        owner,
        title,
        description,
        target: ethers.formatEther(target),
        deadline: new Date(Number(deadline) * 1000),
        amountCollected: ethers.formatEther(amountCollected),
        claimed,
        imageUrl
      };
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error;
    }
  }

  async getContribution(campaignId: number, address: string) {
    const contribution = await this.contract.getContribution(campaignId, address);
    return ethers.formatEther(contribution);
  }

  async getContributors(campaignId: number): Promise<string[]> {
    return await this.contract.getContributors(campaignId);
  }

  async getTotalCampaigns() {
    try {
      const filter = this.contract.filters.CampaignCreated();
      const events = await this.contract.queryFilter(filter);
      return events.length;
    } catch (error) {
      console.error('Error counting campaigns:', error);
      return 0;
    }
  }
}

// Helper function to get contract instance
export async function getCrowdfundingContract() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
    const contract = new CrowdfundingContract();
    await contract.initialize(provider);
    return contract;
  }
  throw new Error('Please install MetaMask!');
} 
