/* eslint-disable @typescript-eslint/no-explicit-any */
import img1 from "../../../assets/newsletter/news.png";
import img2 from "../../../assets/newsletter/salad.png";
import img3 from "../../../assets/newsletter/pizza.png";
import styles from "../../../css/homepage/NewsLetter.module.css";
import NewsLetterInput from "../../../components/Form/NewsLetterInput";
import CForm from "../../../components/Form/CForm";
import { FieldValues } from "react-hook-form";
import { useSaveNewsSubcriptionMutation } from "../../../Redux/api/newsletterApi/newsletterApi";
import { IApiResponse } from "../../../Redux/interface/global.interface";
import { toast } from "sonner";
const NewsLetter = () => {
  const [saveSubcription] = useSaveNewsSubcriptionMutation();
  const onFormSubmit = async (data: FieldValues) => {
    const res = (await saveSubcription(data)) as IApiResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };
  return (
    <div className="flex justify-between  mt-10 lg:mt-0">
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-5  w-full items-center mx-2 md:mx-8">
        <div
          className={`${styles.custom5} flex justify-center md:justify-start`}
        >
          <img className=" w-[410px]   " src={img2} alt="" />
        </div>
        <div className="w-full flex flex-col items-center ">
          <div>
            <img className="w-[250px] mx-auto" src={img1} alt="" />
            <h1 className=" text-3xl md:text-4xl text-center mb-3 font-bold">
              Get <span className="text-orange-400  ">10%</span> off your order!
            </h1>
            <p className="mb-5">
              Enter your email and receive a 10% discount on your next order!
            </p>
          </div>
          <div className=" w-full sm:w-2/3 mx-auto md:w-full px-2 ">
            <CForm onFormSubmit={onFormSubmit}>
              <NewsLetterInput
                name="userEmail"
                type="email"
                errorMsg=""
              ></NewsLetterInput>
            </CForm>
          </div>
        </div>
        <div className="flex justify-center md:justify-end ">
          <img className="w-[400px]   " src={img3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
