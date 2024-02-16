import { bytesToMb } from "@/utils/helper";
import * as yup from "yup";

export const userSchema = yup.object({
	Name: yup.string()
		.required("Vui lòng nhập tên.")
		.min(3, "Tên phải có ít nhất 3 kí tự.")
		.max(50, "Tên chỉ có thể nhiều nhất 50 ký tự."),
	Email: yup.string()
		.required("Vui lòng nhập email.")
		.email("Địa chỉ email không hợp lệ"),
	Password: yup.string()
				.required("Vui lòng nhập password")
				.min(6, "Password phải có ít nhất 6 ký tự.")
				.max(20, "Password chỉ có thể nhiều nhất 20 ký tự."),
	Password_confirmation: yup.string().oneOf([yup.ref("Password")], "Xác nhận mật khẩu không hợp lệ."),
	Hobbies: yup.mixed<Array<string> | []>().test("Hobbie", "Vui lòng chọn ít nhất 1 sở thích.", (data: any) => {
		const isValid = data?.length >= 1;

		return isValid;
	}),
	Profile: yup.mixed().test("ProfileType", "Hồ sơ phải là 1 hình ảnh.", (file: any) => {
		const isValid = file?.type === "image/jpeg" ||
						file?.type === "image/png" ||
						file?.type === "image/jpg" ||
						file?.type === "image/svg" ||
						file?.type === "image/webp"
		return isValid;
	}).test("ProfileSize", "Ảnh hồ sơ phải nhỏ hơn 2 MB.", (file: any) => {
		const isValid = bytesToMb(file?.size) <= 2;

		return isValid;
	}).required("Vui lòng chọn ảnh hồ sơ."),
}).required();

export type userSchemaType = yup.InferType<typeof userSchema>;