require("dotenv").config();
import admin from "firebase-admin";
import * as methods from "./methods";

admin.initializeApp();

exports.createAdmin = methods.createAdmin();

exports.deleteAdmin = methods.deleteAdmin();

exports.updateAdmin = methods.updateAdmin();

export * from "./triggers";
