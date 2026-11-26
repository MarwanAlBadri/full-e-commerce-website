import gamepad from "../assets/home/p-gamepad.webp";
import keyboard from "../assets/home/p-keyboard.webp";
import monitor from "../assets/home/p-monitor.webp";
import chair from "../assets/home/p-chair.webp";
import coat from "../assets/home/p-coat.webp";
import gucciBag from "../assets/home/p-gucci-bag.webp";
import cpuCooler from "../assets/home/p-cpu-cooler.webp";
import bookshelf from "../assets/home/p-bookshelf.png";
import dogFood from "../assets/home/p-dog-food.webp";
import camera from "../assets/home/p-camera.webp";
import laptop from "../assets/home/p-laptop.webp";
import curology from "../assets/home/p-curology.webp";
import car from "../assets/home/p-car.webp";
import cleats from "../assets/home/p-cleats.webp";
import gamepad2 from "../assets/home/p-gamepad-2.webp";
import jacket from "../assets/home/p-jacket.webp";
import type { Product } from "../types/product";

export const PRODUCTS: Product[] = [
    {
        id: "havit-hv-g92-gamepad",
        name: "HAVIT HV-G92 Gamepad",
        description:
            "A wired USB gamepad with a comfortable rubber grip, responsive analog sticks and dual vibration motors. Plug and play on PC with no extra drivers.",
        categoryIds: ["gaming", "electronics"],
        price: 120,
        oldPrice: 160,
        discountPercent: 40,
        rating: 5,
        reviewCount: 88,
        images: [
            {
                src: gamepad,
                frame: [172, 152],
                crop: { w: 104.12, h: 117.44, left: -3.09, top: -17.44 },
            },
        ],
        colors: [
            { name: "Red", hex: "#db4444", inStock: true },
            { name: "Black", hex: "#000000", inStock: true },
        ],
        inStock: true,
        tags: ["flash-sale"],
    },
    {
        id: "ak-900-wired-keyboard",
        name: "AK-900 Wired Keyboard",
        description:
            "A full-size wired keyboard with rainbow backlighting, quiet keys and a spill-resistant body, built for long gaming and typing sessions.",
        categoryIds: ["computers", "gaming", "electronics"],
        price: 960,
        oldPrice: 1160,
        discountPercent: 35,
        rating: 4,
        reviewCount: 75,
        images: [
            {
                src: keyboard,
                frame: [191, 101],
                crop: { w: 110.35, h: 210.08, left: -2.97, top: -61.34 },
            },
        ],
        inStock: true,
        tags: ["flash-sale"],
    },
    {
        id: "ips-lcd-gaming-monitor",
        name: "IPS LCD Gaming Monitor",
        description:
            "A curved IPS display with a high refresh rate, vivid colours and wide viewing angles. Two HDMI inputs and a slim, sturdy stand.",
        categoryIds: ["computers", "gaming", "electronics"],
        price: 370,
        oldPrice: 400,
        discountPercent: 30,
        rating: 5,
        reviewCount: 99,
        images: [{ src: monitor, frame: [170, 129] }],
        inStock: true,
        tags: ["flash-sale"],
    },
    {
        id: "s-series-comfort-chair",
        name: "S-Series Comfort Chair",
        description:
            "A padded fabric chair on solid wooden legs. The curved backrest supports you at the dining table or the desk.",
        categoryIds: ["home-lifestyle"],
        price: 375,
        oldPrice: 400,
        discountPercent: 25,
        rating: 4.5,
        reviewCount: 99,
        images: [
            {
                src: chair,
                frame: [107, 180],
                crop: { w: 160.55, h: 119.67, left: -30.95, top: -11.28 },
            },
        ],
        inStock: true,
        tags: ["flash-sale"],
    },
    {
        id: "the-north-coat",
        name: "The north coat",
        description:
            "A weather-resistant hooded coat with a warm lining, zip pockets and an adjustable waist.",
        categoryIds: ["womens-fashion"],
        price: 260,
        oldPrice: 360,
        rating: 5,
        reviewCount: 65,
        images: [
            {
                src: coat,
                frame: [140, 146],
                crop: { w: 121.64, h: 116.23, left: -10.69, top: -5.19 },
            },
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        tags: ["best-selling"],
    },
    {
        id: "gucci-duffle-bag",
        name: "Gucci duffle bag",
        description:
            "A medium duffle bag in coated canvas with leather trim, a striped band and a removable shoulder strap.",
        categoryIds: ["womens-fashion", "mens-fashion"],
        price: 960,
        oldPrice: 1160,
        rating: 4.5,
        reviewCount: 65,
        images: [
            {
                src: gucciBag,
                frame: [178, 129],
                crop: { w: 106.9, h: 146.38, left: -3.5, top: -23.51 },
            },
        ],
        inStock: true,
        tags: ["best-selling", "flash-sale"],
    },
    {
        id: "rgb-liquid-cpu-cooler",
        name: "RGB liquid CPU Cooler",
        description:
            "A dual-fan liquid cooler with addressable RGB lighting that keeps your processor quiet and cool under load.",
        categoryIds: ["computers", "electronics"],
        price: 160,
        oldPrice: 170,
        rating: 4.5,
        reviewCount: 65,
        images: [
            {
                src: cpuCooler,
                frame: [191, 95],
                crop: { w: 114.94, h: 232.56, left: -6.67, top: -71.63 },
            },
        ],
        inStock: true,
        tags: ["best-selling", "flash-sale"],
    },
    {
        id: "small-bookshelf",
        name: "Small BookSelf",
        description:
            "A compact wooden side shelf for books and decor, with angled legs that fit beside a sofa or bed.",
        categoryIds: ["home-lifestyle"],
        price: 360,
        rating: 5,
        reviewCount: 65,
        images: [{ src: bookshelf, frame: [140, 176] }],
        inStock: true,
        tags: ["best-selling"],
    },
    {
        id: "breed-dry-dog-food",
        name: "Breed Dry Dog Food",
        description:
            "Complete dry food for small-breed adult dogs with real beef flavour, vitamins and minerals.",
        categoryIds: ["groceries-pets"],
        price: 100,
        rating: 3,
        reviewCount: 35,
        images: [
            {
                src: dogFood,
                frame: [115, 180],
                crop: { w: 104.15, h: 102.46, left: -2.56, top: -0.82 },
            },
        ],
        inStock: true,
        tags: ["explore"],
    },
    {
        id: "canon-eos-dslr-camera",
        name: "CANON EOS DSLR Camera",
        description:
            "An easy-to-use DSLR with an 18-55mm lens, a built-in flash and Wi-Fi sharing for sharp photos and Full HD video.",
        categoryIds: ["camera", "electronics"],
        price: 360,
        rating: 4,
        reviewCount: 95,
        images: [
            {
                src: camera,
                frame: [146, 163],
                crop: { w: 130.89, h: 116.56, left: -15.18, top: -8.28 },
            },
        ],
        inStock: true,
        tags: ["explore"],
    },
    {
        id: "asus-fhd-gaming-laptop",
        name: "ASUS FHD Gaming Laptop",
        description:
            "A Full HD gaming laptop with dedicated graphics, fast SSD storage and a backlit keyboard.",
        categoryIds: ["computers", "gaming", "electronics"],
        price: 700,
        rating: 5,
        reviewCount: 325,
        images: [
            {
                src: laptop,
                frame: [172, 180],
                crop: { w: 145, h: 138.1, left: -22.5, top: -17.86 },
            },
        ],
        inStock: true,
        tags: ["explore"],
    },
    {
        id: "curology-product-set",
        name: "Curology Product Set",
        description:
            "A daily skincare set with a cleanser, a moisturiser and a treatment cream in one box.",
        categoryIds: ["health-beauty"],
        price: 500,
        rating: 4,
        reviewCount: 145,
        images: [{ src: curology, frame: [172, 159] }],
        inStock: true,
        tags: ["explore"],
    },
    {
        id: "kids-electric-car",
        name: "Kids Electric Car",
        description:
            "A licensed ride-on car with a rechargeable battery, working lights, music and a parental remote control.",
        categoryIds: ["babys-toys"],
        price: 960,
        rating: 5,
        reviewCount: 65,
        images: [
            { src: car, frame: [180, 133], crop: { w: 102.2, h: 137.17, left: -1.1, top: -16.68 } },
        ],
        colors: [
            { name: "Bright red", hex: "#fb1314", inStock: true },
            { name: "Coral red", hex: "#db4444", inStock: true },
        ],
        inStock: true,
        isNew: true,
        tags: ["explore"],
    },
    {
        id: "jr-zoom-soccer-cleats",
        name: "Jr. Zoom Soccer Cleats",
        description:
            "Lightweight junior football boots with a textured upper for control and studs for firm ground.",
        categoryIds: ["sports-outdoor", "mens-fashion"],
        price: 1160,
        rating: 5,
        reviewCount: 35,
        images: [
            {
                src: cleats,
                frame: [186, 164],
                crop: { w: 129.06, h: 146.6, left: -15.38, top: -27.67 },
            },
        ],
        colors: [
            { name: "Yellow", hex: "#eeff61", inStock: true },
            { name: "Red", hex: "#db4444", inStock: false },
        ],
        sizes: ["S", "M", "L"],
        inStock: true,
        tags: ["explore"],
    },
    {
        id: "gp11-shooter-usb-gamepad",
        name: "GP11 Shooter USB Gamepad",
        description:
            "A USB gamepad with textured grips, precise triggers and vibration feedback for PC and Android.",
        categoryIds: ["gaming", "electronics"],
        price: 660,
        rating: 4.5,
        reviewCount: 55,
        images: [
            {
                src: gamepad2,
                frame: [178, 150],
                crop: { w: 216.91, h: 144.77, left: -61.64, top: -27.35 },
            },
        ],
        colors: [
            { name: "Black", hex: "#000000", inStock: true },
            { name: "Red", hex: "#db4444", inStock: true },
        ],
        inStock: true,
        isNew: true,
        tags: ["explore"],
    },
    {
        id: "quilted-satin-jacket",
        name: "Quilted Satin Jacket",
        description:
            "A reversible quilted bomber jacket in satin with ribbed cuffs and two zip pockets.",
        categoryIds: ["mens-fashion"],
        price: 660,
        rating: 4.5,
        reviewCount: 55,
        images: [
            {
                src: jacket,
                frame: [182, 176],
                crop: { w: 133.78, h: 137.93, left: -16.89, top: -18.28 },
            },
        ],
        colors: [
            { name: "Dark green", hex: "#184a48", inStock: true },
            { name: "Red", hex: "#db4444", inStock: false },
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        tags: ["explore"],
    },
];
