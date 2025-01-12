// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { User } from "lucide-react";
// import apiConfig from "@/config/apiConfig";

// const CampaignDonors = ({ campaignId }) => {
//   const [donors, setDonors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     limit: 10,
//     totalPages: 0,
//   });

//   const fetchDonors = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await apiConfig.get(
//         `/campaigns/donors/by-campaign/${campaignId}`, // Updated API path
//         {
//           params: {
//             page,
//             limit: pagination.limit,
//           },
//         }
//       );

//       const { data } = response;

//       if (data.success) {
//         setDonors(data.data);
//         setPagination((prev) => ({
//           ...prev,
//           ...data.pagination,
//         }));
//       } else {
//         throw new Error(data.error || "Failed to fetch donors");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.error || err.message || "Failed to fetch donors"
//       );
//       console.error("Error fetching donors:", err); // Added for debugging
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (campaignId) {
//       // Added check for campaignId
//       fetchDonors();
//     }
//   }, [campaignId]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination((prev) => ({ ...prev, page: newPage }));
//       fetchDonors(newPage);
//     }
//   };

//   if (loading) {
//     return (
//       <Card className='w-full max-w-3xl mx-auto'>
//         <CardContent className='p-6'>
//           <div className='flex items-center justify-center h-40'>
//             <p className='text-gray-500'>Loading donors...</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className='w-full max-w-3xl mx-auto'>
//         <CardContent className='p-6'>
//           <div className='flex items-center justify-center h-40'>
//             <p className='text-red-500'>{error}</p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className='w-full max-w-3xl mx-auto'>
//       <CardHeader>
//         <CardTitle className='flex items-center gap-2'>
//           <User className='h-5 w-5' />
//           Campaign Donors ({pagination.total})
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {donors.length === 0 ? (
//           <p className='text-center text-gray-500 py-8'>
//             No donors found for this campaign.
//           </p>
//         ) : (
//           <>
//             <div className='space-y-4'>
//               {donors.map((donor) => (
//                 <div
//                   key={donor._id}
//                   className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
//                 >
//                   <div>
//                     <h3 className='font-medium'>{donor.name}</h3>
//                     <p className='text-sm text-gray-500'>{donor.email}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {pagination.totalPages > 1 && (
//               <div className='flex items-center justify-between mt-6'>
//                 <Button
//                   variant='outline'
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page === 1}
//                 >
//                   Previous
//                 </Button>
//                 <span className='text-sm text-gray-500'>
//                   Page {pagination.page} of {pagination.totalPages}
//                 </span>
//                 <Button
//                   variant='outline'
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page === pagination.totalPages}
//                 >
//                   Next
//                 </Button>
//               </div>
//             )}
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default CampaignDonors;

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import apiConfig from "@/config/apiConfig";

const CampaignDonors = ({ campaignId }) => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(
        `/campaigns/donors/by-campaign/${campaignId}`
      );

      const { data } = response;

      if (data.success) {
        setDonors(data.data);
      } else {
        throw new Error(data.error || "Failed to fetch donors");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to fetch donors"
      );
      console.error("Error fetching donors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchDonors();
    }
  }, [campaignId]);

  if (loading) {
    return (
      <Card className='w-full max-w-3xl mx-auto'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-center h-40'>
            <p className='text-gray-500'>Loading donors...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className='w-full max-w-3xl mx-auto'>
        <CardContent className='p-6'>
          <div className='flex items-center justify-center h-40'>
            <p className='text-red-500'>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <User className='h-5 w-5' />
          Campaign Donors ({donors.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {donors.length === 0 ? (
          <p className='text-center text-gray-500 py-8'>
            No donors found for this campaign.
          </p>
        ) : (
          <div className='space-y-4'>
            {donors.map((donor) => (
              <div
                key={donor._id}
                className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
              >
                <div>
                  <h3 className='font-medium'>{donor.name}</h3>
                  <p className='text-sm text-gray-500'>{donor.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignDonors;
