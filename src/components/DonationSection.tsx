import { Button } from "@/components/ui/button";
import { Bitcoin, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

const DonationSection = () => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const cryptoAddresses = [
    {
      name: "Bitcoin (BTC)",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      icon: "₿",
    },
    {
      name: "Ethereum (ETH)",
      address: "0xb15f4922720a0Cc8C3d7eA8d026CBfE70f8D84a1",
      icon: "Ξ",
    },
    {
      name: "Dogecoin (DOGE)",
      address: "D8vFz4p1L37jdg47HXKtSHA5EbVNf8z2dk",
      icon: "Ð",
    },
  ];

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <div className="relative text-white">
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <Bitcoin className="size-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
            Support Our Project
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base">
            Help us maintain and improve Morse Magic by making a donation. Your support keeps this project free and accessible for everyone.
          </p>
        </div>

        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {cryptoAddresses.map((crypto) => (
            <div
              key={crypto.name}
              className="group p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{crypto.name}</span>
                <span className="text-xl">{crypto.icon}</span>
              </div>
              <div className="relative">
                <div className="overflow-hidden text-ellipsis text-xs sm:text-sm text-zinc-400 font-mono bg-zinc-900/50 p-3 rounded">
                  {crypto.address}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleCopy(crypto.address)}
                >
                  <Copy className="size-4" />
                </Button>
              </div>
              {copiedAddress === crypto.address && (
                <div className="text-xs text-green-400 mt-1">Copied!</div>
              )}
            </div>
          ))}

          {/* ZarinPal Donation */}
          <div className="group p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">ZarinPal (IRR)</span>
              <span className="text-xl">💳</span>
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-zinc-800 transition-colors"
                asChild
              >
                <a 
                  href="https://zarinp.al/edrisranjbar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Donate with ZarinPal
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default DonationSection; 