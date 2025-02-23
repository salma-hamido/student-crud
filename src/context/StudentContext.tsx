import { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Client } from "../configs/api";
import toast from "react-hot-toast";



export const StudentContext = createContext<any | undefined>(undefined);

export const StudentProvider = ({ children }: { children: React.ReactNode }) => {
	const { t } = useTranslation();

	const [students, setStudents] = useState([]);
	const [grades, setGrades] = useState([]);
	const [gender, setGender] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchGrades = async () => {
		try {
			const response = await Client.admin().get("Settings/GetAllGrades");
			setGrades(response.data);
		} catch (error) {
			console.error("Error fetching grades:", error);
			toast.error(t("Error fetching grades"));
		}
	};

	const fetchGender = async () => {
		try {
			const response = await Client.admin().get("Settings/GetAllGenders");
			setGender(response.data);
		} catch (error) {
			console.error("Error fetching genders:", error);
			toast.error(t("Error fetching genders"));
		}
	};

	const fetchStudents = async () => {
		try {
			const response = await Client.admin().get("Student/GetAll");
			setStudents(response.data);
		} catch (error) {
			console.error("Error fetching students:", error);
			toast.error(t("Error fetching students"));
		} finally {
			setLoading(false);
		}
	};

	const addStudent = async (student: any) => {
		try {
			const { data: id } = await Client.admin().post('Student/Add', student);

			const findGrade = (id: any) => grades.find((g: any) => String(g.id) === String(id));
			const findGender = (id: any) => gender.find((g: any) => String(g.id) === String(id));

			// @ts-ignore
			setStudents(prev => [
				...prev,
				{
					...student,
					id: id,
					grade: findGrade(student.grade),
					gender: findGender(student.gender)
				}
			]);

			toast.success(t("Student added successfully"));
			return true;
		} catch (error) {
			toast.error(t("Error adding student"));
			return false;
		}
	}

	const updateStudent = async (student: any) => {
		try {
			await Client.admin().put("Student/Edit", student);

			setStudents((prevStudents: any) => {
				const updatedStudents = prevStudents.map((s: any) =>
					s.id === student.id
						? {
							...s,
							...student,
							grade: grades.find((v: any) => v?.id === student?.grade),
							gender: gender.find((v: any) => v?.id === student?.gender),
						}
						: s
				);
				console.log("Updated students after update:", updatedStudents);
				return updatedStudents;
			});

			toast.success(t("Student updated successfully"));
			return true;
		} catch (error) {
			console.error("Error updating student:", error);
			toast.error(t("Error updating student"));
			return false;
		}
	};

	const deleteStudent = async (id: any) => {
		try {
			await Client.admin().delete(`Student/Remove?Id=${id}`);
			setStudents((prevStudents: any) => {
				const updatedStudents = prevStudents.filter((s: any) => s.id !== id);
				console.log("Updated students after delete:", updatedStudents);
				return updatedStudents;
			});
			toast.success(t("Student deleted successfully"));
			return true;
		} catch (error) {
			console.error("Error deleting student:", error);
			toast.error(t("Error deleting student"));
			return false;
		}
	};

	const reload = async () => {
		await Promise.all([fetchGender(), fetchGrades(), fetchStudents()]);
	};

	useEffect(() => {
		reload();
	}, []);


	const value = {
		students,
		grades,
		gender,
		addStudent,
		updateStudent,
		deleteStudent,
		reload,
		loading
	};

	return (
		<StudentContext.Provider value={value}>
			{children}
		</StudentContext.Provider>
	);
};

