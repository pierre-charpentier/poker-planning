import { Button } from "@/components/ui/button";
import { id } from "@instantdb/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "@/globals.css";
import { instantDB } from "@/lib/instant-db";
import { createRoomTx } from "@/lib/room";
import { createUserTx, linkUserToRoomTx } from "@/lib/user";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [, { setUserId }] = useLocalStorage();
  const [newRoomFormState, setNewRoomFormState] = useState({
    roomName: "",
    userName: "",
  });

  const navigate = useNavigate();

  const handleCreateRoomAndUser = async ({
    roomName,
    userName,
  }: {
    roomName: string;
    userName: string;
  }) => {
    const newRoomId = id();
    const newUserId = id();

    try {
      await instantDB.transact([
        createRoomTx({ id: newRoomId, name: roomName }),
        createUserTx({ id: newUserId, name: userName }),
        linkUserToRoomTx({ userId: newUserId, roomId: newRoomId }),
      ]);

      setUserId(newUserId);

      navigate(`/room/${newRoomId}`);
    } catch (e) {
      console.log("Room could not be created", e);
    }
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-16 mt-48">
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
              handleCreateRoomAndUser(newRoomFormState);
            }}
          >
            Start
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
