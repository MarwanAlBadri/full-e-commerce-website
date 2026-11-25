import chevronDown from '../../assets/icons/chevron-down.svg'

export default function TopHeader() {
  return (
    <div className="h-12 bg-black text-heading-white">
      <div className="mx-auto flex h-full max-w-[1170px] items-center justify-end gap-[231px] text-small">
        <p className="flex items-center gap-2">
          <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>
          <a href="#" className="font-semibold underline">
            ShopNow
          </a>
        </p>
        <button type="button" className="flex items-center gap-[5px]">
          English
          <img src={chevronDown} alt="" className="size-6" />
        </button>
      </div>
    </div>
  )
}
