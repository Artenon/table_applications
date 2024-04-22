import { useState } from 'react';
import {
  Button,
  Card,
  Icon,
  Link,
  Switch,
  Table,
  TableActionConfig,
  TableColumnConfig,
  TableDataItem,
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Text,
  withTableActions,
  withTableSorting,
} from '@gravity-ui/uikit';
import { ArrowUpRightFromSquare, Plus } from '@gravity-ui/icons';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { Modal } from './components/Modal/Modal';
import { Wrapper } from './components/Wrapper/Wrapper';
import { useAppDispatch, useAppSelector } from './hooks';
import { changeEditingApplication, changeIsEditing, changeIsOpen } from './redux/slice';
import { IApplication, Status } from './types';

const TableActions = withTableActions(Table);
const SortableTable = withTableSorting(TableActions);

export const App = () => {
  const dispatch = useAppDispatch();
  const { editingApplication, isEditing, isOpen } = useAppSelector((state) => state.MODAL);

  const data: IApplication[] = [
    {
      id: 1,
      dateReceived: dateTimeParse('2024-04-20T10:00:00')!,
      clientCompany: 'Company A',
      carrierName: 'John Doe',
      carrierPhoneNumber: '+1234567890',
      comments: 'Urgent delivery needed',
      status: Status.New,
      atiCode: '12345',
    },
    {
      id: 2,
      dateReceived: dateTimeParse('2024-04-19T15:30:00')!,
      clientCompany: 'Company B',
      carrierName: 'Jane Smith',
      carrierPhoneNumber: '+9876543210',
      comments: 'Fragile goods, handle with care',
      status: Status.Done,
      atiCode: '67890',
    },
    {
      id: 3,
      dateReceived: dateTimeParse('2024-04-18T08:45:00')!,
      clientCompany: 'Company C',
      carrierName: 'Alex Johnson',
      carrierPhoneNumber: '+1112223333',
      comments: 'Delivery address changed, please update',
      status: Status.Work,
      atiCode: '13579',
    },
  ];

  const columns: TableColumnConfig<TableDataItem>[] = [
    {
      id: 'id',
      meta: { sort: (a: TableDataItem, b: TableDataItem) => a.id - b.id },
    },
    {
      id: 'dateReceived',
      name: 'Время получения заявки от клиента',
      template: ({ dateReceived }) => new Date(dateReceived).toLocaleString('ru'),
      meta: {
        sort: (a: TableDataItem, b: TableDataItem) =>
          Date.parse(a.dateReceived) - Date.parse(b.dateReceived),
      },
    },
    { id: 'clientCompany', name: 'Фирма клиента' },
    { id: 'carrierName', name: 'ФИО перевозчика' },
    { id: 'carrierPhoneNumber', name: 'Контактный телефон перевозчика' },
    { id: 'comments', name: 'Комментарий' },
    {
      id: 'status',
      name: 'Статус заявки',
      meta: {
        sort: (a: TableDataItem, b: TableDataItem) => {
          if (a.status.toLowerCase() < b.status.toLowerCase()) {
            return -1;
          } else if (a.status.toLowerCase() > b.status.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      id: 'atiCode',
      name: 'ATI код',
      template: ({ atiCode }) => (
        <Link target="_blank" href={`https://ati.su/firms/${atiCode}/info`}>
          {atiCode} <Icon data={ArrowUpRightFromSquare} />
        </Link>
      ),
    },
  ];

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const switchAdminClickHandler = () => setIsAdmin((prev) => !prev);

  const getRowActions: () => TableActionConfig<TableDataItem>[] = () => {
    return isAdmin
      ? [
          {
            text: 'Изменить',
            handler: (item) => {
              dispatch(changeIsEditing(true));
              dispatch(changeEditingApplication(item as IApplication));
              dispatch(changeIsOpen(true));
            },
          },
          {
            text: 'Удалить',
            handler: () => {},
            theme: 'danger',
          },
        ]
      : [];
  };

  const addClickHandler = () => {
    dispatch(changeIsEditing(false));
    dispatch(changeIsOpen(true));
  };

  return (
    <Wrapper>
      <Card>
        <Card
          view="filled"
          theme="info"
          style={{
            padding: '20px 15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '20px' }}>
            <Text variant="body-2">Всего заявок: {data.length}</Text>

            {isAdmin && (
              <>
                <Button onClick={addClickHandler}>
                  <Icon data={Plus} />
                  Добавить заявку
                </Button>
                <Modal />
              </>
            )}
          </div>
          <Switch checked={isAdmin} onChange={switchAdminClickHandler}>
            Режим администратора
          </Switch>
        </Card>
        <SortableTable
          columns={columns}
          data={data}
          getRowActions={getRowActions}
          stickyHorizontalScroll
          wordWrap
        />
      </Card>
    </Wrapper>
  );
};
