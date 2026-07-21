# DATABASE DESIGN

## FECRM Database Architecture

FECRM menggunakan PostgreSQL sebagai database utama dan Prisma ORM sebagai data access layer.

Database dirancang menggunakan pendekatan:

* Relational Database Design
* Normalized Structure (3NF)
* Audit Trail Support
* Soft Delete Support
* Role-Based Access Control
* Invoice Hierarchy System
* Negotiation Approval Workflow


# Database Statistics

| Category             | Count |
| -------------------- | ----- |
| Enum                 | 13    |
| Main Entity          | 17    |
| Core Business Module | 8     |
| User Role            | 5     |


# Entity Relationship Diagram (ERD)

```mermaid
erDiagram

    USER {
        string id PK
        string name
        string email
        enum role
        boolean isActive
        datetime createdAt
    }

    AUTH {
        string id PK
        string userId FK
        string passwordHash
        string refreshToken
        datetime lastLoginAt
    }

    LEAD_SOURCE {
        string id PK
        string name
    }

    LEAD {
        string id PK
        string name
        string company
        string email
        string phone

        string address
        string district
        string city
        string province
        string postalCode
        string country

        string sourceId FK
        string assignedTo FK
        string createdBy FK

        enum status
        datetime lastActivityAt
        datetime createdAt
    }

    ACTIVITY {
        string id PK
        string leadId FK
        string userId FK
        enum type
        string description
        datetime createdAt
    }

    NEGOTIATION_NOTE {
        string id PK
        string leadId FK
        string userId FK
        string note
        datetime createdAt
    }

    DEAL {
        string id PK
        string leadId FK
        string assignedTo FK
        string createdBy FK

        decimal value

        enum status
        enum collectionStatus

        decimal collectedAmount
        decimal outstandingAmount

        datetime createdAt
    }

    TRANSACTION_ITEM {
        string id PK
        string dealId FK

        enum type

        string refId
        string itemName

        int quantity

        decimal price
        decimal unitPrice
        decimal totalPrice

        datetime createdAt
    }

    NEGOTIATION_REQUEST {
        string id PK
        string transactionItemId FK

        string requestedBy FK
        string approvedBy FK

        enum status

        decimal oldPrice
        decimal requestedPrice
        decimal approvedPrice

        string reason

        datetime reviewedAt
        datetime createdAt
    }

    INVOICE {
        string id PK

        string dealId FK
        string parentInvoiceId FK

        string invoiceNumber

        enum invoiceKind

        enum paymentType
        enum paymentMethod

        decimal amount
        decimal paidAmount
        decimal remainingAmount

        decimal percent

        date dueDate

        enum status

        string midtransOrderId
        string qrisUrl

        datetime issuedAt
    }

    INVOICE_ITEM {
        string id PK

        string invoiceId FK

        enum itemType

        string itemName

        int quantity

        decimal unitPrice
        decimal totalPrice
    }

    PAYMENT {
        string id PK

        string invoiceId FK

        decimal amount

        enum paymentMethod
        enum status

        string uploadedBy FK
        string verifiedBy FK

        string proofUrl
        string referenceNumber

        datetime paidAt
        datetime verifiedAt
    }

    PRODUCT {
        string id PK
        string name
        decimal price
    }

    SERVICE {
        string id PK
        string name
        decimal price
    }

    COMMUNICATION_LOG {
        string id PK

        string leadId FK
        string userId FK

        enum channel
        enum direction
        enum status

        string message
        string externalId

        datetime createdAt
    }

    NOTIFICATION {
        string id PK
        string userId FK

        string title
        string message

        boolean isRead

        datetime createdAt
    }

    AUDIT_LOG {
        string id PK

        string entity
        string entityId

        string action

        json oldData
        json newData

        string userId FK

        datetime createdAt
    }

    USER ||--|| AUTH : has

    USER ||--o{ LEAD : assigned
    USER ||--o{ LEAD : created

    LEAD_SOURCE ||--o{ LEAD : source

    LEAD ||--o{ ACTIVITY : activity
    USER ||--o{ ACTIVITY : created

    LEAD ||--o{ NEGOTIATION_NOTE : notes
    USER ||--o{ NEGOTIATION_NOTE : created

    LEAD ||--|| DEAL : converted

    USER ||--o{ DEAL : assigned
    USER ||--o{ DEAL : created

    DEAL ||--o{ TRANSACTION_ITEM : contains

    TRANSACTION_ITEM ||--o{ NEGOTIATION_REQUEST : negotiation

    USER ||--o{ NEGOTIATION_REQUEST : requester
    USER ||--o{ NEGOTIATION_REQUEST : approver

    DEAL ||--o{ INVOICE : billing

    INVOICE ||--o{ INVOICE_ITEM : contains

    INVOICE ||--o{ PAYMENT : paid_by

    INVOICE ||--o{ INVOICE : parent_child

    USER ||--o{ PAYMENT : uploaded
    USER ||--o{ PAYMENT : verified

    LEAD ||--o{ COMMUNICATION_LOG : communication
    USER ||--o{ COMMUNICATION_LOG : sender

    USER ||--o{ NOTIFICATION : receives

    USER ||--o{ AUDIT_LOG : generated
```


# Core Business Relationship

## Lead Lifecycle

```text
Lead Source
    ↓
Lead
    ↓
Activity
    ↓
Communication
    ↓
Negotiation
    ↓
Deal
```


## Sales Lifecycle

```text
Deal
    ↓
Transaction Item
    ↓
Negotiation Request
    ↓
Manager Approval
    ↓
Invoice Generation
```


## Finance Lifecycle

```text
Invoice
    ↓
Payment
    ↓
Verification
    ↓
Collection Update
    ↓
Deal Collection Status
```


## Invoice Hierarchy

```text
MASTER INVOICE

├── TERMIN 1
├── TERMIN 2
└── TERMIN 3
```

Relasi ini menggunakan:

```text
Invoice.parentInvoiceId
```

Sehingga satu Master Invoice dapat memiliki banyak Termin Invoice.


# Database Design Principles

## Soft Delete

Entity yang mendukung soft delete:

* User
* Lead
* Deal
* Invoice

Menggunakan:

```text
deletedAt
```


## Auditability

Seluruh perubahan penting dicatat pada:

```text
AuditLog
```

Contoh:

* Create Lead
* Assign Lead
* Create Deal
* Approve Negotiation
* Create Invoice
* Verify Payment


## Scalability

Database dirancang agar mampu menangani:

* Ribuan Lead
* Ribuan Deal
* Ribuan Invoice
* Multi Sales Team
* Multi Finance Team
* Multi Negotiation Workflow


# Database Version

Current Schema Version:

```text
FECRM v1.0
```

Database Engine:

```text
PostgreSQL
```

ORM:

```text
Prisma ORM
```

Architecture:

```text
CRM + Sales Pipeline + Finance Collection
```
