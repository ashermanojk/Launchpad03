// First, install the required package:
// npm install @pinata/sdk axios form-data

// utils/ipfsUploader.ts

// components/CampaignImageUploader.tsx
import { useState } from 'react';

interface IpfsImageUploaderProps {
  onFileSelected: (file: File | null) => void;
  onImageUploaded: (url: string) => void;
}

const IpfsImageUploader: React.FC<IpfsImageUploaderProps> = ({ onFileSelected }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelected(file); // Pass the selected file to the parent
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

    const MAX_SIZE = 15 * 1024 * 1024; // 15MB in bytes

    if (file.size > MAX_SIZE) {
      alert('File is too large. Please choose an image under 15MB.');
      return;
    }
  } else {
    onFileSelected(null);
    setPreviewUrl(null);
  }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className ="text-bold text-gray-800 text-center">This image is stored permanently on IPFS.</div>
      <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="campaign-image"
        />
        <label
          htmlFor="campaign-image"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Choose Campaign Image (PNG, JPG).
        </label>
        
        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-auto rounded shadow-lg"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
    </div>
    </div>
  );
};

export default IpfsImageUploader;