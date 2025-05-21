/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  errorMsg?: string | false;
  type: string;
  labelStyle?: string;
  placeholder?: string;
  option: string;
}

const CInputObject = ({
  name,
  label,
  errorMsg,
  type,
  labelStyle,
  placeholder = "",
  option,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <>
        <div className="form-control">
          <label className="label">
            <span className={`label-text ${labelStyle}`}>{label}</span>
          </label>
          <input
            placeholder={placeholder}
            className="input input-sm input-bordered"
            type={type}
            min={0}
            {...register(`${name}.${option}`, { required: errorMsg })}
          />
        </div>

        {/* Display error message for the specific option */}
        {(errors as any)[name]?.[option] && (
          <p className="text-orange-400 text-sm">
            {(errors[name] as any)[option]?.message}
          </p>
        )}
      </>
    </div>
  );
};

export default CInputObject;
