import { Button } from "@/components/ui/button";
import "./globals.css";
import { DBSchema, instantDB } from "./lib/instant-db";
import { id, tx } from "@instantdb/react";
import { createRoomTx } from "./lib/room";
import { useState } from "react";

const addEstimate = (estimate: number) => {
  instantDB.transact(
    tx.estimates[id()].update({
      pokerId: "00c3faee-1cff-417e-9df0-db34ab642dfd",
      estimate,
      createdAt: Date.now(),
    })
  );
};

function App() {
  const [roomId, setRoomId] = useState<DBSchema["room"]["id"]>("NULL");

  const { data: roomData } = instantDB.useQuery({
    room: {
      $: {
        where: { id: roomId },
      },
    },
  });

  return (
    <>
      <pre>{JSON.stringify(roomData, null, 2)}</pre>
      <Button
        onClick={async () => {
          const newRoomId = id();

          try {
            await instantDB.transact(
              createRoomTx({ id: newRoomId, name: "my-room" })
            );

            setRoomId(newRoomId);
          } catch (e) {
            console.log("Room could not be created", e);
          }
        }}
      >
        Create room
      </Button>
      <Button
        onClick={() => {
          addEstimate(9);
        }}
      >
        Add Estimate
      </Button>
    </>
  );
}

export default App;
