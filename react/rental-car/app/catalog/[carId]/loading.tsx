import { Container } from "@/components/Container/Container";
import { LoaderPanel } from "@/components/Loader/LoaderPanel";

export default function CarDetailsLoading() {
  return (
    <Container>
      <LoaderPanel
        title="Loading car details..."
        description="Please wait while we fetch the information about this car"
      />
    </Container>
  );
}
