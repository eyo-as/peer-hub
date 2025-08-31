"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Mail, Edit } from "lucide-react";
import Link from "next/link";
import { useUserContext } from "@/context/UserContextProvider";
import { jwtDecode } from "jwt-decode";
import { getSingleUser, User } from "@/service/auth";

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { token } = useUserContext();
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    async function fetchUser() {
      try {
        if (token) {
          const userIdd = jwtDecode<User>(token).user_id;
          const user = await getSingleUser(userIdd, token);
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [token]);
  const isOwnProfile = userId === "current-user";

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        <span>Users</span> /{" "}
        <span className="text-foreground">{user?.username}</span>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarFallback className="text-2xl">
                  {user?.first_name[0]} {user?.last_name[0]}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </Button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2 font-serif">
                    {user?.first_name} {user?.last_name}
                  </h1>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge
                      variant={
                        user?.role === "teacher" ? "default" : "secondary"
                      }
                    >
                      {user?.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since 2000</span>
                </div>

                {isOwnProfile && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">48</div>
            <div className="text-sm text-muted-foreground">Questions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">48</div>
            <div className="text-sm text-muted-foreground">Answers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">48</div>
            <div className="text-sm text-muted-foreground">Votes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">48</div>
            <div className="text-sm text-muted-foreground">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">48</div>
            <div className="text-sm text-muted-foreground">Badges</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
