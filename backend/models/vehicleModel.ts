export type Vehicle = {
  id: string;
  make: string;
  model: string;
  color: string;
  description: string;
  embedding: number[];
};

export const vehicleData: Vehicle[] = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    color: "White",
    description:
      "White Toyota sedan with tinted windows. There is a large dent on the front passenger side door.",
    embedding: [0.3, 0.2, 0.5],
  },
  {
    id: "2",
    make: "Dodge",
    model: "Charger",
    color: "Black",
    description:
      "Black Dodge Charger with dark rims. Rear bumper has visible scratches and the muffler is noticeably loud.",
    embedding: [0.5, 0.1, 0.3],
  },
  {
    id: "3",
    make: "Ford",
    model: "Explorer",
    color: "Blue",
    description:
      "Blue SUV with roof rack and police-style spotlight on driver side. Small crack in the rear windshield.",
    embedding: [0.6, 0.4, 0.3],
  },
  {
    id: "4",
    make: "Honda",
    model: "Civic",
    color: "Gray",
    description:
      "Compact gray car with black trim and worn tires. The front bumper is slightly detached on the right side.",
    embedding: [0.2, 0.5, 0.3],
  },
  {
    id: "5",
    make: "Chevy",
    model: "Tahoe",
    color: "Black",
    description:
      "Large black SUV with chrome rims and tinted tail lights. A scratch runs across the rear passenger door.",
    embedding: [0.4, 0.2, 0.6],
  },
  {
    id: "6",
    make: "Nissan",
    model: "Altima",
    color: "Red",
    description:
      "Red sedan with a cracked headlight and mismatched hubcaps. There are stickers on the back windshield.",
    embedding: [0.3, 0.4, 0.5],
  },
  {
    id: "7",
    make: "Tesla",
    model: "Model 3",
    color: "White",
    description:
      "White Tesla Model 3 with a broken driver side mirror. The front left tire appears to be low on air.",
    embedding: [0.2, 0.1, 0.4],
  },
  {
    id: "8",
    make: "BMW",
    model: "3 Series",
    color: "Silver",
    description:
      "Silver luxury sedan with a sunroof and dark interior. Scratches are visible on driver side front and rear doors.",
    embedding: [0.5, 0.3, 0.4],
  },
  {
    id: "9",
    make: "Jeep",
    model: "Wrangler",
    color: "Green",
    description:
      "Green off-road Jeep with oversized tires and mud stains. There is a dent in the rear quarter panel.",
    embedding: [0.6, 0.2, 0.5],
  },
  {
    id: "10",
    make: "Kia",
    model: "Soul",
    color: "Yellow",
    description:
      "Bright yellow compact car with a roof wrap and tinted windows. Has a small crack in the front windshield.",
    embedding: [0.4, 0.6, 0.2],
  },
];
