import { createServer, Model } from "miragejs";
export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,
    models: {
      posts: Model,
    },
    seeds(server) {
      server.create("post", {
        id: 1,
        title: "1. Nulla sit amet",
        body:
          "1. Praesent congue erat at massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque commodo eros a enim. Nunc interdum lacus sit amet orci.",
      });
      server.create("post", {
        id: 2,
        title: "2. Curabitur suscipit suscipit",
        body:
          "2. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Praesent nec nisl a purus blandit viverra.",
      });
      server.create("post", {
        id: 3,
        title: "3. Donec id justo",
        body:
          "3. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
      server.create("post", {
        id: 4,
        title: "4. Donec id justo",
        body:
          "4. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
      server.create("post", {
        id: 5,
        title: "5. Donec id justo",
        body:
          "5. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
      server.create("post", {
        id: 6,
        title: "6. Donec id justo",
        body:
          "6. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
      server.create("post", {
        id: 7,
        title: "7. Donec id justo",
        body:
          "7. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
      server.create("post", {
        id: 8,
        title: "8. Donec id justo",
        body:
          "8. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
      server.create("post", {
        id: 9,
        title: "9. Donec id justo",
        body:
          "9. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });

      server.create("post", {
        id: 10,
        title: "10. Donec id justo",
        body:
          "10. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Curabitur suscipit suscipit tellus. Praesent ac sem eget est egestas volutpat. Pellentesque posuere.",
      });
    },
    routes() {
      this.namespace = "api/posts";
      this.get("/", (schema, request) => {
        // https://ember-twiddle.com/94683786da92a627571e209e060dce53?openFiles=mirage.config.js%2C&route=%2Ftasks%3Flimit%3D1
        let qp = request.queryParams;
        let page = parseInt(qp.page - 1);
        let limit = parseInt(qp.limit);
        let start = page * limit;
        let end = start + limit;
        let filtered = schema.posts.all().slice(start, end);

        return filtered;
      });
      this.get("/count", (schema, request) => {
        return schema.posts.all().length;
      });
      this.get("/:id", (schema, request) => {
        let id = request.params.id;
        return schema.posts.find(id);
      });
      this.post("/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let post = schema.posts.find(id);
        return post.update(newAttrs);
      });
    },
  });
  return server;
}
