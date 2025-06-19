import path from "node:path";

export class Esa {
  private readonly _teamName: string;
  private readonly _accessToken: string;

  constructor(config: { teamName: string; accessToken: string }) {
    this._teamName = config.teamName;
    this._accessToken = config.accessToken;
  }

  async getPosts() {
    // TODO
  }

  async getPost() {
    // TODO
  }

  async createPost() {
    // TODO
  }

  async updatePost() {
    // TODO
  }

  async deletePost() {
    // TODO
  }

  async getPostComments() {
    // TODO
  }

  async createPostComment() {
    // TODO
  }

  async updateComment() {
    // TODO
  }

  async deleteComment() {
    // TODO
  }

  private async _request(params: {
    path: string;
    method: string;
    options?: RequestInit;
  }): Promise<Response> {
    const url = new URL("https://api.esa.io");
    url.pathname = path.join(url.pathname, "/v1", params.path);

    const response = await fetch(url, {
      method: params.method,
      headers: {
        Authorization: `Bearer ${this._accessToken}`,
        "Content-Type": "application/json",
      },
      ...params.options,
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return response;
  }
}
