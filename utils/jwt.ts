import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
