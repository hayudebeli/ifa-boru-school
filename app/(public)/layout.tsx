import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { getSchoolInfo } from "@/actions/school";

import { LanguageProvider } from "@/lib/language-context";

export const revalidate = 3600;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const schoolInfo = await getSchoolInfo();

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar schoolInfo={schoolInfo} />
        <main className="flex-1">{children}</main>
        <Footer schoolInfo={schoolInfo} />
      </div>
    </LanguageProvider>
  );
}
