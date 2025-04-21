"use client";
import React from "react";
import { Crime } from "../types/Crime";
import CriminalHistoryCard from "./CriminalHistoryCard";

interface CriminalHistoryModalProps {
  crimes: Crime[];
}

const CriminalHistoryModal = ({ crimes }: CriminalHistoryModalProps) => {
  return (
    <div className="overflow-auto max-h-[90vh] w-full">
      {crimes.map((crime, index) => (
        <CriminalHistoryCard key={`${crime._id}-${index}`} crime={crime} />
      ))}
    </div>
  );
};

export default CriminalHistoryModal;
