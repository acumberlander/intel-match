import React from 'react'
import { Person } from '../types/Person'
import { SearchResult } from '../types/SearchResult'

interface PeopleListProps {
  people: Person[] | SearchResult[];
}

const PeopleList = ({people}: PeopleListProps) => {
  return (
    <div className="max-w-lg">
      <ul className="space-y-2">
        {people.map((p, index) => (
          <li
            key={`${p.id}-${index}`}
            className="border p-3 rounded bg-gray-50"
          >
            <p>
              <strong>{p.name}</strong> ({p.age})
            </p>
            <p className="text-sm">{p.description}</p>
            <p className="text-xs text-gray-500">
              Similarity: {p.similarity?.toFixed(3)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleList