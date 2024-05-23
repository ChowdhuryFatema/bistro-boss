import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axiosCommon = useAxiosCommon();

    const { data: users = [], refetch } = useQuery({

        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosCommon.get('/users')
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosCommon.patch(`/users/admin/${user._id}`)
            .then(data => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleDeleteUser = id => {

        axiosCommon.delete(`/users/${id}`)
            .then(data => {
                console.log(data.data);
                refetch()
            })

    }

    return (
        <div>
            <div className="flex justify-evenly my-10">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-xs">
                                                <FaUsers size={24} className="text-[#D1A054]"></FaUsers>
                                            </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-ghost btn-xs">
                                        <FaTrashAlt size={20} className="text-[#D1A054]"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;