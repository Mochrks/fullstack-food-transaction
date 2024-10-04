
<h1 align="center" style="font-family: 'Poppins', sans-serif; font-size: 2.5em; font-weight: bold;">Fullstack Food Transaction Application </h1>

<p align="center" style="font-family: 'Poppins', sans-serif; font-size: 1.5em;">
  A complete fullstack application to manage CRUD API customer, food ,transactions using  technologies.
</p>


<p align="center">
  <img src="../react-project/src/assets/intro/intro.gif" width="700" alt="Demo GIF" />
</p>


<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,express,nestjs,ts,tailwind" alt="Tech Stack Icons" />
</p>

## Project Overview

The **Fullstack Food Transaction** application is built using the following technologies:

### Tech Stack:
- **Express** with **Prisma ORM** and **Joi** for validation
- **NestJS** with **Prisma ORM** and **class-validator**
- **React** with **Vite**, **TypeScript**, **Tailwind CSS**, **Radix UI**, and **Framer Motion**




### Folder Structure:
```bash
fullstack-food-transaction/
│
├── express-project/    # Express backend project
│
├── nest-project/       # NestJS backend project
│
└── react-project/      # React frontend project

```
## Express Project
---------------

<a href="https://www.npmjs.com/package/express" target="_blank"> <img src="https://img.shields.io/npm/v/express.svg" alt="Express Version" /> </a> 
<a href="https://github.com/expressjs/express" target="_blank"> <img src="https://img.shields.io/github/license/expressjs/express.svg" alt="License" /> </a>

### Setup & Installation

- **Clone the repository**
    ```bash
    git clone https://github.com/mochrks/fullstack-food-transaction.git
    cd fullstack-food-transaction/express-project
    ```

- **Install dependencies**
    ```bash
    npm install
    ```

- **Set up Prisma**
    - Generate Prisma client:
        ```bash
        npx prisma generate
        ```

    - Run database migrations:
        ```bash
        npx prisma migrate dev
        ```

- **Run the application**
    ```bash
    npm run dev
    ```

- **API Endpoints**  
  The Express project provides several API endpoints for managing food transactions.

---

## NestJS Project
--------------

<a href="https://www.npmjs.com/~nestjscore" target="_blank"> <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /> </a> 
<a href="https://www.npmjs.com/~nestjscore" target="_blank"> <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /> </a>

### Setup & Installation

- **Navigate to the project directory**
    ```bash
    cd fullstack-food-transaction/nest-project
    ```

- **Install dependencies**
    ```bash
    npm install
    ```

- **Set up Prisma**
    - Generate Prisma client:
        ```bash
        npx prisma generate
        ```

    - Run database migrations:
        ```bash
        npx prisma migrate dev
        ```

- **Run the application**
    ```bash
    npm run start
    ```

- **API Endpoints**  
  The NestJS project provides additional API functionalities for managing food transactions with enhanced validation using `class-validator`.

---
## React Project
----------------

<a href="https://vitejs.dev" target="_blank"> <img src="https://img.shields.io/badge/vite-%5E3.0-blue" alt="Vite Version" /> </a> 
<a href="https://reactjs.org/" target="_blank"> <img src="https://img.shields.io/npm/v/react.svg" alt="React Version" /> </a>

### Setup & Installation

- **Navigate to the project directory**
    ```bash
    cd fullstack-food-transaction/react-project
    ```

- **Install dependencies**
    ```bash
    npm install
    ```

- **Run the application**
    ```bash
    npm run dev
    ```

- **Frontend UI**  
  The React project uses **Tailwind CSS** for styling, **Radix UI** for components, and **Framer Motion** for animations. It connects to the backend APIs to display and manage food transactions.

---

## Running the Fullstack Application
-------------------------------------

To run the full application:

- **Start both backend projects:**

  - **Express backend:**
    ```bash
    cd fullstack-food-transaction/express-project
    npm run dev
    ```

  - **NestJS backend:**
    ```bash
    cd fullstack-food-transaction/nest-project
    npm run start
    ```

- **Start the React frontend:**
    ```bash
    cd fullstack-food-transaction/react-project
    npm run dev or npm run start
    ```

---


---

## Connect with me:
[![GitHub](https://img.shields.io/badge/GitHub-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mochrks)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@Gdvisuel)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/mochrks)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mochrks)
[![Behance](https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://behance.net/mochrks)
[![Dribbble](https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white)](https://dribbble.com/mochrks)