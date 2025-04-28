"use client"

import { useLanguage } from "@/context/language-context"

export function HeroSection() {
  const { isRTL } = useLanguage()

  return (
    <section className="relative w-full h-[650px] overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/abstract-pattern.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E17]/90 via-[#0A0E17]/80 to-[#0A0E17]"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center items-center text-center pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
          {isRTL ? (
            <>
              <span className="text-white">נסח טאבו ומסמכים רשמיים</span>
              <br />
              <span className="text-[#F05A28]">במהירות ובקלות</span>
            </>
          ) : (
            <>
              <span className="text-white">Land Registry Extracts and Official Documents</span>
              <br />
              <span className="text-[#F05A28]">Fast and Easy</span>
            </>
          )}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          {isRTL
            ? "קבל נסח טאבו ומסמכים רשמיים באופן מיידי, ישירות למייל שלך. הפלטפורמה המהירה והמאובטחת ביותר בישראל."
            : "Get official Land Registry extracts and documents instantly, delivered directly to your email. The fastest and most secure platform in Israel."}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div className="flex items-center bg-[#1A1F2E]/60 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-[#F05A28] mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm text-gray-300">{isRTL ? "מסמכים רשמיים" : "Official Documents"}</span>
          </div>
          <div className="flex items-center bg-[#1A1F2E]/60 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-[#F05A28] mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm text-gray-300">{isRTL ? "אבטחה מתקדמת" : "Advanced Security"}</span>
          </div>
          <div className="flex items-center bg-[#1A1F2E]/60 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-[#F05A28] mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm text-gray-300">{isRTL ? "שירות 24/7" : "24/7 Service"}</span>
          </div>
          <div className="flex items-center bg-[#1A1F2E]/60 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-[#F05A28] mr-2 rtl:mr-0 rtl:ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm text-gray-300">{isRTL ? "משלוח מיידי" : "Instant Delivery"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
