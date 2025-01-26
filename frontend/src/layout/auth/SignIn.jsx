import { useState } from "react";
import { useForm } from "react-hook-form";
import { getReq, postReq } from "../../api/axios";
import { userId, userToken } from "../../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoader(true)
        const response = await postReq('/managment/login', data)
        const user = await getReq('/managment/protect')
        if (response) {
            dispatch(userToken(response.data))
            dispatch(userId(user))
            setLoader(false)
            navigate('/auth/dashboard')
            reset()
        } else {
            setLoader(false)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`input input-bordered w-full ${errors.password ? "border-red-500" : ""}`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                            className={`select select-bordered w-full ${errors.role ? "border-red-500" : ""}`}
                            {...register("role", {
                                required: "Role is required",
                            })}
                        >
                            <option value="">Select your role</option>
                            <option value="Admin">Admin</option>
                            <option value="Receptionist">Receptionist</option>
                            <option value="Department Staff">Department Staff</option>
                        </select>
                        {errors.role && (
                            <span className="text-red-500 text-sm mt-1">{errors.role.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-4">
                        <button type="submit" className="btn bg-primary w-full" disabled={loader}>
                            {loader ? 'Loading...' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;


