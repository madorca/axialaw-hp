/**
 * CMS Content Data - API 연동
 * ─────────────────────────────────────────────
 * 서버의 content.json을 fetching하여 데이터를 제공합니다.
 */

let cachedContent = null;
let isLoading = false;
let subscribers = [];

function subscribe(callback) {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);
  };
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb(cachedContent));
}

export async function fetchContent() {
  if (cachedContent) return cachedContent;
  if (isLoading) {
    return new Promise((resolve) => {
      subscribe((data) => {
        if (data) resolve(data);
      });
    });
  }

  isLoading = true;
  try {
    const res = await fetch("/api/content");
    if (!res.ok) throw new Error("Failed to fetch content");
    cachedContent = await res.json();
    notifySubscribers();
    return cachedContent;
  } finally {
    isLoading = false;
  }
}

export function getContent() {
  return cachedContent;
}

export function updateContent(section, data) {
  return fetch("/api/content", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [section]: data }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success && result.data) {
        cachedContent = result.data;
        notifySubscribers();
      }
      return result;
    });
}
