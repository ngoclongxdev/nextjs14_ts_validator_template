"use client";

import { hobbies } from "@/config/hobbies";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema, userSchemaType } from "@/validations/useSchema";

export default function UserForm() {
	const inputClass = `border border-red-400 rounded-md h-10 p-2 w-full bg-transparent outline-none`;

	const [userHobbies, setHobbies] = useState<Array<string> | []>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<userSchemaType>({
		resolver: yupResolver(userSchema),
	});

	const onSubmit = (data: userSchemaType) => console.log(data);

	const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setValue("Profile", file);
		}

		console.log("The image is: ", file);
	}

	useEffect(() => {
		setValue("Hobbies", userHobbies)
	}, [userHobbies])

	return (
		<div className="w-[500px] shadow rounded-lg">
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1 className="text-xl font-bold justify-center items-center flex">Form Validation</h1>
				<h1 className="flex justify-center items-center">Handle validation like a pro</h1>
				<div className="mt-2">
					<label>Name</label>
					<input
						type="text"
						placeholder="Enter your name"
						className={inputClass}
						{...register("Name")}
					/>
					<span className="text-red-400">{errors.Name?.message}</span>
				</div>
				<div className="mt-2">
					<label>Email</label>
					<input
						type="email"
						placeholder="Enter your email"
						className={inputClass}
						{...register("Email")}
					/>
					{
						errors.Email && (<span className="text-red-400">{errors.Email?.message}</span>)
					}
				</div>
				<div className="mt-2">
					<label>Password</label>
					<input
						type="password"
						placeholder="Enter your password"
						className={inputClass}
						{...register("Password")}
					/>
					{
						errors.Password && (<span className="text-red-400">{errors.Password?.message}</span>)
					}
				</div>
				<div className="mt-2">
					<label>Confirm password</label>
					<input
						type="password"
						placeholder="Confirm your password"
						className={inputClass}
						{...register("Password_confirmation")}
					/>
					{
						errors.Password_confirmation && (<span className="text-red-400">{errors.Password_confirmation?.message}</span>)
					}
				</div>
				<div className="mt-2">
					<label>Select Hobbies</label>
					<div className="grid grid-cols-3 mt-2">
						{
							hobbies.map((item) => (
								<div className="flex items-center" key={item.key}>
									<label htmlFor={item.key}>{item.value}</label>
									<input
										type="checkbox"
										value={item.key}
										className="ml-2"
										id={item.key}
										onChange={(event) => {
											if (event.target.checked) {
												setHobbies([...userHobbies, event.target.value]);
											} else {
												const filterHobbies = userHobbies.filter((item) => item !== event.target.value);
												setHobbies(filterHobbies);
											}
										}}
									/>
								</div>
							))
						}
					</div>
					{
						errors.Hobbies && (<span className="text-red-400">{errors.Hobbies?.message}</span>)
					}
				</div>
				<div className="mt-2">
					<label>Profile Image</label>
					<input type="file" onChange={handleImage} className={inputClass} />
					{
						errors.Profile && (<span className="text-red-400">{errors.Profile?.message}</span>)
					}
				</div>
				<div className="mt-2">
					<button className="bg-red-500 w-full p-2 h-10 rounded-lg">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}