import { Redis } from "@upstash/redis";

export type CourseProgress = {
  score: number;
  grade: string;
  status: "completed" | "in-progress" | string;
  updatedAt: string;
  favorite?: boolean;
};

const redis = Redis.fromEnv();

const progressKey = (userId: string, slug: string) => `learning:${userId}:${slug}`;

export function gradeFromScore(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export async function setCourseProgress(
  userId: string,
  slug: string,
  payload: { score: number; status?: CourseProgress["status"]; favorite?: boolean },
) {
  const data: CourseProgress = {
    score: payload.score,
    status: payload.status ?? "completed",
    grade: gradeFromScore(payload.score),
    updatedAt: new Date().toISOString(),
    favorite: payload.favorite ?? false,
  };

  await redis.set(progressKey(userId, slug), data);
  return data;
}

export async function getCourseProgress(
  userId: string,
  slug: string,
): Promise<CourseProgress | null> {
  const data = await redis.get<CourseProgress>(progressKey(userId, slug));
  return data;
}
