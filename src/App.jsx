import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Auth & User Components
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import VerifyEmail from "./components/VerifyEmail";
import VerificationSuccess from "./components/VerificationSuccess";
import UserProfilePage from "./components/UserProfilePage";
import ResetPasswordPage from "./components/PasswordResetConfirmationPage";

// Campaign Management Components
import CreateCampaignPage from "./components/CreateCampaignPage";
import UpdateCampaignPage from "./components/UpdateCampaignPage";
import CampaignDetailsPage from "./components/CampaignDetailsPage";
import ExploreCampaignsPage from "./components/ExploreCampaignsPage";

// Donation Components
import DonatePage from "./components/DonatePage";
import CampaignPayment from "./components/CampaignPayment";
import DonorsPage from "./components/DonorsPage";
import DonationSuccess from "./components/DonationSuccess";

// Dashboard & Analytics Components
import Home from "./components/Home";
import FundraisingDashboardPage from "./components/FundraisingDashboardPage";
import AnalyticsAndReportingPage from "./components/AnalyticsAndReportingPage";
import EngagementAndCommunicationPage from "./components/EngagementAndCommunicationPage";
import AdminDashboard from "./components/AdminDashboard";

// Support & Information Components
import HelpSupportPage from "./components/HelpSupportPage";
import SecurityAndCompliancePage from "./components/SecurityAndCompliancePage";
import FAQPage from "./components/footer/FaqPage";

// Legal Components
import DataProtection from "./components/footer/DataProtectionPage";
import TermsOfService from "./components/footer/TermsOfServicePage";
import PrivacyPolicy from "./components/footer/PrivacyPolicyPage";

// Utility Components
import AppToaster from "./components/AppToaster";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home & Default Route */}
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />

        {/* Authentication Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/verification-success' element={<VerificationSuccess />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />

        {/* Campaign Management Routes */}
        <Route path='/create-campaign' element={<CreateCampaignPage />} />
        <Route path='/campaigns/:id/edit' element={<UpdateCampaignPage />} />
        <Route path='/campaign-details/:id' element={<CampaignDetailsPage />} />
        <Route path='/explore-campaigns' element={<ExploreCampaignsPage />} />

        {/* Donation Routes */}
        <Route path='/donate' element={<DonatePage />} />
        <Route path='/campaigns/:campaignId' element={<CampaignPayment />} />
        <Route path='/donors' element={<DonorsPage />} />
        <Route path='/donation/success' element={<DonationSuccess />} />

        {/* Dashboard & Analytics Routes */}
        <Route
          path='/fundraising-dashboard'
          element={<FundraisingDashboardPage />}
        />
        <Route path='/admin' element={<AdminDashboard />} />

        <Route
          path='/analytics-and-reporting'
          element={<AnalyticsAndReportingPage />}
        />
        <Route
          path='/engagement-and-communication'
          element={<EngagementAndCommunicationPage />}
        />

        {/* User Profile & Settings Routes */}
        <Route path='/user-profile' element={<UserProfilePage />} />

        <Route
          path='/security-and-compliance'
          element={<SecurityAndCompliancePage />}
        />

        {/* Support & Information Routes */}
        <Route path='/help-support' element={<HelpSupportPage />} />
        <Route path='/faq' element={<FAQPage />} />

        {/* Legal Routes */}
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/data-protection' element={<DataProtection />} />
      </Routes>
      <AppToaster />
    </Router>
  );
}

export default App;
