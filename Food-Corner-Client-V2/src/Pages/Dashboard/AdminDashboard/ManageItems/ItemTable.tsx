/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import MenuEditForm from "./MenuEditForm";
import { useState } from "react";
import { IMenuItem } from "../../../../interface/menuItem.interface";
import { toast } from "sonner";
import { useDeleteMenuMutation } from "../../../../Redux/api/menuApi/menuApi";
import { IApiResponse } from "../../../../Redux/interface/global.interface";

const ItemTable = ({ menuItems }: { menuItems: IMenuItem[] }) => {
  const [deleteMenu] = useDeleteMenuMutation();
  const [pId, setPId] = useState<null | string>(null);
  const [deleteId, setDeleteId] = useState<null | string>(null);
  const [isNeedToUpdate, setIsNeedToUpdate] = useState({
    photo: false,
    availableTime: false,
    stockStatus: false,
    price: false,
    limitedStatus: false,
  });

  const handleModalClose = () => {
    setPId(null);
    setIsNeedToUpdate({
      photo: false,
      availableTime: false,
      stockStatus: false,
      price: false,
      limitedStatus: false,
    });
  };

  const handleDeleteMenu = async (id: string) => {
    if (id) {
      const res = (await deleteMenu({ id: id })) as IApiResponse<any>;
      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } else {
      toast.error("Delete action failed. Try again.");
    }
  };

  return (
    <div className="overflow-x-auto min-h-screen">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="min-w-96">Description</th>
            <th className="min-w-36">Price & Size</th>
            <th>Is Limited?</th>
            <th>Available Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              {/* Item Name and Details */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img src={item.photo} alt={item.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-xl mb-1">{item.title}</div>
                    <div className="flex gap-2">
                      <span className="badge bg-green-400 text-white">
                        {item.category.category}
                      </span>
                      <span className="badge bg-orange-400 text-white">
                        {item?.cuisine?.cuisine}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              {/* Description */}
              <td>{item.description}</td>

              {/* Price & Size */}
              <td>
                {item.price.map(({ price, size }, i) => (
                  <div className="flex gap-3 font-semibold" key={i}>
                    <span>{price} tk</span>
                    <span className="text-green-500">/</span>
                    <span>{size.includes(":") ? size : `${size} inch`}</span>
                  </div>
                ))}
              </td>

              {/* Limited Status */}
              <td>
                <div className="grid justify-items-center">
                  <span>
                    {item.limitedStatus.isLimited ? "Limited" : "Unlimited"}
                  </span>
                  {item.limitedStatus.isLimited && (
                    <span>{item.limitedStatus.quantity}</span>
                  )}
                </div>
              </td>

              {/* Available Time */}
              <td className="font-medium">
                {Object.entries(item.availableFor).map(([key, value]) => (
                  <div key={key} className="text-nowrap">
                    {key}:{" "}
                    <span
                      className={value ? "text-green-500" : "text-orange-400"}
                    >
                      {value ? "Available" : "Not Available"}
                    </span>
                  </div>
                ))}
              </td>

              {/* Actions (Edit/Delete) */}
              <td>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <label
                    onClick={() => setPId(item._id)}
                    htmlFor="my_modal_6"
                    className="bg-green-500 w-9 h-7 flex justify-center items-center rounded-lg text-white text-sm hover:bg-green-600 duration-300"
                  >
                    <FaEdit />
                  </label>

                  {/* Delete Button */}
                  <label
                    onClick={() => setDeleteId(item._id)}
                    htmlFor="my_modal_1"
                    className="bg-orange-400 text-sm w-9 h-7 flex justify-center items-center rounded-lg text-white hover:bg-orange-400 duration-300"
                  >
                    <FaTrash />
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal 1*/}
      {pId && (
        <div>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold text-orange-400">
                Edit Menu Item
              </h3>

              {/* Edit Form */}
              <MenuEditForm
                setIsNeedToUpdate={setIsNeedToUpdate}
                isNeedToUpdate={isNeedToUpdate}
                id={pId}
                setPId={setPId}
              />

              {/* Modal Close Action */}
              <div className="modal-action">
                <label
                  onClick={handleModalClose}
                  htmlFor="my_modal_6"
                  className="btn btn-sm"
                >
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal 2*/}
      {deleteId && (
        <div>
          <input type="checkbox" id="my_modal_1" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold text-orange-400">
                Are you sure?
              </h3>
              {/* content */}
              {/* Modal Close Action */}
              <div className="modal-action">
                <label
                  onClick={() => handleDeleteMenu(deleteId)}
                  htmlFor="my_modal_1"
                  className="btn btn-sm"
                >
                  Yes
                </label>
                <label htmlFor="my_modal_1" className="btn btn-sm">
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemTable;
