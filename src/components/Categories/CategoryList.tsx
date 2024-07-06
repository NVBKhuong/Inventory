import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { ICategory } from "../../models/Category";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { getAllCategories } from "../../service/features/categorySlice";
import CommonTable from "../Table/CommonTable";
import PopupCreateCategory from "../Popup/PopupCreateCategory";
import PopupCategoryDetail from "../Popup/PopupCategoryDetail";
import PopupRenameCategory from "../Popup/PopupRenameCategory";


const columns: MRT_ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: "Category Name",
  },

  {
    accessorKey: "name",
    header: "Target Audience",
  },
  {
    accessorKey: "ageRange",
    header: "Age Range",
  },
  {
    accessorKey: "milkType",
    header: "Milk Type",
  },
];

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [cateData, setCateData] = useState<ICategory | null>(null);
  const [onPopupCategoryDetail, setOnPopupCategoryDetail] =
    useState<boolean>(false);
  const [openPopupRename, setOpenPopupRename] = useState<boolean>(false);

  const [selectedCateId, setSelectedCateId] = useState<string | null>(null);

  // useEffect(() => {
  //     dispatch(getAllCategories());
  // }, [dispatch]);

  useEffect(() => {
    if (!isPopupOpen) {
      dispatch(getAllCategories());
    }
  }, [isPopupOpen, dispatch]);
  console.log(categories)
  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleShowCategoryDetail = (cate: ICategory) => {
    setCateData(cate);
    setOnPopupCategoryDetail(true);
  };

  const handleOpenPopupRenameCategory = (id: string) => {
    if (!selectedCateId) {
      return
    }
    setSelectedCateId(id);
    setOpenPopupRename(true);
  };

  return (
    <Stack sx={{ m: "2rem 0" }}>
      <CommonTable
        columns={columns}
        data={categories || []}
        onRowDoubleClick={handleShowCategoryDetail}
        toolbarButtons={
          <Button
            variant="contained"
            onClick={handlePopupOpen}
            sx={{
              color: "black",
              backgroundColor: "pink",
            }}
          >
            Add categories
          </Button>
        }
      />

      <PopupCreateCategory
        isPopupOpen={isPopupOpen}
        closePopup={handlePopupClose}
      />
      {cateData && (
        <>
          <PopupCategoryDetail
            cate={cateData}
            onPopupDetail={onPopupCategoryDetail}
            setOnPopupDetail={setOnPopupCategoryDetail}
            onUpdate={() => handleOpenPopupRenameCategory(cateData.id)}
          />
          <PopupRenameCategory
            onClosePopupDetail={() => setOnPopupCategoryDetail(false)}
            open={openPopupRename}
            closePopup={() => setOpenPopupRename(false)}
            name={cateData?.name ?? ""}
            cateId={cateData.id}
            targetAudience={cateData.targetAudience}
            ageRange={cateData.ageRange}
            milkType={cateData.milkType}
            icon={cateData.icon}
          />
        </>
      )}

      {/* Update Status */}
    </Stack>
  );
};

export default CategoryList;
