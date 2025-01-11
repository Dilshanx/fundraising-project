import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import apiConfig from "@/config/apiConfig";

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await apiConfig.get("/campaigns/my-campaigns");
        setCampaigns(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[200px]'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (campaigns.length === 0) {
    return (
      <Card className='mb-4'>
        <CardContent className='pt-6'>
          <p className='text-center text-gray-500'>No campaigns found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold mb-4'>My Campaigns</h2>
      {campaigns.map((campaign) => (
        <Card key={campaign._id} className='hover:shadow-lg transition-shadow'>
          <CardHeader>
            <CardTitle>{campaign.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <p className='text-gray-600'>{campaign.description}</p>
              <div className='flex justify-between items-center text-sm text-gray-500'>
                <span>Status: {campaign.status}</span>
                <span>
                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyCampaigns;
