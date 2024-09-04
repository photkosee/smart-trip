"use client";

import React, { useState, useRef, useEffect } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";

import { Input } from "@/components/ui/input";

const libraries: Libraries = ["places"];

const AutoCompleteInput: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_PLACE_API!,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    if (inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setAddress(place.formatted_address || "");
      });
    }
  }, [isLoaded]);

  return (
    <div>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Enter a city or any area"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
};

export default AutoCompleteInput;
