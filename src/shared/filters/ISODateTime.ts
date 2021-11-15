import {DateTime} from 'luxon';

export default function isoDateTimeFilter(value?: string) {
  if (value) {
	return DateTime.fromISO(value).setLocale('it').toLocaleString(DateTime.DATETIME_FULL);
  }

  return 'n/a';
}
