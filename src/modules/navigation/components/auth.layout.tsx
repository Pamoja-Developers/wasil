import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import {
  ArabesqueTile,
  GeometricRosette,
  MosqueLogo,
  SkylineSilhouette,
} from "./auth.layout.shapes";

export default function AuthLayout() {
  return (
    <>
      <div className="h-screen w-screen overflow-hidden bg-slate-200">
        <div className="h-full w-full flex flex-col items-center mt-3 md:mt-0 md:justify-center">
          <div className="h-[40%] w-[90%] md:h-[70%] md:w-[70%]">
            <div className="h-fit pb-3 md:pb-0 relative w-full overflow-hidden rounded-lg bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* ---------------- LEFT PANEL ---------------- */}
                <div className="h-70 md:h-full relative flex flex-col justify-between overflow-hidden bg-linear-to-b from-[#0d1638] via-[#101c44] to-[#0a1330] px-8 py-10 sm:px-12 sm:py-14">
                  {/* faint tile pattern */}
                  <ArabesqueTile className="pointer-events-none absolute inset-0 h-full w-full text-white/4" />

                  {/* gold rosette, bottom-left */}
                  <GeometricRosette className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 opacity-70" />

                  {/* skyline, anchored to bottom */}
                  <SkylineSilhouette className="pointer-events-none absolute bottom-0 left-0 h-64 w-full" />

                  {/* content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <MosqueLogo className="h-12 w-12 text-[#c9a24b]" />
                      <div>
                        <div className="text-2xl tracking-[0.15em] text-white">
                          WASIL
                        </div>
                        <div className="text-[10px] font-semibold tracking-[0.15em] text-[#c9a24b]">
                          TANZANIA MUSLIM
                          <br />
                          PROFESSIONALS ASSOCIATION
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-16">
                    <h1 className="text-5xl leading-[1.05] text-white sm:text-6xl">
                      Assalaam
                      <br />
                      Alaikum
                    </h1>
                    <div className="mt-6 h-0.75 w-16 bg-[#c9a24b]" />
                    <div className="hidden md:block mt-6 max-w-xs text-[15px] leading-relaxed text-white/70">
                      <p className="text-base italic text-white">
                        <span className="text-[#c9a24b]">&ldquo;</span>
                        And cooperate in righteousness and piety.
                        <span className="text-[#c9a24b]">&rdquo;</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        &mdash; Quran 5:2
                      </p>
                    </div>
                  </div>

                  {/* spacer so skyline has room */}
                  <div className="relative z-10 h-40 md:h-48" />
                </div>

                <div className="flex flex-col bg-white px-8 md:py-10 sm:px-14 sm:py-14">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
