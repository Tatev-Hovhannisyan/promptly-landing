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

      <div className="overflow-x-auto">
        <table
          className="w-full max-w-5xl mx-auto border-collapse"
          style={{
            boxShadow:
              "0 0 25px rgba(5,51,235,0.3), inset 0 0 20px rgba(255,255,255,0.06)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                background: "rgba(5,51,235,0.2)",
                backdropFilter: "blur(6px)",
              }}
            >
              <th className="p-4 text-left">Feature</th>
              <th className="p-4 text-center">Basic</th>
              <th className="p-4 text-center">Pro</th>
              <th className="p-4 text-center">Enterprise</th>
            </tr>
          </thead>

          <tbody>
            {/* Row 1 */}
            <tr className="bg-[#0e133d]/40">
              <td className="p-4 border-t border-white/10">
                Content Generation
              </td>
              <td className="p-4 border-t border-white/10 text-center">✔</td>
              <td className="p-4 border-t border-white/10 text-center">
                ✔✔ Fast
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Unlimited
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="bg-[#151a4f]/40">
              <td className="p-4 border-t border-white/10">Save Drafts</td>
              <td className="p-4 border-t border-white/10 text-center">✔</td>
              <td className="p-4 border-t border-white/10 text-center">✔</td>
              <td className="p-4 border-t border-white/10 text-center">
                Team Storage
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="bg-[#0e133d]/40">
              <td className="p-4 border-t border-white/10">
                Generations Limit
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                50/mo
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Unlimited
              </td>
              <td className="p-4 border-t border-white/10 text-center">
                Unlimited + API
              </td>
            </tr>

            {/* Row 4 */}
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

            {/* Row 5 */}
            <tr className="bg-[#0e133d]/40">
              <td className="p-4 border-t border-white/10">Team Management</td>
              <td className="p-4 border-t border-white/10 text-center">–</td>
              <td className="p-4 border-t border-white/10 text-center">–</td>
              <td className="p-4 border-t border-white/10 text-center">✔</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
