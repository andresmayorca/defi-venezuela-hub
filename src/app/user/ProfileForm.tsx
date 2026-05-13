"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ProfileForm({ user }: { user: any }) {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [ethereumWallet, setEthereumWallet] = useState("");
  const [solanaWallet, setSolanaWallet] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const interests = [
    "Trading",
    "Desarrollo Web3",
    "Comunidad",
    "DeFi",
    "NFTs",
    "Staking",
    "DAOs",
  ];

  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
        setEthereumWallet(data.wallets?.ethereum || "");
        setSolanaWallet(data.wallets?.solana || "");
        setSelectedInterests(data.interests || []);
      }

      setLoading(false);
    };

    loadProfile();
  }, [user.id, supabase]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          wallets: {
            ethereum: ethereumWallet || null,
            solana: solanaWallet || null,
          },
          interests: selectedInterests,
        })
        .eq("user_id", user.id);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("✓ Perfil actualizado correctamente");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-[#9DA5B4]">Cargando...</div>;
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-3 rounded-xl bg-[#0D1117]/50 border border-white/5 text-[#9DA5B4] disabled:cursor-not-allowed"
          />
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] focus:outline-none focus:border-[#00FF88]/40 transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        {/* Wallets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
              Wallet Ethereum
            </label>
            <input
              type="text"
              value={ethereumWallet}
              onChange={(e) => setEthereumWallet(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-xs focus:outline-none focus:border-[#00FF88]/40 transition-colors"
              placeholder="0x..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#F0F1F5] mb-2">
              Wallet Solana
            </label>
            <input
              type="text"
              value={solanaWallet}
              onChange={(e) => setSolanaWallet(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-[#F0F1F5] text-xs focus:outline-none focus:border-[#00FF88]/40 transition-colors"
              placeholder="Dirección Solana"
            />
          </div>
        </div>

        {/* Intereses */}
        <div>
          <label className="block text-sm font-semibold text-[#F0F1F5] mb-3">
            Tus intereses
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                  selectedInterests.includes(interest)
                    ? "bg-[#00FF88]/10 border-[#00FF88]/40 text-[#00FF88]"
                    : "bg-transparent border-white/10 text-[#9DA5B4] hover:border-white/20"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              message.includes("✓")
                ? "bg-green-400/10 text-green-400"
                : "bg-red-400/10 text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[#00FF88] text-[#0D1117] font-semibold text-sm disabled:opacity-60 hover:bg-[#00e67a] transition-colors"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
