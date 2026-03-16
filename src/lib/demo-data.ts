export const demoMeals = [
  {
    id: "1",
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust. Made with authentic San Marzano tomatoes and extra virgin olive oil.",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    calories: 850,
    cuisine: "Italian",
    dietary: ["Vegetarian"],
    spiceLevel: "Mild",
    isAvailable: true,
    mealType: "Lunch",
    ingredients: [
      "Mozzarella",
      "Tomatoes",
      "Basil",
      "Olive Oil",
      "Pizza Dough",
      "Parmesan",
    ],
    category: {
      id: "1",
      name: "Pizza",
    },
    provider: {
      id: "1",
      businessName: "Italian Kitchen",
    },
  },
  {
    id: "2",
    name: "Spicy Chicken Burger",
    description:
      "Juicy grilled chicken breast with spicy sauce, lettuce, tomatoes, and crispy bacon. Served on a toasted brioche bun with seasoned fries.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    calories: 920,
    cuisine: "American",
    dietary: [],
    spiceLevel: "Hot",
    isAvailable: true,
    mealType: "Lunch",
    ingredients: [
      "Chicken Breast",
      "Brioche Bun",
      "Lettuce",
      "Tomato",
      "Bacon",
      "Spicy Sauce",
      "Cheese",
    ],
    category: {
      id: "2",
      name: "Burger",
    },
    provider: {
      id: "2",
      businessName: "Burger House",
    },
  },
  {
    id: "3",
    name: "Salmon Sushi Platter",
    description:
      "Fresh salmon nigiri and maki rolls served with wasabi, pickled ginger, and soy sauce. Made with premium sushi-grade salmon.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fdce51?w=800&h=600&fit=crop",
    calories: 480,
    cuisine: "Japanese",
    dietary: ["Pescatarian", "Gluten-Free"],
    spiceLevel: "Mild",
    isAvailable: true,
    mealType: "Dinner",
    ingredients: [
      "Salmon",
      "Sushi Rice",
      "Nori",
      "Wasabi",
      "Pickled Ginger",
      "Soy Sauce",
      "Avocado",
    ],
    category: {
      id: "3",
      name: "Sushi",
    },
    provider: {
      id: "3",
      businessName: "Tokyo Sushi Bar",
    },
  },
  {
    id: "4",
    name: "Creamy Carbonara Pasta",
    description:
      "Traditional Italian pasta with crispy pancetta, egg yolk, Pecorino Romano cheese, and black pepper. Rich and creamy without heavy cream.",
    price: 16.99,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop",
    calories: 780,
    cuisine: "Italian",
    dietary: [],
    spiceLevel: "Mild",
    isAvailable: true,
    mealType: "Dinner",
    ingredients: [
      "Spaghetti",
      "Pancetta",
      "Eggs",
      "Pecorino Romano",
      "Black Pepper",
      "Garlic",
    ],
    category: {
      id: "4",
      name: "Pasta",
    },
    provider: {
      id: "1",
      businessName: "Italian Kitchen",
    },
  },
  {
    id: "5",
    name: "Mediterranean Quinoa Bowl",
    description:
      "Healthy bowl with quinoa, cherry tomatoes, cucumber, feta cheese, olives, and lemon-herb dressing. Packed with nutrients and flavor.",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    calories: 520,
    cuisine: "Mediterranean",
    dietary: ["Vegetarian", "Gluten-Free"],
    spiceLevel: "Mild",
    isAvailable: true,
    mealType: "Lunch",
    ingredients: [
      "Quinoa",
      "Cherry Tomatoes",
      "Cucumber",
      "Feta Cheese",
      "Olives",
      "Lemon",
      "Herbs",
      "Olive Oil",
    ],
    category: {
      id: "5",
      name: "Salad",
    },
    provider: {
      id: "4",
      businessName: "Fresh & Healthy",
    },
  },
  {
    id: "6",
    name: "Chocolate Lava Cake",
    description:
      "Decadent warm chocolate cake with a molten chocolate center. Served with vanilla ice cream and fresh berries. Perfect ending to any meal.",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=600&fit=crop",
    calories: 650,
    cuisine: "French",
    dietary: ["Vegetarian"],
    spiceLevel: "Mild",
    isAvailable: true,
    mealType: "Dessert",
    ingredients: [
      "Dark Chocolate",
      "Butter",
      "Eggs",
      "Sugar",
      "Flour",
      "Vanilla Ice Cream",
      "Berries",
    ],
    category: {
      id: "6",
      name: "Dessert",
    },
    provider: {
      id: "5",
      businessName: "Sweet Delights",
    },
  },
  {
    id: "7",
    name: "Grilled Chicken Caesar Salad",
    description:
      "Fresh romaine lettuce with grilled chicken, parmesan cheese, croutons, and classic Caesar dressing.",
    price: 11.99,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop",
    calories: 420,
    cuisine: "American",
    dietary: [],
    spiceLevel: "Mild",
    isAvailable: false,
    mealType: "Lunch",
    ingredients: [
      "Romaine Lettuce",
      "Grilled Chicken",
      "Parmesan",
      "Croutons",
      "Caesar Dressing",
    ],
    category: {
      id: "5",
      name: "Salad",
    },
    provider: {
      id: "4",
      businessName: "Fresh & Healthy",
    },
  },
  {
    id: "8",
    name: "Pad Thai Noodles",
    description:
      "Authentic Thai stir-fried rice noodles with shrimp, tofu, peanuts, bean sprouts, and tamarind sauce.",
    price: 15.99,
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
    calories: 680,
    cuisine: "Thai",
    dietary: ["Pescatarian"],
    spiceLevel: "Medium",
    isAvailable: true,
    mealType: "Dinner",
    ingredients: [
      "Rice Noodles",
      "Shrimp",
      "Tofu",
      "Peanuts",
      "Bean Sprouts",
      "Tamarind",
      "Lime",
      "Cilantro",
    ],
    category: {
      id: "7",
      name: "Noodles",
    },
    provider: {
      id: "6",
      businessName: "Bangkok Street Food",
    },
  },
];

export const getMealById = (id: string) => {
  return demoMeals.find((meal) => meal.id === id);
};
