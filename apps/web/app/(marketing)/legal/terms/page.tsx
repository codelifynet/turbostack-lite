import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - TurboStack",
  description:
    "TurboStack Terms of Service - Rules and regulations for using our services in compliance with EU regulations.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. General Provisions
            </h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service apply when using TurboStack services. By
              using our services, you agree to these terms. If you do not agree
              to these terms, please do not use our services.
            </p>
            <p className="text-muted-foreground">
              These terms are subject to European Union regulations, including
              the Consumer Rights Directive (2011/83/EU), the Digital Content
              Directive (2019/770/EU), and applicable national laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Service Description
            </h2>
            <p className="text-muted-foreground mb-4">
              TurboStack provides a ready-to-use monorepo starter kit for
              building modern full-stack applications. Our services include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Code templates and examples</li>
              <li>Documentation and educational materials</li>
              <li>Technical support (on paid plans)</li>
              <li>Cloud hosting and infrastructure services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Creation</h2>
            <p className="text-muted-foreground mb-4">
              To use our services, you must create an account. When creating an
              account:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>You must provide accurate and current information</li>
              <li>You are responsible for the security of your account</li>
              <li>You must keep your password confidential</li>
              <li>You are responsible for all activities under your account</li>
              <li>
                If you are under 18, you must have parental/guardian consent
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. User Obligations</h2>
            <p className="text-muted-foreground mb-4">
              When using our services, you must comply with the following rules:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Legal Compliance:</strong> You must act in accordance
                with all local and international laws
              </li>
              <li>
                <strong>Intellectual Property:</strong> You must respect
                copyright and other intellectual property rights
              </li>
              <li>
                <strong>Harmful Content:</strong> You must not share harmful,
                illegal, or offensive content
              </li>
              <li>
                <strong>Security:</strong> You must not engage in actions that
                compromise system security
              </li>
              <li>
                <strong>Spam:</strong> You must not engage in spam, phishing, or
                similar activities
              </li>
              <li>
                <strong>Account Sharing:</strong> You must not share your
                account with others
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              All TurboStack content (code, documentation, design, logo, etc.)
              is protected by copyright and other intellectual property laws.
              Except for code provided under open source licenses, you may not
              copy, distribute, or modify our content without permission.
            </p>
            <p className="text-muted-foreground">
              When using TurboStack code in your own projects, you must comply
              with the relevant license terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Payment and Billing
            </h2>
            <p className="text-muted-foreground mb-4">For paid plans:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Prices are stated in advance and you will be notified of any
                changes
              </li>
              <li>Payments are processed through secure payment providers</li>
              <li>Invoices are sent via email</li>
              <li>
                Refund policy complies with applicable laws (see{" "}
                <Link
                  href="/legal/refund"
                  className="text-primary hover:underline"
                >
                  Refund Policy
                </Link>
                )
              </li>
              <li>Services may be suspended if payment is not made</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Service Interruptions
            </h2>
            <p className="text-muted-foreground mb-4">
              Our services may experience planned or unplanned interruptions. We
              will provide advance notice when possible, but may not be able to
              do so in emergency situations. We are not liable for damages
              resulting from interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Account Cancellation and Termination
            </h2>
            <p className="text-muted-foreground mb-4">
              You may cancel your account at any time. Cancellation:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Can be done through account settings</li>
              <li>Your data will be deleted within 30 days</li>
              <li>
                Cancelled payments are not refunded (subject to refund policy)
              </li>
              <li>Legal retention obligations remain in effect</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              If you violate these terms, your account may be terminated and
              legal action may be taken.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              Our services are provided "as is." We are not liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Service interruptions or technical issues</li>
              <li>Data loss resulting from user error</li>
              <li>Issues with third-party services</li>
              <li>Service changes due to legal requirements</li>
              <li>Indirect, special, or consequential damages</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Nothing in these terms excludes or limits our liability for death
              or personal injury caused by our negligence, fraud, or any other
              liability that cannot be excluded or limited by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. European Consumer Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              If you are a consumer in the European Union, you have certain
              legal rights that cannot be excluded or limited:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Right of Withdrawal:</strong> You have the right to
                withdraw from the contract within 14 days (subject to exceptions
                for digital content)
              </li>
              <li>
                <strong>Right to Conformity:</strong> Digital content must
                conform to the contract
              </li>
              <li>
                <strong>Right to Redress:</strong> You have the right to
                remedies if digital content does not conform
              </li>
              <li>
                <strong>Right to Information:</strong> You have the right to
                clear information about the service before purchase
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. Changes to These Terms
            </h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service may be updated from time to time.
              Significant changes will be communicated via email or site
              notification. By continuing to use the services after changes, you
              agree to the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Governing Law and Jurisdiction
            </h2>
            <p className="text-muted-foreground mb-4">
              These Terms of Service are governed by European Union law and
              applicable national laws. For consumers, the courts of your
              country of residence have jurisdiction. For businesses, disputes
              will be resolved in accordance with applicable EU regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              13. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@turbostack.dev"
                  className="text-primary hover:underline"
                >
                  legal@turbostack.dev
                </a>
              </p>
              <p>
                <strong>Contact Form:</strong>{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  /contact
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
