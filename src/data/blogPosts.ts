// 22 SEO blog posts. Each is plain markdown-ish HTML rendered via dangerouslySetInnerHTML
// (content is fully controlled here, no user input).

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMin: number;
  category: string;
  tags: string[];
  related: string[]; // tool slugs
  body: string; // HTML
}

const wrap = (intro: string, sections: { h: string; p: string }[], outro: string) => `
<p>${intro}</p>
${sections.map((s) => `<h2>${s.h}</h2><p>${s.p}</p>`).join("\n")}
<h2>Final word</h2><p>${outro}</p>
`;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-emi", title: "How to Calculate EMI on Any Loan – Simple Formula with Examples",
    description: "Learn the EMI formula used by Indian banks, with worked examples for home loans, personal loans and car loans.",
    date: "2025-09-12", readMin: 7, category: "Finance", tags: ["EMI", "Loan", "Banking"],
    related: ["emi-calculator", "home-loan-calculator", "car-loan-calculator", "personal-loan-emi-calculator"],
    body: wrap(
      "Equated Monthly Installment (EMI) is the fixed monthly payment you make towards a loan — covering both principal and interest. Whether you are buying a home, a car or funding a wedding, knowing your EMI in advance is the single most important step in responsible borrowing.",
      [
        { h: "The standard EMI formula", p: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is principal, r is monthly rate (annual rate ÷ 12 ÷ 100) and n is total number of monthly installments. Indian banks use this reducing-balance method for almost all retail loans." },
        { h: "Worked example: ₹25 lakh home loan", p: "At 9% per annum for 20 years (240 months): r = 0.0075, EMI ≈ ₹22,493. Total payable ≈ ₹53.98 lakh — meaning interest alone is ₹28.98 lakh. A 1% rate drop saves you over ₹3 lakh." },
        { h: "Why tenure matters more than you think", p: "Doubling tenure roughly doubles the interest paid. A 20-year vs. 30-year home loan at the same rate can mean 60% more interest. Always model both scenarios using an EMI calculator before signing." },
        { h: "Prepayment power", p: "Even one extra EMI per year on a 20-year home loan can knock 4-5 years off your tenure. RBI mandates zero prepayment penalty on floating-rate retail loans — use it." },
      ],
      "Bookmark our EMI Calculator and try at least three (rate × tenure) combinations before any loan application. The 5 minutes you spend can save lakhs over the loan lifetime.",
    ),
  },
  {
    slug: "sip-vs-lumpsum", title: "SIP vs Lumpsum: Which Mutual Fund Strategy Wins in India?",
    description: "Detailed comparison of SIP and lumpsum investing for Indian mutual fund investors with real return scenarios.",
    date: "2025-09-18", readMin: 8, category: "Investment", tags: ["SIP", "Mutual Funds", "Investing"],
    related: ["sip-calculator", "lumpsum-calculator", "mutual-fund-return-calculator", "cagr-calculator"],
    body: wrap(
      "The SIP vs Lumpsum debate is the most common question Indian investors ask. The honest answer: it depends on the market cycle, your cash flow and your psychology — not on theory alone.",
      [
        { h: "SIP — rupee cost averaging", p: "Investing a fixed amount monthly buys more units when markets fall and fewer when they rise. Over 10+ year horizons, SIPs in equity funds have historically delivered 12-15% CAGR while smoothing out volatility." },
        { h: "Lumpsum — when you have a windfall", p: "If you have a bonus, inheritance or sale proceeds, putting it to work immediately is mathematically optimal in a long-term rising market. ₹10 lakh invested at 12% becomes ₹31 lakh in 10 years." },
        { h: "The hybrid play", p: "Many advisors suggest STP (Systematic Transfer Plan): park the lumpsum in a liquid fund and transfer to equity over 6-12 months. You get most of the lumpsum's edge with reduced timing risk." },
        { h: "Tax & exit considerations", p: "Equity SIPs each have their own 1-year LTCG clock. A lumpsum has one clock. If you might need partial liquidity, SIPs give more flexible exit options." },
      ],
      "Use our SIP and Lumpsum calculators side by side. Plug in your actual amount and rate to see which path fits your goal — there is no universal winner.",
    ),
  },
  {
    slug: "bmi-explained-india", title: "BMI for Indians: Why the Standard Chart May Mislead You",
    description: "Indian-specific BMI cut-offs, body composition, and what to track instead of just BMI.",
    date: "2025-09-22", readMin: 6, category: "Health", tags: ["BMI", "Health", "Fitness"],
    related: ["bmi-calculator", "bmi-calculator-by-age", "body-fat-calculator", "ideal-weight"],
    body: wrap(
      "Body Mass Index is the world's most-used health screen — but the standard WHO cut-offs (25 = overweight, 30 = obese) were derived largely from European populations. Indians can carry significantly more body fat at lower BMIs.",
      [
        { h: "The Indian BMI cut-offs", p: "ICMR and the Indian Obesity guidelines recommend overweight ≥ 23 and obesity ≥ 25 for Indians. A BMI of 24 — 'normal' globally — already counts as overweight here." },
        { h: "Why body composition matters more", p: "Two people at BMI 24 can have wildly different body-fat percentages. Track waist circumference (men < 90 cm, women < 80 cm) and body fat % alongside BMI." },
        { h: "BMI by age and sex", p: "Older adults (65+) often live longer at slightly higher BMIs (23-30). For children and teens, use percentile charts, not adult cut-offs." },
        { h: "Beyond the number", p: "Sleep, resting heart rate, blood pressure and HbA1c are stronger health predictors than BMI alone. Use BMI as one input — never the only one." },
      ],
      "Use our BMI Calculator with the India-specific reading in mind, and pair it with body fat and ideal weight tools for a fuller picture.",
    ),
  },
  {
    slug: "tax-saving-india-2025", title: "Top 10 Tax-Saving Investments for FY 2024-25 (India)",
    description: "Best 80C, 80D and beyond — including PPF, ELSS, NPS, and the new vs old regime comparison.",
    date: "2025-09-28", readMin: 9, category: "Tax", tags: ["Tax", "80C", "Savings"],
    related: ["income-tax-calculator", "ppf-calculator", "nps-calculator", "fd-calculator"],
    body: wrap(
      "The new tax regime is now the default for most salaried Indians. But the old regime + smart deductions can still win — especially if you have a home loan, kids' tuition or large insurance premiums. Here is the current shortlist.",
      [
        { h: "Section 80C — the ₹1.5 lakh staple", p: "PPF, ELSS, EPF, life insurance premium, kids' tuition fees, principal on home loan, NSC, tax-saver FDs and Sukanya Samriddhi all share this single ceiling." },
        { h: "Section 80CCD(1B) — extra ₹50,000 via NPS", p: "Over and above 80C. NPS Tier-I contributions up to ₹50,000 a year give a unique additional deduction — and your money goes into market-linked instruments." },
        { h: "Section 80D — health insurance", p: "Up to ₹25,000 for self/family + ₹50,000 for senior parents. Includes preventive health check-ups up to ₹5,000." },
        { h: "New vs Old regime", p: "Without 80C/80D/HRA, the new regime usually wins for incomes ₹7-15 L. With heavy deductions and home-loan interest, the old regime often still wins beyond ₹15 L. Run both via an income-tax calculator." },
      ],
      "Run your numbers in our Income Tax Calculator before March 31. The right regime + the right ₹1.5L deployment can save ₹46,800 to ₹1,50,000 a year.",
    ),
  },
  {
    slug: "sip-1-crore-target", title: "How Much SIP Do You Need to Make ₹1 Crore?",
    description: "Monthly SIP amount required at different return rates and tenures to reach ₹1 crore in India.",
    date: "2025-10-02", readMin: 6, category: "Investment", tags: ["SIP", "Goal Planning"],
    related: ["sip-calculator", "savings-goal-calculator", "lumpsum-calculator", "retirement-calculator-india"],
    body: wrap(
      "₹1 crore feels enormous — but it is more achievable than most Indians realise. The two levers are time and rate of return. Start early, stay invested.",
      [
        { h: "At 12% expected equity returns", p: "20 years: ~₹10,000/month. 15 years: ~₹20,000/month. 10 years: ~₹43,000/month. 5 years: ~₹1,22,000/month. The maths punishes lateness ruthlessly." },
        { h: "What if returns are lower (10%)?", p: "20 years: ~₹13,200/month. 15 years: ~₹24,100/month. The cost of being conservative on assumptions is roughly 30% higher monthly contribution." },
        { h: "Step-up SIPs", p: "Increasing your SIP by 10% every year reduces the starting amount needed by ~30%. Most platforms now support automated step-up." },
        { h: "Don't forget tax", p: "₹1 crore in equity MF will face ~10% LTCG (above ₹1.25L gain). Plan for ~₹1.1 crore corpus if your target is ₹1 cr in hand." },
      ],
      "Plug your goal year and amount into our SIP calculator and adjust monthly. The compounding curve gets steep in the last 5 years — that is why early starters win.",
    ),
  },
  {
    slug: "ppf-vs-elss", title: "PPF vs ELSS: Which 80C Investment Is Better?",
    description: "PPF safety vs ELSS returns — a side-by-side comparison for Indian investors choosing under Section 80C.",
    date: "2025-10-08", readMin: 7, category: "Investment", tags: ["PPF", "ELSS", "Tax"],
    related: ["ppf-calculator", "sip-calculator", "income-tax-calculator", "fd-calculator"],
    body: wrap(
      "Both PPF and ELSS qualify for the ₹1.5 lakh 80C deduction (in the old regime). They sit at opposite ends of the risk-return spectrum, and the right choice depends on your age, horizon and existing portfolio.",
      [
        { h: "PPF — sovereign safety", p: "Government-backed, ~7.1% tax-free return, 15-year lock-in (extendable in 5-year blocks). Ideal for a conservative portion of your portfolio or for goals 10+ years out." },
        { h: "ELSS — equity tax-saver", p: "Diversified equity mutual funds with the shortest 80C lock-in (3 years). Long-term returns historically 12-14% but with full equity volatility. Gains > ₹1.25L taxed at 10%." },
        { h: "The hybrid blueprint", p: "Most advisors suggest 60-70% in ELSS and 30-40% in PPF for investors under 40. Older investors flip the ratio." },
        { h: "Liquidity reality", p: "ELSS is liquid after 3 years. PPF is partial-withdrawable from year 7 only. If you might need the money sooner, ELSS is the safer choice." },
      ],
      "Use our PPF Calculator and SIP Calculator to project both. Diversify — neither is universally better.",
    ),
  },
  {
    slug: "personal-loan-vs-credit-card", title: "Personal Loan vs Credit Card: Which Costs You Less?",
    description: "Effective interest rate, fees and EMI comparison between personal loans and credit-card EMIs in India.",
    date: "2025-10-12", readMin: 6, category: "Finance", tags: ["Loans", "Credit Card"],
    related: ["personal-loan-emi-calculator", "emi-calculator", "discount-calculator"],
    body: wrap(
      "When facing an unexpected ₹1-5 lakh expense, most Indians compare a personal loan with their credit card's EMI offer. The card's 'low' EMI rate is often misleading — once processing fees and the GST on interest are included, costs differ widely.",
      [
        { h: "Headline rates", p: "Personal loans: 10-24% p.a. reducing balance. Credit-card EMIs: 12-30% p.a. reducing balance, plus 1-3% processing fee. Both add 18% GST on interest charged." },
        { h: "Effective annualised cost", p: "A 15% credit-card EMI over 12 months with 2% processing ≈ 19% effective. A 14% personal loan with 1.5% processing ≈ 16% effective. Always compute your APR, not the brochure rate." },
        { h: "Tenure flexibility", p: "Personal loans: typically 12-60 months. Card EMIs: 3-24 months. Longer tenure = lower EMI but more total interest." },
        { h: "When to use a card EMI anyway", p: "If you already have an active reward or cashback that offsets the cost, or you need < 6 months and need fast disbursal, the card can win." },
      ],
      "Run both options in our EMI Calculator with all fees added to principal — the true winner is rarely the one with the lower advertised rate.",
    ),
  },
  {
    slug: "fd-vs-rd", title: "FD vs RD: Which Bank Deposit Should You Choose?",
    description: "Understand the differences between Fixed Deposit and Recurring Deposit, and how to combine them.",
    date: "2025-10-18", readMin: 5, category: "Investment", tags: ["FD", "RD", "Banking"],
    related: ["fd-calculator", "rd-calculator", "sip-calculator", "ppf-calculator"],
    body: wrap(
      "FDs and RDs are the two pillars of risk-free Indian saving. They look similar but suit very different cash-flow situations.",
      [
        { h: "Fixed Deposit", p: "Lump-sum deposit for a fixed tenure (7 days to 10 years). Quarterly compounding is standard. Best when you have a windfall or tax refund." },
        { h: "Recurring Deposit", p: "Fixed monthly contribution for 6 months to 10 years. Best for salaried earners building an emergency fund or short-term goal pot." },
        { h: "The maths", p: "₹12 lakh as one FD at 7% for 5 years matures to ~₹16.99 L. ₹20,000/month RD over 5 years at 7% matures to ~₹14.36 L on ₹12 L deposited — slightly lower because each instalment compounds for less time." },
        { h: "Tax treatment", p: "Interest fully taxable at slab rate for both. TDS @ 10% if interest > ₹40,000 (₹50,000 for seniors)." },
      ],
      "Use our FD and RD calculators to model real interest, then ladder multiple FDs of different tenures for liquidity + return optimisation.",
    ),
  },
  {
    slug: "gst-rates-india", title: "GST Rates in India: A Quick Reference for Buyers and Sellers",
    description: "Current GST slabs, what falls where, and how to compute inclusive vs exclusive GST.",
    date: "2025-10-22", readMin: 6, category: "Tax", tags: ["GST", "Business"],
    related: ["gst-calculator", "discount-calculator", "income-tax-calculator", "profit-loss-calculator"],
    body: wrap(
      "GST replaced 17 indirect taxes in 2017. Today's structure has four main slabs (5%, 12%, 18%, 28%) plus 0% on essentials. Knowing which slab applies to your invoice avoids costly mistakes.",
      [
        { h: "The four main slabs", p: "5% — packaged food, footwear under ₹1,000, train tickets. 12% — processed food, business-class air. 18% — most services and electronics. 28% — luxury items, cars, tobacco (often + cess)." },
        { h: "Inclusive vs exclusive", p: "If MRP is ₹1,180 inclusive of 18% GST, base = ₹1,180 / 1.18 = ₹1,000 and GST = ₹180. If price is ₹1,000 exclusive, total = ₹1,180." },
        { h: "Input Tax Credit (ITC)", p: "Registered businesses can claim ITC on purchases — effectively only paying GST on the value they add. Always insist on a proper GST invoice." },
        { h: "Composition scheme", p: "Small businesses (turnover up to ₹1.5 cr) can pay a flat 1-6% on turnover instead of regular GST, but cannot claim ITC." },
      ],
      "Use our GST Calculator to switch between inclusive and exclusive amounts in one click. Always verify the slab on the official CBIC tariff before quoting.",
    ),
  },
  {
    slug: "calorie-deficit-india", title: "How to Calculate a Calorie Deficit That Actually Works",
    description: "Step-by-step way to compute your maintenance calories and a sustainable deficit for fat loss.",
    date: "2025-10-26", readMin: 7, category: "Health", tags: ["Calories", "Weight Loss"],
    related: ["calorie-calculator", "bmr-calculator", "macro-calculator", "bmi-calculator"],
    body: wrap(
      "Sustainable fat loss is simpler than diet ads suggest: eat slightly less than you burn. The two numbers you need are your BMR and your activity multiplier.",
      [
        { h: "Step 1: Find your BMR", p: "Use the Mifflin-St Jeor formula: 10×weight(kg) + 6.25×height(cm) − 5×age + 5 (men) or − 161 (women). A 30-year-old, 75 kg, 175 cm man = ~1,693 kcal." },
        { h: "Step 2: Multiply for activity", p: "Sedentary ×1.2, light ×1.375, moderate ×1.55, very active ×1.725. The example above with desk job + 3 walks/week ≈ 2,329 kcal/day." },
        { h: "Step 3: Subtract for deficit", p: "300-500 kcal/day deficit gives 0.3-0.5 kg/week loss — sustainable. >700 kcal deficit risks muscle loss and hormonal issues." },
        { h: "Macros matter", p: "Within your calorie budget, target 1.6-2 g protein per kg bodyweight to preserve muscle. Carbs and fats can be tuned to preference." },
      ],
      "Use our Calorie Calculator and Macro Calculator together. Re-measure every 4 weeks — your BMR drops as you lose weight, so the numbers need updating.",
    ),
  },
  {
    slug: "compound-interest-power", title: "The Magic of Compound Interest: How ₹1 Becomes ₹100",
    description: "Why Einstein called compound interest the 8th wonder, with India-specific examples.",
    date: "2025-10-30", readMin: 6, category: "Investment", tags: ["Compounding", "Investing"],
    related: ["compound-interest", "sip-calculator", "lumpsum-calculator", "cagr-calculator"],
    body: wrap(
      "Albert Einstein reportedly called compound interest the eighth wonder of the world — those who understand it earn it, those who don't pay it. Indian investors who grasp this early can build generational wealth.",
      [
        { h: "The doubling rule", p: "Rule of 72: divide 72 by the annual return to find years to double. 12% equity returns double money every 6 years; 7% PPF every 10.3 years." },
        { h: "₹1 to ₹100 example", p: "At 12% return, ₹1 becomes ₹100 in roughly 41 years. At 8%, it takes ~60 years. Time, not return, does most of the heavy lifting." },
        { h: "The cost of starting late", p: "Starting at 25 vs 35 with the same monthly SIP can produce 2.5× more wealth at 60. The first decade is the most powerful — and the easiest to skip." },
        { h: "Compounding works against you too", p: "Credit-card debt at 36% APR doubles your owed amount in 2 years. The same maths cuts both ways." },
      ],
      "Use our Compound Interest Calculator to model your own scenarios. The earlier you start, the less you need to contribute monthly.",
    ),
  },
  {
    slug: "home-loan-tips-india", title: "10 Home Loan Tips Every Indian Should Know Before Signing",
    description: "From negotiation to part-payment strategies — practical advice for first-time home buyers in India.",
    date: "2025-11-03", readMin: 8, category: "Finance", tags: ["Home Loan", "Real Estate"],
    related: ["home-loan-calculator", "emi-calculator", "income-tax-calculator", "ppf-calculator"],
    body: wrap(
      "A home loan is the single largest financial commitment most Indians ever make. Small decisions — 0.25% rate, ₹5,000/month extra payment — compound into lakhs over 20 years.",
      [
        { h: "Always negotiate the rate", p: "Banks rarely offer their best rate first. Show competing sanction letters from 2 other banks and ask for a 0.10-0.25% match. Over 20 years on ₹50 L, that is ₹2-5 lakh saved." },
        { h: "Watch the processing fee", p: "Standard is 0.5-1% of loan amount + GST. Negotiable, especially for high-value loans or existing customers." },
        { h: "Floating > fixed (in most cycles)", p: "Floating rates have been cheaper than fixed rates over the last 15 years on average. Fixed locks you in if rates rise but penalises you in falling-rate cycles." },
        { h: "Use Section 80C + 24(b)", p: "Claim ₹1.5L on principal (80C) and ₹2L on interest (24b) every year. For joint loans, both co-borrowers can claim independently." },
        { h: "Part-payment is your superpower", p: "RBI bans prepayment penalties on floating-rate retail loans. Even one extra EMI a year cuts 4-5 years off a 20-year tenure." },
      ],
      "Run every scenario through our Home Loan EMI Calculator before signing. The bank's recommendation is rarely your best deal.",
    ),
  },
  {
    slug: "retirement-corpus-india", title: "How Much Retirement Corpus Do You Really Need in India?",
    description: "Inflation-adjusted retirement target for Indian families with worked examples.",
    date: "2025-11-08", readMin: 8, category: "Investment", tags: ["Retirement", "NPS", "Planning"],
    related: ["retirement-calculator-india", "sip-calculator", "ppf-calculator", "nps-calculator"],
    body: wrap(
      "Most retirement calculators give you a number that feels terrifying. But broken down into monthly SIPs from your 30s, the goal is very achievable.",
      [
        { h: "The 25× rule", p: "Add up your annual expenses, multiply by 25. That is your minimum corpus assuming a 4% safe withdrawal rate. ₹50,000/month spend = ₹1.5 cr today." },
        { h: "Adjust for inflation", p: "₹50,000 today at 6% inflation becomes ₹1.6 lakh in 20 years. Retirement at 60 with current expenses of ₹50K/month means ₹4-5 cr corpus needed." },
        { h: "What monthly SIP gets you there?", p: "Starting at 30, ₹15,000/month at 12% returns ≈ ₹4.5 cr at 60. Starting at 40, you would need ~₹50,000/month — a 3× jump for a 10-year delay." },
        { h: "NPS sweetens the deal", p: "Section 80CCD(1B) gives an extra ₹50,000 deduction. NPS auto-rebalances toward debt as you age — exactly what a retirement corpus needs." },
      ],
      "Use our Retirement Calculator (India) to plug your own expenses, age and inflation assumption. Adjust SIP every 2-3 years as your salary grows.",
    ),
  },
  {
    slug: "qr-code-uses", title: "10 Practical Uses of QR Codes for Indian Businesses",
    description: "Beyond UPI — creative, free QR-code uses for shops, services and creators.",
    date: "2025-11-12", readMin: 5, category: "Utility", tags: ["QR Code", "Business"],
    related: ["qr-code-generator", "url-encoder", "color-picker"],
    body: wrap(
      "QR codes exploded in India with UPI but their utility goes far beyond payments. Free, printable, infinitely scannable — they should be a standard tool in every small business kit.",
      [
        { h: "1. UPI payments", p: "Every shop should have a printed UPI QR. Generate yours from upi://pay?pa=yourID&pn=YourName and laminate it." },
        { h: "2. Restaurant menus", p: "Print one QR per table linking to a Google Doc or PDF menu — zero printing for updates." },
        { h: "3. WiFi sharing", p: "WIFI:T:WPA;S:NetworkName;P:password;; QR lets guests join in 2 seconds without typing." },
        { h: "4. Visiting cards", p: "Add a QR to your contact vCard so people can save your number with one scan." },
        { h: "5. Event check-ins, product info, social-media follows, app downloads, location/Google Maps share, feedback forms, brochure links", p: "All these get vastly higher engagement than a typed URL — generate them in seconds with our QR Code Generator." },
      ],
      "Print QRs at high resolution (≥ 300 DPI) and test scan from 1m before mass-printing. Our generator outputs up to 480×480 px — plenty for posters.",
    ),
  },
  {
    slug: "password-strength", title: "How to Create a Password That Actually Resists Hackers",
    description: "What makes a strong password in 2026, and the safest way to manage them.",
    date: "2025-11-16", readMin: 6, category: "Utility", tags: ["Security", "Password"],
    related: ["password-generator", "base64-encoder", "json-formatter"],
    body: wrap(
      "Most Indian banking and OTP-fraud cases start with reused or weak passwords. A few simple rules can put you in the safest 5% of users.",
      [
        { h: "Length beats complexity", p: "A 16-character random password takes longer to brute-force than an 8-character one with all symbols. Always pick 16+ characters when allowed." },
        { h: "Never reuse", p: "If a single site is breached and your password is reused, every other account is compromised. Use a unique password per site." },
        { h: "Use a manager", p: "Bitwarden, 1Password and Apple/Google built-in managers are free and trusted. Memorise one strong master password; let the manager do the rest." },
        { h: "Turn on 2FA everywhere", p: "Even if your password leaks, the second factor (TOTP app or hardware key) blocks the attacker. Use an authenticator app, not SMS." },
      ],
      "Generate fresh, unique 16+ character passwords with our Password Generator and store them in a password manager. Never email or screenshot a password.",
    ),
  },
  {
    slug: "json-vs-xml", title: "JSON vs XML: Which Should Modern APIs Use?",
    description: "Pros, cons and real-world performance comparison of JSON and XML for APIs.",
    date: "2025-11-20", readMin: 7, category: "Developer", tags: ["JSON", "XML", "API"],
    related: ["json-formatter", "base64-encoder", "url-encoder"],
    body: wrap(
      "JSON has overtaken XML as the default API format, but XML is still common in legacy enterprise, government and SOAP systems. Knowing both — and when to choose which — is a 2026 essential for Indian developers.",
      [
        { h: "Verbosity", p: "JSON's syntax is roughly 30-40% smaller than equivalent XML for typical objects. Network payloads matter on mobile and slow connections." },
        { h: "Schema & validation", p: "XML has XSD, the most mature schema language. JSON Schema has caught up but is less ubiquitous in tooling." },
        { h: "Mixed content", p: "XML handles documents with mixed text + tags better. For pure data records, JSON wins on simplicity." },
        { h: "Tooling", p: "Every modern stack speaks JSON natively. XML still requires libraries and namespace handling." },
      ],
      "Use our JSON Formatter to validate and pretty-print your payloads instantly — locally, in the browser, with nothing sent to a server.",
    ),
  },
  {
    slug: "age-difference-relationships", title: "How to Calculate Age and Date Differences Accurately",
    description: "Common gotchas in age calculation, plus practical use cases (eligibility, anniversaries, projects).",
    date: "2025-11-24", readMin: 5, category: "Utility", tags: ["Date", "Age"],
    related: ["age-calculator", "date-difference", "days-between-dates", "working-days"],
    body: wrap(
      "Age and date math sounds trivial — but leap years, time zones and 'completed years' rules trip up even experienced developers. For passport/PAN forms, school admissions and government schemes, accuracy matters.",
      [
        { h: "Completed years vs running years", p: "Indian forms usually want 'completed years on date X'. A child turning 6 on July 5 is age 5 on July 1 and age 6 on July 5 — never round." },
        { h: "Leap-year edge case", p: "Born Feb 29? Most government systems treat your birthday as Feb 28 in non-leap years for legal purposes." },
        { h: "Working days vs calendar days", p: "Bank deposit credits, court hearings, government deadlines — almost always in working days, not calendar days." },
        { h: "Time-zone surprises", p: "If a deadline is 11:59 PM IST, ensure your local clock matches — laptops on auto-zone in border states can be off by 30 mins." },
      ],
      "Use our Age Calculator, Date Difference Calculator and Working Days Calculator together. Verify against the source authority for legal documents.",
    ),
  },
  {
    slug: "unit-conversion-cooking", title: "Unit Conversions Every Indian Cook Should Know",
    description: "Cups to grams, tablespoons to ml, oven Fahrenheit to Celsius — for global recipes.",
    date: "2025-11-28", readMin: 5, category: "Utility", tags: ["Cooking", "Units"],
    related: ["unit-converter-all-in-one", "weight-converter", "temperature-converter", "length-converter"],
    body: wrap(
      "Indian home cooks following YouTube channels from the US, UK or Middle East routinely face cups, ounces, sticks of butter and 350°F ovens. A quick mental mapping plus one bookmark saves dinner.",
      [
        { h: "Volume basics", p: "1 US cup = 240 ml. 1 UK cup = 250 ml. 1 tbsp = 15 ml. 1 tsp = 5 ml. Indian 'katori' is roughly 150 ml." },
        { h: "Mass for common ingredients", p: "1 cup flour ≈ 125 g. 1 cup sugar ≈ 200 g. 1 cup rice ≈ 185 g. 1 stick butter = 113 g." },
        { h: "Oven temperatures", p: "180°C = 350°F (most baking). 200°C = 400°F. 220°C = 425°F (pizza). Always preheat 10 min." },
        { h: "Weight to volume tip", p: "Weigh ingredients with a kitchen scale when possible — it is far more accurate than cup measures, especially for baking." },
      ],
      "Bookmark our Unit Converter and Temperature Converter for one-tap conversions while cooking — both work fully offline once loaded.",
    ),
  },
  {
    slug: "scientific-calculator-jee", title: "Scientific Calculator Skills Every JEE Aspirant Needs",
    description: "How to use a scientific calculator efficiently for JEE and similar entrance exams.",
    date: "2025-12-02", readMin: 6, category: "Education", tags: ["JEE", "Education", "Math"],
    related: ["scientific-calculator", "fraction-calculator", "lcm-hcf", "square-root"],
    body: wrap(
      "JEE Main allows on-screen calculators in some sections; NEET and other exams forbid them entirely. Either way, scientific calculator fluency saves precious seconds.",
      [
        { h: "Memory and ANS", p: "Use the M+ and ANS keys to chain multi-step problems. Saves writing intermediate values." },
        { h: "Trigonometry mode", p: "Always confirm DEG vs RAD before exam — wrong mode is the most common silent error." },
        { h: "Fractions over decimals", p: "Keep fractions until the last step to avoid rounding errors. Most scientific calculators have a fraction (a b/c) key." },
        { h: "Powers and roots shortcuts", p: "Practice ^ key for powers, √ for square root, x^(1/n) for nth roots. JEE problems often hide a clean answer behind ugly decimals." },
      ],
      "Use our online Scientific Calculator for practice runs at home — same key behaviour as the on-screen JEE tool.",
    ),
  },
  {
    slug: "what-is-cagr", title: "What Is CAGR? The Real Way to Compare Investment Returns",
    description: "Compound Annual Growth Rate explained simply, with Indian mutual fund examples.",
    date: "2025-12-06", readMin: 5, category: "Investment", tags: ["CAGR", "Returns"],
    related: ["cagr-calculator", "sip-calculator", "lumpsum-calculator", "compound-interest"],
    body: wrap(
      "CAGR (Compound Annual Growth Rate) is the single most useful number when comparing investments of different durations. Unlike absolute returns, it tells you the steady annualised rate at which your money grew.",
      [
        { h: "The formula", p: "CAGR = (End / Start)^(1/years) − 1. ₹1 lakh becoming ₹2 lakh in 6 years = (2)^(1/6) − 1 = 12.25% CAGR." },
        { h: "Why absolute returns mislead", p: "'My fund gave 100%' means nothing without the time taken. 100% in 6 years is great; 100% in 20 years is poor (3.5% CAGR)." },
        { h: "CAGR vs XIRR", p: "CAGR works for one-time (lumpsum) investments. For SIPs and irregular cashflows, use XIRR — most platforms show it on your statement." },
        { h: "Realistic Indian benchmarks", p: "Equity funds: 12-14% long-term CAGR. Hybrid: 9-11%. Debt: 6-8%. Anything 'guaranteed > 15%' is almost always a scam." },
      ],
      "Use our CAGR Calculator to convert any pair of (start value, end value, years) into a clean CAGR figure for fair comparison.",
    ),
  },
  {
    slug: "pregnancy-due-date-explained", title: "Pregnancy Due Date Calculator: How Doctors Estimate Your EDD",
    description: "Naegele's rule, ultrasound dating and what 'due date' really means.",
    date: "2025-12-10", readMin: 6, category: "Health", tags: ["Pregnancy", "Health"],
    related: ["pregnancy-due-date", "ovulation-calculator", "age-calculator"],
    body: wrap(
      "An Estimated Due Date (EDD) is exactly that — an estimate. Only ~5% of babies arrive on the exact date. Knowing how the EDD is calculated helps set realistic expectations.",
      [
        { h: "Naegele's rule", p: "EDD = first day of last menstrual period (LMP) + 280 days (40 weeks). Assumes a regular 28-day cycle with ovulation on day 14." },
        { h: "Ultrasound dating", p: "First-trimester scans (6-13 weeks) give the most accurate EDD — within ±5 days. After 20 weeks, growth varies and dating is less precise." },
        { h: "Cycle adjustment", p: "If your cycle is consistently longer (say 32 days), add a few days to the LMP-based EDD. Our calculator can be paired with the ovulation tool." },
        { h: "What 'term' means", p: "Full term is 39-40 weeks. Anything from 37 to 42 weeks is normal range. Pre-term <37 weeks; post-term >42 weeks usually requires intervention." },
      ],
      "Use our Pregnancy Due Date and Ovulation calculators for early planning, and always confirm with your obstetrician's ultrasound.",
    ),
  },
  {
    slug: "discount-stacking", title: "Discount Stacking: How to Calculate Sale + Coupon + Cashback Correctly",
    description: "The right order to apply multiple discounts, with India-style sale examples.",
    date: "2025-12-14", readMin: 5, category: "Finance", tags: ["Shopping", "Discounts"],
    related: ["discount-calculator", "percentage-calculator", "gst-calculator"],
    body: wrap(
      "End-of-season sales, bank-card cashback, and platform coupons can stack into eye-watering discounts — but the order matters. Here is the right way to add them up.",
      [
        { h: "Multiplicative, not additive", p: "30% off + 10% extra is not 40% off — it is 30% then 10% on the reduced price = 37%. Always multiply (1 − d1) × (1 − d2)." },
        { h: "Coupon order", p: "Most platforms apply: MRP → category discount → coupon → wallet/cashback. Cashback is usually credited later, not deducted from the bill." },
        { h: "GST surprise", p: "GST is charged on the post-discount price. A bigger discount → smaller GST → bigger absolute saving." },
        { h: "Real-world test", p: "Always compute final-payable yourself before clicking pay. Apps occasionally show wrong totals — always cross-check with our Discount Calculator + GST Calculator." },
      ],
      "Bookmark our Discount and GST calculators side-by-side during sale season — 30 seconds of math can save thousands.",
    ),
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
