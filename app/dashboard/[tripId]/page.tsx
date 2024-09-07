"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

import { db } from "@/app/firebase";
import { useToast } from "@/hooks/use-toast";
import HeroSection from "@/app/dashboard/[tripId]/components/HeroSection";
import HotelSection from "@/app/dashboard/[tripId]/components/HotelSection";
import PlanSection from "@/app/dashboard/[tripId]/components/PlanSection";

const TripPage = () => {
  const { tripId } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const [trip, setTrip] = useState<DocumentData>();
  const [notFound, setNotFound] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTripData = async () => {
      const data = await getDoc(doc(db, "Trips", tripId as string));
      if (data.exists()) {
        setTrip(data.data());
        setNotFound(false);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Could not find the trip.",
        });
        router.push("/");
      }

      setLoading(false);
    };

    tripId && getTripData();
  }, [tripId]);

  return (
    <main
      className="flex min-h-[80vh] flex-col items-center justify-between
      pt-9 pb-[180px] bg-white"
    >
      {loading ? (
        <div className="flex items-center h-[50vh] justify-center">
          <Loader2 className="size-16 animate-spin" />
        </div>
      ) : null}
      {!loading && !notFound ? (
        <>
          <HeroSection trip={trip} />
          <HotelSection trip={trip} />
          <PlanSection trip={trip} />
        </>
      ) : null}
    </main>
  );
};

export default TripPage;
