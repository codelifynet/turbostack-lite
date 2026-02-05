import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy - TurboStack",
  description:
    "TurboStack Cookie Policy - Information about cookies used on our website in compliance with GDPR and EU regulations.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
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
              1. What Are Cookies?
            </h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are stored on your device when
              you visit websites. Cookies are used to ensure the website
              functions properly, improve user experience, and for analytical
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use the following types of cookies on our website:
            </p>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Essential Cookies
                </h3>
                <p className="text-muted-foreground mb-3">
                  These cookies are necessary for the website's basic functions
                  and cannot be disabled.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    <strong>Session Cookies:</strong> Identify logged-in users
                  </li>
                  <li>
                    <strong>Security Cookies:</strong> Secure session management
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> User preferences such
                    as language and theme
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  <strong>Storage Duration:</strong> Session duration or 1 year
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-muted-foreground mb-3">
                  These cookies help us understand how the website is used. They
                  collect statistical data.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    <strong>Google Analytics:</strong> Visitor count, page
                    views, user behavior
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Page load times, error
                    rates
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  <strong>Storage Duration:</strong> 2 years
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Can Be Disabled:</strong> Yes (through browser
                  settings)
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Functional Cookies
                </h3>
                <p className="text-muted-foreground mb-3">
                  These cookies provide advanced features and personalization.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>
                    <strong>Preference Memory:</strong> Save user preferences
                  </li>
                  <li>
                    <strong>Language Selection:</strong> Remember selected
                    language
                  </li>
                  <li>
                    <strong>Theme Selection:</strong> Dark/light mode preference
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3">
                  <strong>Storage Duration:</strong> 1 year
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Targeting/Advertising Cookies
                </h3>
                <p className="text-muted-foreground mb-3">
                  We currently do not use advertising or targeting cookies. If
                  we start using them in the future, this page will be updated
                  and your consent will be requested.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Third-Party Cookies
            </h2>
            <p className="text-muted-foreground mb-4">
              Some cookies are placed by third-party services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>
                <strong>Google Analytics:</strong> Web analytics service
              </li>
              <li>
                <strong>Payment Providers:</strong> For secure payment
                processing
              </li>
              <li>
                <strong>CDN Providers:</strong> For content delivery network
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              These services have their own privacy policies. For details,
              please visit the relevant service providers' websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Cookie Management
            </h2>
            <p className="text-muted-foreground mb-4">
              You can manage your cookie preferences in the following ways:
            </p>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Browser Settings</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Most browsers accept cookies automatically, but you can change
                  this in settings:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and security →
                    Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Options → Privacy & Security →
                    Cookies
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Privacy, search, and
                    services → Cookies
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Cookie Consent</h3>
                <p className="text-sm text-muted-foreground">
                  On your first visit, you will be asked for cookie consent. The
                  website may not function properly without essential cookies.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Deleting Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  You can delete cookies through your browser settings. However,
                  this may cause some website features to stop working.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookie List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left">
                      Cookie Name
                    </th>
                    <th className="border border-border p-3 text-left">
                      Purpose
                    </th>
                    <th className="border border-border p-3 text-left">
                      Duration
                    </th>
                    <th className="border border-border p-3 text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-mono text-sm">
                      session_token
                    </td>
                    <td className="border border-border p-3">
                      User session management
                    </td>
                    <td className="border border-border p-3">7 days</td>
                    <td className="border border-border p-3">Essential</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-mono text-sm">
                      theme
                    </td>
                    <td className="border border-border p-3">
                      Theme preference (dark/light)
                    </td>
                    <td className="border border-border p-3">1 year</td>
                    <td className="border border-border p-3">Functional</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-mono text-sm">
                      language
                    </td>
                    <td className="border border-border p-3">
                      Language preference
                    </td>
                    <td className="border border-border p-3">1 year</td>
                    <td className="border border-border p-3">Functional</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-mono text-sm">
                      _ga
                    </td>
                    <td className="border border-border p-3">
                      Google Analytics - User identification
                    </td>
                    <td className="border border-border p-3">2 years</td>
                    <td className="border border-border p-3">Analytics</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-mono text-sm">
                      _gid
                    </td>
                    <td className="border border-border p-3">
                      Google Analytics - Session identification
                    </td>
                    <td className="border border-border p-3">24 hours</td>
                    <td className="border border-border p-3">Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Legal Basis</h2>
            <p className="text-muted-foreground mb-4">
              Our cookie usage complies with the following regulations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>European Union General Data Protection Regulation (GDPR)</li>
              <li>ePrivacy Directive (2002/58/EC)</li>
              <li>EU Cookie Law requirements</li>
              <li>Applicable national data protection laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              This Cookie Policy may be updated from time to time. Significant
              changes will be communicated via email or site notification. The
              current version can always be found on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              For questions about our Cookie Policy:
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
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
