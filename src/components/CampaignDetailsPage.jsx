import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShareIcon,
  DollarSignIcon,
  UsersIcon,
  MessageCircleIcon,
} from "lucide-react";

const CampaignDetails = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const campaignDetails = {
    title: "Global Education Initiative",
    description:
      "Providing scholarships and learning resources to underprivileged children worldwide",
    goal: 250000,
    raised: 187500,
    supporters: 1245,
    progress: 75,
    updates: [
      {
        date: "2024-06-15",
        title: "First Scholarship Recipients Announced",
        content:
          "We are thrilled to share that our first 50 scholarship recipients have been selected...",
      },
    ],
  };

  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='grid md:grid-cols-3 gap-8'>
        {/* Campaign Overview */}
        <div className='md:col-span-2'>
          <Card className='mb-6'>
            <CardContent className='p-6'>
              <h1 className='text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>
                {campaignDetails.title}
              </h1>

              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                {campaignDetails.description}
              </p>

              {/* Progress and Stats */}
              <div className='grid md:grid-cols-3 gap-4 mb-6'>
                <div className='bg-indigo-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <DollarSignIcon
                      className='mr-2 text-indigo-600'
                      size={24}
                    />
                    <span className='font-semibold'>Fundraising Goal</span>
                  </div>
                  <p className='text-2xl font-bold'>
                    ${campaignDetails.goal.toLocaleString()}
                  </p>
                </div>

                <div className='bg-purple-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <UsersIcon className='mr-2 text-purple-600' size={24} />
                    <span className='font-semibold'>Total Supporters</span>
                  </div>
                  <p className='text-2xl font-bold'>
                    {campaignDetails.supporters}
                  </p>
                </div>

                <div className='bg-green-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <ShareIcon className='mr-2 text-green-600' size={24} />
                    <span className='font-semibold'>Progress</span>
                  </div>
                  <p className='text-2xl font-bold'>
                    {campaignDetails.progress}%
                  </p>
                </div>
              </div>

              {/* Donation Progress Bar */}
              <div className='w-full bg-gray-200 rounded-full h-3 mb-4'>
                <div
                  className='bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full'
                  style={{ width: `${campaignDetails.progress}%` }}
                />
              </div>

              {/* Campaign Tabs */}
              <div className='flex border-b mb-6'>
                {["overview", "updates", "supporters"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 capitalize ${
                      selectedTab === tab
                        ? "border-b-2 border-indigo-600 text-indigo-600"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {selectedTab === "overview" && (
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Campaign Overview
                  </h3>
                  <p className='text-gray-600'>
                    Our mission is to break the cycle of poverty through
                    education. By providing scholarships and learning resources,
                    we empower underprivileged children to pursue their dreams
                    and create lasting change in their communities.
                  </p>
                </div>
              )}

              {selectedTab === "updates" && (
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Campaign Updates
                  </h3>
                  {campaignDetails.updates.map((update, index) => (
                    <Card key={index} className='mb-4'>
                      <CardContent className='p-4'>
                        <div className='flex items-center mb-2'>
                          <MessageCircleIcon
                            className='mr-2 text-indigo-600'
                            size={20}
                          />
                          <span className='font-medium'>{update.date}</span>
                        </div>
                        <h4 className='font-semibold mb-2'>{update.title}</h4>
                        <p className='text-gray-600'>{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {selectedTab === "supporters" && (
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Campaign Supporters
                  </h3>
                  <p className='text-gray-600'>
                    We are grateful for the incredible support from our donors
                    and community. Each contribution brings us closer to our
                    goal of transforming lives through education.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            size='lg'
            className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
          >
            Donate Now
          </Button>
        </div>

        {/* Sidebar (Optional) */}
        <div className='hidden md:block'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>Quick Facts</h3>
              <ul className='space-y-3'>
                <li className='flex items-center'>
                  <DollarSignIcon className='mr-2 text-green-600' size={20} />
                  <span>
                    Total Raised: ${campaignDetails.raised.toLocaleString()}
                  </span>
                </li>
                <li className='flex items-center'>
                  <UsersIcon className='mr-2 text-purple-600' size={20} />
                  <span>Total Supporters: {campaignDetails.supporters}</span>
                </li>
                <li className='flex items-center'>
                  <ShareIcon className='mr-2 text-indigo-600' size={20} />
                  <span>Campaign Progress: {campaignDetails.progress}%</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
