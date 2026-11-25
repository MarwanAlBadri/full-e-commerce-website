import { Link } from 'react-router-dom'
import SectionHeader from '../ui/SectionHeader'
import ps5 from '../../assets/home/na-ps5.png'
import echo from '../../assets/home/na-echo.png'
import perfume from '../../assets/home/na-perfume.png'
import glowSpeakers from '../../assets/home/na-glow-1.svg'
import glowPerfume from '../../assets/home/na-glow-2.svg'

function ShopNow({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`w-fit border-b border-white text-mid leading-6 font-medium text-white ${className}`}
    >
      Shop Now
    </Link>
  )
}

function CardText({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-4 text-heading-white">
      <h3 className="font-inter text-xxl leading-6 font-semibold tracking-[0.72px]">{title}</h3>
      <p className="max-w-[255px] text-small leading-[21px]">{description}</p>
    </div>
  )
}

export default function NewArrival() {
  return (
    <section className="mx-auto max-w-[1202px] px-4">
      <SectionHeader label="Featured" title="New Arrival" />

      <div className="mt-[60px] grid gap-[30px] lg:grid-cols-2">
        {/* PlayStation 5 */}
        <article className="relative h-[600px] overflow-clip rounded bg-black">
          <div className="absolute top-[89px] left-1/2 size-[min(511px,90%)] -translate-x-1/2 overflow-hidden lg:left-[29px] lg:translate-x-0">
            <img
              src={ps5}
              alt="PlayStation 5 consoles"
              className="absolute h-[106.26%] w-[134.69%] max-w-none"
              style={{ left: '-20.41%', top: '-6.19%' }}
            />
          </div>
          <div className="absolute bottom-6 left-8 flex flex-col gap-4">
            <CardText title="PlayStation 5" description="Black and White version of the PS5 coming out on sale." />
            <ShopNow />
          </div>
        </article>

        <div className="flex flex-col gap-8">
          {/* Women's collections */}
          <article className="relative flex min-h-[284px] flex-col justify-center gap-4 rounded bg-[#0d0d0d] px-6 py-6">
            <CardText title="Women’s Collections" description="Featured woman collections that give you another vibe." />
            <ShopNow />
          </article>

          <div className="grid gap-[30px] sm:grid-cols-2">
            {/* Speakers */}
            <article className="relative h-[284px] overflow-clip rounded bg-black">
              <span className="absolute top-1/2 left-1/2 size-[196px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                <img src={glowSpeakers} alt="" className="absolute inset-[-153.06%] size-[406%] max-w-none" />
              </span>
              <div className="absolute top-[31px] left-[30px] h-[222px] w-[210px] overflow-clip">
                <img
                  src={echo}
                  alt="Amazon Echo speakers"
                  className="absolute top-[calc(50%-0.5px)] left-1/2 h-[221px] w-[190px] max-w-none -translate-x-1/2 -translate-y-1/2 object-bottom"
                />
              </div>
              <div className="absolute top-[175px] left-6 flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-heading-white">
                  <h3 className="font-inter text-xxl leading-6 font-semibold tracking-[0.72px]">Speakers</h3>
                  <p className="text-small leading-[21px]">Amazon wireless speakers</p>
                </div>
                <ShopNow />
              </div>
            </article>

            {/* Perfume */}
            <article className="relative h-[284px] overflow-clip rounded bg-black">
              <span className="absolute top-1/2 left-1/2 size-[238px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                <img src={glowPerfume} alt="" className="absolute inset-[-126.05%] size-[352%] max-w-none" />
              </span>
              <div className="absolute top-[calc(50%-1px)] left-1/2 h-[222px] w-[210px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
                <img
                  src={perfume}
                  alt="Gucci Intense Oud perfume"
                  className="absolute top-[calc(50%-1.5px)] left-[calc(50%-0.5px)] h-[203px] w-[201px] max-w-none -translate-x-1/2 -translate-y-1/2 object-bottom"
                />
              </div>
              <div className="absolute top-[175px] left-6 flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-heading-white">
                  <h3 className="font-inter text-xxl leading-6 font-semibold tracking-[0.72px]">Perfume</h3>
                  <p className="text-small leading-[21px]">GUCCI INTENSE OUD EDP</p>
                </div>
                <ShopNow />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
