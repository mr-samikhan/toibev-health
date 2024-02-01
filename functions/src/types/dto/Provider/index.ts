import { Timestamp } from "firebase-admin/firestore";

export type ProviderAvailability = {
  date: string;
  time: string;
  scheduledBy: string;
  isScheduled: boolean;
  scheduledAt: Timestamp;
};
