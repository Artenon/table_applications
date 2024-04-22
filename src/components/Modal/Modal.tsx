import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import block from 'bem-cn-lite';
import PhoneInput from 'react-phone-number-input/input';
import {
  Button,
  Icon,
  Select,
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Text,
  TextInput,
  Modal as UIModal,
} from '@gravity-ui/uikit';
import { DatePicker } from '@gravity-ui/date-components';
import { dateTime, dateTimeParse } from '@gravity-ui/date-utils';
import { Xmark } from '@gravity-ui/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeEditingApplication, changeIsOpen } from '../../redux/slice';
import { useCreateApplicationMutation, useUpdateApplicationMutation } from '../../api/api';
import { IApplication, Status } from '../../types';

import './Modal.scss';

const b = block('modal');

type ModalProps = {
  getAllApplications: () => {};
};

export const Modal: FC<ModalProps> = ({ getAllApplications }) => {
  const dispatch = useAppDispatch();

  const { isEditing, editingApplication, isOpen } = useAppSelector((state) => state.MODAL);

  const { control, handleSubmit, setValue } = useForm<IApplication>({
    defaultValues: {
      atiCode: '',
      carrierName: '',
      carrierPhoneNumber: '',
      clientCompany: '',
      comments: '',
      dateReceived: dateTime().toISOString(),
    },
  });

  const [createApplication, { isLoading: isCreating, isSuccess: isCreateSuccess }] =
    useCreateApplicationMutation();

  const [updateApplication, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useUpdateApplicationMutation();

  const closeHandler = () => {
    dispatch(changeIsOpen(false));
    dispatch(changeEditingApplication(null));
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      getAllApplications();
      closeHandler();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (isOpen) {
      setValue('atiCode', editingApplication ? editingApplication.atiCode : '');
      setValue('carrierName', editingApplication ? editingApplication.carrierName : '');
      setValue(
        'carrierPhoneNumber',
        editingApplication ? editingApplication.carrierPhoneNumber : ''
      );
      setValue('clientCompany', editingApplication ? editingApplication.clientCompany : '');
      setValue('comments', editingApplication ? editingApplication.comments : '');
      setValue(
        'dateReceived',
        editingApplication ? editingApplication.dateReceived : dateTime().toISOString()
      );
      setValue('status', editingApplication ? editingApplication.status : Status.New);
      if (isEditing) {
        setValue('id', editingApplication!.id);
      }
    }
  }, [isEditing, isOpen, editingApplication]);

  const submitHandler: SubmitHandler<IApplication> = (values) => {
    if (isEditing) {
      values.status = Array.isArray(values.status) ? (values.status[0] as Status) : values.status;
      updateApplication(values);
    } else {
      values.status = Status.New;
      createApplication(values);
    }
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
                  onUpdate={(date) => onChange(date?.toISOString())}
                  value={dateTimeParse(value)}
                  label="Время получения заявки от клиента"
                  format="DD.MM.YYYY"
                />
              )}
            />

            <Controller
              control={control}
              name="clientCompany"
              rules={{ required: true }}
              render={({ field, fieldState: { invalid } }) => (
                <TextInput
                  {...field}
                  label="Фирма клиента"
                  error={invalid}
                  errorMessage="Нужно заполнить"
                />
              )}
            />

            <Controller
              control={control}
              name="carrierName"
              rules={{ required: true }}
              render={({ field, fieldState: { invalid } }) => (
                <TextInput
                  {...field}
                  label="ФИО перевозчика"
                  error={invalid}
                  errorMessage="Нужно заполнить"
                />
              )}
            />

            <Controller
              control={control}
              name="carrierPhoneNumber"
              rules={{ required: true }}
              render={({ field, fieldState: { invalid } }) => (
                <div>
                  <div className={`${b('phone')} ${invalid && b('phone__error')}`}>
                    <label className={b('phone__label')} htmlFor="phone">
                      Контактный телефон перевозчика
                    </label>
                    <PhoneInput id="phone" {...field} className={b('phone__input')} />
                  </div>
                  {invalid && <div className={b('error__message')}>Нужно заполнить</div>}
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
              rules={{ required: true }}
              render={({ field, fieldState: { invalid } }) => (
                <TextInput
                  {...field}
                  label="ATI код"
                  error={invalid}
                  errorMessage="Нужно заполнить"
                />
              )}
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
              <Button type="submit" view="action" loading={isCreating || isUpdating}>
                {isEditing ? 'Изменить' : 'Создать'}
              </Button>
              <Button onClick={closeHandler}>Отмена</Button>
            </div>
          </form>
        </div>
      </UIModal>
    </div>
  );
};
