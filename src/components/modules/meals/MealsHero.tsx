export function MealsHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-primary/10 via-primary/5 to-background py-12 px-4 sm:px-6 lg:px-8 border-b">
      <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:mask-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Explore Our Delicious Meals
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a wide variety of delicious meals from our trusted
            providers
          </p>
        </div>
      </div>
    </section>
  );
}
