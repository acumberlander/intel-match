import mongoose from "mongoose";
import dotenv from "dotenv";
import { generateEmbedding } from "../services/aiServices";
import { PersonModel } from "../models/personModel";
import { VehicleModel } from "../models/vehicleModel";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const people = [
  {
    name: "John Doe",
    age: 34,
    description:
      "Tall man with a beard wearing a black hoodie. He walks with a slight limp and often carries a red backpack.",
  },
  {
    name: "Sarah Miles",
    age: 28,
    description:
      "Short woman with red hair and glasses. Seen frequently around the coffee shop near 5th street.",
  },
  {
    name: "Derrick Lane",
    age: 41,
    description:
      "Bald man wearing a gray trench coat. Often seen talking loudly on his phone in public parks.",
  },
  {
    name: "Tina Walker",
    age: 52,
    description:
      "Woman with short curly blonde hair and a noticeable tattoo on her neck. She wears dark sunglasses at night.",
  },
  {
    name: "Eric Vance",
    age: 23,
    description:
      "Young man in a blue windbreaker and ripped jeans. Has a small scar on his left cheek.",
  },
  {
    name: "Angela Simmons",
    age: 36,
    description:
      "Medium-height woman who wears a green coat and carries a tan purse. She speaks with a heavy accent.",
  },
  {
    name: "Marcus Fields",
    age: 45,
    description:
      "Broad-shouldered man in construction boots. His left eye appears swollen or injured.",
  },
  {
    name: "Nina Brooks",
    age: 30,
    description:
      "Woman wearing all white with long black braids. Has a very distinct laugh and walks quickly.",
  },
  {
    name: "Samuel O’Connor",
    age: 50,
    description:
      "Older gentleman with a limp and salt-and-pepper beard. Usually seen in a navy peacoat and brown loafers.",
  },
  {
    name: "Lisa Martin",
    age: 38,
    description:
      "Athletic woman who jogs regularly in the park. Wears a pink running jacket and has a knee brace.",
  },
];

const vehicles = [
  {
    make: "Toyota",
    model: "Camry",
    color: "White",
    description:
      "White Toyota sedan with tinted windows. There is a large dent on the front passenger side door.",
  },
  {
    make: "Dodge",
    model: "Charger",
    color: "Black",
    description:
      "Black Dodge Charger with dark rims. Rear bumper has visible scratches and the muffler is noticeably loud.",
  },
  {
    make: "Ford",
    model: "Explorer",
    color: "Blue",
    description:
      "Blue SUV with roof rack and police-style spotlight on driver side. Small crack in the rear windshield.",
  },
  {
    make: "Honda",
    model: "Civic",
    color: "Gray",
    description:
      "Compact gray car with black trim and worn tires. The front bumper is slightly detached on the right side.",
  },
  {
    make: "Chevy",
    model: "Tahoe",
    color: "Black",
    description:
      "Large black SUV with chrome rims and tinted tail lights. A scratch runs across the rear passenger door.",
  },
  {
    make: "Nissan",
    model: "Altima",
    color: "Red",
    description:
      "Red sedan with a cracked headlight and mismatched hubcaps. There are stickers on the back windshield.",
  },
  {
    make: "Tesla",
    model: "Model 3",
    color: "White",
    description:
      "White Tesla Model 3 with a broken driver side mirror. The front left tire appears to be low on air.",
  },
  {
    make: "BMW",
    model: "3 Series",
    color: "Silver",
    description:
      "Silver luxury sedan with a sunroof and dark interior. Scratches are visible on driver side front and rear doors.",
  },
  {
    make: "Jeep",
    model: "Wrangler",
    color: "Green",
    description:
      "Green off-road Jeep with oversized tires and mud stains. There is a dent in the rear quarter panel.",
  },
  {
    make: "Kia",
    model: "Soul",
    color: "Yellow",
    description:
      "Bright yellow compact car with a roof wrap and tinted windows. Has a small crack in the front windshield.",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await PersonModel.deleteMany();
    await VehicleModel.deleteMany();

    console.log("🧹 Cleared existing data");

    for (const person of people) {
      const embedding = await generateEmbedding(person.description);
      await PersonModel.create({ ...person, embedding });
    }

    for (const vehicle of vehicles) {
      const embedding = await generateEmbedding(vehicle.description);
      await VehicleModel.create({ ...vehicle, embedding });
    }

    console.log("🌱 Data seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
