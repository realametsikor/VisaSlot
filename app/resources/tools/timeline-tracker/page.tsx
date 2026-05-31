export default function TimelineTracker() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200">
        <h1 className="text-3xl font-bold mb-6">Timeline Tracker</h1>
        <p className="text-slate-600 mb-8">Set your target date to generate your personalized roadmap.</p>
        
        {/* Placeholder for your timeline logic */}
        <div className="space-y-4">
          <input type="date" className="w-full p-3 border rounded-xl" />
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Generate Timeline</button>
        </div>
      </div>
    </div>
  );
}
