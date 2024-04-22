import { DateTime } from '@gravity-ui/date-utils';

export interface IApplication {
  id: number;
  dateReceived: DateTime;
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
