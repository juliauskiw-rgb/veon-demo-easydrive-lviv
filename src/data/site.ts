// Facts for the homepage: only from veon/client.json (and audit/notes/business.md for landmarks).
// Nothing here is invented: no ratings, counters, full B price or A/C prices.

export interface Phone { tel: string; short: string; full: string; operator: string; }

export const phones: Phone[] = [
  { tel: "+380980707076", short: "098 07-07-076", full: "+38 (098) 07-07-076", operator: "Київстар" },
  { tel: "+380730707076", short: "073 07-07-076", full: "+38 (073) 07-07-076", operator: "lifecell" },
  { tel: "+380500707076", short: "050 07-07-076", full: "+38 (050) 07-07-076", operator: "Vodafone" },
];
export const mainPhone = phones[0];

export const email = "office@easydrive.lviv.ua";
export const hours = { text: "Пн–Пт, 10:00–18:00", schema: "Mo-Fr 10:00-18:00" };

// socials[] with status confirmed in client.json
export const socials = {
  instagram: { name: "Instagram", handle: "@easy_drive_lviv", url: "https://www.instagram.com/easy_drive_lviv" },
  facebook: { name: "Facebook", handle: "Easy Drive Автошкола", url: "https://www.facebook.com/people/Easy-Drive-%D0%90%D0%B2%D1%82%D0%BE%D1%88%D0%BA%D0%BE%D0%BB%D0%B0/100064175558553/" },
  tiktok: { name: "TikTok", handle: "@easy_drive_lviv", url: "https://www.tiktok.com/@easy_drive_lviv" },
};
export const mapUrl = "https://maps.app.goo.gl/vTAcyiUA1ZeJ6kjj7";

export interface Branch { town: string; street: string; landmark?: string; locality: string; }

// company.geography; landmarks — audit/notes/business.md (сторінка «Філії» сайту клієнта)
export const branches: Branch[] = [
  { town: "Львів", street: "вул. Володимира Великого, 12", landmark: "Коледж телекомунікацій та комп’ютерних технологій", locality: "Львів" },
  { town: "Львів", street: "вул. Героїв Крут, 1В", landmark: "Тернопільська", locality: "Львів" },
  { town: "Львів", street: "вул. Пасічна, 166", landmark: "ЖК «ХЮГЕ»", locality: "Львів" },
  { town: "Львів", street: "просп. В. Чорновола, 67", locality: "Львів" },
  { town: "Винники", street: "вул. Галицька, 14Б", locality: "Винники" },
  { town: "Рясне", street: "вул. Шевченка, 366В", locality: "Рясне" },
];

export const route = [
  { id: "categories", label: "Категорія" },
  { id: "branches", label: "Філія" },
  { id: "theory", label: "Теорія" },
  { id: "practice", label: "Практика і ТСЦ" },
  { id: "finish", label: "Запис" },
] as const;

export const FUTURE = "Розділ у розробці";
