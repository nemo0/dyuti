export default function Brief({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold mb-2">Brief</h2>
      <div className="text-slate-500 dark:text-slate-400 space-y-4">
        {children}
      </div>
    </section>
  )
}
