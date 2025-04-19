export type Person = {
  id: string;
  name: string;
  age: number;
  description: string;
  embedding: number[]; // Mocked for now
};

export const personData: Person[] = [
  {
    id: "1",
    name: "John Doe",
    age: 34,
    description:
      "Tall man with a beard wearing a black hoodie. He walks with a slight limp and often carries a red backpack.",
    embedding: [0.1, 0.2, 0.3],
  },
  {
    id: "2",
    name: "Sarah Miles",
    age: 28,
    description:
      "Short woman with red hair and glasses. Seen frequently around the coffee shop near 5th street.",
    embedding: [0.4, 0.5, 0.6],
  },
  {
    id: "3",
    name: "Derrick Lane",
    age: 41,
    description:
      "Bald man wearing a gray trench coat. Often seen talking loudly on his phone in public parks.",
    embedding: [0.2, 0.1, 0.6],
  },
  {
    id: "4",
    name: "Tina Walker",
    age: 52,
    description:
      "Woman with short curly blonde hair and a noticeable tattoo on her neck. She wears dark sunglasses at night.",
    embedding: [0.3, 0.6, 0.7],
  },
  {
    id: "5",
    name: "Eric Vance",
    age: 23,
    description:
      "Young man in a blue windbreaker and ripped jeans. Has a small scar on his left cheek.",
    embedding: [0.6, 0.2, 0.1],
  },
  {
    id: "6",
    name: "Angela Simmons",
    age: 36,
    description:
      "Medium-height woman who wears a green coat and carries a tan purse. She speaks with a heavy accent.",
    embedding: [0.2, 0.3, 0.4],
  },
  {
    id: "7",
    name: "Marcus Fields",
    age: 45,
    description:
      "Broad-shouldered man in construction boots. His left eye appears swollen or injured.",
    embedding: [0.7, 0.3, 0.1],
  },
  {
    id: "8",
    name: "Nina Brooks",
    age: 30,
    description:
      "Woman wearing all white with long black braids. Has a very distinct laugh and walks quickly.",
    embedding: [0.5, 0.4, 0.2],
  },
  {
    id: "9",
    name: "Samuel O’Connor",
    age: 50,
    description:
      "Older gentleman with a limp and salt-and-pepper beard. Usually seen in a navy peacoat and brown loafers.",
    embedding: [0.1, 0.4, 0.6],
  },
  {
    id: "10",
    name: "Lisa Martin",
    age: 38,
    description:
      "Athletic woman who jogs regularly in the park. Wears a pink running jacket and has a knee brace.",
    embedding: [0.3, 0.5, 0.3],
  },
];
