import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import CommonTable from "../Table/CommonTable";
import { getAllProducts } from "../../service/features/productSlice";
import PopupProductDetail from "../Popup/PopupProductDetail";
import { IProduct } from "../../models/Produdct";
import PopupCreateProduct from "../Popup/PopupCreateProduct";

const columns: MRT_ColumnDef<IProduct>[] = [
    {
        accessorKey: "name",
        header: "Product Name",
    },
    {
        accessorKey: "origin",
        header: "Origin",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "ingredient",
        header: "Ingredient",
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
];

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.products);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [productData, setProductData] = useState<IProduct | null>(null);
    const [onPopupProductDetail, setOnPopupProductDetail] = useState<boolean>(false);

    //Create   


    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllProducts({text:""}));
        }
    }, [isPopupOpen, dispatch]);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };
    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };


    const handleShowProductDetail = (pro: IProduct) => {
        setProductData(pro);
        setOnPopupProductDetail(true);
    };

    return (
        <Stack sx={{ m: "2rem 0" }}>
            <CommonTable
                columns={columns}
                data={products || []}
                onRowDoubleClick={handleShowProductDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handlePopupOpen}
                        sx={{
                            color: "black",
                            backgroundColor: "pink",
                        }}
                    >
                        Add New Product
                    </Button>
                }
            />
            <PopupCreateProduct
                isPopupCreateProductOpen={isPopupOpen}
                closePopupCreateProduct={handlePopupClose}
            />
            {productData && (
                <PopupProductDetail
                    product={productData}
                    onPopupDetail={onPopupProductDetail}
                    setOnPopupDetail={setOnPopupProductDetail}
                />
            )}
        </Stack>
    );
};

export default ProductList;
