import CategorySidebar from '../components/home/CategorySidebar'
import HeroBanner from '../components/home/HeroBanner'
import FlashSales from '../components/home/FlashSales'
import BrowseByCategory from '../components/home/BrowseByCategory'
import BestSelling from '../components/home/BestSelling'
import PromoBanner from '../components/home/PromoBanner'
import ExploreProducts from '../components/home/ExploreProducts'
import NewArrival from '../components/home/NewArrival'
import Services from '../components/home/Services'

function Divider() {
  return <hr className="mx-auto w-[calc(100%-2rem)] max-w-[1170px] border-black/30" />
}

export default function Home() {
  return (
    <div className="pb-16 lg:pb-[140px]">
      <div className="mx-auto flex max-w-[1202px] px-4">
        <div className="hidden pt-10 pr-4 lg:block lg:border-r lg:border-black/30">
          <CategorySidebar />
        </div>
        <div className="min-w-0 flex-1 pt-10 lg:pl-[45px]">
          <HeroBanner />
        </div>
      </div>

      <div className="mt-16 lg:mt-[140px]">
        <FlashSales />
      </div>

      <div className="my-[60px]">
        <Divider />
      </div>

      <BrowseByCategory />

      <div className="my-[70px]">
        <Divider />
      </div>

      <BestSelling />

      <div className="mt-16 lg:mt-[140px]">
        <PromoBanner />
      </div>

      <div className="mt-16 lg:mt-[70px]">
        <ExploreProducts />
      </div>

      <div className="mt-16 lg:mt-[140px]">
        <NewArrival />
      </div>

      <div className="mt-16 lg:mt-[140px]">
        <Services />
      </div>
    </div>
  )
}
