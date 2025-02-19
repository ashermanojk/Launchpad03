import axios from 'axios';

export class IPFSUploader {
  private PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  private JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

  async uploadImage(file: File): Promise<string> {
    if (!this.JWT) {
      throw new Error('Pinata JWT token not configured');
    }

    if (!file) {
      throw new Error('No file provided');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const metadata = JSON.stringify({
        name: file.name,
        keyvalues: {
          type: 'campaign-image',
          timestamp: new Date().toISOString()
        }
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', options);

      const response = await axios.post(
        this.PINATA_API_URL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${this.JWT}`,
            accept: 'application/json',
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }
      );

      if (!response.data?.IpfsHash) {
        throw new Error('No IPFS hash received');
      }

      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Pinata API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
      } else {
        console.error('Upload Error:', error);
      }
      throw error;
    }
  }
}