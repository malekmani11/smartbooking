
**SmartBooking** est une application de réservation d'hôtels moderne, construite avec une architecture à base de **microservices**, en utilisant **REST**, **GraphQL**, **gRPC**, et **Kafka** pour les communications inter-services.
---
## 📦 Technologies Utilisées
- **Node.js / Express** : pour les services REST
- **gRPC** : pour la communication efficace (Booking ↔ Gateway)
- **GraphQL** : pour exposer des données flexibles via API
- **Kafka (kafkajs)** : pour la communication asynchrone (notifications, traitement)
- **Docker / Docker Compose** : pour orchestrer tous les services
---
## 🏗 Structure du projet

```
smartbooking/
├── api-gateway/             # Entrée principale, REST + GraphQL + gRPC
├── booking-service/         # Gestion des réservations + Kafka producer + gRPC server
├── room-service/            # Liste des chambres + Kafka consumer
├── user-service/            # Authentification (register/login)
├── notification-service/    # Kafka consumer, affiche les notifications
├── protos/                  # Fichiers .proto pour gRPC
├── frontend/                # Mini frontend HTML pour tester
├── docker-compose.yml       # Lancement de Kafka / Zookeeper
└── README.md
```
---
## 🚀 Lancer le projet
### 1. Lancer Kafka (Zookeeper + Kafka)
```bash
docker-compose up -d
```
### 2. Lancer les microservices (dans des terminaux séparés)
```bash
cd api-gateway && node index.js
cd user-service && node user.js
cd room-service && node server.js
cd booking-service && node booking.js
cd notification-service && node notify.js
```
### 3. Ouvrir le frontend :
- Fichier : `frontend/smartbooking.html`
- Ouvre-le dans ton navigateur
---
## 🔌 Tester avec Postman
---
## ✅ Fonctionnalités
- [x] Authentification utilisateur (register/login)
- [x] Visualisation des chambres disponibles
- [x] Réservation avec envoi Kafka
- [x] Notification Kafka sur nouvelle réservation
- [x] API GraphQL générée via gRPC

