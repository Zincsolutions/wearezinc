type FaqSource = { question: string; answer: string };

const SITE = "https://www.wearezinc.com";
const ORGANIZATION_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

const decodeEntities = (value: string) =>
  value
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&gt;/gi, ">")
    .replace(/&lt;/gi, "<");

export const textFromHtml = (html: string) =>
  decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

export const serializeSchema = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "ZINC",
  legalName: "ZINC Solutions Inc.",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png`,
  },
  description:
    "ZINC is an AI-driven digital strategy and design agency specializing in AI enablement, answer engine optimization, websites, ecommerce, branding, and marketing systems.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-949-719-4950",
    email: "hello@wearezinc.com",
    contactType: "sales",
  },
  knowsAbout: [
    "AI enablement",
    "Answer engine optimization",
    "Website design and development",
    "Ecommerce acceleration",
    "Digital strategy",
    "Branding and positioning",
  ],
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "ZINC",
  url: SITE,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-US",
};

const faqPage = (faqs: FaqSource[], pageUrl: string) => ({
  "@type": "FAQPage",
  "@id": `${pageUrl}#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export function buildHomeSchema(faqs: FaqSource[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": "WebPage",
        "@id": `${SITE}/#webpage`,
        url: SITE,
        name: "ZINC | AI-Driven Digital Strategy & Design Agency",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        inLanguage: "en-US",
      },
      faqPage(faqs, SITE),
    ],
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
  faqs,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  faqs: FaqSource[];
}) {
  const url = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${url}#service` },
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name,
        description,
        serviceType,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: "Worldwide",
        url,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name, item: url },
        ],
      },
      faqPage(faqs, url),
    ],
  };
}
