import { init } from "@instantdb/react";

const APP_ID = import.meta.env.VITE_INSTANT_DB_APP_ID;

export type DBSchema = {
  user: {
    id: string;
    name: string;
    rooms: Array<DBSchema["room"]>;
  };
  room: {
    id: string;
    name: string;
    pokers: Array<DBSchema["poker"]>;
    users: Array<DBSchema["user"]>;
  };
  poker: {
    id: string;
    roomId: DBSchema["room"]["id"];
  };
  estimate: {
    id: string;
    users: DBSchema["user"];
    pokers: DBSchema["poker"];
    estimate: DBSchema["estimate"];
    createdAt: number;
  };
};

export const instantDB = init<DBSchema>({ appId: APP_ID ?? "" });
