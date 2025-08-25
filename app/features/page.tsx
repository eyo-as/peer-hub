import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { features, highlights } from "@/config/features";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "Discover all the tools and features",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              Everything You Need to{" "}
              <span className="text-accent">Succeed</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover all the tools and features that make Peer-Hub the
              ultimate collaborative learning platform.
            </p>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <Card key={index} className="border-border text-center">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
                Core Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive tools designed for modern collaborative learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-border hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-serif">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div
                            key={benefitIndex}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students and teachers already using Peer-Hub to
              enhance their learning experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Create Account
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
              >
                Browse Questions
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
