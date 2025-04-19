import React from 'react'
import { Vehicle } from '../types/Vehicle'
import { SearchResult } from '../types/SearchResult'

interface VehicleListProps {
  vehicles: Vehicle[] | SearchResult[];
}

const VehicleList = ({vehicles}: VehicleListProps) => {
  return (
    <div className="max-w-lg">
      <ul className="space-y-2">
        {vehicles.map((v) => (
          <li key={v.id} className="border p-3 rounded bg-gray-50">
            <p>
              <strong>
                {v.make} {v.model}
              </strong>{" "}
              ({v.color})
            </p>
            <p className="text-sm">{v.description}</p>
            <p className="text-xs text-gray-500">
              Similarity: {v.similarity?.toFixed(3)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleList