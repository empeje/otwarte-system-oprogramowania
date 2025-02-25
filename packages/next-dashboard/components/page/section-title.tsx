'use client'

export default function SectionTitle({title}: { title: string }) {
  return (
    <div className="text-[16px] leading-[20px] font-semibold mb-[22px] sm:mb-[20px] text-[#343C6A]">
      {title}
    </div>
  )
}