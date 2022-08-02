import "./UserInfo.css";
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUserInfo, reset } from "../../features/auth/authSlice";

const Security = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { email, password, newPassword, confirmPassword } = formData;

    const dispatch = useDispatch();

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast(`Password Updated succefully `);
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        if (!email) {
            const userData = {
                password,
                newPassword,
            };
            dispatch(updateUserInfo(userData));
        } else {
            const userData = {
                email,
                password,
                newPassword,
            };
            dispatch(updateUserInfo(userData));
        }
    };

    return (
        <div className="UserInfo_wrapper">
            <div className="UserInfo_wrapper-content d-flex w-100 p-5">
                <h1 className="mb-5">My security</h1>
                <div className="UserInfo_wrapper-content_items w-75">
                    <form onSubmit={onSubmit}>
                        <div className="UserInfo_wrapper-content_items mb-5">
                            <div className="mb-3">
                                <label>Email address</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    onChange={onChange}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                            <div className="mb-3">
                                <label>Old Password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                            <div className="mb-3">
                                <label>New Password</label>
                                <input
                                    className="form-control"
                                    id="newPassword"
                                    type="password"
                                    placeholder="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                            <div className="mb-3">
                                <label>Confirm New Password</label>
                                <input
                                    className="form-control"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="UserInfo_wrapper-content_items mb-5">
                            <div className="action-wrapper text-center">
                                <Button type="submit" className="btn">
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Security;
