# Chitchat

## Overview

Chitchat is a real-time group chat web application built using HTML, CSS, JavaScript and Socket.io. This facilitates user to create room or join the existing room, where they can communicate with other users using messages.

## Local Installation

1. Make sure you have redis server up and running.
2. Create a `.env` file in the project's root directory and copy the contents from `.env.sample`.
   Note: Must be `REDIS_DEV_CLIENT_URL="redis://localhost:6379"`

3. Install Dependencies

```
npm install
```

4. Run the development server

```
npm run dev
```

5. Open [http://localhost:5000](http://localhost:5000)

## Docker Installation

1. Create a `.env` file in the project's root directory and copy the contents from `.env.sample`.
   Note: Must be `REDIS_DEV_CLIENT_URL="redis://redis:6379"`

2. Run docker

```
docker compose up --build
```

3. Open [http://localhost:5000](http://localhost:5000)

Happy Coding !!
