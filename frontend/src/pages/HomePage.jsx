import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  RocketIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  StarIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* NAVBAR */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
          >
            <div className="size-12 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-800 flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-7 text-purple-300" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-2xl bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-wider">
                HireFlow
              </span>
              <span className="text-xs text-gray-400 font-medium -mt-1">Code • Connect • Conquer</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <SignInButton mode="modal">
            <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 rounded-2xl text-gray-200 font-bold text-sm shadow-lg hover:shadow-purple-900/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden">
              <span className="relative z-10">Launch App</span>
              <ArrowRightIcon className="size-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-purple-500/20">
              <ZapIcon className="size-4 text-yellow-600" />
              <span className="text-sm font-semibold text-gray-300">Real-time Collaboration</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-800 text-xs text-gray-300">Live</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-tight">
              <span className="block bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Code Together
              </span>
              <span className="block text-gray-200 mt-2">
                Interview Better
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
              Experience the future of technical interviews with <span className="text-purple-400 font-bold">real-time video</span>, 
              <span className="text-indigo-400 font-bold"> collaborative coding</span>, and 
              <span className="text-purple-500 font-bold"> instant execution</span>. Built for developers, by developers.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: CheckIcon, text: '4K Video Quality', color: 'from-green-500 to-emerald-500' },
                { icon: CheckIcon, text: 'VSCode Editor', color: 'from-blue-500 to-cyan-500' },
                { icon: CheckIcon, text: '50+ Languages', color: 'from-purple-500 to-pink-500' },
              ].map((feature, idx) => (
                <div key={idx} className={`glass px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:scale-105 transition-all duration-300`}>
                  <feature.icon className={`size-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                  <span className="text-sm font-medium text-white">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <SignInButton mode="modal">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 rounded-2xl text-gray-200 font-bold text-lg shadow-lg hover:shadow-purple-900/30 transition-all duration-300 hover:scale-105 flex items-center gap-3 overflow-hidden">
                  <RocketIcon className="size-6 relative z-10" />
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRightIcon className="size-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>

              <button className="group px-10 py-5 glass-strong rounded-2xl text-gray-300 font-bold text-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <VideoIcon className="size-6" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: '50K+', label: 'Active Users', icon: UsersIcon },
                { value: '1M+', label: 'Interviews', icon: TrendingUpIcon },
                { value: '99.9%', label: 'Uptime', icon: ShieldCheckIcon },
              ].map((stat, idx) => (
                <div key={idx} className="glass-strong rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 border border-purple-500/10 card-3d">
                  <stat.icon className="size-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE/MOCKUP */}
          <div className="relative animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-purple-500/20 hover:border-purple-500/30 transition-all duration-500 card-3d">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"></div>
              <img
                src="/hero.png"
                alt="HireFlow Platform"
                className="w-full h-auto relative z-10"
              />
              {/* Floating badges */}
              <div className="absolute top-6 right-6 glass-strong px-4 py-2 rounded-full border border-green-700/30 flex items-center gap-2 animate-float">
                <div className="size-2 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-gray-300">Live Session</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-purple-500/20 mb-6">
            <StarIcon className="size-4 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-300">Powerful Features</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black mb-6">
            <span className="text-gray-200">Everything You Need to </span>
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Ace Interviews</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional tools and features designed to make your coding interviews seamless, productive, and enjoyable
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: VideoIcon,
              title: 'HD Video Calling',
              description: 'Crystal clear 4K video and audio for seamless face-to-face communication during interviews',
              gradient: 'from-pink-500 to-rose-500',
              delay: '0s'
            },
            {
              icon: Code2Icon,
              title: 'Live Code Editor',
              description: 'VSCode-powered editor with real-time collaboration, syntax highlighting, and 50+ languages',
              gradient: 'from-blue-500 to-cyan-500',
              delay: '0.1s'
            },
            {
              icon: UsersIcon,
              title: 'Real-time Sync',
              description: 'Share screen, discuss solutions, and collaborate in real-time with instant updates',
              gradient: 'from-purple-500 to-indigo-500',
              delay: '0.2s'
            },
            {
              icon: ZapIcon,
              title: 'Instant Execution',
              description: 'Run code instantly in a secure sandbox environment with immediate results and feedback',
              gradient: 'from-yellow-500 to-orange-500',
              delay: '0.3s'
            },
            {
              icon: ShieldCheckIcon,
              title: 'Enterprise Security',
              description: 'Bank-level encryption and security protocols to keep your interviews private and secure',
              gradient: 'from-green-500 to-emerald-500',
              delay: '0.4s'
            },
            {
              icon: TrendingUpIcon,
              title: 'Analytics Dashboard',
              description: 'Track performance, view session history, and get insights to improve your interview skills',
              gradient: 'from-violet-500 to-purple-500',
              delay: '0.5s'
            },
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="gradient-border card-3d hover:scale-105 transition-all duration-500 animate-slide-up"
              style={{animationDelay: feature.delay}}
            >
              <div className="gradient-border-inner h-full">
                <div className={`size-16 bg-gradient-to-br ${feature.gradient} opacity-80 rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                  <feature.icon className="size-8 text-gray-200" />
                </div>
                <h3 className="text-2xl font-bold text-gray-200 mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="glass-strong rounded-3xl p-12 border border-purple-500/20 text-center">
          <p className="text-3xl font-bold text-gray-200 mb-8">
            "HireFlow transformed our interview process. <span className="text-purple-500">Absolutely game-changing!</span>"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="size-12 rounded-full bg-gradient-to-br from-purple-700 to-indigo-700"></div>
            <div className="text-left">
              <p className="text-gray-200 font-bold">Tech Leaders Worldwide</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="relative max-w-7xl mx-auto px-4 py-20 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-5xl font-black text-gray-200 mb-6">Ready to Transform Your Interviews?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers and companies already using HireFlow
            </p>
            <SignInButton mode="modal">
              <button className="px-12 py-6 bg-gray-900 text-purple-300 rounded-2xl font-black text-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
                <RocketIcon className="size-7" />
                Get Started for Free
                <ArrowRightIcon className="size-6" />
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
