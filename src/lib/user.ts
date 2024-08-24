import { id, tx } from "@instantdb/react";
import { DBSchema } from "./instant-db";

export function createUserTx({ name }: { name: DBSchema["user"]["name"] }) {
  return tx.user[id()].update({
    name,
  });
}

export function removeUserTx({ id }: { id: DBSchema["user"]["id"] }) {
  return tx.user[id].delete();
}
