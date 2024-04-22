import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Icon,
  Link,
  Loader,
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
import { Modal } from './components/Modal/Modal';
import { Wrapper } from './components/Wrapper/Wrapper';
import { useAppDispatch } from './hooks';
import { changeEditingApplication, changeIsEditing, changeIsOpen } from './redux/slice';
import { IApplication, Status } from './types';
import { useDeleteApplicationMutation, useGetAllApplicationsQuery } from './api/api';

const TableActions = withTableActions(Table);
const SortableTable = withTableSorting(TableActions);

export const App = () => {
  const dispatch = useAppDispatch();

  const { data, isFetching, isError, refetch } = useGetAllApplicationsQuery('getAll');

  const [deleteApplication, { isSuccess }] = useDeleteApplicationMutation();

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
    {
      id: 'clientCompany',
      name: 'Фирма клиента',
      meta: {
        sort: (a: TableDataItem, b: TableDataItem) => {
          if (a.clientCompany.toLowerCase() < b.clientCompany.toLowerCase()) {
            return -1;
          } else if (a.clientCompany.toLowerCase() > b.clientCompany.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
    {
      id: 'carrierName',
      name: 'ФИО перевозчика',
      meta: {
        sort: (a: TableDataItem, b: TableDataItem) => {
          if (a.carrierName.toLowerCase() < b.carrierName.toLowerCase()) {
            return -1;
          } else if (a.carrierName.toLowerCase() > b.carrierName.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
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

  const [hideFinished, setHideFinished] = useState<boolean>(false);

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
            handler: ({ id }) => {
              deleteApplication({ id });
            },
            theme: 'danger',
          },
        ]
      : [];
  };

  const addClickHandler = () => {
    dispatch(changeIsEditing(false));
    dispatch(changeIsOpen(true));
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  const filteredData = data?.filter((e) => {
    if (hideFinished) {
      return e.status !== Status.Done;
    } else {
      return e;
    }
  });

  if (isFetching) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader size="l" />
      </div>
    );
  }

  if (!filteredData || !data || isError) {
    return <div>ERROR</div>;
  }

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
            <Checkbox
              size="l"
              checked={hideFinished}
              onChange={(e) => setHideFinished(e.target.checked)}
            >
              Скрыть завершенные заявки
            </Checkbox>
            <Text variant="body-2">Всего заявок: {data.length}</Text>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '20px' }}>
            {isAdmin && (
              <>
                <Button onClick={addClickHandler}>
                  <Icon data={Plus} />
                  Добавить заявку
                </Button>
                <Modal getAllApplications={refetch} />
              </>
            )}
            <Switch checked={isAdmin} onChange={switchAdminClickHandler}>
              Режим администратора
            </Switch>
          </div>
        </Card>
        <SortableTable
          columns={columns}
          data={filteredData}
          getRowActions={getRowActions}
          stickyHorizontalScroll
          wordWrap
        />
      </Card>
    </Wrapper>
  );
};
