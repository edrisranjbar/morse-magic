import { Button } from "@/components/ui/button";
import { Bitcoin, Copy } from "lucide-react";
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
      name: "Tether (USDT)",
      address: "0x1234567890abcdef1234567890abcdef12345678",
      icon: "₮",
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
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <div className="relative">
        <div className="text-center space-y-6">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-zinc-800">
            <Bitcoin className="size-7 text-zinc-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100">
            Support Our Project
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg">
            Help us maintain and improve Morse Magic by making a cryptocurrency donation. Your support keeps this project free and accessible for everyone.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cryptoAddresses.map((crypto) => (
            <div
              key={crypto.name}
              className="group p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-zinc-100">{crypto.name}</span>
                <span className="text-2xl text-zinc-300">{crypto.icon}</span>
              </div>
              <div className="relative">
                <div className="overflow-hidden text-ellipsis text-sm text-zinc-400 font-mono bg-zinc-900/50 p-3 rounded">
                  {crypto.address}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-800"
                  onClick={() => handleCopy(crypto.address)}
                >
                  <Copy className="size-4 text-zinc-400" />
                </Button>
              </div>
              {copiedAddress === crypto.address && (
                <div className="text-sm text-emerald-500 mt-2 font-medium">Copied to clipboard</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationSection; 