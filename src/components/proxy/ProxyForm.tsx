import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProxyFormProps {
  inputUrl: string;
  onInputChange: (value: string) => void;
  onGenerate: () => void;
}

export function ProxyForm({ inputUrl, onInputChange, onGenerate }: ProxyFormProps) {
  return (
    <Card className="w-full transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>Generate Proxy URLs</CardTitle>
        <CardDescription>
          Enter the URL you want to proxy and click generate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Enter URL (e.g., https://github.com/user/repo)"
            value={inputUrl}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={onGenerate}
            className="w-full sm:w-auto"
          >
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}