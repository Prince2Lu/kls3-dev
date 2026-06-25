import {
  largeCardDecorStyle,
  largeCardDescStyle,
  largeCardTitleStyle,
} from '@/lib/cardTypography'
import { type ResultItem } from '@/lib/types/kls3'

interface ResultCardProps {
  result: ResultItem
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div
      className="result-card h-full bg-[#111111] border-[0.5px] border-[rgba(255,255,255,0.07)] rounded-[14px] transition-colors duration-200 hover:border-[rgba(75,123,245,0.35)] flex flex-col px-5 py-6 md:px-7 md:py-8"
    >
      <span className="font-display" style={largeCardDecorStyle}>
        {result.symbol}
      </span>
      <h3 className="font-display" style={largeCardTitleStyle}>
        {result.title}
      </h3>
      <p style={largeCardDescStyle}>{result.description}</p>
    </div>
  )
}
