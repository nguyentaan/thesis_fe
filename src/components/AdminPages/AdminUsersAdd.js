import ContentLayout from "../admin-panel/content-layout";
import PlaceholderContent from "../misc/placeholder-content";
import { NewUserProvider } from "../../providers/new-user-provider";
import AddUserStepper from "../admin-panel/users/add-user-stepper";

const AdminUserAdd = () => {
  return (
    <ContentLayout title="New User">
      <PlaceholderContent>
        <NewUserProvider>
          <AddUserStepper />
        </NewUserProvider>
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default AdminUserAdd;
