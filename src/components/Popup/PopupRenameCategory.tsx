import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useAppDispatch } from "../../service/store/store";
import {
  getAllCategories,
  updateCategory,
} from "../../service/features/categorySlice";

type PopupRenameCategoryProps = {
  open: boolean;
  closePopup: () => void;
  onClosePopupDetail: () => void;
  name: string;
  cateId: string | undefined;
  targetAudience: string;
  ageRange: string;
  milkType: string;
  icon: string;
};

type FormRenameCategoryValues = {
  id: string;
  name: string;
  targetAudience: string;
  ageRange: string;
  milkType: string;
  icon: string;
};

const PopupRenameCategory: React.FC<PopupRenameCategoryProps> = ({
  open,
  closePopup,
  onClosePopupDetail,
  name,
  cateId,
  targetAudience,
  ageRange,
  milkType,
  icon,

}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormRenameCategoryValues>({
    defaultValues: { id: cateId, name, targetAudience, ageRange, milkType, icon },
  });
  const onSubmit = (data: FormRenameCategoryValues) => {
    setIsLoading(true);
    dispatch(updateCategory(data))
      .unwrap()
      .then(() => {
        dispatch(getAllCategories());
        closePopup();
        onClosePopupDetail();
        reset({ id: undefined, name: "", targetAudience: "", ageRange: "", milkType: "", icon: "" });
      })
      .catch((error: any) => console.log(error))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    reset({ id: cateId, name });
  }, [reset, cateId, name]);

  return (
    <Dialog
      open={open}
      onClose={closePopup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="w-auto flex justify-between items-center p-4">
        <DialogTitle>
          <div className="text-2xl font-bold flex">
            <span>Edit category name: </span>
            <span className="ml-2">{name}</span>
          </div>
        </DialogTitle>
        <button
          onClick={closePopup}
          className="text-gray-600 hover:text-gray-900"
        >
          <XMarkIcon width={24} height={24} />
        </button>
      </div>
      <DialogContent>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input {...register("id")} type="hidden" />
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">
                  * {errors.name.message}
                </p>
              )}
              <label
                htmlFor="targetAudience"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Target Audience
              </label>
              <input
                {...register("targetAudience")}
                type="text"
                name="targetAudience"
                id="targetAudience"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              {errors.targetAudience && (
                <p className="text-red-500 text-xs mt-2">
                  * {errors.targetAudience.message}
                </p>
              )}
              <label
                htmlFor="ageRange"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Age Range
              </label>
              <input
                {...register("ageRange")}
                type="text"
                name="ageRange"
                id="ageRange"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              {errors.ageRange && (
                <p className="text-red-500 text-xs mt-2">
                  * {errors.ageRange.message}
                </p>
              )}
              <label
                htmlFor="milkType"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Milk Type
              </label>
              <input
                {...register("milkType")}
                type="text"
                name="milkType"
                id="milkType"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              {errors.milkType && (
                <p className="text-red-500 text-xs mt-2">
                  * {errors.milkType.message}
                </p>
              )}
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Icon
              </label>
              <input
                {...register("icon")}
                type="text"
                name="icon"
                id="icon"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              />
              {errors.icon && (
                <p className="text-red-500 text-xs mt-2">
                  * {errors.icon.message}
                </p>
              )}
            </div>
            <DialogActions>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                sx={{
                  textTransform: "none",
                }}
              >
                {isLoading ? "Loading..." : "Accept"}
              </Button>
            </DialogActions>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopupRenameCategory;
