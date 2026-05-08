

# Notes App – Full Stack Projekt (Spring Boot + React)

Dieses Projekt ist eine vollständige Full‑Stack Anwendung zur Verwaltung von Notizen.  
Es besteht aus einem Spring Boot Backend und einem React Frontend.  
Ziel war es, ein vollständiges CRUD‑System zu entwickeln, um meine Kenntnisse in moderner Webentwicklung zu vertiefen.


## Funktionen

### Backend (Spring Boot)
- REST API mit CRUD‑Funktionalität
- Persistente Speicherung mit H2‑Datenbank
- DTO‑Schicht und Mapper
- Globales Exception Handling
- CORS‑Konfiguration
- OpenAPI/Swagger Dokumentation

### Frontend (React)
- Anzeige aller Notizen
- Detailansicht einer Notiz
- Erstellen neuer Notizen
- Bearbeiten bestehender Notizen
- Löschen von Notizen
- Einfache, übersichtliche Benutzeroberfläche

## Technologien

**Backend**
- Java 17  
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- H2 Database  
- Maven  

**Frontend**
- React  
- React Router  
- Fetch API  
- CSS  


## Installation und Start

### Backend starten

cd notes
mvn spring-boot:run


Backend läuft unter:

http://localhost:8080


### Frontend starten

cd frontend
npm install
npm start


Frontend läuft unter:

http://localhost:3000


## API Endpoints

| Methode | Endpoint          | Beschreibung          |
|--------|--------------------|------------------------|
| GET    | /api/notes         | Alle Notizen abrufen  |
| GET    | /api/notes/{id}    | Einzelne Notiz        |
| POST   | /api/notes         | Neue Notiz erstellen  |
| PUT    | /api/notes/{id}    | Notiz bearbeiten      |
| DELETE | /api/notes/{id}    | Notiz löschen         |

## Motivation

Dieses Projekt wurde entwickelt, um praktische Erfahrung in der Full‑Stack Entwicklung zu sammeln.  
Der Fokus lag darauf, ein vollständiges System mit Backend‑Logik, Datenbankanbindung und einem funktionalen Frontend umzusetzen.

## Autor

Steve (GitHub: noubidilane5-create)  
Student mit Schwerpunkt Softwareentwicklung und Interesse an Java, Spring Boot und Webtechnologien.

