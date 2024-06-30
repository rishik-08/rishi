import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiBooks, PiUser, PiStudent } from "react-icons/pi";
import { useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";

const Dash = () => {
  const { user, setPaperList } = useContext(UserContext);

  useEffect(() => {
    const getPapers = async () => {
      const response = await axios.get(`paper/${user.userType}/${user._id}`);
      setPaperList(response.data);
    };
    getPapers();
  }, [setPaperList, user]);

  return (
    <main className="self-center">
      <h2 className="m-6 font-spectral mx-auto text-center text-6xl font-bold text-black">
        COLLEGE-HUB
      </h2>
      <div className="flex flex-col items-center gap-4 px-4 py-8">
        <Link
          className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
          to={"./paper"}
        >
          <GiBookshelf className="text-2.5rem lg:text-4rem text-slate-800" />
          <div className="font-semibold text-black">
            Papers
            <p className="text-sm font-normal text-black lg:text-base">
              View Papers and Notes
            </p>
          </div>
        </Link>

        <Link
          className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
          to={"./attendance"}
        >
          <IoCalendarOutline className="text-2.5rem lg:text-4rem text-slate-800" />
          <div className="font-semibold text-black">
            Attendance
            <p className="text-sm font-normal text-black lg:text-base">
              Add or Edit Attendance
            </p>
          </div>
        </Link>

        <Link
          className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
          to={"./internal"}
        >
          <HiOutlineDocumentReport className="text-2.5rem lg:text-4rem text-slate-800" />
          <div className="font-semibold text-black">
            Internal Mark
            <p className="text-sm font-normal text-black lg:text-base">
              View or Edit Internal Marks
            </p>
          </div>
        </Link>

        <Link
          className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
          to={"./time_schedule"}
        >
          <AiOutlineSchedule className="text-2.5rem lg:text-4rem text-slate-800" />
          <div className="font-semibold text-black">
            Time Schedule
            <p className="text-sm font-normal text-black lg:text-base">
              View or Edit Time Schedule
            </p>
          </div>
        </Link>

        {user.role === "HOD" && (
          <>
            <Link
              className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
              to={"./add_paper"}
            >
              <BiBookAdd className="text-2.5rem lg:text-4rem text-slate-800" />
              <div className="font-semibold text-black">
                Add Paper
                <p className="text-sm font-normal text-black lg:text-base">
                  Add a New Paper
                </p>
              </div>
            </Link>

            <Link
              className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
              to={"./approve_staff"}
            >
              <RiUserAddLine className="text-2.5rem lg:text-4rem text-slate-800" />
              <div className="font-semibold text-black">
                Approve Staff
                <p className="text-sm font-normal text-black lg:text-base">
                  Approve registered staff(s)
                </p>
              </div>
            </Link>
          </>
        )}
        {user.role === "student" && (
          <Link
            className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
            to={"./join_paper"}
          >
            <PiBooks className="text-2.5rem lg:text-4rem text-slate-800" />
            <div className="font-semibold text-black">
              Manage Paper
              <p className="text-sm font-normal text-black lg:text-base">
                Join or Leave Paper
              </p>
            </div>
          </Link>
        )}
        <Link
          className="flex w-full max-w-md items-center gap-4 rounded-lg bg-slate-300 p-6 text-base hover:bg-slate-400/90 duration-200"
          to={"./profile"}
        >
          {user.role === "student" ? (
            <PiStudent className="text-2.5rem lg:text-4rem text-slate-800" />
          ) : (
            <PiUser className="text-2.5rem lg:text-4rem text-slate-800" />
          )}
          <div className="font-semibold text-black">
            Profile
            <p className="text-sm font-normal text-black lg:text-base">
              View or Edit Profile
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dash;
