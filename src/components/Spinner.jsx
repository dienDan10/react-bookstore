import { PropagateLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <PropagateLoader color="#22c1e7" />
    </div>
  );
}

export default Spinner;
