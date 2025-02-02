import ContentLayout from "../admin-panel/content-layout";
import PlaceholderContent from "../misc/placeholder-content";
import { NewProductProvider } from "../../providers/new-product-provider";
import AddProductStepper from "../admin-panel/product/add-product-stepper";

const AdminProductAdd = () => {
  return (
    <ContentLayout title="New Product">
      <PlaceholderContent>
        <NewProductProvider>
          <AddProductStepper />
        </NewProductProvider>
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default AdminProductAdd;
