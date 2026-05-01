import { Link } from "react-router-dom";
import { StaticPageLayout } from "@/components/site/StaticPageLayout";

const Blog = () => (
  <StaticPageLayout
    title="Blog – InstantTool.in"
    description="Guides, calculators and explainers from InstantTool.in — coming soon."
    canonical="/blog"
    h1="InstantTool Blog"
  >
    <p>
      We’re working on in-depth guides covering EMI planning, SIP strategies,
      tax savings, BMI & nutrition, and many more topics tailored for Indian
      readers. Check back soon!
    </p>
    <p>
      Meanwhile, explore our <Link to="/#explore">60+ free calculators</Link>{" "}
      or download the <a href="/InstantTool-Personal-Finance-Planner.xlsx">Personal Finance Planner</a>.
    </p>
  </StaticPageLayout>
);

export default Blog;
