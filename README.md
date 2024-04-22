Тестовое задание: прототип системы ведения заявок.

Frontend: TypeScript, React, Redux-Toolkit + Query, SCSS, Vite, GravityUI.  
Backend: TypeScript, NestJS, sqlite.

Для запуска нужно:
-
1. Склонировать проект
2. `cd frontend`
	- `npm i`
	- `npm run dev` 
3. `cd backend`
	- `npm i`
	- `npm start` 

БД sqlite в папке db. (создастся автоматически)

REST API
-
| API Route  | Description | Return Type |
| ------------- | ------------- | ------------- |
| GET /  | Возвращает все заявки | IApplication[] |
| POST /  | Создает заявку | IApplication  |
| PUT /:id  | Обновляет заявку | IApplication  |
| DELETE /:id  | Удаляет заявку | - |

```
interface IApplication { 
  id: number;
  dateReceived: string;
  clientCompany: string;
  carrierName: string;
  carrierPhoneNumber: string;
  comments: string;
  status: Status;
  atiCode: string;
}
```

```
type Status = 'Новая' | 'В работе' | 'Завершено'
```
