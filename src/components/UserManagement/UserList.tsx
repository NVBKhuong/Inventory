import { MRT_ColumnDef } from "material-react-table";
import { IUserInfo } from "../../models/User";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { useEffect, useState } from "react";
import { getAllUser } from "../../service/features/userSlice";
import { Stack, Autocomplete,TextField,Button } from "@mui/material";
import CommonTable from "../Table/CommonTable";
import PopupUserDetail from "../Popup/PopupUserDetail";
import PopupCreateAccount from "../Popup/PopupCreateAccount";
const columns: MRT_ColumnDef<IUserInfo>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },

    {
        accessorKey: "status",
        header: "Status",
    },
];

const UserList = () => {
    const dispatch = useAppDispatch();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { users } = useAppSelector((state) => state.users);
    const [onPopupUserDetail, setOnPopupUserDetail] =
        useState<boolean>(false);
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState('Customer')
    useEffect(() => {
        dispatch(getAllUser({role: role, params:{pageNumber:0, pageSize:100}}));
    }, [dispatch,role]);

    const handleShowAccountDetail = async(user:any) => {
        setUserData(user);
        setOnPopupUserDetail(true);
    };


    return (
        <Stack sx={{ m: "2rem 0" }}>
            <Autocomplete disableClearable disablePortal className="ms-4 w-[23%]" size='small'
            options={['Customer','Staff']} value={role} onChange={(e,value)=>setRole(value)}
            renderInput={(params) => <TextField {...params} label="Role" />} />
            <CommonTable
                columns={columns}
                data={users || []}
                onRowDoubleClick={handleShowAccountDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={()=>setIsPopupOpen(true)}
                        sx={{
                            color: "black",
                            backgroundColor: "pink",
                        }}
                    >
                        Add New Account
                    </Button>
                }
            />
            <PopupCreateAccount
                isPopupCreateAccountOpen={isPopupOpen}
                closePopupCreateAccount={()=>setIsPopupOpen(false)}
                role={role} 
                loadAllUsers={()=>dispatch(getAllUser({role: role, params:{pageNumber:0, pageSize:100}}))}
            />
            {userData && (
                <>
                    <PopupUserDetail
                        user={userData} role={role} 
                        onPopupDetail={onPopupUserDetail}
                        closePopupDetail={()=>setOnPopupUserDetail(false)}
                        loadAllUsers={()=>dispatch(getAllUser({role: role, params:{pageNumber:0, pageSize:100}}))}
                    />
                </>
            )}

        </Stack>
    )
}

export default UserList