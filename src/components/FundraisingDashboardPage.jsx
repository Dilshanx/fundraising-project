import { useState, useEffect } from "react";
import {
  DollarSignIcon,
  UsersIcon,
  PlusIcon,
  BarChartIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";

const DashboardPage = () => {
  // State to manage dashboard data
  const [dashboardData, setDashboardData] = useState({
    totalCampaigns: 3,
    totalRaised: 62500,
    activedonors: 124,
    averageDonation: 504,
    campaignGoalProgress: 0.625, // 62.5% progress
    recentDonors: [
      { name: "John Doe", amount: 1000, date: "2024-02-15" },
      { name: "Jane Smith", amount: 500, date: "2024-02-14" },
      { name: "Alex Johnson", amount: 250, date: "2024-02-13" },
    ],
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulated data fetching effect
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, replace this with an actual API call
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-red-500'>
        <p className='text-2xl mb-4'>{error}</p>
        <Button onClick={() => window.location.reload()}>Retry Loading</Button>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />

      <main className='flex-grow container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Fundraising Dashboard</h1>

        {/* Key Metrics Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {/* Total Campaigns Card */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Campaigns
              </CardTitle>
              <BarChartIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {dashboardData.totalCampaigns}
              </div>
            </CardContent>
          </Card>

          {/* Total Raised Card */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Raised
              </CardTitle>
              <DollarSignIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {formatCurrency(dashboardData.totalRaised)}
              </div>
            </CardContent>
          </Card>

          {/* Active Donors Card */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Donors
              </CardTitle>
              <UsersIcon className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {dashboardData.activedonors}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Campaign Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='w-full bg-gray-200 rounded-full h-4 mb-4'>
                <div
                  className='bg-blue-600 h-4 rounded-full'
                  style={{
                    width: `${dashboardData.campaignGoalProgress * 100}%`,
                  }}
                ></div>
              </div>
              <p className='text-sm text-muted-foreground'>
                {`${Math.round(
                  dashboardData.campaignGoalProgress * 100
                )}% of goal achieved`}
              </p>
            </CardContent>
          </Card>

          {/* Recent Donors Card */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Recent Donors</CardTitle>
              <Link to='/donors'>
                <Button variant='outline' size='sm'>
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {dashboardData.recentDonors.map((donor, index) => (
                <div
                  key={index}
                  className='flex justify-between items-center py-2 border-b last:border-b-0'
                >
                  <div>
                    <p className='font-medium'>{donor.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {donor.date}
                    </p>
                  </div>
                  <div className='font-bold text-green-600'>
                    {formatCurrency(donor.amount)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className='mt-8 text-center'>
          <Link to='/create-campaign'>
            <Button className='bg-blue-500 hover:bg-blue-600'>
              <PlusIcon className='mr-2 h-4 w-4' />
              Create New Campaign
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
