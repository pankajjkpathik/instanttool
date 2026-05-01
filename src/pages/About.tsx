import { StaticPageLayout } from "@/components/site/StaticPageLayout";

const About = () => (
  <StaticPageLayout
    title="About InstantTool.in – Free Online Calculators for India"
    description="Learn about InstantTool.in — our mission, our team, and how we build free, accurate online calculators for Indian users."
    canonical="/about"
    h1="About InstantTool.in"
  >
    <p>
      <strong>InstantTool.in</strong> is a free, India-first platform offering 60+
      online calculators and utility tools. Our mission is simple — make
      everyday financial, health and daily-life calculations effortless,
      accurate and accessible to every Indian, on every device.
    </p>
    <h2>Our Story</h2>
    <p>
      InstantTool was founded in 2024 by a small team of Indian developers,
      finance enthusiasts and designers who were frustrated by clunky, ad-heavy
      calculators that were not built for Indian users — Indian rupees, lakhs &
      crores, GST slabs, RBI-style EMI formats and our local tax rules. We set
      out to build the tools we wished existed: clean, mobile-first, instant,
      and 100% free.
    </p>
    <h2>What We Build</h2>
    <ul>
      <li><strong>Personal Finance:</strong> EMI, GST, Income Tax, FD, RD, PPF.</li>
      <li><strong>Investment & Savings:</strong> SIP, NPS, Sukanya Samriddhi, CAGR, retirement.</li>
      <li><strong>Health & Fitness:</strong> BMI, BMR, calorie, water intake, due date.</li>
      <li><strong>Daily Utility:</strong> Age, date difference, working days, password & QR generators.</li>
      <li><strong>Math:</strong> Percentage, ratio, scientific, profit & loss, area.</li>
      <li><strong>Converters:</strong> Length, weight, temperature, currency, data storage, text.</li>
    </ul>
    <h2>Our Promise</h2>
    <p>
      Every calculator on InstantTool runs entirely in your browser — we do not
      store your inputs, do not require signup, and never sell your data. We
      keep the experience fast (under 2 seconds), mobile-friendly and free
      forever. Ads on the site help us cover hosting and continue building new
      tools.
    </p>
    <h2>Contact</h2>
    <p>
      Have a suggestion, found a bug, or want to partner with us? Visit our{" "}
      <a href="/contact">contact page</a> — we read every message.
    </p>
  </StaticPageLayout>
);

export default About;
