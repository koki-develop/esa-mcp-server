import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Esa } from "../../lib/esa/index.js";
import {
  CreatePostParamsSchema,
  DeletePostParamsSchema,
  GetPostCommentsParamsSchema,
  GetPostsParamsSchema,
  GetTagsParamsSchema,
  UpdatePostParamsSchema,
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

  server.tool(
    "update_post",
    "Update an existing post in the esa team. Requires a post number and optionally accepts updated content, tags, category, WIP status, and other metadata. Returns the updated post information.",
    UpdatePostParamsSchema.shape,
    async (params) => {
      const post = await esa.updatePost(params);

      return {
        content: [{ type: "text", text: JSON.stringify(post) }],
      };
    },
  );
  server.tool(
    "get_tags",
    "Get a list of all tags used in the esa team. Returns tags with their names and the number of posts they are attached to, sorted by post count in descending order. Supports pagination.",
    GetTagsParamsSchema.shape,
    async (params) => {
      const tags = await esa.getTags(params);

      return {
        content: [{ type: "text", text: JSON.stringify(tags) }],
      };
    },
  );

  server.tool(
    "delete_post",
    "Delete an existing post from the esa team. Requires a post number. The post will be permanently deleted and cannot be recovered.",
    DeletePostParamsSchema.shape,
    async (params) => {
      await esa.deletePost(params);

      return {
        content: [
          {
            type: "text",
            text: `Post #${params.post_number} has been successfully deleted.`,
          },
        ],
      };
    },
  );

  server.tool(
    "get_post_comments",
    "Retrieve a list of comments for a specific post from the esa team. Requires a post number and supports pagination. Returns comment metadata including content, author information, timestamps, and engagement metrics (stars).",
    GetPostCommentsParamsSchema.shape,
    async (params) => {
      const comments = await esa.getPostComments(params);

      return {
        content: [{ type: "text", text: JSON.stringify(comments) }],
      };
    },
  );
}
