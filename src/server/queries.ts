import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { PostHog } from "posthog-node"; // Import from posthog-node
import analyticsServerClient from "./analytics";

// Initialize PostHog client
// Make sure NEXT_PUBLIC_POSTHOG_KEY is available in your environment variables
const posthogClient = process.env.NEXT_PUBLIC_POSTHOG_KEY ? new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
}) : undefined;

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
}

export async function getImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  if (posthogClient) {
    posthogClient.capture({
      distinctId: user.userId,
      event: "delete image",
      properties: {
        imageId: id,
      },
    });
    // Ensure events are sent before redirecting, especially for serverless functions
    await posthogClient.shutdown();
  } else {
    console.warn("PostHog client not initialized. NEXT_PUBLIC_POSTHOG_KEY might be missing.")
  }

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}