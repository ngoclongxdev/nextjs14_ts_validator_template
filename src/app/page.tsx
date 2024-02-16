import UserForm from "@/components/UserForm";
import Image from "next/image";

export default function Home() {
	return (
		<div className="h-screen w-screen flex justify-center overflow-x-hidden">
			<UserForm/>
		</div>
	);
}
