import type { Quest } from './types'

// Quest library — imported from Side_Quest_Finder_100_Quests_Final.xlsx
export const QUESTS: Quest[] = [
  {
    "id": "sq-001",
    "title": "The Secret Menu",
    "description": "Ask a café employee what they personally order and buy it.",
    "lore": "The greatest treasures rarely appear on the map.",
    "difficulty": "Easy",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "curious",
      "adventurous"
    ],
    "tags": [
      "food",
      "local",
      "secrets"
    ],
    "repeatable": true
  },
  {
    "id": "sq-002",
    "title": "Accidental Tourist",
    "description": "Get off public transport three stops early and explore.",
    "lore": "The world rewards wrong turns.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 90,
    "moods": [
      "adventurous",
      "curious"
    ],
    "tags": [
      "exploration",
      "city"
    ],
    "repeatable": true
  },
  {
    "id": "sq-003",
    "title": "The Stranger's Story",
    "description": "Ask someone over 60 for advice they wish they'd heard at your age.",
    "lore": "The oldest libraries walk among us.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 30,
    "moods": [
      "thoughtful",
      "social"
    ],
    "tags": [
      "wisdom",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-004",
    "title": "Color Hunter",
    "description": "Choose a color and photograph ten beautiful examples of it.",
    "lore": "Every color hides its own ecosystem.",
    "difficulty": "Easy",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 45,
    "moods": [
      "creative",
      "chill"
    ],
    "tags": [
      "photography",
      "art"
    ],
    "repeatable": true
  },
  {
    "id": "sq-005",
    "title": "Sunset Summit",
    "description": "Find the highest publicly accessible place nearby and watch sunset.",
    "lore": "Every kingdom deserves a throne room view.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 140,
    "duration": 60,
    "moods": [
      "peaceful",
      "adventurous"
    ],
    "tags": [
      "sunset",
      "viewpoint"
    ],
    "repeatable": true
  },
  {
    "id": "sq-006",
    "title": "Human Playlist",
    "description": "Ask three people for a song that changed their life and listen to them.",
    "lore": "Music remembers what people forget.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "reflective",
      "social"
    ],
    "tags": [
      "music",
      "conversation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-007",
    "title": "One-Hour Foreigner",
    "description": "Spend an hour acting like a tourist in your own city.",
    "lore": "Home is the easiest place to stop seeing.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 120,
    "duration": 60,
    "moods": [
      "curious",
      "playful"
    ],
    "tags": [
      "travel",
      "city"
    ],
    "repeatable": true
  },
  {
    "id": "sq-008",
    "title": "Future Relic",
    "description": "Leave a positive handwritten note for a stranger to discover.",
    "lore": "Every civilization leaves artifacts behind.",
    "difficulty": "Easy",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "hopeful",
      "creative"
    ],
    "tags": [
      "kindness",
      "mystery"
    ],
    "repeatable": true
  },
  {
    "id": "sq-009",
    "title": "The Recommendation Chain",
    "description": "Ask three strangers where you should go next and visit the winner.",
    "lore": "Follow enough breadcrumbs and you'll find magic.",
    "difficulty": "Hard",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 280,
    "duration": 120,
    "moods": [
      "adventurous",
      "social"
    ],
    "tags": [
      "exploration",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-010",
    "title": "The Honest Question",
    "description": "Ask someone what they're most excited about right now.",
    "lore": "Hope reveals more than history.",
    "difficulty": "Easy",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 80,
    "duration": 15,
    "moods": [
      "positive",
      "social"
    ],
    "tags": [
      "conversation",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-011",
    "title": "Budget Banquet",
    "description": "Create the best meal possible using a strict budget.",
    "lore": "Great feasts begin with humble coin purses.",
    "difficulty": "Medium",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 160,
    "duration": 60,
    "moods": [
      "creative",
      "playful"
    ],
    "tags": [
      "food",
      "challenge"
    ],
    "repeatable": true
  },
  {
    "id": "sq-012",
    "title": "Street Oracle",
    "description": "Ask five strangers what everyone should try at least once.",
    "lore": "Wisdom travels anonymously.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 45,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "advice",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-013",
    "title": "The Long Way Home",
    "description": "Take the most scenic route home possible.",
    "lore": "Journeys matter more than efficiency.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 45,
    "moods": [
      "chill",
      "reflective"
    ],
    "tags": [
      "exploration",
      "walk"
    ],
    "repeatable": true
  },
  {
    "id": "sq-014",
    "title": "Secret Rooftop",
    "description": "Find a publicly accessible rooftop or terrace view.",
    "lore": "The sky belongs to explorers.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "adventurous",
      "curious"
    ],
    "tags": [
      "city",
      "views"
    ],
    "repeatable": true
  },
  {
    "id": "sq-015",
    "title": "The Compliment Merchant",
    "description": "Give five genuine compliments to five different people.",
    "lore": "Kindness compounds faster than gold.",
    "difficulty": "Medium",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 30,
    "moods": [
      "social",
      "positive"
    ],
    "tags": [
      "kindness",
      "social"
    ],
    "repeatable": true
  },
  {
    "id": "sq-016",
    "title": "The Local Legend",
    "description": "Visit a family-owned business and learn how it started.",
    "lore": "Every kingdom begins with one stubborn dream.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "curious",
      "inspired"
    ],
    "tags": [
      "local",
      "business"
    ],
    "repeatable": true
  },
  {
    "id": "sq-017",
    "title": "Rain Quest",
    "description": "The next time it rains, spend ten minutes outside enjoying it.",
    "lore": "Storms are invitations, not interruptions.",
    "difficulty": "Easy",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 15,
    "moods": [
      "free",
      "adventurous"
    ],
    "tags": [
      "weather",
      "nature"
    ],
    "repeatable": true
  },
  {
    "id": "sq-018",
    "title": "Reverse Date",
    "description": "Let a friend plan a mystery hour with no questions allowed.",
    "lore": "Trust is the fastest travel method.",
    "difficulty": "Hard",
    "category": "Social",
    "mode": [
      "duo"
    ],
    "xp": 280,
    "duration": 90,
    "moods": [
      "adventurous",
      "social"
    ],
    "tags": [
      "friendship",
      "surprise"
    ],
    "repeatable": true
  },
  {
    "id": "sq-019",
    "title": "Urban Treasure Hunt",
    "description": "Find the weirdest thing within one kilometer of your location.",
    "lore": "Every map contains glitches.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "curious",
      "chaotic"
    ],
    "tags": [
      "exploration",
      "city"
    ],
    "repeatable": true
  },
  {
    "id": "sq-020",
    "title": "The Last Photo",
    "description": "Take one photo that perfectly captures today. Only one attempt.",
    "lore": "Great artists fear unlimited retries.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 20,
    "moods": [
      "reflective",
      "creative"
    ],
    "tags": [
      "photography",
      "memory"
    ],
    "repeatable": true,
    "timeLimit": 20
  },
  {
    "id": "sq-021",
    "title": "Secret Feast",
    "description": "Build an entire meal using recommendations from strangers.",
    "lore": "The village still feeds its travelers.",
    "difficulty": "Hard",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 320,
    "duration": 120,
    "moods": [
      "adventurous",
      "social"
    ],
    "tags": [
      "food",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-022",
    "title": "Random Expertise",
    "description": "Ask someone to teach you a skill in under three minutes.",
    "lore": "Skill is contagious.",
    "difficulty": "Easy",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 20,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "learning",
      "micro-skill"
    ],
    "repeatable": true
  },
  {
    "id": "sq-023",
    "title": "The View Nobody Uses",
    "description": "Spend 15 minutes at a beautiful place nobody seems to notice.",
    "lore": "Forgotten thrones await new rulers.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "calm",
      "reflective"
    ],
    "tags": [
      "mindfulness",
      "quiet"
    ],
    "repeatable": true
  },
  {
    "id": "sq-024",
    "title": "Six Degrees",
    "description": "Start a conversation and discover a mutual connection.",
    "lore": "The world is smaller than its maps suggest.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 20,
    "moods": [
      "social",
      "curious"
    ],
    "tags": [
      "networking",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-025",
    "title": "Main Character Day",
    "description": "Spend one hour behaving like today will become a movie scene.",
    "lore": "Heroes rarely know which chapter matters most.",
    "difficulty": "Legendary",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 500,
    "duration": 60,
    "moods": [
      "confident",
      "adventurous"
    ],
    "tags": [
      "storytelling",
      "legendary"
    ],
    "repeatable": true
  },
  {
    "id": "sq-026",
    "title": "The Last Train",
    "description": "Ride a train, metro, or bus to the final stop and explore for 30 minutes.",
    "lore": "Every map ends somewhere. Few people ever see where.",
    "difficulty": "Hard",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 300,
    "duration": 120,
    "moods": [
      "adventurous",
      "curious"
    ],
    "tags": [
      "transit",
      "exploration",
      "travel"
    ],
    "repeatable": true
  },
  {
    "id": "sq-027",
    "title": "Passport Mode",
    "description": "Visit three places as if you're seeing your city for the first time.",
    "lore": "Familiar places hide behind unfamiliar eyes.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "curious",
      "playful"
    ],
    "tags": [
      "tourism",
      "city"
    ],
    "repeatable": true
  },
  {
    "id": "sq-028",
    "title": "The Brave Question",
    "description": "Ask a question you've been avoiding for weeks.",
    "lore": "Truth favors the courageous.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 300,
    "duration": 20,
    "moods": [
      "brave",
      "anxious"
    ],
    "tags": [
      "courage",
      "communication"
    ],
    "repeatable": false
  },
  {
    "id": "sq-029",
    "title": "Midnight Dessert",
    "description": "Find dessert after 10 PM and eat it somewhere unusual.",
    "lore": "Moonlight improves all recipes.",
    "difficulty": "Medium",
    "category": "Food",
    "mode": [
      "solo",
      "duo",
      "group"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "playful",
      "chaotic"
    ],
    "tags": [
      "dessert",
      "night"
    ],
    "repeatable": true
  },
  {
    "id": "sq-030",
    "title": "The Coin Flip Journey",
    "description": "Let a coin make every major decision for one hour.",
    "lore": "Fate enjoys practical jokes.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 280,
    "duration": 90,
    "moods": [
      "chaotic",
      "adventurous"
    ],
    "tags": [
      "randomness",
      "explore"
    ],
    "repeatable": true
  },
  {
    "id": "sq-031",
    "title": "Museum of Forgotten Things",
    "description": "Photograph ten objects everyone ignores.",
    "lore": "Beauty survives without witnesses.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "creative",
      "reflective"
    ],
    "tags": [
      "photography",
      "urban"
    ],
    "repeatable": true
  },
  {
    "id": "sq-032",
    "title": "The Empty Stage",
    "description": "Spend five minutes singing, speaking, or performing somewhere public.",
    "lore": "Every legend starts before the audience arrives.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 320,
    "duration": 15,
    "moods": [
      "brave",
      "playful"
    ],
    "tags": [
      "performance",
      "fear"
    ],
    "repeatable": true
  },
  {
    "id": "sq-033",
    "title": "Breakfast Expedition",
    "description": "Eat breakfast somewhere you've never been before.",
    "lore": "Mornings deserve new scenery.",
    "difficulty": "Easy",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "adventurous",
      "chill"
    ],
    "tags": [
      "breakfast",
      "food"
    ],
    "repeatable": true
  },
  {
    "id": "sq-034",
    "title": "The Stranger's Favorite Place",
    "description": "Ask someone where they'd go if they had one free afternoon. Then go there.",
    "lore": "Borrowing adventures is still adventure.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 90,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "local",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-035",
    "title": "Reverse Bucket List",
    "description": "Finally do something you've postponed for years.",
    "lore": "Delayed quests still grant XP.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 350,
    "duration": 180,
    "moods": [
      "determined",
      "brave"
    ],
    "tags": [
      "goals",
      "life"
    ],
    "repeatable": false
  },
  {
    "id": "sq-036",
    "title": "One Degree Away",
    "description": "Spend time with someone whose life is completely different from yours.",
    "lore": "New worlds rarely require passports.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "curious",
      "thoughtful"
    ],
    "tags": [
      "perspective",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-037",
    "title": "Tiny Festival",
    "description": "Celebrate something absurdly small as if it were a major holiday.",
    "lore": "Joy scales surprisingly well.",
    "difficulty": "Easy",
    "category": "Community",
    "mode": [
      "duo",
      "group"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "playful",
      "chaotic"
    ],
    "tags": [
      "celebration",
      "fun"
    ],
    "repeatable": true
  },
  {
    "id": "sq-038",
    "title": "Rooftop Philosopher",
    "description": "Watch the city from above and write down five thoughts.",
    "lore": "Great ideas enjoy elevation.",
    "difficulty": "Medium",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "reflective",
      "chill"
    ],
    "tags": [
      "journaling",
      "views"
    ],
    "repeatable": true
  },
  {
    "id": "sq-039",
    "title": "Secret Ingredient",
    "description": "Buy a food ingredient you've never heard of and cook with it.",
    "lore": "Culinary magic begins with curiosity.",
    "difficulty": "Medium",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 90,
    "moods": [
      "creative",
      "curious"
    ],
    "tags": [
      "cooking",
      "food"
    ],
    "repeatable": true
  },
  {
    "id": "sq-040",
    "title": "The Human Library II",
    "description": "Ask someone about a turning point in their life.",
    "lore": "Every person contains a plot twist.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 30,
    "moods": [
      "thoughtful",
      "social"
    ],
    "tags": [
      "stories",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-041",
    "title": "The 100-Rupee Adventure",
    "description": "Create the best possible adventure with ₹100 or less.",
    "lore": "Creativity thrives under constraints.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 280,
    "duration": 120,
    "moods": [
      "playful",
      "creative"
    ],
    "tags": [
      "budget",
      "challenge"
    ],
    "repeatable": true
  },
  {
    "id": "sq-042",
    "title": "Secret Sunrise",
    "description": "Wake before sunrise and witness the city wake up.",
    "lore": "Dawn belongs to a different civilization.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 260,
    "duration": 90,
    "moods": [
      "peaceful",
      "adventurous"
    ],
    "tags": [
      "sunrise",
      "morning"
    ],
    "repeatable": true
  },
  {
    "id": "sq-043",
    "title": "The Local Celebrity",
    "description": "Find the most interesting person in a neighborhood and learn their story.",
    "lore": "Legends often live next door.",
    "difficulty": "Hard",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 320,
    "duration": 90,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "storytelling",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-044",
    "title": "Reverse Recommendation",
    "description": "Recommend your favorite local place to a stranger.",
    "lore": "Maps improve when shared.",
    "difficulty": "Easy",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 15,
    "moods": [
      "social",
      "positive"
    ],
    "tags": [
      "kindness",
      "local"
    ],
    "repeatable": true
  },
  {
    "id": "sq-045",
    "title": "Silent Café",
    "description": "Spend 30 minutes in a café without using your phone.",
    "lore": "Attention is a rare currency.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 30,
    "moods": [
      "calm",
      "reflective"
    ],
    "tags": [
      "digital-detox"
    ],
    "repeatable": true,
    "timeLimit": 30
  },
  {
    "id": "sq-046",
    "title": "The Open Door",
    "description": "Enter a store, gallery, or café you've walked past 50 times but never entered.",
    "lore": "Mystery hides in plain sight.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "curious"
    ],
    "tags": [
      "exploration",
      "local"
    ],
    "repeatable": true
  },
  {
    "id": "sq-047",
    "title": "The Adventure Relay",
    "description": "Each member of your group chooses the next destination.",
    "lore": "Shared stories require shared chaos.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "group"
    ],
    "xp": 220,
    "duration": 120,
    "moods": [
      "social",
      "chaotic"
    ],
    "tags": [
      "friends",
      "group"
    ],
    "repeatable": true
  },
  {
    "id": "sq-048",
    "title": "The Honest Toast",
    "description": "Tell someone exactly why you appreciate them.",
    "lore": "Gratitude grows stronger when spoken aloud.",
    "difficulty": "Medium",
    "category": "Community",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 15,
    "moods": [
      "heartfelt",
      "positive"
    ],
    "tags": [
      "gratitude",
      "relationships"
    ],
    "repeatable": true
  },
  {
    "id": "sq-049",
    "title": "The Night Cartographer",
    "description": "Create a map of interesting places you discover after dark.",
    "lore": "The city changes characters at sunset.",
    "difficulty": "Hard",
    "category": "Night Quest",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 300,
    "duration": 120,
    "moods": [
      "adventurous",
      "curious"
    ],
    "tags": [
      "night",
      "exploration"
    ],
    "repeatable": true
  },
  {
    "id": "sq-050",
    "title": "Tiny Revolution",
    "description": "Convince at least three strangers to participate in something harmless and fun.",
    "lore": "Every movement starts with one believer.",
    "difficulty": "Legendary",
    "category": "Social",
    "mode": [
      "solo",
      "group"
    ],
    "xp": 550,
    "duration": 120,
    "moods": [
      "brave",
      "chaotic",
      "social"
    ],
    "tags": [
      "leadership",
      "fun",
      "people"
    ],
    "repeatable": true,
    "timeLimit": 120
  },
  {
    "id": "sq-051",
    "title": "The Secret Password",
    "description": "Ask a local business owner what regular customers always know to order or do.",
    "lore": "Every guild has secrets.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 30,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "local",
      "business",
      "secrets"
    ],
    "repeatable": true
  },
  {
    "id": "sq-052",
    "title": "The Fortune Cookie",
    "description": "Ask five strangers what they think you'll be doing in ten years.",
    "lore": "Prophecies are more entertaining when crowdsourced.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 45,
    "moods": [
      "playful",
      "curious"
    ],
    "tags": [
      "future",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-053",
    "title": "Parallel Lives",
    "description": "Spend 30 minutes imagining the life story of someone you observe in public.",
    "lore": "Every stranger is the protagonist of another story.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 30,
    "moods": [
      "reflective",
      "creative"
    ],
    "tags": [
      "observation",
      "storytelling"
    ],
    "repeatable": true
  },
  {
    "id": "sq-054",
    "title": "The Forgotten Review",
    "description": "Leave a thoughtful positive review for a small business you genuinely like.",
    "lore": "Heroes don't always wear capes. Sometimes they leave reviews.",
    "difficulty": "Easy",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 80,
    "duration": 15,
    "moods": [
      "positive",
      "helpful"
    ],
    "tags": [
      "local",
      "kindness"
    ],
    "repeatable": true
  },
  {
    "id": "sq-055",
    "title": "Three Doors",
    "description": "Enter the third interesting place you discover while walking.",
    "lore": "Adventure rewards commitment.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "curious",
      "adventurous"
    ],
    "tags": [
      "spontaneity",
      "explore"
    ],
    "repeatable": true
  },
  {
    "id": "sq-056",
    "title": "The Local Myth Hunter",
    "description": "Find a local ghost story, rumor, or urban legend and investigate it.",
    "lore": "Cities remember strange things.",
    "difficulty": "Hard",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 300,
    "duration": 120,
    "moods": [
      "curious",
      "adventurous"
    ],
    "tags": [
      "folklore",
      "mystery"
    ],
    "repeatable": true
  },
  {
    "id": "sq-057",
    "title": "Reverse Interview",
    "description": "Let someone ask you any five questions they want.",
    "lore": "Sometimes being understood is the adventure.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "duo"
    ],
    "xp": 180,
    "duration": 30,
    "moods": [
      "vulnerable",
      "social"
    ],
    "tags": [
      "conversation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-058",
    "title": "The Celebration Chain",
    "description": "Start a chain of compliments between strangers.",
    "lore": "Positive energy spreads faster than expected.",
    "difficulty": "Hard",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 280,
    "duration": 45,
    "moods": [
      "positive",
      "social"
    ],
    "tags": [
      "kindness",
      "community"
    ],
    "repeatable": true
  },
  {
    "id": "sq-059",
    "title": "The Tiny Gallery",
    "description": "Create a temporary art installation from found objects.",
    "lore": "Great museums begin with one exhibit.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "solo",
      "group"
    ],
    "xp": 200,
    "duration": 45,
    "moods": [
      "creative",
      "playful"
    ],
    "tags": [
      "art",
      "creation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-060",
    "title": "Borrowed Book",
    "description": "Ask someone to recommend a book and read the first chapter today.",
    "lore": "Wisdom enjoys referrals.",
    "difficulty": "Easy",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "curious",
      "reflective"
    ],
    "tags": [
      "books",
      "learning"
    ],
    "repeatable": true
  },
  {
    "id": "sq-061",
    "title": "The Hidden Menu II",
    "description": "Order the staff favorite at a restaurant. No questions asked.",
    "lore": "Trust the experts.",
    "difficulty": "Easy",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "adventurous",
      "curious"
    ],
    "tags": [
      "food",
      "recommendation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-062",
    "title": "The Unfamiliar Route",
    "description": "Navigate somewhere without using GPS.",
    "lore": "Ancient explorers managed somehow.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "adventurous",
      "confident"
    ],
    "tags": [
      "navigation",
      "challenge"
    ],
    "repeatable": true
  },
  {
    "id": "sq-063",
    "title": "The Five-Minute Friend",
    "description": "Have a meaningful conversation with someone you've never met.",
    "lore": "Friendships often start unexpectedly.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 20,
    "moods": [
      "social",
      "curious"
    ],
    "tags": [
      "people",
      "connection"
    ],
    "repeatable": true
  },
  {
    "id": "sq-064",
    "title": "The Dessert Quest",
    "description": "Visit a dessert place you've never heard of and try their signature item.",
    "lore": "Every town hides a sugar wizard.",
    "difficulty": "Easy",
    "category": "Food",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "playful",
      "happy"
    ],
    "tags": [
      "food",
      "dessert"
    ],
    "repeatable": true
  },
  {
    "id": "sq-065",
    "title": "The Lost Skill",
    "description": "Learn a skill that was common 100 years ago.",
    "lore": "Old knowledge never truly disappears.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "curious",
      "thoughtful"
    ],
    "tags": [
      "history",
      "skills"
    ],
    "repeatable": true
  },
  {
    "id": "sq-066",
    "title": "The Observation Deck",
    "description": "Spend 20 minutes observing life from a busy public place.",
    "lore": "Civilization is an endless performance.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "reflective",
      "chill"
    ],
    "tags": [
      "observation",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-067",
    "title": "Secret Mission",
    "description": "Have a friend secretly assign you a harmless challenge. Complete it.",
    "lore": "Great agents require great missions.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "duo"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "playful",
      "adventurous"
    ],
    "tags": [
      "mystery",
      "friendship"
    ],
    "repeatable": true
  },
  {
    "id": "sq-068",
    "title": "The Time Traveler",
    "description": "Visit a place that hasn't changed much in decades.",
    "lore": "Some locations resist time itself.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "nostalgic",
      "curious"
    ],
    "tags": [
      "history",
      "city"
    ],
    "repeatable": true
  },
  {
    "id": "sq-069",
    "title": "Reverse Restaurant",
    "description": "Let a stranger choose what you eat today.",
    "lore": "Surrendering control has flavor.",
    "difficulty": "Hard",
    "category": "Food",
    "mode": [
      "solo"
    ],
    "xp": 260,
    "duration": 60,
    "moods": [
      "adventurous",
      "social"
    ],
    "tags": [
      "food",
      "randomness"
    ],
    "repeatable": true
  },
  {
    "id": "sq-070",
    "title": "One Good Deed",
    "description": "Complete a meaningful act of kindness anonymously.",
    "lore": "Anonymous heroes still gain XP.",
    "difficulty": "Medium",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 30,
    "moods": [
      "positive",
      "hopeful"
    ],
    "tags": [
      "kindness",
      "giving"
    ],
    "repeatable": true
  },
  {
    "id": "sq-071",
    "title": "The Adventure Auction",
    "description": "Each friend contributes one challenge. Draw one at random.",
    "lore": "Chaos is best when collaborative.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "group"
    ],
    "xp": 280,
    "duration": 90,
    "moods": [
      "chaotic",
      "social"
    ],
    "tags": [
      "friends",
      "random"
    ],
    "repeatable": true
  },
  {
    "id": "sq-072",
    "title": "The Memory Exchange",
    "description": "Trade a favorite childhood memory with someone.",
    "lore": "Stories become stronger when shared.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "duo"
    ],
    "xp": 180,
    "duration": 30,
    "moods": [
      "nostalgic",
      "social"
    ],
    "tags": [
      "memories",
      "conversation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-073",
    "title": "Hidden Talent Show",
    "description": "Showcase a skill most people don't know you have.",
    "lore": "Secret powers deserve daylight.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo",
      "group"
    ],
    "xp": 300,
    "duration": 30,
    "moods": [
      "brave",
      "playful"
    ],
    "tags": [
      "talent",
      "confidence"
    ],
    "repeatable": true
  },
  {
    "id": "sq-074",
    "title": "The Human Compass",
    "description": "Let strangers decide your next destination through votes.",
    "lore": "Democracy can be adventurous.",
    "difficulty": "Hard",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 280,
    "duration": 90,
    "moods": [
      "curious",
      "chaotic"
    ],
    "tags": [
      "travel",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-075",
    "title": "The Impossible Day",
    "description": "Spend one hour saying \"yes\" to every reasonable opportunity that appears.",
    "lore": "Some adventures only happen to the available.",
    "difficulty": "Legendary",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 550,
    "duration": 60,
    "moods": [
      "adventurous",
      "bold"
    ],
    "tags": [
      "spontaneity",
      "legendary"
    ],
    "repeatable": true,
    "timeLimit": 60
  },
  {
    "id": "sq-076",
    "title": "The Secret Society",
    "description": "Spend an hour participating in a community, club, meetup, or gathering you've never attended before.",
    "lore": "Every city contains hidden guilds.",
    "difficulty": "Hard",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 300,
    "duration": 120,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "meetup",
      "community"
    ],
    "repeatable": true
  },
  {
    "id": "sq-077",
    "title": "The Lost Conversation",
    "description": "Call someone you haven't spoken to in over two years.",
    "lore": "Some bridges only need one traveler.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 30,
    "moods": [
      "nostalgic",
      "social"
    ],
    "tags": [
      "friendship",
      "reconnect"
    ],
    "repeatable": false
  },
  {
    "id": "sq-078",
    "title": "The Curiosity Tax",
    "description": "For every question you ask today, find the answer.",
    "lore": "Curiosity demands payment.",
    "difficulty": "Hard",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 280,
    "duration": 180,
    "moods": [
      "curious",
      "reflective"
    ],
    "tags": [
      "learning",
      "research"
    ],
    "repeatable": true
  },
  {
    "id": "sq-079",
    "title": "The Last Customer",
    "description": "Visit a small business just before closing and hear the owner's story.",
    "lore": "Shops hold different conversations at the end of the day.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 220,
    "duration": 45,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "business",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-080",
    "title": "The Memory Tourist",
    "description": "Visit three places that shaped your childhood.",
    "lore": "Old checkpoints still exist.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 90,
    "moods": [
      "nostalgic",
      "reflective"
    ],
    "tags": [
      "memories",
      "city"
    ],
    "repeatable": true
  },
  {
    "id": "sq-081",
    "title": "The Reverse Mentor",
    "description": "Ask someone younger than you to teach you something.",
    "lore": "Wisdom does not check age requirements.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 30,
    "moods": [
      "curious",
      "humble"
    ],
    "tags": [
      "learning",
      "generations"
    ],
    "repeatable": true
  },
  {
    "id": "sq-082",
    "title": "The Unexpected Yes",
    "description": "Accept an invitation you would normally decline.",
    "lore": "Opportunity often arrives poorly disguised.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 300,
    "duration": 120,
    "moods": [
      "brave",
      "adventurous"
    ],
    "tags": [
      "growth",
      "opportunity"
    ],
    "repeatable": true
  },
  {
    "id": "sq-083",
    "title": "The Third Place",
    "description": "Spend an hour in a place that is neither home nor work.",
    "lore": "Civilization happens between destinations.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 60,
    "moods": [
      "chill",
      "reflective"
    ],
    "tags": [
      "café",
      "park",
      "community"
    ],
    "repeatable": true
  },
  {
    "id": "sq-084",
    "title": "The Compliment Heist",
    "description": "Make someone's day noticeably better without revealing yourself.",
    "lore": "Anonymous heroes still earn XP.",
    "difficulty": "Medium",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 30,
    "moods": [
      "positive",
      "hopeful"
    ],
    "tags": [
      "kindness",
      "anonymous"
    ],
    "repeatable": true
  },
  {
    "id": "sq-085",
    "title": "The One-Day Collector",
    "description": "Collect five tiny memories from today and document them.",
    "lore": "Great stories are built from small moments.",
    "difficulty": "Easy",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "reflective",
      "creative"
    ],
    "tags": [
      "journaling",
      "memory"
    ],
    "repeatable": true
  },
  {
    "id": "sq-086",
    "title": "The Alternate Reality",
    "description": "Spend one hour pretending you're living a completely different life.",
    "lore": "Imagination is temporary teleportation.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "playful",
      "creative"
    ],
    "tags": [
      "roleplay",
      "storytelling"
    ],
    "repeatable": true
  },
  {
    "id": "sq-087",
    "title": "The Midnight Philosopher",
    "description": "Have a deep conversation after 11 PM.",
    "lore": "The best questions wake up late.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "duo"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "reflective",
      "social"
    ],
    "tags": [
      "night",
      "conversation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-088",
    "title": "The Stranger's Quest",
    "description": "Ask someone to give you a challenge. Complete it today.",
    "lore": "The universe occasionally outsources quests.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 320,
    "duration": 120,
    "moods": [
      "adventurous",
      "chaotic"
    ],
    "tags": [
      "challenge",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-089",
    "title": "The Tiny Road Trip",
    "description": "Travel to a nearby place you've never visited and spend an hour there.",
    "lore": "Distance is relative to curiosity.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "solo",
      "duo",
      "group"
    ],
    "xp": 220,
    "duration": 180,
    "moods": [
      "adventurous",
      "curious"
    ],
    "tags": [
      "travel",
      "exploration"
    ],
    "repeatable": true
  },
  {
    "id": "sq-090",
    "title": "The Gratitude Debt",
    "description": "Thank someone whose contribution is usually unnoticed.",
    "lore": "Recognition is a rare treasure.",
    "difficulty": "Easy",
    "category": "Community",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "positive",
      "heartfelt"
    ],
    "tags": [
      "gratitude",
      "kindness"
    ],
    "repeatable": true
  },
  {
    "id": "sq-091",
    "title": "The Parallel Meal",
    "description": "Eat exactly what the person before you ordered.",
    "lore": "Chance has a surprisingly good palate.",
    "difficulty": "Medium",
    "category": "Food",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "adventurous",
      "playful"
    ],
    "tags": [
      "food",
      "random"
    ],
    "repeatable": true
  },
  {
    "id": "sq-092",
    "title": "The Last Photograph",
    "description": "Capture a photo that represents this chapter of your life.",
    "lore": "Every era deserves a cover image.",
    "difficulty": "Hard",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 260,
    "duration": 60,
    "moods": [
      "reflective",
      "creative"
    ],
    "tags": [
      "photography",
      "life"
    ],
    "repeatable": false
  },
  {
    "id": "sq-093",
    "title": "The Hidden Expert",
    "description": "Find someone passionate about an obscure topic and learn from them.",
    "lore": "Every niche has its master.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 45,
    "moods": [
      "curious",
      "inspired"
    ],
    "tags": [
      "expertise",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-094",
    "title": "The Human Time Capsule",
    "description": "Ask three people what they hope the future looks like.",
    "lore": "Tomorrow is built from imagination.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 45,
    "moods": [
      "hopeful",
      "curious"
    ],
    "tags": [
      "future",
      "conversation"
    ],
    "repeatable": true
  },
  {
    "id": "sq-095",
    "title": "The 24-Hour Mission",
    "description": "Give yourself a challenge that must be completed within a day.",
    "lore": "Deadlines sharpen destiny.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 320,
    "duration": 1440,
    "moods": [
      "determined",
      "focused"
    ],
    "tags": [
      "challenge",
      "self-growth"
    ],
    "repeatable": true,
    "timeLimit": 1440
  },
  {
    "id": "sq-096",
    "title": "The Hidden Doorway",
    "description": "Enter a place you've always wondered about but never visited.",
    "lore": "Mystery loses power once explored.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "curious"
    ],
    "tags": [
      "exploration",
      "local"
    ],
    "repeatable": true
  },
  {
    "id": "sq-097",
    "title": "The Adventure Dealer",
    "description": "Create a quest for a friend and have them complete it.",
    "lore": "Great adventures deserve sequels.",
    "difficulty": "Medium",
    "category": "Community",
    "mode": [
      "duo"
    ],
    "xp": 200,
    "duration": 60,
    "moods": [
      "playful",
      "social"
    ],
    "tags": [
      "friendship",
      "challenge"
    ],
    "repeatable": true
  },
  {
    "id": "sq-098",
    "title": "The Legend Interview",
    "description": "Ask someone what the most interesting thing they've ever done is.",
    "lore": "Most legends are waiting to be asked.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 30,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "storytelling",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "sq-099",
    "title": "The Unrepeatable Day",
    "description": "Spend one hour doing something you'll probably never do again.",
    "lore": "Some experiences are meant to happen once.",
    "difficulty": "Legendary",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo"
    ],
    "xp": 500,
    "duration": 60,
    "moods": [
      "adventurous",
      "bold"
    ],
    "tags": [
      "bucket-list",
      "unique"
    ],
    "repeatable": false
  },
  {
    "id": "sq-100",
    "title": "The Story Worth Telling",
    "description": "Create a day that ends with a story you'll want to tell for years. Document it.",
    "lore": "The ultimate quest was never completion. It was remembrance.",
    "difficulty": "Legendary",
    "category": "Adventure",
    "mode": [
      "solo",
      "duo",
      "group"
    ],
    "xp": 600,
    "duration": 240,
    "moods": [
      "adventurous",
      "inspired"
    ],
    "tags": [
      "storytelling",
      "legendary",
      "life"
    ],
    "repeatable": false
  }
] as Quest[]

export function getQuestsForMode(mode: 'solo' | 'duo' | 'group'): Quest[] {
  return QUESTS.filter(q => q.mode.includes(mode))
}

export function getQuestById(id: string): Quest | undefined {
  return QUESTS.find(q => q.id === id)
}
