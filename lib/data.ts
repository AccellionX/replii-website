import { CTA } from "@/lib/constants";

/* ——— Credibility strip ——— */

export const CREDIBILITY_CHANNELS = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Live inbox",
  "Google Sheets",
  "Agency billing",
] as const;

/* ——— Problem / timeline ——— */

export const PROBLEM_TIMELINE = [
  { time: "11:02 PM", label: "Ad lead messages the client", accent: false },
  { time: "11:02 PM", label: "Replii replies in seconds", accent: true },
  { time: "11:04 PM", label: "Lead is qualified, booked, or ordered", accent: true },
  { time: "8:30 AM", label: "A teammate takes over if needed", accent: false },
] as const;

export const PROBLEM_WITHOUT = [
  "Ad leads sit unread after 5–10 minutes — intent dies",
  "Nobody is staffing WhatsApp, Instagram, or Facebook at 11pm",
  "Agencies cannot sit in 10 WhatsApp Business apps",
  "Retainers get blamed on “the ads” when the leak was the inbox",
  "Each client is a separate inbox with no shared view",
  "The shop should never see a SaaS invoice",
] as const;

export const PROBLEM_WITH = [
  "Every ad lead gets an instant first reply on the client’s own channels",
  "One dashboard across clients, WhatsApp, Instagram, and Facebook",
  "AI qualifies, books demos, or takes orders from the knowledge base",
  "A human can jump into any thread from the live inbox",
  "Each client is isolated — Agency A never sees Agency B",
  "Stripe bills the agency. Advertisers get a workspace, not a bill",
] as const;

/* ——— Who this is for ——— */

export const AUDIENCE_BUYERS = [
  "Performance / lead-gen agencies running Meta ads for local businesses",
  "WhatsApp marketing shops that need more than a broadcast tool",
  "Digital agencies packaging an AI inbox as a retainer add-on",
  "White-label operators who want their name on the dashboard",
  "Franchise or multi-location groups acting as an internal agency",
] as const;

export const AUDIENCE_CLIENTS = [
  "Clinics, dentists, pharmacies, gyms, salons, spas",
  "Restaurants, bakeries, catering, grocery, dairy, meat, water supply",
  "Retail: clothing, shoes, electronics, hardware, florists",
  "Services: real estate, legal, insurance, tuition, travel, home services, auto workshops",
  "Any business whose ads say “message us on WhatsApp / Instagram / Facebook”",
] as const;

export const AUDIENCE_ROLES = [
  {
    title: "Super admin",
    body: "AccellionX. Creates agencies, suspends accounts, and collects Stripe from agencies only.",
  },
  {
    title: "Agency admin",
    body: "You. Invite client businesses, pick a plan, watch pooled usage, white-label if entitled.",
  },
  {
    title: "Business owner",
    body: "The restaurant / clinic / shop. Connects their Meta channels, edits the bot, works the inbox. Never billed.",
  },
] as const;

/* ——— Interactive demo scenarios ——— */

export type DemoScenarioId = "dental" | "restaurant" | "real-estate";

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
    source: "WhatsApp Ad — Dental Implants",
    incoming: "How much does one implant cost?",
    qualification: [
      "Treatment type",
      "City",
      "Timeline",
      "Consultation availability",
    ],
    answers: ["Single implant", "Karachi", "This month", "Weekday afternoons"],
    outcome: "Demo slot offered",
    repliiOpener:
      "Happy to help with implant pricing. A few quick questions so we can give you an accurate next step.",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    source: "WhatsApp Ad — Weekend Specials",
    incoming: "Do you deliver biryani tonight?",
    qualification: ["Order type", "Area", "Items", "Time"],
    answers: ["Delivery", "DHA Phase 5", "Chicken biryani ×2", "Tonight 8pm"],
    outcome: "Order captured in cart",
    repliiOpener:
      "Yes — we deliver tonight. I can take the order here. What would you like, and where should we send it?",
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
    answers: ["PKR 2.5–3.5 cr", "Downtown core", "Next 60 days", "Pre-approved"],
    outcome: "Qualified lead sent to agent",
    repliiOpener:
      "Yes — that two-bedroom is still listed. Let me confirm fit so I can connect you with the right agent.",
  },
];

/* ——— Features (bento) ——— */

export const MEDIUM_FEATURES = [
  {
    title: "Knowledge base + grounded answers",
    body: "Keyword then AI match against the client’s FAQs and facts. Replii stays on their information — not generic chat.",
  },
  {
    title: "Demo slots and bookings calendar",
    body: "Qualify, then offer times. Confirmed slots land on the bookings calendar instead of a back-and-forth thread.",
  },
  {
    title: "Order cart and Google Sheets",
    body: "Catalog flows with an interactive cart for food and retail. Optional Google Sheet upsert for ops teams that still live in Sheets.",
  },
] as const;

export const SMALL_FEATURES = [
  {
    title: "40+ niche templates",
    body: "Greeting, questions, FAQs, and menus for clinics, restaurants, real estate, retail, and services — every line editable.",
  },
  {
    title: "English, Urdu, Roman Urdu",
    body: "Starter copy in all three. Written for Pakistan / Gulf-style local commerce and easy to edit for other markets.",
  },
  {
    title: "White-label dashboard",
    body: "Replace the Replii wordmark with the agency name. Growth add-on or included on Unlimited.",
  },
  {
    title: "Client analytics",
    body: "Leads today and this month, conversations, and usage you can put in monthly retainer reports.",
  },
  {
    title: "Channel badges",
    body: "Tag every contact WhatsApp, Instagram, or Messenger so the team always knows where the chat started.",
  },
  {
    title: "Embedded Signup",
    body: "Owners connect their own WhatsApp Business number from the dashboard — no token-copying, no shared agency number.",
  },
  {
    title: "Invite a client in one step",
    body: "Name, login, WhatsApp-ready draft. They connect Meta themselves. You never mix inboxes.",
  },
  {
    title: "Isolated workspaces",
    body: "Hard tenancy: agencies never see each other’s chats or customers. Owners cannot open another business’s config.",
  },
] as const;

export const DEMO_INBOX_WORK = [
  "Answered the initial inquiry",
  "Shared approved information",
  "Asked qualification questions",
  "Captured lead or order details",
  "Identified urgency",
  "Offered the next step",
  "Created lead summary",
  "Routed to the live inbox",
] as const;

export const WORKLOAD_COMPARISON_ROWS = [
  {
    responsibility: "Monitor incoming messages",
    manual: "Sit in each client’s WhatsApp, Instagram, and Facebook apps",
    replii: "One live inbox across clients and channels",
    human: "No",
  },
  {
    responsibility: "Answer common questions",
    manual: "Type the same replies on every retainer",
    replii: "Responds from the client’s knowledge base",
    human: "Only for exceptions",
  },
  {
    responsibility: "Qualify, book, or take the order",
    manual: "Ask questions and build the cart by hand",
    replii: "Runs the template flow — demo slots or interactive cart",
    human: "No",
  },
  {
    responsibility: "Identify serious leads",
    manual: "Read every thread before the morning standup",
    replii: "Pipeline: in progress, booked, needs you",
    human: "Reviews qualified summary",
  },
  {
    responsibility: "Handle negotiation",
    manual: "Required",
    replii: "Pauses for human takeover and mute",
    human: "Yes",
  },
  {
    responsibility: "Close the sale",
    manual: "Required for consultative sales",
    replii: "Supports booking, orders, and handoff",
    human: "Yes",
  },
] as const;

export const ORDER_STEPS = [
  "Choose Launch, Growth, or Agency Unlimited and complete Stripe Checkout.",
  "AccellionX creates an isolated agency workspace from the name and admin username you provided.",
  "Log in at app.replii.accellionx.com with the credentials we send you.",
  "Invite your first client. They connect WhatsApp (and Instagram / Facebook) on their own brand.",
  "Pick a template, publish the greeting, test a conversation, then point Meta ads at the client’s channels.",
] as const;

export const ORDER_SCOPE = [
  "Billed entity: your agency, not your clients",
  "Each client uses their own WhatsApp, Instagram, and Facebook Page",
  "Cancel or change plan any time in the Stripe portal",
  "White-label: Growth + $79/mo, or included on Unlimited",
] as const;

/* ——— Industries / niche templates ——— */

export type IndustryUseCase = {
  name: string;
  question: string;
  qualifies: string;
  action: string;
  staffUsuallyAnswer: string;
  repliiHandles: string;
};

export const NICHE_TEMPLATE_CATEGORIES = [
  {
    category: "Health & wellness",
    packs:
      "Clinic / doctor, dental, pharmacy, salon booking, spa, gym, pet care",
  },
  {
    category: "Food & grocery",
    packs:
      "Restaurant, reservations, bakery, catering, grocery, fruits & veg, meat, dairy, water supplier",
  },
  {
    category: "Retail",
    packs:
      "Clothing, boutique, shoes, electronics, mobile accessories, hardware, florist, general store",
  },
  {
    category: "Local services",
    packs:
      "Home services, laundry, auto workshop, mobile repair, interior, photography, wedding",
  },
  {
    category: "Professional",
    packs:
      "Real estate, legal, insurance/finance, education/tuition, travel, digital agency, POS lead",
  },
] as const;

export const industryUseCases: IndustryUseCase[] = [
  {
    name: "Dental and medical clinics",
    question: "How much are implants?",
    qualifies: "Treatment, city, timeline and consultation availability",
    action: "Offers a demo slot",
    staffUsuallyAnswer:
      "Pricing ranges, treatment options, location, and whether a consult is needed",
    repliiHandles:
      "First reply, service and timeline questions, and consult handoff summary",
  },
  {
    name: "Restaurants and food",
    question: "Do you deliver biryani tonight?",
    qualifies: "Order type, area, items and time",
    action: "Builds the order cart",
    staffUsuallyAnswer:
      "Menu, delivery area, timings, and order details",
    repliiHandles:
      "Greeting, catalog cart, and an order the kitchen can fulfil",
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
    name: "Beauty, salon and spa",
    question: "How much is a hydrafacial?",
    qualifies: "Service, preferred date, provider preference and first-time status",
    action: "Books appointment",
    staffUsuallyAnswer:
      "Service pricing, duration, provider availability, and first-visit notes",
    repliiHandles:
      "Price and service FAQ, date preference, and appointment request summary",
  },
  {
    name: "Education and tuition",
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
    name: "Auto workshops",
    question: "Can you look at a brake noise today?",
    qualifies: "Service type, vehicle, urgency and location",
    action: "Requests a bay slot",
    staffUsuallyAnswer:
      "Service type, wait times, parts questions, and drop-off windows",
    repliiHandles:
      "Urgent first reply, vehicle and urgency capture, and booking handoff",
  },
  {
    name: "Home services",
    question: "I have a leaking pipe. Can someone come today?",
    qualifies: "Service type, area, urgency and property type",
    action: "Requests urgent callback",
    staffUsuallyAnswer:
      "Service type, service area, urgency, and same-day availability",
    repliiHandles:
      "Urgent first reply, area and urgency capture, and callback routing",
  },
  {
    name: "Retail",
    question: "Do you have this in size 42, and can you deliver today?",
    qualifies: "Product, size or variant, delivery window and order intent",
    action: "Captures order details in chat",
    staffUsuallyAnswer:
      "Stock, size or variant options, and delivery readiness",
    repliiHandles:
      "Catalog FAQ, product details, and order-intent summary",
  },
];

/* ——— Pricing ——— */

export type PricingPlanId = "launch" | "growth" | "unlimited";

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  bestFor: string;
  monthly: number;
  conversations: string;
  highlighted?: boolean;
  cta: string;
  ctaHref: string;
  features: string[];
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "launch",
    name: "Launch",
    bestFor: "For agencies proving the offer on a handful of retainers.",
    monthly: 97,
    conversations: "2,000 / mo",
    cta: CTA.launch.label,
    ctaHref: CTA.launch.href,
    features: [
      "Up to 3 client businesses",
      "2,000 AI conversations (pooled)",
      "Standard AI model",
      "WhatsApp + Instagram + Facebook",
      "Live inbox + human takeover",
      "40+ niche templates",
      "Client analytics dashboard",
      "Email support",
      "White-label — not included",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    bestFor: "For agencies with a full book of Meta-ad clients.",
    monthly: 297,
    conversations: "8,000 / mo",
    highlighted: true,
    cta: CTA.growth.label,
    ctaHref: CTA.growth.href,
    features: [
      "Up to 10 client businesses",
      "8,000 AI conversations (pooled)",
      "Standard AI, Advanced on 3 clients",
      "WhatsApp + Instagram + Facebook",
      "Live inbox + human takeover",
      "40+ niche templates",
      "Client analytics dashboard",
      "Email support",
      "White-label + branded reports +$79/mo",
    ],
  },
  {
    id: "unlimited",
    name: "Agency Unlimited",
    bestFor: "For shops that productize Replii as their own platform.",
    monthly: 497,
    conversations: "20,000 / mo",
    cta: CTA.unlimited.label,
    ctaHref: CTA.unlimited.href,
    features: [
      "Unlimited client businesses",
      "20,000 AI conversations (pooled)",
      "Advanced AI on every client",
      "WhatsApp + Instagram + Facebook",
      "Live inbox + human takeover",
      "40+ niche templates",
      "Client analytics dashboard",
      "White-label + branded reports included",
      "Priority support",
    ],
  },
];

export const COMPARISON_ROWS: {
  feature: string;
  launch: string | boolean;
  growth: string | boolean;
  unlimited: string | boolean;
}[] = [
  { feature: "Monthly price", launch: "$97", growth: "$297", unlimited: "$497" },
  { feature: "Client businesses", launch: "3", growth: "10", unlimited: "Unlimited" },
  {
    feature: "AI conversations (pooled / month)",
    launch: "2,000",
    growth: "8,000",
    unlimited: "20,000",
  },
  {
    feature: "AI model",
    launch: "Standard",
    growth: "Standard + Advanced × 3",
    unlimited: "Advanced all",
  },
  {
    feature: "WhatsApp + Instagram + Facebook",
    launch: true,
    growth: true,
    unlimited: true,
  },
  {
    feature: "Live inbox + human takeover",
    launch: true,
    growth: true,
    unlimited: true,
  },
  { feature: "Niche templates", launch: true, growth: true, unlimited: true },
  { feature: "Client analytics", launch: true, growth: true, unlimited: true },
  {
    feature: "White-label + branded reports",
    launch: false,
    growth: "+$79/mo",
    unlimited: "Included",
  },
  { feature: "Support", launch: "Email", growth: "Email", unlimited: "Priority" },
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
        question: "Do we need one WhatsApp number per client?",
        answer:
          "Yes. Each client uses their own WhatsApp Business, Instagram, and Facebook Page. Replii never mixes inboxes and never uses a shared agency number.",
      },
      {
        question: "Which channels does Replii support?",
        answer:
          "WhatsApp Business (primary production channel, own WABA), Instagram Direct, and Facebook Messenger. The same lead flow, knowledge base, inbox, and human takeover run across all three.",
      },
      {
        question: "Can a shop subscribe directly?",
        answer:
          "No. Replii is sold to agencies. A single-location business should ask their media agency to add them as a client, or become an agency on Launch.",
      },
      {
        question: "What is an “AI conversation”?",
        answer:
          "A chat the bot handled that month, pooled across all of your clients. Human-only threads after takeover still appear in the inbox; the cap is on AI work.",
      },
      {
        question: "Can my team take over at any time?",
        answer:
          "Yes. If someone taps “talk to a person,” the bot pauses. The team replies from the live inbox and can mute until they are done.",
      },
      {
        question: "Can it book appointments or take orders?",
        answer:
          "Yes. Qualification flows can offer demo slots onto a bookings calendar. Food and retail templates include an interactive catalog cart. Optional Google Sheets sync is available for ops teams.",
      },
      {
        question: "What languages?",
        answer:
          "English, Urdu, and Roman Urdu out of the box. Templates are written for Pakistan / Gulf-style local commerce and edit cleanly for other markets.",
      },
      {
        question: "What happens when the AI does not know the answer?",
        answer:
          "Answers are grounded in the client’s knowledge base. If the model is unavailable, chat falls back gracefully — it never dies silently. Keyword FAQs still work if you hit the monthly conversation cap.",
      },
    ],
  },
  {
    id: "setup-pricing",
    title: "Plans, billing, and setup",
    items: [
      {
        question: "Who does Stripe charge?",
        answer:
          "The agency only. Advertisers and shop owners are never billed by Replii. They get a workspace and connect their own Meta channels.",
      },
      {
        question: "Can we put our brand on it?",
        answer:
          "Growth add-on ($79/mo) or Agency Unlimited (included) replaces the Replii wordmark in the dashboard with the agency name, plus branded reports.",
      },
      {
        question: "Is Meta ads spend included?",
        answer:
          "No. Media buy stays on the client’s or agency’s Meta account. Replii is the conversation layer after the click.",
      },
      {
        question: "What happens if we hit a cap?",
        answer:
          "Hitting the client cap blocks new invites until you upgrade. Hitting the conversation cap pauses AI replies for the rest of the month — keyword FAQs still work. Upgrade or wait for the next period.",
      },
      {
        question: "How do we order?",
        answer:
          "Choose a plan on this site and complete Stripe Checkout. Include the agency legal name and the admin username you want. After payment, AccellionX creates an isolated workspace and emails the login. Then invite clients and connect their channels from app.replii.accellionx.com.",
      },
      {
        question: "How long does setup take for a client?",
        answer:
          "The owner finishes a short guided setup, connects WhatsApp via Embedded Signup (and Instagram / Facebook Page), picks a niche template, and publishes. Ads and organic DMs then hit the same operator.",
      },
      {
        question: "Do I need to replace my CRM?",
        answer:
          "No. Leads, urgency, notes, tags, and a bookings calendar live in Replii. Optional Google Sheet upsert covers ops teams that still work in Sheets.",
      },
    ],
  },
];
