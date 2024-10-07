import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      select: {
        id: true,
        userId: true,
      },
      where: {
        userId
      }
    });

    return account;
  } catch (error) {
    return null;
  }
}