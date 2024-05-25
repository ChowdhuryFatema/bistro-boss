
import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import useAxiosCommon from "../../../../../hooks/useAxiosCommon";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {

    const axiosPublic = useAxiosPublic();
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
        console.log(res)
            // now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            }

            const menuRes = await axiosCommon.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                // show success popup

                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div>
            <div>
                <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>
            </div>
            <div className="p-16 bg-[#F3F3F3]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Recipe Name*</span>
                            </div>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Recipe Name"
                                className="input input-bordered w-full" />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </label>
                    </div>

                    <div className="flex flex-col md:flex-row gap-5 justify-between">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select defaultValue="default" className="select select-bordered w-full" {...register("category", { required: true })}>
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            {errors.category && <span className="text-red-500">Category is required</span>}
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                placeholder="Price"
                                className="input input-bordered w-full" />
                            {errors.price && <span className="text-red-500">Price is required</span>}
                        </label>
                    </div>

                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Recipe Details*</span>
                            </div>
                            <textarea
                                {...register("recipe")}
                                className="textarea textarea-bordered"
                                rows={6}
                                placeholder="Recipe Details"></textarea>
                        </label>
                    </div>
                    <div>
                        <input
                            {...register("image", { required: true })}
                            type="file" className="file-input w-full max-w-xs" /><br />
                        {errors.image && <span className="text-red-500">
                            Image is required</span>}
                    </div>
                    <button type="submit" className="btn bg-[#B58130] hover:bg-[#a7711c] text-white text-sm md:text-lg">
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;