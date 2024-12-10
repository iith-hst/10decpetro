export const learningContent = {
  topics: [
    {
      id: 1,
      title: "Discovery of Konkan Petroglyphs",
      description: "The fascinating story of how these ancient artworks were rediscovered",
      image: "/images/intro.jpg",
      category: 'history',
      modules: [
        {
          id: "1-1",
          title: "The Rediscovery",
          content: {
            introduction: "In the late 1980s, Sudhir Risbud discovered strange rock patterns near Niwali village, leading to one of India's most significant archaeological findings.",
            sections: [
              {
                title: "Initial Discovery",
                content: "While cycling near Niwali village, 15 km from Ratnagiri, Sudhir Risbud noticed enigmatic rock relief patterns featuring geometric shapes, interlocking curls, and concentric circles. This chance discovery would later lead to a systematic exploration of the region.",
                image: "/images/petroglyphs/niwali.jpg"
              },
              {
                title: "Systematic Exploration",
                content: "In 2010, the informal group 'Adgalnavarche Konkan' (Unexplored Konkan) was formed, leading to the discovery of 52 confirmed sites and over 1,000 petroglyphs by 2019.",
                image: "/images/petroglyphs/exploration.jpg"
              }
            ],
            quiz: [
              {
                question: "When were the Konkan petroglyphs first rediscovered?",
                options: [
                  "Late 1980s",
                  "Early 2000s",
                  "2010",
                  "2018"
                ],
                correctAnswer: 0
              }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: "Types and Significance",
      description: "Understanding the various types of petroglyphs and their historical importance",
      image: "/images/petroglyphs/types.jpg",
      category: 'basics',
      modules: [
        {
          id: "2-1",
          title: "Petroglyph Categories",
          content: {
            introduction: "The Konkan petroglyphs feature a diverse range of subjects, from life-size animals to complex geometric patterns.",
            sections: [
              {
                title: "Animal Representations",
                content: "The sites feature depictions of elephants, rhinos, buffalo, tigers, deer, rabbits, birds, and aquatic animals like fish, sharks, and stingrays.",
                image: "/images/petroglyphs/animals.jpg"
              },
              {
                title: "Dating and Context",
                content: "These petroglyphs are believed to date back to the mesolithic and neolithic period, potentially as far back as 10,000 BC, marking the transition from hunter-gatherer to farming societies.",
                image: "/images/petroglyphs/dating.jpg"
              }
            ],
            mapCoordinates: {
              latitude: 17.0,
              longitude: 73.4,
              zoom: 9
            }
          }
        }
      ]
    },
    {
      id: 3,
      title: "Conservation Challenges",
      description: "Current threats and preservation efforts",
      image: "/images/learn/conservation.jpg",
      category: 'conservation',
      modules: [
        {
          id: "3-1",
          title: "Threats and Protection",
          content: {
            introduction: "The petroglyphs face numerous challenges from both natural and human activities.",
            sections: [
              {
                title: "Current Threats",
                content: "Sites are at risk from road construction, mining, plantations (mango and cashew), and both human and natural erosion.",
                image: "/images/petroglyphs/threats.jpg"
              },
              {
                title: "Conservation Efforts",
                content: "A fund of 240 million rupees has been allocated by the state government to study and record 400 identified petroglyphs.",
                image: "/images/petroglyphs/conservation.jpg"
              }
            ]
          }
        }
      ]
    },
    {
      id: 4,
      title: "UNESCO World Heritage Significance",
      description: "Understanding the global importance of Konkan Petroglyphs",
      image: "/images/petroglyphs/unesco.jpg",
      category: 'significance',
      modules: [
        {
          id: "4-1",
          title: "Outstanding Universal Value",
          content: {
            introduction: "The Konkan Petroglyphs represent one of the oldest material evidence of India's early human creativity, spanning from Mesolithic (10Kya) to Early Historic (1.7Kya) periods.",
            sections: [
              {
                title: "Key Sites",
                content: `Nine key sites form the core of this UNESCO nomination:
                  - Kasheli (Maharashtra)
                  - RundhyeTali (Maharashtra)
                  - DevacheGothane (Maharashtra)
                  - Barsu (Maharashtra)
                  - Devi Hasol (Maharashtra)
                  - Jambharun (Maharashtra)
                  - Kudopi (Maharashtra)
                  - Ukshi (Maharashtra)
                  - Pansaymol (Goa)`,
                mapCoordinates: {
                  latitude: 16.7667,
                  longitude: 73.3086,
                  zoom: 8,
                  markers: [
                    { id: 1, name: "Kasheli", lat: 16.7667, lng: 73.3086 },
                    { id: 2, name: "RundhyeTali", lat: 16.7380, lng: 73.5162 },
                    // ... add other coordinates
                  ]
                }
              },
              {
                title: "UNESCO Criteria",
                content: `The site meets three key UNESCO criteria:
                  (i) Represents a masterpiece of human creative genius
                  (iii) Bears unique testimony to a cultural tradition
                  (iv) Outstanding example of human settlement/land-use`,
                image: "/images/petroglyphs/criteria.jpg"
              }
            ]
          }
        },
        {
          id: "4-2",
          title: "Detailed Site Analysis",
          content: {
            introduction: "Each site offers unique insights into prehistoric life and artistic expression.",
            sections: [
              {
                title: "Kasheli Elephant",
                content: "The largest rock engraving in India, featuring an 18x13m elephant containing 70-80 animal figures within its outline.",
                image: "/images/petroglyphs/kasheli-elephant.jpg"
              },
              {
                title: "Barsu Complex",
                content: "Contains 62 petroglyphs including a remarkable 17.5x4.5m composition of a man between two tigers.",
                image: "/images/petroglyphs/barsu-tigers.jpg"
              }
            ],
            quiz: [
              {
                question: "Which site contains the largest rock engraving in India?",
                options: ["Kasheli", "Barsu", "Ukshi", "Pansaymol"],
                correctAnswer: 0
              }
            ]
          }
        }
      ]
    }
  ]
}; 