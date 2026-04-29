import { ToolPageLayout } from "@/components/site/ToolPageLayout";
import { EmiCalculator } from "@/components/tools/EmiCalculator";

const EmiCalculatorPage = () => (
  <ToolPageLayout
    title="EMI Calculator Online – Calculate Loan EMI Instantly (Free Tool)"
    description="Calculate your loan EMI instantly using our free EMI calculator. Get monthly EMI, total interest, and repayment schedule in seconds."
    canonical="/emi-calculator"
    breadcrumbCategory={{ label: "Finance Tools", href: "/#categories" }}
    h1="EMI Calculator – Calculate Your Loan EMI Instantly"
    intro={
      <>
        Planning to take a loan? Use our <strong>free EMI calculator online</strong> to calculate your monthly
        installment quickly and accurately. Whether it's a <strong>home loan, personal loan, or car loan</strong>,
        this tool helps you understand how much you need to pay every month, including interest.
      </>
    }
    calculator={<EmiCalculator />}
    whatIs={{
      heading: "What is EMI?",
      body: (
        <>
          <p>
            EMI (<strong>Equated Monthly Installment</strong>) is the fixed amount you pay every month to repay your
            loan. It includes both the <strong>principal amount</strong> and the <strong>interest</strong> charged
            by the lender.
          </p>
          <p className="mt-3">
            EMIs make loan repayment easier by spreading the cost over a fixed period, helping you budget your
            monthly expenses with confidence.
          </p>
        </>
      ),
    }}
    formula={{
      heading: "EMI Formula",
      expression: "EMI = P × R × (1 + R)^N / ((1 + R)^N − 1)",
      legend: [
        { sym: "P", meaning: "Loan Amount (Principal)" },
        { sym: "R", meaning: "Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)" },
        { sym: "N", meaning: "Number of Monthly Installments (Years × 12)" },
      ],
    }}
    example={{
      body: (
        <>
          <p>Let's say:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Loan Amount = ₹5,00,000</li>
            <li>Interest Rate = 10% per year</li>
            <li>Tenure = 5 years</li>
          </ul>
          <p className="mt-3">Your EMI will be approximately <strong>₹10,624 per month</strong>.</p>
        </>
      ),
    }}
    benefits={{
      heading: "Benefits of Using an EMI Calculator",
      items: [
        "Helps plan your finances better",
        "Compare different loan options easily",
        "Avoid over-borrowing and EMI stress",
        "Get quick and accurate results",
        "Visualize total interest before applying",
        "Free, instant, and 100% online",
      ],
    }}
    useCases={{
      heading: "Types of Loans You Can Calculate",
      items: ["Home Loans", "Car Loans", "Personal Loans", "Education Loans", "Business Loans", "Gold Loans"],
    }}
    howToUse={{
      heading: "How to Use This EMI Calculator",
      steps: [
        "Enter your loan amount in rupees.",
        "Enter the annual interest rate offered by your lender.",
        "Select the loan tenure in years.",
        "Instantly view EMI, total interest, and total payment.",
      ],
    }}
    tips={{
      heading: "Tips to Reduce Your EMI",
      items: [
        "Choose a longer tenure to lower monthly EMI (note: total interest will be higher).",
        "Make a higher down payment to reduce the principal.",
        "Compare multiple lenders before finalizing.",
        "Improve your credit score to negotiate lower interest rates.",
        "Consider prepayments whenever possible.",
      ],
    }}
    faqs={[
      { q: "What is EMI?", a: "EMI is the fixed monthly payment made towards loan repayment, covering both principal and interest." },
      { q: "How is EMI calculated?", a: "EMI is calculated using the loan amount, interest rate, and tenure with the formula EMI = P × R × (1+R)^N / ((1+R)^N − 1)." },
      { q: "Can I reduce my EMI?", a: "Yes, you can reduce EMI by increasing the tenure, paying a larger down payment, or refinancing at a lower interest rate." },
      { q: "Does EMI include interest?", a: "Yes, every EMI payment includes both the principal repayment and the interest component." },
      { q: "Is this EMI calculator free?", a: "Yes, the InstantTool EMI calculator is completely free and unlimited to use." },
      { q: "Can I use it for any loan type?", a: "Yes, it works for home, car, personal, education, and business loans." },
    ]}
    related={[
      { label: "Loan Calculator", href: "/loan-calculator" },
      { label: "Interest Calculator", href: "/interest-calculator" },
      { label: "FD Calculator", href: "/fd-calculator" },
      { label: "SIP Calculator", href: "/sip-calculator" },
    ]}
    cta={
      <>
        <h3 className="text-xl sm:text-2xl font-bold">Start planning your loan today</h3>
        <p className="mt-2 opacity-90">Use our free EMI calculator to make smarter borrowing decisions.</p>
      </>
    }
    extraSeoParagraph={
      <p>
        Using an EMI calculator helps borrowers make informed financial decisions. It allows users to experiment with
        different loan scenarios and understand the impact of interest rates and tenure on monthly payments. This tool
        is especially useful for individuals planning long-term financial commitments such as a home loan or
        education loan in India.
      </p>
    }
  />
);

export default EmiCalculatorPage;
