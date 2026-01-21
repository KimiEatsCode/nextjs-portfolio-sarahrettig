import { PrismaClient } from "@prisma/client";

export type CourseProgress = {
  status: "completed" | "in-progress" | string;
  updatedAt: string;
  favorite?: boolean;
};

const prisma = new PrismaClient();

export async function setCourseProgress(
  userId: string,
  slug: string,
  payload: { score: number; status?: CourseProgress["status"]; favorite?: boolean },
) {
  const progress = await prisma.courseProgress.upsert({
    where: {
      userId_slug: {
        userId,
        slug,
      },
    },
    update: {
      status: payload.status ?? "completed",
      score: payload.score,
      isFavorite: payload.favorite ?? false,
      updatedAt: new Date(),
    },
    create: {
      userId,
      slug,
      status: payload.status ?? "completed",
      score: payload.score,
      isFavorite: payload.favorite ?? false,
    },
  });

  const data: CourseProgress = {
    status: progress.status,
    updatedAt: progress.updatedAt.toISOString(),
    favorite: progress.isFavorite,
  };

  return data;
}

export async function getCourseProgress(
  userId: string,
  slug: string,
): Promise<CourseProgress | null> {
  const progress = await prisma.courseProgress.findUnique({
    where: {
      userId_slug: {
        userId,
        slug,
      },
    },
  });

  if (!progress) {
    return null;
  }

  return {
    status: progress.status,
    updatedAt: progress.updatedAt.toISOString(),
    favorite: progress.isFavorite,
  };
}
