import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PencilAltIcon, ArchiveIcon } from "@heroicons/react/outline";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import DateFormatter from "../../utils/DateFormatter";
import LoadingComponent from "../../utils/LoadingComponent";
// import CategoryDeleteModal from "../Navigation/Alerts/CategoryDeleteModal";


const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  const category = useSelector((state) => state?.category);

  const { categoryList, loading, appErr, serverErr } = category;
  const navigate = useNavigate();
  const CategoryUpdate = (id) => {
    navigate(`/update-category/${id}`);
  };

  const CategoryDelete = (id) => {
    navigate(`/update-category/${id}`);
  };

  return (
    <section className="min-h-screen  bg-white overflow-hidden">
      {loading ? (
        <>
          <LoadingComponent />
        </>
      ) : // <h2 className="text-center text-3xl text-green-800">Loading</h2>
      appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {serverErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800 mt-5">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col min-w-0 flex-1">
          <div className=" text-center text-4xl mt-10 font-bold">
            {" "}
            Category List
          </div>
          <div className="container px-4 mx-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 min-w-full sm:px-6 lg:px-8">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map((category) => (
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {<DateFormatter date={category?.createdAt} />}
                        </td>

                        {/* Navigate Edit*/}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <PencilAltIcon
                            onClick={() => {
                              CategoryUpdate(category?._id);
                            }}
                            className="h-5 text-indigo-500 cursor-pointer"
                          />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <ArchiveIcon
                            onClick={() => {
                              CategoryDelete(category?._id);
                            }}
                            className="h-5 text-indigo-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryList;