const serverUrl = "https://prod-ts-liveliness-server.onrender.com/api";

const socials = [
    "/static/instagram.svg",
    "/static/twitter.svg",
    "/static/youtube.svg",
    "/static/web.svg"
];

const tabs = [
    "Events",
    "Prices",
    "Reviews",
];

const reviewCards = [
    {
        name: "George",
        date: "28 Sep 2023",
        stars: 5,
        review:
            "I've seen amazing results in just a few weeks, and I feel stronger and healthier than ever before. The variety of workouts keeps things interesting, and the sense of community in the class is wonderful.",
    },
    {
        name: "Anna",
        date: "15 Sep 2023",
        stars: 4,
        review:
            "The workouts are well-structured, and I love how the trainers motivate you to push harder. Highly recommended!",
    },
    {
        name: "Michael",
        date: "10 Sep 2023",
        stars: 5,
        review:
            "Joining this program was one of the best decisions I’ve made. It’s changed my lifestyle for the better.",
    },
    {
        name: "Sophia",
        date: "5 Sep 2023",
        stars: 3,
        review:
            "The workouts are great, but I wish the class times were more flexible.",
    },
    ...Array.from({ length: 16 }, (_, index) => ({
        name: `User ${index + 5}`,
        date: "1 Sep 2023",
        stars: (index % 5) + 1,
        review: "Great experience with the program. Highly recommend it!",
    })),
].slice(0, 20);

const categories = [
    "Alpine",
    "Barrefit",
    "Beach Volley",
    "BMX",
    "Boxing",
    "Bouldering",
    "Calisthenics",
    "City Cycling",
    "Climbing",
    "Fitness",
    "Golf",
    "Hiking",
    "Inline Skate",
    "Mountain Bike",
    "Padel",
    "Parkour",
    "Paddle Surf",
    "Road Cycling",
    "Roller Skate",
    "Running",
    "Skiing",
    "Skateboarding",
    "Snowboard",
    "Surf",
    "Surf Skate",
    "Swimming",
    "Tennis",
    "Trail Running",
    "Wellness",
    "Yoga"
];

export {
    socials,
    tabs,
    reviewCards,
    categories,
    serverUrl
};