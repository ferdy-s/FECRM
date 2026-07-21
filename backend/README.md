# FECRM Backend

Future Enterprise CRM (FECRM) adalah platform Customer Relationship Management (CRM) berbasis web yang dirancang untuk mengelola seluruh siklus pelanggan mulai dari akuisisi prospek (Lead), proses penjualan (Deal), negosiasi harga, komunikasi pelanggan, pembuatan invoice, pengelolaan pembayaran, hingga proses collection dan monitoring transaksi secara terintegrasi.


# Business Scope

FECRM mendukung proses bisnis B2B yang membutuhkan:

* Lead Management
* Sales Pipeline
* Product & Service Transaction
* Negotiation Approval Workflow
* Invoice Management
* Collection Management
* Payment Verification
* Communication Tracking
* Audit & Compliance Monitoring


# Technology Stack

## Backend

* Next.js API Route
* TypeScript
* Prisma ORM
* PostgreSQL

## Authentication

* JWT Access Token
* Refresh Token
* Role Based Access Control (RBAC)

## Payment

* Midtrans QRIS
* Manual Transfer

## Communication

* Email Gateway
* WhatsApp Gateway


# User Roles

FECRM menggunakan 5 level role utama.

## MARKETING

Bertanggung jawab memperoleh dan mengelola prospek awal.

Hak Akses:

* Create Lead
* Update Lead
* View Lead
* Manage Lead Source
* Create Activity
* Create Communication
* View Negotiation Notes

Tidak dapat:

* Approve Negotiation
* Verify Payment
* Manage Invoice


## SALES

Bertanggung jawab mengelola pelanggan hingga menjadi transaksi.

Hak Akses:

* Semua akses Marketing
* Create Deal
* Attach Product
* Attach Service
* Request Negotiation
* Create Invoice
* View Collection Status

Tidak dapat:

* Approve Negotiation
* Verify Payment


## MANAGER

Bertanggung jawab melakukan kontrol dan persetujuan.

Hak Akses:

* View All Leads
* View All Deals
* Approve Negotiation
* Reject Negotiation
* Monitoring Dashboard


## FINANCE

Bertanggung jawab mengelola pembayaran dan collection.

Hak Akses:

* Verify Payment
* Reject Payment
* Collection Monitoring
* Finance Dashboard
* Invoice Monitoring


## ADMIN

Bertanggung jawab terhadap konfigurasi sistem.

Hak Akses:

* Manage Users
* Manage Roles
* Manage Lead Sources
* View Audit Logs
* Full System Access


# Core Modules

## Authentication

Entity:

* User
* Auth

Fitur:

* Login
* Refresh Token
* Logout
* Change Password


## Lead Management

Entity:

* Lead
* LeadSource

Fitur:

* Create Lead
* Assign Lead
* Update Lead Status
* Lead Timeline
* Lead Detail

Status:

* NEW
* CONTACTED
* NEGOTIATION
* WON
* LOST

Alamat Lead:

* Address
* District
* City
* Province
* Postal Code
* Country


## Activity Timeline

Entity:

* Activity

Fitur:

* Activity Logging
* Timeline Tracking
* User Tracking

Jenis Aktivitas:

* SYSTEM
* NOTE
* STATUS
* ASSIGNMENT
* COMMUNICATION
* NEGOTIATION
* FINANCE
* CALL
* MEETING
* EMAIL


## Communication Engine

Entity:

* CommunicationLog

Channel:

* WhatsApp
* Email
* Call

Direction:

* OUTBOUND
* INBOUND

Status:

* SENT
* DELIVERED
* READ
* FAILED

Fitur:

* Send Email
* Send WhatsApp
* Communication History
* Customer Interaction Tracking


## Negotiation Module

Entity:

* NegotiationNote
* NegotiationRequest

Workflow:

Sales
→ Request Negotiation

Manager
→ Approve / Reject

System
→ Update Transaction Price

Status:

* PENDING
* APPROVED
* REJECTED

Fitur:

* Negotiation Approval
* Saving Calculation
* Negotiation History


## Deal Management

Entity:

* Deal

Fitur:

* Create Deal
* Deal Assignment
* Product Attachment
* Service Attachment
* Collection Tracking

Status:

* OPEN
* NEGOTIATION
* WON
* LOST

Collection:

* UNPAID
* PARTIAL
* PAID

## Product & Service Catalog

Entity:

* Product
* Service

Fitur:

* Product Management
* Service Management
* Pricing Management

## Transaction Item Engine

Entity:

* TransactionItem

Fungsi:

Menyimpan snapshot item transaksi yang digunakan dalam Deal.

Mendukung:

* Product
* Service
* Negotiation

## Invoice Engine

Entity:

* Invoice
* InvoiceItem

Jenis Invoice:

### MASTER

Dokumen induk transaksi.

Berisi:

* Nilai kontrak
* Item transaksi
* Riwayat negosiasi
* Jadwal termin

### TERMIN

Invoice penagihan individual.

Berisi:

* Persentase termin
* QRIS
* Status pembayaran

Status:

* DRAFT
* UNPAID
* PARTIAL
* PAID
* OVERDUE
* CANCELLED


# Invoice Hierarchy

MASTER INVOICE

├── TERMIN 1

├── TERMIN 2

└── TERMIN 3

Setiap Termin Invoice terhubung ke Master Invoice menggunakan parentInvoiceId.


## Payment Engine

Entity:

* Payment

Metode:

* Qr Scan
* Cash

Status:

* PENDING
* VERIFIED
* REJECTED

Fitur:

* Upload Proof
* Verify Payment
* Payment History
* Collection Update


## Collection Engine

Entity:

* Deal
* Invoice
* Payment

Fitur:

* Outstanding Monitoring
* Collected Amount
* Remaining Amount
* Collection Dashboard


## Notification System

Entity:

* Notification

Fitur:

* Real Time Notification
* Payment Alert
* Negotiation Alert
* Assignment Alert


## Audit Trail

Entity:

* AuditLog

Fitur:

* Create Tracking
* Update Tracking
* Delete Tracking
* Approval Tracking

Digunakan untuk kebutuhan compliance dan monitoring aktivitas pengguna.


# Database Overview

Total Entity:

* User
* Auth
* Lead
* LeadSource
* Activity
* NegotiationNote
* NegotiationRequest
* Deal
* TransactionItem
* Product
* Service
* Invoice
* InvoiceItem
* Payment
* CommunicationLog
* Notification
* AuditLog

Total: 17 Entity


# Business Flow

Lead
↓
Communication
↓
Negotiation
↓
Deal
↓
Product / Service Attachment
↓
Negotiation Approval
↓
Invoice Creation
↓
Payment
↓
Verification
↓
Collection
↓
Completed


# FECRM Philosophy

One Platform.
Every Customer Journey.

Mulai dari prospek pertama hingga pembayaran terakhir pelanggan dikelola dalam satu platform terintegrasi.
