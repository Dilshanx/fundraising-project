import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Download,
  ArrowLeft,
  Share,
  Copy,
  Twitter,
  Facebook,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import apiConfig from "@/config/apiConfig";
import toast from "react-hot-toast";

// Utility functions for formatting
const formatAmount = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [donation, setDonation] = useState(null);
  const sessionId = searchParams.get("session_id");
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const verifyDonation = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(
          `/donate/success?session_id=${sessionId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setDonation(response.data.data);

        // Show share modal after successful verification
        setTimeout(() => setShowShareModal(true), 1500);
      } catch (error) {
        console.error("Error verifying donation:", error);
        toast.error("Failed to verify donation. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyDonation();
    }
  }, [sessionId]);

  const handleDownloadReceipt = async () => {
    try {
      setReceiptLoading(true);
      const response = await apiConfig.get(
        `/donate/receipt?session_id=${sessionId}`,
        {
          responseType: "blob",
          headers: {
            Accept: "application/pdf",
          },
          withCredentials: true,
        }
      );

      // Check if the response is actually a PDF
      if (response.headers["content-type"] === "application/pdf") {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `donation-receipt-${donation.receiptNumber}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Receipt downloaded successfully!");
      } else {
        throw new Error("Invalid receipt format received");
      }
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast.error("Failed to download receipt. Please try again.");
    } finally {
      setReceiptLoading(false);
    }
  };

  const handleShare = async (method) => {
    if (!donation) return;

    const shareUrl = `${window.location.origin}/campaigns/${donation.campaignId}`;
    const shareText = `I just supported ${
      donation.campaignName
    } with a donation of ${formatAmount(
      donation.amount
    )}. Join me in making a difference!`;

    switch (method) {
      case "native":
        if (navigator.share) {
          try {
            await navigator.share({
              title: "I Just Donated!",
              text: shareText,
              url: shareUrl,
            });
            toast.success("Successfully shared!");
          } catch (error) {
            if (error.name !== "AbortError") {
              console.error("Error sharing:", error);
              toast.error("Unable to share at this time");
            }
          }
        } else {
          setShowShareModal(true);
        }
        break;

      case "copy":
        try {
          await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          toast.success("Link copied to clipboard!");
          setShowShareModal(false);
        } catch (error) {
          console.error("Error copying to clipboard:", error);
          toast.error("Failed to copy to clipboard");
        }
        break;

      case "twitter":
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank");
        setShowShareModal(false);
        break;

      case "facebook":
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(shareText)}`;
        window.open(facebookUrl, "_blank");
        setShowShareModal(false);
        break;
    }
  };

  const ShareModal = () => (
    <AlertDialog open={showShareModal} onOpenChange={setShowShareModal}>
      <AlertDialogContent
        className='z-50  overflow-y-auto bg-white rounded-xl shadow-2xl
                 border border-gray-100 ring-1 ring-black ring-opacity-5'
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Share Your Impact</AlertDialogTitle>
          <AlertDialogDescription>
            Choose how you'd like to share your donation:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='grid gap-4 py-4'>
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2'
            onClick={() => handleShare("copy")}
          >
            <Copy size={18} />
            Copy Link
          </Button>
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2 bg-[#1DA1F2] text-white hover:bg-[#1a8cd8]'
            onClick={() => handleShare("twitter")}
          >
            <Twitter size={18} />
            Share on Twitter
          </Button>
          <Button
            variant='outline'
            className='w-full flex items-center justify-center gap-2 bg-[#4267B2] text-white hover:bg-[#365899]'
            onClick={() => handleShare("facebook")}
          >
            <Facebook size={18} />
            Share on Facebook
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-lg'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <CheckCircle2 className='text-green-500' size={24} />
            Thank You for Your Donation!
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className='space-y-4 animate-pulse'>
              <div className='h-4 bg-gray-200 rounded w-3/4'></div>
              <div className='h-4 bg-gray-200 rounded w-1/2'></div>
            </div>
          ) : donation ? (
            <div className='space-y-6'>
              <div className='bg-gray-50 p-6 rounded-lg space-y-4'>
                <h3 className='font-medium text-lg mb-4'>Donation Details</h3>
                <div className='grid grid-cols-2 gap-y-4'>
                  <p className='text-gray-600'>Amount:</p>
                  <p className='font-medium'>{formatAmount(donation.amount)}</p>

                  <p className='text-gray-600'>Receipt Number:</p>
                  <p className='font-medium'>{donation.receiptNumber}</p>

                  <p className='text-gray-600'>Date:</p>
                  <p className='font-medium'>
                    {formatDate(donation.timestamp)}
                  </p>

                  <p className='text-gray-600'>Campaign:</p>
                  <p className='font-medium'>{donation.campaignName}</p>

                  <p className='text-gray-600'>Category:</p>
                  <p className='font-medium'>{donation.campaignCategory}</p>

                  <p className='text-gray-600'>Payment Status:</p>
                  <p className='font-medium capitalize'>
                    {donation.paymentStatus}
                  </p>

                  <p className='text-gray-600'>Tax Deductible:</p>
                  <p className='font-medium'>
                    {donation.taxDeductible ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <div className='space-y-4'>
                <Button
                  onClick={handleDownloadReceipt}
                  disabled={receiptLoading}
                  className='w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700'
                >
                  {receiptLoading ? (
                    "Generating Receipt..."
                  ) : (
                    <>
                      <Download size={18} />
                      Download Receipt
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => handleShare("native")}
                  className='w-full flex items-center justify-center gap-2'
                  variant='outline'
                >
                  <Share size={18} />
                  Share Your Impact
                </Button>

                <div className='flex gap-4'>
                  <Button
                    onClick={() => navigate("/explore-campaigns")}
                    variant='outline'
                    className='flex-1'
                  >
                    View More Campaigns
                  </Button>
                  <Button
                    onClick={() => navigate("/")}
                    variant='outline'
                    className='flex-1 flex items-center justify-center gap-2'
                  >
                    <ArrowLeft size={18} />
                    Return Home
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <p className='text-red-600'>
                Unable to verify donation details. Please contact support if you
                believe this is an error.
              </p>
              <Button onClick={() => navigate("/")} className='w-full'>
                Return Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <ShareModal />
    </div>
  );
};

export default DonationSuccess;
