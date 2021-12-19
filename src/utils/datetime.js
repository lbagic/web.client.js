import { Temporal, toTemporalInstant } from "@js-temporal/polyfill";

Date.prototype.toTemporalInstant = toTemporalInstant;

export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTwoDigitFormat = (num) => ("0" + num).slice(-2);
const get12HourFormat = (hour) => hour % 12 || 12;
const getDayPeriod = (hour) => (hour < 12 || hour === 24 ? "AM" : "PM");
const getIntlObject = (date, type, options) =>
  Object.fromEntries(
    Intl.DateTimeFormat(options.locale, {
      weekday: type,
      month: type,
      timeZone: options.timeZone,
    })
      .formatToParts(date)
      .map(Object.values)
  );

const getDateType = (date) =>
  typeof date === "number"
    ? "number"
    : date instanceof Date
    ? "date"
    : typeof date === "string"
    ? "iso"
    : Object.prototype.toString.call(date).includes("Temporal")
    ? "temporal"
    : undefined;

/**
 * Description.
 *
 * @param {number | Date | Temporal.ZonedDateTimeLike} input Date like input.
 * @param {string | Temporal.TimeZoneProtocol} timeZone Timezone string.
 * @return {Temporal.ZonedDateTimeLike} Returns Temporal object from date like input.
 */

export function convertToTemporal(input, timeZone = undefined) {
  const type = getDateType(input);
  if (type === "temporal") return input;
  let iso = "";
  if (type === "iso") iso = input;
  else if (type === "number") iso = new Date(input).toISOString();
  else if (type === "date") iso = input.toISOString();
  if (!iso) throw new Error("Undefined date type");
  return Temporal.Instant.from(iso).toZonedDateTimeISO(
    timeZone || userTimeZone
  );
}

/**
 * Description.
 *
 * @param {number | Date | Temporal.ZonedDateTimeLike} input Date like input.
 * @return {Date} Returns javascript Date object from date like input.
 */

export function convertToDate(input) {
  const type = getDateType(input);
  if (type === "date") return input;
  if (type === "number") return new Date(input);
  if (type === "iso") return new Date(input);
  return new Date(input.toString());
}

/**
 * Description.
 *
 * @param {number | Date | Temporal.ZonedDateTimeLike} input Date like input.
 * @param {{locale?: string, timeZone?: string | Temporal.TimeZoneProtocol}} options Date like input.
 * @return { Temporal.ZonedDateTimeLike & {
 *    calendar: Temporal.CalendarProtocol,
 *    day: number,
 *    dayLong: string,
 *    dayOfWeek: number,
 *    dayOfYear: number,
 *    dayPeriod: string,
 *    dayShort: string,
 *    dayTwoDigit: string,
 *    daysInMonth: number,
 *    daysInWeek: number,
 *    daysInYear: number,
 *    epochMicroseconds: bigint,
 *    epochMilliseconds: number,
 *    epochNanoseconds: bigint,
 *    epochSeconds: number,
 *    era: string | undefined,
 *    eraYear: number | undefined,
 *    hour12: number,
 *    hour12TwoDigit: string,
 *    hour: number,
 *    hourTwoDigit: string,
 *    hoursInDay: number,
 *    inLeapYear: Boolean,
 *    microsecond: number,
 *    millisecond: number,
 *    minute: number,
 *    minuteTwoDigit: string,
 *    month: number,
 *    monthCode: string,
 *    monthLong: string,
 *    monthShort: string,
 *    monthTwoDigit: string,
 *    monthsInYear: number,
 *    nanosecond: number,
 *    offset: string,
 *    offsetNanoseconds: number,
 *    second: number,
 *    secondTwoDigit: string,
 *    timeZone: string | Temporal.TimeZoneProtocol,
 *    weekOfYear: number,
 *    year: number,
 *    yearTwoDigit: string,
 * } } Returns extended Temporal object from date like input.
 */

export function formatDate(
  input,
  options = { locale: undefined, timeZone: undefined }
) {
  const temporal = convertToTemporal(input, options.timeZone);
  const date = convertToDate(input);

  const intlLong = getIntlObject(date, "long", options);
  const intlShort = getIntlObject(date, "short", options);

  temporal.dayLong = intlLong.weekday;
  temporal.dayPeriod = getDayPeriod(temporal.hour);
  temporal.dayShort = intlShort.weekday;
  temporal.dayTwoDigit = getTwoDigitFormat(temporal.day);
  temporal.hour12 = get12HourFormat(temporal.hour);
  temporal.hour12TwoDigit = getTwoDigitFormat(temporal.hour12);
  temporal.hourTwoDigit = getTwoDigitFormat(temporal.hour);
  temporal.minuteTwoDigit = getTwoDigitFormat(temporal.minute);
  temporal.monthLong = intlLong.month;
  temporal.monthShort = intlShort.month;
  temporal.monthTwoDigit = getTwoDigitFormat(temporal.month);
  temporal.secondTwoDigit = getTwoDigitFormat(temporal.second);
  temporal.yearTwoDigit = getTwoDigitFormat(temporal.year);

  return temporal;
}
