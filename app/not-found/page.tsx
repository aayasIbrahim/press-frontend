import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home,  Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon & 404 Visual */}
        <div className="relative flex justify-center items-center">
          <div className="text-8xl font-extrabold text-muted-foreground/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-3 bg-muted rounded-full text-muted-foreground">
              <Search className="h-8 w-8" />
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>
        </div>

        {/* Action Buttons using shadcn/ui */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button  variant="default" className="w-full sm:w-auto">
            <Link href="/" className="inline-flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          {/* <Button  variant="outline" className="w-full sm:w-auto">
            <Link href="javascript:history.back()" className="inline-flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button> */}
        </div>
      </div>
    </div>
  );
}