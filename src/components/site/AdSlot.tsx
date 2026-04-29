export const AdSlot = ({ label = "Advertisement", className = "" }: { label?: string; className?: string }) => (
  <div className={`container-tool my-10 ${className}`}>
    <div className="mx-auto flex h-24 max-w-4xl items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
  </div>
);
