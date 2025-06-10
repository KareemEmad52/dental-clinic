# 🦷 Dental Clinic Management System

## 🌐 Live Demo

Access the app: [Detntal clinic](https://dental-clinic-coral.vercel.app/)

A modern web application for managing dental clinic operations, patient appointments, and medical records.

## ✨ Features

- **Patient Portal**
  - Online appointment booking
  - Treatment history access
  - Prescription downloads
- **Admin Dashboard**
  - Appointment management
  - Patient records system
  - Treatment tracking
- **Core Functionality**
  - Secure authentication
  - Email notifications
  - PDF report generation
  - Responsive mobile-friendly design

## 🛠 Tech Stack

| Category       | Technologies                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Frontend       | Next.js 15, React 19, Tailwind CSS, Radix UI                                |
| Backend        | Next.js API Routes                                                          |
| Database       | Prisma ORM (PostgreSQL)                                                     |
| Authentication | NextAuth.js                                                                 |
| Forms          | React Hook Form + Zod validation                                            |
| State          | TanStack Query                                                              |
| UI Components  | Lucide Icons, Radix UI                                                      |
| Utilities      | date-fns, clsx, tailwind-merge                                              |

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL database
- npm v9+

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/dental-app.git
cd dental-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Database Setup
```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```
### Running the App
```bash
# Development mode
npm run dev

# Production build
npm run build && npm run start
```

## 📂 Project Structure
```bash
dental-app/
├── app/
│   ├── (auth)/               # Authentication routes
│   ├── (portal)/             # Patient portal
│   ├── admin/                # Admin dashboard
│   ├── api/                  # API routes
│   └── ...                   # Public pages
├── components/
│   ├── ui/                   # Radix+Tailwind components
│   ├── forms/                # Form components
│   └── ...                   # Other components
├── lib/
│   ├── auth.ts               # Auth utilities
│   ├── db.ts                 # Database client
│   └── ...                   # Other utilities
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🌐 Environment Variables
Create a .env file in root directory:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dentaldb?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email configuration (for notifications)
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@yourclinic.com"
```


## 📄 Database Schema
Key models in prisma/schema.prisma:
```bash
model User {
  id            String    @id @default(uuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  role          Role      @default(PATIENT)
  // ... other fields
}

model Appointment {
  id        String   @id @default(uuid())
  date      DateTime
  patient   User     @relation(fields: [patientId], references: [id])
  // ... other fields
}

enum Role {
  ADMIN
  DENTIST
  PATIENT
}
```

## 🤝 Contribution

Contributions are welcome and greatly appreciated! To contribute:

1. 🍴 Fork the repository
2. 👯 Clone your fork:  
   ```
   git clone https://github.com/<your-username>/dental-clinic.git
    ```
3. 📦 Install dependencies and create a new branch:
    ```
    cd dental-clinic
    git checkout -b feature/your-feature-name
    ```
4. 🔨 Make your changes
5. ✅ Commit and push your changes:
6. 📬 Open a pull request describing your changes

---

### 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
