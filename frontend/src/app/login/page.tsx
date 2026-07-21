import {
  BarChart3,
  CreditCard,
  Users,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  LoginForm,
} from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-background
        via-background
        to-muted/30
        p-20
        lg:p-25
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[calc(15vh-1rem)]
          max-w-7xl
          overflow-hidden
          rounded-3xl
          bg-background
          shadow-2xl
        "
      >
        {/* LEFT SIDE */}
        <section
          className="
            hidden
            lg:flex
            lg:w-3/5
            flex-col
            justify-between
            border-r
            bg-gradient-to-br
            from-background
            via-background
            to-muted/40
            p-15
          "
        >
          <div className="space-y-8">
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-2"
            >
              Future Enterprise CRM
            </Badge>

            <div className="space-y-6">
              <h1
                className="
                  max-w-3xl
                  text-6xl
                  font-black
                  leading-19
                  tracking-tight
                "
              >
                Manage Your
                <br />
                Sales Pipeline
                <br />
                Smarter.
              </h1>

              <p
                className="
                  max-w-2xl
                  text-l
                  leading-6
                  text-muted-foreground
                "
              >
                FECRM membantu tim Sales,
                Finance, dan Management
                mengelola Lead, Deal,
                Invoice, Payment, Collection,
                serta Reporting dalam satu
                platform enterprise modern.
              </p>
            </div>
          </div>

          <div
            className="
              grid
              gap-5
              md:grid-cols-3
            "
          >
            <Card className="border-0 bg-muted/40 shadow-none">
              <CardContent className="space-y-3 p-6">
                <Users className="h-8 w-8" />
                <div>
                  <h3 className="text-3xl font-bold">
                    CRM
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Lead & Customer
                    Management
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted/40 shadow-none">
              <CardContent className="space-y-3 p-6">
                <CreditCard className="h-8 w-8" />
                <div>
                  <h3 className="text-3xl font-bold">
                    ERP
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Invoice & Payment
                    Automation
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-muted/40 shadow-none">
              <CardContent className="space-y-3 p-6">
                <BarChart3 className="h-8 w-8" />
                <div>
                  <h3 className="text-3xl font-bold">
                    BI
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Executive Dashboard &
                    Reporting
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section
          className="
            flex
            w-full
            items-center
            justify-center
            bg-background
            p-8
            lg:w-2/5
            lg:p-14
          "
        >
          <div
            className="
              w-full
              max-w-md
            "
          >
            <div className="mb-10 text-center">
              <h2 className="text-5xl font-black tracking-tight">
                Welcome
              </h2>

              <p
                className="
                  mt-4
                  text-base
                  leading-7
                  text-muted-foreground
                "
              >
                Sign in to continue
                managing your Future
                Enterprise CRM platform.
              </p>
            </div>

            <Card
              className="
                border
                shadow-xl
              "
            >
              <CardContent className="p-8">
                <LoginForm />
              </CardContent>
            </Card>

            <p
              className="
                mt-8
                text-center
                text-xs
                text-muted-foreground
              "
            >
              © 2026 FECRM
              <br />
              Future Enterprise CRM Platform
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}