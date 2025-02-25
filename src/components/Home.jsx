import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RocketIcon,
  HeartIcon,
  GlobeIcon,
  ArrowRightIcon,
  UsersIcon,
  TrendingUpIcon,
  ShieldIcon,
  HelpCircleIcon,
  SunIcon,
  MoonIcon,
  BarChartIcon,
  MessageCircleIcon,
  UserIcon,
  ListIcon,
  DollarSignIcon,
  School2Icon,
  HospitalIcon,
  LeafIcon,
  BarChart3,
  Shield,
  MessageCircle,
  BookOpen,
  GanttChart,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "@/components/Footer";
import axios from "axios";

// Theme Management Hook
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

// Animation Configurations for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
};

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);

  const platformFeatures = [
    {
      icon: GanttChart,
      title: "Campaign Management",
      description:
        "User-friendly campaign creation wizard with customizable templates, goal setting, and real-time progress tracking dashboard.",
      stats: "Streamlined campaign setup",
    },
    {
      icon: Receipt,
      title: "Secure Donation Processing",
      description:
        "Multiple payment gateways integration with automated receipts and real-time donation tracking across various payment methods.",
      stats: "Multi-payment support",
    },
    {
      icon: MessageCircle,
      title: "Engagement Tools",
      description:
        "Automated thank-you notes, campaign updates, and messaging system to maintain strong donor relationships.",
      stats: "Enhanced supporter connection",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive analytics dashboard showing donation trends, donor demographics, and campaign performance metrics.",
      stats: "Data-driven insights",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "End-to-end encryption, fraud prevention mechanisms, and compliance with data protection regulations.",
      stats: "Enterprise-grade security",
    },
    {
      icon: BookOpen,
      title: "User Support",
      description:
        "Comprehensive help center with live chat support and ticketing system for immediate assistance.",
      stats: "24/7 support access",
    },
  ];
  // Fetch Featured Campaigns from API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/api/campaigns");
        setFeaturedCampaigns(response.data.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const categoryIcons = {
    Education: School2Icon,
    Healthcare: HospitalIcon,
    "Community Development": UsersIcon,
    Environmental: LeafIcon,
    "Medical Research": GlobeIcon,
    "Humanitarian Aid": HeartIcon,
  };

  const quickAccessLinks = [
    {
      icon: RocketIcon,
      title: "Create Campaign",
      description: "Launch your fundraising initiative",
      link: "/create-campaign",
    },
    {
      icon: BarChartIcon,
      title: "Analytics",
      description: "Track your campaign performance",
      link: "/analytics-and-reporting",
    },
    {
      icon: MessageCircleIcon,
      title: "Engagement",
      description: "Communicate with supporters",
      link: "/engagement-and-communication",
    },
    {
      icon: UserIcon,
      title: "Profile",
      description: "Manage your account",
      link: "/user-profile",
    },
    {
      icon: ListIcon,
      title: "Campaign Details",
      description: "View specific campaign information",
      link: "/explore-campaigns",
    },
    {
      icon: DollarSignIcon,
      title: "Fundraising Dashboard",
      description: "Monitor your fundraising progress",
      link: "/fundraising-dashboard",
    },
    {
      icon: GlobeIcon,
      title: "Explore Campaigns",
      description: "Discover ongoing fundraising efforts",
      link: "/explore-campaigns",
    },
    {
      icon: ShieldIcon,
      title: "Security",
      description: "Ensure data protection",
      link: "/security-and-compliance",
    },
    {
      icon: HelpCircleIcon,
      title: "Support",
      description: "Get help and resources",
      link: "/help-support",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900'
    >
      <button
        onClick={toggleTheme}
        aria-label='Toggle Theme'
        className='fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all'
      >
        {theme === "light" ? <MoonIcon size={24} /> : <SunIcon size={24} />}
      </button>

      <Navbar />

      <div className='pt-14'>
        <div className='container mx-auto px-5 py-16 text-center'>
          <h1 className='text-5xl font-bold mb-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
            Empowering Change, Transforming Lives
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
            A revolutionary platform connecting passionate creators with global
            supporters, enabling impactful fundraising through technology and
            transparency
          </p>

          <div className='flex justify-center space-x-4'>
            <Link to='/create-campaign'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600'
              >
                Start Your Campaign
                <ArrowRightIcon className='ml-2' size={20} />
              </Button>
            </Link>
            <Link to='/explore-campaigns'>
              <Button
                variant='outline'
                size='lg'
                className='border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20'
              >
                Explore Causes
              </Button>
            </Link>
          </div>
        </div>

        <div className='container mx-auto py-16'>
          <div className='flex justify-center mb-8'>
            <div className='bg-white dark:bg-white/90 rounded-full p-1 shadow-md flex'>
              <Button
                variant={activeTab === "campaigns" ? "default" : "ghost"}
                onClick={() => setActiveTab("campaigns")}
                className='rounded-full'
              >
                Featured Campaigns
              </Button>
              <Button
                variant={activeTab === "features" ? "default" : "ghost"}
                onClick={() => setActiveTab("features")}
                className='rounded-full'
              >
                Platform Features
              </Button>
            </div>
          </div>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='grid md:grid-cols-3 gap-6'
          >
            {activeTab === "campaigns"
              ? featuredCampaigns.map((campaign, index) => {
                  const Icon = categoryIcons[campaign.category] || HeartIcon;
                  return (
                    <motion.div key={index} variants={itemVariants}>
                      <Link to={`/campaigns/${campaign._id}`}>
                        <Card className='hover:shadow-xl transition-all group bg-white dark:bg-gray-800 border dark:border-gray-700'>
                          <CardHeader className='flex flex-col items-center space-y-4'>
                            <div className='flex items-center w-full'>
                              <Icon
                                className='text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform'
                                size={36}
                              />
                              <CardTitle className='ml-4 dark:text-white'>
                                {campaign.title}
                              </CardTitle>
                            </div>
                            {campaign.imageUrl && (
                              <div className='w-full h-48 rounded-lg overflow-hidden'>
                                <img
                                  src={campaign.imageUrl}
                                  alt={campaign.title}
                                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                                />
                              </div>
                            )}
                          </CardHeader>
                          <CardContent>
                            <p className='text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>
                              {campaign.description}
                            </p>
                            <div className='flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400'>
                              <span>
                                Goal: $
                                {campaign.fundraisingGoal.toLocaleString()}
                              </span>
                              <span>
                                Raised: $
                                {(campaign.currentAmount || 0).toLocaleString()}
                              </span>
                            </div>
                            <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2'>
                              <div
                                className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 h-2.5 rounded-full'
                                style={{
                                  width: `${Math.min(
                                    ((campaign.currentAmount || 0) /
                                      campaign.fundraisingGoal) *
                                      100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400'>
                              <span>
                                {Math.round(
                                  ((campaign.currentAmount || 0) /
                                    campaign.fundraisingGoal) *
                                    100
                                )}
                                % Funded
                              </span>
                              <span>{campaign.category}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })
              : platformFeatures.map((feature, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className='h-full hover:shadow-xl transition-all group bg-white dark:bg-gray-800 border dark:border-gray-700'>
                      <CardHeader className='flex flex-col items-center space-y-4'>
                        <div className='w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center'>
                          <feature.icon
                            className='text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform'
                            size={32}
                          />
                        </div>
                        <CardTitle className='text-center dark:text-white'>
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className='text-center'>
                        <p className='text-gray-600 dark:text-gray-300 mb-4'>
                          {feature.description}
                        </p>
                        <div className='mt-4 py-2 px-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full inline-block'>
                          <span className='text-indigo-600 dark:text-indigo-400 font-semibold'>
                            {feature.stats}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
          </motion.div>
        </div>

        <div className='container mx-auto py-16 text-center'>
          <h2 className='text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
            Quick Access
          </h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {quickAccessLinks.map((link, index) => (
              <Link to={link.link} key={index}>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group'>
                  <link.icon
                    className='mx-auto mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform'
                    size={48}
                  />
                  <h3 className='text-xl font-semibold mb-3 dark:text-white'>
                    {link.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className='container mx-auto py-16 text-center'>
          <h2 className='text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
            Why Choose Our Fundraising Platform?
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
              <ShieldIcon
                className='mx-auto mb-4 text-indigo-600 dark:text-indigo-400'
                size={48}
              />
              <h3 className='text-xl font-semibold mb-3 dark:text-white'>
                Secure & Transparent
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                End-to-end encryption and real-time donation tracking ensure
                complete transparency.
              </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
              <UsersIcon
                className='mx-auto mb-4 text-indigo-600 dark:text-indigo-400'
                size={48}
              />
              <h3 className='text-xl font-semibold mb-3 dark:text-white'>
                Community-Driven
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Connect with supporters, share updates, and build meaningful
                relationships.
              </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
              <TrendingUpIcon
                className='mx-auto mb-4 text-indigo-600 dark:text-indigo-400'
                size={48}
              />
              <h3 className='text-xl font-semibold mb-3 dark:text-white'>
                AI-Powered Insights
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Advanced analytics help optimize your fundraising strategies and
                reach.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Home;
