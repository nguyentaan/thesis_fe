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
                            href: "/admin/products/new",
                            label: "New Products",
                            active: pathname === "/products/new",
                        },
                    ],
                },
                {
                    href: "/admin/orders",
                    label: "Orders",
                    active: pathname.includes("/orders"),
                    icon: Router,
                    submenus: [
                        {
                            href: "/admin/orders",
                            label: "All Orders",
                            active: pathname === "/orders",
                        },
                        {
                            href: "/admin/orders/new",
                            label: "New Orders",
                            active: pathname === "/orders/new",
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
                            href: "/admin/files",
                            label: "All Uploaded Files",
                            active: pathname === "/admin/files",
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
                            href: "/admin/embedding",
                            label: "Embedding Files",
                            active: pathname === "/admin/embedding",
                        },
                    ],
                },
            ],
        },
    ];
}
