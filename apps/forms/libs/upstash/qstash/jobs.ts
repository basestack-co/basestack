// Client
import { qstashClient, jobsBaseUrl, schedules } from "./client";

/*
 * Examples of delay values for the Upstash-Delay header:
 * 10s = 10 seconds
 * 1m = 1 minute
 * 30m = half an hour
 * 2h = 2 hours
 * 7d = 7 days
 * */

// Its possible to add a callback URL to the job to get the result of the job https://upstash.com/docs/qstash/features/callbacks
// callback: "https://my-callback...",
// failureCallback: "https://my-callback..."

export const sendEmailJob = async (body: { to: string; subject: string }) => {
  await qstashClient.publishJSON({
    url: `${jobsBaseUrl}/job/sendEmail`,
    headers: { "Upstash-Delay": "10s" },
    retries: 1,
    // contentBasedDeduplication: true, avoid duplication by using the content body of the job
    // deduplicationId: "abcdef", // avoid duplication by using a unique id
    body,
  });
};

/* Examples of how to use Upstash to create different types of jobs */

// This is good example if we need to send multiple jobs at once
// Ex: formSubmissionJob where it sends an email notification, sends a webhook and verifies the content for spam
export const demoBatchJob = async () => {
  await qstashClient.batchJSON([
    {
      url: `${jobsBaseUrl}/job/sendEmail`,
      delay: 7,
    },
    {
      url: `${jobsBaseUrl}/job/webhook`,
      delay: 9,
      body: {
        Some: "Data",
      },
    },
  ]);
};

// This is just an example of how to schedule a job
export const demoScheduleJob = async () => {
  await schedules.create({
    destination: `${jobsBaseUrl}/job/demo-schedule`,
    // Create a cron that runs every day at 12:00
    cron: "0 12 * * *",
  });
};
