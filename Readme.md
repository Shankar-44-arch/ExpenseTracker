# Expense Tracker

Expense Tracker is a Django-based personal finance application for tracking income, expenses, categories, budgets, reports, and stock information in one place.

## Features

- User authentication: sign up, log in, log out, profile update, password change, and account deletion.
- Dashboard with income, expense, savings, recent transactions, and category summaries.
- Transaction management with add, edit, delete, filter, and date-based views.
- Category management with custom icons and descriptions.
- Budget alerts to monitor category spending.
- Reports with monthly trends and category breakdowns.
- Export reports to CSV, Excel, PDF, and image formats.
- Stock views and stock detail pages with API support.
- Built-in calculator page.

## Tech Stack

- Python 3
- Django 6
- PostgreSQL for production
- SQLite for local development
- WhiteNoise for static file handling in production
- Gunicorn as the production WSGI server

## Project Structure

- `expense_tracker/` contains the Django project settings, URL routing, ASGI, and WSGI configuration.
- `myapp/` contains the main application code, models, views, URLs, and migrations.
- `templates/` contains the HTML templates.
- `static/` contains CSS, JavaScript, and image assets.
- `db.sqlite3` is the local development database.

## Setup

### 1. Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file in the project root. Use `.env.example` as the reference.

Required values:

- `SECRET_KEY`
- `DEBUG`
- `ALLOWED_HOSTS`
- `CSRF_TRUSTED_ORIGINS`
- Database settings: `DB_ENGINE`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`

Example:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:8000,http://localhost:8000
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3
```

### 4. Run migrations

```bash
python manage.py migrate
```

### 5. Create a superuser

```bash
python manage.py createsuperuser
```

### 6. Start the development server

```bash
python manage.py runserver
```

## Deployment Notes

- Set `DEBUG=False` in production.
- Use a strong, unique `SECRET_KEY`.
- Configure `ALLOWED_HOSTS` for your domain.
- Set `CSRF_TRUSTED_ORIGINS` to the deployed HTTPS URL(s).
- Use a production database, typically PostgreSQL.
- Run `python manage.py collectstatic` before deploying static assets.

## Screenshots

Add project images here once they are available.

### Login Page

<!-- TODO: Add login page screenshot here -->
<!-- Example: ![Login Page](docs/images/login-page.png) -->

### Dashboard

<!-- TODO: Add dashboard screenshot here -->
<!-- Example: ![Dashboard](docs/images/dashboard.png) -->

### Transactions

<!-- TODO: Add transactions screenshot here -->
<!-- Example: ![Transactions](docs/images/transactions.png) -->

### Reports

<!-- TODO: Add reports screenshot here -->
<!-- Example: ![Reports](docs/images/reports.png) -->

### Categories

<!-- TODO: Add categories screenshot here -->
<!-- Example: ![Categories](docs/images/categories.png) -->

## Useful URLs

- `/` - Dashboard
- `/login/` - Login page
- `/signup/` - Registration page
- `/transaction/` - Transaction list
- `/categories/` - Category management
- `/report/` - Reports page
- `/alerts/` - Budget alerts
- `/stocks/` - Stock list

## Notes

- The app creates default categories for a new user.
- Income transactions automatically use the category `Income`.
- Static files are served through WhiteNoise in production.
