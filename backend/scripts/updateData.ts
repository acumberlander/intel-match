import mongoose from "mongoose";
import dotenv from "dotenv";

import { PersonModel } from "../models/personModel";
import { VehicleModel } from "../models/vehicleModel";
import { CrimeModel } from "../models/crimeModel";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

const CRIME_TYPES = [
  "theft",
  "burglary",
  "assault",
  "vandalism",
  "fraud",
  "hit and run",
  "grand theft auto",
  "trespassing",
  "identity theft",
];

function getRandomDateWithinLast3Years(): Date {
  const now = new Date();
  const past = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  );
}

async function updateData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const people = await PersonModel.find({});
    const vehicles = await VehicleModel.find({});

    // Assign unregistered vehicles to people, mark extras as stolen
    let personIndex = 0;
    const updatedVehicles = await Promise.all(
      vehicles.map(async (vehicle) => {
        if (!vehicle.registeredTo) {
          if (personIndex < people.length) {
            vehicle.registeredTo = people[personIndex]._id;
            vehicle.isStolen = false;
            personIndex++;
          } else {
            vehicle.isStolen = true;
          }
          return vehicle.save();
        }
        return vehicle;
      })
    );

    console.log(`🚗 Processed ${updatedVehicles.length} vehicles`);

    // Add mock crimes
    let crimesCreated = 0;

    for (const person of people) {
      if (!person.crimeHistory || person.crimeHistory.length === 0) {
        const type =
          CRIME_TYPES[Math.floor(Math.random() * CRIME_TYPES.length)];
        const date = getRandomDateWithinLast3Years();
        const notes = `Incident occurred involving ${type}. Subject: ${person.name}`;

        // Randomly choose if a vehicle should be linked
        const linkedVehicle = vehicles.find(
          (v) => v.registeredTo?.toString() === person._id.toString()
        );

        const crime = await CrimeModel.create({
          person: person._id,
          vehicle:
            Math.random() < 0.5 && linkedVehicle
              ? linkedVehicle._id
              : undefined,
          type,
          date,
          notes,
        });

        person.crimeHistory = [crime._id];
        await person.save();

        crimesCreated++;
      }
    }

    console.log(`🧑‍💼 Created ${crimesCreated} crime records`);
    console.log("✅ Data update complete");
    process.exit(0);
  } catch (err) {
    console.error("❌ Update failed:", err);
    process.exit(1);
  }
}

updateData();
