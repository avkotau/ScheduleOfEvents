# 📅 ScheduleOfEvents

ScheduleOfEvents — это мобильное приложение для управления событиями, разработанное с использованием **React Native**, **TypeScript**, **MobX** и **AsyncStorage**. Поддерживает мультиязычность через **i18next**.

![Демонстрация работы](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3d3b255a3Uwd3ZlcjBxMDA3M2UybDR3bzljYzRtMHdyc2o4NzV1bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4ex75vDwQslFXwOf9c/giphy.gif)

---

## 🚀 Запуск проекта

### 1. Установка зависимостей

Перед запуском необходимо установить все зависимости:

#### Используя npm:
```bash
  npm install
```

#### Используя yarn:
```bash
  yarn install
```

### 2. Запуск проекта

Чтобы запустить приложение, используй одну из команд:

- **Запуск в Expo**:
  ```bash
  npm start
  ```
  ```bash
  yarn start
  ```
- **Запуск на Android**:
  ```bash
  npm run android
  ```
  ```bash
  yarn android
  ```
- **Запуск на iOS** (только на macOS с Xcode):
  ```bash
  npm run ios
  ```
  ```bash
  yarn ios
  ```
- **Запуск в браузере**:
  ```bash
  npm run web
  ```
  ```bash
  yarn web
  ```

---

## 📂 Структура проекта

```bash
src/
│── app/          # Глобальная логика приложения
│   ├── navigations/   # Навигация
│   ├── store/         # MobX-хранилище
│   └── App.tsx
│
│── assets/       # Шрифты, изображения, иконки
│
│── data/         # Локальные данные
│   ├── events.json
│
│── entities/     # Бизнес-сущности
│   ├── event/
│
│── pages/        # Полноценные экраны
│
│── shared/       # Общий код
│   ├── hooks/       # Кастомные хуки
│   ├── i18n/        # Локализация
│   │   ├── locales/
│   ├── styles/      # Глобальные стили
│   ├── util/        # Утилиты
│
└── index.ts       # Главная точка входа
```

---

## 📌 Используемые технологии

- ⚛️ **React Native** — кроссплатформенная разработка
- 💙 **TypeScript** — строгая типизация
- 📦 **MobX** — управление состоянием
- 💾 **AsyncStorage** — локальное хранилище
- 🌍 **i18next** — мультиязычность
- 🔄 **React Navigation** — управление навигацией
- 🕹 **React Native Gesture Handler** — жесты для взаимодействия

```

---
