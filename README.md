🚀 Dev Derejawu Learning Hub

A modern full-stack learning management platform built with Next.js, TypeScript, Supabase, and TailwindCSS, designed to help developers master technologies through structured content, exercises, and real-world projects.

Live Demo:
👉 https://devderejawulearninghub.vercel.app

GitHub ripo: hh

Dev Derejawu Learning Hub is a structured educational platform that provides: Notes, Videos, Exercises and Projects.

Content is organized by:

Category (Frontend, Backend, Database, API)

Technology (HTML, CSS, JavaScript, TypeScript, React, Node.js, etc.)

Parts (Step-by-step progression inside each tech stack)

Content Type (Video, Note, Exercise, Project)

The platform includes both: Admin Dashboard and User Dashboard

🛠 Tech Stacks : Next.js, TypeScript ,TailwindCSS, shadcn/ui, Supabase,  Row Level Security (RLS)

🔐 Authentication & Authorization

Supabase handles: User authentication, Role-based access control, Row Level Security (RLS) for secure CRUD operations, Secure submission tracking, Public message handling (no login required)

👨‍💼 Admin Dashboard Features

Admins can:

✅ Add content (Notes, Videos, Projects, Exercises)

✅ Update content

✅ Delete content

✅ Filter content by:

Category (Frontend, Backend, Database, API)

Type (Video, Exercise, Note, Project)

Tech Stack (HTML, CSS, JS, TS, React, Node.js, etc.)

✅ Organize content by parts within each tech

✅ Manage structured learning flow

👨‍🎓 User Dashboard Features

Users can:

📊 View total completed: Projects, Notes, Exercises

📈 See progress visualized with: Bar Graph, Pie Chart

📚 Navigate learning path:

Category → Tech → Part → Content

📤 Submit: Notes, Exercises, Projects



🧠 Learning Structure

Each learning path follows this structure:

Category
  |____ Tech Stack
        |__ Part (1, 2, 3...)
              |── Note
              ├── Exercise
              ├── Project
              └── Video

This ensures:Progressive learning, Structured knowledge building, Practical application, Clear tracking of mastery, Database Schema & Relationships

The platform uses PostgreSQL via Supabase.

There are 6 tables and explained as follow.

1️⃣ categories Table

Stores main learning domains.

categories
- id (uuid, PK)
- name (unique)

Example:Frontend, Backend, Database, API

2️⃣ content_types Table

Defines the type of learning material.

content_types
- id (uuid, PK)
- name (unique)

Example: Vide, Note, Exercise, Project

3️⃣ tech Table

Each technology belongs to a category.

tech
- id (uuid, PK)
- name (unique)
- category_id (FK → categories.id)

Example: React → Frontend, Node.js → Backend, MySQL → Database

Relationship: categories (1) → tech (many)

4️⃣ contents Table

Core learning material table.

contents- id (uuid, PK), title, description, content_type_id (FK → content_types.id), category_id (FK → categories.id), tech_id (FK → tech.id), content (text or storage reference), created_by (FK → auth.users.id),  part (integer), created_at, updated_at

Relationships:
categories (1) → contents (many)
content_types (1) → contents (many)
tech (1) → contents (many)
auth.users (1) → contents (many)

This enables: Multi-level filtering, Structured part-based progression, Role-controlled content creation

5️⃣ submitted_projects_note_exercise table

Tracks user submissions.

submitted_project_note_exercise: id (uuid, PK), content_id (FK → contents.id), submitted_by (FK → auth.users.id), submitted_at, updated_at.

Relationships: contents (1) → submissions (many), auth.users (1) → submissions (many)

Used for: Progress tracking, Completion statistics, Dashboard analytics

6️⃣ messages Table
Accepts messages from anyone (authenticated or not).

messages: id (uuid, PK), name, email,  message, created_at

Used for: Contact form, Feedback collection, Public inquiries

🔐 Row Level Security (RLS)

All tables implement secure CRUD access policies.

Admin: Full CRUD

Users: Restricted access

Submissions: User-specific access

Messages: Public insert allowed

Ensures: Secure data access, Proper role isolation, Production-ready security model

📊 Progress Analytics

User dashboard calculates:

Total contents per type

Completed submissions

Aggregated by category

Aggregated by content type

Visualized with: Bar charts, Pie charts

🚀 Deployment

Frontend deployed on: Vercel

Backend powered by: Supabase

  Author
Built by Derejawu

Full Stack Developer focused on building structured, real-world educational platforms.

📜 License

This project is for educational and portfolio purposes.
