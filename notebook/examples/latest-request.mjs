// Small controller for a search interface; inject rendering at the call site.
// request must resolve to data, for example: fetch(url, {signal}).then(r => r.json()).
export function createLatestRequest(request, render) {
  let sequence = 0;
  let controller;
  return {
    async search(rawQuery) {
      const id = ++sequence;
      controller?.abort();
      const query = rawQuery.trim();
      if (!query) { render({ status: "idle", items: [] }); return; }
      controller = new AbortController();
      const signal = controller.signal;
      render({ status: "loading", items: [] });
      try {
        const items = await request(query, signal);
        if (id !== sequence) return;
        render({ status: items.length ? "success" : "empty", items });
      } catch (error) {
        if (id !== sequence || signal.aborted) return;
        render({ status: "error", items: [], message: String(error.message) });
      }
    },
    dispose() { ++sequence; controller?.abort(); },
  };
}
