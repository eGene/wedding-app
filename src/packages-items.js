import arbor2Image from '../assets/img/arbor2.png';
import arbor2ImageSmall from '../assets/img/arbor2-small.png';
import arbor4Image from '../assets/img/arbor4.png';
import arbor4ImageSmall from '../assets/img/arbor4-small.png';

const FOOD_ITEMS = [
  {
    category: "hot appetizers",
    description: "per 100 pieces, minimum 50 pieces per order",
    items: [
      {
        id: 1,
        description: "Bacon wrapper mahi-mahi (per 100 pieces)",
        includedIn: [],
        price: 450,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/c/c3/Ono_Hawaiian_BBQ_mahi-mahi.JPG"
      },
      {
        id: 2,
        description: "Bacon wrapper scallops (per 100 pieces)",
        includedIn: [],
        price: 400,
        image: ""
      },
      {
        id: 3,
        description: "Bacon wrapper shrimp (per 100 pieces)",
        includedIn: [],
        price: 350,
        image: ""
      },
      {
        id: 4,
        description: "Coconut shrimp (per 100 pieces)",
        includedIn: [],
        price: 325,
        image: ""
      },
      {
        id: 5,
        description: "Mini crab cakes",
        includedIn: [],
        price: 375,
        image: ""
      },
      {
        id: 6,
        description: "Stuffed mushrooms",
        includedIn: [],
        price: 300,
        image: ""
      },
      {
        id: 7,
        description: "Buffalo wings",
        includedIn: [],
        price: 225,
        image: ""
      },
      {
        id: 8,
        description: "Egg rolls",
        includedIn: [],
        price: 350,
        image: ""
      },
      {
        id: 9,
        description: "Pow pow shrimp or grouper bites",
        includedIn: [],
        pricePerItem: 7,
        minItems: 50,
        maxItems: 500,
        step: 50,
        count: 50,
        image: ""
      },
      {
        id: 10,
        description: "Spinach Artichoke Dip",
        includedIn: [],
        pricePerItem: 6,
        minItems: 50,
        maxItems: 500,
        step: 50,
        count: 50,
        image: ""
      },
      {
        id: 11,
        description: "Shrimp and crab cheese dip",
        includedIn: [],
        pricePerItem: 7,
        minItems: 50,
        maxItems: 500,
        step: 50,
        count: 50,
        image: ""
      },
      {
        id: 12,
        description: "Taco bar",
        includedIn: [],
        pricePerItem: 7,
        minItems: 50,
        maxItems: 500,
        step: 50,
        count: 50,
        image: ""
      }
    ]
  },
  {
    category: "cold appetizers",
    description: "per 100 pieces, minimum 50 pieces per order",
    items: [
      {
        id: 13,
        description: "Coctail shrimp",
        includedIn: [],
        price: 275,
        image:
          "https://cdn.pixabay.com/photo/2016/09/14/20/46/shrimp-cocktail-1670404__340.jpg"
      },
      {
        id: 14,
        description: "Peel n' eat shrimp (small, 25 people)",
        includedIn: [],
        price: 200,
        image: ""
      },
      {
        id: 15,
        description: "Peel n' eat shrimp (medium, 50 people)",
        includedIn: [],
        price: 350,
        image: ""
      },
      {
        id: 16,
        description: "Peel n' eat shrimp (large, 100 people)",
        includedIn: [],
        price: 600,
        image: ""
      }
    ]
  }
];

export const ITEMS = {
  venue: { title: "Beachside ceremony venue", price: 250.0 },
  extraReceptionGuest: {
    title: 'Additional reception guest',
    description: 'includes: table, chair, tablecloth, linen napkins, charger plates, dinnerware and silverware',
    pricePerItem: 15,
    units: ['guest', 'guests'],
    minCount: 1,
    count: 1,
    maxCount: 80,
  },
  arbor2: {
    title: "Elegant 2-post arbor with white draping",
    price: 150.0,
    excludes: ["arbor4"],
    image: arbor2Image,
    thumb: arbor2ImageSmall,
  },
  arbor4: {
    title: "4-post arbor",
    price: 150,
    excludes: ["arbor2"],
    image: arbor4Image,
    thumb: arbor4ImageSmall,
  },
  arborDraping: {
    title: "Complimentary arbor draping of accent color",
    price: 70.0
  },
  arborFlower: {
    title: "Arbor silk flower arrangement",
    price: 50.0
  },
  ceremonyTable: { title: "Sand ceremony table", price: 35.0 },
  lanterns: { title: "6 decorative lanterns", price: 60.0 },
  beachChairs: { title: "White folding chairs", pricePerItem: 8.0, units: ['chair', 'chairs'] },
  aisle: { title: "Raked sand aisle", price: 30.0 },
  beachAccess: { title: "Beach access fee", price: 0 },
  setup: { title: "Setup, breakdown, and clean-up", price: 100.0 },
  contact: {
    title: "Unlimited phone calls, emails",
    price: 0
  },
  consultation: {
    title: "Consultation to plan your event",
    price: 0
  },
  reception: {
    title: "Reception venue with gulf view",
    description: "per hour",
    units: ['hour', 'hours'],
    pricePerItem: 150.0,
    minCount: 1,
    count: 2,
    maxCount: 8
  },
  changingRoom: {
    title: "Private changing room for the bride",
    description: "$100 / hour",
    units: ['hour', 'hours'],
    pricePerItem: 100.0,
    minCount: 1,
    count: 1,
    maxCount: 8
  },
  coordinator: { title: "On-site coordinator", price: 0 },
  receptionTablesAndChairs: {
    title: 'Tables and chairs',
    price: 0,
  },
  receptionTables: {
    title: "Tables",
    units: ['table', 'tables'],
    pricePerItem: 0,
    count: 0,
    minCount: 0,
    maxCount: 20
  },
  receptionChairs: {
    title: "Chairs (guests)",
    units: ['chair', 'chairs'],
    pricePerItem: 15,
    count: 0,
    minCount: 0,
    maxCount: 120
  },
  whiteTablecloths: {
    title: "White tablecloths",
    description: "per each",
    units: ['item', 'items'],
    pricePerItem: 18.0,
    count: 0,
    minCount: 0,
    maxCount: 20
    // dependsOn: "receptionTables"
  },
  tableSkirts: {
    title: "Table skirts",
    description: "per each",
    units: ['item', 'items'],
    pricePerItem: 23.0,
    count: 0,
    minCount: 0,
    maxCount: 20
    // dependsOn: "receptionTables"
  },
  linenNapkinsWhite: {
    title: "White linen napkins",
    pricePerItem: 0.0,
    units: ['napkin', 'napkins'],
    count: 0,
    minCount: 0,
    maxCount: 120
    // dependsOn: "receptionChairs"
  },
  linenNapkinsColors: {
    title: "Linen napkins of accent color",
    description: "$1 / each",
    units: ['napkin', 'napkins'],
    pricePerItem: 1.0,
    count: 0,
    minCount: 0,
    maxCount: 120
    // dependsOn: "receptionChairs"
  },
  basicCenterpieces: { title: "Choice of basic centerpieces", price: 12.0 },
  platesAndStuff: {
    title: "Charger plates, dinnerware, and siverware",
    units: ['item', 'items'],
    pricePerItem: 3.0,
    count: 0,
    minCount: 0,
    maxCount: 120
    // dependsOn: "receptionChairs"
  },
  welcomeSign: {
    title: "Personalized wedding welcome sign",
    price: 35.0
  },
  bar: {
    title: "Private bar with one bartender",
    description: "2 hours included",
    units: ['hour', 'hours'],
    pricePerItem: 75.0,
    count: 2,
    minCount: 2,
    maxCount: 8
  },
  sweetheartTables: {
    title: "Decorated sweetheart table",
    description:
      "table skirt, tablecloth, table runner, sweetheart centerpiece, wedding tableware, champagne flutes, LED candles, Mr & Mrs sign, Pottery Barn Exclusive Dinner Chairs",
    price: 147.0
  },
  cakeTable: {
    title: "Decorated cake table",
    description: "table skirt, table linen, LED candles, silk greenery, illuminated backdrop with white draping and flower garland, cake stand, cake serving set, cake plates and utencils",
    price: 275.0
  },
  buffetTable: {
    title: "Decorated buffet station and chafer dishes",
    description: "table skirts, tablecloth, LED candles, silk greenery",
    price: 0
  },
  guestBook: {
    title: "Decorated guest book table",
    description: "table skirt, tablecloth, card box, lanterns, silk flower arrangements, illuminated LOVE sign and other décor",
    price: 70.0,
  },
  decoratedCeiling: { title: "Decorated ceiling with garden lights", price: 0 },
  tv: { title: "TV screen with wedding pictures of your choice", price: 0 },
  music: { title: "Music on the beach", price: 250 },
  sound: { title: '4D sound system and microphone' },
  bathrooms: { title: 'Private bathrooms, elevator' },
  roomRate: { title: "Hotel group room rates", price: 0 },
  dinner: { title: "Menu tasting for two", price: 45.0 },
  beachChairSashes: {
    title: "Beach chair sashes",
    units: ['sash', 'sashes'],
    pricePerItem: 2.5,
    count: 0,
    minCount: 0,
    maxCount: 80
    // dependsOn: "chairs"
  },
  receptionChairSashes: {
    title: "Reception chair sashes",
    units: ['sash', 'sashes'],
    pricePerItem: 2.5,
    count: 0,
    minCount: 0,
    maxCount: 120
    // dependsOn: "receptionChairs"
  },
  hooks: {
    title: "10 shepherd hooks with hanging jars filled with flowers",
    price: 75.0
  },
  shoeStation: { title: "Valet shoe station", price: 50.0 },
  fruitWater: { title: "Fruit infused water for your guests", price: 80.0 },
  waterStation: {
    title: "Water station",
    description: "$35 + $1 / bottle",
    units: ['bottle', 'bottles'],
    basePrice: 35,
    pricePerItem: 1,
    minCount: 1,
    count: 20,
    maxCount: 200
  },
  champagne: {
    title: 'Champagne and appetizer',
    price: 0,
  },
  champagneToast: {
    title: "Champagne toast",
    description: "$35 + $19 / bottle",
    units: ['bottle', 'bottles'],
    pricePerItem: 19,
    minCount: 1,
    count: 1,
    maxCount: 20,
    basePrice: 35
  },
  officiant: { title: "Officiant", price: 350.0 },
  tableRunners: { title: "Table runners of accent color", price: 70.0 },
  upgradedCenterpieces: {
    title: "Upgraded centerpieces with fresh flowers",
    price: 200.0
  },
  mimosaBar: { title: "Mimosa bar 1 gallon", price: 95.0 },
  uplighting: { title: "Uplighting package", price: 150 },
  buffetServers: { title: "Servers for the buffet station", price: 250 },
  extraHour: {
    title: "Additional hour of the celebration",
    description: '$300 / hour',
    pricePerItem: 300,
    minCount: 1,
    maxCount: 4,
  }
};

let order = 0;

const getItem = (id, startOrder) => {
  if (startOrder !== undefined) {
    order = startOrder;
  }
  const item = { id, ...ITEMS[id], order };
  order++;
  return item;
};

export const PRIVATE_ROOM = {
  privateRoomRental: {
    title: 'Private Room',
    price: 350,
    items: [
      { ...getItem("venue", 0), title: 'Private venue with gulf view for 2 hours', description: 'from 10 am till 10 pm' },
      { ...getItem("receptionTablesAndChairs"), description: '' },
      { ...getItem("platesAndStuff"), title: 'Dinnerware and Silverware', description: '', pricePerItem: undefined, price: 0, count: undefined },
      { ...getItem("tv") },
      { ...getItem("sound") },
      { ...getItem("decoratedCeiling") },
      { ...getItem("bathrooms") },
    ],
    addons: [
      { ...getItem("extraHour"), title: 'Additional hour stay', description: '$150 / hour', count: 1, pricePerItem: 150 },
      { ...getItem("extraHour"), id: 'extraHour-2', title: 'Additional hour stay after 10 pm', count: 1 },
      { ...getItem("changingRoom") },
      { ...getItem("bar"), title: "Private bar with one bartender for 2 hours", description: '', pricePerItem: 75 / 2, count: 2, minCount: 2, step: 1 },
      { ...getItem("whiteTablecloths"), minCount: 1, count: 1 },
      { ...getItem("tableSkirts"), minCount: 1, count: 1 },
      { ...getItem("platesAndStuff"), minCount: 1, count: 1 },
      { ...getItem("basicCenterpieces"), price: 14.0 },
      { ...getItem("receptionChairSashes"), minCount: 1, count: 1 },
      { ...getItem("tableRunners"), minCount: 1, maxCount: 20, pricePerItem: 10.0, count: 1, price: undefined },
      { ...getItem("linenNapkinsWhite"), pricePerItem: 1, minCount: 1, count: 1 },
      // { ...getItem("uplighting") },
      { ...getItem("buffetServers") },
    ],
  },
};

export const CEREMONY_PACKAGES = {
  beforeSunset: {
    title: "Before Sunset",
    price: 530,
    items: [
      { ...getItem("venue", 0) },
      { ...getItem("arbor2") },
      { ...getItem("arborFlower") },
      { ...getItem("aisle") },
      { ...getItem("beachAccess") },
      { ...getItem("setup"), id: 'setupCeremony' },
      { ...getItem("contact"), id: 'contactCeremony' },
      { ...getItem("consultation"), id: 'consultationCeremony' },
      {
        ...getItem("beachChairs", 10),
        description: "",
        inPlanText: 0,
        count: undefined,
        pricePerItem: undefined,
      },
    ],
    addons: [
      { ...getItem("arbor4", 0) },
      { ...getItem("arborDraping") },
      { ...getItem("ceremonyTable") },
      { ...getItem("lanterns") },
      { ...getItem("hooks") },
      { ...getItem("shoeStation") },
      { ...getItem("waterStation") },
      { ...getItem("champagneToast") },
      { ...getItem("changingRoom") },
      { ...getItem("music") }
    ]
  },
  happilyEverAfter: {
    title: "Happily Ever After",
    price: 750,
    items: [
      { ...getItem("venue", 0) },
      { ...getItem("arbor2") },
      { ...getItem("arborFlower") },
      { ...getItem("aisle") },
      { ...getItem("beachAccess") },
      { ...getItem("setup"), id: 'setupCeremony' },
      { ...getItem("contact"), id: 'contactCeremony' },
      { ...getItem("consultation"), id: 'consultationCeremony' },
      { ...getItem("ceremonyTable") },
      {
        ...getItem("beachChairs", 10),
        description: "",
        inPlanText: '20',
        count: 20,
        pricePerItem: undefined,
        price: 0,
      },
    ],
    addons: [
      { ...getItem("arbor4", 0) },
      { ...getItem("arborDraping") },
      {
        ...getItem("beachChairs"),
        title: 'Additional white folding chairs',
        description: "$8 / chair",
        count: 0,
        minCount: 0,
        maxCount: 80
      },
      {
        ...getItem("beachChairSashes"),
        description: '$2.50 / each',
        count: 0,
        minCount: 0,
        maxCount: 80
      },
      { ...getItem("lanterns") },
      { ...getItem("hooks") },
      { ...getItem("shoeStation") },
      { ...getItem("waterStation") },
      { ...getItem("champagneToast") },
      { ...getItem("changingRoom") },
      { ...getItem("music") }
    ]
  }
};

export const RECEPTION_PACKAGES = {
  tieTheKnot: {
    title: "Tie The Knot",
    price: 1800,
    items: [
      {
        ...getItem("reception", 0),
        title: "Reception venue with gulf view for 4 hours",
        description: 'from 10 am till 10 pm',
        pricePerItem: undefined,
        count: undefined,
      },
      { ...getItem("receptionTablesAndChairs"), description: 'up to 50 guests' },
      { ...getItem("linenNapkinsWhite"), description: 'up to 50 guests', price: 0, pricePerItem: undefined, count: undefined },
      { ...getItem("platesAndStuff"), description: 'up to 50 guests', pricePerItem: undefined, price: 0, count: undefined },
      { ...getItem("basicCenterpieces") },
      { ...getItem("welcomeSign") },
      { ...getItem("bar"), title: "Private bar with one bartender for 4 hours", description: '', pricePerItem: undefined, count: undefined },
      { ...getItem("sweetheartTables") },
      { ...getItem("cakeTable") },
      { ...getItem("guestBook") },
      { ...getItem("buffetTable") },
      { ...getItem("decoratedCeiling") },
      { ...getItem("sound") },
      { ...getItem("tv") },
      { ...getItem("bathrooms") },
      { ...getItem("setup"), id: 'setupReception' },
      { ...getItem("contact"), id: 'contactReception' },
      { ...getItem("consultation"), id: 'consultationReception' },
    ],
    addons: [
      { ...getItem("extraReceptionGuest", 0), maxCount: 70 },
      { ...getItem("changingRoom") },
      { ...getItem("bar"), title: 'Additional bartender for 4 hours', description: '$150 / bartender', pricePerItem: 150, units: ['bartender', 'bartenders'], count: 1, minCount: 1, maxCount: 4 },
      { ...getItem("receptionChairSashes"), description: '$2.50 / each' },
      { ...getItem("tableRunners"), description: '$10 / table', price: undefined, pricePerItem: 10, count: 0, minCount: 0, maxCount: 50 },
      { ...getItem("linenNapkinsColors"), count: 0, minCount: 0 },
      // { ...getItem("uplighting") },
      { ...getItem("buffetServers") },
      { ...getItem("extraHour"), count: 1 }
    ]
  }
};

export const COMBINED_PACKAGES = {
  loveStory: {
    title: "Love Story",
    price: 2900,
    items: [
      {
        category: 'Ceremony',
        description: '',
        items: [
          { ...getItem("venue", 0) },
          { ...getItem("arbor2"), price: 0 },
          {
            ...getItem("beachChairs", 3),
            inPlanText: '40',
            description: "",
            count: undefined,
            pricePerItem: undefined,
            price: 0,
          },
          { ...getItem("arborFlower", 20), price: 0 },
          { ...getItem("ceremonyTable"), price: 0 },
          { ...getItem("aisle"), price: 0 },
          { ...getItem("beachAccess") },
          { ...getItem("setup"), price: 0, id: 'setupCeremony' },
          { ...getItem("contact"), id: 'contactCeremony' },
          { ...getItem("consultation"), id: 'consultationCeremony' },
          { ...getItem("changingRoom"), description: '2 hours', price: 0, pricePerItem: undefined, count: undefined },
          { ...getItem("champagne") },
        ]
      },
      {
        category: 'Reception',
        description: '',
        items: [
          {
            ...getItem("reception", 0),
            title: 'Reception venue with gulf view for 4 hours',
            description: 'from 10 am till 10 pm',
            count: undefined,
            pricePerItem: undefined,
            price: 0,
          },
          { ...getItem("receptionTablesAndChairs"), description: '' },
          { ...getItem("whiteTablecloths"), description: '', count: undefined, pricePerItem: undefined, price: 0 },
          { ...getItem("linenNapkinsWhite", 4), description: '', price: 0, pricePerItem: undefined, count: undefined },
          { ...getItem("platesAndStuff", 6), price: 0, pricePerItem: undefined, count: undefined },
          { ...getItem("basicCenterpieces"), price: 0 },
          { ...getItem("welcomeSign"), price: 0 },
          { ...getItem("bar"), description: '', price: 0, count: undefined, pricePerItem: undefined },
          { ...getItem("coordinator"), id: 'coordinatorReception' },
          { ...getItem("sweetheartTables"), price: 0 },
          { ...getItem("cakeTable"), price: 0 },
          { ...getItem("guestBook"), price: 0 },
          { ...getItem("buffetTable") },
          { ...getItem("decoratedCeiling") },
          { ...getItem("sound") },
          { ...getItem("tv") },
          { ...getItem("dinner"), price: 0 },
          { ...getItem("roomRate") },
          { ...getItem("bathrooms") },
          { ...getItem("setup"), price: 0, id: 'setupReception' },
          { ...getItem("contact"), id: 'contactReception' },
          { ...getItem("consultation"), id: 'consultationReception' },
        ],
      }
    ],
    addons: [
      { ...getItem("arbor4", 0) },
      { ...getItem("arborDraping") },
      { ...getItem("lanterns") },
      {
        ...getItem("beachChairs"),
        title: 'Additional white folding chairs',
        description: "$8 / chair",
        count: 0,
        minCount: 0,
        maxCount: 80
      },
      { ...getItem("beachChairSashes"), description: '$2.50 / each' },
      { ...getItem("hooks") },
      { ...getItem("shoeStation") },
      { ...getItem("waterStation") },
      { ...getItem("champagneToast") },
      { ...getItem("changingRoom"), description: '$100 / hour', count: 1, minCount: 1, maxCount: 4 },
      { ...getItem("music") },
      { ...getItem("extraReceptionGuest"), maxCount: 80 },
      { ...getItem("bar"), title: 'Additional bartender for 4 hours', description: '$150 / bartender', pricePerItem: 150, units: ['bartender', 'bartenders'], count: 1, minCount: 1, maxCount: 4 },
      { ...getItem("receptionChairSashes"), description: '$2.50 / each' },
      { ...getItem("tableRunners"), description: '$10 / table', price: undefined, pricePerItem: 10, count: 0, minCount: 0, maxCount: 50 },
      { ...getItem("linenNapkinsColors") },
      // { ...getItem("uplighting") },
      { ...getItem("buffetServers") },
      { ...getItem("extraHour"), count: 1 }
    ]
  },
  dreamsComeTrue: {
    title: "Dreams Come True",
    price: 4200,
    items: [
      {
        category: 'Ceremony',
        description: '',
        items: [
          { ...getItem("venue", 0) },
          { ...getItem("arbor2"), price: 0 },
          { ...getItem("arborDraping"), price: 0 },
          {
            ...getItem("beachChairs"),
            description: "",
            inPlanText: '50',
            count: undefined,
            pricePerItem: undefined,
            price: 0,
          },
          { ...getItem("beachChairSashes"), pricePerItem: undefined, count: undefined },
          { ...getItem("lanterns"), price: 0 },
          { ...getItem("hooks"), price: 0 },
          { ...getItem("shoeStation"), price: 0 },
          { ...getItem("fruitWater"), price: 0 },
          { ...getItem("officiant"), price: 0 },
          { ...getItem("arborFlower"), price: 0 },
          { ...getItem("ceremonyTable"), price: 0 },
          { ...getItem("aisle"), price: 0 },
          { ...getItem("beachAccess") },
          { ...getItem("setup"), price: 0, id: 'setupCeremony' },
          { ...getItem("contact"), id: 'contactCeremony' },
          { ...getItem("consultation"), id: 'consultationCeremony' },
          { ...getItem("changingRoom"), description: '2 hours', price: 0, pricePerItem: undefined, count: undefined },
          { ...getItem("champagne") },
        ]
      },
      {
        category: 'Reception',
        description: '',
        items: [
          {
            ...getItem("reception", 0),
            title: 'Reception venue with gulf view for 4 hours',
            description: 'from 10 am till 10 pm',
            count: undefined,
            pricePerItem: undefined,
            price: 0,
          },
          { ...getItem("receptionTablesAndChairs"), description: '' },
          { ...getItem("whiteTablecloths"), description: '', count: undefined, pricePerItem: undefined, price: 0 },
          { ...getItem("linenNapkinsWhite", 4), description: '', price: 0, pricePerItem: undefined, count: undefined },
          { ...getItem("platesAndStuff"), price: 0, pricePerItem: undefined, count: undefined },
          { ...getItem("basicCenterpieces"), price: 0 },
          { ...getItem("welcomeSign"), price: 0 },
          { ...getItem("bar"), description: '', price: 0, count: undefined, pricePerItem: undefined },
          { ...getItem("coordinator"), id: 'coordinatorReception' },
          { ...getItem("sweetheartTables"), price: 0 },
          { ...getItem("cakeTable"), price: 0 },
          { ...getItem("guestBook"), price: 0 },
          { ...getItem("buffetTable") },
          { ...getItem("decoratedCeiling") },
          { ...getItem("sound") },
          { ...getItem("tv") },
          { ...getItem("dinner"), price: 0 },
          { ...getItem("roomRate") },
          { ...getItem("bathrooms") },
          { ...getItem("setup"), price: 0, id: 'setupReception' },
          { ...getItem("contact"), id: 'contactReception' },
          { ...getItem("consultation"), id: 'consultationReception' },
          { ...getItem("linenNapkinsColors"), description: '', count: undefined, pricePerItem: undefined },
          { ...getItem("tableRunners"), price: 0 },
          { ...getItem("mimosaBar"), price: 0 },
        ]
      }
    ],
    addons: [
      { ...getItem("arbor4", 0), price: 0 },
      {
        ...getItem("beachChairs"),
        title: 'Additional white folding chairs',
        description: "$8 / chair",
        count: 0,
        minCount: 0,
        maxCount: 80
      },
      { ...getItem("beachChairSashes"), description: '$2.50 / each' },
      { ...getItem("champagneToast") },
      { ...getItem("changingRoom"), description: '$100 / hour', count: 1, minCount: 1, maxCount: 4 },
      { ...getItem("music") },
      { ...getItem("extraReceptionGuest"), maxCount: 80 },
      { ...getItem("bar"), title: 'Additional bartender for 4 hours', description: '$150 / bartender', pricePerItem: 150, units: ['bartender', 'bartenders'], count: 1, minCount: 1, maxCount: 4 },
      { ...getItem("receptionChairSashes"), description: '$2.50 / each' },
      // { ...getItem("uplighting") },
      { ...getItem("buffetServers") },
      { ...getItem("extraHour"), count: 1 }
    ]
  }
};

export const ALL = {
  beforeSunset: {
    ...CEREMONY_PACKAGES.beforeSunset,
    items: [
      {
        category: 'Ceremony',
        description: '',
        items: CEREMONY_PACKAGES.beforeSunset.items,
      },
      {
        category: 'Reception',
        description: '',
        items: [],
      },
    ],
  },

  happilyEverAfter: {
    ...CEREMONY_PACKAGES.happilyEverAfter,
    items: [
      {
        category: 'Ceremony',
        description: '',
        items: CEREMONY_PACKAGES.happilyEverAfter.items,
      },
      {
        category: 'Reception',
        description: '',
        items: [],
      },
    ],
  },

  tieTheKnot: {
    ...RECEPTION_PACKAGES.tieTheKnot,
    items: [
      {
        category: 'Ceremony',
        description: '',
        items: []
      },
      {
        category: 'Reception',
        description: '',
        items: RECEPTION_PACKAGES.tieTheKnot.items,
      },
    ],
  },

  loveStory: COMBINED_PACKAGES.loveStory,
  dreamsComeTrue: COMBINED_PACKAGES.dreamsComeTrue,
};
