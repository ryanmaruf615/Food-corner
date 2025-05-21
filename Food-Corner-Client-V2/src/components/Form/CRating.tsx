/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
export const CRating = () => {
  const { control } = useFormContext();
  return (
    <div>
      <label htmlFor="rating" className="label-text ">
        Rating
      </label>
      <Controller
        name="rating"
        rules={{
          required: "Rating is requierd",
          validate: (value) => value !== 0 || "Rating cannot be zero",
        }}
        control={control}
        defaultValue={0}
        render={({ field, fieldState }) => (
          <>
            <Rating {...field} style={{ maxWidth: 100 }}></Rating>
            {fieldState.error && (
              <span className="text-orange-400 text-sm">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};
