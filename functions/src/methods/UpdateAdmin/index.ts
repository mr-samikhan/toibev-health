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
