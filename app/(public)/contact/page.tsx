import { Metadata } from "next";
import { getSchoolInfo } from "@/actions/school";
import ContactForm from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Haramaya Ifa Boru Special Boarding Secondary School.",
};

export default async function ContactPage() {
  const schoolInfo = await getSchoolInfo();

  return (
    <div>
      <div className="bg-gradient-to-r from-[#0f2560] to-[#1a3a8f] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#f97316] font-semibold text-sm mb-1">Get in Touch</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">Contact Us</h1>
            <p className="text-blue-200 text-sm mt-1">We&apos;re here to answer any questions you may have</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
        <div className="max-w-7xl mx-auto text-xs text-gray-500">Home › Contact</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0f2560] mb-4 section-title-left">
                Contact Information
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Whether you have questions about admissions, our curriculum, or campus life, our team is ready to provide the information you need.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#1a3a8f]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Our Location</h3>
                    <p className="text-gray-600 text-sm">{schoolInfo?.address || "Haramaya, Oromia, Ethiopia"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#f97316]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Phone Number</h3>
                    <p className="text-gray-600 text-sm">{schoolInfo?.phone || "+251 25 XXX XXXX"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Email Address</h3>
                    <p className="text-gray-600 text-sm">{schoolInfo?.email || "info@ifaboru.edu.et"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">Office Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600 text-sm">Saturday: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links placeholder */}
            <div className="bg-[#1a3a8f] text-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-lg mb-2">Follow Us</h3>
              <p className="text-blue-200 text-sm mb-4">Stay updated with our latest news and events on social media.</p>
              {/* Add social icons here if needed */}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-[400px] relative bg-gray-100 flex items-center justify-center">
          {schoolInfo?.mapEmbed ? (
            <div dangerouslySetInnerHTML={{ __html: schoolInfo.mapEmbed }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
          ) : (
            <div className="text-gray-400 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>Map Location</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
