import Loader from "../components/Loader/Loader";

export default function Loading() {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </div>
  );
}
