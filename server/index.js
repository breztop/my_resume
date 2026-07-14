export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Static asset binding is unavailable.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
