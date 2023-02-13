import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as LearnIcon } from "../../assets/icons/learn.svg";
import { ReactComponent as EventIcon } from "../../assets/icons/event.svg";
import { ReactComponent as InformationIcon } from "../../assets/icons/information.svg";
import { ReactComponent as AdminIcon } from "../../assets/icons/admin.svg";
import { ReactComponent as AssesmentIcon } from "../../assets/icons/assesments.svg";

export const sidebarTabsList = [
  {
    text: "Dashboard",
    key: "dashboard",
    sub: false,
    icon: DashboardIcon,
  },
  {
    text: "Learn",
    key: "learn",
    sub: false,
    icon: LearnIcon,
  },
  {
    text: "Health",
    key: "health",
    sub: false,
    icon: LearnIcon,
  },
  {
    text: "Events",
    key: "events",
    sub: false,
    icon: EventIcon,
  },
  {
    text: "Information",
    key: "information",
    sub: false,
    icon: InformationIcon,
  },
  {
    text: "Assesment",
    key: "assesment",
    sub: false,
    icon: AssesmentIcon,
  },
  {
    text: "Admin",
    key: "admins",
    sub: false,
    icon: AdminIcon,
  },
];

export const drawerWidth = 240;
