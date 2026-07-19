"use client"
export function AnnouncementBar() {
    const msg = "Pakistan's Only Exclusive Premier Auto Store";
    return (
        <div className="w-full bg-primary text-dark text-[11px] sm:text-xs font-semibold overflow-hidden">
            <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] py-1.5">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="px-6">{msg}</span>
                ))}
            </div>
            <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}