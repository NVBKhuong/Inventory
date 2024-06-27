import { MRT_ColumnDef } from "material-react-table";
import { IUserInfo } from "../../models/User";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { useEffect, useState } from "react";
import { getAllUser } from "../../service/features/userSlice";
import { Stack } from "@mui/material";
import CommonTable from "../Table/CommonTable";
import PopupUserDetail from "../Popup/PopupUserDetail";
const columns: MRT_ColumnDef<IUserInfo>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email Address",
    },

    {
        accessorKey: "phone",
        header: "Phone",
    },

    {
        accessorKey: "rank",
        header: "Rank",
    },
    {
        accessorKey: "role",
        header: "Role",
    },

];

const UserList = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.users);
    const [onPopupUserDetail, setOnPopupUserDetail] =
        useState<boolean>(false);
    const [userData, setUserData] = useState<IUserInfo | null>(null);

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const handleShowCategoryDetail = (user: IUserInfo) => {
        setUserData(user);
        setOnPopupUserDetail(true);
    };


    return (
        <Stack sx={{ m: "2rem 0" }}>
            <CommonTable
                columns={columns}
                data={users || []}
                onRowDoubleClick={handleShowCategoryDetail}
            />
            {userData && (
                <>
                    <PopupUserDetail
                        user={userData}
                        onPopupDetail={onPopupUserDetail}
                        setOnPopupDetail={setOnPopupUserDetail}
                    />
                </>
            )}

            {/* Update Status */}
        </Stack>
    )
}

export default UserList