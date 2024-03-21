// Navigation
import { useRouter } from "next/router";

const FormStatusSuccess = () => {
  const router = useRouter();
  const goBackUrl = router.query.goBackUrl as string;

  return (
    <div>
      <h1>Success form submission</h1>
      <a href={goBackUrl}>Go back</a>
    </div>
  );
};

export default FormStatusSuccess;
