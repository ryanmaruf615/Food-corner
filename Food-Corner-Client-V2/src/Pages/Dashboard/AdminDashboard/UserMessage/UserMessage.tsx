/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import { Effect } from "../../../../components/FramerMotion/Effect";
import { useGetAllMsgQuery } from "../../../../Redux/api/contactUsApi/contactUsApi";
import ReplyModal from "./ReplyModal";

const UserMessage = () => {
  const { data, isLoading } = useGetAllMsgQuery("");
  console.log(data);
  return (
    <div>
      <SectionHeader text="User Queries"></SectionHeader>
      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <Effect>
          {" "}
          <>
            {" "}
            {data?.data.length > 0 ? (
              <div className="container mx-auto p-2 shadow-lg my-10 rounded-lg">
                {data?.data?.map((msg: any) => (
                  <div
                    key={msg?._id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <span className="font-bold text-orange-400">
                          {" "}
                          Email:
                        </span>{" "}
                        <span>{msg?.email}</span>
                      </p>
                      <p>
                        <span className="text-green-500 font-semibold">
                          {" "}
                          Question:
                        </span>{" "}
                        <span>{msg?.message}</span>
                      </p>
                    </div>
                    <div>
                      <ReplyModal id={msg?._id}></ReplyModal>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="my-10 text-center text-xl">No User Message</div>
            )}
          </>
        </Effect>
      )}
    </div>
  );
};

export default UserMessage;
