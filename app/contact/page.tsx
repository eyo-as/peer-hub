import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in Touch",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-serif">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">
                    Send us a message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your question or feedback..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6 font-serif">
                    Get in Touch
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Whether you&apos;re a student, teacher, or administrator
                    interested in Peer-Hub, we&apos;re here to help answer your
                    questions and support your educational journey.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Mail className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            Email Support
                          </h3>
                          <p className="text-muted-foreground">
                            support@peer-hub.edu
                          </p>
                          <p className="text-sm text-muted-foreground">
                            We typically respond within 24 hours
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <MessageSquare className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            Community Support
                          </h3>
                          <p className="text-muted-foreground">
                            Ask questions in our platform
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Get help from our community
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Phone className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">
                            Phone Support
                          </h3>
                          <p className="text-muted-foreground">
                            1-800-PEER-HUB
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Mon-Fri, 9AM-5PM EST
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 font-serif">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground">
                        How do I create an account?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Click Sign Up and choose whether you&apos;re a student
                        or teacher.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        Is Peer-Hub free to use?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Yes! Peer-Hub is completely free for all students and
                        teachers.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">
                        How do I report inappropriate content?
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Use the report button on any question or answer, and our
                        moderators will review it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
