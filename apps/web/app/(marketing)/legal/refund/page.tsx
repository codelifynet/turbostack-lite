import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy - TurboStack",
  description:
    "TurboStack Refund Policy - Learn about our refund terms and conditions.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
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
              1. General Information
            </h2>
            <p className="text-muted-foreground mb-4">
              This Refund Policy outlines the terms and conditions under which
              you may request a refund for TurboStack products and services.
              This policy is compliant with European Union consumer protection
              laws, including the Consumer Rights Directive (2011/83/EU) and the
              Digital Content Directive (2019/770/EU).
            </p>
            <p className="text-muted-foreground">
              By purchasing TurboStack products, you agree to the terms outlined
              in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Refund Eligibility
            </h2>
            <p className="text-muted-foreground mb-4">
              You are eligible for a full refund under the following conditions:
            </p>
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-lg">Time Limit</h3>
                <p className="text-muted-foreground">
                  You must request a refund within <strong>6 hours</strong> of
                  your initial purchase. The 6-hour period begins immediately
                  after the successful completion of your purchase transaction.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">
                  Refund Request Method
                </h3>
                <p className="text-muted-foreground">
                  To request a refund, you must send an email to{" "}
                  <a
                    href="mailto:hi@codelify.net"
                    className="text-primary hover:underline font-medium"
                  >
                    hi@codelify.net
                  </a>{" "}
                  with the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                  <li>Your order number or transaction ID</li>
                  <li>Date and time of purchase</li>
                  <li>Reason for refund request</li>
                  <li>Payment method used</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Non-Refundable Conditions
            </h2>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-lg text-destructive">
                ⚠️ Important: GitHub Repository Restriction
              </h3>
              <p className="text-muted-foreground mb-3">
                <strong>
                  If you have added the product's source code to a GitHub
                  repository (or any other public or private code repository),
                  you are NOT eligible for a refund, regardless of the 6-hour
                  time limit.
                </strong>
              </p>
              <p className="text-muted-foreground">
                This restriction applies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-2">
                <li>Public GitHub repositories</li>
                <li>Private GitHub repositories</li>
                <li>
                  Any other code hosting platforms (GitLab, Bitbucket, etc.)
                </li>
                <li>Any form of code sharing or distribution</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                By adding the source code to a repository, you are considered to
                have accepted and used the product, making it ineligible for
                refund under EU digital content regulations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
            <p className="text-muted-foreground mb-4">
              Once your refund request is received and approved:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground ml-4">
              <li>
                <strong>Verification:</strong> We will verify your purchase and
                check that the 6-hour window has not expired and that the source
                code has not been added to any repository.
              </li>
              <li>
                <strong>Processing Time:</strong> Refunds are typically
                processed within 5-10 business days after approval.
              </li>
              <li>
                <strong>Payment Method:</strong> The refund will be issued to
                the same payment method used for the original purchase.
              </li>
              <li>
                <strong>Confirmation:</strong> You will receive an email
                confirmation once the refund has been processed.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. European Union Consumer Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              This refund policy is designed to comply with EU consumer
              protection laws:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Consumer Rights Directive (2011/83/EU):</strong>{" "}
                Provides consumers with a 14-day right of withdrawal for
                distance contracts, with exceptions for digital content.
              </li>
              <li>
                <strong>Digital Content Directive (2019/770/EU):</strong>{" "}
                Governs the supply of digital content and digital services,
                including refund rights for non-conforming digital content.
              </li>
              <li>
                <strong>Right of Withdrawal:</strong> For digital content, the
                right of withdrawal may be lost if the consumer has consented to
                immediate performance and acknowledged the loss of the right of
                withdrawal.
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Our 6-hour refund window provides a reasonable opportunity for
              consumers to evaluate the product while protecting against abuse
              of refund rights after code has been used or distributed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Subscription Refunds
            </h2>
            <p className="text-muted-foreground mb-4">
              For subscription-based services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Refunds are only available for the current billing period if
                requested within 6 hours of the initial subscription or renewal.
              </li>
              <li>
                You may cancel your subscription at any time, but refunds for
                unused periods are not available after the 6-hour window.
              </li>
              <li>
                Cancellation will take effect at the end of the current billing
                period.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Disputes and Complaints
            </h2>
            <p className="text-muted-foreground mb-4">
              If you are not satisfied with our refund decision, you have the
              right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                Contact us at{" "}
                <a
                  href="mailto:hi@codelify.net"
                  className="text-primary hover:underline"
                >
                  hi@codelify.net
                </a>{" "}
                for further review
              </li>
              <li>
                File a complaint with your local consumer protection authority
              </li>
              <li>
                Use the European Commission's Online Dispute Resolution platform
                at{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify this Refund Policy at any time.
              Changes will be effective immediately upon posting on this page.
              Material changes will be communicated via email to registered
              users.
            </p>
            <p className="text-muted-foreground">
              The refund policy in effect at the time of your purchase will
              apply to your transaction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              For refund requests or questions about this policy:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:hi@codelify.net"
                  className="text-primary hover:underline"
                >
                  hi@codelify.net
                </a>
              </p>
              <p>
                <strong>Contact Form:</strong>{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  /contact
                </Link>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Response Time:</strong> We aim to respond to refund
                requests within 24-48 hours during business days.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
