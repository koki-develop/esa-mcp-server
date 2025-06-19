import path from "node:path";
import {
  type CreatePostParams,
  type CreatePostResponse,
  CreatePostResponseSchema,
  type GetPostsParams,
  type GetPostsResponse,
  GetPostsResponseSchema,
  type UpdatePostParams,
  type UpdatePostResponse,
  UpdatePostResponseSchema,
} from "./types.js";

export class Esa {
  private readonly _teamName: string;
  private readonly _accessToken: string;

  constructor(config: { teamName: string; accessToken: string }) {
    this._teamName = config.teamName;
    this._accessToken = config.accessToken;
  }

  async getPosts(params: GetPostsParams = {}): Promise<GetPostsResponse> {
    const response = await this._request({
      path: path.join("v1/teams", this._teamName, "posts"),
      method: "GET",
      query: params,
    });

    const data = await response.json();
    return GetPostsResponseSchema.parse(data);
  }

  async createPost(params: CreatePostParams): Promise<CreatePostResponse> {
    const response = await this._request({
      path: `/v1/teams/${this._teamName}/posts`,
      method: "POST",
      body: { post: params },
    });

    const data = await response.json();
    return CreatePostResponseSchema.parse(data);
  }

  async updatePost(params: UpdatePostParams): Promise<UpdatePostResponse> {
    const { post_number, ...postParams } = params;
    const response = await this._request({
      path: `/v1/teams/${this._teamName}/posts/${post_number}`,
      method: "PATCH",
      body: { post: postParams },
    });

    const data = await response.json();
    return UpdatePostResponseSchema.parse(data);
  }

  private async _request(params: {
    path: string;
    query?: Record<string, string | number>;
    method: string;
    body?: Record<string, unknown>;
    options?: RequestInit;
  }): Promise<Response> {
    const url = new URL("https://api.esa.io");
    url.pathname = path.join(url.pathname, params.path);
    if (params.query) {
      for (const [key, value] of Object.entries(params.query)) {
        if (value) {
          url.searchParams.set(key, value.toString());
        }
      }
    }

    const response = await fetch(url, {
      method: params.method,
      headers: {
        Authorization: `Bearer ${this._accessToken}`,
        "Content-Type": "application/json",
      },
      body: params.body ? JSON.stringify(params.body) : undefined,
      ...params.options,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return response;
  }
}
