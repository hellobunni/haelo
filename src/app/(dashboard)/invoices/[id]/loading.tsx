// app/(portal)/invoices/[id]/loading.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Card>
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="border-t pt-6">
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="border-t pt-6 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
