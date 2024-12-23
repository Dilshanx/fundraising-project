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
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [detailedDonationTrends, setDetailedDonationTrends] = useState([]);

  // Fetch initial analytics data
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

  // Fetch campaign donors when a campaign is selected
  useEffect(() => {
    const fetchCampaignDonors = async () => {
      if (!selectedCampaign) return;

      try {
        setLoading(true);
        const response = await apiConfig.get(
          `/analytics/campaigns/${selectedCampaign}/donors`
        );
        setData((prev) => ({
          ...prev,
          campaignDonors: response.data.data,
        }));
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDonors();
  }, [selectedCampaign]);

  // Fetch donor campaigns when a donor is selected
  useEffect(() => {
    const fetchDonorCampaigns = async () => {
      if (!selectedDonor) return;

      try {
        setLoading(true);
        const response = await apiConfig.get(
          `/analytics/donors/${selectedDonor}/campaigns`
        );
        setData((prev) => ({
          ...prev,
          donorCampaigns: response.data.data,
        }));
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorCampaigns();
  }, [selectedDonor]);

  // Helper functions
  const getCampaignPerformance = async (campaignId) => {
    try {
      const response = await apiConfig.get(
        `/analytics/campaigns/${campaignId}/performance`
      );
      return response.data.data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      return null;
    }
  };

  const getDonorBehavior = async (donorId) => {
    try {
      const response = await apiConfig.get(
        `/analytics/donors/${donorId}/behavior`
      );
      return response.data.data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      return null;
    }
  };

  const fetchDetailedDonationTrends = async () => {
    try {
      const response = await apiConfig.get("/analytics/donations/trends");
      setDetailedDonationTrends(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      return [];
    }
  };

  // Analysis helper functions
  const analyzeDonorBehavior = (donorId) => {
    const donor = data.donorStats?.find((d) => d._id === donorId);
    if (!donor) return null;

    return {
      totalDonations: donor.totalDonations,
      totalAmount: donor.totalAmount,
      averageDonation: donor.averageDonation,
      campaignPreferences: donor.campaignDonations?.reduce((acc, donation) => {
        const category = donation.campaign?.category;
        if (category) {
          acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
      }, {}),
    };
  };

  return {
    data,
    loading,
    error,
    selectedCampaign,
    selectedDonor,
    detailedDonationTrends,
    setSelectedCampaign,
    setSelectedDonor,
    getCampaignPerformance,
    getDonorBehavior,
    analyzeDonorBehavior,
    fetchDetailedDonationTrends,
  };
};
