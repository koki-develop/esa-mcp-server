import { z } from "zod";

export const UserSchema = z.object({
  myself: z.boolean(),
  name: z.string(),
  screen_name: z.string(),
});

export const CommentSchema = z.object({
  id: z.number(),
  body_md: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  url: z.string(),
  created_by: UserSchema,
  stargazers_count: z.number(),
  star: z.boolean(),
});

export const StargazerSchema = z.object({
  created_at: z.string(),
  body: z.string().nullable(),
  user: UserSchema,
});

export const PostSchema = z.object({
  number: z.number(),
  url: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  category: z.string().nullable(),
  full_name: z.string(),
  wip: z.boolean(),
  body_md: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  message: z.string(),
  revision_number: z.number(),
  created_by: UserSchema,
  updated_by: UserSchema,
  kind: z.enum(["stock", "flow"]),
  comments_count: z.number(),
  tasks_count: z.number().optional(),
  done_tasks_count: z.number().optional(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  star: z.boolean(),
  watch: z.boolean(),
  comments: z.array(CommentSchema).optional(),
  stargazers: z.array(StargazerSchema).optional(),
});

export const GetPostsParamsSchema = z.object({
  q: z
    .string()
    .optional()
    .describe(
      "Search query to filter posts. Supports various search operators and keywords.",
    ),
  include: z
    .string()
    .optional()
    .describe(
      "Comma-separated list of additional data to include in response (e.g., 'comments', 'stargazers', 'comments,stargazers').",
    ),
  sort: z
    .enum([
      "updated",
      "created",
      "number",
      "stars",
      "watches",
      "comments",
      "best_match",
    ])
    .optional()
    .describe(
      "Field to sort posts by. Options: 'updated' (last updated), 'created' (creation date), 'number' (post number), 'stars' (star count), 'watches' (watch count), 'comments' (comment count), 'best_match' (relevance score).",
    ),
  order: z
    .enum(["desc", "asc"])
    .optional()
    .describe(
      "Sort order. 'desc' for descending (default), 'asc' for ascending.",
    ),
  page: z
    .number()
    .min(1)
    .optional()
    .describe("Page number for pagination. Starts from 1."),
  per_page: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe("Number of posts per page. Range: 1-100, default is 20."),
});

export const GetPostsResponseSchema = z.object({
  posts: z.array(PostSchema),
  prev_page: z.number().nullable(),
  next_page: z.number().nullable(),
  total_count: z.number(),
  page: z.number(),
  per_page: z.number(),
});

export const GetPostParamsSchema = z.object({
  post_number: z
    .number()
    .min(1)
    .describe("Post number to retrieve (required)."),
  include: z
    .string()
    .optional()
    .describe(
      "Comma-separated list of additional data to include in response (e.g., 'comments', 'stargazers', 'comments,stargazers').",
    ),
});

export const GetPostResponseSchema = PostSchema;

export const CreatePostParamsSchema = z.object({
  name: z
    .string()
    .min(1)
    .describe(
      "Post title (required). Use &#35; for # and &#47; for / if needed in title.",
    ),
  body_md: z.string().optional().describe("Post content in Markdown format."),
  tags: z
    .array(z.string())
    .optional()
    .describe("Array of tags to be attached to the post."),
  category: z
    .string()
    .optional()
    .describe("Category path for the post (e.g., 'dev/2024/01/01')."),
  wip: z
    .boolean()
    .optional()
    .default(true)
    .describe(
      "Whether the post is in WIP (Work in Progress) state. Defaults to true.",
    ),
  message: z
    .string()
    .optional()
    .describe("Commit message for the post update."),
  template_post_id: z
    .number()
    .optional()
    .describe("Template post ID to apply to this post."),
});

export const CreatePostResponseSchema = PostSchema;

export const UpdatePostParamsSchema = z.object({
  post_number: z.number().min(1).describe("Post number to update (required)."),
  name: z
    .string()
    .optional()
    .describe(
      "Post title. Use &#35; for # and &#47; for / if needed in title.",
    ),
  body_md: z.string().optional().describe("Post content in Markdown format."),
  tags: z
    .array(z.string())
    .optional()
    .describe("Array of tags to be attached to the post."),
  category: z
    .string()
    .optional()
    .describe("Category path for the post (e.g., 'dev/2024/01/01')."),
  wip: z
    .boolean()
    .optional()
    .describe("Whether the post is in WIP (Work in Progress) state."),
  message: z
    .string()
    .optional()
    .describe("Commit message for the post update."),
});

export const UpdatePostResponseSchema = PostSchema.extend({
  overlapped: z
    .boolean()
    .optional()
    .describe("True if 3-way merge conflicts occurred."),
});

export const DeletePostParamsSchema = z.object({
  post_number: z.number().min(1).describe("Post number to delete (required)."),
});

export const GetPostCommentsParamsSchema = z.object({
  post_number: z
    .number()
    .min(1)
    .describe("Post number to get comments for (required)."),
  page: z
    .number()
    .min(1)
    .optional()
    .describe("Page number for pagination. Starts from 1."),
  per_page: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .describe("Number of comments per page. Range: 1-100, default is 20."),
});

export const GetPostCommentsResponseSchema = z.object({
  comments: z.array(CommentSchema),
  prev_page: z.number().nullable(),
  next_page: z.number().nullable(),
  total_count: z.number(),
  page: z.number(),
  per_page: z.number(),
  max_per_page: z.number(),
});
export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Stargazer = z.infer<typeof StargazerSchema>;
export type GetPostsResponse = z.infer<typeof GetPostsResponseSchema>;
export const TagSchema = z.object({
  name: z.string(),
  posts_count: z.number(),
});

export const GetTagsParamsSchema = z.object({
  page: z
    .number()
    .min(1)
    .optional()
    .describe("Page number for pagination. Starts from 1."),
  per_page: z
    .number()
    .min(1)
    .max(1000)
    .optional()
    .describe("Number of tags per page. Range: 1-1000, default is 1000."),
});

export const GetTagsResponseSchema = z.object({
  tags: z.array(TagSchema),
  prev_page: z.number().nullable(),
  next_page: z.number().nullable(),
  total_count: z.number(),
  page: z.number(),
  per_page: z.number(),
  max_per_page: z.number(),
});

export type Tag = z.infer<typeof TagSchema>;
export type GetTagsParams = z.infer<typeof GetTagsParamsSchema>;
export type GetTagsResponse = z.infer<typeof GetTagsResponseSchema>;
export type GetPostsParams = z.infer<typeof GetPostsParamsSchema>;
export type GetPostCommentsParams = z.infer<typeof GetPostCommentsParamsSchema>;
export type GetPostCommentsResponse = z.infer<
  typeof GetPostCommentsResponseSchema
>;
export type GetPostParams = z.infer<typeof GetPostParamsSchema>;
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>;
export type CreatePostParams = z.infer<typeof CreatePostParamsSchema>;
export type CreatePostResponse = z.infer<typeof CreatePostResponseSchema>;
export type UpdatePostParams = z.infer<typeof UpdatePostParamsSchema>;
export type UpdatePostResponse = z.infer<typeof UpdatePostResponseSchema>;
export type DeletePostParams = z.infer<typeof DeletePostParamsSchema>;
