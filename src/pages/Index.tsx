import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain, Volume2, Code2, Blocks, PlayCircle, InfoIcon } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const features = [
    {
      icon: <Sparkles className="size-5" />,
      title: "Interactive Learning",
      description: "Learn Morse code through engaging, interactive exercises designed for all skill levels."
    },
    {
      icon: <Volume2 className="size-5" />,
      title: "Audio Training",
      description: "Practice with real-time audio feedback and adjustable speed settings."
    },
    {
      icon: <Brain className="size-5" />,
      title: "Progressive System",
      description: "Start with basics and gradually advance to complex messages and faster speeds."
    },
    {
      icon: <Code2 className="size-5" />,
      title: "Instant Conversion",
      description: "Convert text to Morse code and vice versa with real-time translation."
    },
    {
      icon: <Zap className="size-5" />,
      title: "Practice Mode",
      description: "Test your skills with random words and phrases at varying difficulty levels."
    },
    {
      icon: <Blocks className="size-5" />,
      title: "Comprehensive Guide",
      description: "Access detailed information about Morse code history, usage, and techniques."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Morse Magic - Learn and Practice Morse Code</title>
        <meta name="description" content="Master Morse code the modern way with our interactive learning platform. Practice, convert, and learn Morse code with audio feedback and progressive exercises." />
        <meta name="keywords" content="morse code, learn morse code, morse code practice, morse code converter, morse code audio" />
        <link rel="canonical" href="/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://morse-magic.com/" />
        <meta property="og:title" content="Morse Magic - Learn and Practice Morse Code" />
        <meta property="og:description" content="Master Morse code the modern way with our interactive learning platform." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://morse-magic.com/" />
        <meta property="twitter:title" content="Morse Magic - Learn and Practice Morse Code" />
        <meta property="twitter:description" content="Master Morse code the modern way with our interactive learning platform." />
      </Helmet>

      <div className="min-h-[calc(100vh-4rem)] flex flex-col overflow-x-hidden">
        {/* Hero Section */}
        <div className="flex-1 relative isolate">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] overflow-hidden">
            <div className="h-full w-full" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
            }} />
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Morse Code Dots and Dashes Animation */}
            <div className="absolute top-1/4 left-10 hidden lg:block">
              <div className="flex items-center gap-2 opacity-20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="w-6 h-2 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
            <div className="absolute top-1/3 right-10 hidden lg:block">
              <div className="flex items-center gap-2 opacity-20">
                <div className="w-6 h-2 rounded-full bg-primary animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
                <div className="w-6 h-2 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
              </div>
            </div>

            {/* Gradient Blobs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob [animation-delay:2s]" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob [animation-delay:4s]" />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="container mx-auto px-4 py-12 sm:py-24 lg:py-32">
            <div className="text-center space-y-6 sm:space-y-8">
              <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-foreground/20 duration-150">
                <span className="relative">
                  <span className="absolute -left-1 top-1/2 h-[2px] w-3 bg-primary/50 -translate-y-1/2 rounded-full animate-morse-dash" />
                  <span className="absolute -right-1 top-1/2 h-[2px] w-1 bg-primary/50 -translate-y-1/2 rounded-full animate-morse-dot" />
                  Discover the art of Morse code
                </span>
              </div>
              
              <div className="mx-auto max-w-2xl space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 relative">
                  Master Morse Code
                  <br className="hidden sm:block" />
                  The Modern Way
                  <div className="absolute -right-4 top-0 text-primary/20 rotate-12 hidden lg:block">
                    <code className="text-xs tracking-widest">• • • --- • • •</code>
                  </div>
                </h1>
                <p className="text-base sm:text-lg leading-8 text-muted-foreground px-4 sm:px-0 relative">
                  Learn, practice, and master Morse code with our interactive platform. 
                  Perfect for beginners and experienced users alike.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0 relative">
                <Button asChild size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                  <Link to="/convert" className="flex items-center justify-center gap-2">
                    <PlayCircle className="size-5 group-hover:animate-pulse" />
                    Try Morse Code
                    <span className="absolute inset-0 bg-primary/10 group-hover:animate-wave" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto group">
                  <Link to="/about" className="flex items-center justify-center gap-2">
                    <InfoIcon className="size-5 group-hover:rotate-12 transition-transform duration-200" />
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-12 sm:py-24">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold">Everything you need to master Morse code</h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and features to help you learn and practice effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {feature.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 ring-1 ring-inset ring-border group-hover:ring-primary/20 duration-150" />
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-900 text-white">
            <CardContent className="relative z-10 p-12 text-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.1),transparent_30%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_30%)]" />
              <div className="relative space-y-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl rotate-12 flex items-center justify-center shadow-xl">
                  <Sparkles className="size-8 text-white rotate-[-12deg]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                    Ready to Start Your Morse Code Journey?
                  </h2>
                  <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
                    Whether you're a beginner or looking to enhance your skills, our interactive platform makes learning Morse code engaging and effective. Start converting, practicing, and mastering Morse code today.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 text-white">
                    <Link to="/learn" className="flex items-center justify-center">
                      Start Learning
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 hover:bg-zinc-800/50 text-zinc-300 hover:text-white">
                    <Link to="/convert" className="flex items-center justify-center">
                      Try Converter
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Index;

// Add these styles at the end of the file
const style = document.createElement('style');
style.textContent = `
  @keyframes wave {
    0% { transform: translateY(100%); opacity: 0; }
    50% { transform: translateY(0); opacity: 0.5; }
    100% { transform: translateY(-100%); opacity: 0; }
  }
  @keyframes blob {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0, 0) scale(1); }
  }
  @keyframes morse-dot {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  @keyframes morse-dash {
    0%, 100% { opacity: 0.2; width: 12px; }
    50% { opacity: 1; width: 16px; }
  }
  .animate-wave {
    animation: wave 2s infinite;
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animate-morse-dot {
    animation: morse-dot 1.5s infinite;
  }
  .animate-morse-dash {
    animation: morse-dash 1.5s infinite;
  }
`;
document.head.appendChild(style);
