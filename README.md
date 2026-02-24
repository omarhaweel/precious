# precious
Luxury app

## Architecture

- **Frontend**: React Native (Expo) — `frontend/`
- **Backend**: Spring Boot — `backend/`

---

## Frontend (React Native)

The frontend is a React Native app built with [Expo](https://expo.dev/).

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup & Run

```bash
cd frontend
npm install
npm start
```

Then press `a` (Android), `i` (iOS), or `w` (web) in the terminal.

### Configuration

The backend API URL is configured in `frontend/App.js`:

```js
const API_BASE_URL = 'http://localhost:8080/api';
```

Update this to match your backend host when deploying.

---

## Backend (Spring Boot)

The backend is a Spring Boot REST API with JPA and an H2 in-memory database for development.

### Prerequisites
- Java 17+
- Maven 3.9+

### Setup & Run

```bash
cd backend
./mvnw spring-boot:run
```

The server starts on `http://localhost:8080`.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List available products |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/category/{category}` | List products by category |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/{id}` | Update a product |
| DELETE | `/api/products/{id}` | Delete a product |

### H2 Console (development)

Visit `http://localhost:8080/h2-console` with JDBC URL `jdbc:h2:mem:preciousdb`.

---

## Project Structure

```
precious/
├── frontend/          # React Native (Expo) app
│   ├── App.js         # Main application component
│   ├── app.json       # Expo config
│   └── package.json
└── backend/           # Spring Boot API
    ├── pom.xml
    └── src/
        └── main/
            └── java/com/precious/
                ├── PreciousApplication.java
                ├── SecurityConfig.java
                ├── controller/
                │   └── ProductController.java
                ├── model/
                │   └── Product.java
                ├── repository/
                │   └── ProductRepository.java
                └── service/
                    └── ProductService.java
```
