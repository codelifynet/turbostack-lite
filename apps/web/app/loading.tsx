export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Modern spinner - gradient animasyonlu */}
        <div className="relative">
          {/* Dış glow efekti */}
          <div className="absolute inset-0 h-20 w-20 rounded-full bg-primary/20 blur-xl animate-pulse" />

          {/* Ana spinner container */}
          <div className="relative">
            {/* Dış halka - arka plan */}
            <div className="h-20 w-20 rounded-full border-4 border-muted" />

            {/* İç spinner - gradient animasyonlu */}
            <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-primary border-r-primary/50 animate-spin" />

            {/* İç nokta - pulse efekti */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading metni - fade animasyonu */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Yükleniyor...
          </p>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
