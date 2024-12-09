import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  CreditCardIcon,
  HeartIcon,
  SettingsIcon,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    campaigns: [],
    donations: [],
  });

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      // Placeholder for actual API call
      // setUser(fetchedUserData)
    };

    fetchUserData();
  }, []);

  const renderProfileContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Personal Information</h2>
            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <input
                  type='text'
                  value={user.name}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email Address
                </label>
                <input
                  type='email'
                  value={user.email}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
                />
              </div>
            </div>
            <Button variant='default'>Update Profile</Button>
          </div>
        );
      case "campaigns":
        return (
          <div>
            <h2 className='text-2xl font-bold mb-4'>My Campaigns</h2>
            {user.campaigns.length === 0 ? (
              <p>You haven't created any campaigns yet.</p>
            ) : (
              user.campaigns.map((campaign) => (
                <Card key={campaign.id} className='mb-4'>
                  <CardHeader>
                    <CardTitle>{campaign.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex justify-between'>
                      <span>Goal: {campaign.goal}</span>
                      <span>Raised: {campaign.raised}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );
      case "donations":
        return (
          <div>
            <h2 className='text-2xl font-bold mb-4'>Donation History</h2>
            {user.donations.length === 0 ? (
              <p>You haven't made any donations yet.</p>
            ) : (
              user.donations.map((donation) => (
                <Card key={donation.id} className='mb-4'>
                  <CardHeader>
                    <CardTitle>{donation.campaignTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex justify-between'>
                      <span>Amount: ${donation.amount}</span>
                      <span>Date: {donation.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );
      case "settings":
        return (
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Account Settings</h2>
            <div>
              <h3 className='text-lg font-semibold'>Security</h3>
              <Button variant='outline'>Change Password</Button>
            </div>
            <div>
              <h3 className='text-lg font-semibold'>Notifications</h3>
              <div className='flex items-center space-x-2'>
                <input type='checkbox' id='emailNotifications' />
                <label htmlFor='emailNotifications'>
                  Receive email updates about campaigns
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Navbar />
      <div className='container mx-auto py-12 px-4'>
        <div className='grid md:grid-cols-4 gap-8'>
          {/* Sidebar Navigation */}
          <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md'>
            <div className='flex items-center mb-8'>
              <div className='w-16 h-16 bg-gray-300 rounded-full mr-4'></div>
              <div>
                <h2 className='text-xl font-bold'>{user.name}</h2>
                <p className='text-gray-500'>{user.email}</p>
              </div>
            </div>
            <nav className='space-y-2'>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                onClick={() => setActiveTab("profile")}
                className='w-full justify-start'
              >
                <UserIcon className='mr-2' size={20} /> Profile
              </Button>
              <Button
                variant={activeTab === "campaigns" ? "default" : "ghost"}
                onClick={() => setActiveTab("campaigns")}
                className='w-full justify-start'
              >
                <HeartIcon className='mr-2' size={20} /> My Campaigns
              </Button>
              <Button
                variant={activeTab === "donations" ? "default" : "ghost"}
                onClick={() => setActiveTab("donations")}
                className='w-full justify-start'
              >
                <CreditCardIcon className='mr-2' size={20} /> Donations
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                onClick={() => setActiveTab("settings")}
                className='w-full justify-start'
              >
                <SettingsIcon className='mr-2' size={20} /> Settings
              </Button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className='md:col-span-3 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md'>
            {renderProfileContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
