# Приложение для загрузки файлов и поиска

Данный репозиторий содержит приложение, которое позволяет пользователям загружать csv и xlsx файлы и выполнять поиск по ним. Следуйте инструкциям ниже, чтобы клонировать репозиторий, собрать приложение и запустить его локально.

## Начало работы

### Необходимые условия

- Docker
- Docker Compose

### Установка

1. **Клонируйте репозиторий:**

    ```bash
    git clone https://github.com/petrnaumenko/file_upload_search.git
    ```

2. **Перейдите в папку проекта:**

    ```bash
    cd file_upload_search
    ```

3. **Соберите и запустите приложение:**

    ```bash
    docker compose up --build
    ```

### Использование

После успешной сборки и запуска приложения откройте веб-браузер и перейдите по адресу:

[http://localhost:8000/](http://localhost:8000/)

### Дополнительная информация

- Убедитесь, что Docker запущен на вашем компьютере перед выполнением команд.
- Чтобы остановить приложение, нажмите `Ctrl + C` в терминале, а затем выполните команду:

    ```bash
    docker compose down
    ```

## Лицензия

Этот проект лицензирован по лицензии MIT. См. файл [LICENSE](LICENSE) для подробной информации.

## Контакты

Если у вас есть вопросы или предложения, свяжитесь с автором:

- **GitHub:** [Petr Naumenko](https://github.com/petrnaumenko)

Приятного использования приложения для загрузки файлов и поиска!
