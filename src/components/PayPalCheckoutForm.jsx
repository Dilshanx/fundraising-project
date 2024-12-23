import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const PayPalCheckoutForm = ({ campaignId, campaignTitle, defaultAmount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    amount: defaultAmount || "",
    phoneNumber: {
      countryCode: "",
      nationalNumber: "",
    },
    shippingAddress: {
      address: {
        addressLine1: "",
        addressLine2: "",
        adminArea2: "", // City
        adminArea1: "", // State
        postalCode: "",
        countryCode: "",
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child, subChild] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: subChild
            ? { ...prev[parent][child], [subChild]: value }
            : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/paypal/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          campaignId,
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      // Handle successful PayPal order creation
      if (data.result?.links) {
        const approvalLink = data.result.links.find(
          (link) => link.rel === "approve"
        );
        if (approvalLink) {
          window.location.href = approvalLink.href;
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>Donate to {campaignTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Donation Amount */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium'>
              Donation Amount ($)
            </label>
            <Input
              type='number'
              name='amount'
              value={formData.amount}
              onChange={handleInputChange}
              min='1'
              step='0.01'
              required
              className='w-full'
            />
          </div>

          {/* Personal Information */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium'>Full Name</label>
            <Input
              type='text'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className='w-full'
            />
          </div>

          {/* Phone Number */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Country Code</label>
              <Input
                type='text'
                name='phoneNumber.countryCode'
                value={formData.phoneNumber.countryCode}
                onChange={handleInputChange}
                placeholder='+1'
                className='w-full'
              />
            </div>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>Phone Number</label>
              <Input
                type='tel'
                name='phoneNumber.nationalNumber'
                value={formData.phoneNumber.nationalNumber}
                onChange={handleInputChange}
                className='w-full'
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Shipping Address</h3>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Address Line 1
              </label>
              <Input
                type='text'
                name='shippingAddress.address.addressLine1'
                value={formData.shippingAddress.address.addressLine1}
                onChange={handleInputChange}
                required
                className='w-full'
              />
            </div>
            <div className='space-y-2'>
              <label className='block text-sm font-medium'>
                Address Line 2
              </label>
              <Input
                type='text'
                name='shippingAddress.address.addressLine2'
                value={formData.shippingAddress.address.addressLine2}
                onChange={handleInputChange}
                className='w-full'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>City</label>
                <Input
                  type='text'
                  name='shippingAddress.address.adminArea2'
                  value={formData.shippingAddress.address.adminArea2}
                  onChange={handleInputChange}
                  required
                  className='w-full'
                />
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>State</label>
                <Input
                  type='text'
                  name='shippingAddress.address.adminArea1'
                  value={formData.shippingAddress.address.adminArea1}
                  onChange={handleInputChange}
                  required
                  className='w-full'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>Postal Code</label>
                <Input
                  type='text'
                  name='shippingAddress.address.postalCode'
                  value={formData.shippingAddress.address.postalCode}
                  onChange={handleInputChange}
                  required
                  className='w-full'
                />
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium'>
                  Country Code
                </label>
                <Input
                  type='text'
                  name='shippingAddress.address.countryCode'
                  value={formData.shippingAddress.address.countryCode}
                  onChange={handleInputChange}
                  required
                  placeholder='US'
                  className='w-full'
                />
              </div>
            </div>
          </div>

          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>
                Payment initiated successfully!
              </AlertDescription>
            </Alert>
          )}

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Processing...
              </>
            ) : (
              "Proceed to PayPal"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayPalCheckoutForm;
