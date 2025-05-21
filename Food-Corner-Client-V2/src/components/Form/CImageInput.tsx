import { useFormContext } from "react-hook-form";

interface ImageInputProps {
  name: string;
  label: string;
  errorMsg?: string | false;
  setPreview: (srg: string) => void;
  preview: string | null;
  labelStyle?: string;
}

const CImageInput = ({
  name,
  setPreview,
  label,
  preview,
  errorMsg,
  labelStyle,
}: ImageInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className={`label-text ${labelStyle}`}>{label}</span>
        </label>
        <input
          className="file-input file-input-orange file-input-sm w-full file-input-bordered"
          type="file"
          accept="image/*"
          {...register(name, { required: errorMsg })}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleImageChange(file);
            }
          }}
        />
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      {errors[name] && !preview && (
        <p className="text-orange-400 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CImageInput;
