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
  const dateType = getDateType(input);
  if (dateType === "temporal") return input;
  const dateObject = dateType === "number" ? new Date(input) : input;
  return Temporal.Instant.from(dateObject.toISOString()).toZonedDateTimeISO(
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
  const dateType = getDateType(input);
  if (dateType === "date") return input;
  if (dateType === "number") return new Date(input);
  return new Date(input.toString());
}

/**
 * Description.
 *
 * @param {number | Date | Temporal.ZonedDateTimeLike} date Date like input.
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
  date,
  options = { locale: undefined, timeZone: undefined }
) {
  const temporalObject = convertToTemporal(date, options.timeZone);
  const dateObject = convertToDate(date);

  const intlLong = getIntlObject(dateObject, "long", options);
  const intlShort = getIntlObject(dateObject, "short", options);

  temporalObject.dayLong = intlLong.weekday;
  temporalObject.dayPeriod = getDayPeriod(temporalObject.hour);
  temporalObject.dayShort = intlShort.weekday;
  temporalObject.dayTwoDigit = getTwoDigitFormat(temporalObject.day);
  temporalObject.hour12 = get12HourFormat(temporalObject.hour);
  temporalObject.hour12TwoDigit = getTwoDigitFormat(temporalObject.hour12);
  temporalObject.hourTwoDigit = getTwoDigitFormat(temporalObject.hour);
  temporalObject.minuteTwoDigit = getTwoDigitFormat(temporalObject.minute);
  temporalObject.monthLong = intlLong.month;
  temporalObject.monthShort = intlShort.month;
  temporalObject.monthTwoDigit = getTwoDigitFormat(temporalObject.month);
  temporalObject.secondTwoDigit = getTwoDigitFormat(temporalObject.second);
  temporalObject.yearTwoDigit = getTwoDigitFormat(temporalObject.year);

  return temporalObject;
}
