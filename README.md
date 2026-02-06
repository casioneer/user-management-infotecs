# Проект: Система управления пользователями

Простое приложение для управления списком пользователей. Сделано в рамках тестового задания.

**Репозиторий:** [https://github.com/casioneer/user-management-infotecs](https://github.com/casioneer/user-management-infotecs)

## Основной стек
- React 16 + TypeScript
- Ant Design 5 (UI) + Styled-components
- TanStack Query (кеширование) + Axios
- Webpack (сборка)
- FSD Architecture (структура проекта)

## Как запустить
1. `npm install` — установка зависимостей.
2. `npm start` — запуск в dev-режиме (откроется на http://localhost:3000).
3. `npm run build` — собрать проект в папку `dist`.

## Авторизация
Вход в систему:
- Логин: `admin`
- Пароль: `admin`

Токен сохраняется в localStorage. Если токена нет, приложение всегда редиректит на страницу логина.

## Особенности
- Используется **MockAPI** для хранения данных.
- Данные кешируются через Query, при создании/редактировании/удалении список обновляется автоматически.
- Даты форматируются через `dayjs` в формате `DD.MM.YYYY`.
- Архитектура проекта — **FSD**. Код разбит на функциональные слои: `app`, `pages`, `features`, `entities`, `shared`.

---
Автор: @casioneer
