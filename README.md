# Foody

A full-stack food discovery and menu-management application built with Angular, FastAPI and MySQL.

It is more than a static UI: visitors can browse cuisines, users can create accounts and sign in, and an admin can add, edit and remove dishes.

## Highlights

- Cuisine browsing: Tunisian, Italian, Asian, French and desserts
- Signup/login backed by MySQL
- Admin CRUD for menu items
- Client-side shopping cart persisted in the browser
- Responsive Angular views
- REST API between the Angular client and MySQL
- Parameterized SQL and environment-based credentials
- PBKDF2-SHA256 password hashing, with a one-time upgrade path for legacy demo passwords

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | Angular 11, TypeScript, Bootstrap |
| Backend | Python, FastAPI |
| Database | MySQL / MariaDB |
| Testing | Jasmine / Karma |

## Structure

```text
.
├── Backend/
│   ├── MyDB/main.py
│   ├── requirements.txt
│   └── .env.example
├── FrontEnd/Projet/
│   └── src/app/
├── DataBase/
├── UI/
└── UX/
```

## Visual preview

These are real visual assets already used by the application, not AI-generated mockups.

| Home / discovery | Cuisine |
| --- | --- |
| ![Foody home](FrontEnd/Projet/src/assets/img/davide-cantelli-jpkfc5_d-DI-unsplash.jpg) | ![Tunisian cuisine](FrontEnd/Projet/src/assets/img/download%20(1).jpeg) |

| Italian | Dessert |
| --- | --- |
| ![Italian food](FrontEnd/Projet/src/assets/img/images%20(4).jpeg) | ![Dessert](FrontEnd/Projet/src/assets/img/172529788_263322302158547_5830114650943138358_n.jpeg) |

> These images are application assets rather than runtime screenshots. Once the app is running locally, add browser screenshots here to document the real home, login, menu and admin CRUD flows without pretending a mockup is a product capture.

## Run locally

### Database

Import the SQL files in `Backend/sql/` into MySQL/MariaDB. The project uses two databases: `Webclient` for accounts and `testDB` for dishes.

Create a dedicated database user, then copy `Backend/.env.example` to `Backend/.env` and set the credentials.

### API

```bash
cd Backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn MyDB.main:app --reload --port 8000
```

Check `http://127.0.0.1:8000/health`.

### Angular

```bash
cd FrontEnd/Projet
npm install
ng serve
```

Open `http://localhost:4200`.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | API/database health |
| POST | `/forum` | Create account |
| POST | `/login` | Authenticate |
| GET | `/tunisian`, `/italian`, `/asian`, `/french`, `/dessert` | Browse dishes |
| POST | `/add` | Add dish |
| POST | `/update1` … `/update5` | Update dish |
| DELETE | `/delete1` … `/delete5` | Delete dish |

## What was improved

- Removed SQL string interpolation from authentication and CRUD.
- Removed hard-coded MySQL root credentials.
- Added API input validation and safe category allow-lists.
- Added password hashing and legacy-password upgrade.
- Added a health endpoint.
- Removed committed OS metadata and Python bytecode.
- Updated frontend auth to send JSON and handle HTTP errors.
- Rewrote the README around the actual product and engineering decisions instead of the original Angular template.

## Honest limitations

This remains a student project, so the README does not oversell it as production-ready. For a production deployment I would add JWT/session authentication, role-based authorization for admin routes, database migrations, automated API tests, external image storage and CI/CD deployment.

## Authors

Imen Abid · Eya Araari · Rayen Trablsi