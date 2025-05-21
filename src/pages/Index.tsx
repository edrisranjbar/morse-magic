import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Brain, Volume2, Code2, Blocks } from "lucide-react";
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

      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 relative isolate overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-[0.03]">
            <div className="h-full w-full" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
            }} />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

          <div className="container mx-auto px-4 py-24 sm:py-32">
            <div className="text-center space-y-8">
              <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-border hover:ring-foreground/20 duration-150">
                <span>Discover the art of Morse code</span>
              </div>
              
              <div className="mx-auto max-w-2xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                  Master Morse Code
                  <br />
                  The Modern Way
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">
                  Learn, practice, and master Morse code with our interactive platform. 
                  Perfect for beginners and experienced users alike.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/learn">
                    Start Learning
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Everything you need to master Morse code</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive tools and features to help you learn and practice effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
                <div className="absolute inset-0 ring-1 ring-inset ring-border group-hover:ring-primary/20 duration-150" />
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <Card className="relative overflow-hidden border-0 bg-primary text-primary-foreground">
            <CardContent className="relative z-10 p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of others who are learning Morse code the modern way. 
                Start your journey today with our interactive learning platform.
              </p>
              <Button asChild size="lg" variant="secondary">
                <Link to="/learn">
                  Begin Your Journey
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
            {/* Decorative dots pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` 
              }} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Index;
