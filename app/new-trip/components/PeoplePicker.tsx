import { LiaUserFriendsSolid } from "react-icons/lia";
import { GiLovers } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";

import { CompanionsType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setCompanions,
  setPeopleCount,
} from "@/lib/features/newTrip/newTripSlice";

const PeoplePicker = () => {
  const dispatch = useAppDispatch();
  const { peopleCount, companions } = useAppSelector((state) => state.newTrip);

  const increment = () => {
    if ((peopleCount === 2 && companions === "couple") || peopleCount === 1) {
      dispatch(setCompanions("family"));
    }

    dispatch(setPeopleCount(peopleCount + 1));
  };

  const decrement = () => {
    if (peopleCount === 1) return;
    if (peopleCount === 2) {
      dispatch(setCompanions("solo"));
    }
    dispatch(setPeopleCount(peopleCount - 1));
  };

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-3">
        <h3>How many people are going?</h3>
        <div
          className="flex h-12 w-full rounded-md border border-input bg-transparent
          px-3 py-2 text-sm shadow-sm items-center justify-between"
        >
          <div className="flex items-center gap-x-2">
            <div
              className="rounded-md border py-1 px-4 w-12 flex justify-center
              bg-secondary border-input"
            >
              {peopleCount}
            </div>
            <p>{peopleCount === 1 ? "Person" : "People"}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              onClick={decrement}
              className="border border-input bg-white text-black hover:bg-gray-100"
              disabled={peopleCount === 1}
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

      {peopleCount > 1 ? (
        <div className="flex flex-col gap-y-3">
          <h3>Who is traveling with you?</h3>

          <ToggleGroup
            variant="outline"
            type="single"
            className="w-full flex"
            value={companions}
            onValueChange={(value: CompanionsType) =>
              dispatch(setCompanions(value))
            }
          >
            {peopleCount < 3 ? (
              <ToggleGroupItem
                value="couple"
                aria-label="Toggle couple"
                className="gap-x-2 flex-1"
              >
                <GiLovers className="h-5 w-5" />
                Couple
              </ToggleGroupItem>
            ) : null}
            <ToggleGroupItem
              value="group of friends"
              aria-label="Toggle friends"
              className="gap-x-2 flex-1"
            >
              <LiaUserFriendsSolid className="h-5 w-5" />
              Friends
            </ToggleGroupItem>
            <ToggleGroupItem
              value="family"
              aria-label="Toggle family"
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
