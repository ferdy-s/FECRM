import {
  Mail,
  Phone,
  Globe,
  UserRound,
  Building2,
  BadgeDollarSign,
  User,
  Building,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import type {
  LeadDetail,
} from "@/types/lead-detail";

import {
  Separator,
} from "@/components/ui/separator";
import { Dangrek } from "next/font/google";

interface Props {
  lead: LeadDetail;
}

export function LeadInformation({
  lead,
}: Props) {
  return (
    <Card
      className="
        border-0
        shadow-sm
      "
    >
      <CardHeader
      >
        <CardTitle>
          Lead Information
        </CardTitle>

        <CardDescription>
          Detail informasi lead dan
          ownership FECRM.
        </CardDescription>
      </CardHeader>

      <CardContent
        className="
          space-y-6
        "
      >
        {/* COMPANY */}

        <div
          className="
            rounded-2xl
            bg-muted/40
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-background
              "
            >
              <Building2
                className="
                  h-5
                  w-5
                "
              />
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

              <h3
                className="
                  font-semibold
                  text-base
                "
              >
                {
                 lead.company
                }
              </h3>
            </div>
          </div>
        </div>
        <div
          className="
            rounded-2xl
            bg-muted/40
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-background
              "
            >
              <User
                className="
                  h-5
                  w-5
                "
              />
            </div>

            <div>
              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                Pic Name
              </p>

              <h3
                className="
                  font-semibold
                  text-base
                "
              >
                {
                 lead.name
                }
              </h3>
            </div>
          </div>
        </div>
         <div
          className="
            rounded-2xl
            bg-muted/40
            p-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-background
              "
            >
              <Building
                className="
                  h-5
                  w-5
                "
              />
            </div>

            <div>
              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                Status Lead
              </p>

              <h3
                className="
                  font-semibold
                  text-base
                "
              >
                {
                 lead.status
                }
              </h3>
            </div>
          </div>
        </div>

        <Separator />

        {/* CONTACT */}

        <div>
          <h4
            className="
              mb-4
              text-sm
              font-semibold
            "
          >
            Contact Information
          </h4>

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <InfoItem
              icon={
                <Mail className="h-4 w-4" />
              }
              label="Email"
              value={
                lead.email ?? "-"
              }
            />

            <InfoItem
              icon={
                <Phone className="h-4 w-4" />
              }
              label="Phone"
              value={
                lead.phone ?? "-"
              }
            />
          </div>
        </div>

        <Separator />

        {/* SALES INFO */}

        <div>
          <h4
            className="
              mb-4
              text-sm
              font-semibold
            "
          >
            Sales Information
          </h4>

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <InfoItem
              icon={
                <Globe className="h-4 w-4" />
              }
              label="Lead Source"
              value={
                lead.source.name
              }
            />

            <InfoItem
              icon={
                <UserRound className="h-4 w-4" />
              }
              label="Assigned To"
              value={
                lead.assignee.name
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        rounded-xl
        bg-muted/20
        p-3
      "
    >
      <div
        className="
          mt-0.5
          text-muted-foreground
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-xs
            text-muted-foreground
          "
        >
          {label}
        </p>

        <p
          className="
            font-medium
            break-all
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}