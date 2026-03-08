const AFFIRMATIONS = {
  confidence: [
    "I trust myself to make the right decisions for my life.",
    "My voice matters, and I speak with confidence and clarity.",
    "I am capable of achieving anything I set my mind to.",
    "I walk into every room knowing I belong there.",
    "I do not need anyone's approval to be myself.",
    "My opinions are valuable and deserve to be heard.",
    "I am bold, brave, and unapologetically myself.",
    "I release the need for perfection and embrace my progress.",
    "I have the power to create the life I desire.",
    "I am confident in who I am and who I am becoming.",
  ],
  "self-love": [
    "I am worthy of love exactly as I am right now.",
    "I choose to be kind to myself today and every day.",
    "I forgive myself for past mistakes and embrace growth.",
    "I deserve the same compassion I give to others.",
    "My self-worth is not determined by others' opinions.",
    "I am at peace with who I am in this moment.",
    "I honor my needs and give myself permission to rest.",
    "I love the woman I have become and the one I am still becoming.",
    "I am my own best friend, and I treat myself with love.",
    "I celebrate my uniqueness — there is no one else like me.",
  ],
  strength: [
    "I have overcome challenges before, and I will overcome them again.",
    "My strength is not measured by what I carry, but by how I rise.",
    "I am stronger than my fears and bigger than my doubts.",
    "Every challenge I face is shaping me into a more powerful woman.",
    "I stand tall in the face of adversity with grace and courage.",
    "I draw strength from my experiences, both joyful and difficult.",
    "I am a force of nature — unstoppable and full of purpose.",
    "My inner strength guides me through every storm.",
    "I choose courage over comfort, and growth over fear.",
    "I am resilient, resourceful, and ready for whatever comes next.",
  ],
  career: [
    "I bring unique value to my work, and my contributions matter.",
    "I deserve success, and I am building it one step at a time.",
    "I am a leader, and I inspire those around me.",
    "My ambitions are valid, and I pursue them without guilt.",
    "I am worthy of recognition, respect, and fair compensation.",
    "I trust my skills and experience to guide me forward.",
    "Every setback in my career is a setup for a greater comeback.",
    "I create opportunities for myself and others around me.",
  ],
  "body-positivity": [
    "My body is my home, and I treat it with love and respect.",
    "I am beautiful in my own unique and radiant way.",
    "My worth is not defined by my appearance or a number on a scale.",
    "I nourish my body because it deserves care, not punishment.",
    "Every part of me is worthy of love and acceptance.",
    "I celebrate what my body can do, not just how it looks.",
    "I release comparison and embrace my own definition of beauty.",
    "My body tells the story of my life, and every chapter is beautiful.",
  ],
  resilience: [
    "I am not defined by my setbacks; I am defined by my comebacks.",
    "Every ending is a new beginning waiting to unfold.",
    "I have the courage to start over as many times as it takes.",
    "Difficult times are building my character and deepening my wisdom.",
    "I bend but I do not break — I am flexible and strong.",
    "I transform my pain into purpose and my struggles into strength.",
    "I give myself grace during hard seasons, knowing they will pass.",
    "I trust the timing of my life, even when it feels uncertain.",
  ],
};

const CATEGORY_LABELS = {
  confidence: "Confidence",
  "self-love": "Self-Love",
  strength: "Strength",
  career: "Career",
  "body-positivity": "Body Positivity",
  resilience: "Resilience",
};

const CATEGORY_ICONS = {
  confidence: "star",
  "self-love": "heart",
  strength: "flash",
  career: "briefcase",
  "body-positivity": "flower",
  resilience: "shield-checkmark",
};

const ALL_AFFIRMATIONS = Object.values(AFFIRMATIONS).flat();

export { AFFIRMATIONS, CATEGORY_LABELS, CATEGORY_ICONS, ALL_AFFIRMATIONS };
