/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  errorMsg?: string | false;
  options: { value: string; label: string }[]; // Add options for select input
  labelStyle?: string;
  defaultOption: string;
  disabled?: boolean;
}

const CSelect = ({
  disabled = false,
  name,
  label,
  errorMsg,
  options,
  defaultOption,
  labelStyle,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="form-control">
        <label className="label ">
          <span className={`label-text ${labelStyle}`}>{label}</span>
        </label>
        {/* Select input */}
        <select
          disabled={disabled}
          className="select select-sm input-bordered"
          {...register(name, { required: errorMsg })}
        >
          <option key={null} value="">
            {defaultOption}
          </option>
          {/* Map over options */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error Handling */}
      {errors[name] && (
        <p className="text-orange-400 text-sm mt-1">
          {(errors[name] as any).message}
        </p>
      )}
    </div>
  );
};

export default CSelect;
