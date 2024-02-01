const cors = require("cors")({ origin: true });
import { UpdateAdminDto } from "../../types";
import { COLLECTIONS } from "../../constant";
import { auth, firestore } from "firebase-admin";
import { Request, Response, https } from "firebase-functions";

export const updateAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const { id, email, permissionLevel, username } =
          request.body as UpdateAdminDto;

        if (!email)
          response
            .status(400)
            .json({ success: false, message: "Email field is required" });

        if (!permissionLevel)
          response.status(400).json({
            success: false,
            message: "Permission Level field is required",
          });

        if (!id)
          response.status(400).json({
            success: false,
            message: "ID field is required",
          });

        if (!username)
          response.status(400).json({
            success: false,
            message: "Username field is required",
          });

        const user = await auth().updateUser(id, {
          email,
          displayName: username,
        });

        await firestore().doc(`/${COLLECTIONS.ADMINS}/${user.uid}`).update({
          email,
          username,
          permissionLevel,
        });

        response.send(`${username} account has been updated!`);
      } catch (error: any) {
        response.status(500).json({ error: error.message });
      }
    });
  });
