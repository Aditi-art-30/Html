# AgriTracing - Django Project

A simple Django-based agriculture tracing website.

## Setup
1. Create/activate a virtual environment.
2. Install packages:
   `pip install -r requirements.txt`
3. Run migrations:
   `python manage.py migrate`
4. Start server:
   `python manage.py runserver`
5. Open: http://127.0.0.1:8000/

## Main features
- Home page
- Product traceability records
- Search by crop/product and farmer
- Add tracing record
- Admin-ready Django structure


## Default Django Admin Login
After running `python manage.py migrate`, use:
- Username: `admin`
- Password: `admin`

Admin URL: http://127.0.0.1:8000/admin/
