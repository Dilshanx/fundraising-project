import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell, MessageCircle, Users, TrendingUp, Share2 } from "lucide-react";

// Sample data for the engagement metrics chart
const engagementData = [
  { month: "Jan", donors: 12, messages: 4, engagement: 7 },
  { month: "Feb", donors: 15, messages: 6, engagement: 8 },
  { month: "Mar", donors: 18, messages: 7, engagement: 18 },
  { month: "Apr", donors: 22, messages: 13, engagement: 22 },
];

// Sample updates data
const updates = [
  {
    id: 1,
    title: "New Milestone Reached",
    date: "2024-12-20",
    content:
      "We've successfully reached 80% of our funding goal! Thank you to all our supporters.",
  },
  {
    id: 2,
    title: "Upcoming Virtual Event",
    date: "2024-12-18",
    content: "Join us next week for a virtual meetup with our beneficiaries.",
  },
  {
    id: 3,
    title: "Impact Report Released",
    date: "2024-12-15",
    content:
      "Check out our latest impact report showcasing the results of your donations.",
  },
];

const EngagementPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-6xl mx-auto space-y-6'>
        {/* Header Section */}
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Engagement & Communication
          </h1>
          <p className='text-gray-500'>
            Stay connected with your donors and track campaign performance
          </p>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {[
            { icon: Users, label: "Active Donors", value: "12" },
            { icon: MessageCircle, label: "Messages", value: "8" },
            { icon: TrendingUp, label: "Engagement Rate", value: "87%" },
            { icon: Share2, label: "Shares", value: "45" },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardContent className='pt-6'>
                <div className='flex items-center space-x-4'>
                  <Icon className='h-6 w-6 text-blue-500' />
                  <div>
                    <p className='text-sm text-gray-500'>{label}</p>
                    <p className='text-2xl font-bold'>{value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-4'
        >
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='updates'>Updates</TabsTrigger>
            <TabsTrigger value='messages'>Messages</TabsTrigger>
          </TabsList>

          <TabsContent value='overview' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>
                  Track donor engagement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-[400px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={engagementData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='month' />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type='monotone'
                        dataKey='donors'
                        stroke='#2563eb'
                        name='Donors'
                      />
                      <Line
                        type='monotone'
                        dataKey='messages'
                        stroke='#16a34a'
                        name='Messages'
                      />
                      <Line
                        type='monotone'
                        dataKey='engagement'
                        stroke='#d97706'
                        name='Engagement %'
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='updates' className='space-y-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                  <CardTitle>Campaign Updates</CardTitle>
                  <CardDescription>
                    Keep your donors informed about progress
                  </CardDescription>
                </div>
                <Button>Create Update</Button>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {updates.map((update) => (
                    <Card key={update.id}>
                      <CardContent className='pt-6'>
                        <div className='flex justify-between items-start mb-2'>
                          <h3 className='font-semibold'>{update.title}</h3>
                          <span className='text-sm text-gray-500'>
                            {update.date}
                          </span>
                        </div>
                        <p className='text-gray-600'>{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='messages' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle>Donor Communications</CardTitle>
                <CardDescription>
                  Manage your donor messages and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center space-x-4'>
                      <Bell className='h-5 w-5 text-blue-500' />
                      <div>
                        <p className='font-medium'>Enable Notifications</p>
                        <p className='text-sm text-gray-500'>
                          Get alerts for new messages and updates
                        </p>
                      </div>
                    </div>
                    <Button variant='outline'>Configure</Button>
                  </div>

                  <div className='flex items-center justify-between p-4 border rounded-lg'>
                    <div className='flex items-center space-x-4'>
                      <MessageCircle className='h-5 w-5 text-blue-500' />
                      <div>
                        <p className='font-medium'>Message Templates</p>
                        <p className='text-sm text-gray-500'>
                          Create and manage response templates
                        </p>
                      </div>
                    </div>
                    <Button variant='outline'>Manage</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EngagementPage;
