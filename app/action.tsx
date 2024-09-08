import axios from "axios";

export const fetchImage = async (
  data: { textQuery: string },
  setImage: React.Dispatch<React.SetStateAction<string>>
) => {
  await axios
    .post(process.env.NEXT_PUBLIC_GOOGLE_PLACE_BASE_URL!, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_PLACE_API!,
        "X-Goog-FieldMask": [
          "places.photos",
          "places.displayName",
          "places.id",
        ],
      },
    })
    .then((res) => {
      if (
        !res.data.places ||
        !res.data.places[0]?.photos ||
        !res.data.places[0]?.photos[0]?.name
      )
        return;
      const imageUrl = process.env.NEXT_PUBLIC_GOOGLE_PLACE_PHOTO_REF!.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setImage(imageUrl);
    });
};
