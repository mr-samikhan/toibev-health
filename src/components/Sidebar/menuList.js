import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as LearnIcon } from "../../assets/icons/learn.svg";
import { ReactComponent as EventIcon } from "../../assets/icons/event.svg";
import { ReactComponent as InformationIcon } from "../../assets/icons/information.svg";
import { ReactComponent as AdminIcon } from "../../assets/icons/admin.svg";
import { ReactComponent as AssesmentIcon } from "../../assets/icons/assesments.svg";
import { ReactComponent as AssessmentIcon } from "../../assets/icons/Sidebar/Mobile/assessment.svg";
import { ReactComponent as BookIcon } from "../../assets/icons/Sidebar/Mobile/book.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/Sidebar/Mobile/heart.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/Sidebar/Mobile/home.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/Sidebar/Mobile/information.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/Sidebar/Mobile/profile.svg";

export const sidebarTabsList = [
  {
    text: "Dashboard",
    key: "dashboard",
    sub: false,
    icon: DashboardIcon,
    mobileIcon: HomeIcon,
    mobileText: "Home",
  },
  {
    text: "Learn",
    key: "learn",
    sub: false,
    icon: LearnIcon,
    mobileIcon: BookIcon,
  },
  {
    text: "Health",
    key: "health",
    sub: false,
    icon: LearnIcon,
    mobileIcon: HeartIcon,
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
