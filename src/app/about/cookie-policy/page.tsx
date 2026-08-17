import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import "@/components/site/site.css";

// First page componentized off the Webflow port (Phase B). The filesystem
// route takes precedence over the afterFiles rewrite to /_wf/, so the old
// static HTML stops serving the moment this deploys; the sitemap (driven by
// the manifest) is unchanged.

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
});

const DESCRIPTION =
  "Review ZINC’s cookie policy, including how cookies and related technologies may be used on the wearezinc.com website.";

export const metadata: Metadata = {
  title: "Cookie Policy | ZINC",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/about/cookie-policy" },
  openGraph: {
    title: "Cookie Policy | ZINC",
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | ZINC",
    description: DESCRIPTION,
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZINC",
  url: "https://www.wearezinc.com",
  logo: "https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png",
  description:
    "ZINC is an AI-driven digital strategy and design agency: AI enablement, answer engine optimization (AEO), web design and development, ecommerce, branding, and marketing systems.",
};

// Webflow rich text used zero-width-joiner paragraphs as vertical spacers;
// they are preserved so section rhythm matches the original exactly.
function Spacer({ n = 1 }: { n?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <p key={i}>{"‍"}</p>
      ))}
    </>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="col-narrow centered">
      <h2 className="display-h2">{title}</h2>
      <div className="rich">{children}</div>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <div className={`site ${geist.variable}`}>
      {/* Set the class before the headline paints so hidden→reveal never flickers. */}
      <script
        dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('gsap-js');" }}
      />
      <Navbar />
      <main>
        <header>
          <div className="pad-global">
            <div className="container-lg">
              <div className="section-pad">
                <div className="col-narrow">
                  <h1 className="display-h1" data-gsap-lines="">Cookie Policy</h1>
                  <p className="text-md fade-up">
                    Last Updated: 01.02.2026
                    <br />
                    <br />
                    This Cookie Policy explains how ZINC (“we,” “our,” “us”) uses
                    cookies and similar technologies when you visit our website
                    (www.wearezinc.com).
                    <br />
                    {"‍"}
                    <br />
                    By continuing to use our site, you consent to the use of
                    cookies as described in this policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section>
          <div className="pad-global">
            <div className="container-lg">
              <div className="section-pad">
                <PolicySection title={<>1. <strong>What Are Cookies?</strong></>}>
                  <p>
                    Cookies are small text files placed on your device when you
                    visit a website. They allow us to recognize your browser,
                    store preferences, and improve your browsing experience.
                  </p>
                  <Spacer />
                </PolicySection>

                <PolicySection title={<>2. <strong>Types of Cookies We Use</strong></>}>
                  <p>We use the following categories of cookies:</p>
                  <ul role="list">
                    <li>
                      <strong>Essential Cookies</strong>: Required for the website
                      to function properly (e.g., security, form submissions, load
                      balancing).
                    </li>
                    <li>
                      <strong>Performance &amp; Analytics Cookies</strong>: Help us
                      understand how visitors use our site so we can improve
                      functionality and content (e.g., Google Analytics, Webflow
                      analytics).
                    </li>
                    <li>
                      <strong>Functional Cookies</strong>: Enable enhanced features
                      such as remembering your preferences or personalizing your
                      experience.
                    </li>
                    <li>
                      <strong>Marketing &amp; Advertising Cookies</strong>: May
                      track browsing activity across websites to deliver relevant
                      ads or measure campaign effectiveness.
                    </li>
                  </ul>
                  <Spacer n={2} />
                </PolicySection>

                <PolicySection title={<>3. <strong>Third-Party Cookies</strong></>}>
                  <p>
                    Some cookies are set by third-party services that we use, such
                    as analytics providers, advertising networks, and social media
                    platforms. These third parties may collect information about
                    your online activity over time and across different websites.
                  </p>
                  <Spacer />
                </PolicySection>

                <PolicySection title={<>4. <strong>How You Can Control Cookies</strong></>}>
                  <p>You have the right to decide whether to accept or reject cookies.</p>
                  <ul role="list">
                    <li>
                      <strong>Browser Settings</strong>: Most browsers allow you to
                      control cookies through their settings. You can usually set
                      your browser to block or delete cookies.
                    </li>
                    <li>
                      <strong>Opt-Out Tools</strong>: For analytics cookies, you may
                      opt out using tools such as the{" "}
                      <a href="#" target="_new">Google Analytics Opt-out Browser Add-on</a>.
                    </li>
                    <li>
                      <strong>Consent Banner</strong>: When you first visit our
                      site, you may see a banner giving you the option to accept or
                      manage cookie preferences.
                    </li>
                  </ul>
                  <p>
                    Please note: Disabling certain cookies may impact the
                    functionality of the site.
                  </p>
                  <Spacer n={3} />
                </PolicySection>

                <PolicySection title={<>5. Changes to This Policy</>}>
                  <p>
                    We may update this Cookie Policy from time to time to reflect
                    changes in technology, regulations, or our practices. Updates
                    will be posted on this page with a new “last updated” date.
                  </p>
                  <Spacer />
                </PolicySection>

                <PolicySection title={<>6. <strong>Contact Us</strong></>}>
                  <p>
                    If you have questions about this Privacy Policy or how we
                    handle your data, please contact us at:
                  </p>
                  <p>ZINC</p>
                  <p>Email: privacy@wearezinc.com</p>
                  <p>Website: www.wearezinc.com</p>
                  <Spacer n={2} />
                </PolicySection>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer currentPath="/about/cookie-policy" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <Script src="/js/reveal.js" strategy="afterInteractive" />
      <SiteAnalytics />
    </div>
  );
}
