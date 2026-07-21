import fs from "fs";
import path from "path";
import QRCode from "qrcode";

export const invoiceTemplateService = {

  //////////////////////////////////////////////////
  // MAIN RENDER
  //////////////////////////////////////////////////

  async render(invoice: any) {

    const logoPath =
      path.join(
        process.cwd(),
        "public",
        "brand",
        "fecrm-logo.png"
      );

    const logoBase64 =
      fs
        .readFileSync(logoPath)
        .toString("base64");

    const currency = (
      value: any
    ) =>
      `Rp ${Number(
        value ?? 0
      ).toLocaleString(
        "id-ID"
      )}`;

    const negotiations =
  invoice.deal?.items
    ?.flatMap(
      (item:any)=>

        item.negotiations?.map(
          (n:any)=>({

            itemName:
              item.itemName,

            quantity:
              item.quantity,

            oldPrice:
              Number(
                n.oldPrice
              ),

            approvedPrice:
              Number(
                n.approvedPrice
              ),

            savingPerUnit:
              Number(
                n.oldPrice
              ) -
              Number(
                n.approvedPrice
              ),

            totalSaving:
              (
                Number(
                  n.oldPrice
                ) -
                Number(
                  n.approvedPrice
                )
              ) *
              Number(
                item.quantity
              ),

            savingPercent:
              (
                (
                  Number(
                    n.oldPrice
                  ) -
                  Number(
                    n.approvedPrice
                  )
                )
                /
                Number(
                  n.oldPrice
                )
              ) * 100,

            approver:
              n.approver,

            requester:
              n.requester,

            createdAt:
              n.createdAt,

          })
        ) ?? []

    ) ?? [];

    const issueDate =
      new Date(
        invoice.issuedAt
      ).toLocaleDateString(
        "id-ID"
      );

    const qrBase64 =
      invoice.qrisUrl
        ? await QRCode.toDataURL(
            invoice.qrisUrl
          )
        : null;

    //////////////////////////////////////////////////
    // MASTER
    //////////////////////////////////////////////////

    if (
      invoice.invoiceKind ===
      "MASTER"
    ) {

      return this.renderMaster(
  invoice,
  logoBase64,
  issueDate,
  currency,
  negotiations,
  qrBase64
);
    }

    //////////////////////////////////////////////////
    // TERMIN
    //////////////////////////////////////////////////

    return this.renderTermin(
      invoice,
      logoBase64,
      issueDate,
      currency,
      qrBase64
    );
  },

  //////////////////////////////////////////////////
  // STATUS BADGE
  //////////////////////////////////////////////////

  getStatusColor(
    status: string
  ) {

    switch (
      status
    ) {

      case "PAID":
        return "#16a34a";

      case "PARTIAL":
        return "#ca8a04";

      case "OVERDUE":
        return "#dc2626";

      default:
        return "#2563eb";
    }
  },

  getPaymentMethodLabel(
  method: string
) {

  switch (method) {

    case "QRIS_MIDTRANS":
      return "QR Code Scan";

    case "MANUAL_TRANSFER":
      return "Cash";

    default:
      return method;
  }

},

  //////////////////////////////////////////////////
  // GLOBAL STYLE
  //////////////////////////////////////////////////

  styles() {

    return `

<style>

*{
  box-sizing:border-box;
}

@page{
  size:A4;
  margin:5mm;
}

html,
body{
  margin:0;
  padding:0;

  width:100%;

  font-family:
    Inter,
    Arial,
    sans-serif;

  color:#111827;
  background:#ffffff;

  font-size:12px;
  line-height:1.5;
}

:root{

  --primary:#0f172a;

  --secondary:#475569;

  --muted:#94a3b8;

  --border:#e5e7eb;

  --surface:#f8fafc;

  --success:#16a34a;

  --warning:#ca8a04;

  --danger:#dc2626;
}

.invoice-info-layout{

  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:32px;
}

.info-column{

  display:flex;

  flex-direction:column;

  gap:10px;
}

.info-row{

  display:flex;

  justify-content:space-between;
}

.contract-section{

  page-break-inside: avoid;

  break-inside: avoid;
}

.invoice-info-grid{

  display:grid;

  grid-template-columns:
    140px 1fr;

  gap:8px 12px;

  font-size:12px;
}

.invoice-info-grid div:nth-child(odd){

  font-weight:600;

  color:#64748b;
}

.invoice-info-grid div:nth-child(even){

  color:#0f172a;
}

.info-card:hover{

  transform:
    translateY(-2px);

  transition:.25s;

  box-shadow:
    0 12px 30px rgba(
      15,
      23,
      42,
      .08
    );
}

.client-layout{

  display:grid;

  grid-template-columns:
    1fr 1fr;

  gap:24px;

  margin-top:10px;
}

.address-section{

  padding-left:20px;

  border-left:
    1px solid #e5e7eb;
}

.address-title{

  font-size:11px;

  font-weight:700;

  color:#0f172a;

  text-transform:uppercase;

  letter-spacing:.5px;

  margin-bottom:8px;
}

.address-block{

  font-size:11px;

  line-height:1.8;

  color:#475569;
}

.page-container{

  min-height:100vh;

  display:flex;

  flex-direction:column;
}

.master-page{
  display:flex;
  flex-direction:column;
  min-height:100%;
}

.master-content{
  flex:1;
}

.hero{

  display:flex;

  justify-content:
    space-between;

  align-items:flex-start;

  padding-bottom:12px;

  margin-bottom:14px;
}

.hero-left{

  width:50%;
}

.brand-wrapper{

  display:flex;

  align-items:center;

  gap:18px;
}

.brand-text{

  display:flex;

  flex-direction:column;

  justify-content:center;
}

.brand-name{

  font-size:35px;

  font-weight:800;

  color:#0f172a;

  letter-spacing:1px;

  line-height:1;
}

.hero-right{

  width:50%;

  text-align:right;
}

.hero-logo{

  height:50px;

  object-fit:contain;
}

.hero-subtitle{

  margin-top:2px;

  color:var(--secondary);

  font-size:11,2px;

  letter-spacing:.7px;
}


.invoice-label{

  font-size:26px;

  font-weight:800;

  color:var(--primary);

  letter-spacing:.5px;
}

.invoice-type{

  color:var(--secondary);

  margin-top:2px;

  font-size:13px;
}

.invoice-meta{

  display:flex;

  justify-content:flex-end;

  align-items:center;

  gap:12px;

  margin-top:2px;
}

.status-badge{

  display:inline-block;

  padding:6px 14px;

  border-radius:999px;

  color:white;

  font-size:10px;

  font-weight:700;

  margin-top:2px;
}

.info-grid{

  display:grid;

  grid-template-columns:
    repeat(2,1fr);

  gap:10px;

  margin-bottom:12px;
}

.info-card{

  position:relative;

  border:1px solid #e2e8f0;

  border-radius:16px;

  background:#ffffff;

  padding:10px;

  box-shadow:
    0 1px 2px rgba(15,23,42,.04),
    0 8px 24px rgba(15,23,42,.04);

  overflow:hidden;
}

.info-card::before{

  content:"";

  position:absolute;

  top:0;

  left:0;

  width:100%;

  height:4px;

  background:
    linear-gradient(
      90deg,
      #0f172a,
      #2563eb
    );
}

.card-header{

  font-size:12px;

  font-weight:750;

  text-transform:uppercase;

  color:#000000;

  letter-spacing:1px;

  margin-bottom:14px;
  padding-top:10px;

  padding-bottom:10px;

  border-bottom:
    1px solid
    #f1f5f9;
    
}

.card-line{

  margin-bottom:8px;

  color:#334155;

  font-size:12px;

  line-height:1.6;
}

.card-value{

  font-weight:600;

  color:#0f172a;
}

.section-title{

  margin-top:14px;

  margin-bottom:6px;

  font-size:13px;

  font-size:15px;

  font-weight:700;

  color:var(--primary);
}

.table{

  width:100%;

  border-collapse:collapse;

  margin-bottom:10px;
}

.table thead{

  background:
    var(--primary);

  color:white;
}

.table th{

  padding:8px;

  font-size:11px;

  text-align:left;
}

.table td{

  padding:8px;

  border-bottom:
    1px solid
    var(--border);
}

.table tbody tr:nth-child(even){

  background:#fafafa;
}

.summary-grid{

  display:grid;

  grid-template-columns:
    1fr 320px;

  gap:18px;

  margin-top:10px;
}

.summary-card{

  border:1px solid
    var(--border);

  border-radius:12px;

  background:white;

  padding:12px;
}

.summary-title{

  font-size:13px;

  font-weight:700;

  margin-bottom:12px;

  color:var(--primary);
}

.summary-row{

  display:flex;

  justify-content:
    space-between;

  margin-bottom:8px;
}

.summary-total{

  margin-top:14px;

  padding-top:14px;

  border-top:
    2px solid
    var(--primary);

  font-size:10px;

  font-weight:800;

  color:var(--primary);
}

.hero-total{

  background:
    linear-gradient(
      135deg,
      #0f172a,
      #1e293b
    );

  color:white;

  border-radius:18px;

   padding:14px;

  margin-bottom:14px;

  border-radius:14px;

  text-align:center;
}

.hero-total-label{

  font-size:11px;

  opacity:.8;

  letter-spacing:.5px;
}

.hero-total-value{

  font-size:25px;

  font-weight:800;

  margin-top:10px;
}

.qris-wrapper{

  text-align:center;

  margin-top:15px;
}

.qris-image{

  width:300px;
  height:300px;

  object-fit:contain;
}

.notes-box{

  margin-top:10px;

  padding:10px;

  border:1px solid
    var(--border);

  border-radius:12px;

  background:#fafafa;
}

.signature-section{

  display:flex;

  justify-content:space-between;

  margin-top:10px;

  gap:24px;
}

.approval-card{

  border:1px solid
    var(--border);

  border-radius:14px;

  padding:16px;

  background:white;
}

.approval-header{

  font-size:11px;

  text-transform:uppercase;

  font-weight:700;

  color:#64748b;

  margin-bottom:14px;
}

.approval-user{

  display:flex;

  align-items:center;

  gap:12px;
}

.avatar{

  width:48px;

  height:48px;

  border-radius:999px;

  background:#0f172a;

  color:white;

  display:flex;

  align-items:center;

  justify-content:center;

  font-size:18px;

  font-weight:700;
}

.user-name{

  font-size:14px;

  font-weight:700;

  color:#0f172a;
}

.user-email{

  font-size:11px;

  color:#64748b;
}

.user-role{

  font-size:11px;

  color:#64748b;
}

.approval-status{

  margin-top:12px;

  display:inline-block;

  padding:6px 10px;

  border-radius:999px;

  background:#dcfce7;

  color:#15803d;

  font-size:11px;

  font-weight:700;
}

.account-owner-card{

  border:1px solid var(--border);

  border-radius:14px;

  padding:16px;

  background:white;

  margin-top:14px;
}

.account-owner-header{

  display:flex;

  justify-content:space-between;

  align-items:center;

  margin-bottom:16px;
}

.account-owner-title{

  font-size:14px;

  font-weight:800;

  color:#0f172a;
}

.account-owner-subtitle{

  font-size:11px;

  color:#64748b;
}

.account-owner-content{

  display:flex;

  gap:16px;

  align-items:center;
}

.owner-avatar{

  width:60px;

  height:60px;

  border-radius:999px;

  background:#0f172a;

  color:white;

  display:flex;

  align-items:center;

  justify-content:center;

  font-size:22px;

  font-weight:800;
}

.owner-name{

  font-size:16px;

  font-weight:700;
}

.owner-role{

  color:#2563eb;

  font-size:12px;

  font-weight:600;

  margin-top:2px;
}

.owner-detail{

  margin-top:4px;

  font-size:11px;

  color:#64748b;
}

.owner-description{

  margin-top:14px;

  padding-top:14px;

  border-top:1px solid var(--border);

  font-size:11px;

  color:#475569;

  line-height:1.7;
}

.profile-link{

  margin-top:10px;

  display:block;

  font-size:11px;

  color:#2563eb;

  text-decoration:none;
}

.signature-box{

  width:220px;

  text-align:center;
}

.signature-line{

  margin-top:30px;

  border-top:
    1px solid
    #111827;
}

.footer{

  margin-top:28px;

  border-top:3px solid var(--border);

  padding-top:20px;

  text-align:center;

  font-size:10px;

  color:#64748b;
}

.footer-grid{

  display:flex;

  justify-content:space-between;

  align-items:flex-start;

  width:100%;
}

.footer-col{

  flex:1;

  font-size:10px;

  color:#64748b;

  line-height:1.8;
}

.footer-left{

  text-align:left;
}

.footer-center{

  text-align:center;
}

.footer-right{

  text-align:right;
}

.footer-title{

  font-size:11px;

  font-weight:700;

  color:#0f172a;

  margin-bottom:6px;

  text-transform:uppercase;

  letter-spacing:.5px;
}

</style>

`;
  },

  //////////////////////////////////////////////////
  // PART 2
  //////////////////////////////////////////////////

  

renderMaster(
  invoice:any,
  logoBase64:string,
  issueDate:string,
  currency:any,
  negotiations:any[],
  qrBase64:string | null
){

  return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8"/>

${this.styles()}

</head>

<body>

<div class="master-page">

<div class="master-content">

<div class="page-container">

<div class="hero">

  <div class="hero-left">

  <div class="brand-wrapper">

    <img
      src="data:image/png;base64,${logoBase64}"
      class="hero-logo"
    />

    <div class="brand-text">

      <div class="brand-name">
        FECRM
      </div>

      <div class="hero-subtitle">
        Future Enterprise CRM
      </div>


    </div>

  </div>

</div>

  <div class="hero-right">

    <div class="invoice-label">
      MASTER INVOICE
    </div>

    <div class="invoice-meta">

  <div class="invoice-type">
    ${invoice.invoiceNumber}
  </div>

  <div
    class="status-badge"
    style="
      background:${this.getStatusColor(
        invoice.status
      )};
    "
  >
    STATUS : 
    ${invoice.status}
  </div>

</div>

  </div>

</div>

<!-- INFO -->
 

<div class="info-card">

<div class="card-header">
  ● INFORMASI INVOICE
</div>
<div class="invoice-info-layout">
  <div>

    <div class="card-line">
      Nomor :
      ${invoice.invoiceNumber}
    </div>

    <div class="card-line">
  Tipe Invoice :
  ${invoice.invoiceKind}
</div>

    <div class="card-line">
      Tanggal :
      ${issueDate}
    </div>

    <div class="card-line">
      Tipe :
      ${invoice.paymentType}
    </div>

  </div>

  <div class="address-section">

    <div class="card-line">
  Metode :
  ${this.getPaymentMethodLabel(
    invoice.paymentMethod
  )}
</div>

<div class="card-line">
  Payment Session :
  ${
    invoice.qrisUrl
      ? "READY TO PAY"
      : "NOT GENERATED"
  }
</div>

    <div class="card-line">
      Status :
      ${invoice.status}
    </div>

    <div class="card-line">
      Deal Status :
      ${invoice.deal.status}
    </div>

    <div class="card-line">
      Collection :
      ${invoice.deal.collectionStatus}
    </div>

  </div>
</div>
</div>

<br>

  <div class="info-card">

   <div class="card-header">
  ● INFORMASI KLIEN
</div>

<div class="client-layout">

  <div>

    <div class="card-line">
      Nama : 
        ${invoice.deal.lead.name}
    </div>

    <div class="card-line">
    Perusahaan :
      ${invoice.deal.lead.company ?? "-"}
    </div>

    <div class="card-line">
    Email :
      ${invoice.deal.lead.email ?? "-"}
    </div>

    <div class="card-line">
    Whastapp :
      ${invoice.deal.lead.phone ?? "-"}
    </div>

  </div>

  ${
    invoice.deal.lead.address
      ? `
      <div class="address-section">

        <div class="address-title">
          ALAMAT
        </div>

        <div class="address-block">

          ${invoice.deal.lead.address}

          <br>

          ${invoice.deal.lead.city},
          ${invoice.deal.lead.province}
          ${invoice.deal.lead.postalCode}

          <br>

          ${invoice.deal.lead.country}

        </div>

      </div>

</div>

`

: ""

}

</div>

<!-- ITEM -->

<h2 class="section-title">
● Produk & Layanan
</h2>

<table class="table">

<thead>

<tr>

<th>Nama Item</th>
<th>Tipe</th>
<th>Qty</th>
<th>Harga</th>
<th>Total</th>

</tr>

</thead>

<tbody>

${invoice.items
  .map(
    (item: any) => `

<tr>

<td>
${item.itemName}
</td>

<td>
${item.itemType}
</td>

<td>
${item.quantity}
</td>

<td>
${currency(item.unitPrice)}
</td>

<td>
${currency(item.totalPrice)}
</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

<!-- TERMIN -->

${
invoice.childInvoices?.length
? `

<h2 class="section-title">
● Jadwal Termin
</h2>

<table class="table">

<thead>

<tr>

<th>Invoice</th>

<th>%</th>

<th>Jatuh Tempo</th>

<th>Jumlah</th>

<th>Status</th>

</tr>

</thead>

<tbody>

${invoice.childInvoices
  .map(
    (term: any) => `

<tr>

<td>
${term.invoiceNumber}
</td>

<td>
${term.percent}%
</td>

<td>
${new Date(
  term.dueDate
).toLocaleDateString(
  "id-ID"
)}
</td>

<td>
${currency(
  term.amount
)}
</td>

<td>
${term.status}
</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

`
: ""
}

${
negotiations.length

?

`

<h2 class="section-title">
● Riwayat Negosiasi
</h2>

<table class="table">

<thead>

<tr>

<tr>

<th>Item</th>

<th>Qty</th>

<th>H. Awal / Unit</th>

<th>H. Final / Unit</th>

<th>Saving / Unit</th>

<th>Total Saving</th>

<th>Saving %</th>

</tr>

</tr>

</thead>

<tbody>

${negotiations.map((n:any)=>`

<tr>

<td>
${n.itemName}
</td>

<td>
${n.quantity}
</td>

<td>
${currency(n.oldPrice)}
</td>

<td>
${currency(n.approvedPrice)}
</td>

<td>

${currency(
  n.savingPerUnit
)}

</td>

<td>

${currency(
  n.totalSaving
)}

</td>

<td>

${n.savingPercent.toFixed(2)}%

</td>

</tr>

`).join("")}

</tbody>

</table>

`

:

""


}

<div
  class="info-card"
  style="
    margin-bottom:10px;
    padding:24px;

    page-break-inside:avoid;
    break-inside:avoid-page;

    display:block;
  "
>

  <div
    style="
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:30px;
    "
  >

    <!-- LEFT -->

    <div
      style="
        flex:1;
      "
    >

      <div
        style="
          font-size:14px;
          color:#64748b;
          text-transform:uppercase;
          letter-spacing:1px;
          margin-bottom:8px;
        "
      >
        Total Tagihan
      </div>

      <div
        style="
          font-size:40px;
          font-weight:800;
          color:#0f172a;
          line-height:1.1;
          margin-bottom:10px;
        "
      >
        ${currency(
          invoice.remainingAmount
        )}
      </div>

      <div
  style="
    font-size:14px;
    color:#64748b;
  "
>

${
  invoice.paymentType === "FULL"

    ? `

    Pembayaran invoice ini dilakukan secara penuh (full payment). Silakan lakukan pembayaran melalui QR Code yang tersedia.

    `

    : `

    Invoice ini merupakan bagian dari skema pembayaran bertahap (termin). Silakan lakukan pembayaran sesuai nominal termin yang ditagihkan pada dokumen "TERMIN INVOICE" setelah ini.

    `
}

</div>

    </div>

    

    <!-- RIGHT -->

    ${
  invoice.invoiceKind === "MASTER" &&
  invoice.paymentType === "FULL" &&
  invoice.paymentMethod === "QRIS_MIDTRANS" &&
  qrBase64 &&
  invoice.status !== "PAID"

    ? `

    <div
      style="
        width:300px;
        text-align:center;
        flex-shrink:0;
      "
    >

      <img
        src="${qrBase64}"
        style="
          width:200px;
          height:200px;
          object-fit:contain;
        "
      />

    </div>

    `
    : ""
}

  </div>

</div>

<div class="contract-section">

<div class="summary-card">

<h3>
Ringkasan Negosiasi
</h3>

<div class="summary-row">

<span>
Jumlah Negosiasi
</span>

<span>

${negotiations.length}

</span>

</div>

<div class="summary-row">

<span>
Total Penghematan
</span>

<span>

${currency(

  negotiations.reduce(

    (total:number,n:any)=>

      total +
      n.totalSaving,

    0

  )

)}

</span>

</div>

<div class="summary-row">

<span>
Rata-rata Saving
</span>

<span>

${
negotiations.length > 0

?

(
negotiations.reduce(

(total:number,n:any)=>

total +

(

(
Number(n.oldPrice) -
Number(n.approvedPrice)

)

/

Number(n.oldPrice)

) * 100,

0

)

/

negotiations.length

).toFixed(2)

: "0"

}%

</span>

</div>

</div>




<!-- SUMMARY -->

<div class="summary-grid">

<div class="summary-card">

<div class="summary-title">
Ringkasan Kontrak
</div>

<div class="summary-row">

<span>
Nilai Kontrak
</span>

<span>
${currency(
  invoice.amount
)}
</span>

</div>

<div class="summary-row">

<span>
Sudah Dibayar
</span>

<span>
${currency(
  invoice.paidAmount
)}
</span>

</div>

<div class="summary-row">

<span>
Sisa Tagihan
</span>

<span>
${currency(
  invoice.remainingAmount
)}
</span>

</div>

<div class="summary-total">

${currency(
  invoice.amount
)}

</div>

</div>

<div class="summary-card">

<div class="summary-title">
Informasi Deal
</div>

<div class="summary-row">

<span>Status Deal</span>

<span>
${invoice.deal.status}
</span>

</div>

<div class="summary-row">

<span>Collection</span>

<span>
${invoice.deal.collectionStatus}
</span>

</div>

<div class="summary-row">

<span>Collected</span>

<span>
${currency(
  invoice.deal.collectedAmount
)}
</span>

</div>

<div class="summary-row">

<span>Outstanding</span>

<span>
${currency(
  invoice.deal.outstandingAmount
)}
</span>

</div>

</div>

</div>

<!-- NOTES -->

<div class="notes-box">

<strong>
Catatan
</strong>

<br/>

Master Invoice ini merupakan dokumen induk transaksi yang diterbitkan oleh FECRM sebagai referensi resmi atas seluruh kewajiban pembayaran pelanggan. Seluruh Termin Invoice, riwayat pembayaran, dan proses penagihan terkait akan terhubung dan dikelola berdasarkan nomor Master Invoice ini untuk memastikan akurasi administrasi dan transparansi transaksi.

</div>

<!-- ACCOUNT OWNER -->

<div class="signature-section">

  <div class="account-owner-card">

  <div class="account-owner-header">

    <div>

      <div class="account-owner-title">
        PROJECT ACCOUNT OWNER
      </div>

      <div class="account-owner-subtitle">
        Official FECRM Representative
      </div>

    </div>

    <div class="approval-status">
      ✓ VERIFIED ACCOUNT
    </div>

  </div>

  <div class="account-owner-content">

    <div class="owner-avatar">

      ${
        invoice.deal.assignee?.name
          ?.substring(0,1)
          ?.toUpperCase() ?? "S"
      }

    </div>

    <div class="owner-info">

      <div class="owner-name">

        ${
          invoice.deal.assignee?.name
          ?? "-"
        }

      </div>

      <div class="owner-role">

        ${
          invoice.deal.assignee?.role
          ?? "SALES EXECUTIVE"
        }

      </div>

      <div class="owner-detail">

        Email :
        ${
          invoice.deal.assignee?.email
          ?? "-"
        }

      </div>


    </div>

  </div>

  <div class="owner-description">

    Person in Charge (PIC) yang
    bertanggung jawab atas
    aktivitas penjualan,
    negosiasi komersial,
    penagihan termin,
    koordinasi implementasi,
    serta komunikasi resmi
    antara pelanggan dan
    PT DCLIQ SUKSES BERKARYA.

  </div>

</div>

</div>
</div>
<br>

</div>
<!-- FOOTER -->

<div class="footer">

  <div class="footer-grid">

    <div
  class="footer-col"
  style="
    text-align:left;
    align-self:flex-start;
  "
>

  <div class="footer-title">
    Legal Entity
  </div>

  <div>
    PT DCLIQ SUKSES BERKARYA
  </div>

  <div>
    Tangerang, Indonesia
  </div>

</div>

    <div class="footer-col">

      <div class="footer-title">
        FECRM Platform
      </div>

      <div>
        Enterprise CRM & Collection System
      </div>

      <div>
        www.dcliq.co.id
      </div>

    </div>

    <div class="footer-col footer-right">

      <div class="footer-title">
        Document Verification
      </div>

      <div>
        Generated by FECRM
      </div>

      <div>
        ${new Date().toLocaleString("id-ID")}
      </div>

    </div>

  </div>
  </div>
  </div>

</body>

</html>

`;
},

  //////////////////////////////////////////////////
  // PART 3
  //////////////////////////////////////////////////

  renderTermin(
  invoice: any,
  logoBase64: string,
  issueDate: string,
  currency: any,
  qrBase64: string | null
) {

  const paymentHistory =
    invoice.payments ?? [];

  return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8"/>

${this.styles()}

</head>

<body>

<div class="hero">

  <div class="hero-left">

    <div class="brand-wrapper">

      <img
        src="data:image/png;base64,${logoBase64}"
        class="hero-logo"
      />

      <div class="brand-text">

        <div class="brand-name">
          FECRM
        </div>

        <div class="hero-subtitle">
          Future Enterprise CRM
        </div>

        <div class="hero-legal">
          PT DCLIQ SUKSES BERKARYA
        </div>

      </div>

    </div>

  </div>

  <div class="hero-right">

    <div class="invoice-label">
      TERMIN INVOICE
    </div>

   <div class="invoice-meta">

  <div class="invoice-type">
    ${invoice.invoiceNumber}
  </div>

  <div
    class="status-badge"
    style="
      background:${this.getStatusColor(
        invoice.status
      )};
    "
  >
    STATUS : 
    ${invoice.status}
  </div>

</div>

  </div>

</div>

<!-- HERO TOTAL -->

<div class="hero-total">

  <div class="hero-total-label">
    TOTAL TAGIHAN TERMIN
  </div>

  <div class="hero-total-value">
    ${currency(invoice.amount)}
  </div>

</div>

<div class="summary-card">

  <div class="qris-wrapper">

    ${
      qrBase64
      ? `
      <img
        src="${qrBase64}"
        class="qris-image"
      />
      `
      : `
      <div>
        QR Code Belum Tersedia
      </div>
      `
    }

  </div>

  <div
    class="summary-title"
    style="
      text-align:center;
    "
  >
    Scan QR Code Berikut Untuk Pembayaran
  </div>

</div>

<!-- INFO -->

<br>

<div class="info-grid">

  <div class="info-card">

    <div class="card-header">
      ● INFORMASI KLIEN
    </div>

    <div class="card-line">
      <strong>
        ${invoice.deal.lead.name}
      </strong>
    </div>

    <div class="card-line">

  <span class="card-value">
    ${invoice.deal.lead.company}
  </span>

</div>

    <div class="card-line">
      ${invoice.deal.lead.email ?? "-"}
    </div>

    <div class="card-line">
      ${invoice.deal.lead.phone ?? "-"}
    </div>

  </div>

  <div class="info-card">

    <div class="card-header">
      ● INFORMASI TERMIN
    </div>

    <div class="card-line">
      Invoice :
      ${invoice.invoiceNumber}
    </div>

    <div class="card-line">
      Persentase :
      ${invoice.percent ?? 0}%
    </div>

    <div class="card-line">
      Terbit :
      ${issueDate}
    </div>

    <div class="card-line">
      Jatuh Tempo :
      ${
        invoice.dueDate
          ? new Date(
              invoice.dueDate
            ).toLocaleDateString(
              "id-ID"
            )
          : "-"
      }
    </div>

  </div>

</div>

<!-- DETAIL TAGIHAN -->

<div class="summary-grid">

  <div class="summary-card">

    <div class="summary-title">
      Ringkasan Tagihan
    </div>

    <div class="summary-row">

      <span>
        Nilai Termin
      </span>

      <span>
        ${currency(
          invoice.amount
        )}
      </span>

    </div>

    <div class="summary-row">

      <span>
        Sudah Dibayar
      </span>

      <span>
        ${currency(
          invoice.paidAmount
        )}
      </span>

    </div>

    <div class="summary-row">

      <span>
        Sisa Tagihan
      </span>

      <span>
        ${currency(
          invoice.remainingAmount
        )}
      </span>

    </div>

    <div class="summary-total">

      ${currency(
        invoice.remainingAmount
      )}

    </div>

  </div>

  <div class="summary-card">

    <div class="summary-title">
      Metode Pembayaran
    </div>

    <div class="card-line">
  ${this.getPaymentMethodLabel(
    invoice.paymentMethod
  )}
</div>

    <div class="card-line">
      Status :
      ${invoice.status}
    </div>

    <div class="card-line">
      Invoice :
      ${invoice.invoiceNumber}
    </div>

  </div>

</div>

<!-- QRIS -->

${
invoice.paymentMethod ===
"QRIS_MIDTRANS"

? `


`

: `

<div class="summary-card">

  <div class="summary-title">
    Pembayaran Tunai
  </div>

  <div
    style="
      text-align:center;
      padding:30px;
      font-size:14px;
      color:#475569;
    "
  >

    Invoice ini menggunakan
    metode pembayaran tunai
    (cash payment).

    <br/><br/>

    Pembayaran dilakukan
    secara langsung kepada
    pihak perusahaan dan
    akan diverifikasi oleh
    tim Finance.

  </div>

</div>

`
}

</div>

<!-- RIWAYAT PEMBAYARAN -->

${
paymentHistory.length
? `

`
: ""
}


<!-- FOOTER -->

<div class="footer">

  <div class="footer-grid">

    <div class="footer-col footer-left">

      <div class="footer-title">
        Legal Entity
      </div>

      <div>
        PT DCLIQ SUKSES BERKARYA
      </div>

      <div>
        Tangerang, Indonesia
      </div>

    </div>

    <div class="footer-col">

      <div class="footer-title">
        FECRM Platform
      </div>

      <div>
        Enterprise CRM & Collection System
      </div>

      <div>
        www.dcliq.co.id
      </div>

    </div>

    <div class="footer-col footer-right">

      <div class="footer-title">
        Document Verification
      </div>

      <div>
        Generated by FECRM
      </div>

      <div>
        ${new Date().toLocaleString("id-ID")}
      </div>

    </div>

  </div>

</div>

</div>

</body>

</html>

`;
},

};
