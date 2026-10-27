import React, { useState } from 'react';
import { 
  Tractor, Sprout, ShieldCheck, MapPin, Search, DollarSign, 
  ShoppingCart, Building2, CheckCircle, Truck, Wrench, 
  Calculator, UserCheck, Star, ArrowRight, Package, AlertCircle 
} from 'lucide-react';

export default function AgriUSMarketplace() {
  // States
  const [activeTab, setActiveTab] = useState('home');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates] = useState({ USD: 1, EUR: 0.92, SAR: 3.75, DZD: 134.5, AED: 3.67 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Platform Stats & Owner Sliders
  const [platformCommission, setPlatformCommission] = useState(3.5); // %
  const [activeVendorsCount, setActiveVendorsCount] = useState(124);
  const [monthlyOrders, setMonthlyOrders] = useState(450);
  const averageOrderValue = 12500; // Average heavy machinery price in USD

  // Calculated Platform Revenue
  const estimatedMonthlyRevenue = Math.round((monthlyOrders * averageOrderValue) * (platformCommission / 100) + (activeVendorsCount * 199));

  // Sample Equipment Data (US Market)
  const [equipmentList, setEquipmentList] = useState([
    {
      id: 1,
      title: "John Deere 8R 370 Row-Crop Tractor",
      category: "Tractors & Heavy Machinery",
      price: 285000,
      location: "Iowa, US (ZIP: 50309)",
      condition: "Certified Used (320 Hours)",
      seller: "Midwest Farm Solutions",
      verified: true,
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb26978?auto=format&fit=crop&w=800&q=80",
      b2bMinQty: 1,
      shippingWeight: "24,500 lbs (Heavy Freight)"
    },
    {
      id: 2,
      title: "DJI Agras T40 Agricultural Spraying Drone",
      category: "Precision Ag & Drones",
      price: 22500,
      location: "California, US (ZIP: 90210)",
      condition: "Brand New",
      seller: "AgriTech Innovations LLC",
      verified: true,
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
      b2bMinQty: 3,
      shippingWeight: "140 lbs (Standard Freight)"
    },
    {
      id: 3,
      title: "Valmont Pivot Irrigation System (1/4 Mile)",
      category: "Irrigation & Water Systems",
      price: 45000,
      location: "Texas, US (ZIP: 75201)",
      condition: "New Kit",
      seller: "Texas Hydro & Irrigation",
      verified: false,
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
      b2bMinQty: 1,
      shippingWeight: "8,200 lbs (Heavy Freight)"
    },
    {
      id: 4,
      title: "Commercial Hydroponic Vertical Grow Racks",
      category: "Hydroponics & Greenhouses",
      price: 12500,
      location: "Florida, US (ZIP: 33101)",
      condition: "Brand New",
      seller: "Greenhouse Pro US",
      verified: true,
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
      b2bMinQty: 5,
      shippingWeight: "1,500 lbs (LTL Freight)"
    }
  ]);

  // Cart & Freight Calculator State
  const [cart, setCart] = useState([]);
  const [buyerZip, setBuyerZip] = useState('');
  const [freightCost, setFreightCost] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('deposit_cod'); // 'full', 'deposit_cod'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Equipment Form State
  const [newEq, setNewEq] = useState({
    title: '', category: 'Tractors & Heavy Machinery', price: '', location: '', condition: 'Brand New', seller: '', shippingWeight: ''
  });

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * exchangeRates[currency];
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(converted);
  };

  const handleAddEquipment = (e) => {
    e.preventDefault();
    if (!newEq.title || !newEq.price) return;
    const item = {
      id: equipmentList.length + 1,
      ...newEq,
      price: Number(newEq.price),
      verified: true, // Automatically verified to grant 3 free listings
      image: "https://images.unsplash.com/photo-1589923188653-ba6fc58dcf48?auto=format&fit=crop&w=800&q=80",
      b2bMinQty: 1
    };
    setEquipmentList([item, ...equipmentList]);
    setNewEq({ title: '', category: 'Tractors & Heavy Machinery', price: '', location: '', condition: 'Brand New', seller: '', shippingWeight: '' });
    setActiveTab('market');
    alert('Listing added successfully! Your Verified Status granted you 3 Free Listings.');
  };

  const calculateFreight = () => {
    if (!buyerZip) {
      alert('Please enter your US ZIP Code first.');
      return;
    }
    // Simulated freight calculation based on US Logistics API (uShip / C.H. Robinson)
    const simulatedCost = Math.floor(Math.random() * 800) + 350;
    setFreightCost(simulatedCost);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans rtl">
      
      {/* Top Bar / Trust Banner */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Verified US Farmers & Dealers Network | 3 Free Listings with Profile Verification</span>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-emerald-800 text-white rounded px-2 py-0.5 text-xs border border-emerald-700"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="DZD">DZD (دج)</option>
          </select>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center shadow-md">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-emerald-900">AgriUS<span className="text-amber-600">Market</span></h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">US Agricultural & Machinery Hub</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <button onClick={() => setActiveTab('home')} className={`hover:text-emerald-600 transition ${activeTab === 'home' ? 'text-emerald-600 font-bold' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('market')} className={`hover:text-emerald-600 transition ${activeTab === 'market' ? 'text-emerald-600 font-bold' : ''}`}>Machinery & B2B Store</button>
            <button onClick={() => setActiveTab('sell')} className={`hover:text-emerald-600 transition ${activeTab === 'sell' ? 'text-emerald-600 font-bold' : ''}`}>List Equipment (Free)</button>
            <button onClick={() => setActiveTab('admin')} className={`hover:text-emerald-600 transition text-amber-600 font-bold ${activeTab === 'admin' ? 'underline' : ''}`}>Platform Revenue & Admin</button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative bg-slate-100 hover:bg-slate-200 p-2.5 rounded-full transition"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('sell')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Get Verified (3 Free)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Router */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-8 md:p-14 shadow-xl">
              <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')` }}></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">US Agricultural Equipment B2B & B2C</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">The Ultimate Marketplace for American Agriculture</h2>
                <p className="text-slate-300 text-sm md:text-base">Buy and sell heavy tractors, precision drones, irrigation systems, and farm supplies directly from verified US dealers and farmers with secure Pay on Delivery & Freight Integration.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => setActiveTab('market')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2">
                    Browse Equipment <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => setActiveTab('sell')} className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold px-6 py-3 rounded-xl border border-white/30 transition">
                    List Free (Verified)
                  </button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Verified Farmers & Dealers</h3>
                <p className="text-slate-500 text-sm">Complete your profile verification with US Business/Farm ID to get 3 Free Listings and a Verified Blue Badge.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center font-bold">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">US Freight Integration</h3>
                <p className="text-slate-500 text-sm">Instant shipping quotes via uShip, C.H. Robinson, and FedEx Freight tailored to your exact US ZIP code.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Secure Pay on Delivery</h3>
                <p className="text-slate-500 text-sm">Pay a small online deposit to secure your order, and pay the remaining balance upon delivery and inspection.</p>
              </div>
            </div>
          </div>
        )}

        {/* MARKETPLACE TAB */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search tractors, drones, irrigation..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {['All', 'Tractors & Heavy Machinery', 'Precision Ag & Drones', 'Irrigation & Water Systems', 'Hydroponics & Greenhouses'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipmentList
                .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
                .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 bg-slate-100 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                        {item.verified && (
                          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                            <ShieldCheck className="w-3 h-3" /> Verified Dealer
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">{item.category}</span>
                        <h3 className="font-bold text-slate-900 text-base line-clamp-1">{item.title}</h3>
                        
                        <div className="flex items-center gap-1 text-slate-500 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.location}</span>
                        </div>
                        <div className="text-xs text-slate-600">Condition: <strong className="text-slate-800">{item.condition}</strong></div>
                        <div className="text-xs text-slate-500">Shipping: {item.shippingWeight}</div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                      <button 
                        onClick={() => {
                          setCart([...cart, item]);
                          setIsModalOpen(true);
                        }}
                        className="w-full mt-3 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" /> Request Quote / Buy
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* LIST EQUIPMENT TAB (Free with Verification) */}
        {activeTab === 'sell' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Seller Verification Program</span>
              <h2 className="text-2xl font-black">List Your Equipment Free</h2>
              <p className="text-slate-500 text-sm">Verify your US Farm or Dealer ID and get <strong className="text-emerald-600">3 Free Listings</strong> with a Verified Badge.</p>
            </div>

            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Equipment Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., John Deere Combine Harvester S700" 
                  value={newEq.title}
                  onChange={(e) => setNewEq({...newEq, title: e.target.value})}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Category</label>
                  <select 
                    value={newEq.category}
                    onChange={(e) => setNewEq({...newEq, category: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="Tractors & Heavy Machinery">Tractors & Heavy Machinery</option>
                    <option value="Precision Ag & Drones">Precision Ag & Drones</option>
                    <option value="Irrigation & Water Systems">Irrigation & Water Systems</option>
                    <option value="Hydroponics & Greenhouses">Hydroponics & Greenhouses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Price (USD $)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="45000" 
                    value={newEq.price}
                    onChange={(e) => setNewEq({...newEq, price: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">US Location & ZIP</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Kansas, US (ZIP: 67101)" 
                    value={newEq.location}
                    onChange={(e) => setNewEq({...newEq, location: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Condition</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Brand New / Certified Used" 
                    value={newEq.condition}
                    onChange={(e) => setNewEq({...newEq, condition: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Seller / Farm Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Prairie Wind Farms" 
                    value={newEq.seller}
                    onChange={(e) => setNewEq({...newEq, seller: e.target.value})}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">US Farm / Tax ID (EIN for Verification)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="XX-XXXXXXX" 
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition">
                Submit & Claim 3 Free Listings
              </button>
            </form>
          </div>
        )}

        {/* PLATFORM REVENUE & ADMIN DASHBOARD TAB */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase">Alibaba Monetization Model</span>
                <h2 className="text-2xl font-black mt-2">Platform Revenue & Owner Dashboard</h2>
                <p className="text-slate-400 text-sm">Simulate platform earnings from sales commissions and dealer subscriptions in the US market.</p>
              </div>
              <div className="bg-emerald-600 px-6 py-4 rounded-xl text-center">
                <span className="text-xs text-emerald-100 uppercase tracking-widest block">Estimated Monthly Income</span>
                <span className="text-3xl font-black">{formatPrice(estimatedMonthlyRevenue)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Adjust Commission Rate ({platformCommission}%)</h3>
                <input 
                  type="range" 
                  min="2" 
                  max="7" 
                  step="0.5" 
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <p className="text-xs text-slate-500">Controls the automatic percentage taken from each heavy machinery sale across the US.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-lg text-slate-900">Active Verified Vendors ({activeVendorsCount})</h3>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  step="25" 
                  value={activeVendorsCount}
                  onChange={(e) => setActiveVendorsCount(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <p className="text-xs text-slate-500">Each Pro Dealer pays $199/mo subscription fee.</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* CART & CHECKOUT MODAL (With Pay on Delivery & Freight Calculator) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-base flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" /> Order & Freight Checkout
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Your cart is empty. Select equipment from the market.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                        <span className="text-xs text-slate-500">Seller: {item.seller}</span>
                      </div>
                      <span className="font-bold text-emerald-600">{formatPrice(item.price)}</span>
                    </div>
                  ))}

                  {/* US Freight Calculator */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                    <label className="block text-xs font-bold uppercase text-slate-700">US Heavy Freight Shipping (Enter ZIP Code)</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="e.g. 64101" 
                        value={buyerZip}
                        onChange={(e) => setBuyerZip(e.target.value)}
                        className="flex-1 p-2 border border-slate-200 rounded-lg text-sm bg-white"
                      />
                      <button onClick={calculateFreight} className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg">
                        Calculate
                      </button>
                    </div>
                    {freightCost !== null && (
                      <p className="text-xs text-emerald-700 font-bold mt-1">
                        Estimated Freight (uShip / C.H. Robinson): ${freightCost} USD
                      </p>
                    )}
                  </div>

                  {/* Payment Method Selector (Deposit + Pay on Delivery) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-slate-700">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setPaymentMethod('deposit_cod')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs space-y-1 ${paymentMethod === 'deposit_cod' ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-slate-200 text-slate-600'}`}
                      >
                        <div>Pay on Delivery (10% Deposit)</div>
                        <div className="text-[10px] text-slate-500">Pay 10% online, balance upon equipment inspection.</div>
                      </div>

                      <div 
                        onClick={() => setPaymentMethod('full')}
                        className={`p-3 rounded-xl border cursor-pointer text-xs space-y-1 ${paymentMethod === 'full' ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' : 'border-slate-200 text-slate-600'}`}
                      >
                        <div>Full Online Payment</div>
                        <div className="text-[10px] text-slate-500">Secured via Escrow.com / Stripe.</div>
                      </div>
                    </div>
                  </div>

                  {/* Total Calculation */}
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Equipment:</span>
                      <span className="font-bold">{formatPrice(cart.reduce((acc, curr) => acc + curr.price, 0))}</span>
                    </div>
                    {freightCost && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Freight Delivery:</span>
                        <span className="font-bold">{formatPrice(freightCost)}</span>
                      </div>
                    )}
                    <div className="border-t border-emerald-200 pt-2 flex justify-between text-base font-black text-emerald-900">
                      <span>{paymentMethod === 'deposit_cod' ? 'Due Now (10% Deposit + Freight):' : 'Total Due Now:'}</span>
                      <span>
                        {formatPrice(
                          paymentMethod === 'deposit_cod' 
                            ? (cart.reduce((acc, curr) => acc + curr.price, 0) * 0.1) + (freightCost || 0)
                            : cart.reduce((acc, curr) => acc + curr.price, 0) + (freightCost || 0)
                        )}
                      </span>
                    </div>
                  </div>

                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-lg">
                Cancel
              </button>
              {cart.length > 0 && (
                <button 
                  onClick={() => {
                    alert('Order and Freight booked successfully! Secure escrow & Pay on Delivery initiated.');
                    setCart([]);
                    setIsModalOpen(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow"
                >
                  Confirm Secure Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
