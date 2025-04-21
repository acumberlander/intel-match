export type Crime = {
  _id: string;
  person: string;
  vehicle?: string;
  type: string;
  date: Date;
  notes: string;
};
