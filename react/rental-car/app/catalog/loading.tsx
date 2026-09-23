import { Container } from "@/components/Container/Container";
import { LoaderPanel } from "@/components/Loader/LoaderPanel";
import { CATALOG_LOADING } from "@/constants/loading";

export default function CatalogLoading() {
  return (
    <Container>
      <LoaderPanel title={CATALOG_LOADING.title} description={CATALOG_LOADING.description} />
    </Container>
  );
}
