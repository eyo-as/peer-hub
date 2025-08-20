import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { values } from "@/config/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our platform is designed to help students achieve their highest potential.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              About <span className="text-accent">Peer-Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Empowering high school students and teachers through collaborative
              learning and knowledge sharing.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create a collaborative educational platform where high school
                students and teachers can connect, share knowledge, and build a
                supportive learning community that drives academic success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4 font-serif">
                    For Students
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Get instant help with homework, connect with peers, and
                    access a wealth of knowledge from your classmates and
                    teachers. Build your reputation by helping others and
                    contributing to the community.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4 font-serif">
                    For Teachers
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Extend your classroom reach, provide guidance to students
                    beyond school hours, and foster a collaborative learning
                    environment that encourages peer-to-peer education and
                    academic growth.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Values Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values?.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="border-border hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-serif">
              Join Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to be part of a collaborative learning experience?
            </p>
            <Button size="lg" className="text-lg px-8">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
