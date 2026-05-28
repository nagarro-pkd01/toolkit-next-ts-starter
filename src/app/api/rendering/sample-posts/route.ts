import { fetchExamplePosts } from "@/services/rendering/fetchExamplePosts";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await fetchExamplePosts("client");

  return Response.json(payload);
}
