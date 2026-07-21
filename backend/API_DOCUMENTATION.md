# API_DOCUMENTATION.md

# FECRM API Documentation

Version: 1.0

Architecture: REST API

Authentication: JWT Bearer Token

Response Format: JSON

Base URL:

```text
http://localhost:3000/api
```

Production:

```text
https://api.fecrm.id/api
```

---

# Authentication

All protected endpoints require:

```http
Authorization: Bearer <token>
```

---

# Standard Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# MODULES

1. Authentication
2. Dashboard
3. User
4. Lead Source
5. Lead
6. Activity
7. Communication
8. Negotiation
9. Deal
10. Product
11. Service
12. Invoice
13. Payment
14. Notification
15. Audit Log
16. Report

---

# AUTHENTICATION

## Login

POST

http://localhost:3000/api/auth/login


Request

```json
{
  "email": "admin@fecrm.id",
  "password": "password"
}
```

Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZTY1MmY2Yi01M2JiLTRkOTktODllOC1kYzIxZTM3N2MxYzkiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3ODE0OTIxNzksImV4cCI6MTc4MTU3ODU3OX0.IecWvK-RwaqJUAYTM1KhCR4trTbfTLn_HSJLxXmV9Zw",
    "user": {
      "id": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
      "email": "admin@fecrm.com",
      "role": "ADMIN"
    }
  }
}
```

---

---

---

# DASHBOARD

## Dashboard Summary

GET

```http
/api/dashboard/finance
```

Response

```json
{
  "success": true,
  "data": {
    "receivable": 26775000,
    "collected": 6693750,
    "outstanding": 20081250,
    "overdue": 0,
    "collectionRate": 25,
    "overdueInvoices": 2,
    "overdueDeals": 1,
    "aging": {
      "bucket0to30": 0,
      "bucket31to60": 0,
      "bucket61to90": 0,
      "bucket90plus": 0
    },
    "kpi": {
      "dso": 273.75,
      "collectionRate": 25,
      "overdueRate": 0,
      "collectionEfficiency": 100,
      "averageCollectionDays": 1
    }
  }
}
```

GET

```http
/api/dashboard/manager
```

Response

```json
{
  "success": true,
  "data": {
    "pipeline": {
      "totalLead": 1,
      "negotiation": 0,
      "won": 1,
      "lost": 0
    },
    "conversion": {
      "rate": 100
    },
    "sales": {
      "totalDeals": 1,
      "pipelineValue": 26775000
    },
    "finance": {
      "collected": 6693750,
      "outstanding": 20081250
    },
    "collection": {
      "overdue": 0,
      "collectionRate": 25
    },
    "kpi": {
      "dso": 273.75,
      "overdueRate": 0
    }
  }
}
```

GET

```http
/api/dashboard/marketing
```

Response

```json
{
  "success": true,
  "data": {
    "lead": {
      "total": 1,
      "new": 0,
      "assigned": 1,
      "unassigned": 0
    },
    "sources": [
      {
        "source": "Event",
        "totalLead": 0
      },
      {
        "source": "Komunitas",
        "totalLead": 0
      },
      {
        "source": "Digital Marketing",
        "totalLead": 1
      },
      {
        "source": "Pengajuan Proposal",
        "totalLead": 0
      }
    ],
    "salesDistribution": [
      {
        "sales": "Ferdy Salsabilla",
        "lead": 1
      },
      {
        "sales": "Roni Hutapea",
        "lead": 0
      }
    ]
  }
}
```

GET

```http
/api/dashboard/sales
```

Response

```json
{
  "success": true,
  "data": {
    "lead": {
      "assigned": 1,
      "negotiation": 0,
      "won": 1,
      "lost": 0
    },
    "deal": {
      "totalDeals": 1,
      "pipelineValue": 26775000,
      "collectedRevenue": 6693750,
      "outstandingRevenue": 20081250
    }
  }
}
```

GET

```http
/api/dashboard/admin
```

Response

```json
{
  "success": true,
  "data": {
    "users": {
      "total": 6,
      "admins": 1,
      "sales": 2,
      "finance": 1,
      "manager": 1
    },
    "lead": {
      "total": 1,
      "new": 0,
      "negotiation": 0,
      "won": 1,
      "lost": 0
    },
    "deal": {
      "total": 1,
      "pipelineValue": 26775000
    },
    "invoice": {
      "total": 4,
      "paid": 1,
      "partial": 1,
      "overdue": 0
    },
    "payment": {
      "total": 1,
      "pending": 0,
      "verified": 1,
      "rejected": 0
    },
    "finance": {
      "receivable": 26775000,
      "collected": 6693750,
      "outstanding": 20081250,
      "collectionRate": 25
    },
    "system": {
      "activities": 6,
      "auditLogs": 8
    }
  }
}
```

---

# USER MANAGEMENT

## List User

GET

```http
/api/users
```

---

## Create User untuk menginvite

POST

```http
/api/users
```

Request

```json
{
  "name": "Aditya Praja",
  "email": "003-sls-adityapraja@fecrm.com",
  "role": "SALES"
}
```

Response 

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "0ef75af7-3f68-41cc-848c-628025f160e0",
      "name": "Aditya Praja",
      "email": "003-sls-adityapraja@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-15T03:11:10.427Z",
      "deletedAt": null
    },
    "tempPassword": "GtJvmjoD"
  }
}
```

## User Detail

GET

```http://localhost:3000/api/users/427b41d8-a8cf-474b-9fd1-6c94af92eaf3/statistics
```

Response 

```json

{
  "success": true,
  "data": {
    "totalLead": 1,
    "totalDeal": 1,
    "wonDeal": 0,
    "conversionRate": 0
  }
}

```

GET

```http://localhost:3000/api/users
```

Response 

```json

{
  "success": true,
  "data": [
    {
      "id": "0ef75af7-3f68-41cc-848c-628025f160e0",
      "name": "Aditya Praja",
      "email": "003-sls-adityapraja@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-15T03:11:10.427Z",
      "deletedAt": null
    },
    {
      "id": "6247bf01-fc94-4986-a554-959d61ec8d6f",
      "name": "Roni Hutapea",
      "email": "002-sls-ronihutapea@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-11T04:05:46.797Z",
      "deletedAt": null
    },
    {
      "id": "f97a05e9-655d-42b2-96e6-767014c60337",
      "name": "Reynold Almounduchi",
      "email": "001-man-reynoldalmounduchi@fecrm.com",
      "role": "MANAGER",
      "isActive": true,
      "createdAt": "2026-06-09T07:45:53.842Z",
      "deletedAt": null
    },
    {
      "id": "57d5a2c9-f4dd-43d2-a866-a0042fe66b64",
      "name": "Mutiara Tdjiningsih",
      "email": "001-fin-mutiaratdjiningsih@fecrm.com",
      "role": "FINANCE",
      "isActive": true,
      "createdAt": "2026-06-09T07:45:01.155Z",
      "deletedAt": null
    },
    {
      "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "name": "Ferdy Salsabilla",
      "email": "001-sls-ferdysalsabilla@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-09T07:44:03.657Z",
      "deletedAt": null
    },
    {
      "id": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "name": "Rafli Rangga Aditya Prayoga",
      "email": "001-mar-raflirangga@fecrm.com",
      "role": "MARKETING",
      "isActive": true,
      "createdAt": "2026-06-09T07:43:06.658Z",
      "deletedAt": null
    },
    {
      "id": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
      "name": "Super Admin",
      "email": "admin@fecrm.com",
      "role": "ADMIN",
      "isActive": true,
      "createdAt": "2026-06-09T07:40:23.360Z",
      "deletedAt": null
    }
  ]
}

```

GET

```http://localhost:3000/api/users?role=SALES
```

Response 

```json

{
  "success": true,
  "data": [
    {
      "id": "0ef75af7-3f68-41cc-848c-628025f160e0",
      "name": "Aditya Praja",
      "email": "003-sls-adityapraja@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-15T03:11:10.427Z",
      "deletedAt": null
    },
    {
      "id": "6247bf01-fc94-4986-a554-959d61ec8d6f",
      "name": "Roni Hutapea",
      "email": "002-sls-ronihutapea@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-11T04:05:46.797Z",
      "deletedAt": null
    },
    {
      "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "name": "Ferdy Salsabilla",
      "email": "001-sls-ferdysalsabilla@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-09T07:44:03.657Z",
      "deletedAt": null
    }
  ]
}

```

---

## Update User

PUT

```http
/api/users/:id
```

Response

```json

{
  "success": true,
  "data": {
    "id": "0ef75af7-3f68-41cc-848c-628025f160e0",
    "name": "Aditya Praja Dwikarya",
    "email": "003-sls-adityapraja@fecrm.com",
    "role": "SALES",
    "isActive": true,
    "createdAt": "2026-06-15T03:11:10.427Z",
    "deletedAt": null
  }
}

```

---

## Delete User

DELETE

```http
/api/users/:id
```

Response 

```json
{
  "success": true,
  "data": {
    "message": "User deleted successfully"
  }
}
```

---

# LEAD SOURCE

## List Lead Source

GET

```http
/api/lead-sources
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "93cd49ff-4381-473f-b170-5c4117df3579",
      "name": "Digital Marketing"
    },
    {
      "id": "dc3566ef-cf43-4811-9771-deee0c86e3b1",
      "name": "Event"
    },
    {
      "id": "a8b859b4-b9af-4b40-802b-cf7cbc62e40b",
      "name": "Komunitas"
    },
    {
      "id": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
      "name": "Pengajuan Proposal"
    }
  ]
}
```

---

## Create Lead Source

POST

```http
/api/lead-sources
```

Request

```json
{
  "name": "Website"
}
```

Response 

```json
{
  "success": true,
  "data": {
    "id": "6785c8ac-1c23-4c88-bdba-709a6519a2eb",
    "name": "Website"
  }
}
```

---

# LEAD MANAGEMENT

## Create Lead

POST

```http
/api/leads
```

Request

```json
{
  "name": "Manda Putri Dewi",
  "company": "PT Hutama Karya",
  "email": "pthk@hutamakarya.com",
  "phone": "0218193708",

  "address": "HK Tower Kav. 8, Cawang, Jakarta",
  "district": "Jl Letjen MT Haryono",
  "city": "East Jakarta City",
  "province": "DKI Jakarta",
  "postalCode": "13340",
  "country": "Indonesia",

  "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
  "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "name": "Manda Putri Dewi",
    "company": "PT Hutama Karya",
    "email": "pthk@hutamakarya.com",
    "phone": "0218193708",
    "address": "HK Tower Kav. 8, Cawang, Jakarta",
    "district": "Jl Letjen MT Haryono",
    "city": "East Jakarta City",
    "province": "DKI Jakarta",
    "postalCode": "13340",
    "country": "Indonesia",
    "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
    "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
    "status": "NEW",
    "lastActivityAt": "2026-06-15T04:02:11.636Z",
    "createdAt": "2026-06-15T04:02:11.641Z",
    "deletedAt": null
  }
}
```

---

## Lead List

GET

```http
/api/leads
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "name": "Suci Nur Etika",
      "company": "PT Garuda Makmur Perkasa",
      "email": "sucinuretika@gmail.com",
      "phone": "6285772577615",
      "address": "Jl. Mangga Raya No. 687 Kel. Duri Kepa Kec. Kebon Jeruk - Jakarta Barat",
      "district": "Jl. Mangga Raya",
      "city": "Jakarta Barat",
      "province": "DKI Jakarta",
      "postalCode": "11510",
      "country": "Indonesia",
      "sourceId": "93cd49ff-4381-473f-b170-5c4117df3579",
      "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "status": "WON",
      "lastActivityAt": "2026-06-14T14:54:55.268Z",
      "createdAt": "2026-06-14T14:45:25.052Z",
      "deletedAt": null,
      "assignee": {
        "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "name": "Ferdy Salsabilla",
        "email": "001-sls-ferdysalsabilla@fecrm.com",
        "role": "SALES",
        "isActive": true,
        "createdAt": "2026-06-09T07:44:03.657Z",
        "deletedAt": null
      },
      "source": {
        "id": "93cd49ff-4381-473f-b170-5c4117df3579",
        "name": "Digital Marketing"
      }
    },
    {
      "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "name": "Manda Putri Dewi",
      "company": "PT Hutama Karya",
      "email": "pthk@hutamakarya.com",
      "phone": "0218193708",
      "address": "HK Tower Kav. 8, Cawang, Jakarta",
      "district": "Jl Letjen MT Haryono",
      "city": "East Jakarta City",
      "province": "DKI Jakarta",
      "postalCode": "13340",
      "country": "Indonesia",
      "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
      "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "status": "NEW",
      "lastActivityAt": "2026-06-15T04:02:11.658Z",
      "createdAt": "2026-06-15T04:02:11.641Z",
      "deletedAt": null,
      "assignee": {
        "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "name": "Ferdy Salsabilla",
        "email": "001-sls-ferdysalsabilla@fecrm.com",
        "role": "SALES",
        "isActive": true,
        "createdAt": "2026-06-09T07:44:03.657Z",
        "deletedAt": null
      },
      "source": {
        "id": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
        "name": "Pengajuan Proposal"
      }
    }
  ]
}
```

---

## Lead Detail

GET

```http
/api/leads/:id
```

Response 

```json
{
  "success": true,
  "data": {
    "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "name": "Manda Putri Dewi",
    "company": "PT Hutama Karya",
    "email": "pthk@hutamakarya.com",
    "phone": "0218193708",
    "address": "HK Tower Kav. 8, Cawang, Jakarta",
    "district": "Jl Letjen MT Haryono",
    "city": "East Jakarta City",
    "province": "DKI Jakarta",
    "postalCode": "13340",
    "country": "Indonesia",
    "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
    "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
    "status": "NEW",
    "lastActivityAt": "2026-06-15T04:02:11.658Z",
    "createdAt": "2026-06-15T04:02:11.641Z",
    "deletedAt": null,
    "source": {
      "id": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
      "name": "Pengajuan Proposal"
    },
    "assignee": {
      "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "name": "Ferdy Salsabilla",
      "email": "001-sls-ferdysalsabilla@fecrm.com",
      "role": "SALES",
      "isActive": true,
      "createdAt": "2026-06-09T07:44:03.657Z",
      "deletedAt": null
    },
    "creator": {
      "id": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "name": "Rafli Rangga Aditya Prayoga",
      "email": "001-mar-raflirangga@fecrm.com",
      "role": "MARKETING",
      "isActive": true,
      "createdAt": "2026-06-09T07:43:06.658Z",
      "deletedAt": null
    },
    "deals": [],
    "activities": [
      {
        "id": "16186f86-46f6-4953-95e5-e7f70a90f576",
        "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
        "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
        "type": "SYSTEM",
        "description": "Lead created",
        "createdAt": "2026-06-15T04:02:11.657Z"
      }
    ],
    "communications": [],
    "negotiations": []
  }
}
```

---

## Assign Lead

PATCH

```http://localhost:3000/api/leads/assign
```

Request

```json
{
  "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
  "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f"
}
```

Response 

```json
{
  "success": true,
  "data": {
    "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "name": "Manda Putri Dewi",
    "company": "PT Hutama Karya",
    "email": "pthk@hutamakarya.com",
    "phone": "0218193708",
    "address": "HK Tower Kav. 8, Cawang, Jakarta",
    "district": "Jl Letjen MT Haryono",
    "city": "East Jakarta City",
    "province": "DKI Jakarta",
    "postalCode": "13340",
    "country": "Indonesia",
    "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
    "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
    "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
    "status": "NEW",
    "lastActivityAt": "2026-06-15T04:16:56.749Z",
    "createdAt": "2026-06-15T04:02:11.641Z",
    "deletedAt": null
  }
}
```
---

## Update Lead Status

PATCH

```http://localhost:3000/api/leads/status
```

Request

```json
{
  "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
  "status": "WON"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "name": "Manda Putri Dewi",
    "company": "PT Hutama Karya",
    "email": "pthk@hutamakarya.com",
    "phone": "0218193708",
    "address": "HK Tower Kav. 8, Cawang, Jakarta",
    "district": "Jl Letjen MT Haryono",
    "city": "East Jakarta City",
    "province": "DKI Jakarta",
    "postalCode": "13340",
    "country": "Indonesia",
    "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
    "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
    "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
    "status": "WON",
    "lastActivityAt": "2026-06-15T04:19:10.250Z",
    "createdAt": "2026-06-15T04:02:11.641Z",
    "deletedAt": null
  }
}
```

---

## Lead Timeline

GET

```http://localhost:3000/api/leads/timeline?leadId=c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "afec1b5a-2dea-4712-a8fb-d809251bc5a9",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "userId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "type": "STATUS",
      "description": "Status changed to WON",
      "createdAt": "2026-06-15T04:19:10.254Z",
      "user": {
        "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "email": "001-sls-ferdysalsabilla@fecrm.com",
        "role": "SALES"
      }
    },
    {
      "id": "a95aafaa-f7a9-4a0d-acb5-d13ecb08d716",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "type": "ASSIGNMENT",
      "description": "Assigned to 002-sls-ronihutapea@fecrm.com",
      "createdAt": "2026-06-15T04:16:56.759Z",
      "user": {
        "id": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
        "email": "001-mar-raflirangga@fecrm.com",
        "role": "MARKETING"
      }
    },
    {
      "id": "16186f86-46f6-4953-95e5-e7f70a90f576",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "type": "SYSTEM",
      "description": "Lead created",
      "createdAt": "2026-06-15T04:02:11.657Z",
      "user": {
        "id": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
        "email": "001-mar-raflirangga@fecrm.com",
        "role": "MARKETING"
      }
    }
  ]
}
```

---

# ACTIVITY

## Activity

GET

```http://localhost:3000/api/activities
```

Request

```json
{
  "success": true,
  "data": [
    {
      "id": "afec1b5a-2dea-4712-a8fb-d809251bc5a9",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "userId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "type": "STATUS",
      "description": "Status changed to WON",
      "createdAt": "2026-06-15T04:19:10.254Z"
    },
    {
      "id": "a95aafaa-f7a9-4a0d-acb5-d13ecb08d716",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "type": "ASSIGNMENT",
      "description": "Assigned to 002-sls-ronihutapea@fecrm.com",
      "createdAt": "2026-06-15T04:16:56.759Z"
    },
    {
      "id": "16186f86-46f6-4953-95e5-e7f70a90f576",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "type": "SYSTEM",
      "description": "Lead created",
      "createdAt": "2026-06-15T04:02:11.657Z"
    },
    {
      "id": "8d1554d9-f03e-450e-946c-a526e5de6fd6",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
      "type": "FINANCE",
      "description": "Payment verified",
      "createdAt": "2026-06-14T16:15:12.780Z"
    },
    {
      "id": "fb3d05cd-a355-40c1-91a6-65c396f161ce",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "57d5a2c9-f4dd-43d2-a866-a0042fe66b64",
      "type": "FINANCE",
      "description": "Termin invoice created (3 terms)",
      "createdAt": "2026-06-14T15:17:14.314Z"
    },
    {
      "id": "8331db3e-8fbf-45f3-b4ca-472ec18ade32",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "type": "SYSTEM",
      "description": "Deal created",
      "createdAt": "2026-06-14T15:08:28.646Z"
    },
    {
      "id": "8be3707c-2255-4a63-8b8c-97ba97265474",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "type": "STATUS",
      "description": "Status changed to WON",
      "createdAt": "2026-06-14T14:54:55.268Z"
    },
    {
      "id": "f8633e8c-1a28-46b8-a50f-c95fb26e521e",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "type": "COMMUNICATION",
      "description": "Email sent",
      "createdAt": "2026-06-14T14:53:48.602Z"
    },
    {
      "id": "2e8946c7-011d-4582-9a39-220dbf86303e",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "type": "SYSTEM",
      "description": "Lead created",
      "createdAt": "2026-06-14T14:45:25.058Z"
    }
  ]
}
```

---

# COMMUNICATION

## Send Email

POST

```http://localhost:3000/api/communications/email
```

Request

```json
{
  "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
  "subject": "Follow Up Project Pengembangan Sistem Internal",
  "message": "Testing FECRM di email, pada hari senin 15/06/2026"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "35e79524-7be1-48ee-a2f3-c83c93f0a6bd",
    "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
    "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
    "channel": "EMAIL",
    "direction": "OUTBOUND",
    "message": "Testing FECRM di email, pada hari senin 15/06/2026",
    "status": "SENT",
    "externalId": "<41aa0492-e022-a10d-d00d-57f1d621e2f6@dcliq.co.id>",
    "createdAt": "2026-06-15T04:26:26.692Z"
  }
}
```

---

## Send WhatsApp

POST

```http
/api/communications/wa
```

Request

```json
{
  "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
  "message": "testing wa"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "b1e07936-d82b-4a39-93af-3f49c599a123",
    "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
    "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
    "channel": "WA",
    "direction": "OUTBOUND",
    "message": "testing wa",
    "status": "SENT",
    "externalId": "3EB02271DEDEA093691621",
    "createdAt": "2026-06-15T04:32:01.043Z"
  }
}
```

---

## Communication History

GET

```http
/api/communications/:leadId
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "b1e07936-d82b-4a39-93af-3f49c599a123",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "channel": "WA",
      "direction": "OUTBOUND",
      "message": "testing wa",
      "status": "SENT",
      "externalId": "3EB02271DEDEA093691621",
      "createdAt": "2026-06-15T04:32:01.043Z"
    },
    {
      "id": "35e79524-7be1-48ee-a2f3-c83c93f0a6bd",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "channel": "EMAIL",
      "direction": "OUTBOUND",
      "message": "Testing FECRM di email, pada hari senin 15/06/2026",
      "status": "SENT",
      "externalId": "<41aa0492-e022-a10d-d00d-57f1d621e2f6@dcliq.co.id>",
      "createdAt": "2026-06-15T04:26:26.692Z"
    },
    {
      "id": "b40f03f0-647d-4b57-bc88-528cbe36578d",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "userId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "channel": "EMAIL",
      "direction": "OUTBOUND",
      "message": "testing lagi",
      "status": "SENT",
      "externalId": "<28a1bb29-0aad-6aad-0de4-19a98b92a9ef@dcliq.co.id>",
      "createdAt": "2026-06-14T14:53:48.591Z"
    }
  ]
}
```

---

# DEAL MANAGEMENT

## Create Deal

POST

```http://localhost:3000/api/deals
```

Request

```json
{
  "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
    "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
    "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "value": "0",
    "status": "OPEN",
    "collectionStatus": "UNPAID",
    "collectedAmount": "0",
    "outstandingAmount": "0",
    "createdAt": "2026-06-15T04:57:35.160Z",
    "deletedAt": null
  }
}
```

---

## Deal List

GET

```http
/api/deals
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
      "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "value": "26775000",
      "status": "OPEN",
      "collectionStatus": "PARTIAL",
      "collectedAmount": "6693750",
      "outstandingAmount": "20081250",
      "createdAt": "2026-06-14T15:08:28.622Z",
      "deletedAt": null,
      "lead": {
        "id": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "name": "Suci Nur Etika",
        "company": "PT Garuda Makmur Perkasa",
        "email": "sucinuretika@gmail.com",
        "phone": "6285772577615",
        "address": "Jl. Mangga Raya No. 687 Kel. Duri Kepa Kec. Kebon Jeruk - Jakarta Barat",
        "district": "Jl. Mangga Raya",
        "city": "Jakarta Barat",
        "province": "DKI Jakarta",
        "postalCode": "11510",
        "country": "Indonesia",
        "sourceId": "93cd49ff-4381-473f-b170-5c4117df3579",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
        "status": "WON",
        "lastActivityAt": "2026-06-15T04:32:01.056Z",
        "createdAt": "2026-06-14T14:45:25.052Z",
        "deletedAt": null
      },
      "items": [
        {
          "id": "bf2e7d6b-4b87-4c16-ab51-679e84ef4c08",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "type": "PRODUCT",
          "refId": "440acb92-2b2d-4955-96c6-64c80467765b",
          "itemName": "Keramik Lantai 60x60 / dus",
          "quantity": 10,
          "price": "165000",
          "unitPrice": "165000",
          "totalPrice": "1650000",
          "createdAt": "2026-06-14T15:08:42.923Z"
        },
        {
          "id": "94b6e197-adf9-4e8a-b47b-38dd4f4f8844",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "type": "SERVICE",
          "refId": "79248242-e79a-4698-834a-81ce352f9638",
          "itemName": "Instalasi Listrik Bangunan per Titik",
          "quantity": 75,
          "price": "350000",
          "unitPrice": "335000",
          "totalPrice": "25125000",
          "createdAt": "2026-06-14T15:10:08.124Z"
        }
      ]
    },
    {
      "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
      "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "value": "0",
      "status": "OPEN",
      "collectionStatus": "UNPAID",
      "collectedAmount": "0",
      "outstandingAmount": "0",
      "createdAt": "2026-06-15T04:57:35.160Z",
      "deletedAt": null,
      "lead": {
        "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
        "name": "Manda Putri Dewi",
        "company": "PT Hutama Karya",
        "email": "pthk@hutamakarya.com",
        "phone": "0218193708",
        "address": "HK Tower Kav. 8, Cawang, Jakarta",
        "district": "Jl Letjen MT Haryono",
        "city": "East Jakarta City",
        "province": "DKI Jakarta",
        "postalCode": "13340",
        "country": "Indonesia",
        "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
        "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
        "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
        "status": "WON",
        "lastActivityAt": "2026-06-15T04:19:10.254Z",
        "createdAt": "2026-06-15T04:02:11.641Z",
        "deletedAt": null
      },
      "items": []
    }
  ]
}
```

---

## Deal Detail

GET

```http
/api/deals/:id
```

Response 

```json
{
  "success": true,
  "data": {
    "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
    "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
    "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "value": "0",
    "status": "OPEN",
    "collectionStatus": "UNPAID",
    "collectedAmount": "0",
    "outstandingAmount": "0",
    "createdAt": "2026-06-15T04:57:35.160Z",
    "deletedAt": null,
    "lead": {
      "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "name": "Manda Putri Dewi",
      "company": "PT Hutama Karya",
      "email": "pthk@hutamakarya.com",
      "phone": "0218193708",
      "address": "HK Tower Kav. 8, Cawang, Jakarta",
      "district": "Jl Letjen MT Haryono",
      "city": "East Jakarta City",
      "province": "DKI Jakarta",
      "postalCode": "13340",
      "country": "Indonesia",
      "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
      "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
      "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
      "status": "WON",
      "lastActivityAt": "2026-06-15T04:19:10.254Z",
      "createdAt": "2026-06-15T04:02:11.641Z",
      "deletedAt": null
    },
    "invoices": []
  }
}
```

---

## Update Deal Status

PATCH

```http
/api/deals/:id/status
```

Request

```json
{
  "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
  "status": "NEGOTIATION"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
    "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
    "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
    "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "value": "0",
    "status": "NEGOTIATION",
    "collectionStatus": "UNPAID",
    "collectedAmount": "0",
    "outstandingAmount": "0",
    "createdAt": "2026-06-15T04:57:35.160Z",
    "deletedAt": null
  }
}
```

---

# PRODUCT

## Product List

GET

```http
/api/products
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "07649d70-21ae-4588-bcf4-41b1628b05cf",
      "name": "1 Unit Panel Listrik 3 Phase",
      "price": "12500000"
    },
    {
      "id": "60bad7c1-cc0d-4851-adde-7f6edde2894c",
      "name": "Besi Beton Polos 10 mm / batang",
      "price": "68000"
    },
    {
      "id": "a308b67e-3d1c-4da2-bb1d-d1de7f27c4e2",
      "name": "Gypsum Board 9 mm / lembar",
      "price": "92000"
    },
    {
      "id": "440acb92-2b2d-4955-96c6-64c80467765b",
      "name": "Keramik Lantai 60x60 / dus",
      "price": "165000"
    },
    {
      "id": "91f03e8d-7fac-4f15-ba4e-68b02f581760",
      "name": "Wiremesh M8 / lembar",
      "price": "1250000"
    }
  ]
}
```

---

## Create Product

POST

```http
/api/products
```

Request

```json
{
  "name": "Plavon PVC ukuran 10 mili 1 meter",
  "price": 432500
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "735c3a7d-b324-4ea2-97c9-4e145de1a1c1",
    "name": "Plavon PVC ukuran 10 mili 1 meter",
    "price": "432500"
  }
}
```

---

# SERVICE

## Service List

GET

```http
/api/services
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "79248242-e79a-4698-834a-81ce352f9638",
      "name": "Instalasi Listrik Bangunan per Titik",
      "price": "350000"
    },
    {
      "id": "af14f00c-98fe-4086-b468-c811624c1e77",
      "name": "Instalasi Plumbing per Titik",
      "price": "425000"
    },
    {
      "id": "ecfc64b2-a565-4a7d-9225-aaea2ae11dea",
      "name": "Waterproofing Dak Beton per m²",
      "price": "93000"
    }
  ]
}
```

---

## Create Service

POST

```http
/api/services
```

Request

```json
{
  "name": "Pemasangan Kramik per 1 meter",
  "price": 215000
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "66435b51-fb80-4997-ba97-3c5d05a86603",
    "name": "Pemasangan Kramik per 1 meter",
    "price": "215000"
  }
}
```

---

# TRANSACTION ITEM

## Attach Product

POST

```http://localhost:3000/api/deals/attach-product
```

Request

```json
{
  "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
  "refIds": [
    "735c3a7d-b324-4ea2-97c9-4e145de1a1c1"
  ],
  "quantity": 17
}
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "89ee1228-8de5-4923-96a0-07191bb9c334",
      "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "type": "PRODUCT",
      "refId": "735c3a7d-b324-4ea2-97c9-4e145de1a1c1",
      "itemName": "Plavon PVC ukuran 10 mili 1 meter",
      "quantity": 17,
      "price": "432500",
      "unitPrice": "432500",
      "totalPrice": "7352500",
      "createdAt": "2026-06-15T05:18:06.616Z"
    }
  ]
}
```

---

## Attach Service

POST

```http://localhost:3000/api/deals/attach-service
```

Request

```json
{
  "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
  "refIds": [
    "66435b51-fb80-4997-ba97-3c5d05a86603"
  ],
  "quantity": 5
}
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "bd0052aa-5336-4d70-8fc6-3cc5464ff118",
      "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "type": "SERVICE",
      "refId": "66435b51-fb80-4997-ba97-3c5d05a86603",
      "itemName": "Pemasangan Kramik per 1 meter",
      "quantity": 5,
      "price": "215000",
      "unitPrice": "215000",
      "totalPrice": "1075000",
      "createdAt": "2026-06-15T05:20:39.622Z"
    }
  ]
}
```

---

# NEGOTIATION

## Create Negotiation Request

POST

```http://localhost:3000/api/price-negotiations/request
```

Request

```json
{
  "transactionItemId": "89ee1228-8de5-4923-96a0-07191bb9c334",
  "requestedPrice": 430000,
  "reason": "Client minta diskon sir untuk produk kita ini, dia ambil 17 mater soalnya, kira kira gimana sir?"
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "bc42b432-b50a-4706-add1-5edbdeb3450b",
    "transactionItemId": "89ee1228-8de5-4923-96a0-07191bb9c334",
    "requestedBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "approvedBy": null,
    "status": "PENDING",
    "oldPrice": "432500",
    "requestedPrice": "430000",
    "approvedPrice": null,
    "reason": "Client minta diskon sir untuk produk kita ini, dia ambil 17 mater soalnya, kira kira gimana sir?",
    "reviewedAt": null,
    "createdAt": "2026-06-15T05:26:16.838Z"
  }
}
```

---

## Negotiation Queue

GET

```http://localhost:3000/api/price-negotiations/pending
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "a66bfaee-bd40-4669-bc38-75c7f8cd12df",
      "transactionItemId": "a081be19-4c16-40ff-a2e2-a8aa5e6f2ded",
      "requestedBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "approvedBy": null,
      "status": "PENDING",
      "oldPrice": "68000",
      "requestedPrice": "67000",
      "approvedPrice": null,
      "reason": "Client minta diskon sir untuk produk kita ini, ngambil 100 beliau, gimana sir?",
      "reviewedAt": null,
      "createdAt": "2026-06-15T05:31:38.895Z",
      "requester": {
        "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "name": "Ferdy Salsabilla",
        "email": "001-sls-ferdysalsabilla@fecrm.com"
      },
      "item": {
        "id": "a081be19-4c16-40ff-a2e2-a8aa5e6f2ded",
        "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
        "type": "PRODUCT",
        "refId": "60bad7c1-cc0d-4851-adde-7f6edde2894c",
        "itemName": "Besi Beton Polos 10 mm / batang",
        "quantity": 100,
        "price": "68000",
        "unitPrice": "68000",
        "totalPrice": "6800000",
        "createdAt": "2026-06-15T05:29:34.626Z"
      }
    }
  ]
}
```

---

## Approve Negotiation

PUT

```http://localhost:3000/api/price-negotiations/approve
```

Request

```json
{
  "negotiationId": "bc42b432-b50a-4706-add1-5edbdeb3450b"
}
```

Response 

```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Negotiation approved"
  }
}
```

---

## Reject Negotiation

POST

```http://localhost:3000/api/price-negotiations/reject
```

Request

```json
{
  "negotiationId": "a66bfaee-bd40-4669-bc38-75c7f8cd12df"
}
```

Response

```Json
{
  "success": true,
  "data": {
    "id": "a66bfaee-bd40-4669-bc38-75c7f8cd12df",
    "transactionItemId": "a081be19-4c16-40ff-a2e2-a8aa5e6f2ded",
    "requestedBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
    "approvedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
    "status": "REJECTED",
    "oldPrice": "68000",
    "requestedPrice": "67000",
    "approvedPrice": null,
    "reason": "Client minta diskon sir untuk produk kita ini, ngambil 100 beliau, gimana sir?",
    "reviewedAt": "2026-06-15T05:35:28.212Z",
    "createdAt": "2026-06-15T05:31:38.895Z"
  }
}
```
---

# INVOICE

## Create Full Invoice

POST

```http://localhost:3000/api/invoices
```

Request

```json
{
  "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
  "paymentType": "FULL",
  "paymentMethod": "QRIS_MIDTRANS"
}
```

Response

```json
{
  "success": true,
  "data": {
    "masterInvoice": {
      "id": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
      "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0002",
      "invoiceKind": "MASTER",
      "paymentType": "FULL",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "15110000",
      "paidAmount": "0",
      "remainingAmount": "15110000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T05:38:33.591Z",
      "deletedAt": null
    },
    "childInvoices": []
  }
}
```

---

## Create Termin Invoice

POST

```http
http://localhost:3000/api/invoices
```

Request

```json
{
  "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
  "paymentType": "TERMIN",
  "paymentMethod": "QRIS_MIDTRANS",
  "terms": [
    {
      "percent": 15,
      "dueDate": "2026-07-10"
    },
    {
      "percent": 35,
      "dueDate": "2026-08-10"
    },
    {
      "percent": 50,
      "dueDate": "2026-09-10"
    }
  ]
}
```

Response

```json
{
  "success": true,
  "data": {
    "masterInvoice": {
      "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0003",
      "invoiceKind": "MASTER",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "1778000",
      "paidAmount": "0",
      "remainingAmount": "1778000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.419Z",
      "deletedAt": null
    },
    "childInvoices": [
      {
        "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "invoiceNumber": "INV-2026-0003-T1",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "266700",
        "paidAmount": "0",
        "remainingAmount": "266700",
        "percent": "15",
        "dueDate": "2026-07-10T00:00:00.000Z",
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.427Z",
        "deletedAt": null
      },
      {
        "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "invoiceNumber": "INV-2026-0003-T2",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "622300",
        "paidAmount": "0",
        "remainingAmount": "622300",
        "percent": "35",
        "dueDate": "2026-08-10T00:00:00.000Z",
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.428Z",
        "deletedAt": null
      },
      {
        "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "invoiceNumber": "INV-2026-0003-T3",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "889000",
        "paidAmount": "0",
        "remainingAmount": "889000",
        "percent": "50",
        "dueDate": "2026-09-10T00:00:00.000Z",
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.430Z",
        "deletedAt": null
      }
    ]
  }
}
```

---

## Invoice List

GET

```http://localhost:3000/api/invoices
```

Response 

```json
{
  "success": true,
  "data": [
    {
      "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "invoiceNumber": "INV-2026-0003-T3",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "889000",
      "paidAmount": "0",
      "remainingAmount": "889000",
      "percent": "50",
      "dueDate": "2026-09-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.430Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0003",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "1778000",
        "paidAmount": "0",
        "remainingAmount": "1778000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.419Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "invoiceNumber": "INV-2026-0003-T2",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "622300",
      "paidAmount": "0",
      "remainingAmount": "622300",
      "percent": "35",
      "dueDate": "2026-08-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.428Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0003",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "1778000",
        "paidAmount": "0",
        "remainingAmount": "1778000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.419Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "invoiceNumber": "INV-2026-0003-T1",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "266700",
      "paidAmount": "0",
      "remainingAmount": "266700",
      "percent": "15",
      "dueDate": "2026-07-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": "INV-2026-0003-T1-1781507524890",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/af45ab39-c67f-475d-9ba1-633d17680950",
      "issuedAt": "2026-06-15T06:45:52.427Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0003",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "1778000",
        "paidAmount": "0",
        "remainingAmount": "1778000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.419Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0003",
      "invoiceKind": "MASTER",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "1778000",
      "paidAmount": "0",
      "remainingAmount": "1778000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.419Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": null,
      "childInvoices": [
        {
          "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T1",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "266700",
          "paidAmount": "0",
          "remainingAmount": "266700",
          "percent": "15",
          "dueDate": "2026-07-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": "INV-2026-0003-T1-1781507524890",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/af45ab39-c67f-475d-9ba1-633d17680950",
          "issuedAt": "2026-06-15T06:45:52.427Z",
          "deletedAt": null
        },
        {
          "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T2",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "622300",
          "paidAmount": "0",
          "remainingAmount": "622300",
          "percent": "35",
          "dueDate": "2026-08-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-15T06:45:52.428Z",
          "deletedAt": null
        },
        {
          "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T3",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "889000",
          "paidAmount": "0",
          "remainingAmount": "889000",
          "percent": "50",
          "dueDate": "2026-09-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-15T06:45:52.430Z",
          "deletedAt": null
        }
      ]
    },
    {
      "id": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
      "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0002",
      "invoiceKind": "MASTER",
      "paymentType": "FULL",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "15110000",
      "paidAmount": "0",
      "remainingAmount": "15110000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": "INV-2026-0002-1781502427578",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/456021e6-e011-4526-ba0b-293adcf43526",
      "issuedAt": "2026-06-15T05:38:33.591Z",
      "deletedAt": null,
      "deal": {
        "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
        "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
        "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "15110000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T04:57:35.160Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": null,
      "childInvoices": []
    },
    {
      "id": "35fa4908-80bf-4142-a289-f8050ebf9576",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "invoiceNumber": "INV-2026-0001-T3",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "13387500",
      "paidAmount": "0",
      "remainingAmount": "13387500",
      "percent": "50",
      "dueDate": "2026-09-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-14T15:17:14.309Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0001",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "26775000",
        "paidAmount": "6693750",
        "remainingAmount": "20081250",
        "percent": null,
        "dueDate": null,
        "status": "PARTIAL",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-14T15:17:14.277Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "51a9a8c0-546f-4b43-9cc5-9872443c04d1",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "invoiceNumber": "INV-2026-0001-T2",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "6693750",
      "paidAmount": "0",
      "remainingAmount": "6693750",
      "percent": "25",
      "dueDate": "2026-08-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": "INV-2026-0001-T2-1781455304620",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/6ab0cbfa-20c3-4b8a-b6cf-41c5a9a6647b",
      "issuedAt": "2026-06-14T15:17:14.306Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0001",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "26775000",
        "paidAmount": "6693750",
        "remainingAmount": "20081250",
        "percent": null,
        "dueDate": null,
        "status": "PARTIAL",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-14T15:17:14.277Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "invoiceNumber": "INV-2026-0001-T1",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "6693750",
      "paidAmount": "6693750",
      "remainingAmount": "0",
      "percent": "25",
      "dueDate": "2026-07-10T00:00:00.000Z",
      "status": "PAID",
      "midtransOrderId": "INV-2026-0001-T1-1781451519251",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/2c0d817e-de59-4ace-a0ac-2a48f2a5b9d9",
      "issuedAt": "2026-06-14T15:17:14.292Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [
        {
          "id": "d106c666-be3a-4a34-a7e7-845fa9d5b022",
          "invoiceId": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
          "amount": "6693750",
          "paymentMethod": "QRIS_MIDTRANS",
          "proofUrl": null,
          "referenceNumber": "INV-2026-0001-T1-1781451519251",
          "status": "VERIFIED",
          "uploadedBy": null,
          "verifiedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
          "verifiedAt": "2026-06-14T16:15:12.767Z",
          "paidAt": "2026-06-14T16:15:12.767Z",
          "midtransTransactionId": "7ff2249e-e41e-4054-a0ac-d85f505b0b06",
          "gatewayResponse": {
            "issuer": "dana",
            "pop_id": "6481408a-21c4-4954-badf-0d458147cb1a",
            "acquirer": "gopay",
            "currency": "IDR",
            "order_id": "INV-2026-0001-T1-1781451519251",
            "expiry_time": "2026-06-21 23:14:54",
            "merchant_id": "M956710557",
            "status_code": "200",
            "fraud_status": "accept",
            "gross_amount": "6693750.00",
            "payment_type": "qris",
            "signature_key": "23e6e6e9ab7c841b14ea5d08a25b6d4e47a0640337e685d7d9b1b0a1f2367ea022a797c98baed4e1d304444f654ba5de2181419c0c13fac3b532bb348cc05610",
            "status_message": "midtrans payment notification",
            "transaction_id": "7ff2249e-e41e-4054-a0ac-d85f505b0b06",
            "settlement_time": "2026-06-14 23:15:13",
            "customer_details": {
              "email": "sucinuretika@gmail.com",
              "phone": "+6285772577615",
              "full_name": "Suci Nur Etika"
            },
            "transaction_time": "2026-06-14 23:14:54",
            "transaction_type": "off-us",
            "transaction_status": "settlement"
          },
          "createdAt": "2026-06-14T16:15:12.761Z"
        }
      ],
      "parentInvoice": {
        "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0001",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "26775000",
        "paidAmount": "6693750",
        "remainingAmount": "20081250",
        "percent": null,
        "dueDate": null,
        "status": "PARTIAL",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-14T15:17:14.277Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0001",
      "invoiceKind": "MASTER",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "26775000",
      "paidAmount": "6693750",
      "remainingAmount": "20081250",
      "percent": null,
      "dueDate": null,
      "status": "PARTIAL",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-14T15:17:14.277Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": null,
      "childInvoices": [
        {
          "id": "51a9a8c0-546f-4b43-9cc5-9872443c04d1",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
          "invoiceNumber": "INV-2026-0001-T2",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "6693750",
          "paidAmount": "0",
          "remainingAmount": "6693750",
          "percent": "25",
          "dueDate": "2026-08-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": "INV-2026-0001-T2-1781455304620",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/6ab0cbfa-20c3-4b8a-b6cf-41c5a9a6647b",
          "issuedAt": "2026-06-14T15:17:14.306Z",
          "deletedAt": null
        },
        {
          "id": "35fa4908-80bf-4142-a289-f8050ebf9576",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
          "invoiceNumber": "INV-2026-0001-T3",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "13387500",
          "paidAmount": "0",
          "remainingAmount": "13387500",
          "percent": "50",
          "dueDate": "2026-09-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-14T15:17:14.309Z",
          "deletedAt": null
        },
        {
          "id": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
          "invoiceNumber": "INV-2026-0001-T1",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "6693750",
          "paidAmount": "6693750",
          "remainingAmount": "0",
          "percent": "25",
          "dueDate": "2026-07-10T00:00:00.000Z",
          "status": "PAID",
          "midtransOrderId": "INV-2026-0001-T1-1781451519251",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/2c0d817e-de59-4ace-a0ac-2a48f2a5b9d9",
          "issuedAt": "2026-06-14T15:17:14.292Z",
          "deletedAt": null
        }
      ]
    }
  ]
}
```

---

## Invoice Detail terms

GET

```http://localhost:3000/api/invoices/{MASTER_ID}/terms
```

Response 

```json
{
  "success": true,
  "data": {
    "masterInvoice": {
      "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0003",
      "invoiceKind": "MASTER",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "1778000",
      "paidAmount": "0",
      "remainingAmount": "1778000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.419Z",
      "deletedAt": null,
      "childInvoices": [
        {
          "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T1",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "266700",
          "paidAmount": "0",
          "remainingAmount": "266700",
          "percent": "15",
          "dueDate": "2026-07-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": "INV-2026-0003-T1-1781507524890",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/af45ab39-c67f-475d-9ba1-633d17680950",
          "issuedAt": "2026-06-15T06:45:52.427Z",
          "deletedAt": null
        },
        {
          "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T2",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "622300",
          "paidAmount": "0",
          "remainingAmount": "622300",
          "percent": "35",
          "dueDate": "2026-08-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-15T06:45:52.428Z",
          "deletedAt": null
        },
        {
          "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T3",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "889000",
          "paidAmount": "0",
          "remainingAmount": "889000",
          "percent": "50",
          "dueDate": "2026-09-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-15T06:45:52.430Z",
          "deletedAt": null
        }
      ]
    },
    "terms": [
      {
        "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "invoiceNumber": "INV-2026-0003-T1",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "266700",
        "paidAmount": "0",
        "remainingAmount": "266700",
        "percent": "15",
        "dueDate": "2026-07-10T00:00:00.000Z",
        "status": "UNPAID",
        "midtransOrderId": "INV-2026-0003-T1-1781507524890",
        "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/af45ab39-c67f-475d-9ba1-633d17680950",
        "issuedAt": "2026-06-15T06:45:52.427Z",
        "deletedAt": null
      },
      {
        "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "invoiceNumber": "INV-2026-0003-T2",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "622300",
        "paidAmount": "0",
        "remainingAmount": "622300",
        "percent": "35",
        "dueDate": "2026-08-10T00:00:00.000Z",
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.428Z",
        "deletedAt": null
      },
      {
        "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "invoiceNumber": "INV-2026-0003-T3",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "889000",
        "paidAmount": "0",
        "remainingAmount": "889000",
        "percent": "50",
        "dueDate": "2026-09-10T00:00:00.000Z",
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.430Z",
        "deletedAt": null
      }
    ]
  }
}
```



---

## Invoice Progress

GET

```http://localhost:3000/api/invoices/9b65c9e9-2a58-4815-b3e2-6a9784fef7a4/progress
```

Response 

```json
{
  "success": true,
  "data": {
    "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
    "invoiceNumber": "INV-2026-0002",
    "amount": 15110000,
    "paidAmount": 0,
    "remainingAmount": 15110000,
    "progressPercent": 0,
    "status": "UNPAID"
  }
}
```

## Invoice Breakdown

GET

```http://localhost:3000/api/invoices/9b65c9e9-2a58-4815-b3e2-6a9784fef7a4/breakdown
```

Response 

```json
{
  "success": true,
  "data": {
    "id": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
    "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
    "parentInvoiceId": null,
    "invoiceNumber": "INV-2026-0002",
    "invoiceKind": "MASTER",
    "paymentType": "FULL",
    "paymentMethod": "QRIS_MIDTRANS",
    "amount": "15110000",
    "paidAmount": "0",
    "remainingAmount": "15110000",
    "percent": null,
    "dueDate": null,
    "status": "UNPAID",
    "midtransOrderId": "INV-2026-0002-1781502427578",
    "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/456021e6-e011-4526-ba0b-293adcf43526",
    "issuedAt": "2026-06-15T05:38:33.591Z",
    "deletedAt": null,
    "items": [
      {
        "id": "55f0754d-52cd-4831-b700-28025d0d761b",
        "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
        "itemType": "PRODUCT",
        "itemName": "Plavon PVC ukuran 10 mili 1 meter",
        "quantity": 17,
        "unitPrice": "430000",
        "totalPrice": "7310000",
        "createdAt": "2026-06-15T05:38:33.598Z"
      },
      {
        "id": "9cac7cf6-3848-4667-8ded-09fdcb1c8e40",
        "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
        "itemType": "SERVICE",
        "itemName": "Pemasangan Kramik per 1 meter",
        "quantity": 5,
        "unitPrice": "200000",
        "totalPrice": "1000000",
        "createdAt": "2026-06-15T05:38:33.602Z"
      },
      {
        "id": "8c985f90-9fb2-4d62-950b-1ebd3bd63783",
        "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
        "itemType": "PRODUCT",
        "itemName": "Besi Beton Polos 10 mm / batang",
        "quantity": 100,
        "unitPrice": "68000",
        "totalPrice": "6800000",
        "createdAt": "2026-06-15T05:38:33.604Z"
      }
    ],
    "deal": {
      "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
      "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
      "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "value": "15110000",
      "status": "WON",
      "collectionStatus": "UNPAID",
      "collectedAmount": "0",
      "outstandingAmount": "0",
      "createdAt": "2026-06-15T04:57:35.160Z",
      "deletedAt": null,
      "lead": {
        "id": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
        "name": "Manda Putri Dewi",
        "company": "PT Hutama Karya",
        "email": "pthk@hutamakarya.com",
        "phone": "0218193708",
        "address": "HK Tower Kav. 8, Cawang, Jakarta",
        "district": "Jl Letjen MT Haryono",
        "city": "East Jakarta City",
        "province": "DKI Jakarta",
        "postalCode": "13340",
        "country": "Indonesia",
        "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
        "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
        "createdBy": "bf4acd04-565e-4465-a212-c6ba8c64a9f8",
        "status": "WON",
        "lastActivityAt": "2026-06-15T05:06:54.727Z",
        "createdAt": "2026-06-15T04:02:11.641Z",
        "deletedAt": null
      },
      "assignee": {
        "id": "6247bf01-fc94-4986-a554-959d61ec8d6f",
        "name": "Roni Hutapea",
        "email": "002-sls-ronihutapea@fecrm.com",
        "role": "SALES"
      },
      "creator": {
        "id": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "name": "Ferdy Salsabilla",
        "email": "001-sls-ferdysalsabilla@fecrm.com",
        "role": "SALES"
      },
      "items": [
        {
          "id": "89ee1228-8de5-4923-96a0-07191bb9c334",
          "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
          "type": "PRODUCT",
          "refId": "735c3a7d-b324-4ea2-97c9-4e145de1a1c1",
          "itemName": "Plavon PVC ukuran 10 mili 1 meter",
          "quantity": 17,
          "price": "432500",
          "unitPrice": "430000",
          "totalPrice": "7310000",
          "createdAt": "2026-06-15T05:18:06.616Z",
          "negotiations": [
            {
              "id": "bc42b432-b50a-4706-add1-5edbdeb3450b",
              "transactionItemId": "89ee1228-8de5-4923-96a0-07191bb9c334",
              "requestedBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
              "approvedBy": "f97a05e9-655d-42b2-96e6-767014c60337",
              "status": "APPROVED",
              "oldPrice": "432500",
              "requestedPrice": "430000",
              "approvedPrice": "430000",
              "reason": "Client minta diskon sir untuk produk kita ini, dia ambil 17 mater soalnya, kira kira gimana sir?",
              "reviewedAt": "2026-06-15T05:27:33.502Z",
              "createdAt": "2026-06-15T05:26:16.838Z",
              "requester": {
                "name": "Ferdy Salsabilla"
              },
              "approver": {
                "name": "Reynold Almounduchi"
              }
            }
          ]
        },
        {
          "id": "bd0052aa-5336-4d70-8fc6-3cc5464ff118",
          "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
          "type": "SERVICE",
          "refId": "66435b51-fb80-4997-ba97-3c5d05a86603",
          "itemName": "Pemasangan Kramik per 1 meter",
          "quantity": 5,
          "price": "215000",
          "unitPrice": "200000",
          "totalPrice": "1000000",
          "createdAt": "2026-06-15T05:20:39.622Z",
          "negotiations": [
            {
              "id": "9df6c168-9c0b-4338-acd3-ada8575aab14",
              "transactionItemId": "bd0052aa-5336-4d70-8fc6-3cc5464ff118",
              "requestedBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
              "approvedBy": "f97a05e9-655d-42b2-96e6-767014c60337",
              "status": "APPROVED",
              "oldPrice": "215000",
              "requestedPrice": "200000",
              "approvedPrice": "200000",
              "reason": "Client minta diskon sir untuk produk kita ini, dia ambil 5 mater soalnya, kira kira gimana sir?",
              "reviewedAt": "2026-06-15T05:27:05.483Z",
              "createdAt": "2026-06-15T05:26:07.684Z",
              "requester": {
                "name": "Ferdy Salsabilla"
              },
              "approver": {
                "name": "Reynold Almounduchi"
              }
            }
          ]
        },
        {
          "id": "a081be19-4c16-40ff-a2e2-a8aa5e6f2ded",
          "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
          "type": "PRODUCT",
          "refId": "60bad7c1-cc0d-4851-adde-7f6edde2894c",
          "itemName": "Besi Beton Polos 10 mm / batang",
          "quantity": 100,
          "price": "68000",
          "unitPrice": "68000",
          "totalPrice": "6800000",
          "createdAt": "2026-06-15T05:29:34.626Z",
          "negotiations": []
        }
      ]
    },
    "parentInvoice": null,
    "childInvoices": [],
    "payments": [],
    "negotiations": [
      {
        "itemName": "Plavon PVC ukuran 10 mili 1 meter",
        "quantity": 17,
        "oldPrice": "432500",
        "approvedPrice": "430000",
        "requester": {
          "name": "Ferdy Salsabilla"
        },
        "approver": {
          "name": "Reynold Almounduchi"
        },
        "createdAt": "2026-06-15T05:26:16.838Z"
      },
      {
        "itemName": "Pemasangan Kramik per 1 meter",
        "quantity": 5,
        "oldPrice": "215000",
        "approvedPrice": "200000",
        "requester": {
          "name": "Ferdy Salsabilla"
        },
        "approver": {
          "name": "Reynold Almounduchi"
        },
        "createdAt": "2026-06-15T05:26:07.684Z"
      }
    ]
  }
}
```

## Invoice id

GET 

```http://localhost:3000/api/invoices/id
```

Response 

```json
{
  "success": true,
  "data": [
    {
      "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "invoiceNumber": "INV-2026-0003-T3",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "889000",
      "paidAmount": "0",
      "remainingAmount": "889000",
      "percent": "50",
      "dueDate": "2026-09-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.430Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0003",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "1778000",
        "paidAmount": "0",
        "remainingAmount": "1778000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.419Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "invoiceNumber": "INV-2026-0003-T2",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "622300",
      "paidAmount": "0",
      "remainingAmount": "622300",
      "percent": "35",
      "dueDate": "2026-08-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.428Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0003",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "1778000",
        "paidAmount": "0",
        "remainingAmount": "1778000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.419Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "invoiceNumber": "INV-2026-0003-T1",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "266700",
      "paidAmount": "0",
      "remainingAmount": "266700",
      "percent": "15",
      "dueDate": "2026-07-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": "INV-2026-0003-T1-1781507524890",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/af45ab39-c67f-475d-9ba1-633d17680950",
      "issuedAt": "2026-06-15T06:45:52.427Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
        "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0003",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "1778000",
        "paidAmount": "0",
        "remainingAmount": "1778000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-15T06:45:52.419Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "83eb1b21-dca9-471a-865d-52cde37053cb",
      "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0003",
      "invoiceKind": "MASTER",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "1778000",
      "paidAmount": "0",
      "remainingAmount": "1778000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-15T06:45:52.419Z",
      "deletedAt": null,
      "deal": {
        "id": "5c1bd228-03ff-483d-8216-574248bd899b",
        "leadId": "a9138b81-978e-4091-a3ce-aa3cf9a1a61c",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "1778000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T06:39:49.588Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": null,
      "childInvoices": [
        {
          "id": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T1",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "266700",
          "paidAmount": "0",
          "remainingAmount": "266700",
          "percent": "15",
          "dueDate": "2026-07-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": "INV-2026-0003-T1-1781507524890",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/af45ab39-c67f-475d-9ba1-633d17680950",
          "issuedAt": "2026-06-15T06:45:52.427Z",
          "deletedAt": null
        },
        {
          "id": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T2",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "622300",
          "paidAmount": "0",
          "remainingAmount": "622300",
          "percent": "35",
          "dueDate": "2026-08-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-15T06:45:52.428Z",
          "deletedAt": null
        },
        {
          "id": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
          "dealId": "5c1bd228-03ff-483d-8216-574248bd899b",
          "parentInvoiceId": "83eb1b21-dca9-471a-865d-52cde37053cb",
          "invoiceNumber": "INV-2026-0003-T3",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "889000",
          "paidAmount": "0",
          "remainingAmount": "889000",
          "percent": "50",
          "dueDate": "2026-09-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-15T06:45:52.430Z",
          "deletedAt": null
        }
      ]
    },
    {
      "id": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
      "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0002",
      "invoiceKind": "MASTER",
      "paymentType": "FULL",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "15110000",
      "paidAmount": "0",
      "remainingAmount": "15110000",
      "percent": null,
      "dueDate": null,
      "status": "UNPAID",
      "midtransOrderId": "INV-2026-0002-1781502427578",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/456021e6-e011-4526-ba0b-293adcf43526",
      "issuedAt": "2026-06-15T05:38:33.591Z",
      "deletedAt": null,
      "deal": {
        "id": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
        "leadId": "c5a6764a-b4b0-4e8e-8fb7-acdfad2c54dd",
        "assignedTo": "6247bf01-fc94-4986-a554-959d61ec8d6f",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "15110000",
        "status": "WON",
        "collectionStatus": "UNPAID",
        "collectedAmount": "0",
        "outstandingAmount": "0",
        "createdAt": "2026-06-15T04:57:35.160Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": null,
      "childInvoices": []
    },
    {
      "id": "35fa4908-80bf-4142-a289-f8050ebf9576",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "invoiceNumber": "INV-2026-0001-T3",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "13387500",
      "paidAmount": "0",
      "remainingAmount": "13387500",
      "percent": "50",
      "dueDate": "2026-09-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-14T15:17:14.309Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0001",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "26775000",
        "paidAmount": "6693750",
        "remainingAmount": "20081250",
        "percent": null,
        "dueDate": null,
        "status": "PARTIAL",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-14T15:17:14.277Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "51a9a8c0-546f-4b43-9cc5-9872443c04d1",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "invoiceNumber": "INV-2026-0001-T2",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "6693750",
      "paidAmount": "0",
      "remainingAmount": "6693750",
      "percent": "25",
      "dueDate": "2026-08-10T00:00:00.000Z",
      "status": "UNPAID",
      "midtransOrderId": "INV-2026-0001-T2-1781455304620",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/6ab0cbfa-20c3-4b8a-b6cf-41c5a9a6647b",
      "issuedAt": "2026-06-14T15:17:14.306Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": {
        "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0001",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "26775000",
        "paidAmount": "6693750",
        "remainingAmount": "20081250",
        "percent": null,
        "dueDate": null,
        "status": "PARTIAL",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-14T15:17:14.277Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "invoiceNumber": "INV-2026-0001-T1",
      "invoiceKind": "TERMIN",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "6693750",
      "paidAmount": "6693750",
      "remainingAmount": "0",
      "percent": "25",
      "dueDate": "2026-07-10T00:00:00.000Z",
      "status": "PAID",
      "midtransOrderId": "INV-2026-0001-T1-1781451519251",
      "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/2c0d817e-de59-4ace-a0ac-2a48f2a5b9d9",
      "issuedAt": "2026-06-14T15:17:14.292Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [
        {
          "id": "d106c666-be3a-4a34-a7e7-845fa9d5b022",
          "invoiceId": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
          "amount": "6693750",
          "paymentMethod": "QRIS_MIDTRANS",
          "proofUrl": null,
          "referenceNumber": "INV-2026-0001-T1-1781451519251",
          "status": "VERIFIED",
          "uploadedBy": null,
          "verifiedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
          "verifiedAt": "2026-06-14T16:15:12.767Z",
          "paidAt": "2026-06-14T16:15:12.767Z",
          "midtransTransactionId": "7ff2249e-e41e-4054-a0ac-d85f505b0b06",
          "gatewayResponse": {
            "issuer": "dana",
            "pop_id": "6481408a-21c4-4954-badf-0d458147cb1a",
            "acquirer": "gopay",
            "currency": "IDR",
            "order_id": "INV-2026-0001-T1-1781451519251",
            "expiry_time": "2026-06-21 23:14:54",
            "merchant_id": "M956710557",
            "status_code": "200",
            "fraud_status": "accept",
            "gross_amount": "6693750.00",
            "payment_type": "qris",
            "signature_key": "23e6e6e9ab7c841b14ea5d08a25b6d4e47a0640337e685d7d9b1b0a1f2367ea022a797c98baed4e1d304444f654ba5de2181419c0c13fac3b532bb348cc05610",
            "status_message": "midtrans payment notification",
            "transaction_id": "7ff2249e-e41e-4054-a0ac-d85f505b0b06",
            "settlement_time": "2026-06-14 23:15:13",
            "customer_details": {
              "email": "sucinuretika@gmail.com",
              "phone": "+6285772577615",
              "full_name": "Suci Nur Etika"
            },
            "transaction_time": "2026-06-14 23:14:54",
            "transaction_type": "off-us",
            "transaction_status": "settlement"
          },
          "createdAt": "2026-06-14T16:15:12.761Z"
        }
      ],
      "parentInvoice": {
        "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0001",
        "invoiceKind": "MASTER",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "26775000",
        "paidAmount": "6693750",
        "remainingAmount": "20081250",
        "percent": null,
        "dueDate": null,
        "status": "PARTIAL",
        "midtransOrderId": null,
        "qrisUrl": null,
        "issuedAt": "2026-06-14T15:17:14.277Z",
        "deletedAt": null
      },
      "childInvoices": []
    },
    {
      "id": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
      "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
      "parentInvoiceId": null,
      "invoiceNumber": "INV-2026-0001",
      "invoiceKind": "MASTER",
      "paymentType": "TERMIN",
      "paymentMethod": "QRIS_MIDTRANS",
      "amount": "26775000",
      "paidAmount": "6693750",
      "remainingAmount": "20081250",
      "percent": null,
      "dueDate": null,
      "status": "PARTIAL",
      "midtransOrderId": null,
      "qrisUrl": null,
      "issuedAt": "2026-06-14T15:17:14.277Z",
      "deletedAt": null,
      "deal": {
        "id": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "leadId": "defe39b9-127d-4ee7-ac85-97fe0b643665",
        "assignedTo": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "createdBy": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
        "value": "26775000",
        "status": "OPEN",
        "collectionStatus": "PARTIAL",
        "collectedAmount": "6693750",
        "outstandingAmount": "20081250",
        "createdAt": "2026-06-14T15:08:28.622Z",
        "deletedAt": null
      },
      "payments": [],
      "parentInvoice": null,
      "childInvoices": [
        {
          "id": "51a9a8c0-546f-4b43-9cc5-9872443c04d1",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
          "invoiceNumber": "INV-2026-0001-T2",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "6693750",
          "paidAmount": "0",
          "remainingAmount": "6693750",
          "percent": "25",
          "dueDate": "2026-08-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": "INV-2026-0001-T2-1781455304620",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/6ab0cbfa-20c3-4b8a-b6cf-41c5a9a6647b",
          "issuedAt": "2026-06-14T15:17:14.306Z",
          "deletedAt": null
        },
        {
          "id": "35fa4908-80bf-4142-a289-f8050ebf9576",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
          "invoiceNumber": "INV-2026-0001-T3",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "13387500",
          "paidAmount": "0",
          "remainingAmount": "13387500",
          "percent": "50",
          "dueDate": "2026-09-10T00:00:00.000Z",
          "status": "UNPAID",
          "midtransOrderId": null,
          "qrisUrl": null,
          "issuedAt": "2026-06-14T15:17:14.309Z",
          "deletedAt": null
        },
        {
          "id": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
          "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
          "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
          "invoiceNumber": "INV-2026-0001-T1",
          "invoiceKind": "TERMIN",
          "paymentType": "TERMIN",
          "paymentMethod": "QRIS_MIDTRANS",
          "amount": "6693750",
          "paidAmount": "6693750",
          "remainingAmount": "0",
          "percent": "25",
          "dueDate": "2026-07-10T00:00:00.000Z",
          "status": "PAID",
          "midtransOrderId": "INV-2026-0001-T1-1781451519251",
          "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/2c0d817e-de59-4ace-a0ac-2a48f2a5b9d9",
          "issuedAt": "2026-06-14T15:17:14.292Z",
          "deletedAt": null
        }
      ]
    }
  ]
}
```

## Invoice PDF

GET

```http://localhost:3000/api/invoices/6349446b-6065-4a3e-9ecf-cf0b8fe81c0e/pdf
```

Response

```http://localhost:3000/api/invoices/6eb0237a-a47f-48bb-bc14-e1c79993467e/pdf bisa langsung akses di browser
```

---

# PAYMENT

## Upload Payment

POST

```http://localhost:3000/api/payments
```

Request

```json
{
  "invoiceId": "",
  "amount": 10000000,
  "proofUrl": ""
}
```

Response

```json
{
  "success": true,
  "data": {
    "id": "16a6d586-72ca-4f2e-9e90-6478fb5f4ce4",
    "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
    "amount": "15110000",
    "paymentMethod": "QRIS_MIDTRANS",
    "proofUrl": "https://trello.com/b/wJBS2QD8/fecrm",
    "referenceNumber": null,
    "status": "PENDING",
    "uploadedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
    "verifiedBy": null,
    "verifiedAt": null,
    "paidAt": null,
    "midtransTransactionId": null,
    "gatewayResponse": null,
    "createdAt": "2026-06-15T07:45:22.984Z"
  }
}
```

---

## Payment List

GET

```http
/api/payments
```

Response 

```json
{
  "success": true,
  "data": [
    {
      "id": "16a6d586-72ca-4f2e-9e90-6478fb5f4ce4",
      "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
      "amount": "15110000",
      "paymentMethod": "QRIS_MIDTRANS",
      "proofUrl": "https://trello.com/b/wJBS2QD8/fecrm",
      "referenceNumber": null,
      "status": "PENDING",
      "uploadedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
      "verifiedBy": null,
      "verifiedAt": null,
      "paidAt": null,
      "midtransTransactionId": null,
      "gatewayResponse": null,
      "createdAt": "2026-06-15T07:45:22.984Z",
      "invoice": {
        "id": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
        "dealId": "5c73ea1e-abd9-4a63-95e9-ba525e5dda8d",
        "parentInvoiceId": null,
        "invoiceNumber": "INV-2026-0002",
        "invoiceKind": "MASTER",
        "paymentType": "FULL",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "15110000",
        "paidAmount": "0",
        "remainingAmount": "15110000",
        "percent": null,
        "dueDate": null,
        "status": "UNPAID",
        "midtransOrderId": "INV-2026-0002-1781502427578",
        "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/456021e6-e011-4526-ba0b-293adcf43526",
        "issuedAt": "2026-06-15T05:38:33.591Z",
        "deletedAt": null
      },
      "verifier": null,
      "uploader": {
        "id": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
        "name": "Super Admin",
        "email": "admin@fecrm.com",
        "role": "ADMIN",
        "isActive": true,
        "createdAt": "2026-06-09T07:40:23.360Z",
        "deletedAt": null
      }
    },
    {
      "id": "d106c666-be3a-4a34-a7e7-845fa9d5b022",
      "invoiceId": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
      "amount": "6693750",
      "paymentMethod": "QRIS_MIDTRANS",
      "proofUrl": null,
      "referenceNumber": "INV-2026-0001-T1-1781451519251",
      "status": "VERIFIED",
      "uploadedBy": null,
      "verifiedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
      "verifiedAt": "2026-06-14T16:15:12.767Z",
      "paidAt": "2026-06-14T16:15:12.767Z",
      "midtransTransactionId": "7ff2249e-e41e-4054-a0ac-d85f505b0b06",
      "gatewayResponse": {
        "issuer": "dana",
        "pop_id": "6481408a-21c4-4954-badf-0d458147cb1a",
        "acquirer": "gopay",
        "currency": "IDR",
        "order_id": "INV-2026-0001-T1-1781451519251",
        "expiry_time": "2026-06-21 23:14:54",
        "merchant_id": "M956710557",
        "status_code": "200",
        "fraud_status": "accept",
        "gross_amount": "6693750.00",
        "payment_type": "qris",
        "signature_key": "23e6e6e9ab7c841b14ea5d08a25b6d4e47a0640337e685d7d9b1b0a1f2367ea022a797c98baed4e1d304444f654ba5de2181419c0c13fac3b532bb348cc05610",
        "status_message": "midtrans payment notification",
        "transaction_id": "7ff2249e-e41e-4054-a0ac-d85f505b0b06",
        "settlement_time": "2026-06-14 23:15:13",
        "customer_details": {
          "email": "sucinuretika@gmail.com",
          "phone": "+6285772577615",
          "full_name": "Suci Nur Etika"
        },
        "transaction_time": "2026-06-14 23:14:54",
        "transaction_type": "off-us",
        "transaction_status": "settlement"
      },
      "createdAt": "2026-06-14T16:15:12.761Z",
      "invoice": {
        "id": "27dd0c91-795a-4b5b-bd50-6a354c9229e1",
        "dealId": "0d880e3e-d528-4e28-8872-b1fe2862f325",
        "parentInvoiceId": "6349446b-6065-4a3e-9ecf-cf0b8fe81c0e",
        "invoiceNumber": "INV-2026-0001-T1",
        "invoiceKind": "TERMIN",
        "paymentType": "TERMIN",
        "paymentMethod": "QRIS_MIDTRANS",
        "amount": "6693750",
        "paidAmount": "6693750",
        "remainingAmount": "0",
        "percent": "25",
        "dueDate": "2026-07-10T00:00:00.000Z",
        "status": "PAID",
        "midtransOrderId": "INV-2026-0001-T1-1781451519251",
        "qrisUrl": "https://app.sandbox.midtrans.com/snap/v4/redirection/2c0d817e-de59-4ace-a0ac-2a48f2a5b9d9",
        "issuedAt": "2026-06-14T15:17:14.292Z",
        "deletedAt": null
      },
      "verifier": {
        "id": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
        "name": "Super Admin",
        "email": "admin@fecrm.com",
        "role": "ADMIN",
        "isActive": true,
        "createdAt": "2026-06-09T07:40:23.360Z",
        "deletedAt": null
      },
      "uploader": null
    }
  ]
}
```

---

## Verify Payment

PATCH

```http://localhost:3000/api/payments/verify
```

Request

```json
{
  "paymentId": "16a6d586-72ca-4f2e-9e90-6478fb5f4ce4",
  "proofUrl": "https://trello.com/b/wJBS2QD8/fecrm",
  "status": "VERIFIED"
}
```

Response

```json
{
  "success": true,
  "data": {
    "paymentStatus": "VERIFIED",
    "invoiceStatus": "PAID"
  }
}
```

---

## Reject Payment

PUT

```http://localhost:3000/api/payments/reject/:id
```

Response

```json
{
  "success": true,
  "data": {
    "id": "16a6d586-72ca-4f2e-9e90-6478fb5f4ce4",
    "invoiceId": "9b65c9e9-2a58-4815-b3e2-6a9784fef7a4",
    "amount": "15110000",
    "paymentMethod": "QRIS_MIDTRANS",
    "proofUrl": "https://trello.com/b/wJBS2QD8/fecrm",
    "referenceNumber": null,
    "status": "REJECTED",
    "uploadedBy": "7e652f6b-53bb-4d99-89e8-dc21e377c1c9",
    "verifiedBy": "57d5a2c9-f4dd-43d2-a866-a0042fe66b64",
    "verifiedAt": "2026-06-15T08:02:09.092Z",
    "paidAt": "2026-06-15T07:55:29.874Z",
    "midtransTransactionId": null,
    "gatewayResponse": null,
    "createdAt": "2026-06-15T07:45:22.984Z"
  }
}
```

---

# COLLECTION

## Collection Dashboard

GET

```http://localhost:3000/api/collections/worklist
```

Response

```json
{
  "success": true,
  "data": [
    {
      "invoiceId": "6eb0237a-a47f-48bb-bc14-e1c79993467e",
      "invoiceNumber": "INV-2026-0003-T1",
      "company": "PT Luragung Jaya",
      "customer": "Ananda GIlang Prasetyo",
      "dueDate": "2026-07-10T00:00:00.000Z",
      "status": "UNPAID",
      "amount": 266700,
      "remainingAmount": 266700,
      "daysOverdue": 0,
      "priority": "LOW"
    },
    {
      "invoiceId": "51a9a8c0-546f-4b43-9cc5-9872443c04d1",
      "invoiceNumber": "INV-2026-0001-T2",
      "company": "PT Garuda Makmur Perkasa",
      "customer": "Suci Nur Etika",
      "dueDate": "2026-08-10T00:00:00.000Z",
      "status": "UNPAID",
      "amount": 6693750,
      "remainingAmount": 6693750,
      "daysOverdue": 0,
      "priority": "LOW"
    },
    {
      "invoiceId": "73b5e9fe-c76a-4e0f-b88b-068d3f92ad3b",
      "invoiceNumber": "INV-2026-0003-T2",
      "company": "PT Luragung Jaya",
      "customer": "Ananda GIlang Prasetyo",
      "dueDate": "2026-08-10T00:00:00.000Z",
      "status": "UNPAID",
      "amount": 622300,
      "remainingAmount": 622300,
      "daysOverdue": 0,
      "priority": "LOW"
    },
    {
      "invoiceId": "35fa4908-80bf-4142-a289-f8050ebf9576",
      "invoiceNumber": "INV-2026-0001-T3",
      "company": "PT Garuda Makmur Perkasa",
      "customer": "Suci Nur Etika",
      "dueDate": "2026-09-10T00:00:00.000Z",
      "status": "UNPAID",
      "amount": 13387500,
      "remainingAmount": 13387500,
      "daysOverdue": 0,
      "priority": "LOW"
    },
    {
      "invoiceId": "b552e9cb-88c3-4bf9-aeb9-029bd4beac60",
      "invoiceNumber": "INV-2026-0003-T3",
      "company": "PT Luragung Jaya",
      "customer": "Ananda GIlang Prasetyo",
      "dueDate": "2026-09-10T00:00:00.000Z",
      "status": "UNPAID",
      "amount": 889000,
      "remainingAmount": 889000,
      "daysOverdue": 0,
      "priority": "LOW"
    }
  ]
}
```

---

# NOTIFICATION

## My Notifications

GET

```http://localhost:3000/api/notifications
```

Response 

```json
{
  "success": true,
  "data": []
}
```

---

# Reporting API


GET | http://localhost:3000/api/reports/finance-kpi

Response : 

```json
{
  "success": true,
  "data": {
    "dso": 182.73,
    "collectionRate": 49.94,
    "overdueRate": 0,
    "collectionEfficiency": 100,
    "averageCollectionDays": 1
  }
}
```

GET | http://localhost:3000/api/reports/collection-dashboard

Response : 

```json
{
  "success": true,
  "data": {
    "receivable": 43663000,
    "collected": 21803750,
    "outstanding": 20081250,
    "overdue": 0,
    "collectionRate": 49.94,
    "overdueInvoices": 0,
    "overdueDeals": 0
  }
}
```

GET | http://localhost:3000/api/reports/collection

Response : 

```json
{
  "success": true,
  "data": {
    "totalReceivable": 43663000,
    "totalCollected": 6693750,
    "totalOutstanding": 21859250,
    "totalOverdue": 0,
    "collectionRate": 15.33,
    "aging": {
      "bucket0to30": 0,
      "bucket31to60": 0,
      "bucket61to90": 0,
      "bucket90plus": 0
    }
  }
}
```

GET | http://localhost:3000/api/reports/aging

Response : 

```json
{
  "success": true,
  "data": {
    "bucket0to30": 0,
    "bucket31to60": 0,
    "bucket61to90": 0,
    "bucket90plus": 0
  }
}
```

GET | http://localhost:3000/api/reports/sales

Response : 

```json
{
  "success": true,
  "data": [
    {
      "salesId": "427b41d8-a8cf-474b-9fd1-6c94af92eaf3",
      "salesName": "Ferdy Salsabilla",
      "totalDeals": 2,
      "pipelineValue": 28553000,
      "collectedRevenue": 6693750,
      "outstandingRevenue": 20081250
    },
    {
      "salesId": "6247bf01-fc94-4986-a554-959d61ec8d6f",
      "salesName": "Roni Hutapea",
      "totalDeals": 1,
      "pipelineValue": 15110000,
      "collectedRevenue": 15110000,
      "outstandingRevenue": 0
    },
    {
      "salesId": "0ef75af7-3f68-41cc-848c-628025f160e0",
      "salesName": "Aditya Praja Dwikarya",
      "totalDeals": 0,
      "pipelineValue": 0,
      "collectedRevenue": 0,
      "outstandingRevenue": 0
    }
  ]
}
```

GET | http://localhost:3000/api/reports/pipeline

Response : 

```json
{
  "success": true,
  "data": {
    "totalLead": 3,
    "totalNegotiation": 0,
    "totalWon": 3,
    "totalLost": 0
  }
}
```

GET | http://localhost:3000/api/reports/souces

Response : 

```json
{
  "success": true,
  "data": [
    {
      "sourceId": "dc3566ef-cf43-4811-9771-deee0c86e3b1",
      "sourceName": "Event",
      "totalLead": 1,
      "totalWon": 1,
      "conversionRate": 100
    },
    {
      "sourceId": "a8b859b4-b9af-4b40-802b-cf7cbc62e40b",
      "sourceName": "Komunitas",
      "totalLead": 0,
      "totalWon": 0,
      "conversionRate": 0
    },
    {
      "sourceId": "93cd49ff-4381-473f-b170-5c4117df3579",
      "sourceName": "Digital Marketing",
      "totalLead": 1,
      "totalWon": 1,
      "conversionRate": 100
    },
    {
      "sourceId": "3ca0e86d-b36f-498d-80a6-b928e7a0fba5",
      "sourceName": "Pengajuan Proposal",
      "totalLead": 1,
      "totalWon": 1,
      "conversionRate": 100
    },
    {
      "sourceId": "6785c8ac-1c23-4c88-bdba-709a6519a2eb",
      "sourceName": "Website",
      "totalLead": 0,
      "totalWon": 0,
      "conversionRate": 0
    }
  ]
}
```

GET | http://localhost:3000/api/reports/convertion

Response : 

```json
{
  "success": true,
  "data": {
    "totalLead": 3,
    "totalWon": 3,
    "conversionRate": 100
  }
}
```

POST | http://localhost:3000/api/reports/overdue-check

Response : 

```json
{
  "success": true,
  "data": {
    "updated": 0
  }
}
```

---

# ENUM CONTRACT

Frontend wajib menggunakan enum berikut.

## UserRole

```text
MARKETING
SALES
ADMIN
FINANCE
MANAGER
```

---

## LeadStatus

```text
NEW
CONTACTED
NEGOTIATION
WON
LOST
```

---

## DealStatus

```text
OPEN
NEGOTIATION
WON
LOST
```

---

## NegotiationStatus

```text
PENDING
APPROVED
REJECTED
```

---

## InvoiceStatus

```text
DRAFT
UNPAID
PARTIAL
PAID
OVERDUE
CANCELLED
```

---

## CollectionStatus

```text
UNPAID
PARTIAL
PAID
```

---

## PaymentStatus

```text
PENDING
VERIFIED
REJECTED
```

---

## PaymentMethod

```text
MANUAL_TRANSFER
QRIS_MIDTRANS
```

---

## PaymentType

```text
FULL
TERMIN
```

## ActivityType 
  SYSTEM
  NOTE
  STATUS
  ASSIGNMENT
  COMMUNICATION
  NEGOTIATION
  FINANCE
  CALL
  MEETING
  EMAIL

## ItemType 
  PRODUCT
  SERVICE

## CommunicationChannel 
  WA
  EMAIL
  CALL

## CommunicationStatus
  SENT
  DELIVERED
  READ
  FAILED

## CommunicationDirection
  OUTBOUND
  INBOUND


---

# FRONTEND RULES

Frontend tidak diperbolehkan:

* Menghitung Collection Status
* Menghitung Invoice Status
* Menghitung Outstanding Amount
* Menghitung Negotiation Saving
* Menghitung Revenue

Semua business calculation dilakukan oleh backend.

Frontend hanya bertugas:

* Display
* Filtering
* Searching
* Sorting
* Visualization

Semua source of truth berasal dari API FECRM.
