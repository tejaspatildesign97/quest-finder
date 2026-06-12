import type { Quest } from './types'

// Quest library — merged from Side_Quest_Finder_100_Quests_Final.xlsx
// and Side_Quest_Finder_Couple_solo_Quests_30.xlsx
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
      "friends"
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
  },
  {
    "id": "cq-001",
    "title": "The First Date Remix",
    "description": "Recreate your first date with one intentional upgrade.",
    "lore": "Even legendary quests deserve remasters.",
    "difficulty": "Medium",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 200,
    "duration": 120,
    "moods": [
      "nostalgic",
      "romantic"
    ],
    "tags": [
      "date",
      "relationship"
    ],
    "repeatable": false
  },
  {
    "id": "cq-002",
    "title": "Future Postcard",
    "description": "Write postcards to your future selves and open them in one year.",
    "lore": "Time is the longest-distance relationship.",
    "difficulty": "Medium",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 45,
    "moods": [
      "reflective",
      "romantic"
    ],
    "tags": [
      "future",
      "memories"
    ],
    "repeatable": false
  },
  {
    "id": "cq-003",
    "title": "Stranger's Date Night",
    "description": "Let strangers choose your date itinerary.",
    "lore": "Fate occasionally moonlights as a matchmaker.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "couple"
    ],
    "xp": 320,
    "duration": 180,
    "moods": [
      "adventurous",
      "chaotic"
    ],
    "tags": [
      "date",
      "people"
    ],
    "repeatable": true
  },
  {
    "id": "cq-004",
    "title": "Memory Auction",
    "description": "Each partner bids on their favorite shared memory.",
    "lore": "The richest couples collect moments.",
    "difficulty": "Easy",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "nostalgic",
      "heartfelt"
    ],
    "tags": [
      "memories"
    ],
    "repeatable": true
  },
  {
    "id": "cq-005",
    "title": "The Love Interview",
    "description": "Ask each other 20 questions you've never asked before.",
    "lore": "Every person is still partially undiscovered.",
    "difficulty": "Medium",
    "category": "Connection",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "intimate",
      "curious"
    ],
    "tags": [
      "communication"
    ],
    "repeatable": true
  },
  {
    "id": "cq-006",
    "title": "Secret Mission",
    "description": "Plan a surprise mini-adventure for your partner.",
    "lore": "Love enjoys plot twists.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "couple"
    ],
    "xp": 250,
    "duration": 90,
    "moods": [
      "playful",
      "romantic"
    ],
    "tags": [
      "surprise"
    ],
    "repeatable": true
  },
  {
    "id": "cq-007",
    "title": "The Couple Time Capsule",
    "description": "Gather 5 items representing your relationship today.",
    "lore": "History deserves preservation.",
    "difficulty": "Medium",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "nostalgic",
      "reflective"
    ],
    "tags": [
      "keepsake"
    ],
    "repeatable": false
  },
  {
    "id": "cq-008",
    "title": "Reverse Date",
    "description": "Each partner plans a date they'd normally never choose.",
    "lore": "New worlds hide beyond preferences.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 120,
    "moods": [
      "curious",
      "playful"
    ],
    "tags": [
      "challenge",
      "date"
    ],
    "repeatable": true
  },
  {
    "id": "cq-009",
    "title": "The $20 Adventure",
    "description": "Create the best date possible on a tiny budget.",
    "lore": "Creativity beats currency.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "couple"
    ],
    "xp": 280,
    "duration": 120,
    "moods": [
      "playful",
      "creative"
    ],
    "tags": [
      "budget",
      "date"
    ],
    "repeatable": true
  },
  {
    "id": "cq-010",
    "title": "Parallel Lives",
    "description": "Spend an hour imagining how you'd meet in another universe.",
    "lore": "Destiny enjoys alternate endings.",
    "difficulty": "Easy",
    "category": "Creativity",
    "mode": [
      "couple"
    ],
    "xp": 140,
    "duration": 45,
    "moods": [
      "romantic",
      "creative"
    ],
    "tags": [
      "storytelling"
    ],
    "repeatable": true
  },
  {
    "id": "cq-011",
    "title": "The Compliment Duel",
    "description": "Alternate giving increasingly specific compliments.",
    "lore": "Charisma is stronger in pairs.",
    "difficulty": "Easy",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 120,
    "duration": 20,
    "moods": [
      "positive",
      "romantic"
    ],
    "tags": [
      "appreciation"
    ],
    "repeatable": true
  },
  {
    "id": "cq-012",
    "title": "Local Legends",
    "description": "Find the oldest restaurant in town and share a meal.",
    "lore": "Love stories appreciate historic settings.",
    "difficulty": "Medium",
    "category": "Food",
    "mode": [
      "couple"
    ],
    "xp": 180,
    "duration": 120,
    "moods": [
      "romantic",
      "curious"
    ],
    "tags": [
      "food",
      "history"
    ],
    "repeatable": true
  },
  {
    "id": "cq-013",
    "title": "The Photo Scavenger Hunt",
    "description": "Capture 10 photos representing your relationship.",
    "lore": "Every relationship has symbols.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 90,
    "moods": [
      "playful",
      "creative"
    ],
    "tags": [
      "photography"
    ],
    "repeatable": true
  },
  {
    "id": "cq-014",
    "title": "The No-Phone Quest",
    "description": "Spend three hours together without any screens.",
    "lore": "Ancient couples survived this challenge.",
    "difficulty": "Medium",
    "category": "Mindfulness",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 180,
    "moods": [
      "connected",
      "present"
    ],
    "tags": [
      "digital-detox"
    ],
    "repeatable": true,
    "timeLimit": "180"
  },
  {
    "id": "cq-015",
    "title": "Secret Café",
    "description": "Enter the first café you've never noticed before.",
    "lore": "Familiar cities hide unfamiliar corners.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "couple"
    ],
    "xp": 140,
    "duration": 60,
    "moods": [
      "curious",
      "chill"
    ],
    "tags": [
      "exploration"
    ],
    "repeatable": true
  },
  {
    "id": "cq-016",
    "title": "The Gratitude Exchange",
    "description": "Exchange handwritten letters of appreciation.",
    "lore": "Written words level up over time.",
    "difficulty": "Medium",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 45,
    "moods": [
      "heartfelt",
      "romantic"
    ],
    "tags": [
      "letters"
    ],
    "repeatable": false
  },
  {
    "id": "cq-017",
    "title": "The Adventure Jar",
    "description": "Fill a jar with 20 future adventures together.",
    "lore": "Future memories deserve planning.",
    "difficulty": "Easy",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "hopeful",
      "romantic"
    ],
    "tags": [
      "bucket-list"
    ],
    "repeatable": true
  },
  {
    "id": "cq-018",
    "title": "Couple Karaoke Roulette",
    "description": "Randomly choose songs for each other to perform.",
    "lore": "Courage sounds better as a duet.",
    "difficulty": "Hard",
    "category": "Chaos",
    "mode": [
      "couple"
    ],
    "xp": 280,
    "duration": 60,
    "moods": [
      "playful",
      "chaotic"
    ],
    "tags": [
      "music",
      "fun"
    ],
    "repeatable": true
  },
  {
    "id": "cq-019",
    "title": "The Dream Map",
    "description": "Draw your ideal future together.",
    "lore": "Architects build twice.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "hopeful",
      "creative"
    ],
    "tags": [
      "future",
      "planning"
    ],
    "repeatable": true
  },
  {
    "id": "cq-020",
    "title": "Sunset Pact",
    "description": "Watch a sunset somewhere neither of you have visited.",
    "lore": "Shared sunsets grant bonus XP.",
    "difficulty": "Easy",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 140,
    "duration": 60,
    "moods": [
      "romantic",
      "peaceful"
    ],
    "tags": [
      "sunset"
    ],
    "repeatable": true
  },
  {
    "id": "cq-021",
    "title": "The Human Playlist",
    "description": "Build a playlist of songs that define your relationship.",
    "lore": "Soundtracks preserve stories.",
    "difficulty": "Easy",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "nostalgic",
      "romantic"
    ],
    "tags": [
      "music"
    ],
    "repeatable": true
  },
  {
    "id": "cq-022",
    "title": "Memory Lane",
    "description": "Visit three locations important to your relationship.",
    "lore": "Checkpoints reveal progress.",
    "difficulty": "Medium",
    "category": "Discovery",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 120,
    "moods": [
      "nostalgic",
      "romantic"
    ],
    "tags": [
      "memories"
    ],
    "repeatable": true
  },
  {
    "id": "cq-023",
    "title": "The Trust Quest",
    "description": "One partner chooses the destination, the other follows blindly.",
    "lore": "Trust is fast travel.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "couple"
    ],
    "xp": 320,
    "duration": 120,
    "moods": [
      "adventurous",
      "trusting"
    ],
    "tags": [
      "surprise"
    ],
    "repeatable": true
  },
  {
    "id": "cq-024",
    "title": "Future Dinner",
    "description": "Plan a celebration meal you'll have five years from now.",
    "lore": "Hope deserves reservations.",
    "difficulty": "Easy",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "hopeful",
      "romantic"
    ],
    "tags": [
      "future"
    ],
    "repeatable": true
  },
  {
    "id": "cq-025",
    "title": "The Story Collector",
    "description": "Gather three stories from couples older than you.",
    "lore": "Wisdom travels through generations.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 90,
    "moods": [
      "curious",
      "reflective"
    ],
    "tags": [
      "relationships"
    ],
    "repeatable": true
  },
  {
    "id": "cq-026",
    "title": "The Couple Challenge Swap",
    "description": "Each partner creates a challenge for the other.",
    "lore": "Growth is more fun together.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "playful",
      "brave"
    ],
    "tags": [
      "challenge"
    ],
    "repeatable": true
  },
  {
    "id": "cq-027",
    "title": "The Midnight Walk",
    "description": "Take a safe late-night walk and discuss your biggest dreams.",
    "lore": "Night asks better questions.",
    "difficulty": "Medium",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "intimate",
      "reflective"
    ],
    "tags": [
      "dreams"
    ],
    "repeatable": true
  },
  {
    "id": "cq-028",
    "title": "The Relationship Museum",
    "description": "Create a mini exhibit of relationship artifacts.",
    "lore": "Every love story belongs in a museum.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "couple"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "nostalgic",
      "creative"
    ],
    "tags": [
      "memories"
    ],
    "repeatable": true
  },
  {
    "id": "cq-029",
    "title": "The Impossible Day",
    "description": "Say yes to each other's reasonable suggestions for one day.",
    "lore": "Adventure favors agreement.",
    "difficulty": "Legendary",
    "category": "Adventure",
    "mode": [
      "couple"
    ],
    "xp": 550,
    "duration": 480,
    "moods": [
      "adventurous",
      "chaotic"
    ],
    "tags": [
      "spontaneity"
    ],
    "repeatable": true,
    "timeLimit": "480"
  },
  {
    "id": "cq-030",
    "title": "The Love Story Worth Telling",
    "description": "Create a day designed to become a future favorite memory.",
    "lore": "Some days become legends.",
    "difficulty": "Legendary",
    "category": "Romance",
    "mode": [
      "couple"
    ],
    "xp": 600,
    "duration": 240,
    "moods": [
      "romantic",
      "adventurous"
    ],
    "tags": [
      "storytelling",
      "legendary"
    ],
    "repeatable": false
  },
  {
    "id": "sqs-001",
    "title": "The 7th Turn",
    "description": "At the seventh turn you encounter today, take it and explore.",
    "lore": "Destiny occasionally hides in detours.",
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
      "exploration",
      "random"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-002",
    "title": "Window Stories",
    "description": "Invent stories for five windows you pass.",
    "lore": "Every window frames another world.",
    "difficulty": "Easy",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "creative",
      "curious"
    ],
    "tags": [
      "imagination",
      "observation"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-003",
    "title": "The One-Question Day",
    "description": "Ask everyone the same meaningful question.",
    "lore": "Patterns reveal themselves through repetition.",
    "difficulty": "Medium",
    "category": "Social",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 60,
    "moods": [
      "curious",
      "social"
    ],
    "tags": [
      "conversation"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-004",
    "title": "Borrowed Routine",
    "description": "Adopt a routine from someone you admire for one day.",
    "lore": "Greatness leaves footprints.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 1440,
    "moods": [
      "inspired",
      "curious"
    ],
    "tags": [
      "habits",
      "self-growth"
    ],
    "repeatable": true,
    "timeLimit": 1440
  },
  {
    "id": "sqs-005",
    "title": "The Unfamiliar Aisle",
    "description": "Spend 20 minutes exploring a section of a store you've never visited.",
    "lore": "Unknown kingdoms exist everywhere.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "curious"
    ],
    "tags": [
      "exploration",
      "shopping"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-006",
    "title": "Soundtrack Walk",
    "description": "Create a soundtrack for your neighborhood while walking through it.",
    "lore": "Every world deserves background music.",
    "difficulty": "Easy",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "reflective",
      "creative"
    ],
    "tags": [
      "music",
      "walking"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-007",
    "title": "The Observer's Notebook",
    "description": "Record 25 unusual details you notice today.",
    "lore": "Attention is a superpower.",
    "difficulty": "Medium",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "reflective",
      "curious"
    ],
    "tags": [
      "awareness",
      "journaling"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-008",
    "title": "The Courage Coupon",
    "description": "Do one small thing you've been putting off.",
    "lore": "Delayed quests still count.",
    "difficulty": "Medium",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 30,
    "moods": [
      "brave",
      "determined"
    ],
    "tags": [
      "fear",
      "growth"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-009",
    "title": "Forgotten Skill",
    "description": "Practice a skill you haven't used in years.",
    "lore": "Rust is temporary.",
    "difficulty": "Easy",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 45,
    "moods": [
      "nostalgic",
      "inspired"
    ],
    "tags": [
      "hobbies",
      "skills"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-010",
    "title": "Reverse Commute",
    "description": "Travel somewhere with no destination in mind.",
    "lore": "Wandering is a valid strategy.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 280,
    "duration": 120,
    "moods": [
      "adventurous",
      "free"
    ],
    "tags": [
      "travel",
      "explore"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-011",
    "title": "The Hidden Floor",
    "description": "Visit a floor of a building you've never been on.",
    "lore": "New perspectives are often one staircase away.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "curious"
    ],
    "tags": [
      "architecture",
      "explore"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-012",
    "title": "Personal Museum",
    "description": "Gather five objects that represent who you are today.",
    "lore": "Curators know themselves best.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 45,
    "moods": [
      "reflective"
    ],
    "tags": [
      "identity",
      "memories"
    ],
    "repeatable": false
  },
  {
    "id": "sqs-013",
    "title": "The Reverse Expert",
    "description": "Learn about a topic you normally avoid.",
    "lore": "Curiosity grows strongest at the edges.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 60,
    "moods": [
      "curious",
      "open-minded"
    ],
    "tags": [
      "education"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-014",
    "title": "The Silent Meal",
    "description": "Eat an entire meal without any entertainment or distractions.",
    "lore": "Flavor improves when attention arrives.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "calm",
      "present"
    ],
    "tags": [
      "food",
      "mindfulness"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-015",
    "title": "Tiny Documentary",
    "description": "Create a one-minute documentary about something ordinary.",
    "lore": "Every subject becomes interesting with enough attention.",
    "difficulty": "Medium",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 90,
    "moods": [
      "creative",
      "playful"
    ],
    "tags": [
      "video",
      "storytelling"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-016",
    "title": "The Unknown Name",
    "description": "Learn the name and story behind a local landmark.",
    "lore": "Places remember their origins.",
    "difficulty": "Easy",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "curious"
    ],
    "tags": [
      "history",
      "local"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-017",
    "title": "The Question Trail",
    "description": "Follow a chain of five questions until you discover something unexpected.",
    "lore": "Answers create more questions.",
    "difficulty": "Medium",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 200,
    "duration": 45,
    "moods": [
      "curious",
      "thoughtful"
    ],
    "tags": [
      "research"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-018",
    "title": "Weather Chaser",
    "description": "Spend time outside specifically because of today's weather.",
    "lore": "Every forecast is an invitation.",
    "difficulty": "Easy",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "adventurous",
      "free"
    ],
    "tags": [
      "nature",
      "weather"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-019",
    "title": "The Alternate Schedule",
    "description": "Rearrange your day completely differently.",
    "lore": "Routine is merely a suggestion.",
    "difficulty": "Medium",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 220,
    "duration": 720,
    "moods": [
      "playful",
      "curious"
    ],
    "tags": [
      "routine",
      "experiment"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-020",
    "title": "Public Sketchbook",
    "description": "Sketch or write observations in a public place.",
    "lore": "Artists collect moments.",
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
      "drawing",
      "writing"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-021",
    "title": "The Five-Minute Hero",
    "description": "Solve a small problem for yourself immediately.",
    "lore": "Progress prefers action.",
    "difficulty": "Easy",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 15,
    "moods": [
      "productive",
      "determined"
    ],
    "tags": [
      "action",
      "growth"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-022",
    "title": "The Forgotten Route",
    "description": "Walk a street you've never walked before.",
    "lore": "Exploration begins one block away.",
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
      "neighborhood"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-023",
    "title": "The Curiosity Purchase",
    "description": "Spend a small amount on something purely because it interests you.",
    "lore": "Wonder deserves investment.",
    "difficulty": "Easy",
    "category": "Discovery",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 20,
    "moods": [
      "curious",
      "playful"
    ],
    "tags": [
      "shopping",
      "explore"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-024",
    "title": "The Time Audit",
    "description": "Document exactly how you spend one hour.",
    "lore": "Awareness changes behavior.",
    "difficulty": "Medium",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 180,
    "duration": 60,
    "moods": [
      "reflective"
    ],
    "tags": [
      "productivity",
      "self-awareness"
    ],
    "repeatable": true,
    "timeLimit": 60
  },
  {
    "id": "sqs-025",
    "title": "The Impossible Introduction",
    "description": "Introduce yourself in a memorable way.",
    "lore": "First impressions are tiny performances.",
    "difficulty": "Hard",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 280,
    "duration": 20,
    "moods": [
      "brave",
      "playful"
    ],
    "tags": [
      "confidence",
      "social"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-026",
    "title": "Secret Sunrise Spot",
    "description": "Find a sunrise location you've never visited before.",
    "lore": "Dawn favors explorers.",
    "difficulty": "Hard",
    "category": "Adventure",
    "mode": [
      "solo"
    ],
    "xp": 280,
    "duration": 90,
    "moods": [
      "peaceful",
      "adventurous"
    ],
    "tags": [
      "sunrise"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-027",
    "title": "The Story Seed",
    "description": "Write the first paragraph of a story inspired by today.",
    "lore": "Great tales begin with observation.",
    "difficulty": "Easy",
    "category": "Creativity",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 20,
    "moods": [
      "creative"
    ],
    "tags": [
      "writing",
      "storytelling"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-028",
    "title": "The Reverse Search",
    "description": "Pick a random object and learn its history.",
    "lore": "Every object has an origin story.",
    "difficulty": "Easy",
    "category": "Learning",
    "mode": [
      "solo"
    ],
    "xp": 120,
    "duration": 30,
    "moods": [
      "curious"
    ],
    "tags": [
      "history",
      "research"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-029",
    "title": "The Solo Celebration",
    "description": "Celebrate something only you know about.",
    "lore": "Personal victories still deserve fireworks.",
    "difficulty": "Easy",
    "category": "Mindfulness",
    "mode": [
      "solo"
    ],
    "xp": 100,
    "duration": 20,
    "moods": [
      "joyful",
      "reflective"
    ],
    "tags": [
      "celebration"
    ],
    "repeatable": true
  },
  {
    "id": "sqs-030",
    "title": "The New Chapter",
    "description": "Start something you've been meaning to begin for months.",
    "lore": "Every journey has a first step.",
    "difficulty": "Legendary",
    "category": "Courage",
    "mode": [
      "solo"
    ],
    "xp": 500,
    "duration": 120,
    "moods": [
      "determined",
      "inspired"
    ],
    "tags": [
      "goals",
      "life-change"
    ],
    "repeatable": false
  }
] as Quest[]

export function getQuestsForMode(mode: 'solo' | 'couple' | 'friends'): Quest[] {
  return QUESTS.filter(q => q.mode.includes(mode))
}

export function getQuestById(id: string): Quest | undefined {
  return QUESTS.find(q => q.id === id)
}
