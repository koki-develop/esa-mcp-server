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
}
