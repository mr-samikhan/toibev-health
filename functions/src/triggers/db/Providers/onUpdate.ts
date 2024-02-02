import fs from "fs";
import path from "path";
import admin from "firebase-admin";
import handlebars from "handlebars";
import { firestore } from "firebase-functions";
import { COLLECTIONS } from "../../../constant";
import { EmailService } from "../../../services";
import { DocumentSnapshot } from "firebase-admin/firestore";
import { ProviderAvailability, Clinic, User } from "../../../types";

const birdImagePath = path.join(
  __dirname,
  "../../../",
  "templates/images",
  "birds.png"
);
const logoImagePath = path.join(
  __dirname,
  "../../../",
  "templates/images",
  "logo.png"
);
const logoSymbolImagePath = path.join(
  __dirname,
  "../../../",
  "templates/images",
  "logo_symbol.png"
);

const birdImage = fs.readFileSync(birdImagePath);
const logoImage = fs.readFileSync(logoImagePath);
const logoSymbolImage = fs.readFileSync(logoSymbolImagePath);

const templateFilePath = path.join(
  __dirname,
  "../../../",
  "templates",
  "emailTemplate.hbs"
);

const templateFile = fs.readFileSync(templateFilePath, "utf8");

const template = handlebars.compile(templateFile);

export const onUpdateProvider = firestore
  .document(`${COLLECTIONS.PROVIDERS}/{documentId}`)
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();

    const afterData = change.after.data();

    const clinicId: string = afterData?.clinicId || "";

    let clinicDocument: DocumentSnapshot<Clinic>;

    let userDocument: DocumentSnapshot<User>;

    const beforeAvailabilities: Array<ProviderAvailability> =
      beforeData?.availabilities || [];

    const afterAvailabilities: Array<ProviderAvailability> =
      afterData?.availabilities || [];

    if (
      afterData &&
      beforeData &&
      afterAvailabilities !== beforeAvailabilities
    ) {
      const changedAvailability: ProviderAvailability | undefined =
        afterAvailabilities.find(
          (availability: ProviderAvailability, index: number) =>
            JSON.stringify(availability) !==
            JSON.stringify(beforeAvailabilities[index])
        );

      if (changedAvailability) {
        const { date, time, scheduledBy, isScheduled } = changedAvailability;

        if (isScheduled && scheduledBy) {
          clinicDocument = (await admin
            .firestore()
            .collection(COLLECTIONS.INFORMATION)
            .doc("clinics")
            .collection("list")
            .doc(clinicId)
            .get()) as DocumentSnapshot<Clinic>;

          userDocument = (await admin
            .firestore()
            .collection(COLLECTIONS.USERS)
            .doc(scheduledBy)
            .get()) as DocumentSnapshot<User>;

          if (clinicDocument.exists && userDocument.exists) {
            let clinicName: string = clinicDocument.data()?.title as string;

            let clinicEmail: string = clinicDocument.data()?.email as string;

            let patientName =
              userDocument.data()?.firstName +
              " " +
              userDocument.data()?.lastName;

            let patientEmail = userDocument.data()?.email;

            let providerName = afterData?.name;

            const htmlContent = template({
              time,
              date,
              clinicName,
              patientName,
              patientEmail,
              providerName,
            });

            EmailService.send({
              to: clinicEmail,
              html: htmlContent,
              from: process.env.SMTP_USER as string,
              subject: "Patient Appointment Request",
              attachments: [
                {
                  filename: "birds.png",
                  content: birdImage,
                  encoding: "base64",
                  cid: "birds",
                },
                {
                  filename: "logo.png",
                  content: logoImage,
                  encoding: "base64",
                  cid: "logo",
                },
                {
                  filename: "logo_symbol.png",
                  content: logoSymbolImage,
                  encoding: "base64",
                  cid: "logo_symbol",
                },
              ],
            });
          }
        }
      }
    }
  });
