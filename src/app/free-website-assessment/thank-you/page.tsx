import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { ContentHero } from "@/components/site/content-hero";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { ASSESSMENT_TURNAROUND } from "@/lib/assessment";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

// Conversion URL for the free website assessment (GA4 destination goal and
// any ad pixels). Not indexed and not in the sitemap.
export const metadata: Metadata = {
  title: "Your Assessment Is Underway | ZINC",
  description: "Thanks for requesting a free website assessment from ZINC.",
  robots: { index: false, follow: true },
};

export default function AssessmentThankYouPage() {
  return (
    <div className="site">
      <Navbar />
      <main className="main-wrapper offering-page offering-refresh">
        <ContentHero
          tagline="Request received"
          title="Got it. Your assessment is underway."
          lede={`A senior ZINC strategist will review your website and send your written assessment within ${ASSESSMENT_TURNAROUND}. Check your inbox for a confirmation from us.`}
        >
          <ol role="list" className="thanks_steps">
            <li><span className="thanks_num">01</span><span><strong>We review your site</strong> the way customers and AI assistants see it.</span></li>
            <li><span className="thanks_num">02</span><span><strong>You get a short written assessment</strong> with what matters most and your best next move.</span></li>
            <li><span className="thanks_num">03</span><span><strong>We walk you through it</strong> on a 20-minute call, if that helps. No obligation.</span></li>
          </ol>
          <div className="button-group thanks_actions">
            <a href="/contact-us" className="button w-button">Want to Talk Sooner? Book a Call &gt;</a>
            <a href="/solutions/ai-native-websites#real-change" className="button is-link w-button">Watch a Real Change on Our Site &gt;</a>
          </div>
        </ContentHero>
        <KeepExploring
          heading="While you wait."
          groups={[
            { heading: "See how we work", links: [EXPLORE.realChange, { href: "/solutions/ai-website-migration#proof", title: "We moved our own website first", note: "49 of 49 URLs kept or redirected, and what we learned." }, EXPLORE.dispatch] },
            { heading: "Learn the language", links: [EXPLORE.glossary, EXPLORE.compare, EXPLORE.postStructure] },
            { heading: "Explore", links: [EXPLORE.aiNative, EXPLORE.enterprise, EXPLORE.ecommerce] },
          ]}
        />
      </main>
      <Footer />
      <SiteAnalytics />
    </div>
  );
}
