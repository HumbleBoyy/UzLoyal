import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from 'react-toastify';
const Services = () => {

	const [showModal, setShowModal] = useState(false)
	const [deleteId, setDeleteId] = useState();
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const [addBrand, setBrand] = useState(false)

	const handleAddClose = () => setBrand(false);
	const handleAddOpen = () => setBrand(true)

	const [editBrand, seteditBrand] = useState(false)

	const handleEditClose = () => seteditBrand(false);
	const handleEditOpen = (id) => {
		setDeleteId(id)
		seteditBrand(true)
	}


	const [posts, setPosts] = useState([]);

	const [title, setTitle] = useState();
	const [images, setimages] = useState();

	const tokenAi = localStorage.getItem("token")

	const formData = new FormData();
	formData.append("title", title);
	formData.append("images", images);


	const [data, setData] = useState({ title: "", images_src: null })


	// APi Get 
	const [brands, setBrands] = useState([])
	const urlImg = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/"


	const getBrands = () => {
		fetch("https://api.dezinfeksiyatashkent.uz/api/services")
			.then(res => res.json())
			.then(brand => {
				setBrands(brand.data)
			})
	}
	useEffect(() => {
		getBrands();
	}, [])
	// APi Get 




	// Add new Brand Api
	const createNewPost = (event) => {
		event.preventDefault();
		fetch("https://api.dezinfeksiyatashkent.uz/api/services", {
			method: "POST",
			body: formData,

			headers: {
				"Authorization": `Bearer ${tokenAi}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				toast("Successfully added")
				setBrand(false)
				getBrands();
			})
			.catch((err) => {
				console.log(err.message)
			})
	}
	// Add new Brand Api




	// Delete 


	const deleteData = () => {
		fetch(`https://api.dezinfeksiyatashkent.uz/api/services/${deleteId}`, {
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


	//  Edit
	const editCategory = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('title', data.title);
		if (data.images_src) {
			formData.append('images', data.images_src);
		}

		fetch(`https://api.dezinfeksiyatashkent.uz/api/services/${deleteId}`, {
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
					seteditBrand(false);
					getBrands();
				}

			})
			.catch(error => {
				console.error("Error editing category:", error);
			});
	};



	return (
		<>
			<div className=' h-full p-10 bg-main  overflow-scroll overflow-x-hidden'>
				<div className=' bg-slate-100 w-[90%]   m-10 rounded-md'>
					<div className='p-10 flex justify-end'>
						<div className='flex'>
							<button className='bg-blue-600 hover:bg-blue-500 p-2 w-[100%] text-white text-md rounded-md shadow-sm' onClick={handleAddOpen}>Add Service</button>
						</div>
					</div>
					<table className="border-separate border-spacing-2 border border-white-500 ... w-full">
						<thead >
							<tr>
								<th className="shadow-sm rounded-md border  text-black">Name</th>
								<th className="shadow-sm rounded-md border  text-black">Title</th>
								<th className="shadow-sm rounded-md border  text-black">Title</th>
								<th className="shadow-sm rounded-md border  text-black">Title</th>
								<th className="shadow-sm rounded-md border  text-black">Title</th>
								<th className="shadow-sm rounded-md borde   text-black">Image</th>
								<th className="shadow-sm rounded-md borde   text-black">Action</th>
							</tr>
						</thead>


						{
							brands && brands.map((service, index) => (

								<tbody key={index}>
									<tr onClick={() => setDeleteId(service?.id)}>
										<td className="shadow-sm border border-white-700 ... h-[50px]  w-[40px] rounded-md mt-0 p-1">{service.title_en}</td>
										<td className="shadow-sm border border-white-700 ... h-[50px]  w-[40px] rounded-md mt-0 p-1">{service.title_ru}</td>
										<td className="shadow-sm border border-white-700 ... h-[50px]  w-[40px] rounded-md mt-0 p-1">{service.title_uz}</td>
										<td className="shadow-sm border border-white-700 ... h-[50px]  w-[40px] rounded-md mt-0 p-1">{service.title_uz}</td>
										<td className="shadow-sm border border-white-700 ... h-[50px]  w-[40px] rounded-md mt-0 p-1">{service.title_uz}</td>
										<td className="shadow-sm border border-white-700 ... h-[100px] w-[40px] rounded-md"><img src={`${urlImg}${service.image_src}`} alt={service.title} className='max-w-full max-h-[200px] rounded-md' /></td>
										<td className="shadow-sm border border-white-700 ... h-[20px]   w-[10px] rounded-md">
											<button className='bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-md m-2' onClick={() => handleEditOpen(service.id)}><MdEdit className='text-md' /></button>
											<button className='bg-red-600 hover:bg-red-500 text-white p-3 rounded-md   m-2' onClick={handleShow}><MdDelete className='text-md' /></button>
										</td>
									</tr>
								</tbody>

							))
						}

					</table>
				</div>
			</div>


			{/* Modals bootstrap*/}
			{showModal &&
				<div className='flex justify-center align-middle fixed top-[50%] right-[35%] bg-white shadow-2xl rounded-md h-[100px] w-[400px] transition-all transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);'
				>
					<div>
						<h2 className='text-black
        text-lg
        flex
        items-center
        
      '>
							<FaExclamationCircle className='text-yellow-600 text-[1.2rem] mr-3' />
							Are you sure you want to delete?
						</h2>
						<div className='ml-20'>
							<button onClick={handleClose} className='bg-blue-600 hover:bg-blue-500  text-white text-[1rem] ml-1 p-2 mt-3 rounded-md'>Cancel</button>
							<button className='bg-red-600  hover:bg-red-500 text-white text-[1rem] ml-2 p-2 mt-3  rounded-md' onClick={() => deleteData()}>Delete</button>
						</div>
					</div>
				</div>
			}


			{/* Modals bootstrap*/}

			{editBrand &&
				<>
					<div className='flex justify-center align-middle fixed top-[30%] right-[35%] bg-white shadow-2xl rounded-md h-[350px] w-[400px] transition-all transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);'
					>
						<div className='mt-[2rem]'>
							<h2 className='text-black
        text-lg
        flex
        items-center
        space-x-1
      '>
								Edit
								<MdCancel className='text-red-600 text-[1.2rem] ml-[15rem] text-[1.5rem] text-right cursor-pointer' onClick={handleEditClose} />
							</h2>
							<hr />
							<form action="#" onSubmit={editCategory}>
								<div className='flex flex-col mt-5'>

									<div className='mt-2 flex flex-col'>
										<label htmlFor=""><span className='text-red-600'>*</span> Services Name</label>
										<input type="text" required placeholder='Brand Name' className='outline-none p-2 border border-sky-500 rounded-md'
											value={data.title}
											onChange={(e) => setData({ ...data, title: e.target.value })}
										/>
									</div>
									<div className='mt-2 flex flex-col'>
										<label htmlFor=""><span className='text-red-600'>*</span>Upload Logo</label>
										<input accept='image/*' type="file" required className='outline-none p-2 border  border-sky-500 rounded-md'
											onChange={(e) => setData({ ...data, images_src: e.target.files[0] })}
										/>
									</div>

								</div>
								<div className='ml-10 mt-10'>
									<button onClick={handleEditClose} className='bg-red-600 hover:bg-red-500  text-white w-[40%] text-[1rem] ml-1 p-2 mt-3 rounded-md'>Cancel</button>
									<button className='bg-green-600  hover:bg-green-500 text-white text-[1rem] ml-1 w-[45%] p-2 mt-3  rounded-md' type='submit'>Edit</button>
								</div>
							</form>
						</div>
					</div>
				</>
			}



			{/* Add Brand modal */}

			{addBrand &&
				<>
					<div className='flex justify-center align-middle fixed top-[30%] right-[35%] bg-white shadow-2xl rounded-md h-[350px] w-[400px] transition-all transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);'
					>
						<div className='mt-[2rem]'>
							<h2 className='text-black
        text-lg
        flex
        items-center
        space-x-1
      '>
								Add New Brand
								<MdCancel className='text-red-600 text-[1.2rem] ml-[10rem] text-[1.5rem] text-right cursor-pointer' onClick={handleAddClose} />
							</h2>
							<hr />

							<form action="#" onSubmit={createNewPost}>
								<div className='flex flex-col mt-5'>

									<div className='mt-2 flex flex-col'>
										<label htmlFor=""><span className='text-red-600'>*</span> Brand Name</label>
										<input onChange={(e) => setTitle(e?.target?.value)} type="text" required placeholder='Brand Name' className='outline-none p-2 border border-sky-500 rounded-md' />
									</div>
									<div className='mt-2 flex flex-col'>
										<label htmlFor=""><span className='text-red-600'>*</span>Upload Logo</label>
										<input accept='image/*' type="file" onChange={(e) => setimages(e?.target?.files[0])} required className='outline-none p-2 border  border-sky-500 rounded-md' />
									</div>

								</div>
								<div className='ml-10 mt-10'>
									<button onClick={handleAddClose} className='bg-red-600 hover:bg-red-500  text-white w-[40%] text-[1rem] ml-1 p-2 mt-3 rounded-md'>Cancel</button>
									<button className='bg-green-600  hover:bg-green-500 text-white text-[1rem] ml-1 w-[45%] p-2 mt-3  rounded-md' type='submit'>Add</button>
								</div>
							</form>
						</div>
					</div>
				</>
			}



		</>
	)
}

export default Services
