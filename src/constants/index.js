import { RiHome6Line, RiImageLine, RiUser3Line, RiBookmarkLine, RiAddBoxLine } from "react-icons/ri";

export const sidebarLinks = [
  {
    imgURL: RiHome6Line, // Home icon
    route: "/",
    label: "Home",
  },
  {
    imgURL: RiImageLine, // Explore icon
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: RiUser3Line, // People icon
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: RiBookmarkLine, // Saved icon
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: RiAddBoxLine, // Create Post icon
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: RiHome6Line, // Home icon
    route: "/",
    label: "Home",
  },
  {
    imgURL: RiImageLine, // Explore icon
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: RiBookmarkLine, // Saved icon
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: RiUser3Line, // People icon
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: RiAddBoxLine, // Create Post icon
    route: "/create-post",
    label: "Create",
  },
];