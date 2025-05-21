/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { FieldValues } from "react-hook-form";

import { toast } from "sonner";
import Modal from "../../../../components/common/modal/Modal";
import CForm from "../../../../components/Form/CForm";
import CTextArea from "../../../../components/Form/CTextArea";
import { useReplyMsgMutation } from "../../../../Redux/api/contactUsApi/contactUsApi";

const ReplyModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyMsg] = useReplyMsgMutation();
  const onFormSubmit = async (data: FieldValues) => {
    console.log(data);
    const res = await replyMsg({ data, id });
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };
  return (
    <div className="">
      <div className="flex justify-center my-5  ">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm bg-orange-400 text-white hover:bg-orange-400"
        >
          Reply
        </button>
      </div>
      <div className="modal">
        <Modal isOpen={isOpen}>
          {" "}
          <div className="">
            <p className="text-xl font-bold text-orange-400">Give Reply</p>
            <div>
              <CForm onFormSubmit={onFormSubmit}>
                <CTextArea
                  errorMsg="This field is required"
                  label=""
                  name="repliedMsg"
                ></CTextArea>
                <div className="flex mt-4  justify-between items-center">
                  <button
                    type="submit"
                    className="btn bg-orange-400 text-white hover:bg-orange-400 duration-300 btn-sm  "
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm bg-orange-400 text-white hover:bg-orange-400 duration-300 "
                    onClick={() => setIsOpen(false)}
                  >
                    close
                  </button>
                </div>
              </CForm>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ReplyModal;
