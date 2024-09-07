"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiTrip } from "react-icons/bi";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { db } from "@/app/firebase";
import TripCard from "@/app/dashboard/components/TripCard";

const DashboardPage = () => {
  const { email } = useAppSelector((state) => state.auth);
  const [userTrips, setUserTrips] = useState<DocumentData>();

  useEffect(() => {
    const getUserTripData = async () => {
      const data = await getDocs(
        query(collection(db, "Trips"), where("userEmail", "==", email))
      );
      setUserTrips(data.docs.map((doc) => doc.data()));
    };

    email && getUserTripData();
  }, []);

  return (
    <main
      className="flex min-h-[80vh] flex-col items-center justify-between
      pt-9 pb-[180px] bg-white"
    >
      <section className="bg-white text-black w-full max-w-6xl px-5 md:px-10">
        <div className="w-full flex flex-col justify-center items-center gap-y-7 px-5 md:px-10">
          <div className="w-full flex flex-col md:flex-row gap-x-5 gap-y-2 items-center">
            <h2 className="text-xl font-bold">Your Trips</h2>
            <Link href="/new-trip" className="">
              <Button
                className="p-5 rounded-full bg-green-800 hover:bg-green-700
                text-md gap-x-2"
              >
                <BiTrip />
                Create a new trip
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
            {userTrips &&
              userTrips.map((trip: any, index: number) => (
                <div key={index} className="w-full flex justify-center">
                  <TripCard trip={trip} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
