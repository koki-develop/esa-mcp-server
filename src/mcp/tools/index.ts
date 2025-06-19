import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Esa } from "../../lib/esa/index.js";
import {
  CreatePostParamsSchema,
  GetPostsParamsSchema,
} from "../../lib/esa/types.js";

export function registerTools(server: McpServer, esa: Esa) {
  server.tool(
    "get_posts",
    "Retrieve a list of posts from the esa team. Supports search queries, filtering, sorting, and pagination. Returns post metadata including title, content, tags, categories, author information, and engagement metrics (comments, stars, watches).",
    GetPostsParamsSchema.shape,
    async (params) => {
      const posts = await esa.getPosts(params);

      return {
        content: [{ type: "text", text: JSON.stringify(posts) }],
      };
    },
  );

  server.tool(
    "create_post",
    "Create a new post in the esa team. Requires a title and optionally accepts content, tags, category, WIP status, and other metadata. Returns the created post information including the assigned post number and URL.",
    CreatePostParamsSchema.shape,
    async (params) => {
      const post = await esa.createPost(params);

      return {
        content: [{ type: "text", text: JSON.stringify(post) }],
      };
    },
  );
}
