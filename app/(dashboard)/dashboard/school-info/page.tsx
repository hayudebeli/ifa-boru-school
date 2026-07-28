import { getSchoolInfo } from "@/actions/school";
import SchoolInfoForm from "@/components/dashboard/SchoolInfoForm";

export const dynamic = "force-dynamic";

export default async function AdminSchoolInfoPage() {
  const info = await getSchoolInfo();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">School Information</h1>
      <p className="text-sm text-gray-500 mb-8">Update contact details, statements, and social links.</p>
      <SchoolInfoForm initialData={info || {}} />
    </div>
  );
}
