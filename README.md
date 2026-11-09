# VetCare

**VetCare** is a web application designed to support the management of veterinary clinic processes. It allows users to manage information about users, pets, appointments, and medicines through a role-based access system.

## Live Demo

You can access the deployed application through the following link:

**[Visit VetCare](https://vetcare-vxl2.onrender.com/)**

## Demo Accounts

The application provides three predefined accounts so you can explore its features. Choose an account according to the role you want to test:

| Role | Email | Password |
|---|---|---|
| Administrator | `admin@gmail.com` | `Admin1234567` |
| Veterinarian | `vet@gmail.com` | `Vet123456789` |
| Pet Owner | `owner@gmail.com` | `Owner1234567` |

**Important:** These credentials are intended exclusively for testing and demonstration purposes. Do not use personal information or passwords that you use for other services.

All demo accounts share the same testing environment, so changes made to records may be visible to other users who access the application.

## User Roles

VetCare implements a role-based access control system:

- **Administrator (Admin):** Manages user accounts and has access to administrative features.
- **Veterinarian (Vet):** Accesses features related to veterinary care and clinic management.
- **Pet Owner:** Accesses features related to their pets and appointments.

## Main Features

- User login and authentication.
- Role-based access control.
- User management.
- Pet registration and management.
- Veterinary appointment management.
- Medicine management and consultation.
- User and pet information updates.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Server-side development and routing |
| MongoDB Atlas | Cloud database |
| Mongoose | Data modeling and MongoDB integration |
| JavaScript | Client-side and server-side logic |
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| Bootstrap | Responsive design and UI components |
| EJS | Server-side view rendering |
| bcrypt | Password hashing |
| Express-session | Session management |

## Local Installation

To run the project locally, follow these steps:

**1. Clone the repository**

```bash
git clone https://github.com/LunaGar1/vetCare.git
```

**2. Navigate to the project directory**

```bash
cd vetCare
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the project's root directory and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
NODE_ENV=development
```

Replace the example values with your own configuration. Do not share your `.env` file or upload it to the repository.

**5. Start the application**

```bash
npm start
```

The application will be available locally at:

```text
http://localhost:3000
```

## Deployment

The application is deployed on **Render** and uses **MongoDB Atlas** as its cloud database service.

Access the live version here:

[https://vetcare-vxl2.onrender.com/](https://vetcare-vxl2.onrender.com/)

## Authors

- Luna Penagos Garcia
- Sara Murillo

Academic project developed as part of the Computer Engineering program.
