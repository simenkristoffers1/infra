import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function getSeenLabel(timestamp: string | undefined) {
  if (timestamp) {
    const diff = dayjs().diff(dayjs(timestamp), 'minute');
    if (diff < 1) return 'Seen now';
    return `Seen ${dayjs(timestamp).fromNow()}`;
  }
  return 'Delivered';
}
