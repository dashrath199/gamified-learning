# Gamified Learning Platform

This is a production-ready Gamified Learning web application for grades 6–12 built with Python, Django, and Tailwind CSS. It features user authentication, subject-specific games, gamification elements like XP and badges, leaderboards, and a teacher/admin management system.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
  - [Local Development (Virtual Environment)](#local-development-virtual-environment)
  - [Docker Development](#docker-development)
- [Running the Application](#running-the-application)
- [Seeding Demo Data](#seeding-demo-data)
- [Running Tests](#running-tests)
- [API Reference](#api-reference)
- [How to Extend](#how-to-extend)
- [Commit History Philosophy](#commit-history-philosophy)

## Architecture Overview

The application follows a monolithic architecture with a clear separation of concerns using Django apps.

-   **Backend**: Django serves as the core framework. Django REST Framework (DRF) provides a powerful API for the frontend to consume.
-   **Frontend**: The frontend is server-rendered using Django Templates. Interactivity, especially for games, is handled by vanilla JavaScript which communicates with the DRF backend. Tailwind CSS is used for styling, providing a responsive, mobile-first design.
-   **Database**: PostgreSQL is the production database, with SQLite available as a fallback for simple local development.
-   **Authentication**: API authentication is handled by JSON Web Tokens (JWT) using `djangorestframework-simplejwt`.
-   **Containerization**: The entire application stack (web server, database, redis) is containerized using Docker and Docker Compose for easy setup and deployment.

## Features

-   **User Roles**: Students, Teachers, and Admins with different permissions.
-   **Gamification**: XP points, leveling system, and unlockable badges.
-   **Interactive Games**: Working examples for Math (MCQ), Science (Sequencing), and English (Fill-in-the-blanks).
-   **Progress Tracking**: Students can view their scores, history, and achievements.
-   **Leaderboards**: Global and grade-specific leaderboards.
-   **Content Management**: Django Admin is configured for managing grades, subjects, games, and questions.

## Tech Stack

-   **Backend**: Python 3.11+, Django, Django REST Framework
-   **Frontend**: Django Templates, Tailwind CSS, Vanilla JavaScript
-   **Database**: PostgreSQL (production), SQLite (development)
-   **Authentication**: JWT (djangorestframework-simplejwt)
-   **Containerization**: Docker, Docker Compose
-   **Testing**: Pytest, Factory Boy

## Setup and Installation

### Local Development (Virtual Environment)

1.  **Prerequisites**: Python 3.11+, PostgreSQL (optional, can use SQLite), Node.js & npm.

2.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/gamified-learning.git](https://github.com/your-username/gamified-learning.git)
    cd gamified-learning
    ```

3.  **Create and activate a virtual environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

4.  **Install Python dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

5.  **Install frontend dependencies**:
    ```bash
    npm install
    ```

6.  **Setup environment variables**:
    ```bash
    cp .env.example .env
    ```
    Edit `.env` to use SQLite for easy setup: `DATABASE_URL=sqlite:///db.sqlite3` or configure it for your local PostgreSQL instance.

7.  **Run database migrations**:
    ```bash
    python manage.py migrate
    ```

### Docker Development

1.  **Prerequisites**: Docker and Docker Compose.

2.  **Clone the repository**:
    ```bash
    git clone [https://github.com/your-username/gamified-learning.git](https://github.com/your-username/gamified-learning.git)
    cd gamified-learning
    ```

3.  **Setup environment variables**:
    ```bash
    cp .env.example .env
    ```
    The default `.env` file is configured for Docker. No changes are needed.

4.  **Build and run the containers**:
    ```bash
    docker-compose up --build -d
    ```

5.  **Run database migrations**:
    ```bash
    docker-compose exec web python manage.py migrate
    ```

## Running the Application

-   **Local**:
    -   Run the Tailwind CSS watcher in a separate terminal: `npm run watch:css`
    -   Run the Django development server: `python manage.py runserver`
    -   Access the app at `http://127.0.0.1:8000`.

-   **Docker**:
    -   The app is already running after `docker-compose up`.
    -   Access the app at `http://localhost:8000`.

## Seeding Demo Data

A management command is provided to populate the database with sample data (users, subjects, games, questions).

-   **Local**:
    ```bash
    python manage.py seed_demo
    ```
-   **Docker**:
    ```bash
    docker-compose exec web python manage.py seed_demo
    ```

This will create:
- An admin user: `admin@example.com` (password: `adminpass`)
- A teacher user: `teacher@example.com` (password: `teacherpass`)
- 5 students for grades 6, 9, and 12. Example: `student_6_1@example.com` (password: `studentpass`)
- Subjects, games, questions, and sample results.

## Running Tests

-   **Local**:
    ```bash
    pytest
    ```
-   **Docker**:
    ```bash
    docker-compose exec web pytest
    ```

## API Reference

Base URL: `/api/v1/`

| Endpoint                      | Method | Auth      | Description                               | Sample Request Body                                                              |
| ----------------------------- | ------ | --------- | ----------------------------------------- | -------------------------------------------------------------------------------- |
| `/auth/register/`               | POST   | None      | Register a new student user.              | `{"email": "...", "password": "...", "full_name": "...", "grade_id": 1}`          |
| `/auth/login/`                  | POST   | None      | Obtain JWT access and refresh tokens.     | `{"email": "...", "password": "..."}`                                            |
| `/auth/token/refresh/`          | POST   | None      | Refresh an access token.                  | `{"refresh": "..."}`                                                             |
| `/grades/`                      | GET    | Token     | Get a list of all grades.                 | -                                                                                |
| `/subjects/?grade_id={id}`      | GET    | Token     | Get subjects for a specific grade.        | -                                                                                |
| `/games/{id}/`                  | GET    | Token     | Get details and questions for a game.     | -                                                                                |
| `/games/{id}/submit/`           | POST   | Token     | Submit game results.                      | `{"answers": [...], "time_taken": 120}`                                          |
| `/leaderboard/`                 | GET    | Token     | Get leaderboard data (filter by grade).   | -                                                                                |
| `/users/me/progress/`           | GET    | Token     | Get the current user's progress.          | -                                                                                |

## How to Extend

### Adding a New Subject

1.  Log in to the Django Admin (`/admin`).
2.  Go to the "Subjects" section and click "Add subject".
3.  Fill in the details (name, description) and associate it with the relevant grades.
4.  Go to the "Games" section and create a new game, linking it to your new subject.
5.  Add questions to the newly created game.

### Adding a New Game Type

1.  Add a new choice to the `Game.GameType` choices in `apps/games/models.py`.
2.  Create a corresponding HTML template for the game in `apps/games/game_types/`.
3.  Update the `game_engine.js` file in `static/js/` to include the rendering and logic for your new game type.
4.  Update the score calculation logic in `apps/progress/services.py` if the new game has unique scoring rules.

## Commit History Philosophy

Commits in this repository aim to be atomic and descriptive, following a feature-based approach.
-   **feat:** A new feature (e.g., `feat: Add leaderboard API and page`)
-   **fix:** A bug fix (e.g., `fix: Correct XP calculation for time bonus`)
-   **docs:** Documentation changes (e.g., `docs: Update README with API reference`)
-   **style:** Code style changes, no functional impact (e.g., `style: Run black formatter`)
-   **refactor:** Code changes that neither fix a bug nor add a feature (e.g., `refactor: Move game logic to services`)
-   **test:** Adding or refactoring tests (e.g., `test: Add tests for badge awarding`)
-   **chore:** Build process or auxiliary tool changes (e.g., `chore: Configure Docker for production`)

This approach makes the project history readable and easy to navigate.