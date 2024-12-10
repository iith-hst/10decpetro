export const sites = [
  {
    id: 1,
    name: "Kasheli",
    coordinates: {
      lat: 16.7667,
      lng: 73.3086,
      coordinates: "16˚ 46ʹ 0.3ʺ N; 73˚ 18ʹ 31.60ʺE"
    },
    description: "Home to India's largest rock engraving - a massive elephant figure measuring 18x13m.",
    details: {
      mainFeature: "Large Elephant Composition",
      size: "18 x 13 meters",
      uniqueElements: [
        "70-80 animal figures carved within the elephant outline",
        "Includes sharks, sting rays, tigers, monkeys, boars, rhinos",
        "Aerial and terrestrial creatures arranged north-south",
        "Microliths found within 20m area"
      ],
      significance: "Largest and most complex petroglyph composition in Indian context",
      historicalContext: "Evidence suggests human activity during terminal phase of Pleistocene epoch",
      image: "/images/sites/kasheli-elephant.jpg"
    }
  },
  {
    id: 2,
    name: "Barsu",
    coordinates: {
      lat: 16.6496,
      lng: 73.4746,
      coordinates: "16˚38ʾ58.54ʺ N; 73˚28ʹ28.44ʺE"
    },
    description: "The largest cluster of petroglyphs in the coastal belt of Konkan.",
    details: {
      mainFeature: "Man and Tigers Composition",
      size: "17.5 x 4.5 meters",
      totalPetroglyphs: 62,
      uniqueElements: [
        "Larger-than-life human figure (4m height)",
        "Two stylized tigers in rectangular form",
        "Geometric patterns in tiger stripes",
        "Additional figures: fish, rabbit, peacock"
      ],
      significance: "Shows similarities with Harappan Civilization seals",
      image: "/images/sites/barsu-tigers.jpg"
    }
  },
  {
    id: 3,
    name: "DevacheGothane",
    coordinates: {
      lat: 17.0983,
      lng: 73.3767,
      coordinates: "17˚ 5ʹ 53.80ʺ N; 73˚ 22ʹ 36.12ʺ E"
    },
    description: "Features a unique standing human figure with unusual magnetic properties.",
    details: {
      mainFeature: "Standing Human Figure",
      uniqueElements: [
        "Created by scooping out rock outside the outline",
        "Round head, triangular torso",
        "Straight shoulders with loose open arms",
        "Unusual magnetic deflection phenomenon"
      ],
      scientificInterest: "Magnetic activity decreases with distance from carving",
      image: "/images/sites/devache-gothane.jpg"
    }
  },
  {
    id: 4,
    name: "Ukshi",
    coordinates: {
      lat: 17.1323,
      lng: 73.4337,
      coordinates: "17˚ 7 ̍ 56.31ʺ N 73 ˚26 ̍ 1.28ʺ E"
    },
    description: "Features a single but remarkable elephant petroglyph.",
    details: {
      mainFeature: "Single Elephant Figure",
      size: "6 x 5.40 meters",
      uniqueElements: [
        "Sectional elevation style",
        "Cross motif marked ears",
        "Long jutting teeth",
        "Clear male anatomical features"
      ],
      image: "/images/sites/ukshi-elephant.jpg"
    }
  },
  {
    id: 5,
    name: "Jambharun",
    coordinates: {
      lat: 17.0983,
      lng: 73.3767,
      coordinates: "17˚ 5ʹ 53.80ʺ N; 73˚ 22ʹ 36.12ʺ E"
    },
    description: "A rich site featuring 50 geoglyphs covering a 25x25m area.",
    details: {
      mainFeature: "Human and Animal Compositions",
      size: "25 x 25 meters",
      totalPetroglyphs: 50,
      uniqueElements: [
        "8 human figures with thick outlines",
        "Male figures with spread-out hands and legs",
        "Round heads and spread open fingers",
        "Life-size animal figures in longitudinal sections",
        "Deer family animals with tilted heads"
      ],
      significance: "Shows diverse artistic techniques and narrative compositions",
      image: "/images/sites/jambharun.jpg"
    }
  },
  {
    id: 6,
    name: "RundhyeTali",
    coordinates: {
      lat: 16.7380,
      lng: 73.5162,
      coordinates: "16˚44ʾ16.9ʺ N; 73˚30ʹ58.2768ʺE"
    },
    description: "Features intricate abstract designs with complex geometric patterns.",
    details: {
      mainFeature: "Abstract Geometric Composition",
      uniqueElements: [
        "Spherical shape with four circular projections",
        "Cross motifs in projected circles",
        "Concentric circles with rectangular projections",
        "Stylized human figure in center",
        "Additional animal figures: tiger, jellyfish, fish"
      ],
      significance: "Demonstrates advanced geometric understanding and precision",
      image: "/images/sites/rundhyetali.jpg"
    }
  }
  // ... Add other sites
];

export const siteCategories = {
  animalRepresentations: {
    title: "Animal Representations",
    sites: ["Kasheli", "Ukshi", "Barsu"],
    description: "Sites featuring prominent animal depictions"
  },
  humanFigures: {
    title: "Human Figures",
    sites: ["DevacheGothane", "Barsu"],
    description: "Sites with significant human representations"
  },
  geometricPatterns: {
    title: "Geometric Patterns",
    sites: ["RundhyeTali", "Devi Hasol"],
    description: "Sites featuring complex geometric and abstract designs"
  }
};

export const conservationStatus = {
  protected: ["Kasheli", "Ukshi"],
  atRisk: ["Barsu", "RundhyeTali"],
  needsAttention: ["DevacheGothane"]
}; 