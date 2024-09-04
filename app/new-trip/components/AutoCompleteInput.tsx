"use client";

import React, { useRef, useEffect } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";

import { Input } from "@/components/ui/input";
import { useNewTripContext } from "@/app/new-trip/NewTripContext";
import Spinner from "@/app/components/Spinner";

const libraries: Libraries = ["places"];

const AutoCompleteInput: React.FC = () => {
  const { setPlace } = useNewTripContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API!,
    libraries: libraries,
  });

  useEffect(() => {
    if (!isLoaded || loadError) return;

    if (inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current as HTMLInputElement,
        {
          types: ["(regions)"], // Restrict to cities and countries
        }
      );

      autocomplete.addListener("place_changed", () => {
        const completePlace = autocomplete.getPlace();
        if (completePlace.formatted_address) {
          setPlace(completePlace.formatted_address);
        }
      });
    }
  }, [isLoaded, loadError, setPlace]);

  return (
    <div>
      {!isLoaded ? (
        <div className="w-full flex justify-center mb-1">
          <Spinner />
        </div>
      ) : (
        <Input
          ref={inputRef}
          type="text"
          placeholder="Select a city or country"
        />
      )}
    </div>
  );
};

export default AutoCompleteInput;
