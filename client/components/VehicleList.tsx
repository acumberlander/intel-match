"use client";
import React from "react";
import { Vehicle } from "../types/Vehicle";

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList = ({vehicles}: VehicleListProps) => {
  if (!vehicles?.length) return null;

  return (
    <div className="space-y-6">
      {vehicles.map((vehicle) => (
        <div key={vehicle._id} className="border p-4 rounded bg-white shadow">
          <p className="font-semibold text-lg">
            {vehicle.make} {vehicle.model} ({vehicle.color})
          </p>
          <p className="text-sm text-gray-700 italic mt-1">
            Similarity: {(vehicle.similarity * 100).toFixed(1)}%
          </p>
          {vehicle.isStolen && (
            <p className="text-red-500 text-sm font-semibold">
              Reported Stolen
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default VehicleList