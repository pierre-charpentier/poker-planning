import { tx } from "@instantdb/react";
import { DBSchema } from "./instant-db";

export function createUserTx({
  id,
  name,
}: {
  id: DBSchema["user"]["id"];
  name: DBSchema["user"]["name"];
}) {
  return tx.user[id].update({
    name,
  });
}

export function removeUserTx({ id }: { id: DBSchema["user"]["id"] }) {
  return tx.user[id].delete();
}

export function linkUserToRoomTx({
  userId,
  roomId,
}: {
  userId: DBSchema["user"]["id"];
  roomId: DBSchema["room"]["id"];
}) {
  return tx.user[userId].link({ room: roomId });
}
