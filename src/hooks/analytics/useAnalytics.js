import { useState, useEffect } from "react";
import apiConfig from "@/config/apiConfig";

const DEFAULT_DATA = {
  overview: {
    totalCampaigns: 0,
    totalDonors: 0,
    activeUsers: 0,
    totalAmount: 0,
  },
  demographics: {
    ageDistribution: [],
    genderDistribution: [],
    locationDistribution: [],
    interestDistribution: [],
  },
  donations: {
    monthlyTrends: [],
  },
  campaigns: {
    topPerformers: [],
  },
  donorStats: [],
  campaignStats: [],
};

export const useAnalytics = () => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAnalytics = async () => {
      try {
        setLoading(true);
        const [generalResponse, donorResponse, campaignResponse] =
          await Promise.all([
            apiConfig.get("/analytics"),
            apiConfig.get("/analytics/donors"),
            apiConfig.get("/analytics/campaigns"),
          ]);

        setData({
          ...DEFAULT_DATA,
          ...generalResponse.data.data,
          donorStats: donorResponse.data.data,
          campaignStats: campaignResponse.data.data,
        });
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnalytics();
  }, []);

  return { data, loading, error };
};
