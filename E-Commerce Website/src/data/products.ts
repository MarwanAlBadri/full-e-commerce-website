import gamepad from '../assets/home/p-gamepad.png'
import keyboard from '../assets/home/p-keyboard.png'
import monitor from '../assets/home/p-monitor.png'
import chair from '../assets/home/p-chair.png'
import coat from '../assets/home/p-coat.png'
import gucciBag from '../assets/home/p-gucci-bag.png'
import cpuCooler from '../assets/home/p-cpu-cooler.png'
import bookshelf from '../assets/home/p-bookshelf.png'
import dogFood from '../assets/home/p-dog-food.png'
import camera from '../assets/home/p-camera.png'
import laptop from '../assets/home/p-laptop.png'
import curology from '../assets/home/p-curology.png'
import car from '../assets/home/p-car.png'
import cleats from '../assets/home/p-cleats.png'
import gamepad2 from '../assets/home/p-gamepad-2.png'
import jacket from '../assets/home/p-jacket.png'
import colorsA from '../assets/icons/colors-a.svg'
import colorsB from '../assets/icons/colors-b.svg'
import colorsC from '../assets/icons/colors-c.svg'
import colorsD from '../assets/icons/colors-d.svg'

/** Percentages describing how the source photo is cropped inside its frame (taken from Figma). */
export interface Crop {
  w: number
  h: number
  left: number
  top: number
}

export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  discount?: number
  rating: 3 | 4 | 4.5 | 5
  reviews: number
  image: string
  /** Visible photo frame in px, centred inside the 250px card image area. */
  frame: [width: number, height: number]
  crop?: Crop
  isNew?: boolean
  colors?: string
}

export const flashSaleProducts: Product[] = [
  {
    id: 'havit-gamepad',
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 5,
    reviews: 88,
    image: gamepad,
    frame: [172, 152],
    crop: { w: 104.12, h: 117.44, left: -3.09, top: -17.44 },
  },
  {
    id: 'ak-900-keyboard',
    name: 'AK-900 Wired Keyboard',
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
    image: keyboard,
    frame: [191, 101],
    crop: { w: 110.35, h: 210.08, left: -2.97, top: -61.34 },
  },
  {
    id: 'ips-monitor',
    name: 'IPS LCD Gaming Monitor',
    price: 370,
    oldPrice: 400,
    discount: 30,
    rating: 5,
    reviews: 99,
    image: monitor,
    frame: [170, 129],
  },
  ...[1, 2, 3].map(
    (n): Product => ({
      id: `s-series-chair-${n}`,
      name: 'S-Series Comfort Chair',
      price: 375,
      oldPrice: 400,
      discount: 25,
      rating: 4.5,
      reviews: 99,
      image: chair,
      frame: [107, 180],
      crop: { w: 160.55, h: 119.67, left: -30.95, top: -11.28 },
    }),
  ),
]

export const bestSellingProducts: Product[] = [
  {
    id: 'north-coat',
    name: 'The north coat',
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65,
    image: coat,
    frame: [140, 146],
    crop: { w: 121.64, h: 116.23, left: -10.69, top: -5.19 },
  },
  {
    id: 'gucci-duffle-bag',
    name: 'Gucci duffle bag',
    price: 960,
    oldPrice: 1160,
    rating: 4.5,
    reviews: 65,
    image: gucciBag,
    frame: [178, 129],
    crop: { w: 106.9, h: 146.38, left: -3.5, top: -23.51 },
  },
  {
    id: 'rgb-cpu-cooler',
    name: 'RGB liquid CPU Cooler',
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    reviews: 65,
    image: cpuCooler,
    frame: [191, 95],
    crop: { w: 114.94, h: 232.56, left: -6.67, top: -71.63 },
  },
  {
    id: 'small-bookshelf',
    name: 'Small BookSelf',
    price: 360,
    rating: 5,
    reviews: 65,
    image: bookshelf,
    frame: [140, 176],
  },
]

export const exploreProducts: Product[] = [
  {
    id: 'breed-dog-food',
    name: 'Breed Dry Dog Food',
    price: 100,
    rating: 3,
    reviews: 35,
    image: dogFood,
    frame: [115, 180],
    crop: { w: 104.15, h: 102.46, left: -2.56, top: -0.82 },
  },
  {
    id: 'canon-dslr',
    name: 'CANON EOS DSLR Camera',
    price: 360,
    rating: 4,
    reviews: 95,
    image: camera,
    frame: [146, 163],
    crop: { w: 130.89, h: 116.56, left: -15.18, top: -8.28 },
  },
  {
    id: 'asus-laptop',
    name: 'ASUS FHD Gaming Laptop',
    price: 700,
    rating: 5,
    reviews: 325,
    image: laptop,
    frame: [172, 180],
    crop: { w: 145, h: 138.1, left: -22.5, top: -17.86 },
  },
  {
    id: 'curology-set',
    name: 'Curology Product Set',
    price: 500,
    rating: 4,
    reviews: 145,
    image: curology,
    frame: [172, 159],
  },
  {
    id: 'kids-electric-car',
    name: 'Kids Electric Car',
    price: 960,
    rating: 5,
    reviews: 65,
    image: car,
    frame: [180, 133],
    crop: { w: 102.2, h: 137.17, left: -1.1, top: -16.68 },
    isNew: true,
    colors: colorsD,
  },
  {
    id: 'zoom-soccer-cleats',
    name: 'Jr. Zoom Soccer Cleats',
    price: 1160,
    rating: 5,
    reviews: 35,
    image: cleats,
    frame: [186, 164],
    crop: { w: 129.06, h: 146.6, left: -15.38, top: -27.67 },
    colors: colorsA,
  },
  {
    id: 'gp11-gamepad',
    name: 'GP11 Shooter USB Gamepad',
    price: 660,
    rating: 4.5,
    reviews: 55,
    image: gamepad2,
    frame: [178, 150],
    crop: { w: 216.91, h: 144.77, left: -61.64, top: -27.35 },
    isNew: true,
    colors: colorsB,
  },
  {
    id: 'quilted-satin-jacket',
    name: 'Quilted Satin Jacket',
    price: 660,
    rating: 4.5,
    reviews: 55,
    image: jacket,
    frame: [182, 176],
    crop: { w: 133.78, h: 137.93, left: -16.89, top: -18.28 },
    colors: colorsC,
  },
]
