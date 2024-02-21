import { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useRecoilState } from "recoil";
import { cn } from "@/lib/utils";
import { useSchoolData, useLogin } from "@/hooks";
import { menus, PATHS } from "@/constants";
import { AvatarSkeleton, TextSkeleton } from "@/components/Skeleton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { schoolState } from "@/states";

const SideNav = ({ active }) => {
  const [activeMenu, setActiveMenu] = useState(active);
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (PATHS[location.pathname]) {
      setActiveMenu(PATHS[location.pathname]);
    } else {
      setActiveMenu(0);
    }
  }, [location]);

  const { isLoading } = useSchoolData();
  const [schoolData] = useRecoilState(schoolState);
  const { logout } = useLogin();

  return (
    <div className="text-sm h-[80vh] w-full lg:w-[15rem] lg:p-6 lg:py-8 flex flex-col items-center gap-16 relative">
      {isLoading && <SideNavSkeleton />}

      {!isLoading && !schoolData?.data?.data && <SideNavSkeleton />}

      {!isLoading && schoolData?.data?.data && (
        <div className="flex flex-col items-center">
          <img
            src={schoolData?.data?.data.logo}
            className="object-cover w-16 h-16 border rounded-full"
            alt={schoolData?.data?.data.name}
          />

          <p className="pt-2 text-sm text-gray-500">Admin</p>

          <p className="font-semibold text-accent_primary">
            {schoolData?.data?.data.name}
          </p>
        </div>
      )}

      <div className="flex flex-col items-start w-full gap-6">
        {menus.map((menu, index) => (
          <button
            key={menu.url}
            onClick={() => {
              setActiveMenu(index);
              navigate(menu.url);
            }}
            className={cn(
              "flex w-full items-center gap-2 p-2 rounded-md",
              index == activeMenu
                ? "cursor-pointer font-bold bg-accent_primary text-accent_secondary transition-all ease-in-out"
                : "hover:bg-neutral_white"
            )}
          >
            {index == activeMenu ? (
              <menu.solidIcon className="w-5 text-accent_secondary" />
            ) : (
              <menu.icon className="w-5 text-accent_primary" />
            )}

            <p
              className={cn(
                index == activeMenu
                  ? "text-accent_secondary"
                  : "text-accent_primary"
              )}
            >
              {menu.name}
            </p>
          </button>
        ))}
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="absolute left-0 flex items-center gap-4 p-2 pr-10 font-semibold text-white underline rounded-md cursor-pointer lg:left-6 bottom-10 bg-error hover:bg-error/90">
            <LogOut className="w-5" />

            <p>Logout</p>
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="font-primary">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You'll be logged out from Scool.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SideNav;

const SideNavSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-3.5 mb-1">
      <AvatarSkeleton />

      <TextSkeleton styles="w-24 h-2" />

      <TextSkeleton styles="w-32 h-3" />
    </div>
  );
};
