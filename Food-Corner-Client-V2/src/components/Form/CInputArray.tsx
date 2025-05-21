/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useFormContext } from "react-hook-form";
import { capitalizeFirstLetter } from "../../utils/firstLetterCapitalize";

interface InputProps {
  name: string;
  errorMsg?: string | false;
  labelStyle?: string;
  options: [
    {
      name: string;
      type: string;
    },
    {
      name: string;
      type: string;
    }
  ]; // Array of objects, each having a 'name' and 'type'
}

const CInputArray = ({ name, errorMsg, labelStyle, options }: InputProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Ensure there's at least one input when rendering
  if (fields.length === 0) {
    const defaultValues = options.reduce((acc, option) => {
      acc[option.name] = "";
      return acc;
    }, {} as Record<string, string>);
    append(defaultValues, { shouldFocus: false });
  }

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="form-control">
          {/* Dynamically generate inputs based on the options array */}
          {options.map((option, optIndex) => (
            <div key={optIndex} className="form-control mt-0.5">
              <label className="label">
                <span className={`label-text ${labelStyle}`}>
                  {capitalizeFirstLetter(option.name)}
                </span>
              </label>
              <input
                placeholder={
                  option.name == "size"
                    ? "example: 1:1, 1:2 or 12,14 in inch"
                    : capitalizeFirstLetter(option.name)
                }
                className="input input-sm input-bordered"
                {...register(`${name}.${index}.${option.name}`, {
                  required: errorMsg ? errorMsg : false,
                })}
                type={option.type} // Use dynamic type
              />
              {(errors as any)[name]?.[index]?.[option.name] && (
                <p className="text-orange-400 text-sm">
                  {(errors as any)[name][index][option.name].message}
                </p>
              )}
            </div>
          ))}

          {/* Remove Button */}
          {fields.length > 1 && (
            <button
              className="btn bg-orange-400 text-white mt-4 w-44 hover:bg-orange-400 btn-sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                remove(index);
              }}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        className="btn text-white bg-green-500 hover:bg-green-600 btn-sm w-44 mt-4"
        type="button"
        onClick={() => {
          const newValues = options.reduce((acc, option) => {
            acc[option.name] = "";
            return acc;
          }, {} as Record<string, string>);
          append(newValues);
        }}
      >
        Add More Price & Size
      </button>
    </div>
  );
};

export default CInputArray;
