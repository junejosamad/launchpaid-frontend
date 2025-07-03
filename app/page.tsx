"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  ChevronRight,
  BarChart3,
  Award,
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  UserIcon,
} from "lucide-react"
import { UserTypeToggle } from "@/components/user-type-toggle"

export default function LandingPage() {
  const [selectedUserType, setSelectedUserType] = useState<"creator" | "agencyBrand">("creator")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/logo.png" alt="LaunchPAID Logo" width={180} height={40} className="h-10 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-purple-400 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-400 transition-colors">
            How It Works
          </Link>
          <Link href="#key-benefits" className="text-sm font-medium hover:text-purple-400 transition-colors">
            Benefits
          </Link>
          <Link href="/auth">
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              Log In
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign Up</Button>
          </Link>
        </nav>
        <Button variant="ghost" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-800 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Built to Empower Creators. <br />
              <span className="text-purple-500">Trusted by Brands.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The ultimate CRM platform for TikTok creators and brands to manage campaigns, track performance, and
              maximize revenue.
            </p>
            <div className="flex justify-center mb-8">
              <UserTypeToggle selectedType={selectedUserType} onTypeChange={setSelectedUserType} />
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                <Image
                  src={
                    selectedUserType === "creator"
                      ? "/placeholder.svg?height=600&width=1200&query=creator+dashboard+mockup+earnings+campaigns+gmv+progress"
                      : "/placeholder.svg?height=600&width=1200&query=agency+brand+dashboard+mockup+analytics+creator+management+roi"
                  }
                  alt={selectedUserType === "creator" ? "Creator Dashboard Preview" : "Agency/Brand Dashboard Preview"}
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-purple-400">
                      {selectedUserType === "creator" ? "Creator" : "Agency/Brand"} Dashboard Preview
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {selectedUserType === "creator"
                      ? "Your Hub for Campaign Success & Earnings"
                      : "Manage Campaigns & Drive Growth with Powerful Analytics"}
                  </h3>
                </div>
              </div>
            </div>

            {/* Animated elements */}
            <div className="absolute -top-4 -right-4 h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <span className="font-bold text-lg">+25%</span>
            </div>
            <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              LaunchPAID streamlines the creator economy with powerful tools for every stakeholder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Creators */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="h-14 w-14 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Creators</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Earn more with GMV-based rewards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Track performance across all campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unlock bonuses and achievement badges</span>
                </li>
              </ul>
              <Button variant="ghost" className="mt-6 text-purple-400 hover:text-purple-300 p-0 h-auto">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* For Brands */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="h-14 w-14 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Brands</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Launch campaigns with top creators</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reward results with performance-based payouts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Scale GMV with data-driven insights</span>
                </li>
              </ul>
              <Button variant="ghost" className="mt-6 text-purple-400 hover:text-purple-300 p-0 h-auto">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {/* For Agencies */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="h-14 w-14 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">For Agencies</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Centralized dashboard for all clients</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Team-wide controls and permissions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive analytics and reporting</span>
                </li>
              </ul>
              <Button variant="ghost" className="mt-6 text-purple-400 hover:text-purple-300 p-0 h-auto">
                Learn more <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature Highlights</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Powerful tools designed specifically for the TikTok creator economy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Creator Progress Badges</h3>
              <p className="text-gray-400">
                Gamified achievements that unlock as creators hit GMV milestones and complete campaigns.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">GMV-Based Rewards</h3>
              <p className="text-gray-400">
                Automatically calculate and distribute bonuses based on actual sales performance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Deliverable Tracker</h3>
              <p className="text-gray-400">
                Keep creators on schedule with clear timelines and automated reminders for content.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Leaderboard Bonuses</h3>
              <p className="text-gray-400">
                Foster healthy competition with real-time rankings and performance-based incentives.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">SMS & Discord Integration</h3>
              <p className="text-gray-400">
                Automated notifications across multiple channels to keep everyone in the loop.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">Advanced Analytics</h3>
              <p className="text-gray-400">
                Comprehensive data visualization for campaign performance and creator metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See LaunchPAID in Action for {selectedUserType === "creator" ? "Creators" : "Agencies & Brands"}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {selectedUserType === "creator"
                  ? "Discover how LaunchPAID empowers you to manage campaigns, track earnings, and grow your influence."
                  : "Explore how LaunchPAID provides the tools to manage creators, analyze campaign performance, and maximize ROI."}
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-gray-900">
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 ml-1"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <Image
                  src={
                    selectedUserType === "creator"
                      ? "/placeholder.svg?height=600&width=1200&query=creator+platform+demo+video"
                      : "/placeholder.svg?height=600&width=1200&query=agency+brand+platform+demo+video"
                  }
                  alt={`${selectedUserType === "creator" ? "Creator" : "Agency/Brand"} Dashboard Demo`}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Creators & Brands</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">See what our users are saying about LaunchPAID</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mr-4">
                  <span className="font-bold text-purple-500">JT</span>
                </div>
                <div>
                  <h4 className="font-bold">Jessica Thompson</h4>
                  <p className="text-gray-400 text-sm">TikTok Creator, 1.2M Followers</p>
                </div>
              </div>
              <p className="text-gray-300">
                "LaunchPAID has completely transformed how I manage brand deals. The GMV tracking and bonus system has
                increased my earnings by 35% in just three months!"
              </p>
              <div className="flex mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mr-4">
                  <span className="font-bold text-purple-500">MR</span>
                </div>
                <div>
                  <h4 className="font-bold">Michael Rodriguez</h4>
                  <p className="text-gray-400 text-sm">Marketing Director, FashionBrand</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As a brand, we've been able to scale our TikTok Shop campaigns efficiently with LaunchPAID. The
                analytics and creator management tools have made our workflow 10x faster."
              </p>
              <div className="flex mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#A259FF"
                  className="h-5 w-5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Brand Logos */}
          <div className="mt-16">
            <p className="text-center text-sm text-gray-500 mb-8">TRUSTED BY LEADING BRANDS</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-24 bg-gray-800/50 rounded flex items-center justify-center">
                  <div className="text-gray-500 font-bold">LOGO</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="key-benefits" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Your Full Potential with LaunchPAID</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Whether you&apos;re a creator, agency, or brand, LaunchPAID provides the tools you need to succeed in the
              TikTok Shop ecosystem. And the best part? It&apos;s completely free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Benefits for Creators */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
                  <UserIcon className="h-7 w-7 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold">For Creators</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Maximize Earnings:</strong> Track GMV, unlock performance-based bonuses, and get paid
                    seamlessly.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Streamline Workflow:</strong> Manage all your brand collaborations and deliverables in one
                    place.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Grow Your Profile:</strong> Gain visibility, earn achievement badges, and connect with top
                    brands.
                  </span>
                </li>
              </ul>
            </div>

            {/* Benefits for Agencies/Brands */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center mb-6">
                <div className="h-14 w-14 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4">
                  <Users className="h-7 w-7 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold">For Agencies & Brands</h3>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Discover & Manage Talent:</strong> Find the perfect creators and manage your roster
                    efficiently.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Drive Campaign ROI:</strong> Track performance in real-time, optimize campaigns, and measure
                    GMV impact.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Scale Your Operations:</strong> Centralized dashboard for all campaigns and clients, with
                    robust analytics.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/40 to-purple-600/40 rounded-2xl p-8 md:p-12 border border-purple-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(162,89,255,0.15),transparent_70%)]"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your TikTok Campaigns?</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Join thousands of creators and brands already using LaunchPAID to manage, track, and scale their
                  TikTok Shop campaigns.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8"
                  >
                    Schedule a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image src="/logo.png" alt="LaunchPAID Logo" width={150} height={40} className="h-8 w-auto mb-4" />
              <p className="text-gray-400 text-sm mb-4">The ultimate CRM platform for TikTok creators and brands.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} LaunchPAID. All rights reserved.</p>
            <p className="text-xs text-gray-600 mt-2 md:mt-0">Powered by Novanex</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-purple-400 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
