// Shared facts for the free website assessment (the site's front door).
// Change the turnaround here and it updates the page, FAQ, and the
// confirmation email together.

export const ASSESSMENT_FORM_NAME = "Free Website Assessment";
export const ASSESSMENT_PATH = "/free-website-assessment";
export const ASSESSMENT_TURNAROUND = "two business days";

// Qualifier answers. The vendor option exists so people pitching ZINC can
// self-identify; those submissions are stored as spam and never notify.
export const ROLE_FIELD = "Which describes you?";
export const ROLE_OPTIONS = [
  "I run or help run the business",
  "I lead marketing or the website",
  "I am offering a service to ZINC",
] as const;
export const VENDOR_ROLE = ROLE_OPTIONS[2];
