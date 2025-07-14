import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Esa } from "../../lib/esa/index.js";
import {
  CreatePostCommentParamsSchema,
  CreatePostParamsSchema,
  DeleteCommentParamsSchema,
  DeletePostParamsSchema,
  GetPostCommentsParamsSchema,
  GetPostParamsSchema,
  GetPostsParamsSchema,
  GetTagsParamsSchema,
  UpdateCommentParamsSchema,
  UpdatePostParamsSchema,
} from "../../lib/esa/types.js";

export function registerTools(
  server: McpServer,
  esa: Esa,
  options: { readonly: boolean },
) {
  server.tool(
    "get_posts",
    "Retrieve a list of posts from the esa team. Supports search queries, filtering, sorting, and pagination. Returns post metadata including title, content, tags, categories, author information, and engagement metrics (comments, stars, watches). Optionally includes comments and stargazers with the include parameter. Supports nested inclusion like 'comments,comments.stargazers'. Note: body_md is truncated to 300 characters with body_truncated field indicating if truncation occurred.",
    GetPostsParamsSchema.shape,
    async (params) => {
      const posts = await esa.getPosts(params);

      // Truncate body_md for each post to save context
      const postsWithTruncation = {
        ...posts,
        posts: posts.posts.map((post) => {
          const maxLength = 300;

          if (post.body_md.length <= maxLength) {
            return {
              ...post,
              body_truncated: false,
            };
          }

          return {
            ...post,
            body_md: `${post.body_md.substring(0, maxLength)}...`,
            body_truncated: true,
          };
        }),
      };

      return {
        content: [{ type: "text", text: JSON.stringify(postsWithTruncation) }],
      };
    },
  );

  server.tool(
    "get_post",
    "Retrieve a specific post from the esa team by post number. Returns complete post details including title, content (markdown), tags, category, author information, revision history, and engagement metrics. Optionally includes comments and stargazers. Supports nested inclusion like 'comments,comments.stargazers'.",
    GetPostParamsSchema.shape,
    async (params) => {
      const post = await esa.getPost(params);

      return {
        content: [{ type: "text", text: JSON.stringify(post) }],
      };
    },
  );

  // Write operations - only available when not in readonly mode
  if (!options.readonly) {
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
  }
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

  // Comment creation - only available when not in readonly mode
  if (!options.readonly) {
    server.tool(
      "create_post_comment",
      "Create a new comment on an existing post in the esa team. Requires a post number and comment content in Markdown format. Returns the created comment information including ID, content, timestamps, and author details.",
      CreatePostCommentParamsSchema.shape,
      async (params) => {
        const comment = await esa.createPostComment(params);

        return {
          content: [{ type: "text", text: JSON.stringify(comment) }],
        };
      },
    );

    server.tool(
      "update_comment",
      "Update an existing comment on a post in the esa team. Requires a comment ID and new content in Markdown format. Returns the updated comment information including content, timestamps, and author details.",
      UpdateCommentParamsSchema.shape,
      async (params) => {
        const comment = await esa.updateComment(params);

        return {
          content: [{ type: "text", text: JSON.stringify(comment) }],
        };
      },
    );

    server.tool(
      "delete_comment",
      "Delete an existing comment from the esa team. Requires a comment ID. The comment will be permanently deleted and cannot be recovered.",
      DeleteCommentParamsSchema.shape,
      async (params) => {
        await esa.deleteComment(params);

        return {
          content: [
            {
              type: "text",
              text: `Comment #${params.comment_id} has been successfully deleted.`,
            },
          ],
        };
      },
    );
  }
}
