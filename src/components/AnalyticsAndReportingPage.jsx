import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";

const AnalyticsAndReportingPage = () => {
  const [campaignAnalytics, setCampaignAnalytics] = useState(null);

  useEffect(() => {
    // Fetch the campaign analytics data from the backend
    const fetchCampaignAnalytics = async () => {
      const response = await fetch("/api/analytics");
      const data = await response.json();
      setCampaignAnalytics(data);
    };
    fetchCampaignAnalytics();
  }, []);

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Analytics and Reporting</h1>
      {campaignAnalytics && (
        <div>
          <h2 className='text-2xl font-bold mb-4'>Donation Trends</h2>
          <LineChart
            width={800}
            height={400}
            data={campaignAnalytics.donationTrends}
          >
            <XAxis
              dataKey='date'
              tickFormatter={(date) => format(new Date(date), "MMM d")}
            />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='donations' stroke='#8884d8' />
          </LineChart>
          <h2 className='text-2xl font-bold mb-4 mt-8'>Donor Demographics</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='text-xl font-bold mb-2'>Age Distribution</h3>
              <LineChart
                width={400}
                height={300}
                data={campaignAnalytics.donorAgeDistribution}
              >
                <XAxis dataKey='age' />
                <YAxis />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='count' stroke='#8884d8' />
              </LineChart>
            </div>
            <div>
              <h3 className='text-xl font-bold mb-2'>
                Geographic Distribution
              </h3>
              <LineChart
                width={400}
                height={300}
                data={campaignAnalytics.donorGeographicDistribution}
              >
                <XAxis dataKey='location' />
                <YAxis />
                <CartesianGrid strokeDasharray='3 3' />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='count' stroke='#8884d8' />
              </LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsAndReportingPage;
