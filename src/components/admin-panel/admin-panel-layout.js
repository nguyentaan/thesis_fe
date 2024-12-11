import { useStore } from "../../hooks/use-store";
import { useSidebarToggle } from "../../hooks/use-sidebar-toggle";
import { cn } from "../../lib/utils";
import { Footer } from "../admin-panel/footer";
import { Sidebar } from "../admin-panel/sidebar";
import "../AdminPages/tailwind.css";

export default function AdminPanelLayout({
    children
}) {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) return null;

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                <Footer />
            </footer>
        </>
    );
}
