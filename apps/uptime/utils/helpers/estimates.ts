export const estimateCronCost = (
  cronExpression: string,
  startDate: Date = new Date(),
  costPerExecution: number = 0.00007
): number => {
  const parts = cronExpression.split(" ");
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);

  let executions = 0;

  const msInSecond = 1000;
  const msInMinute = 60 * msInSecond;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;

  // Handle 6-part cron expressions (with seconds)
  if (parts.length === 6) {
    const [second, minute, hour] = parts;

    if (second === "*" && minute === "*" && hour === "*") {
      // every second
      const diffSeconds = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInSecond
      );
      executions = diffSeconds;
    } else if (second.startsWith("*/") && minute === "*" && hour === "*") {
      // every N seconds
      const interval = parseInt(second.slice(2), 10);
      const diffSeconds = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInSecond
      );
      executions = Math.floor(diffSeconds / interval);
    } else if (second === "0" && minute === "*" && hour === "*") {
      // every minute
      const diffMinutes = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInMinute
      );
      executions = diffMinutes;
    } else if (second === "0" && minute.startsWith("*/") && hour === "*") {
      // every N minutes
      const interval = parseInt(minute.slice(2), 10);
      const diffMinutes = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInMinute
      );
      executions = Math.floor(diffMinutes / interval);
    } else if (second === "0" && minute === "0" && hour === "*") {
      // hourly
      const diffHours = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInHour
      );
      executions = diffHours;
    } else if (second === "0" && minute === "0" && hour.startsWith("*/")) {
      // every N hours
      const interval = parseInt(hour.slice(2), 10);
      const diffHours = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInHour
      );
      executions = Math.floor(diffHours / interval);
    } else if (second === "0" && minute === "0" && hour === "0") {
      // daily
      const diffDays = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInDay
      );
      executions = diffDays;
    } else {
      return 0;
    }
  } else if (parts.length === 5) {
    // Handle 5-part cron expressions (without seconds) - original logic
    const [minute, hour] = parts;

    if (minute === "*" && hour === "*") {
      // every minute
      const diffMinutes = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInMinute
      );
      executions = diffMinutes;
    } else if (minute.startsWith("*/")) {
      // every N minutes
      const interval = parseInt(minute.slice(2), 10);
      const diffMinutes = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInMinute
      );
      executions = Math.floor(diffMinutes / interval);
    } else if (minute === "0" && hour === "*") {
      // hourly
      const diffHours = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInHour
      );
      executions = diffHours;
    } else if (minute === "0" && hour.startsWith("*/")) {
      // every N hours
      const interval = parseInt(hour.slice(2), 10);
      const diffHours = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInHour
      );
      executions = Math.floor(diffHours / interval);
    } else if (minute === "0" && hour === "0") {
      // daily
      const diffDays = Math.floor(
        (endDate.getTime() - startDate.getTime()) / msInDay
      );
      executions = diffDays;
    } else {
      return 0;
    }
  } else {
    return 0;
  }

  return executions * costPerExecution;
};
