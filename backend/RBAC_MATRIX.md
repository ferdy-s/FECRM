# RBAC_MATRIX.md

# FECRM — Role Based Access Control Matrix

Version: 1.0

Status: Production Ready

Architecture: RBAC (Role Based Access Control)

---

# 1. OVERVIEW

FECRM menggunakan Role-Based Access Control (RBAC) untuk membatasi akses fitur berdasarkan peran pengguna.

Setiap pengguna hanya dapat mengakses data dan tindakan sesuai tanggung jawab bisnisnya.

---

## Available Roles

| Role      | Description                                                     |
| --------- | --------------------------------------------------------------- |
| MARKETING | Mengelola lead dan aktivitas prospek                            |
| SALES     | Mengelola deal, komunikasi pelanggan, dan negosiasi             |
| ADMIN     | Mengelola master data dan administrasi CRM                      |
| FINANCE   | Mengelola invoice, pembayaran, collection, dan laporan keuangan |
| MANAGER   | Melakukan approval dan monitoring seluruh proses bisnis         |

---

# 2. ACCESS LEVEL LEGEND

| Symbol | Description |
| ------ | ----------- |
| C      | Create      |
| R      | Read        |
| U      | Update      |
| D      | Delete      |
| A      | Approve     |
| X      | No Access   |

---

# 3. AUTH MODULE

| Feature         | Marketing | Sales | Admin | Finance | Manager |
| --------------- | --------- | ----- | ----- | ------- | ------- |
| Login           | R         | R     | R     | R       | R       |
| Logout          | R         | R     | R     | R       | R       |
| Profile         | R/U       | R/U   | R/U   | R/U     | R/U     |
| Change Password | R/U       | R/U   | R/U   | R/U     | R/U     |

---

# 4. USER MANAGEMENT

| Feature         | Marketing | Sales | Admin | Finance | Manager |
| --------------- | --------- | ----- | ----- | ------- | ------- |
| User List       | X         | X     | R     | R       | R       |
| User Detail     | X         | X     | R     | R       | R       |
| Invite User     | X         | X     | C     | X       | X       |
| Update User     | X         | X     | U     | X       | X       |
| Disable User    | X         | X     | D     | X       | X       |
| User Statistics | X         | X     | R     | R       | R       |

---

# 5. LEAD MANAGEMENT

| Feature              | Marketing | Sales | Admin | Finance | Manager |
| -------------------- | --------- | ----- | ----- | ------- | ------- |
| Lead List            | C/R/U     | R     | R     | R       | R       |
| Lead Detail          | R         | R     | R     | R       | R       |
| Create Lead          | C         | X     | C     | X       | X       |
| Update Lead          | U         | X     | U     | X       | X       |
| Assign Lead          | X         | X     | U     | X       | U       |
| Lead Timeline        | R         | R     | R     | X       | R       |
| Change Lead Status   | U         | X     | U     | X       | X       |
| Convert Lead to Deal | X         | C     | C     | X       | X       |

---

# 6. COMMUNICATION MANAGEMENT

| Feature               | Marketing | Sales | Admin | Finance | Manager |
| --------------------- | --------- | ----- | ----- | ------- | ------- |
| WA Message            | C         | C     | R     | X       | R       |
| Email Message         | C         | C     | R     | X       | R       |
| Call Activity         | C         | C     | R     | X       | R       |
| Communication History | R         | R     | R     | X       | R       |

---

# 7. DEAL MANAGEMENT

| Feature         | Marketing | Sales | Admin | Finance | Manager |
| --------------- | --------- | ----- | ----- | ------- | ------- |
| Deal List       | R         | R     | R     | R       | R       |
| Deal Detail     | R         | R     | R     | R       | R       |
| Create Deal     | X         | C     | C     | X       | X       |
| Update Deal     | X         | U     | U     | X       | X       |
| Deal Monitoring | X         | R     | R     | R       | R       |

---

# 8. PRODUCT MANAGEMENT

| Feature        | Marketing | Sales | Admin | Finance | Manager |
| -------------- | --------- | ----- | ----- | ------- | ------- |
| Product List   | R         | R     | R     | R       | R       |
| Create Product | X         | X     | C     | X       | X       |
| Update Product | X         | X     | U     | X       | X       |
| Delete Product | X         | X     | D     | X       | X       |

---

# 9. SERVICE MANAGEMENT

| Feature        | Marketing | Sales | Admin | Finance | Manager |
| -------------- | --------- | ----- | ----- | ------- | ------- |
| Service List   | R         | R     | R     | R       | R       |
| Create Service | X         | X     | C     | X       | X       |
| Update Service | X         | X     | U     | X       | X       |
| Delete Service | X         | X     | D     | X       | X       |

---

# 10. TRANSACTION ITEM

| Feature                | Marketing | Sales | Admin | Finance | Manager |
| ---------------------- | --------- | ----- | ----- | ------- | ------- |
| Attach Product         | X         | C     | C     | X       | X       |
| Attach Service         | X         | C     | C     | X       | X       |
| View Transaction Items | R         | R     | R     | R       | R       |

---

# 11. PRICE NEGOTIATION

| Feature             | Marketing | Sales | Admin | Finance | Manager |
| ------------------- | --------- | ----- | ----- | ------- | ------- |
| Request Negotiation | X         | C     | C     | X       | X       |
| View Negotiation    | X         | R     | R     | X       | R       |
| Approve Negotiation | X         | X     | X     | X       | A       |
| Reject Negotiation  | X         | X     | X     | X       | A       |

---

# 12. INVOICE MANAGEMENT

| Feature           | Marketing | Sales | Admin | Finance | Manager |
| ----------------- | --------- | ----- | ----- | ------- | ------- |
| Invoice List      | R         | R     | R     | R       | R       |
| Invoice Detail    | R         | R     | R     | R       | R       |
| Create Invoice    | X         | X     | C     | C       | X       |
| Generate PDF      | R         | R     | R     | R       | R       |
| Breakdown Invoice | R         | R     | R     | R       | R       |

---

# 13. PAYMENT MANAGEMENT

| Feature               | Marketing | Sales | Admin | Finance | Manager |
| --------------------- | --------- | ----- | ----- | ------- | ------- |
| Generate QRIS         | X         | X     | X     | C       | X       |
| Upload Transfer Proof | X         | X     | X     | C       | X       |
| Verify Payment        | X         | X     | X     | A       | X       |
| Reject Payment        | X         | X     | X     | A       | X       |
| Payment History       | X         | X     | R     | R       | R       |

---

# 14. COLLECTION MANAGEMENT

| Feature               | Marketing | Sales | Admin | Finance | Manager |
| --------------------- | --------- | ----- | ----- | ------- | ------- |
| Collection Dashboard  | X         | X     | R     | R       | R       |
| Aging Report          | X         | X     | R     | R       | R       |
| Overdue Check         | X         | X     | X     | C       | X       |
| Collection Monitoring | X         | X     | R     | R       | R       |

---

# 15. NOTIFICATION

| Feature           | Marketing | Sales | Admin | Finance | Manager |
| ----------------- | --------- | ----- | ----- | ------- | ------- |
| Notification List | R         | R     | R     | R       | R       |
| Read Notification | U         | U     | U     | U       | U       |

---

# 16. AUDIT LOG

| Feature        | Marketing | Sales | Admin | Finance | Manager |
| -------------- | --------- | ----- | ----- | ------- | ------- |
| Audit Log List | X         | X     | R     | R       | R       |
| Audit Detail   | X         | X     | R     | R       | R       |

---

# 17. REPORTS

| Report            | Marketing | Sales | Admin | Finance | Manager |
| ----------------- | --------- | ----- | ----- | ------- | ------- |
| Sales Report      | R         | R     | R     | R       | R       |
| Pipeline Report   | R         | R     | R     | R       | R       |
| Conversion Report | R         | R     | R     | R       | R       |
| Source Report     | R         | R     | R     | R       | R       |
| Collection Report | X         | X     | R     | R       | R       |
| Finance KPI       | X         | X     | R     | R       | R       |
| Aging Report      | X         | X     | R     | R       | R       |

---

# 18. DASHBOARD ACCESS

| Dashboard           | Marketing | Sales | Admin | Finance | Manager |
| ------------------- | --------- | ----- | ----- | ------- | ------- |
| Marketing Dashboard | R         | X     | R     | X       | R       |
| Sales Dashboard     | X         | R     | R     | X       | R       |
| Admin Dashboard     | X         | X     | R     | X       | R       |
| Finance Dashboard   | X         | X     | X     | R       | R       |
| Manager Dashboard   | X         | X     | X     | X       | R       |

---

# 19. APPROVAL MATRIX

| Process               | Marketing | Sales   | Admin | Finance | Manager |
| --------------------- | --------- | ------- | ----- | ------- | ------- |
| Lead Approval         | X         | X       | X     | X       | X       |
| Deal Approval         | X         | X       | X     | X       | X       |
| Negotiation Approval  | X         | Request | X     | X       | Approve |
| Payment Verification  | X         | X       | X     | Verify  | X       |
| Collection Validation | X         | X       | X     | Verify  | Monitor |

---

# 20. SECURITY POLICY

1. Semua endpoint wajib menggunakan JWT Authentication.
2. Semua aktivitas penting dicatat pada Audit Log.
3. Soft Delete digunakan pada User, Lead, Deal, dan Invoice.
4. Role Manager memiliki hak approval namun tidak melakukan operasional harian.
5. Finance tidak dapat mengubah Lead dan Deal.
6. Marketing tidak dapat membuat Invoice.
7. Sales tidak dapat melakukan Payment Verification.
8. Admin bertanggung jawab terhadap konfigurasi sistem dan master data.
