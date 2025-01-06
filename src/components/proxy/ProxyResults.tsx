import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ProxyResultsProps {
  urls: {
    cloudflare: string;
    aliyun: string;
  };
}

export function ProxyResults({ urls }: ProxyResultsProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>Proxy URLs</CardTitle>
        <CardDescription>
          Use either of these URLs to access your resource
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cloudflare Result */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Cloudflare Proxy:</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              readOnly
              value={urls.cloudflare}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              onClick={() => handleCopy(urls.cloudflare)}
              className="w-full sm:w-auto"
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Aliyun Result */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Aliyun Proxy:</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              readOnly
              value={urls.aliyun}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              onClick={() => handleCopy(urls.aliyun)}
              className="w-full sm:w-auto"
            >
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}