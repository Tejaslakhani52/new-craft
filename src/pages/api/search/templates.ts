import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { encryptData } from "@/src/aes-crypto";
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

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL_2;
    const accessKey = process.env.NEXT_PUBLIC_KEY;

    const response = await axios.post<any>(
      `${apiUrl}/templates/api/V4/searchTemplates`,
      {
        key: `${accessKey}`,
        app_id: "1",
        cat_id: "-1",
        keywords: req.body.keywords,
        device: "0",
        refWidth: "1080",
        refHeight: "1080",
        page: req.body.page,
        fromFabric: "1",
      }
    );

    res.status(200).json(encryptData(JSON.stringify(response.data)));
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
