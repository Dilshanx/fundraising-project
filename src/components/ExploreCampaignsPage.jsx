import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FilterIcon, SearchIcon, CalendarIcon } from "lucide-react";
import apiConfig from "@/config/apiConfig";
import { Link } from "react-router-dom";

const ExploreCampaigns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minGoal: "",
    maxGoal: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [campaigns, setCampaigns] = useState([]); // State to hold fetched campaigns

  const campaignCategories = [
    "Education",
    "Healthcare",
    "Community Development",
    "Environmental",
    "Medical Research",
    "Humanitarian Aid",
  ];

  // Fetch Campaigns from API on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const response = await apiConfig.get("/campaigns"); // Replace with your actual endpoint
        setCampaigns(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching campaigns:", error);
        setError(
          "Failed to load campaigns. Please check your connection and try again."
        );
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>
          Explore Campaigns
        </h1>
        <div className='flex items-center space-x-4'>
          <div className='relative flex-grow'>
            <SearchIcon
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <Input
              placeholder='Search campaigns'
              className='pl-10'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant='outline' className='flex items-center'>
            <FilterIcon className='mr-2' size={16} />
            Filters
          </Button>
        </div>
      </div>
      {isLoading ? (
        <p className='text-center'>Loading Campaigns...</p>
      ) : error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : (
        <div className='grid md:grid-cols-3 gap-6'>
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign._id} className='hover:shadow-xl transition-all'>
              <CardContent className='p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm'>
                    {campaign.category}
                  </span>
                  <div className='flex items-center text-gray-500'>
                    <CalendarIcon size={16} className='mr-2' />
                    {/* Convert date to better readable */}
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </div>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{campaign.title}</h3>
                <p className='text-gray-600 mb-4'>{campaign.description}</p>

                <div className='flex justify-between mb-2 text-sm text-gray-600'>
                  <span>
                    Goal: ${campaign.fundraisingGoal.toLocaleString()}
                  </span>
                  {/*  Calculate amount raised here based on donations */}
                  <span>Raised: $0</span>
                </div>

                <div className='w-full bg-gray-200 rounded-full h-2.5 mb-2'>
                  <div
                    className='bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full'
                    style={{ width: `0%` }}
                  />
                </div>
                <div className='flex justify-between text-sm text-gray-600'>
                  <span>0% Funded</span>
                  <Link to={`/campaigns/${campaign._id}`}>
                    <Button size='sm' variant='outline'>
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCampaigns;
