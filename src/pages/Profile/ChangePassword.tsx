import { useState } from "react";
import { Button, Card, CardContent, Typography, IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { useForm } from "react-hook-form";
import { changePassword, logoutUser } from "../../service/features/authSlice";
import SidebarComponent from "../../components/Layout/Sidebar";
import { FaKey } from "react-icons/fa";

type FormChangePasswordValues = {
    oldPassword: string;
    newPassword: string;
};

const ChangePassword = () => {
    const dispatch = useAppDispatch();

    const { account } = useAppSelector((state) => state.auth);
    const isCustomer = account && account.user && account.user.role.includes('Customer');

    const form = useForm<FormChangePasswordValues>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const { register, handleSubmit } = form;

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

    const onSubmit = (data: FormChangePasswordValues) => {
        dispatch(changePassword(data))
            .unwrap()
            .then((response) => {
                if (response?.success) {
                    dispatch(logoutUser({}));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
        {isCustomer ? (
            <div className="grid h-screen" style={{ gridTemplateRows: 'auto 1fr auto' }}>
            <div className="row-start-1 row-end-2">
                <Header />
            </div>
            <div className="row-start-2 row-end-3 grid" style={{ gridTemplateRows: 'auto 1fr' }}>
                <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                    <Card className="w-full max-w-md p-6 shadow-md">
                        <CardContent>
                            <Typography variant="h5" className="mb-6 text-center">
                                Change Password
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                                <div className="mb-4">
                                    <TextField
                                        {...register("oldPassword", { required: "Old Password is required" })}
                                        id="oldPassword"
                                        name="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Enter your old password..."
                                        className="mt-2 p-2 border-2 border-pink-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle old password visibility"
                                                        onClick={handleClickShowOldPassword}
                                                        edge="end"
                                                    >
                                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        />
                                </div>
                                <div className="mb-4">
                                    <TextField
                                        {...register("newPassword", { required: "New Password is required" })}
                                        id="newPassword"
                                        name="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter your new password..."
                                        className="mt-2 p-2 border-2 border-pink-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle new password visibility"
                                                        onClick={handleClickShowNewPassword}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Change Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="row-start-3 row-end-4">
                <Footer />
            </div>
            </div>
        ) : (
            <div className="">
            <div className="grid grid-cols-1 md:grid-cols-12 md:p-0">
              <div className="md:col-span-2">
                <SidebarComponent />
              </div>
    
              <div className="md:col-span-10 mt-5">
                <div className="flex">
                  <FaKey className="text-3xl text-pink-300" />
                  <h3 className="text-3xl font-bold ml-6">Change Password</h3>
                </div>
                <div className="row-start-2 row-end-3 grid" style={{ gridTemplateRows: 'auto 1fr' }}>
                <div className="flex justify-center items-center p-6">
                    <Card className="w-full max-w-md p-6 shadow-md">
                        <CardContent>
                            <Typography variant="h5" className="mb-6 text-center">
                                Change Password
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                                <div className="mb-4">
                                    <TextField
                                        {...register("oldPassword", { required: "Old Password is required" })}
                                        id="oldPassword"
                                        name="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Enter your old password..."
                                        className="mt-2 p-2 border-2 border-pink-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle old password visibility"
                                                        onClick={handleClickShowOldPassword}
                                                        edge="end"
                                                    >
                                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        />
                                </div>
                                <div className="mb-4">
                                    <TextField
                                        {...register("newPassword", { required: "New Password is required" })}
                                        id="newPassword"
                                        name="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Enter your new password..."
                                        className="mt-2 p-2 border-2 border-pink-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 w-full"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle new password visibility"
                                                        onClick={handleClickShowNewPassword}
                                                        edge="end"
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Change Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
                </div>
              </div>
            </div>
        )}
     
    </>
    );
};

export default ChangePassword;
