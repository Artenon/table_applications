import { FC } from 'react';
import { Label } from '@gravity-ui/uikit';
import { Status as StatusType } from '../../types';

type StatusProps = {
  status: StatusType;
};

export const Status: FC<StatusProps> = ({ status }) => (
  <Label
    theme={status === StatusType.New ? 'success' : status === StatusType.Work ? 'info' : 'utility'}
  >
    {status}
  </Label>
);
