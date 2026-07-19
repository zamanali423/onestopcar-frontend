import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-[#E5E7EB]" />
        <div className="h-4 w-96 animate-pulse rounded-lg bg-[#E5E7EB]" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-[#E5E7EB]" />
                <div className="h-6 w-16 animate-pulse rounded-lg bg-[#E5E7EB]" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-24 animate-pulse rounded-lg bg-[#E5E7EB]" />
                <div className="h-8 w-20 animate-pulse rounded-lg bg-[#E5E7EB]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions Skeleton */}
      <Card>
        <CardHeader className="space-y-2">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-[#E5E7EB]" />
          <div className="h-4 w-56 animate-pulse rounded-lg bg-[#E5E7EB]" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl border border-[#E5E7EB] bg-[#F3F4F6]" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="space-y-2">
            <div className="h-6 w-40 animate-pulse rounded-lg bg-[#E5E7EB]" />
            <div className="h-4 w-48 animate-pulse rounded-lg bg-[#E5E7EB]" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] animate-pulse rounded-xl bg-[#F3F4F6]" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2">
            <div className="h-6 w-40 animate-pulse rounded-lg bg-[#E5E7EB]" />
            <div className="h-4 w-48 animate-pulse rounded-lg bg-[#E5E7EB]" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] animate-pulse rounded-xl bg-[#F3F4F6]" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="space-y-2">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-[#E5E7EB]" />
          <div className="h-4 w-48 animate-pulse rounded-lg bg-[#E5E7EB]" />
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse rounded-xl bg-[#F3F4F6]" />
        </CardContent>
      </Card>

      {/* Lists Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex items-center justify-between space-y-0">
              <div className="space-y-2">
                <div className="h-6 w-40 animate-pulse rounded-lg bg-[#E5E7EB]" />
                <div className="h-4 w-48 animate-pulse rounded-lg bg-[#E5E7EB]" />
              </div>
              <div className="h-8 w-20 animate-pulse rounded-lg bg-[#E5E7EB]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-[#E5E7EB]" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 animate-pulse rounded-lg bg-[#E5E7EB]" />
                        <div className="h-3 w-48 animate-pulse rounded-lg bg-[#E5E7EB]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-20 animate-pulse rounded-lg bg-[#E5E7EB]" />
                      <div className="h-3 w-24 animate-pulse rounded-lg bg-[#E5E7EB]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
