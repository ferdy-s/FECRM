import {
  Building2,
  Pencil,
  Send,
  MessageSquare,
} from "lucide-react";
import { usePermission } from "@/hooks/use-permission";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  SquareMousePointer,
} from "lucide-react";

import {
  useSendEmail,
} from "@/hooks/use-send-email";

import type {

  EmailPriority,

  EmailTemplate,

} from "@/types/send-email";

import {
  useUpdateLead,
} from "@/hooks/use-update-lead";

import {
  useLeadSources,
} from "@/hooks/use-lead-sources";

import type {
  LeadStatus,
} from "@/types/lead-status";

import type {
  LeadDetail,
} from "@/types/lead-detail";

import { Role } from "@/constants/roles";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import {
  useSendWhatsapp,
} from "@/hooks/use-send-whatsapp";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function statusVariant(
  status: string
) {
  switch (status) {
    case "NEW":
      return "bg-slate-100 text-slate-700";

    case "QUALIFIED":
      return "bg-blue-100 text-blue-700";

    case "NEGOTIATION":
      return "bg-orange-100 text-orange-700";

    case "WON":
      return "bg-green-100 text-green-700";

    default:
      return "";
  }
}

interface LeadDetailHeaderProps {
  role: Role;
  lead: LeadDetail;
}

export function LeadDetailHeader(
  {
    role,
    lead,
  }: LeadDetailHeaderProps
) {

const [
  confirmFinalStatus,
  setConfirmFinalStatus,
] = useState(false);

  const [message, setMessage] =
  useState(
`Halo ${lead.name},

Terima kasih atas ketertarikan Anda terhadap solusi CRM & ERP kami.

Saya ingin melakukan follow up terkait kebutuhan perusahaan Anda.

Terima kasih.

Best Regards,

${lead.assignee.name}

FECRM Sales Team`
);

const {
  mutate,
  isPending,
} = useSendWhatsapp();

  const permission =
    usePermission(role);

 const {
  data: leadSources = [],
} = useLeadSources();

const [company, setCompany] =
  useState(lead.company);

const [contactName, setContactName] =
  useState(lead.name);

const [email, setEmail] =
  useState(lead.email ?? "");

const [phone, setPhone] =
  useState(lead.phone ?? "");

const [sourceId, setSourceId] =
  useState(
    lead.sourceId
  );

const [status, setStatus] =
  useState<LeadStatus>(
    lead.status as LeadStatus
  );

const updateLeadMutation =
  useUpdateLead();

const isConverted =
  lead.deals.length > 0;

  function saveLead() {

  updateLeadMutation.mutate({

    id: lead.id,

    name: contactName,

    company,

    email,

    phone,

    address: lead.address,

    district: lead.district,

    city: lead.city,

    province: lead.province,

    postalCode: lead.postalCode,

    country: lead.country,

    sourceId,

    assignedTo: lead.assignedTo,

    status,

  });

}

const [emailSheetOpen, setEmailSheetOpen] =
  useState(false);

const sendEmailMutation =
  useSendEmail();

const [subject, setSubject] =
  useState(
    "Follow Up Proposal ERP & CRM",
  );

const [priority, setPriority] =
  useState<EmailPriority>(
    "NORMAL",
  );

const [template, setTemplate] =
  useState<EmailTemplate>(
    "FOLLOWUP",
  );

  return (
      <CardContent className="p-6">
        <div
            className="
      grid
      gap-8
      xl:grid-cols-[1fr_380px]
      items-start
          "
        >
          {/* LEFT SECTION */}

      <div className="space-y-8">
  {/* HEADER */}

  <div
    className="
      flex
      items-start
      gap-5
    "
  >
    <Avatar
      className="
        h-16
        w-16
        rounded-2xl
        border
      "
    >
      <AvatarFallback>
        <Building2
          className="
            h-7
            w-7
          "
        />
      </AvatarFallback>
    </Avatar>

    <div className="flex-1">
      <div
        className="
          flex
          items-center
          gap-3
          flex-wrap
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            tracking-tight
            pt-3
          "
        >
          {lead.company}
        </h1>

        <Badge
          className={statusVariant(
            lead.status
          )}
        >
          {lead.status}
        </Badge>
      </div>
    </div>
  </div>

  {/* KPI STRIP */}

  {/* INFORMATION */}

 <CardContent>

  <div
    className="
      rounded-xl
      border
      bg-muted/20
      p-5
    "
  >

    <p
      className="
        text-sm
        leading-5
        text-justify
        text-muted-foreground
      "
    >
      <span className="font-semibold text-foreground">
        {lead.company}
      </span>{" "}
      is currently progressing through the{" "}
      <span className="font-semibold text-foreground">
        {lead.status}
      </span>{" "}
      stage within the FECRM sales pipeline. This opportunity was originally
      acquired through the{" "}
      <span className="font-semibold text-foreground">
        {lead.source.name}
      </span>{" "}
      acquisition channel and was first registered on{" "}
      <span className="font-semibold text-foreground">
        {new Date(
          lead.createdAt
        ).toLocaleDateString(
          "en-US",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )}
      </span>
    </p>

  </div>

</CardContent>
  
</div>

          {/* RIGHT SECTION */}

  <div
    className="
      rounded-2xl
      border
      bg-card
      p-5
      shadow-sm
    "
  >
     <div
  className="
    flex
    items-center
    justify-center
    gap-2
    border-b
    pb-4
    mb-6
  "
>
  <SquareMousePointer
    className="
      h-5
      w-5
      text-muted-foreground
    "
  />

  <h3
    className="
      text-base
      font-semibold
      tracking-wide
    "
  >
    Button Actions
  </h3>
</div>

    <div
      className="
        mt-2
        space-y-3
      "
    >
    
      {/* EDIT LEAD */}

      {
  permission.canEditLead && (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full">
          <Pencil className="mr-2 h-4 w-4" />
          Edit Lead
        </Button>
      </SheetTrigger>

         <SheetContent
  side="right"
  className="sm:max-w-[850px]"
>
  <SheetHeader>
    <SheetTitle>
      Edit Lead
    </SheetTitle>

    <SheetDescription>
      Update lead information and assignment.
    </SheetDescription>
  </SheetHeader>

  <div>

    {/* OVERVIEW */}

    <div
      className="
        rounded-2xl
        bg-muted/70
        p-7
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">
            {lead.company}
          </h3>

          <p className="text-sm text-muted-foreground">
            Lead Overview
          </p>
        </div>

        <Badge>
          {lead.status}
        </Badge>
      </div>

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-4
        "
      >

        <div>
          <p className="text-xs text-muted-foreground">
            Assigned To
          </p>

          <p className="font-semibold">
            {lead.assignee.name}
          </p>
        </div>
      </div>
      
    </div>

    {/* COMPANY */}

    <div
      className="
        rounded-2x9
        p-8
      "
    >
      <h4
        className="
      mb-6
      text-center
      text-lg
      font-semibold
    "
      >
        Company Information
      </h4>

      <div className="space-y-3">
        <Input
   value={company}
  disabled={isConverted}
  onChange={(e) =>
    setCompany(
      e.target.value
    )
  }
/>

        <Input
  value={contactName}
  disabled={isConverted}
  onChange={(e) =>
    setContactName(
      e.target.value
    )
  }
/>

        <Input
  value={email}
  disabled={isConverted}
  onChange={(e) =>
    setEmail(
      e.target.value
    )
  }
/>
<Input
  value={phone}
  disabled={isConverted}
  onChange={(e) =>
    setPhone(
      e.target.value
    )
  }
/>
      </div>
      <div
    className="
      grid
      grid-cols-2
      gap-6
    "
  >
    <div className="space-y-2">

  <Label
    className="
      pt-2
    "
  >
  </Label>

  <Select
   value={sourceId}
  onValueChange={setSourceId}
  disabled={isConverted}
>

    <SelectTrigger
      className="
        h-11
        w-full
      "
    >
      <SelectValue
        placeholder="Select Lead Source"
      />
    </SelectTrigger>

    <SelectContent>

      {leadSources.map(
        (source) => (

          <SelectItem
            key={source.id}
            value={source.id}
          >
            {source.name}
          </SelectItem>

        )
      )}

    </SelectContent>

  </Select>

</div>
    <div className="space-y-2">
      <Label
        className="
          text-sm
          font-medium
          pt-2
        "
      >
      </Label>

    <Select
  value={status}
  disabled={isConverted}
  onValueChange={(value) =>
    setStatus(
      value as LeadStatus
    )
  }
>
        <SelectTrigger
          className="
            w-full
            h-11
          "
        >
          <SelectValue />
        </SelectTrigger>

       <SelectContent>

  <SelectItem value="NEW">
    New
  </SelectItem>

  <SelectItem value="CONTACTED">
    Contacted
  </SelectItem>

  <SelectItem value="NEGOTIATION">
    Negotiation
  </SelectItem>

  <SelectItem value="WON">
    Won
  </SelectItem>

  <SelectItem value="LOST">
    Lost
  </SelectItem>

</SelectContent>
      </Select>
    </div>
  </div>
    </div>
    

    {/* CRM */}

    <div className="flex justify-center">
<Button
  size="lg"
  className="
    min-w-[320px]
    rounded-xl
    shadow-sm
  "
  disabled={
    isConverted ||
    updateLeadMutation.isPending
  }
  onClick={() => {

    if (
      status === "WON" ||
      status === "LOST"
    ) {

      setConfirmFinalStatus(
        true,
      );

      return;

    }

    saveLead();

  }}
>

  {updateLeadMutation.isPending
    ? "Saving..."
    : "Save Changes"}

</Button>
<AlertDialog
  open={confirmFinalStatus}
  onOpenChange={
    setConfirmFinalStatus
  }
>

  <AlertDialogContent>

    <AlertDialogHeader>

      <AlertDialogTitle>

        Confirm Final Status

      </AlertDialogTitle>

      <AlertDialogDescription>

        You selected
        <strong>
          {" "}
          {status}
        </strong>
        .

        <br />
        <br />

        This is a final lead status.

        After saving, this lead can no longer be changed.

      </AlertDialogDescription>

    </AlertDialogHeader>

    <AlertDialogFooter>

      <AlertDialogCancel>
        Cancel
      </AlertDialogCancel>

      <AlertDialogAction
        onClick={() => {

          setConfirmFinalStatus(
            false,
          );

          saveLead();

        }}
      >
        Confirm
      </AlertDialogAction>

    </AlertDialogFooter>

  </AlertDialogContent>

</AlertDialog>
</div>

  </div>
</SheetContent>
    </Sheet>
  )
}

      {/* EMAIL */}
{
  permission.canSendEmail && (
    
     <Sheet
  open={emailSheetOpen}
  onOpenChange={setEmailSheetOpen}
>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[720px] sm:max-w-[720px]"
        >
          <SheetHeader>
            <SheetTitle>
              Send Email
            </SheetTitle>

            <SheetDescription>
              Email akan dikirim ke lead yang sedang dibuka.
            </SheetDescription>
          </SheetHeader>

         <div className="mt-6 space-y-6">

  {/* RECIPIENT */}

  <div
    className="
      rounded-xl
      border
      bg-muted/20
      p-5
    "
  >
    <h4
      className="
        mb-4
        text-sm
        font-semibold
      "
    >
      Recipient Information
    </h4>
    {!lead.email && (

  <Badge
    variant="destructive"
    className="mt-4"
  >
    Lead belum memiliki alamat email.
  </Badge>

)}

    <div className="space-y-1">
      <p className="font-medium">
        {lead.name}
      </p>

      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        {lead.email}
      </p>
    </div>
  </div>

  {/* CONFIGURATION */}

  {/* SUBJECT */}

  <div
    className="
      rounded-xl
      border
      p-5
    "
  >
    <Label>
      Subject
    </Label>

   <Input
  className="mt-2"
  value={subject}
  onChange={(e) =>
    setSubject(
      e.target.value
    )
  }
/>
  </div>

  {/* MESSAGE */}

  <div
    className="
      rounded-xl
      border
      p-5
    "
  >
    <div
      className="
        mb-4
        flex
        items-center
        justify-between
      "
    >
      <h4
        className="
          text-sm
          font-semibold
        "
      >
        Message Editor
      </h4>

      <Badge
        variant="secondary"
      >
        Template Ready
      </Badge>
    </div>

    <Textarea
      rows={16}
      className="
        resize-none
      "
     value={message}

onChange={(e)=>
setMessage(
e.target.value
)}/>
  </div>

  {/* FOOTER ACTION */}

  <div
    className="
      flex
      items-center
      justify-end
      gap-3
      border-t
      pt-6
      pr-4
    "
  >
    <Button
  variant="outline"
  onClick={() =>
    setEmailSheetOpen(false)
  }
>
  Cancel
</Button>

    <Button
      variant="secondary"
    >
      Preview
    </Button>

   <Button
  disabled={
    sendEmailMutation.isPending ||
    !lead.email ||
    subject.trim().length === 0 ||
    message.trim().length === 0
  }
  onClick={() => {
    sendEmailMutation.mutate(
      {
        leadId: lead.id,
        subject,
        message,
        priority,
        template,
      },
      {
        onSuccess: () => {
          setEmailSheetOpen(false);

          setSubject(
            "Follow Up Proposal ERP & CRM"
          );

          setPriority("NORMAL");

          setTemplate("FOLLOWUP");

          setMessage(
`Halo ${lead.name},

Terima kasih atas ketertarikan Anda terhadap solusi CRM & ERP kami.

Saya ingin melakukan follow up terkait kebutuhan perusahaan Anda.

Terima kasih.

Best Regards,

${lead.assignee.name}

FECRM Sales Team`
          );
        },
      }
    );
  }}
>
  <Send className="mr-2 h-4 w-4" />

  {sendEmailMutation.isPending
    ? "Sending..."
    : "Send Email"}
</Button>
  </div>

</div>
        </SheetContent>
      </Sheet>
  )
}
      {/* WHATSAPP */}
{
  permission.canSendWhatsApp && (
      <Sheet>
  <SheetTrigger asChild>
    <Button
      variant="outline"
      className="w-full"
    >
      <MessageSquare className="mr-2 h-4 w-4" />
      WhatsApp
    </Button>
  </SheetTrigger>

  <SheetContent
    side="right"
    className="
      sm:max-w-[720px]
      overflow-y-auto
    "
  >
    <SheetHeader className="pb-6">
      <SheetTitle>
        WhatsApp Message
      </SheetTitle>

      <SheetDescription>
        Kirim pesan langsung ke lead
        menggunakan template FECRM.
      </SheetDescription>
    </SheetHeader>

    <div className="space-y-6">
      {/* LEAD INFO */}

      <div
        className="
          rounded-xl
          bg-muted/70
          p-5
        "
      >
        <h4
          className="
            mb-4
            text-sm
            font-semibold
          "
        >
          Lead Information
        </h4>

        <div className="space-y-3">
          <div>
            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Contact Person
            </p>

            <p className="font-medium">
              {lead.name}
            </p>
          </div>

          <div>
            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Phone Number
            </p>

            <p className="font-medium">
              {lead.phone}
            </p>
          </div>

          <div>
            <p
              className="
                text-xs
                text-muted-foreground
              "
            >
              Company
            </p>

            <p className="font-medium">
              {lead.company}
            </p>
          </div>
        </div>
      </div>

      {/* TEMPLATE */}

      {/* MESSAGE */}

      <div
        className="
          rounded-xl
          p-5
        "
      >
        <h4
          className="
            mb-4
            text-sm
            font-semibold
          "
        >
          Message Content
        </h4>

        <Textarea
          rows={14}
          className="
            resize-none
          "
        value={message}

onChange={(e)=>
setMessage(
e.target.value
)}
        />
      </div>

      {/* ACTION */}

      <div
        className="
          flex
          justify-center
          gap-3
        "
      >
        <Button
          variant="outline"
          className="min-w-[150px]"
        >
          Cancel
        </Button>

        <Button
    disabled={isPending}
    onClick={() =>
        mutate({
            leadId: lead.id,
            message,
        })
    }
>
    <MessageSquare
        className="mr-2 h-4 w-7"
    />

    {isPending
        ? "Sending..."
        : "Send WhatsApp"}
</Button>
      </div>
    </div>
  </SheetContent>
</Sheet>
  )
}


    </div>
  </div>
        </div>
      </CardContent>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value?: string | null;
}

function InfoCard({
  icon,
  title,
  value,
}: InfoCardProps) {

  return (

    <div
      className="
        rounded-4x2
        border
        p-5
        transition
        hover:border-primary/40
        hover:shadow-sm
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-primary/10
            text-primary
            shrink-0
          "
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <p
            className="
              text-xs
              uppercase
              tracking-wide
              text-muted-foreground
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              truncate
              text-sm
              font-semibold
            "
          >
            {value || "-"}
          </p>

        </div>

      </div>

    </div>

  );

}