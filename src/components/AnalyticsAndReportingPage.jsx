import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";

// Constants
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

// Utility functions
const formatCurrency = (amount = 0) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatMonthYear = (value) => {
  if (!value?.year || !value?.month) return "";
  const date = new Date(value.year, value.month - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

// Reusable components
const StatCard = ({ title, value }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-2xl font-bold'>{value}</p>
    </CardContent>
  </Card>
);

const LoadingState = () => (
  <div className='flex items-center justify-center min-h-screen'>
    Loading analytics...
  </div>
);

const ErrorState = ({ message }) => (
  <div className='flex items-center justify-center min-h-screen text-red-500'>
    Error: {message}
  </div>
);

const EmptyChart = () => (
  <div className='flex items-center justify-center h-full text-gray-500'>
    No data available
  </div>
);

const AnalyticsDashboard = () => {
  const { data, loading, error } = useAnalytics();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const {
    overview,
    demographics,
    donations,
    campaigns,
    donorStats,
    campaignStats,
  } = data;

  return (
    <div className='p-6 space-y-6'>
      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          title='Total Campaigns'
          value={overview?.totalCampaigns ?? 0}
        />
        <StatCard title='Total Donors' value={overview?.totalDonors ?? 0} />
        <StatCard title='Active Users' value={overview?.activeUsers ?? 0} />
        <StatCard
          title='Total Donations'
          value={formatCurrency(overview?.totalAmount ?? 0)}
        />
      </div>

      {/* Demographics Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent className='h-80'>
            {demographics?.ageDistribution?.length > 0 ? (
              <ResponsiveContainer>
                <BarChart data={demographics.ageDistribution}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='value' fill='#8884d8' />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent className='h-80'>
            {demographics?.genderDistribution?.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={demographics.genderDistribution}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={100}
                    label
                  >
                    {demographics.genderDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Location & Interests */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            {demographics?.locationDistribution?.length > 0 ? (
              <div className='space-y-2'>
                {demographics.locationDistribution.map((item) => (
                  <div
                    key={item.location || Math.random()}
                    className='flex justify-between items-center p-2 bg-gray-50 rounded'
                  >
                    <span className='font-medium'>{item.location}</span>
                    <span className='text-gray-600'>{item.count} users</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyChart />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Interests</CardTitle>
          </CardHeader>
          <CardContent className='h-80'>
            {demographics?.interestDistribution?.length > 0 ? (
              <ResponsiveContainer>
                <BarChart
                  data={demographics.interestDistribution}
                  layout='vertical'
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis type='number' />
                  <YAxis dataKey='name' type='category' width={150} />
                  <Tooltip />
                  <Bar dataKey='value' fill='#82ca9d' />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Donation Trends</CardTitle>
        </CardHeader>
        <CardContent className='h-80'>
          {donations?.monthlyTrends?.length > 0 ? (
            <ResponsiveContainer>
              <LineChart data={donations.monthlyTrends}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='_id' tickFormatter={formatMonthYear} />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) => {
                    if (!value?.year || !value?.month) return "";
                    const date = new Date(value.year, value.month - 1);
                    return date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='totalAmount'
                  stroke='#8884d8'
                  name='Total Amount'
                />
                <Line
                  type='monotone'
                  dataKey='count'
                  stroke='#82ca9d'
                  name='Number of Donations'
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </CardContent>
      </Card>

      {/* Donor Statistics
      <Card>
        <CardHeader>
          <CardTitle>Donor Insights</CardTitle>
        </CardHeader>
        <CardContent>
          {donorStats?.length > 0 ? (
            <div className='space-y-4'>
              {donorStats.map((donor) => (
                <div key={donor._id} className='p-4 bg-gray-50 rounded-lg'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Total Donations</p>
                      <p className='font-bold'>{donor.totalDonations}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Amount</p>
                      <p className='font-bold'>
                        {formatCurrency(donor.totalAmount)}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Average Donation</p>
                      <p className='font-bold'>
                        {formatCurrency(donor.averageDonation)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyChart />
          )}
        </CardContent>
      </Card> */}

      {/* Campaign Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Category Performance</CardTitle>
        </CardHeader>
        <CardContent className='h-96'>
          {campaignStats?.length > 0 ? (
            <ResponsiveContainer>
              <BarChart data={campaignStats}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='category' />
                <YAxis yAxisId='left' orientation='left' stroke='#8884d8' />
                <YAxis yAxisId='right' orientation='right' stroke='#82ca9d' />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId='left'
                  dataKey='successRate'
                  fill='#8884d8'
                  name='Success Rate (%)'
                />
                <Bar
                  yAxisId='right'
                  dataKey='totalCampaigns'
                  fill='#82ca9d'
                  name='Total Campaigns'
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </CardContent>
      </Card>

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns?.topPerformers?.length > 0 ? (
            <div className='space-y-4'>
              {campaigns.topPerformers.map((campaign) => (
                <div
                  key={campaign._id || Math.random()}
                  className='flex justify-between items-center p-4 bg-gray-50 rounded-lg'
                >
                  <div className='flex-1'>
                    <h3 className='font-medium'>{campaign.title}</h3>
                    <p className='text-sm text-gray-600'>
                      Category: {campaign.category}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold'>
                      {formatCurrency(campaign.currentAmount)}
                    </p>
                    <p className='text-sm text-gray-600'>
                      {(campaign.percentageReached || 0).toFixed(1)}% of goal
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyChart />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
