/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  errorMsg?: string | false;
  defaultChecked?: boolean;
  options: string[];
}

const CMultipleCheckBox = ({
  name,
  errorMsg = "Select at least one",
  defaultChecked = false,
  options,
}: InputProps) => {
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useFormContext();

  const validateAtLeastOne = () => {
    const values = getValues(name);
    const isValid = Object.values(values).some((value) => value === true);
    if (!isValid) {
      setError(name, { type: "validate", message: errorMsg as string });
    } else {
      clearErrors(name);
    }
    return isValid || errorMsg;
  };

  return (
    <div>
      <div className="flex gap-5 border px-2 rounded-lg">
        {options.map((option) => (
          <div
            key={option}
            className="form-control flex flex-row items-center gap-2"
          >
            <input
              type="checkbox"
              {...register(`${name}.${option}`, {
                validate: validateAtLeastOne,
              })}
              defaultChecked={defaultChecked}
              className="checkbox checkbox-warning checkbox-sm"
            />
            <label className="cursor-pointer label">
              <span className="label-text">{option}</span>
            </label>
          </div>
        ))}
      </div>
      {errors[name] && (
        <p className="text-orange-400">{(errors as any)[name]?.message}</p>
      )}
    </div>
  );
};

export default CMultipleCheckBox;
