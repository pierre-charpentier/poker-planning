import { tx } from "@instantdb/react";
import { DBSchema } from "./instant-db";

export function createRoomTx({
  id,
  name,
}: {
  id: DBSchema["room"]["id"];
  name: DBSchema["room"]["name"];
}) {
  return tx.room[id].update({
    name,
  });
}

export function removeRoomTx({ id }: { id: DBSchema["room"]["id"] }) {
  return tx.room[id].delete();
}

export function addUserToRoomTx({
  roomId,
  userId,
}: {
  roomId: DBSchema["room"]["id"];
  userId: DBSchema["user"]["id"];
}) {
  return tx.room[roomId].link({
    users: userId,
  });
}
