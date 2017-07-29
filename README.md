h1 # Vacancies
=====================
h2 Общая информация
-----------------------------------
Данное приложение предназначено для визуализации данных вакансий с сайта hh.ru.
### h3 Файлы
Название файла  | Содержание файла
----------------|----------------------
style.css       | Файл каскадной таблицы стилей, cодержащая все необходимые стили
index.html      | Главная страница сайта
connection.json | Файл,содержащий данные для формирования ссылки на источник данных
index.js        | Файл,содержащий базовые функции приложения
navigation.js   | Файл,содержащий функции для пагинации страниц
visualisation.js| Файл,содержащий функции для работы с графиком и картой
### Получение данных 
Программа формирует ссылку для загрузки json файла ,используя данные из файла connect.json.
Пример данных: 
{
    "url":"https://api.hh.ru/vacancies",
    "per_page":"50",
    "page":"1",
    "order_by":"publication_time",
    "area":"43"
}
Полученная ссылка:https://api.hh.ru/vacancies?per_page=50&page=1&order_by=publication_time&area=43;
### Визуализация данных
Пользователю доступно несколько элементов визуализации:
*график
*карта
*список
.
### Фильтрация данных
### Навигация
#Навигация
Для удобства просмотра вакансий пользователь может выбрать количество отображаемых вакансий на странице.
#Помошь
Для получения инструкций по работе с сайтом необходимо нажать на кнопку "Помошь".
