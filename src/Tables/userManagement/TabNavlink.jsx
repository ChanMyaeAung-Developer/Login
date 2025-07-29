import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CreateUser from "./CreateUser";
import { Link } from "react-router-dom";


const TabNavlink = ({ row, value }) => {
	// const [open, setOpen] = useState(false)
	// const [formData, setFormData] = useState()
	const editData = (row) => {
		const tableData = {
			_id: row._id,
			name: row.name,
			email: row.email,
			team: row.team,
			position: row.position,
			disabled: row.disabled,
			phone: row.phone
		};
		// setFormData(tableData);
		// setOpen(true)

	};
	console.log('row', row?.original)
	return (
		<>

		
				<Link to={`/List/create-user/${row?.original?._id}`}
				 state={{
					_id: row?.original?._id || '',
					name: row?.original?.name || '',
					email: row?.original?.email || '',
					team: row?.original?.team || '',
					position: row?.original?.position || '',
					disabled: row?.original?.disabled || false,
					phone: row?.original?.phone || ''

				}} >
				<span className="text-blue-600">

					{/* { row?.original[column?.accessorKey]} */}
					{value}
				</span>


			</Link>

		</>
	);
};

export default TabNavlink;
