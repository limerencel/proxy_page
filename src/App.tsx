import { useState } from "react";
import { Link2Icon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProxyForm } from "@/components/proxy/ProxyForm";
import { ProxyResults } from "@/components/proxy/ProxyResults";
import { Toaster } from "@/components/ui/sonner";
import { validateUrl } from "@/lib/validation";
import { toast } from "sonner";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [proxyUrls, setProxyUrls] = useState<{
    cloudflare: string;
    aliyun: string;
  } | null>(null);
  const [shortenedUrls, setShortenedUrls] = useState<{
    cloudflare: string;
    aliyun: string;
  } | null>(null);

  const workerUrl = "https://short.mita.news";

  const generateProxyUrls = async () => {
    const validation = validateUrl(inputUrl);

    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    // Simple URL transformation
    const cloudflareProxy = `https://gp.mita.news/${inputUrl}`;
    const aliyunProxy = `https://github-proxy-izhcilrgss.cn-hongkong.fcapp.run/${inputUrl}`;

    setProxyUrls({
      cloudflare: cloudflareProxy,
      aliyun: aliyunProxy,
    });

    // toast.success('Proxy URLs generated successfully!');

    // Generating short links
    try {
      const cfShortened = await shortenUrl(cloudflareProxy);
      const aliyunShortened = await shortenUrl(aliyunProxy);
      setShortenedUrls({
        cloudflare: cfShortened,
        aliyun: aliyunShortened,
      });
    } catch (error) {
      console.error("Error generating short links: ", error);
      toast.error("Failed to generate short links");
    }
  };

  const shortenUrl = async (proxyUrl: string): Promise<string> => {
    console.log("Shortening URL:", proxyUrl);
    try {
      const response = await fetch(workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add CORS headers if needed
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ longUrl: proxyUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Change to text() instead of json()
      const shortUrl = await response.text();
      return shortUrl;
    } catch (error) {
      console.error("Error shortening URL:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 w-screen">
      <Container>
        <div className="flex flex-col items-center justify-center w-full py-12 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 w-full max-w-2xl">
            <div className="relative">
              <Link2Icon className="h-12 w-12 mx-auto text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10 rounded-full scale-150" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Global Proxy Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Access resources globally with our proxy service. Simply paste
              your URL below.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-2xl">
            <ProxyForm
              inputUrl={inputUrl}
              onInputChange={setInputUrl}
              onGenerate={generateProxyUrls}
            />
          </div>

          {/* Results */}
          {proxyUrls && (
            <div className="w-full max-w-2xl">
              <ProxyResults urls={proxyUrls} />
            </div>
          )}
        </div>
      </Container>
      <Toaster />
    </div>
  );
}

export default App;
