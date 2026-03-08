const TASHKEEL = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g;

export const removeTashkeel   = (t: string) => t.replace(TASHKEEL, "");
export const removeTatweel    = (t: string) => t.replace(/\u0640/g, "");
export const removeAll        = (t: string) => removeTatweel(removeTashkeel(t));
export const countTashkeel    = (t: string) => (t.match(TASHKEEL) ?? []).length;
