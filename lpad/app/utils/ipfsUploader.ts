import axios from 'axios';
import FormData from 'form-data';

export class IPFSUploader {
  private PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  private JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxOGI0Nzk3Zi02MjJhLTRkNTctYTY3Zi0wM2EyNzRiY2UzMjkiLCJlbWFpbCI6ImFzaGVybWFub2owMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImU1YWQ1ZGEyNDUzZGRkMzllOGExIiwic2NvcGVkS2V5U2VjcmV0IjoiMjAzOTRiNTcxYTY5ZWZjZjkyZDJmNmQxNTRkZDM4NWM3MTk1YzYzMmZiMmM0ZjQ5NWU1ZGRiMWFkZmY4N2NkZSIsImV4cCI6MTc3MDY3MTY1N30.huxlDfKzA-PusKPK3IxXfehV6Ij6h7F0yn6qLS03l_E";

  async uploadImage(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        this.PINATA_API_URL,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.JWT}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Return the IPFS gateway URL
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw new Error('Failed to upload image to IPFS');
    }
  }
}
