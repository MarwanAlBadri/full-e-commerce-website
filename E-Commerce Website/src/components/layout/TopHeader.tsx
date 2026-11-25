import chevronDown from '../../assets/icons/chevron-down.svg'

export default function TopHeader() {
  return (
    <div className="min-h-12 bg-black py-2 text-heading-white">
      <div className="mx-auto flex max-w-[1202px] flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 text-small lg:justify-end xl:gap-x-[231px]">
        <p className="flex flex-wrap items-center justify-center gap-2 text-center">
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
