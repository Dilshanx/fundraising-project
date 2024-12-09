import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon, CalendarIcon, DollarSignIcon } from "lucide-react";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    category: "",
    fundraisingGoal: "",
    endDate: "",
    imageUrl: "",
  });

  const categories = [
    "Education",
    "Healthcare",
    "Community Development",
    "Environmental",
    "Medical Research",
    "Humanitarian Aid",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement campaign creation logic
    console.log("Campaign Data:", campaignData);
  };

  return (
    <div className='container mx-auto py-12 px-4'>
      <Card className='max-w-2xl mx-auto bg-white dark:bg-gray-800'>
        <CardHeader>
          <CardTitle className='flex items-center text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
            <RocketIcon className='mr-3' size={32} />
            Create Your Fundraising Campaign
          </CardTitle>
          <p className='text-gray-600 dark:text-gray-300 mt-2'>
            Launch a meaningful campaign and make a difference
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                Campaign Title
              </label>
              <Input
                placeholder='Enter campaign title'
                value={campaignData.title}
                onChange={(e) =>
                  setCampaignData({ ...campaignData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                Description
              </label>
              <Textarea
                placeholder='Tell your story and inspire supporters'
                value={campaignData.description}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    description: e.target.value,
                  })
                }
                rows={4}
                required
              />
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                  <DollarSignIcon className='inline mr-2' size={16} />
                  Fundraising Goal
                </label>
                <Input
                  type='number'
                  placeholder='$10,000'
                  value={campaignData.fundraisingGoal}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      fundraisingGoal: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                  <CalendarIcon className='inline mr-2' size={16} />
                  Campaign End Date
                </label>
                <Input
                  type='date'
                  value={campaignData.endDate}
                  onChange={(e) =>
                    setCampaignData({
                      ...campaignData,
                      endDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className='block mb-2 text-gray-700 dark:text-gray-300'>
                Campaign Category
              </label>
              <Select
                value={campaignData.category}
                onValueChange={(value) =>
                  setCampaignData({ ...campaignData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Campaign Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            >
              Create Campaign
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCampaign;
