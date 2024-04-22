export interface IApplication {
  id: number;
  dateReceived: string;
  clientCompany: string;
  carrierName: string;
  carrierPhoneNumber: string;
  comments: string;
  status: Status;
  atiCode: string;
}

export enum Status {
  New = 'Новая',
  Work = 'В работе',
  Done = 'Завершено',
}
