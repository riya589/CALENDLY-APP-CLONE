import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/app-error.js";
import { DEFAULT_ADMIN_EMAIL } from "../constants/default-user.js";

export async function getDefaultAdminUser() {
  const user = await prisma.user.findUnique({
    where: { email: DEFAULT_ADMIN_EMAIL }
  });

  if (!user) {
    throw new AppError(500, "Default admin user not found. Please run the seed script.");
  }

  return user;
}

