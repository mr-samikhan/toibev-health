import { Timestamp } from "firebase-admin/firestore";

export type Clinic = {
  id: string;
  title: string;
  email: string;
  address: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  images: Array<string>;
  departments: Array<any>;
};
