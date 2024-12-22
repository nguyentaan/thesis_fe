import {
    GitPullRequest,
    Group,
    ImageIcon,
    LayoutGrid,
    LayoutTemplateIcon,
    LogsIcon,
    Router,
    Settings,
} from "lucide-react";


export function getMenuList(pathname) {
    return [
        {
            groupLabel: "",
            groupRole: ["admin", "manager"],
            menus: [
                {
                    href: "/admin/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        {
            groupLabel: "Managements",
            groupRole: ["admin", "manager"],
            menus: [
                {
                    href: "/admin/users",
                    label: "Users",
                    active: pathname.includes("/users"),
                    icon: Group,
                    submenus: [
                        {
                            href: "/admin/users",
                            label: "All Users",
                            active: pathname === "/users",
                        },
                        {
                            href: "/admin/users/new",
                            label: "New Users",
                            active: pathname === "/users/new",
                        },
                    ],
                },
                {
                    href: "/admin/products",
                    label: "Products",
                    active: pathname.includes("/products"),
                    icon: Router,
                    submenus: [
                        {
                            href: "/admin/products",
                            label: "All Products",
                            active: pathname === "/products",
                        },
                        {
                            href: "/products/new",
                            label: "New Products",
                            active: pathname === "/products/new",
                        },
                    ],
                },
                {
                    href: "",
                    label: "Uploaded Files",
                    active:
                        pathname.includes("/files"),
                    icon: ImageIcon,
                    submenus: [
                        {
                            href: "/files",
                            label: "All Uploaded Files",
                            active: pathname === "/files",
                        },
                        {
                            href: "/files/upload",
                            label: "Upload New File",
                            active: pathname === "/files/upload",
                        },
                    ],
                },
                {
                    href: "",
                    label: "Embedding",
                    active: pathname.includes("/embedding"),
                    icon: GitPullRequest,
                    submenus: [
                        {
                            href: "/embedding",
                            label: "Embedding Files",
                            active: pathname === "/embedding",
                        },
                    ],
                },
            ],
        },
        {
            groupLabel: "Administrations",
            groupRole: ["admin"],
            menus: [
                {
                    href: "",
                    label: "Logs",
                    active: pathname.includes("/popup-logs"),
                    icon: LogsIcon,
                    submenus: [
                        {
                            href: "/popup-logs",
                            label: "Hotspot Logs",
                            active: pathname === "/popup-logs",
                        },
                        {
                            href: "/connect-logs",
                            label: "Click Connect Logs",
                            active: pathname === "/landing-pages",
                        },
                    ],
                },
                {
                    href: "",
                    label: "Features",
                    active: pathname.includes("/management/features"),
                    icon: Settings,
                    submenus: [
                        {
                            href: "/management/features",
                            label: "All Features",
                            active: pathname === "/management/features",
                        },
                    ],
                },
            ],
        },
    ];
}
