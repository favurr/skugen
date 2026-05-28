import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100">
            SKU & EAN-13 Generator
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate professional SKUs and EAN-13 barcodes for your products
            instantly. No more manual coding - just enter your product details
            and get standardized identifiers.
          </p>
          <Button
            asChild
            variant="default"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Link href="/products">Get Started →</Link>
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1: SKU Generation */}
          <Card className="border-none shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                <Box className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardTitle className="text-xl font-semibold">
                Human-Readable SKUs
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Generate clean, abbreviated SKUs like DLT-BLK-16G-0001 from
                product names and attributes. Automatically formatted with
                consistent abbreviations and sequence numbers.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2: EAN-13 Generation */}
          <Card className="border-none shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-50 text-green-600">
                <Zap className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardTitle className="text-xl font-semibold">
                Standard EAN-13 Codes
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Get 13-digit numeric EAN codes with proper checksum validation.
                Format: 615110[SEQUENCE][CHECKSUM] - stable forever even if
                product details change.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3: Database Storage */}
          <Card className="border-none shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-50 text-purple-600">
                <CheckCircle className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardTitle className="text-xl font-semibold">
                Persistent Storage
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                All products saved securely to your Supabase database. SKUs and
                EANs are guaranteed unique and retrievable anytime.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Example Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            See It in Action
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Input:
              </h3>
              <div className="space-y-2 text-sm font-mono bg-white dark:bg-gray-700 rounded px-3 py-2">
                <div>Name: Dell Latitude</div>
                <div>Attribute 1: Black</div>
                <div>Attribute 2: 16GB</div>
                <div>Attribute 3: 512GB</div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Output:
              </h3>
              <div className="space-y-2 text-sm font-mono bg-white dark:bg-gray-700 rounded px-3 py-2">
                <div>
                  <span className="font-medium">SKU:</span> DLT-BLK-16G-0001
                </div>
                <div>
                  <span className="font-medium">EAN-13:</span> 6151100000015
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Ready to generate your first product SKU?
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Start creating standardized product identifiers that work across
            inventory systems, marketplaces, and barcode scanners.
          </p>
          <Button
            asChild
            href="/products"
            variant="default"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg"
          >
            Generate Your First SKU →
          </Button>
        </div>
      </div>
    </main>
  );
}
