import jwt from "jsonwebtoken";

export function extractBearerToken(authorizationHeader: string | null | undefined): string | null {
  if (!authorizationHeader) return null;
  const [scheme, token] = authorizationHeader.split(" ");
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

export function verifyAndGetUserId(token: string | null): string | null {
  if (!token) return null;
  const secret = process.env.JWT_SECRET || "dev-secret";
  try {
    const payload = jwt.verify(token, secret) as { sub?: string };
    return typeof payload?.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}