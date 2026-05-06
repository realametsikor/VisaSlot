export default function RealStories() {
  return (
    <section className="bg-blue-600 py-16 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Real Journeys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-500">
            <p className="italic text-blue-50">"VisaSlot's document checklist saved me from submitting an incomplete application for my UK Student Visa. I got approved in 2 weeks!"</p>
            <div className="mt-4 font-medium text-sm text-blue-200">— Sarah, Study Abroad</div>
          </div>
          <div className="bg-blue-700/50 p-6 rounded-2xl border border-blue-500">
            <p className="italic text-blue-50">"I was overwhelmed by the Canadian Express Entry system. The step-by-step breakdown made it manageable to do myself without an agent."</p>
            <div className="mt-4 font-medium text-sm text-blue-200">— David, Relocated to Toronto</div>
          </div>
        </div>
      </div>
    </section>
  );
}
