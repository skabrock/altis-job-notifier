import notifier from "node-notifier";
import { fileURLToPath } from "url";
import path from "path";
// import open from "open";

import { assembleLink } from "./assembleLink.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconPath = path.join(__dirname, "altis-logo.svg");

export function notify({ title, body, subtitle, jobId }) {
  const url = assembleLink(jobId);

  notifier.notify(
    {
      title: title,
      subtitle: subtitle,
      message: body,
      sound: "Funk",
      icon: iconPath,
      contentImage: iconPath,
      open: url,
      wait: false,
      timeout: 10000,
    }
    // function () {
    //   open(url);
    // }
  );
}
