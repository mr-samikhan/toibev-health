require("dotenv").config();
import admin from "firebase-admin";

admin.initializeApp();

export * from "./triggers";
