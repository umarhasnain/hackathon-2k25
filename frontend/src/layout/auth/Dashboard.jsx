import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userId, userToken } from "../../redux/reducers/userSlice";

const Dashboard = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user = useSelector(state => state?.user.userId)
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        console.log("Beneficiary Data:", data);
        // Add API call to save beneficiary data here
    };
        const handleLogout = () => {
            dispatch(userToken(''))
            dispatch(userId(''));
            navigate('/')
        }

    return (
        <div className="">
            {!user?.role === "Admin" ?
                <div className="w-full p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Beneficiary Registration
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* CNIC Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">CNIC</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter CNIC (e.g., 12345-1234567-1)"
                                className={`input input-bordered w-full ${errors.cnic ? "border-red-500" : ""
                                    }`}
                                {...register("cnic", {
                                    required: "CNIC is required",
                                    pattern: {
                                        value: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                                        message: "Invalid CNIC format",
                                    },
                                })}
                            />
                            {errors.cnic && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.cnic.message}
                                </span>
                            )}
                        </div>

                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                className={`input input-bordered w-full ${errors.name ? "border-red-500" : ""
                                    }`}
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters",
                                    },
                                })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter phone number (e.g., 0300-1234567)"
                                className={`input input-bordered w-full ${errors.phone ? "border-red-500" : ""
                                    }`}
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{4}-[0-9]{7}$/,
                                        message: "Invalid phone number format",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </span>
                            )}
                        </div>

                        {/* Address Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <textarea
                                placeholder="Enter address"
                                className={`textarea textarea-bordered w-full ${errors.address ? "border-red-500" : ""
                                    }`}
                                {...register("address", {
                                    required: "Address is required",
                                })}
                            ></textarea>
                            {errors.address && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </span>
                            )}
                        </div>

                        {/* Purpose Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Purpose</span>
                            </label>
                            <select
                                className={`select select-bordered w-full ${errors.purpose ? "border-red-500" : ""
                                    }`}
                                {...register("purpose", {
                                    required: "Purpose is required",
                                })}
                            >
                                <option value="">Select purpose</option>
                                <option value="financial aid">Financial Aid</option>
                                <option value="medical assistance">Medical Assistance</option>
                                <option value="education aid">Education Aid</option>
                            </select>
                            {errors.purpose && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.purpose.message}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-4">
                            <button type="submit" className="btn bg-primary w-full">
                                Submit
                            </button>
                        </div>
                    </form>
                </div> :
                <div className="min-h-screen bg-gray-100 flex flex-col">
                    {/* Header */}
                    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <button type="button" className="btn" onClick={handleLogout}>LogOut</button>
                    </header>

                    {/* Main Content */}
                    <div className="flex-1 p-6 space-y-6">
                        {/* Metrics Section */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Total Visitors */}
                            <div className="card bg-white shadow-md">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold">Total Visitors</h2>
                                    <p className="text-4xl font-semibold">120</p>
                                    <p className="text-gray-500">New: 80 | Returning: 40</p>
                                </div>
                            </div>

                            {/* Department-wise Activity */}
                            <div className="card bg-white shadow-md">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold">Active Departments</h2>
                                    <p className="text-4xl font-semibold">5</p>
                                    <p className="text-gray-500">Finance, Medical, Education, etc.</p>
                                </div>
                            </div>

                            {/* Tokens Issued */}
                            <div className="card bg-white shadow-md">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold">Tokens Issued</h2>
                                    <p className="text-4xl font-semibold">150</p>
                                    <p className="text-gray-500">Today</p>
                                </div>
                            </div>
                        </section>

                        {/* Logs and Department-wise Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Logs Table */}
                            <div className="card bg-white shadow-md">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold mb-4">Activity Logs</h2>
                                    <div className="overflow-x-auto">
                                        <table className="table w-full">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Beneficiary</th>
                                                    <th>Action</th>
                                                    <th>Department</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Ali Ahmed</td>
                                                    <td>Token Issued</td>
                                                    <td>Finance</td>
                                                    <td>10:30 AM</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Sara Khan</td>
                                                    <td>Request Completed</td>
                                                    <td>Medical</td>
                                                    <td>11:00 AM</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Ahmed Raza</td>
                                                    <td>Token Issued</td>
                                                    <td>Education</td>
                                                    <td>12:15 PM</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Department Activity Chart (Placeholder) */}
                            <div className="card bg-white shadow-md">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold mb-4">Department-wise Activity</h2>
                                    {/* Placeholder for chart */}
                                    <div className="flex items-center justify-center h-40">
                                        <p className="text-gray-500">Chart Placeholder (e.g., Bar or Pie Chart)</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            }
        </div>
    );
};

export default Dashboard;
