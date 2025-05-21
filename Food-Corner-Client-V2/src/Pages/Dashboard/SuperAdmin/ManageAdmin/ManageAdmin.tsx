/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import { Effect } from "../../../../components/FramerMotion/Effect";
import { IAdmin } from "../../../../interface/user.interface";
import {
  useBlockAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "../../../../Redux/api/userApi/userApi";

const ManageAdmin = () => {
  const { data, isLoading } = useGetAllAdminQuery("");

  const [blockAdmin] = useBlockAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();
  const adminBlock = async (id: string) => {
    console.log(id);
    await blockAdmin({ id: id });
  };

  const adminDelete = async (id: string) => {
    console.log(id);
    await deleteAdmin({ id: id });
  };
  console.log(data);
  return (
    <div>
      <SectionHeader text="Manage Admin" />
      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <Effect>
          {" "}
          <div>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="table">
                {/* Table Head */}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Contact No</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapping admin data dynamically */}
                  {data?.data?.map((admin: IAdmin) => (
                    <tr key={admin?.id}>
                      <td>{admin?.id}</td>
                      <td>
                        {admin?.name?.firstName} {admin?.name?.middleName}{" "}
                        {admin?.name?.lastName}
                      </td>
                      <td>{admin?.email}</td>
                      <td>{admin?.gender}</td>
                      <td>{admin?.contactNo}</td>
                      <td>
                        {admin?.user?.isDeleted ? (
                          <span className="badge badge-error text-white">
                            Deleted
                          </span>
                        ) : admin?.user?.isBlocked ? (
                          <span className="badge badge-warning text-white">
                            Blocked
                          </span>
                        ) : (
                          <span className="badge badge-success text-white">
                            Active
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <div
                            onClick={() => adminBlock(admin?.user?._id)}
                            className="text-red-400 hover:scale-105 duration-150 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div
                            onClick={() => adminDelete(admin?.user?._id)}
                            className="text-red-400 hover:scale-105 duration-150 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Effect>
      )}
    </div>
  );
};

export default ManageAdmin;
