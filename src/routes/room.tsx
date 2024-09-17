import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { instantDB } from "@/lib/instant-db";
import { Copy } from "lucide-react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export const Room = () => {
  const { roomId } = useParams();
  const [{ userId }] = useLocalStorage();
  const { toast } = useToast();
  const [estimate, setEstimate] = useState(1);

  if (roomId === undefined) {
    return <Navigate to="/" />;
  }

  const { data: roomData, isLoading } = instantDB.useQuery({
    room: {
      $: {
        where: { id: roomId },
      },
      users: {},
    },
  });

  const room = roomData?.room[0];

  // When room data is loaded, redirect if the room does not exist or no user matches the current user
  if (
    room?.users.every((user) => user.id !== userId) ||
    (!isLoading && !room?.id)
  ) {
    return <Navigate to="/" />;
  }

  const shareUrl = `${window.location.origin}/room/${roomId}/join`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);

    toast({
      title: "Copied!",
      description: "You can now share this invitation link.",
      duration: 3000,
    });
  };

  return (
    <div className="w-3/5 mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Poker Session
      </h1>
      <div className="grid grid-cols-4 grid-rows-1 gap-6">
        <Card className="">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="grid gap-3">
              {room ? (
                room.users.map((user) => <li>{user.name}</li>)
              ) : (
                <>
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                </>
              )}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-3 ">
          <CardHeader>
            <CardTitle>Estimate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-4 gap-4">
              <Button
                className="h-32 text-3xl"
                variant={estimate === 1 ? "default" : "outline"}
                onClick={() => {
                  setEstimate(1);
                }}
              >
                1
              </Button>
              <Button
                className="h-32 text-3xl"
                variant={estimate === 2 ? "default" : "outline"}
                onClick={() => {
                  setEstimate(2);
                }}
              >
                2
              </Button>
              <Button
                className="h-32 text-3xl"
                variant={estimate === 3 ? "default" : "outline"}
                onClick={() => {
                  setEstimate(3);
                }}
              >
                3
              </Button>
              <Button
                className="h-32 text-3xl"
                variant={estimate === 5 ? "default" : "outline"}
                onClick={() => {
                  setEstimate(5);
                }}
              >
                5
              </Button>
              <Button
                className="h-32 text-3xl"
                variant={estimate === 8 ? "default" : "outline"}
                onClick={() => {
                  setEstimate(8);
                }}
              >
                8
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 mt-4">
        Share link
      </h4>
      <div className="flex space-x-2">
        <Input type="text" value={shareUrl} readOnly />
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
