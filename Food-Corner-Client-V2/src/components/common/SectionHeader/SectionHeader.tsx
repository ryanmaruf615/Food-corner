const SectionHeader = ({ text }: { text: string }) => {
  return (
    <div className="h-[90px] w-full bg-orange-400   ">
      <div className="text-center   backdrop-blur w-full h-full text-white text-4xl font-bold flex justify-center items-center">
        <span className="drop-shadow">{text}</span>
      </div>
    </div>
  );
};

export default SectionHeader;
