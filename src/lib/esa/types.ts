import { z } from "zod";

export const UserSchema = z.object({
  myself: z.boolean(),
  name: z.string(),
  screen_name: z.string(),
  icon: z.string(),
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
  body_html: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  message: z.string(),
  revision_number: z.number(),
  created_by: UserSchema,
  updated_by: UserSchema,
  kind: z.enum(["stock", "flow"]),
  comments_count: z.number(),
  tasks_count: z.number(),
  done_tasks_count: z.number(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  star: z.boolean(),
  watch: z.boolean(),
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

export type User = z.infer<typeof UserSchema>;
export type Post = z.infer<typeof PostSchema>;
export type GetPostsResponse = z.infer<typeof GetPostsResponseSchema>;
export type GetPostsParams = z.infer<typeof GetPostsParamsSchema>;
