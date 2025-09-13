"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useUserContext } from "@/context/UserContextProvider";
import { getSingleUser, updateUser } from "@/service/auth";

export function EditProfile() {
  const { token, userId } = useUserContext();

  // controlled form states
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classId, setClassId] = useState("");
  const [email, setEmail] = useState("");
  const classOptions = ["9", "10", "11", "12"];

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch user info and fill form
  useEffect(() => {
    async function fetchUser() {
      if (token && userId) {
        try {
          const user = await getSingleUser(userId, token);

          // populate states from user data
          setUsername(user.username || "");
          setFirstName(user.first_name || "");
          setLastName(user.last_name || "");
          setEmail(user.email || "");
          setClassId(String(user.class_id) || "");
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchUser();
  }, [token, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !userId) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const data = await updateUser(
        userId,
        {
          username: username || null,
          first_name: firstName || null,
          last_name: lastName || null,
          class_id: classId ? Number(classId) : null,
          email: email || null,
        },
        token
      );

      if (data.success) {
        setMessage({
          type: "success",
          text: data.message || "Profile updated!",
        });
      } else {
        setMessage({ type: "error", text: data.message || "Update failed" });
      }
    } catch (err) {
      console.log(err);
      setMessage({ type: "error", text: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your profile info</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic Info</CardTitle>
        </CardHeader>
        <div className="space-y-2 p-4">
          <Label htmlFor="classId">Class</Label>
          <Select
            onValueChange={(val) => setClassId(val)}
            value={classId}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((id) => (
                <SelectItem key={id} value={id}>
                  {id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
}
