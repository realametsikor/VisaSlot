export default function CostCalculator() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200">
        <h1 className="text-3xl font-bold mb-6">Relocation Cost Calculator</h1>
        <p className="text-slate-600 mb-8">Enter your details to estimate your moving costs.</p>
        
        {/* Placeholder for your actual tool logic */}
        <div className="space-y-4">
          <input type="text" placeholder="Destination Country" className="w-full p-3 border rounded-xl" />
          <input type="number" placeholder="Number of family members" className="w-full p-3 border rounded-xl" />
          <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Calculate Costs</button>
        </div>
      </div>
    </div>
  );
}
