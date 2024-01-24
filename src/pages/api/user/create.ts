import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { decryptData, encryptData } from "@/src/aes-crypto";
import { isFakeDomain } from "@/src/commonFunction/domain-checker";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (isFakeDomain(req)) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const cookieValue = req.cookies;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2;
    const accessKey = process.env.NEXT_PUBLIC_KEY;
    const userId = decryptData(cookieValue._sdf);

    const response = await axios.post<any>(
      `${apiUrl}/templates/api/V3/createUser`,
      {
        key: `${accessKey}`,
        user_id: userId,
        name: req.body.name,
        email: req.body.email,
        photo_uri: req.body.photo_uri,
        login_type: req.body.login_type,
        device_id: "",
        utm_medium: "craftyart",
        utm_source: "craftyart",
      }
    );

    res.status(200).json(encryptData(JSON.stringify(response.data)));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
