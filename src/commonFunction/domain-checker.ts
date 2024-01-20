import { NextApiRequest } from "next";

export function isFakeDomain(req: NextApiRequest) {
  if (req.method !== "POST") {
    return true;
  }
  const allowedDomain = [
    "beta.craftyartapp.com",
    "www.craftyartapp.com",
    "editor.craftyartapp.com",
    "betaeditor.craftyartapp.com",
    "payment.craftyartapp.com",
    "localhost:3895",
    "192.168.29.92:3895",
  ];
  const referer = req.headers.referer || "";
  const domainMatch = referer.match(/^https?:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  const domain = domainMatch ? domainMatch[1] : "";

  return !allowedDomain.includes(domain);
}
