const cors = require("cors")({ origin: true });
import { COLLECTIONS } from "../../constant";
import { CreateAdminDto } from "../../types";
import { auth, firestore } from "firebase-admin";
import { Request, Response, https } from "firebase-functions";

export const createAdmin = () =>
  https.onRequest(async (request: Request, response: Response) => {
    cors(request, response, async () => {
      try {
        const { email, permissionLevel, username, password } =
          request.body as CreateAdminDto;

        const user = await auth().createUser({
          email,
          password,
          disabled: false,
          emailVerified: true,
          displayName: username,
        });

        await firestore().doc(`/${COLLECTIONS.ADMINS}/${user.uid}`).create({
          email,
          uid: user.uid,
          permissionLevel,
        });

        response.send(`${username} account has been created!`);
      } catch (error: any) {
        response.status(500).json({ error: error.message });
      }
    });
  });
