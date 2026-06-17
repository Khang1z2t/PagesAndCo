interface LogoProps {
  variant?: 'dark' | 'gold'
  textColor?: string
  showText?: boolean
}

export function Logo({ variant = 'dark', textColor, showText = true }: LogoProps) {
  const circleColor = variant === 'gold' ? '#B8862A' : '#8B2E2E'
  const defaultText = variant === 'gold' ? '#ffffff' : '#1A1A1A'

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: circleColor }}
      >
        <span className="text-white font-serif font-bold text-lg">P</span>
      </div>
      {showText && (
        <span
          className="font-serif font-bold text-xl"
          style={{ color: textColor ?? defaultText }}
        >
          Pages &amp; Co.
        </span>
      )}
    </div>
  )
}