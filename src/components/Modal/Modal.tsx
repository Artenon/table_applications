import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import block from 'bem-cn-lite';
import PhoneInput from 'react-phone-number-input/input';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Button, Icon, Select, Text, TextInput, Modal as UIModal } from '@gravity-ui/uikit';
import { DatePicker } from '@gravity-ui/date-components';
import { dateTimeParse } from '@gravity-ui/date-utils';
import { Xmark } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeIsOpen } from '../../redux/slice';
import { IApplication, Status } from '../../types';

import './Modal.scss';

const b = block('modal');
// const DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss";

export const Modal: FC = () => {
  const dispatch = useAppDispatch();

  const { isEditing, editingApplication, isOpen } = useAppSelector((state) => state.MODAL);

  const { control, handleSubmit } = useForm<IApplication>();

  const closeHandler = () => dispatch(changeIsOpen(false));

  const submitHandler: SubmitHandler<IApplication> = (values) => {
    if (!isEditing) {
      values.status = Status.New;
    }
    console.log(values);
  };

  return (
    <div>
      <UIModal open={isOpen} onClose={closeHandler}>
        <div className={b()}>
          <div className={b('header')}>
            <Text variant="body-3">{isEditing ? 'Изменение' : 'Создание'} заявки</Text>
            <Button view="flat" onClick={closeHandler}>
              <Icon data={Xmark} />
            </Button>
          </div>

          <form className={b('form')} onSubmit={handleSubmit(submitHandler)}>
            <Controller
              control={control}
              name="dateReceived"
              render={({ field: { name, onChange, value } }) => (
                <DatePicker
                  name={name}
                  onUpdate={onChange}
                  value={dateTimeParse(value)}
                  label="Время получения заявки от клиента"
                  format="DD.MM.YYYY"
                />
              )}
            />

            <Controller
              control={control}
              name="clientCompany"
              render={({ field }) => <TextInput {...field} label="Фирма клиента" />}
            />

            <Controller
              control={control}
              name="carrierName"
              render={({ field }) => <TextInput {...field} label="ФИО перевозчика" />}
            />

            <Controller
              control={control}
              name="carrierPhoneNumber"
              render={({ field }) => (
                <div className={b('phone')}>
                  <label className={b('phone__label')} htmlFor="phone">
                    Контактный телефон перевозчика
                  </label>
                  <PhoneInput id="phone" {...field} className={b('phone__input')} />
                </div>
              )}
            />

            <Controller
              control={control}
              name="comments"
              render={({ field }) => <TextInput {...field} label="Комментарий" />}
            />

            <Controller
              control={control}
              name="atiCode"
              render={({ field }) => <TextInput {...field} label="ATI код" />}
            />

            {isEditing && (
              <Controller
                control={control}
                name="status"
                render={({ field: { name, onChange, value } }) => (
                  <Select label="Статус заявки" value={[value]} onUpdate={onChange} name={name}>
                    <Select.Option value={Status.Work}>{Status.Work}</Select.Option>
                    <Select.Option value={Status.Done}>{Status.Done}</Select.Option>
                  </Select>
                )}
              />
            )}

            <div className={b('actions')}>
              <Button type="submit" view="action">
                Создать
              </Button>
              <Button onClick={closeHandler}>Отмена</Button>
            </div>
          </form>
        </div>
      </UIModal>
    </div>
  );
};
