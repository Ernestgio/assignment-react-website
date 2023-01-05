import moment from "moment";

export const convertToIdr = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(amount).replace("Rp", "IDR");
};

export const convertToNumString = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(amount).replace("Rp", "");
};

export const convertDate = (date: string): string => {
  const momentDate = moment(date, "YYYY-MM-DD kk:mm:ss.SSSSSS ZZ UTC", true);
  return moment.utc(momentDate).format("kk:mm - DD MMMM YYYY");
};
