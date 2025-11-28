"use client";

export default function ComparisonTable() {
  return (
    <section
      className="py-20 px-6 text-white"
      style={{
        background: "linear-gradient(to bottom, #0a0f3d, #05071f)",
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 drop-shadow-[0_0_20px_#0533eb]">
        Compare Plans
      </h2>

      {/* Wrapper with overflow hidden for rounded corners */}
      <div
        className="overflow-x-auto"
        aria-label="Scrollable plan comparison table"
      >
        <table
          className="w-full max-w-5xl mx-auto border-collapse"
          aria-label="Plan comparison table"
          style={{
            boxShadow:
              "0 0 25px rgba(5,51,235,0.3), inset 0 0 20px rgba(255,255,255,0.06)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <caption className="sr-only">
            Comparison of Basic, Pro, and Enterprise plans
          </caption>

          <thead>
            <tr
              style={{
                background: "rgba(5,51,235,0.2)",
                backdropFilter: "blur(6px)",
              }}
            >
              <th className="p-4 text-left" scope="col">Feature</th>
              <th className="p-4 text-center" scope="col">Basic</th>
              <th className="p-4 text-center" scope="col">Pro</th>
              <th className="p-4 text-center" scope="col">Enterprise</th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-[#0e133d]/40">
              <td className="p-4 border-t border-white/10">Content Generation</td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Included">✔</span>
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Fast included">✔✔ Fast</span>
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Unlimited
              </td>
            </tr>

            <tr className="bg-[#151a4f]/40">
              <td className="p-4 border-t border-white/10">Save Drafts</td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Included">✔</span>
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Included">✔</span>
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Team Storage
              </td>
            </tr>

            <tr className="bg-[#0e133d]/40">
              <td className="p-4 border-t border-white/10">Generations Limit</td>
              <td className="p-4 border-t border-white/10 text-center">50/mo</td>
              <td className="p-4 border-t border-white/10 text-center">
                Unlimited
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Unlimited + API
              </td>
            </tr>

            <tr className="bg-[#151a4f]/40">
              <td className="p-4 border-t border-white/10">Support</td>
              <td className="p-4 border-t border-white/10 text-center">
                Standard
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Priority
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Dedicated
              </td>
            </tr>

            <tr className="bg-[#0e133d]/40">
              <td className="p-4 border-t border-white/10">Team Management</td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Not included">–</span>
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Not included">–</span>
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                <span aria-label="Included">✔</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
