"use client";

import { useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GiLovers } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PeoplePicker = () => {
  const [count, setCount] = useState(1);
  const [companions, setCompanions] = useState<
    "couple" | "family" | "friend"
  >();

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <h3>How many people are going?</h3>
        <div
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-2
          text-sm shadow-sm items-center justify-between"
        >
          <div className="flex items-center gap-x-2">
            <div
              className="rounded-md border py-1 px-4 w-12 flex justify-center
              bg-secondary border-input"
            >
              {count}
            </div>
            <p>{count === 1 ? "Person" : "People"}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              onClick={decrement}
              className="border border-input bg-white text-black hover:bg-gray-100"
            >
              -
            </Button>
            <Button
              onClick={increment}
              className="border border-input bg-white text-black hover:bg-gray-100"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {count > 1 ? (
        <div className="flex flex-col gap-y-3">
          <h3>Who is traveling with you?</h3>

          <ToggleGroup variant="outline" type="single" className="w-full flex">
            {count < 3 ? (
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                className="gap-x-2 flex-1"
              >
                <GiLovers className="h-5 w-5" />
                Couple
              </ToggleGroupItem>
            ) : null}
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              className="gap-x-2 flex-1"
            >
              <LiaUserFriendsSolid className="h-5 w-5" />
              Friends
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              className="gap-x-2 flex-1"
            >
              <MdFamilyRestroom className="h-5 w-5" />
              Family
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      ) : null}
    </div>
  );
};

export default PeoplePicker;
