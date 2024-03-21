// Navigation
import { useRouter } from "next/router";
import Head from "next/head";

const FormStatusSuccess = () => {
  const router = useRouter();
  const goBackUrl = router.query.goBackUrl as string;

  return (
    <>
      <Head>
        <title>Basestack / Form Submission Success </title>
      </Head>
      <div>
        <h1>Success form submission</h1>
        <a href={goBackUrl}>Go back</a>
      </div>
    </>
  );
};

export default FormStatusSuccess;
