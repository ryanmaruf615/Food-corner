/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import CForm from "../../components/Form/CForm";
import CInput from "../../components/Form/CInput";
import CTextArea from "../../components/Form/CTextArea";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Reviews from "./Reviews";
import { useSaveMsgMutation } from "../../Redux/api/contactUsApi/contactUsApi";
import { IApiResponse } from "../../Redux/interface/global.interface";
import { toast } from "sonner";
import { CFormButton } from "../../components/Form/CFormButton";
import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import { Effect } from "../../components/FramerMotion/Effect";

export const ContactUs = () => {
  const [saveMsg, { isLoading }] = useSaveMsgMutation();
  const onFormSubmit = async (data: FieldValues) => {
    console.log(data);
    const res = (await saveMsg(data)) as IApiResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };

  return (
    <>
      <ReactHelemt title=": Contact us"></ReactHelemt>
      <SectionHeader text="Contact-Us"></SectionHeader>

      <Effect>
        {" "}
        <div className="container mx-auto px-5 mt-10 grid md:grid-cols-2 items-center gap-10 md:gap-20 ">
          <div className="w-full">
            <p className="text-3xl font-bold">Get In Touch</p>
            <CForm onFormSubmit={onFormSubmit}>
              <CInput
                label="Email"
                errorMsg="Email is Required"
                name="email"
              ></CInput>
              <CTextArea name="message" label="Message"></CTextArea>
              <CFormButton
                isLoading={isLoading}
                btnStyle="w-full"
                text="Send"
              ></CFormButton>
            </CForm>
          </div>
          <div className="space-y-5 md:mx-auto  mb-10">
            <p className="text-3xl font-bold">Contact Info</p>
            <div className="flex items-center  gap-4">
              <MdMessage className="font-semibold text-orange-400 text-lg mt-1"></MdMessage>
              <p>Food_Corner@gmail.com</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-xl text-orange-400" />
              <p>
                +880 1234567890 <br /> +8802364786732
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-xl text-orange-400" />
              <p>
                Dhanmondi-32, Dhaka <br /> Bangladesh
              </p>
            </div>
          </div>
        </div>
        <Reviews></Reviews>
      </Effect>
    </>
  );
};
