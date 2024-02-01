import { Timestamp } from "firebase-admin/firestore";

export type User = {
  email: string;
  lastName: string;
  firstName: string;
  sobriety: Timestamp;
};
