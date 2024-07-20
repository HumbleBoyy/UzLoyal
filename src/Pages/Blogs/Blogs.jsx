/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const Blogs = () => {

	const API = "https://api.dezinfeksiyatashkent.uz/api/";
	const imgUrl = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/"

	const [showModal, setShowModal] = useState(false)
	const [ blog, setBlog ] = useState([])
	const [ editBlog, setEditBlog ] = useState([])
	const [ deleteItem, setDeleteItem ] = useState([]);
	const [title, setTitle] = useState("");
	const [images, setimages] = useState([]);

	const tokenAi = localStorage.getItem("token");

	const formData = new FormData();
	formData.append("title_uz", title);
	formData.append("images", images);

	const [data, setData] = useState({
		title_uz: "",
		text_uz: "",
		author: "",
		images: null
	})


	const getBrands = () => {
		fetch(`${API}/blogs`)
			.then(res => res.json())
			.then(blog => {
				console.log(blog.data)
				setBlog(blog.data)
			})
	}
	useEffect(() => {
		getBrands();
	}, []);


	const createNewPost = (event) => {
		event.preventDefault();
		fetch(API, {
			method: "POST",
			body: formData,

			headers: {
				"Authorization": `Bearer ${tokenAi}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				toast("Successfully added")
				setBlog(false)
				getBrands();
			})
			.catch((err) => {
				console.log(err.message)
			})
	}



	const deleteData = () => {
		fetch(`${API}/blogs/${deleteItem}`, {
			method: "DELETE",

			headers: {
				Authorization: `Bearer ${tokenAi}`
			}
		})
			.then(res => res.json())
			.then(deleteBrand => {
				toast.success("Successfully deleted");
				setShowModal(false)
				getBrands();
			}).catch(error => {
				toast.error("Something went wrong")
			})

	}



	const editCategory = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('title', data.title);
		if (data.images_src) {
			formData.append('images', data.image);
		}

		fetch(`${API}/blogs/${deleteItem}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${tokenAi}`
			},
			body: formData,
		})
			.then(res => res.json())
			.then((res) => {
				if (res.success) {
					toast.success("Successfully edited!")
					setEditBlog(false);
					getBrands();
				}

			})
			.catch(error => {
				console.error("Error editing category:", error);
			});
	};

	const handleEditOpen = () => {

	}

	const handleShow = () => {

	}

	return (
		<div className='h-[100vh] w-[100%] bg-white'>
			<table className="border-separate border-spacing-2 border border-white-500 ... w-full p-6">
				<thead>
					<tr>
						<th className="shadow-sm rounded-md border  text-black">Author</th>
						<th className="shadow-sm rounded-md border  text-black">Title</th>
						<th className="shadow-sm rounded-md border  text-black">Text</th>
						<th className="shadow-sm rounded-md border  text-black">Image</th>
						<th className="shadow-sm rounded-md border  text-black">Action</th>
					</tr>
				</thead>


				{
					blog && blog.map((item, index) => (

						<tbody key={index}>
							<tr onClick={() => setDeleteItem(item?.id)} className="">
								<td className=" text-center shadow-sm border border-white-700 ... h-[50px]  w-[20%] rounded-md mt-0 p-1">{item.author}</td>
								<td className=" text-center shadow-sm border border-white-700 ... h-[50px]  w-[20%] rounded-md mt-0 p-1">{item.title_uz}</td>
								<td className=" text-center shadow-sm border border-white-700 ... h-[50px]  w-[20%] rounded-md mt-0 p-1">{item.text_uz}</td>
								<td className=" text-center shadow-sm border border-white-700 ... h-[100px] w-[25%] rounded-md"><img src={`${imgUrl}${item.blog_images[0].image.src}`} alt={item.title_uz} className='m-auto relative max-w-[250px] object-cover max-h-[250px] rounded-md' /></td>
								<td className=" text-center shadow-sm border border-white-700 ... h-[20px]  w-[15%] rounded-md">
									<button className='bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-md m-2' onClick={() => handleEditOpen(item.id)}><MdEdit className='text-md' /></button>
									<button className='bg-red-600 hover:bg-red-500 text-white p-3 rounded-md   m-2' onClick={handleShow}><MdDelete className='text-md' /></button>
								</td>
							</tr>
						</tbody>

					))
				}

			</table>
		</div>
	)
}

export default Blogs
