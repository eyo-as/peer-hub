import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/config/hero-section";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto max-w-6xl relative">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Empowering Student Success
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 font-serif leading-tight">
            Learn Together,
            <br />
            <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            The collaborative platform where high school students and teachers
            connect to share knowledge, ask questions, and build a supportive
            learning community that drives academic excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/auth/signup">Get Started</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 border-2 hover:bg-accent/5 bg-transparent"
            >
              Browse Questions
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">
                Active Students
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">
                Expert Teachers
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border"></div>
            <div>
              <div className="text-3xl font-bold text-foreground">25K+</div>
              <div className="text-sm text-muted-foreground">
                Questions Answered
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features?.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 group bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 font-serif">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
