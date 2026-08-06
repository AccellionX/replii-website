import { CTA } from "@/lib/constants";

/* ——— Credibility strip ——— */

export const CREDIBILITY_CHANNELS = [
  "Instagram",
  "Messenger",
  "WhatsApp",
  "Google Sheets",
  "CRM",
  "Webhooks",
] as const;

/* ——— Problem / timeline ——— */

export const PROBLEM_TIMELINE = [
  { time: "2:47 AM", label: "Lead messages from your ad", accent: false },
  { time: "2:47 AM", label: "Replii replies and identifies intent", accent: true },
  { time: "2:49 AM", label: "Lead is qualified", accent: true },
  { time: "8:30 AM", label: "Your team receives the summary", accent: false },
] as const;

export const PROBLEM_WITHOUT = [
  "Someone must monitor multiple channels",
  "The same questions are answered repeatedly",
  "Leads wait during breaks and after hours",
  "Important prospects get mixed with casual inquiries",
  "Salespeople qualify weak leads manually",
  "Coverage depends on staff availability",
] as const;

export const PROBLEM_WITH = [
  "Every inquiry receives an immediate response",
  "Common questions are handled automatically",
  "Lead details are collected consistently",
  "Serious prospects are identified",
  "Qualified leads are routed to the team",
  "A human can step in at any time",
] as const;

/* ——— Interactive demo scenarios ——— */

export type DemoScenarioId = "dental" | "real-estate" | "home-services";

export type DemoScenario = {
  id: DemoScenarioId;
  label: string;
  source: string;
  incoming: string;
  qualification: string[];
  answers: string[];
  outcome: string;
  repliiOpener: string;
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "dental",
    label: "Dental clinic",
    source: "Instagram Ad — Dental Implants",
    incoming: "How much does one implant cost?",
    qualification: [
      "Treatment type",
      "City",
      "Timeline",
      "Consultation availability",
    ],
    answers: ["Single implant", "Austin, TX", "This month", "Weekday afternoons"],
    outcome: "Consultation requested",
    repliiOpener:
      "Happy to help with implant pricing. A few quick questions so we can give you an accurate next step.",
  },
  {
    id: "real-estate",
    label: "Real estate",
    source: "Facebook Ad — Apartments in Downtown",
    incoming: "Is the two-bedroom unit still available?",
    qualification: [
      "Budget",
      "Preferred location",
      "Buying timeline",
      "Financing status",
    ],
    answers: ["$450–550k", "Downtown core", "Next 60 days", "Pre-approved"],
    outcome: "Qualified lead sent to agent",
    repliiOpener:
      "Yes — that two-bedroom is still listed. Let me confirm fit so I can connect you with the right agent.",
  },
  {
    id: "home-services",
    label: "Home services",
    source: "Instagram Ad — Emergency Plumbing",
    incoming: "I have a leaking pipe. Can someone come today?",
    qualification: ["Service type", "ZIP code", "Urgency", "Property type"],
    answers: ["Pipe leak / repair", "78704", "Same-day", "Single-family home"],
    outcome: "Urgent callback requested",
    repliiOpener:
      "Sorry about the leak — we can help today. I need a few details to prioritize a tech.",
  },
];

/* ——— Features (bento) ——— */

export const MEDIUM_FEATURES = [
  {
    title: "Knowledge base",
    body: "Stop retyping services, pricing guidance, FAQs and policies—train Replii once and reuse approved answers.",
  },
  {
    title: "Appointment booking",
    body: "Reduce back-and-forth scheduling by offering times and capturing booking details in the first conversation.",
  },
  {
    title: "CRM and Google Sheets sync",
    body: "Cut manual copy-paste by sending qualified lead details into the tools your team already uses.",
  },
] as const;

export const SMALL_FEATURES = [
  {
    title: "Lead summaries",
    body: "Skip reading every thread from scratch—open a ready summary before you reply.",
  },
  {
    title: "Broadcast follow-up",
    body: "Reduce one-by-one chase messages with approved follow-up campaigns.",
  },
  {
    title: "Multi-location support",
    body: "Avoid juggling separate inboxes when brands or locations share the same first-response rules.",
  },
  {
    title: "Multilingual replies",
    body: "Handle common questions in more than one language without assigning extra reply coverage.",
  },
  {
    title: "Analytics",
    body: "See how much first-response and qualification work was handled before handoff.",
  },
  {
    title: "Routing rules",
    body: "Send serious prospects to the right person instead of sorting the inbox by hand.",
  },
  {
    title: "Industry templates",
    body: "Start from proven qualification questions so setup is not a blank page.",
  },
  {
    title: "Webhooks and API",
    body: "Pass outcomes into custom workflows without re-entering lead data.",
  },
] as const;

export const DEMO_INBOX_WORK = [
  "Answered the initial inquiry",
  "Shared approved information",
  "Asked qualification questions",
  "Captured lead details",
  "Identified urgency",
  "Offered the next step",
  "Created lead summary",
  "Routed to team",
] as const;

export const WORKLOAD_COMPARISON_ROWS = [
  {
    responsibility: "Monitor incoming messages",
    manual: "Must remain available and switch between channels",
    replii: "Monitors connected channels continuously",
    human: "No",
  },
  {
    responsibility: "Answer common questions",
    manual: "Types similar replies repeatedly",
    replii: "Responds using approved business information",
    human: "Only for exceptions",
  },
  {
    responsibility: "Collect lead details",
    manual: "Asks questions manually",
    replii: "Runs a consistent qualification flow",
    human: "No",
  },
  {
    responsibility: "Identify serious leads",
    manual: "Reviews each conversation individually",
    replii: "Tags and summarizes lead intent",
    human: "Reviews qualified summary",
  },
  {
    responsibility: "Handle negotiation",
    manual: "Required",
    replii: "Routes to a person",
    human: "Yes",
  },
  {
    responsibility: "Close the sale",
    manual: "Required for consultative sales",
    replii: "Supports booking and handoff",
    human: "Yes",
  },
] as const;

export const PILOT_REVIEW_METRICS = [
  "Initial inquiries received",
  "Response time",
  "Questions answered automatically",
  "Leads qualified",
  "Human takeovers",
  "After-hours conversations",
  "Appointments or handoffs created",
] as const;

/* ——— Industries ——— */

export type IndustryUseCase = {
  name: string;
  question: string;
  qualifies: string;
  action: string;
  staffUsuallyAnswer: string;
  repliiHandles: string;
};

export const industryUseCases: IndustryUseCase[] = [
  {
    name: "Dental and medical clinics",
    question: "How much are implants?",
    qualifies: "Treatment, city, timeline and consultation availability",
    action: "Books consultation",
    staffUsuallyAnswer:
      "Pricing ranges, treatment options, location, and whether a consult is needed",
    repliiHandles:
      "First reply, service and timeline questions, and consult handoff summary",
  },
  {
    name: "Real estate",
    question: "Is the two-bedroom still available?",
    qualifies: "Budget, location, timeline and financing status",
    action: "Sends qualified lead to agent",
    staffUsuallyAnswer:
      "Availability, price range, neighborhood fit, and viewing interest",
    repliiHandles:
      "Availability reply, budget and timeline qualification, and agent routing",
  },
  {
    name: "Gyms and fitness studios",
    question: "Do you have membership deals this month?",
    qualifies: "Goal, preferred schedule, location and trial interest",
    action: "Books trial class or tour",
    staffUsuallyAnswer:
      "Membership options, class times, trial offers, and studio location",
    repliiHandles:
      "Offer answers, schedule preference capture, and trial booking handoff",
  },
  {
    name: "Beauty and aesthetics",
    question: "How much is a hydrafacial?",
    qualifies: "Service, preferred date, provider preference and first-time status",
    action: "Books appointment",
    staffUsuallyAnswer:
      "Service pricing, duration, provider availability, and first-visit notes",
    repliiHandles:
      "Price and service FAQ, date preference, and appointment request summary",
  },
  {
    name: "Education and training",
    question: "When does the next cohort start?",
    qualifies: "Program interest, experience level, start window and budget range",
    action: "Schedules admissions call",
    staffUsuallyAnswer:
      "Cohort dates, prerequisites, tuition ranges, and admissions next steps",
    repliiHandles:
      "Program FAQ, fit questions, and admissions call handoff",
  },
  {
    name: "Travel agencies",
    question: "Can you quote a honeymoon package to Bali?",
    qualifies: "Destination, travel dates, party size and budget",
    action: "Requests itinerary consult",
    staffUsuallyAnswer:
      "Package basics, travel windows, party size, and budget expectations",
    repliiHandles:
      "Initial trip questions, qualification details, and consult routing",
  },
  {
    name: "Automotive",
    question: "Is the SUV still in stock with financing?",
    qualifies: "Model interest, trade-in, timeline and financing needs",
    action: "Books test drive",
    staffUsuallyAnswer:
      "Inventory status, trim interest, financing questions, and appointment times",
    repliiHandles:
      "Stock and model FAQ, financing intent capture, and test-drive handoff",
  },
  {
    name: "Home services",
    question: "I have a leaking pipe. Can someone come today?",
    qualifies: "Service type, ZIP code, urgency and property type",
    action: "Requests urgent callback",
    staffUsuallyAnswer:
      "Service type, service area, urgency, and same-day availability",
    repliiHandles:
      "Urgent first reply, ZIP and urgency capture, and callback routing",
  },
  {
    name: "Restaurants",
    question: "Do you have a table for four this Saturday?",
    qualifies: "Party size, date, time preference and occasion",
    action: "Creates reservation request",
    staffUsuallyAnswer:
      "Availability, party size, timing, and special occasion notes",
    repliiHandles:
      "Reservation questions, party details, and request summary for staff",
  },
  {
    name: "Ecommerce",
    question: "Does this ship before Friday?",
    qualifies: "Product, size or variant, delivery window and order intent",
    action: "Captures order details in chat",
    staffUsuallyAnswer:
      "Shipping windows, size or variant options, and order readiness",
    repliiHandles:
      "Shipping FAQ, product details, and order-intent summary",
  },
];

/* ——— Pricing ——— */

export type BillingPeriod = "monthly" | "annual";

export type PricingPlan = {
  id: "starter" | "pro" | "agency";
  name: string;
  bestFor: string;
  monthly: number;
  annual: number;
  conversations: string;
  highlighted?: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    bestFor:
      "For a small business that needs reliable first-response coverage",
    monthly: 99,
    annual: 990,
    conversations: "500 / mo",
    cta: CTA.starter.label,
    ctaHref: CTA.starter.href,
    features: [
      "1 business",
      "Instagram and Messenger",
      "AI replies",
      "FAQ knowledge base",
      "Lead capture",
      "Google Sheets or CRM sync",
      "Up to 500 conversations per month",
      "Standard support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    bestFor:
      "For a growing business that wants qualification, booking, and human handoff",
    monthly: 249,
    annual: 2490,
    conversations: "2,000 / mo",
    highlighted: true,
    cta: CTA.pro.label,
    ctaHref: CTA.pro.href,
    features: [
      "Everything in Starter",
      "WhatsApp",
      "AI qualification and lead scoring",
      "Ad attribution",
      "Live inbox",
      "Human takeover",
      "Booking flows",
      "Broadcasts",
      "Advanced dashboard",
      "Up to 2,000 conversations per month",
      "Priority support",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    bestFor:
      "For teams managing multiple brands, locations, or client inboxes",
    monthly: 599,
    annual: 5990,
    conversations: "6,000 / mo",
    cta: CTA.agency.label,
    ctaHref: CTA.agency.href,
    features: [
      "Everything in Pro",
      "Up to 5 businesses or locations",
      "Multiple pages and numbers",
      "Pooled conversation allowance",
      "Team roles",
      "Client reporting",
      "Onboarding support",
      "Up to 6,000 conversations per month",
    ],
  },
];

export const COMPARISON_ROWS: {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  agency: string | boolean;
}[] = [
  { feature: "Businesses / locations", starter: "1", pro: "1", agency: "Up to 5" },
  { feature: "Instagram & Messenger", starter: true, pro: true, agency: true },
  { feature: "WhatsApp", starter: false, pro: true, agency: true },
  { feature: "AI replies", starter: true, pro: true, agency: true },
  { feature: "AI qualification & scoring", starter: false, pro: true, agency: true },
  { feature: "Ad attribution", starter: false, pro: true, agency: true },
  { feature: "Live inbox & human takeover", starter: false, pro: true, agency: true },
  { feature: "Booking flows", starter: false, pro: true, agency: true },
  { feature: "Broadcasts", starter: false, pro: true, agency: true },
  { feature: "Team roles", starter: false, pro: false, agency: true },
  { feature: "Client reporting", starter: false, pro: false, agency: true },
  { feature: "Conversations / month", starter: "500", pro: "2,000", agency: "6,000" },
  {
    feature: "Support",
    starter: "Standard",
    pro: "Priority",
    agency: "Onboarding + priority",
  },
];

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ——— FAQ ——— */

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQGroup = {
  id: string;
  title: string;
  items: FAQItem[];
};

export const FAQ_GROUPS: FAQGroup[] = [
  {
    id: "product",
    title: "Product",
    items: [
      {
        question: "Is Replii meant to replace my sales team?",
        answer:
          "No. Replii handles repetitive first-response and qualification work. Your team remains responsible for conversations that require judgment, relationship-building, negotiation, or closing.",
      },
      {
        question: "Can my team take over at any time?",
        answer:
          "Yes. Your team can view conversations and take control whenever a lead needs personal attention.",
      },
      {
        question: "What kinds of questions can Replii answer?",
        answer:
          "Replii can answer approved questions based on your services, pricing guidance, locations, hours, policies, availability rules, and knowledge sources.",
      },
      {
        question: "What happens when Replii does not know the answer?",
        answer:
          "It can ask for clarification, use a configured fallback, flag the conversation, or route it to a human instead of inventing information.",
      },
      {
        question: "Can Replii cover nights and weekends?",
        answer:
          "Yes. Replii can respond and qualify leads outside normal business hours while following the rules and information you configure.",
      },
      {
        question: "Do I still need a human inbox manager?",
        answer:
          "That depends on lead volume and sales complexity. Replii can significantly reduce repetitive monitoring and first-response work, but unusual, sensitive, or high-value conversations may still require a person.",
      },
      {
        question: "Which channels does Replii support?",
        answer:
          "Replii works across Instagram DMs, Facebook Messenger and WhatsApp — the messaging surfaces where Meta ad leads typically arrive.",
      },
      {
        question: "How does Replii know which ad generated the lead?",
        answer:
          "Replii captures available campaign and ad attribution context with each conversation so you can see which ad, campaign and message started the thread.",
      },
      {
        question: "Can it book appointments or capture orders?",
        answer:
          "Yes. You can configure booking flows and in-chat order capture so qualified leads move to the next step without leaving the conversation.",
      },
      {
        question: "Can I train it on my business information?",
        answer:
          "Yes. You can train Replii with your services, pricing, FAQs, website content, policies, tone and qualification rules.",
      },
    ],
  },
  {
    id: "setup-pricing",
    title: "Setup and pricing",
    items: [
      {
        question: "How long does setup take?",
        answer:
          "Many businesses can go live quickly once channels and a primary qualification flow are confirmed. Exact timing depends on channel access, knowledge sources and integration needs — and is confirmed before activation.",
      },
      {
        question: "Do I need to replace my CRM?",
        answer:
          "No. Replii can sync qualified lead data into your existing workflow through CRM sync, Google Sheets or webhooks.",
      },
      {
        question: "What counts as a conversation?",
        answer:
          "A conversation is a messaging thread Replii handles with a lead within your plan’s monthly allowance. Exact counting rules are confirmed in your plan or pilot terms.",
      },
      {
        question: "Can I manage multiple brands or locations?",
        answer:
          "Yes on Agency plans — up to five businesses or locations, with options for multiple pages, numbers and pooled conversation allowance. Higher needs can be scoped separately.",
      },
      {
        question: "Is WhatsApp required?",
        answer:
          "No. Starter includes Instagram and Messenger. WhatsApp is available on Pro and Agency.",
      },
      {
        question: "Can Replii work with my current Meta campaigns?",
        answer:
          "Yes. Replii is designed to work with the click-to-message and DM traffic your existing Meta campaigns already generate.",
      },
      {
        question: "Is the pilot available to every business?",
        answer:
          "Not automatically. Pilot terms, setup scope and eligibility are confirmed before activation so we can make sure the use case and channels are a fit.",
      },
    ],
  },
];

/* ——— Pilot / founding ——— */

export const PILOT_STEPS = [
  "Connect channels",
  "Configure qualification",
  "Review conversations and outcomes",
] as const;

export const PILOT_SCOPE = [
  "One business",
  "One primary use case",
  "Real campaign traffic",
  "Dashboard access",
  "Human takeover enabled",
] as const;

export const FOUNDING_BENEFITS = [
  "Hands-on setup",
  "Custom qualification flow",
  "Priority product input",
  "Founder-level support",
  "Introductory pricing",
] as const;
