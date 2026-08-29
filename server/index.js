export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) {
      const url = new URL(request.url);

      if (request.method === "GET" && !url.pathname.split("/").at(-1)?.includes(".")) {
        url.pathname = "/index.html";
        return env.ASSETS.fetch(new Request(url, request));
      }

      return env.ASSETS.fetch(request);
    }

    return new Response("Static asset binding is unavailable.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
