export const CFormButton = ({
  text,
  btnStyle = "",
  isLoading = false,
}: {
  text: string;
  btnStyle?: string;
  isLoading?: boolean;
}) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`btn btn-sm hover:bg-orange-500  border-none bg-orange-400 hover:bg-orange-400 text-white duration-300 my-4 ${btnStyle}`}
    >
      {text}
    </button>
  );
};
