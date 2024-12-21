const currentYear = new Date().getFullYear();
const calculating = [
  { id: 0, key: "წელი", value: "" },
];
for (let year = 2010; year <= currentYear; year++) {
  calculating.push({ value: year, key: year });
}

export const years = calculating;

export const months = [
  { id: 0, key: "თვე", value: "", enValue: "" },
  { id: 1, key: "იან", value: "იანვარი", enValue: "January" },
  { id: 2, key: "თებ.", value: "თებერვალი", enValue: "February" },
  { id: 3, key: "მარ.", value: "მარტი", enValue: "March" },
  { id: 4, key: "აპრ.", value: "აპრილი", enValue: "April" },
  { id: 5, key: "მაი.", value: "მაისი", enValue: "May" },
  { id: 6, key: "ივნ.", value: "ივნისი", enValue: "June" },
  { id: 7, key: "ივლ.", value: "ივლისი", enValue: "July" },
  { id: 8, key: "აგვ.", value: "აგვისტო", enValue: "August" },
  { id: 9, key: "სექტ.", value: "სექტემბერი", enValue: "September" },
  { id: 10, key: "ოქტ.", value: "ოქტომბერი", enValue: "October" },
  { id: 11, key: "ნოემ.", value: "ნოემბერი", enValue: "November" },
  { id: 12, key: "დეკ.", value: "დეკემბერი", enValue: "December" },
];
