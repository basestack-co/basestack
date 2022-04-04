// Layout
import MainLayout from "../layouts/Main";
// Store
import { useDispatch } from "react-redux";
import { AppDispatch } from "store";
// Utils
import isEmpty from "lodash.isempty";

const ProjectsDemos = () => {
  const dispatch = useDispatch<AppDispatch>();

  return <div></div>;
};

const DemoPage = () => {
  return (
    <div>
      <br />
      <h2>Projects</h2>

      <ProjectsDemos />
    </div>
  );
};

DemoPage.Layout = MainLayout;

export default DemoPage;
