import AdminPanelLayout from "../admin-panel/admin-panel-layout";

export default function AdminLayout({
    children
}) {
    return (
        <AdminPanelLayout>{children}</AdminPanelLayout>
    );
}                         