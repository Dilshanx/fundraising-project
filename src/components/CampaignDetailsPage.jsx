// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   ShareIcon,
//   DollarSignIcon,
//   UsersIcon,
//   MessageCircleIcon,
// } from "lucide-react";
// import apiConfig from "@/config/apiConfig";

// const CampaignDetails = () => {
//   // Get id from useParams
//   const { id } = useParams();
//   const [selectedTab, setSelectedTab] = useState("overview");
//   const [campaign, setCampaign] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCampaignDetails = async () => {
//       if (!id) {
//         setError("No campaign ID provided");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("Fetching campaign with ID:", id);
//         setIsLoading(true);
//         const response = await apiConfig.get(`/campaigns/${id}`);

//         if (response.data.success) {
//           setCampaign(response.data.data);
//         } else {
//           setError(response.data.message || "Failed to fetch campaign details");
//         }
//       } catch (error) {
//         console.error("Error fetching campaign:", error);
//         setError(
//           error.response?.data?.message ||
//             error.message ||
//             "Failed to fetch campaign details"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCampaignDetails();
//   }, [id]); // Using 'id' from useParams in dependency array

//   if (isLoading) {
//     return (
//       <div className='container mx-auto py-12 px-4 text-center'>
//         <p>Loading campaign details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className='container mx-auto py-12 px-4 text-center text-red-600'>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!campaign) {
//     return (
//       <div className='container mx-auto py-12 px-4 text-center'>
//         <p>Campaign not found</p>
//       </div>
//     );
//   }

//   // Calculate progress percentage
//   const progress =
//     campaign.fundraisingGoal > 0
//       ? Math.round(
//           ((campaign.amountRaised || 0) / campaign.fundraisingGoal) * 100
//         )
//       : 0;

//   return (
//     <div className='container mx-auto py-12 px-4'>
//       <div className='grid md:grid-cols-3 gap-8'>
//         {/* Campaign Overview */}
//         <div className='md:col-span-2'>
//           <Card className='mb-6'>
//             <CardContent className='p-6'>
//               <h1 className='text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>
//                 {campaign.title}
//               </h1>

//               <p className='text-gray-600 dark:text-gray-300 mb-6'>
//                 {campaign.description}
//               </p>

//               {/* Progress and Stats */}
//               <div className='grid md:grid-cols-3 gap-4 mb-6'>
//                 <div className='bg-indigo-50 p-4 rounded-lg'>
//                   <div className='flex items-center mb-2'>
//                     <DollarSignIcon
//                       className='mr-2 text-indigo-600'
//                       size={24}
//                     />
//                     <span className='font-semibold'>Fundraising Goal</span>
//                   </div>
//                   <p className='text-2xl font-bold'>
//                     ${campaign.fundraisingGoal?.toLocaleString()}
//                   </p>
//                 </div>

//                 <div className='bg-purple-50 p-4 rounded-lg'>
//                   <div className='flex items-center mb-2'>
//                     <UsersIcon className='mr-2 text-purple-600' size={24} />
//                     <span className='font-semibold'>Total Supporters</span>
//                   </div>
//                   <p className='text-2xl font-bold'>
//                     {campaign.supportersCount || 0}
//                   </p>
//                 </div>

//                 <div className='bg-green-50 p-4 rounded-lg'>
//                   <div className='flex items-center mb-2'>
//                     <ShareIcon className='mr-2 text-green-600' size={24} />
//                     <span className='font-semibold'>Progress</span>
//                   </div>
//                   <p className='text-2xl font-bold'>{progress}%</p>
//                 </div>
//               </div>

//               {/* Donation Progress Bar */}
//               <div className='w-full bg-gray-200 rounded-full h-3 mb-4'>
//                 <div
//                   className='bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full'
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>

//               {/* Campaign Tabs */}
//               <div className='flex border-b mb-6'>
//                 {["overview", "updates", "supporters"].map((tab) => (
//                   <button
//                     key={tab}
//                     className={`px-4 py-2 capitalize ${
//                       selectedTab === tab
//                         ? "border-b-2 border-indigo-600 text-indigo-600"
//                         : "text-gray-500"
//                     }`}
//                     onClick={() => setSelectedTab(tab)}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               {selectedTab === "overview" && (
//                 <div>
//                   <h3 className='text-xl font-semibold mb-4'>
//                     Campaign Overview
//                   </h3>
//                   <p className='text-gray-600'>{campaign.description}</p>
//                   <div className='mt-4'>
//                     <p className='text-sm text-gray-500'>
//                       Category: {campaign.category}
//                     </p>
//                     <p className='text-sm text-gray-500'>
//                       End Date:{" "}
//                       {new Date(campaign.endDate).toLocaleDateString()}
//                     </p>
//                     <p className='text-sm text-gray-500'>
//                       Created by: {campaign.creator?.name || "Anonymous"}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {selectedTab === "updates" && (
//                 <div>
//                   <h3 className='text-xl font-semibold mb-4'>
//                     Campaign Updates
//                   </h3>
//                   {campaign.updates && campaign.updates.length > 0 ? (
//                     campaign.updates.map((update, index) => (
//                       <Card key={index} className='mb-4'>
//                         <CardContent className='p-4'>
//                           <div className='flex items-center mb-2'>
//                             <MessageCircleIcon
//                               className='mr-2 text-indigo-600'
//                               size={20}
//                             />
//                             <span className='font-medium'>
//                               {new Date(update.date).toLocaleDateString()}
//                             </span>
//                           </div>
//                           <h4 className='font-semibold mb-2'>{update.title}</h4>
//                           <p className='text-gray-600'>{update.content}</p>
//                         </CardContent>
//                       </Card>
//                     ))
//                   ) : (
//                     <p className='text-gray-500'>No updates yet</p>
//                   )}
//                 </div>
//               )}

//               {selectedTab === "supporters" && (
//                 <div>
//                   <h3 className='text-xl font-semibold mb-4'>
//                     Campaign Supporters
//                   </h3>
//                   {campaign.supporters && campaign.supporters.length > 0 ? (
//                     <div className='space-y-4'>
//                       {campaign.supporters.map((supporter, index) => (
//                         <div
//                           key={index}
//                           className='flex items-center space-x-4'
//                         >
//                           <UsersIcon className='text-purple-600' size={20} />
//                           <div>
//                             <p className='font-medium'>
//                               {supporter.name || "Anonymous"}
//                             </p>
//                             <p className='text-sm text-gray-500'>
//                               Donated: ${supporter.amount?.toLocaleString()}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className='text-gray-500'>
//                       Be the first to support this campaign!
//                     </p>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <Button
//             size='lg'
//             className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
//           >
//             Donate Now
//           </Button>
//         </div>

//         {/* Sidebar */}
//         <div className='hidden md:block'>
//           <Card>
//             <CardContent className='p-6'>
//               <h3 className='text-xl font-semibold mb-4'>Quick Facts</h3>
//               <ul className='space-y-3'>
//                 <li className='flex items-center'>
//                   <DollarSignIcon className='mr-2 text-green-600' size={20} />
//                   <span>
//                     Total Raised: $
//                     {(campaign.amountRaised || 0).toLocaleString()}
//                   </span>
//                 </li>
//                 <li className='flex items-center'>
//                   <UsersIcon className='mr-2 text-purple-600' size={20} />
//                   <span>Total Supporters: {campaign.supportersCount || 0}</span>
//                 </li>
//                 <li className='flex items-center'>
//                   <ShareIcon className='mr-2 text-indigo-600' size={20} />
//                   <span>Campaign Progress: {progress}%</span>
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignDetails;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShareIcon,
  DollarSignIcon,
  UsersIcon,
  MessageCircleIcon,
  PencilIcon,
} from "lucide-react";
import apiConfig from "@/config/apiConfig";
import UpdateCampaign from "./UpdateCampaignPage";

const CampaignDetails = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!id) {
        setError("No campaign ID provided");
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching campaign with ID:", id);
        setIsLoading(true);
        const response = await apiConfig.get(`/campaigns/${id}`);

        if (response.data.success) {
          setCampaign(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch campaign details");
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch campaign details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className='container mx-auto py-12 px-4 text-center'>
        <p>Loading campaign details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto py-12 px-4 text-center text-red-600'>
        <p>{error}</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className='container mx-auto py-12 px-4 text-center'>
        <p>Campaign not found</p>
      </div>
    );
  }

  if (showUpdateForm) {
    return (
      <div className='container mx-auto py-12 px-4'>
        <Button
          onClick={() => setShowUpdateForm(false)}
          className='mb-6'
          variant='outline'
        >
          Back to Campaign Details
        </Button>
        <UpdateCampaign campaignId={id} />
      </div>
    );
  }

  // Calculate progress percentage
  const progress =
    campaign.fundraisingGoal > 0
      ? Math.round(
          ((campaign.amountRaised || 0) / campaign.fundraisingGoal) * 100
        )
      : 0;

  return (
    <div className='container mx-auto py-12 px-4'>
      <div className='grid md:grid-cols-3 gap-8'>
        {/* Campaign Overview */}
        <div className='md:col-span-2'>
          <Card className='mb-6'>
            <CardContent className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>
                  {campaign.title}
                </h1>
                <Button
                  onClick={() => setShowUpdateForm(true)}
                  variant='outline'
                  className='flex items-center gap-2'
                >
                  <PencilIcon size={16} />
                  Edit Campaign
                </Button>
              </div>

              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                {campaign.description}
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
                    ${campaign.fundraisingGoal?.toLocaleString()}
                  </p>
                </div>

                <div className='bg-purple-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <UsersIcon className='mr-2 text-purple-600' size={24} />
                    <span className='font-semibold'>Total Supporters</span>
                  </div>
                  <p className='text-2xl font-bold'>
                    {campaign.supportersCount || 0}
                  </p>
                </div>

                <div className='bg-green-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <ShareIcon className='mr-2 text-green-600' size={24} />
                    <span className='font-semibold'>Progress</span>
                  </div>
                  <p className='text-2xl font-bold'>{progress}%</p>
                </div>
              </div>

              {/* Rest of the component remains the same... */}
              {/* Donation Progress Bar */}
              <div className='w-full bg-gray-200 rounded-full h-3 mb-4'>
                <div
                  className='bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full'
                  style={{ width: `${progress}%` }}
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
                  <p className='text-gray-600'>{campaign.description}</p>
                  <div className='mt-4'>
                    <p className='text-sm text-gray-500'>
                      Category: {campaign.category}
                    </p>
                    <p className='text-sm text-gray-500'>
                      End Date:{" "}
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Created by: {campaign.creator?.name || "Anonymous"}
                    </p>
                  </div>
                </div>
              )}

              {selectedTab === "updates" && (
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Campaign Updates
                  </h3>
                  {campaign.updates && campaign.updates.length > 0 ? (
                    campaign.updates.map((update, index) => (
                      <Card key={index} className='mb-4'>
                        <CardContent className='p-4'>
                          <div className='flex items-center mb-2'>
                            <MessageCircleIcon
                              className='mr-2 text-indigo-600'
                              size={20}
                            />
                            <span className='font-medium'>
                              {new Date(update.date).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className='font-semibold mb-2'>{update.title}</h4>
                          <p className='text-gray-600'>{update.content}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className='text-gray-500'>No updates yet</p>
                  )}
                </div>
              )}

              {selectedTab === "supporters" && (
                <div>
                  <h3 className='text-xl font-semibold mb-4'>
                    Campaign Supporters
                  </h3>
                  {campaign.supporters && campaign.supporters.length > 0 ? (
                    <div className='space-y-4'>
                      {campaign.supporters.map((supporter, index) => (
                        <div
                          key={index}
                          className='flex items-center space-x-4'
                        >
                          <UsersIcon className='text-purple-600' size={20} />
                          <div>
                            <p className='font-medium'>
                              {supporter.name || "Anonymous"}
                            </p>
                            <p className='text-sm text-gray-500'>
                              Donated: ${supporter.amount?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-gray-500'>
                      Be the first to support this campaign!
                    </p>
                  )}
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

        {/* Sidebar */}
        <div className='hidden md:block'>
          <Card>
            <CardContent className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>Quick Facts</h3>
              <ul className='space-y-3'>
                <li className='flex items-center'>
                  <DollarSignIcon className='mr-2 text-green-600' size={20} />
                  <span>
                    Total Raised: $
                    {(campaign.amountRaised || 0).toLocaleString()}
                  </span>
                </li>
                <li className='flex items-center'>
                  <UsersIcon className='mr-2 text-purple-600' size={20} />
                  <span>Total Supporters: {campaign.supportersCount || 0}</span>
                </li>
                <li className='flex items-center'>
                  <ShareIcon className='mr-2 text-indigo-600' size={20} />
                  <span>Campaign Progress: {progress}%</span>
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
