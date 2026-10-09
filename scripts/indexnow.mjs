/**
 * Ping IndexNow so Bing (and Yandex, Seznam, Naver) re-crawl on demand
 * instead of waiting to discover changes themselves.
 *
 *   node scripts/indexnow.mjs                    # submits the homepage
 *   node scripts/indexnow.mjs /about /services   # submits specific paths
 *
 * The key file must stay reachable at
 * https://www.dctechpools.co.za/<KEY>.txt and contain exactly the key --
 * that is how the search engine confirms you control the domain. It lives in
 * public/, so it deploys with the site. If you delete it, submissions start
 * failing silently with a 403.
 *
 * Google does not participate in IndexNow; it still has to be nudged through
 * Search Console's URL Inspection tool.
 */

const KEY = "959cd541c0f3317c4f80991a2219f22d";
const HOST = "www.dctechpools.co.za";
const ORIGIN = `https://${HOST}`;

const paths = process.argv.slice(2);
const urlList = (paths.length ? paths : ["/"]).map((p) =>
  p.startsWith("http") ? p : `${ORIGIN}${p.startsWith("/") ? p : `/${p}`}`
);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
};

// Confirm the key file is actually reachable first. A 403 from the endpoint
// is otherwise indistinguishable from a bad key, and wastes a lot of time.
const keyCheck = await fetch(body.keyLocation).catch(() => null);
if (!keyCheck || !keyCheck.ok) {
  console.error(`Key file not reachable at ${body.keyLocation}`);
  console.error("Deploy first -- the file must be live before submitting.");
  process.exit(1);
}
const served = (await keyCheck.text()).trim();
if (served !== KEY) {
  console.error(`Key file contents mismatch.\n  expected: ${KEY}\n  got:      ${served}`);
  process.exit(1);
}
console.log(`Key file verified at ${body.keyLocation}`);

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

// 200 and 202 both mean accepted; 202 means the key is still being validated.
if (res.status === 200 || res.status === 202) {
  console.log(`Submitted ${urlList.length} URL(s) — HTTP ${res.status}`);
  urlList.forEach((u) => console.log(`  ${u}`));
} else {
  console.error(`Rejected — HTTP ${res.status}`);
  console.error(await res.text().catch(() => ""));
  process.exit(1);
}
