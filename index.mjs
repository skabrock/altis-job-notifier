import { notify } from "./notify.mjs";
import { fetchData } from "./fetchData.mjs";
import { assembleLink } from "./assembleLink.mjs";

const alerts = ["react", "javascript", "frontend", "front-end"];

const displayedJobs = [];

const timeout = 5 * 60 * 1000;

async function checkJobs() {
  process.stdout.write("·");
  let jobs = [];

  const fetches = alerts.map((alert) => {
    return fetchData(alert);
  });

  await Promise.allSettled(fetches).then((fetchedJobs) => {
    jobs = fetchedJobs.map(({ value }) => value).flat(1);
  });

  const jobsToDisplay = jobs.filter((job) => {
    const isNew = !displayedJobs.includes(job.jobId);

    if (isNew) {
      displayedJobs.push(job.jobId);
    }

    return isNew;
  });

  if (jobsToDisplay.length) {
    jobsToDisplay.forEach((job) => {
      process.stdout.write("\n");
      console.log({ ...job, url: assembleLink(job.jobId) });
    });
  }

  jobsToDisplay.forEach((job) => {
    notify({
      title: "Found a new job!!!",
      subtitle: job.jobTitle,
      body: job.jobTitle,
      jobId: job.jobId,
    });
  });
}

console.log("Timeout is: " + timeout / 1000 + "sec");
checkJobs();
setInterval(checkJobs, timeout);
