import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import "@/globals.css";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { instantDB } from "@/lib/instant-db";
import { createUserTx, linkUserToRoomTx } from "@/lib/user";
import { id } from "@instantdb/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const JoinRoom = () => {
  const [{ userId }, { setUserId }] = useLocalStorage();
  const [newRoomFormState, setNewRoomFormState] = useState({
    roomName: "",
    userName: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && roomId) {
      const linkUser = async () => {
        await instantDB.transact([
          linkUserToRoomTx({ userId: userId, roomId }),
        ]);

        navigate(`/room/${roomId}`);
      };

      linkUser();
    }
  }, [roomId, userId]);

  if (roomId === undefined) {
    toast({
      title: "No room id",
    });

    navigate("/");

    return;
  }

  const handleCreateUser = async ({ userName }: { userName: string }) => {
    const newUserId = id();

    try {
      await instantDB.transact([
        createUserTx({ id: newUserId, name: userName }),
        linkUserToRoomTx({ userId: newUserId, roomId }),
      ]);

      setUserId(newUserId);

      navigate(`/room/${roomId}`);
    } catch (e) {
      console.log("Room could not be created", e);
    }
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-16 mt-48 p-ggg">
        Poker Planning
      </h1>
      <Card className="w-1/4 mx-auto">
        <CardHeader>
          <CardTitle>Start a new poker session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={newRoomFormState.userName}
              onChange={(e) => {
                setNewRoomFormState((prevState) => ({
                  ...prevState,
                  userName: e.target.value,
                }));
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              handleCreateUser(newRoomFormState);
            }}
          >
            Join
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
