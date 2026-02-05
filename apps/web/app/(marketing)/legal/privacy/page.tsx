import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - TurboStack",
  description:
    "TurboStack Privacy Policy - Learn how we protect and handle your personal data in compliance with GDPR and EU regulations.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
              At TurboStack, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, store, and protect your personal
              data. This policy is compliant with the European Union General
              Data Protection Regulation (GDPR) and applicable data protection
              laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Data Controller</h2>
            <p className="text-muted-foreground mb-4">
              The data controller responsible for processing your personal data:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="font-semibold mb-2">TurboStack</p>
              <p className="text-sm text-muted-foreground">
                Email:{" "}
                <a
                  href="mailto:privacy@turbostack.dev"
                  className="text-primary hover:underline"
                >
                  privacy@turbostack.dev
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Personal Data We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              To provide our services, we may collect the following personal
              data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Identity Information:</strong> Name, email address
              </li>
              <li>
                <strong>Account Information:</strong> Username, password
                (hashed)
              </li>
              <li>
                <strong>Contact Information:</strong> Email address, phone
                number
              </li>
              <li>
                <strong>Technical Information:</strong> IP address, browser
                information, device information
              </li>
              <li>
                <strong>Usage Data:</strong> Page views, click data, session
                durations
              </li>
              <li>
                <strong>Payment Information:</strong> Payment transactions are
                processed through secure payment providers
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Purpose of Processing Personal Data
            </h2>
            <p className="text-muted-foreground mb-4">
              Your personal data is processed for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Account creation and management</li>
              <li>Providing and improving our services</li>
              <li>Customer support</li>
              <li>Compliance with legal obligations</li>
              <li>Security and fraud prevention</li>
              <li>Communication and notifications</li>
              <li>Analytics and statistical studies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Sharing of Personal Data
            </h2>
            <p className="text-muted-foreground mb-4">
              Your personal data may be shared with third parties in the
              following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Service Providers:</strong> Cloud hosting, payment
                processors, email services
              </li>
              <li>
                <strong>Legal Obligations:</strong> Court orders, legal requests
              </li>
              <li>
                <strong>Business Partners:</strong> Only when necessary and with
                confidentiality agreements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement the following measures to ensure the security of your
              personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>SSL/TLS encryption</li>
              <li>Secure data storage</li>
              <li>Regular security audits</li>
              <li>Access controls and authorization</li>
              <li>Password hashing (Argon2)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Your Rights Under GDPR
            </h2>
            <p className="text-muted-foreground mb-4">
              Under the General Data Protection Regulation (GDPR), you have the
              following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Right of Access:</strong> You have the right to obtain
                confirmation as to whether or not your personal data is being
                processed
              </li>
              <li>
                <strong>Right to Rectification:</strong> You have the right to
                have inaccurate personal data corrected
              </li>
              <li>
                <strong>Right to Erasure:</strong> You have the right to request
                deletion of your personal data ("right to be forgotten")
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You have the
                right to restrict the processing of your personal data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You have the right
                to receive your personal data in a structured, commonly used
                format
              </li>
              <li>
                <strong>Right to Object:</strong> You have the right to object
                to processing of your personal data
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> You have the right
                to withdraw your consent at any time
              </li>
              <li>
                <strong>Right to Lodge a Complaint:</strong> You have the right
                to lodge a complaint with a supervisory authority
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us through our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact form
              </Link>{" "}
              or send an email to{" "}
              <a
                href="mailto:privacy@turbostack.dev"
                className="text-primary hover:underline"
              >
                privacy@turbostack.dev
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Our website uses cookies. For detailed information, please review
              our{" "}
              <Link
                href="/legal/cookies"
                className="text-primary hover:underline"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              9. Data Retention Period
            </h2>
            <p className="text-muted-foreground mb-4">
              Your personal data is retained for as long as necessary to fulfill
              the purposes for which it was collected and in accordance with
              applicable legal requirements. When you delete your account, your
              data will be deleted or anonymized within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-muted-foreground mb-4">
              Your personal data may be transferred to and processed in
              countries outside the European Economic Area (EEA). We ensure that
              such transfers comply with GDPR requirements through appropriate
              safeguards, such as Standard Contractual Clauses (SCCs) or
              adequacy decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              This Privacy Policy may be updated from time to time. Significant
              changes will be communicated via email or site notification. The
              current version can always be found on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              12. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              For questions about our Privacy Policy:
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@turbostack.dev"
                  className="text-primary hover:underline"
                >
                  privacy@turbostack.dev
                </a>
              </p>
              <p>
                <strong>Contact Form:</strong>{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  /contact
                </Link>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Data Protection Officer:</strong> If you have concerns
                about data protection, you can also contact your local data
                protection authority.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
